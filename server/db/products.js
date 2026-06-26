const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');
const { catalog } = require('../catalog/productCatalog');
const { log } = require('../middleware/requestLogger');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_PATH = path.join(DATA_DIR, 'inventa.db');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new DatabaseSync(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    name            TEXT PRIMARY KEY,
    category_id     TEXT NOT NULL,
    category_title  TEXT NOT NULL,
    family_name     TEXT,
    tier            TEXT,
    tagline         TEXT,
    key_features    TEXT,
    key_specs       TEXT,
    updated_at      DATETIME DEFAULT (datetime('now'))
  )
`);

// ── Always upsert catalog on startup so new entries are always synced ────────
const upsert = db.prepare(`
  INSERT OR REPLACE INTO products
    (name, category_id, category_title, family_name, tier, tagline, key_features, key_specs)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

let seeded = 0;
for (const p of catalog) {
  upsert.run(
    p.name,
    p.categoryId,
    p.categoryTitle,
    p.familyName || null,
    p.tier || null,
    p.tagline || null,
    JSON.stringify(p.keyFeatures || []),
    JSON.stringify(p.keySpecs || {})
  );
  seeded++;
}
log('Products DB', `Synced ${seeded} products into SQLite catalog`);

const findByName = db.prepare('SELECT * FROM products WHERE name = ? COLLATE NOCASE');

/**
 * Look up a product by name.
 * Returns enriched data from DB, or null if not catalogued.
 */
function getProduct(name) {
  const row = findByName.get(name);
  if (!row) return null;
  return {
    name: row.name,
    categoryId: row.category_id,
    categoryTitle: row.category_title,
    familyName: row.family_name,
    tier: row.tier,
    tagline: row.tagline,
    keyFeatures: JSON.parse(row.key_features || '[]'),
    keySpecs: JSON.parse(row.key_specs || '{}'),
  };
}

/**
 * Enrich an array of cart items [{name, quantity}] with DB product data.
 * Items not found in catalog are flagged as unverified.
 */
function enrichCart(cartItems) {
  return cartItems.map(item => {
    const product = getProduct(item.name);
    if (product) {
      return { ...item, ...product, verified: true };
    }
    return {
      name: item.name,
      quantity: item.quantity,
      categoryTitle: 'General Product',
      tier: null,
      keyFeatures: [],
      keySpecs: {},
      verified: false,
    };
  });
}

module.exports = { getProduct, enrichCart };
