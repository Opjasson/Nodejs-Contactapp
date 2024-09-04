// akses data menggunakan terminal

const yargs = require("yargs");
const contact = require('./contact')



yargs.command({
    command : 'add',
    describe: 'Menambahkan contact baru',
    builder : {
        nama : {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string',
        },
        noHp: {
            describe: 'No handphone',
            demandOption: true,
            type : 'string'
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string',
        }
    },
    handler(argv) {
        contact.simpanContact(argv.nama, argv.noHp, argv.email)
        }
        
    }
    
);
yargs.parse();

// const contacts = require('./contact')

// const main = async () => {
//     const nama = await contacts.tulisPertanyaan('Masukan nama anda : ');
//     const noHp = await contacts.tulisPertanyaan('Masukan noHp anda : ');
//     const email = await contacts.tulisPertanyaan('Masukan email anda : ');

//     contacts.simpanContact(nama, noHp, email) 
   
// }

// main()


