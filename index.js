var faker = require('faker');
const fs = require('fs');

const generateEmails = (amount = 10000)  => {
    const emails = [];
    for(let i=0; i < amount; i++){
        emails.push(faker.internet.email().toLowerCase())
    }

    return emails;
};

const generatePhones = (amount = 10000)  => {

    const countryCodes = require('./countryCodes.json');
    const phones = [];
    for(let i=0; i < amount; i++){
        const string = `+${countryCodes[Math.floor(Math.random() * countryCodes.length)]}${faker.phone.phoneNumberFormat().replace(/-/g, '')}`;
        phones.push(string.substring(0, string.length-2));
    }

    return phones;
};

const writeFile = (name, data) => {
    const content = JSON.stringify(data);
    fs.writeFileSync(`${name}.json`, content);

    console.log(`Congratz! You have written ${data.length} ${name}!`);
};

const getUnique = obj => {

    let arr = [];
    const keys = Object.keys(obj);
    keys.forEach(key => arr = [...arr, ...obj[key]]);
    const set = new Set(arr);

    return [...set];
};

// const emails = generateEmails(1000000);
// const oldEmails = require('./emailsOld.json');
// const unique = getUnique({ emails, oldEmails });
// writeFile('emails', unique);

const phones = generatePhones(10000);
const uniqueP = getUnique({ phones });
writeFile('phones', uniqueP);