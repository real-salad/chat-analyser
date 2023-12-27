const MongoClient = require('mongodb').MongoClient;
const fs = require('fs')
const Parser = require('./src/parser');
const EmoteUsage = require('./src/reports/emote-usage');
const ComboUsage = require('./src/reports/combo-usage');
const months = require('./test-months.json');
const AnonBedIndex = require('./src/reports/anon-bed-index');
const RollUsage = require('./src/reports/roll-usage');
const BillyCrewIndex = require('./src/reports/billy-crew');
const BillyPerHourUsage = require('./src/reports/billys-per-hour');
const LinkUsage = require('./src/reports/links');
const MessageMeta = require('./src/reports/message-meta');

// MongoDB connection credentials
require('dotenv').config()
const port = process.env.PORT
const dbUser = process.env.USERNAME
const dbPass = process.env.PASSWORD
const dbName = process.env.DBNAME
const url = process.env.URL
const collection_name = process.env.COLLECTION
const dbURL = `mongodb://${dbUser}:${dbPass}@${url}:${port}/${dbName}`;

// Function to query MongoDB and write results to a JSON file
async function queryAndWriteToJSON() {
    const anonBedIndex = new AnonBedIndex();
    const billyCrewIndex = new BillyCrewIndex();
    const billysPerHourUsage = new BillyPerHourUsage();
    const comboUsage = new ComboUsage();
    const emoteUsage = new EmoteUsage();
    const linkUsage = new LinkUsage();
    const messageMeta = new MessageMeta();
    const rollUsage = new RollUsage()

    const parser = new Parser([emoteUsage, comboUsage, anonBedIndex, rollUsage, billyCrewIndex, billysPerHourUsage, linkUsage, messageMeta])

    try {
        const client = await MongoClient.connect(dbURL, { auth: { username: dbUser, password: dbPass } });
        const db = client.db(dbName);
        // Replace 'your_collection_name' with the actual name of your MongoDB collection
        const collection = db.collection(collection_name);

        for (const month of months) {
            const { monthName, start, end } = month;
            console.log(`${monthName} starting...`)
            const query = { timestamp: { $gte: parseInt(start, 10), $lte: parseInt(end, 10) } }

            const queryResults = await collection.find(query).toArray();
            console.log(`${monthName}: ${queryResults.length} results found`)

            queryResults.forEach((message) => {
                parser.processMessage(message, monthName)
            })
            console.log(`${month.monthName} complete!`)
        }


        client.close();
    } catch (err) {
        console.error('Error:', err);
    }
}

// Call the function to start the process
queryAndWriteToJSON();
