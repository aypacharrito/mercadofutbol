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
  const productIds = source.match(/listing\(\{ id:/g) ?? [];
  assert.equal(productIds.length, 48);
});

test("jersey images are local assets", () => {
  assert.doesNotMatch(source, /photo\.yupoo\.com/);
  assert.match(source, /\/products\/yupoo-b52e18393b\.webp/);
});

test("Fan, Player, and Retro prices are correct", () => {
  assert.match(source, /version === "Player"/);
  assert.match(source, /FAN_PRICE = 35/);
  assert.match(source, /PLAYER_PRICE = 55/);
  assert.match(source, /RETRO_PRICE = 45/);
});
