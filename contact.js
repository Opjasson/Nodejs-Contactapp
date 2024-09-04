const fs = require('fs');

const chalk = require('chalk')


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


const simpanContact = (nama, noHp, email) => {
    const contact = { nama,noHp,email}
    const file= fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file)

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

module.exports = {simpanContact}