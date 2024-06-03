const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { fakerDE } = require('@faker-js/faker');

async function seed(){
    let transaktionen = await prisma.transactions.findMany({
        select: {amount: true, 
            fromAcc: {
                
            }
        },
    })

}


// von jeder transaktion das geld das überwiesen wurde zusammenrechnenn
// danach dasselbe bei allen die geld erhalten haben
// prüfen ob 1. minus 2. null ist