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
        
    })
    yargs.demandCommand();


    // menampilkan daftar semua nama & no Hp contact
yargs.command({
    command: 'list',
    describe: 'Menampilkan semua nama & no Hp contact',
    handler() {
        contact.listContact();
    }
})
    
// Menampilkan detail sebuah contact
yargs.command({
    command: 'detail',
    describe: 'Menampilkan semua data berdasarkan namanya',
    nama : {
        describe: 'Nama lengkap',
        demandOption: true,
        type: 'string'
    },
    handler(argv) {
        contact.detailContact(argv.nama);
    }
})

// menghapus contact berdasarkan nama

yargs.command({
    command : 'delete',
    command: 'delete',
    describe: 'Menghapus semua data berdasarkan namanya',
    nama : {
        describe: 'Nama lengkap',
        demandOption: true,
        type: 'string'
    },
    handler(argv) {
        contact.deleteContact(argv.nama);
    }
})


yargs.parse();



