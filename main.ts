import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";

const db = new DB("music.db");

db.execute(`DROP TABLE IF EXISTS Album`);

db.execute(`
  CREATE TABLE Album (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    artist TEXT NOT NULL,
    year INTEGER NOT NULL
  )
`);

// Beispieldaten einfügen
const albums = [
  ["Dark Side of the Moon", "Pink Floyd", 1973],
  ["Thriller", "Michael Jackson", 1982],
  ["Back in Black", "AC/DC", 1980],
  ["The Wall", "Pink Floyd", 1979],
  ["Brothers in Arms", "Dire Straits", 1985]
];

for (const album of albums) {
  db.query(
    "INSERT INTO Album (name, artist, year) VALUES (?, ?, ?)",
    album
  );
}

// Daten abfragen und ausgeben
for (const [name, artist, year] of db.query("SELECT name, artist, year FROM Album")) {
  console.log(`${name} by ${artist} (${year})`);
}

db.close();
