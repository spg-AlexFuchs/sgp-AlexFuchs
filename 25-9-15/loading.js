const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { fakerDE } = require('@faker-js/faker');

let GEWUENSCHTE_FAHRRÄDER = 15;

console.log("Lösche alte Fahrräder");

/*async function seed(){
    console.log("seeding Fahrräder");
    for(d=0; d<GEWUENSCHTE_FAHRRÄDER; d++){
        const rad ={
            name: fakerDE.vehicle.bicycle(),
            preis: parseFloat(fakerDE.finance.amount()),
            zoll: fakerDE.number.float({ multipleOf: 0.5, min: 5, max:30 }),
            farbe: fakerDE.vehicle.color()
        }
        await prisma.Fahrrad.create({data: rad});
    }

    console.log("seeding fertig!");
}
seed();


// ...existing code...
const https = require('https');

async function download() {
    const url = 'https://opentdb.com/api.php?amount=10&category=22&difficulty=hard';
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(body);
                    resolve(json);
                } catch (err) {
                    reject(err);
                }
            });
        }).on('error', reject);
    });
}

// Beispiel: herunterladen und in Variable speichern
(async () => {
    try {
        const apiResponse = await download(); // geparstes JSON-Objekt
        const fragen = apiResponse.results || []; // Array der Fragen
        console.log('Gefundene Fragen:', fragen.length);
        // weitere Verarbeitung: z.B. in DB speichern oder in Variable halten
    } catch (err) {
        console.error('Fehler beim Laden:', err);
    }
})();
// ...existing code...