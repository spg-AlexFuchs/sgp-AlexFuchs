const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { fakerDE } = require('@faker-js/faker');

let GEWUENSCHTE_BANKEN = 10;
let GEWUENSCHTE_CUSTOMERS = 60;
let GEWUENSCHTE_ACCOUNTS = 25;
let GEWUENSCHTE_TRANSAKTIONEN = 50;

async function seed(){
    console.log("seeding Banks");
    for(d=0; d<GEWUENSCHTE_BANKEN; d++){
        const bank ={
            bic: fakerDE.finance.bic(),
        }
        await prisma.banks.create({data: bank});
    }

    console.log("seeding customer and accounts...");
    
    for(d=0;d<GEWUENSCHTE_ACCOUNTS; d++){
        let randomBank = await prisma.banks.findMany({select: {id:true}})
        const account={
            iban: fakerDE.finance.iban(),
            bankID: randomBank[Math.floor(Math.random() * randomBank.length)].id,
        }
        await prisma.accounts.create({data:account});
    }

    for(d=0; d<GEWUENSCHTE_CUSTOMERS; d++){
        let randomAccount = await prisma.accounts.findMany({select: {id:true}})
        const customer ={
            name: fakerDE.person.fullName(),
            email: fakerDE.internet.email(),
            accountID: randomAccount[Math.floor(Math.random() * randomAccount.length)].id
        }
        await prisma.customers.create({data: customer});
    }

    for(d=0;d<GEWUENSCHTE_TRANSAKTIONEN;d++){
        
    }


}

seed();