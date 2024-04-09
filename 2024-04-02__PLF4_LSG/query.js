const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
console.log('here is my query:');
// TODO
async function query(){
    console.log('querying');
    let watchlist = await prisma.watchlist.findMany({
        select:{name:true},
        where:{benutzerId: (3)},
    });


for(let playlist of watchlist){
    console.log(playlist.name);
}
}
console.log("\n");

query().then(() => {
    console.log('done abfraging')});