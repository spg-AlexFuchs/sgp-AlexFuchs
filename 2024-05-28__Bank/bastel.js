const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { fakerDE } = require('@faker-js/faker');

let GEWUENSCHTE_BANKEN = 10;
let GEWUENSCHTE_CUSTOMERS = 60;
let GEWUENSCHTE_ACCOUNTS = 50;
let GEWUENSCHTE_TRANSAKTIONEN = 50;

async function seed(){
    console.log("seeding Banks");
    for(d=0; d<GEWUENSCHTE_BANKEN; d++){
        const bank ={
            bic: fakerDE.finance.bic(),
        }
        await prisma.banks.create({data: bank});
    }

    console.log("seeding accounts...");
    
    for(d=0;d<GEWUENSCHTE_ACCOUNTS; d++){
        let randomBank = await prisma.banks.findMany({select: {id:true}})
        let randomKontostand = parseFloat((Math.floor(Math.random() * 20000)+0.01).toFixed(2));
        const account={
            iban: fakerDE.finance.iban(),
            bankID: randomBank[Math.floor(Math.random() * randomBank.length)].id,
            kontostand: randomKontostand,
        }
        await prisma.accounts.create({data:account});
    }

    console.log("seeding customers...");
    for(d=0; d<GEWUENSCHTE_CUSTOMERS; d++){
        let randomAccount = await prisma.accounts.findMany({select: {id:true}})
        let randomdurchlaeufe = Math.floor(Math.random() * 10); 
        let accountID = randomAccount[Math.floor(Math.random() * randomAccount.length)].id;
        const customer ={
            name: fakerDE.person.fullName(),
            email: fakerDE.internet.email(),
            account: {
                connect:[
                    {id: accountID},
                ]
            }
        }
        await prisma.customers.create({data: customer});
        let customerZahl = await prisma.customers.findMany({});
        let id = await prisma.customers.findUnique({
            select: {id: true},
            where: {id: customerZahl.length}
        })
        for(i=0;i<randomdurchlaeufe;i++){
            await prisma.customers.update({
                where: {id: id.id},
                    data:{
                    account: {
                        connect:[
                            {id: randomAccount[Math.floor(Math.random() * randomAccount.length)].id},
                        ]
                    }
                }
            })
        }
    }

    console.log("seeding transactions...");
    for(d=0;d<GEWUENSCHTE_TRANSAKTIONEN;d++){
        let Accounts = await prisma.accounts.findMany({select: {id:true}});
        let randomAccount = Accounts[Math.floor(Math.random() * Accounts.length)].id;
        let randomAccount2 = Accounts[Math.floor(Math.random() * Accounts.length)].id;
        let randomKontostand = await prisma.accounts.findUnique({
            select: {kontostand: true},
            where: {id: randomAccount},
        });
        let randomKontostand2 = await prisma.accounts.findUnique({
            select: {kontostand: true},
            where: {id: randomAccount2},
        }); 
        let ueberweisungsbetrag = parseFloat((Math.floor(Math.random() * randomKontostand.kontostand)+0.01).toFixed(2));
        const transaktion={
            verwendungszweck: fakerDE.finance.transactionDescription(),
            date: fakerDE.date.recent(),
            amount: ueberweisungsbetrag,
            fromAccID: randomAccount,
            toAccID: randomAccount2,
        }
        await prisma.transactions.create({data: transaktion});
        await prisma.accounts.update({
            where: {id: randomAccount},
            data: {
                kontostand: randomKontostand.kontostand-ueberweisungsbetrag,
            }
        })
        await prisma.accounts.update({
            where: {id: randomAccount2},
            data: {
                kontostand: randomKontostand2.kontostand+ueberweisungsbetrag,
            }
        })
    }
}

seed();