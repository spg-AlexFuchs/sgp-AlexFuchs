const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { fakerDE } = require('@faker-js/faker');

async function main() {
  const numPassengers = 10;
  const numFlights = 5;

  console.log("seeding...");

  // 1. Passagiere erstellen
  const passagiere = [];
  for (let i = 0; i < numPassengers; i++) {
    const p = await prisma.passagier.create({
      data: {
        name: fakerDE.person.fullName(),
      },
    });
    passagiere.push(p);
  }

  // 2. Flüge erstellen und Passagiere zuweisen
  for (let i = 0; i < numFlights; i++) {
    const zufaelligePassagiere = fakerDE.helpers.arrayElements(
      passagiere,
      fakerDE.number.int({ min: 1, max: 3 })
    );

    await prisma.flug.create({
      data: {
        Abflugzeit: fakerDE.date.future(),
        Abflugort: fakerDE.location.city(),
        Ankunftzeit: fakerDE.date.future(),
        Ankunftort: fakerDE.location.city(),
        Flugname: fakerDE.commerce.productName(),
        passagiere: {
          connect: zufaelligePassagiere.map(p => ({ id: p.id })),
        },
      },
    });
  }

  // 3. Gepäck für Passagiere anlegen
  for (const p of passagiere) {
    const anzahlGepaeck = fakerDE.number.int({ min: 1, max: 3 });
    for (let i = 0; i < anzahlGepaeck; i++) {
      await prisma.gepaeck.create({
        data: {
          gewicht: fakerDE.number.float({ min: 5, max: 30 }),
          beschreibung: fakerDE.commerce.product(),
          passagier: { connect: { id: p.id } },
        },
      });
    }
  }

  console.log("seeding fertig");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });



/*
TO-DO:

- Prisma deinstallieren im Terminal:    npm uninstall prisma @prisma/client
- Prisma version 4 Installieren:        npm install prisma@4 @prisma/client@4
- FakerDE installieren:                 npm install @faker-js/faker
- Prisma Initialisieren:                npx prisma init
- Prisma Generieren:                    npx prisma generate dev
--------------------------------------------------------------------------------
- Prisma provider ändern:               provider = "sqlite"
- Prisma url Ändern:                    url      = "file:./dev.db"
- Prisma Schema validieren:             npx prisma validate
- Prisma Datenbank Erstellen:           npx prisma db push
- Seed.js Datei ausführen:              node seed.js
- Prisma Studio Ausführen:              npx prisma studio
*/