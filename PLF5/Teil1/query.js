const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function query() {
    //
    //Ausgabe nach Offungsjahr aller Zoo's
    console.log('Querying...');
    let ZooYears = await prisma.zoo.findMany({
        select: { baujahr: true }, // Keine Klammern um die Benutzer-ID
    });
    console.log("Zoo's with opening years:");

    for (let ZooYear of ZooYears) {
        console.log(ZooYear.baujahr);
    }

    //
    //Alle Infos der Zoo's anhand einer id
    let SearchedZoo = Math.floor(Math.random() * ZooYears.length)
    let ZooDatas = await prisma.zoo.findMany({
        where: {id: SearchedZoo}
    })
    console.log(`Data of Zoo with id:${SearchedZoo}:`);

    for (let ZooData of ZooDatas) {
        console.log(`ID: ${ZooData.id}\nCountry: ${ZooData.land}\nCity: ${ZooData.stadt}\nAddress: ${ZooData.adresse}\nConstruction year: ${ZooData.baujahr}`);
    }

    let AbteilungOfSearchedZoo = await prisma.abteilung.findMany({
        select:{name: true},
        where: {zooID: SearchedZoo}
    })
    console.log(`\nDepartments of Zoo ${SearchedZoo}: `)
    for(x of AbteilungOfSearchedZoo){
        console.log(x.name);
    }

    //
    //So wie oben nur mit Tierzahl je Abteilung
    SearchedZoo = Math.floor(Math.random() * ZooYears.length)
    let ZooDatase = await prisma.zoo.findMany({
        where: {id: SearchedZoo}
    })
    console.log(`Data of Zoo (incl. Animalcount) with id:${SearchedZoo}:`);

    for (let ZooData of ZooDatase) {
        console.log(`ID: ${ZooData.id}\nCountry: ${ZooData.land}\nCity: ${ZooData.stadt}\nAddress: ${ZooData.adresse}\nConstruction year: ${ZooData.baujahr}`);
    }

    let AbteilungOfSearchedZoo2 = await prisma.abteilung.findMany({
        select:{name: true, id: true},
        where: {zooID: SearchedZoo}
    })

    console.log(`\nDepartment of Zoo (with Animalcount) ${SearchedZoo}: `)
    for(x of AbteilungOfSearchedZoo2){
        let TiereInAbteilung = await prisma.tier.findMany({
            select: {id: true},
            where: {abteilungIDS: x.id}
        });
        console.log(`Departmentname: ${x.name} Animalcount: ${TiereInAbteilung.length}`);
    }

    //
    //Alle Mitabrbeiter in bestimmten Zoo (SEARCHEDZOO)

    console.log("Worker of Zoo:")
    let AbteilungOfSearchedZoo3 = await prisma.abteilung.findMany({
        select:{id: true},
        where: {zooID: SearchedZoo}
    })
    for(m of AbteilungOfSearchedZoo3){
        let MitabrbeiterInAbteilung = await prisma.mitarbeiter.findMany({
            select: {name: true},
            where: {abteilung.id: m.id}
        });
        console.log(MitabrbeiterInAbteilung.name);
    }
}
query();
