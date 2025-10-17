// Load .env into Deno.env so Prisma can read DATABASE_URL when running under Deno
try {
  const envText = Deno.readTextFileSync(new URL('./.env', import.meta.url));
  for (const line of envText.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_0-9]+)\s*=\s*"?(.*?)"?\s*$/);
    if (m) Deno.env.set(m[1], m[2]);
  }
} catch (_e) {
  // ignore if .env not found
}

import { PrismaClient } from "./prisma/client/client.ts";
import { faker } from "npm:@faker-js/faker";
faker.locale = 'de_AT';
const prisma = new PrismaClient();

// Config: Anzahl der zu erstellenden Einträge
const ARTIST_COUNT = 800;  // 800 Artists
const ALBUM_COUNT = 200;   // 200 Alben
const GENRE_COUNT = 20;    // 20 Genres
const SONG_COUNT = 3000;   // 3000 Songs
const BATCH_SIZE = 200;    // Batch-Größe für Transaktionen

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function createArtists() {
  console.log(`Erstelle ${ARTIST_COUNT} Artists...`);
  const artistsData = Array.from({ length: ARTIST_COUNT }, () => ({
    name: faker.person.fullName(),
  }));

  await prisma.artist.createMany({ data: artistsData });
  const artists = await prisma.artist.findMany({ select: { id: true } }) as { id: string }[];
  console.log(`${artists.length} Artists erstellt`);
  return artists.map((a) => a.id);
}

async function createAlbums() {
  console.log(`Erstelle ${ALBUM_COUNT} Alben...`);
  const albumsData = Array.from({ length: ALBUM_COUNT }, () => ({
    album_name: faker.music.songName(),
    release_year: randInt(1960, 2025),
  }));

  await prisma.album.createMany({ data: albumsData });
  const albums = await prisma.album.findMany({ select: { id: true } }) as { id: string }[];
  console.log(`${albums.length} Alben erstellt`);
  return albums.map((a) => a.id);
}

async function createGenres() {
  console.log(`Erstelle ${GENRE_COUNT} Genres...`);
  const genresData = Array.from({ length: GENRE_COUNT }, () => ({
    genre_name: faker.music.genre(),
  }));

  await prisma.genre.createMany({ data: genresData });
  const genres = await prisma.genre.findMany({ select: { id: true } }) as { id: string }[];
  console.log(`${genres.length} Genres erstellt`);
  return genres.map((g) => g.id);
}

async function createSongs(artistIds: string[], albumIds: string[], genreIds: string[]) {
  console.log(`Erstelle ${SONG_COUNT} Songs in Batches von ${BATCH_SIZE}...`);
  let created = 0;

  while (created < SONG_COUNT) {
    const batch = Math.min(BATCH_SIZE, SONG_COUNT - created);
    const txOps = [];

    for (let i = 0; i < batch; i++) {
      const albumId = albumIds[randInt(0, albumIds.length - 1)];
      const genreId = genreIds[randInt(0, genreIds.length - 1)];

      // 1-4 zufällige Artists pro Song
      const artistCount = randInt(1, 4);
      const songArtists = new Set<string>();
      while (songArtists.size < artistCount) {
        songArtists.add(artistIds[randInt(0, artistIds.length - 1)]);
      }

      txOps.push(
        prisma.song.create({
          data: {
            name: faker.music.songName(),
            dauer: randInt(120, 420), // 2-7 Minuten
            album: { connect: { id: albumId } },
            genre: { connect: { id: genreId } },
            artists: {
              connect: Array.from(songArtists).map(id => ({ id })),
            },
          },
        })
      );
    }

    await prisma.$transaction(txOps);
    created += batch;
    console.log(`${created}/${SONG_COUNT} Songs erstellt`);
  }
}

async function main() {
  try {
    console.log("Starte Seeding...");
    console.time("Seeding abgeschlossen");

    const artistIds = await createArtists();
    const albumIds = await createAlbums();
    const genreIds = await createGenres();
    await createSongs(artistIds, albumIds, genreIds);

    console.timeEnd("Seeding abgeschlossen");
    console.log("Fertig! Starte 'npx prisma studio' um die Daten zu sehen.");
  } finally {
    await prisma.$disconnect();
  }
}

if ((import.meta as any).main) {
  await main();
}