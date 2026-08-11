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
  const productIds = source.match(/id: "mf-/g) ?? [];
  assert.equal(productIds.length, 12);
});

test("approved real jersey image is connected", () => {
  assert.match(source, /real-madrid-green-fan-player\.webp/);
});

test("both Fan and Player pricing are supported", () => {
  assert.match(source, /version === "Player"/);
  assert.match(source, /1500/);
});
