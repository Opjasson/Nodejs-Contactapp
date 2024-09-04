const fs = require('fs');

const chalk = require('chalk');
const yargs = require('yargs');


// membuat folder data
const dirPath = './data'
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}

// membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]','utf-8')
}

const loadContact = () => {
   
    const file= fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file)
    return contacts;
}


const simpanContact = (nama, noHp, email) => {
    // const file= fs.readFileSync('data/contacts.json', 'utf-8');
    // const contacts = JSON.parse(file)
    const contact = { nama,noHp,email}
    const contacts = loadContact()

    // cek duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if(duplikat) {
        console.log(
            chalk.red.inverse.bold('Contact sudah terdaftar, gunakan nama lain!')
        );
        return false;
    }
    // cek email
    const validator = require('validator')
    if(email){
        if(!validator.isEmail(email)){
            console.log(
                chalk.red.inverse.bold('Email harus valid!')
            );
            return false;
        }
    }
    // cek noHp
    if(!validator.isMobilePhone(noHp,'id-ID')){
        console.log(
            chalk.red.inverse.bold('Nomor hp tidak valid')
        )
        return false;
    }


    contacts.push(contact);

    fs.writeFileSync('data/contacts.json',JSON.stringify(contacts))
    console.log('Terimakasih sudah memasukan data')

    console.log(contacts)

}

// display nama & number phone contact
const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.cyan.inverse.bold('Daftar contact : '))
    contacts.forEach((contact, i) => {
        console.log(`${i + 1 }. ${contact.nama} - ${contact.noHp}`)
    })
}


// Display detail contact 
const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find((contact)=> contact.nama.toLowerCase() === nama.toLowerCase())
    
    if(!contact){
        console.log(
            chalk.red.inverse.bold(`${nama} tidak ditemukan`)
        )
        return false;
    }else {
        console.log(
            chalk.green.inverse.bold(`Data ditemukan !\n`)
        )
        console.log(
            chalk.red.inverse.bold(`Nama :  ${contact.nama}`)
        )
        if(contact.email){
            console.log(
                chalk.red.inverse.bold(`Email : ${contact.email}`)
            )
        }
        console.log(
            chalk.red.inverse.bold(`No Hp : ${contact.noHp}`)
        )
    }
}

// Delete contact by name
const deleteContact = (nama) => {
    const contact = loadContact();
    const newContact = contact.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
);
console.log(newContact)
console.log(contact)

if(contact.length === newContact.length){
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
}

fs.writeFileSync('data/contacts.json',JSON.stringify(newContact))
console.log(`${nama} Berhasil dihapus`)


}



module.exports = {simpanContact, listContact, detailContact, deleteContact}