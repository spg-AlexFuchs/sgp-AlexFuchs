const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { fakerDE } = require('@faker-js/faker');
let gewunscht = 5;
let minAbteilung = 2;
let maxAbteilung = 7;
let Worker = 100;
let minWorkplace =1;
let maxWorkplace = 4;



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

async function seedDepartment() {
    let zooids = await prisma.zoo.findMany({select: { id: true }});
    for (let i of zooids) {
        for(let z = 0; z <= Math.floor(Math.random() * maxAbteilung) + minAbteilung; z++) 
        {   
            const abteilung= {
                name: fakerDE.animal.type(),
                zooID: i.id,
            };
            await prisma.abteilung.create({ data: abteilung }); 
        }
    }
}

async function seedAnimal() {
    let abteilungIDS = await prisma.abteilung.findMany({select: { id: true }});
    for (let i of abteilungIDS) {
        for(let z = 0; z <= Math.floor(Math.random() * 20) + 5; z++) 
        {   
            const tier= {
                name: fakerDE.animal.fish(),
                art: fakerDE.animal.type(),
                abteilungIDS: i.id,
            };
            await prisma.tier.create({ data: tier }); 
        }
    }
}

async function seedWorker() {
    let abteilungIDS = await prisma.abteilung.findMany({select: {id: true}});
    for (let i = 1; i <= Worker; i++) {
        const Mitarbeitender= {
            name: fakerDE.person.firstName(),
        }
        await prisma.mitarbeiter.create({ data: Mitarbeitender}); 
        for(let z = 1; z <= Math.floor(Math.random() * maxWorkplace) + minWorkplace; z++) 
        {   
            let WorkerIDS = await prisma.mitarbeiter.findMany({select: {id: true}});
            await prisma.mitarbeiter.update({
                data: {
                    abteilungen: {
                        id: abteilungIDS[Math.floor(Math.random() * abteilungIDS.length)].id
                    },
                },
                where: {
                    id: abteilungIDS[i-1].id
                }
            }); 
        }
    }
}
    


async function main(){
    console.log("start seeding");
    await seedZoo().then((rw) => console.log('seeding done: ', rw))
    .catch((e) => console.log('Es gab Fehler', e.message));;
    await seedDepartment().then((rw) => console.log('seeding done: ', rw))
    .catch((e) => console.log('Es gab Fehler', e.message));;
    await seedAnimal().then((rw) => console.log('seeding done: ', rw))
    .catch((e) => console.log('Es gab Fehler', e.message));;
    console.log("stop seeding");
}

main();