const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { fakerDE } = require('@faker-js/faker');
let gewunscht = 5;



async function seedZoo() {
    for (let i = 1; i <= gewunscht; i++) {
        const zoo= {
            land: fakerDE.location.country(),
            stadt: fakerDE.location.city(),
            adresse: fakerDE.location.streetAddress(),
            baujahr: fakerDE.number.int({ min: 1400, max: 2024 }),
        };
        await prisma.zoo.create({ data: zoo });
    }
}
seedZoo();

async function seedDepartment() {
    let d = 0;
    for (let i = 0; i <= gewunscht; i++) {
        for(let z = 0; z <= 7; z++) 
        {   
            const abteilungen= {
                name: fakerDE.animal.type(),
                zooID: ,
            };
            await prisma.abteilung.create({ data: abteilungen }); 
        }
        d++;
    }
}

seedDepartment();

    /*for (let i = 0; i < gewunscht; i++) {
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
    */


//console.log(zoo[0]);