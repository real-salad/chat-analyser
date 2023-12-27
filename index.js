const MongoClient = require('mongodb').MongoClient;
const fs = require('fs')
const Parser = require('./src/parser');
const EmoteUsage = require('./src/reports/emote-usage');
const ComboUsage = require('./src/reports/combo-usage');
const months = require('./test-months.json');
const AnonBedIndex = require('./src/reports/anon-bed-index');
const RollUsage = require('./src/reports/roll-usage');

// MongoDB connection credentials
require('dotenv').config()
const port = process.env.PORT
const dbUser = process.env.USERNAME
const dbPass = process.env.PASSWORD
const dbName = process.env.DBNAME
const url = process.env.URL
const dbURL = `mongodb://${dbUser}:${dbPass}@${url}:${port}/${dbName}`;

// Function to query MongoDB and write results to a JSON file
async function queryAndWriteToJSON() {
    const emoteUsage = new EmoteUsage();
    const comboUsage = new ComboUsage();
    const anonBedIndex = new AnonBedIndex();
    const rollUsage = new RollUsage()
    const parser = new Parser([emoteUsage, /*comboUsage, anonBedIndex, rollUsage*/])

    try {
        const client = await MongoClient.connect(dbURL, { auth: { username: dbUser, password: dbPass } });
        const db = client.db(dbName);
        // Replace 'your_collection_name' with the actual name of your MongoDB collection
        const collection = db.collection('strimslogs');

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
