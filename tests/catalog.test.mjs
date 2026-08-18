import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("../lib/catalog.ts", import.meta.url), "utf8");

test("catalog contains every customer-facing department", () => {
  for (const category of ["new", "clubs", "national-teams", "retro", "kids", "sale"]) {
    assert.match(source, new RegExp(`slug: "${category}"`));
  }
});

test("catalog includes a complete launch assortment", () => {
  const originalVariants = source.match(/listing\(\{ id:/g) ?? [];
  const expandedFamilies = source.match(/^\s+\{ club: .* kind: /gm) ?? [];
  assert.equal(originalVariants.length, 53);
  assert.equal(expandedFamilies.length, 44);
  assert.match(source, /\.\.\.expandedFamilies\.flatMap\(expandFamily\)/);
});

test("jersey images are local assets", () => {
  assert.doesNotMatch(source, /photo\.yupoo\.com/);
  assert.match(source, /\/products-studio\/mexico-home-2026\.webp/);
});

test("Fan, Player, and Retro prices are correct", () => {
  assert.match(source, /version === "Player"/);
  assert.match(source, /FAN_PRICE = 35/);
  assert.match(source, /PLAYER_PRICE = 55/);
  assert.match(source, /RETRO_PRICE = 45/);
});

test("club and country kit posts are grouped into selectable families", () => {
  assert.match(source, /export const catalogProducts/);
  assert.match(source, /getProductVariants/);
  assert.match(source, /kit: \"Home\" \| \"Away\" \| \"Third\"/);
});

test("catalog supports manufacturer browsing", () => {
  assert.match(source, /brand: string/);
  for (const brand of ["adidas", "Nike", "PUMA"]) assert.match(source, new RegExp(`brand: "${brand}"`));
});

test("featured teams expose both Home and Away choices", () => {
  for (const team of ["Mexico", "Chelsea", "Inter Miami", "LA Galaxy", "LAFC"]) {
    const escaped = team.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(source, new RegExp(`club: "${escaped}", kit: "Home"`));
    assert.match(source, new RegExp(`club: "${escaped}", kit: "Away"`));
  }
});
