const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
console.log('here is my query:');
// TODO
async function query(){
    console.log('querying');
    let playLists = await prisma.watchlist.findMany({
        select:{name:true},
        where:{benutzerid: (3)},
    });


for(let playlist of playLists){
    console.log(playlist.name);
}
}
console.log("\n");


