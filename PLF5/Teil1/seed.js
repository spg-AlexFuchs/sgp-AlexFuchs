const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { fakerDE } = require('@faker-js/faker');

async function main() {
    let i = 0;
    let gewunscht = 5;
    let zoo = [];



    for (let i = 0; i < gewunscht; i++) {
        zoo = [
            { land: fakerDE.location.country(), },
            { stadt: fakerDE.location.city(), },
            { adresse: fakerDE.location.streetAddress(), },
            { baujahr: fakerDE.date.past(), },
            {
                abteilungen: {
                    create: 'Burgerfische'
                }
            }

        ];

        const createMany = prisma.zoo.create({ data: zoo[i] });
    };
}

console.log(zoo[0]);


main();