const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function query() {
    console.log('querying');
    let watchlist = await prisma.watchlist.findMany({
        select: { name: true },
        where: { benutzerId: 3 }, // Keine Klammern um die Benutzer-ID
    });

    for (let playlist of watchlist) {
        console.log(playlist.name);
    }

    const benutzerMitSong = await prisma.benutzer.findMany({
        select: {Fullname: true},
        where: {
            Watchlist: {
                some: {
                    Track: {
                        some: {
                            name: "Endless Love" // Hier den Namen des gesuchten Songs einfügen
                        }
                    }
                }
            }
        }
    });
}

console.log('here is my query:');
console.log('\n');

