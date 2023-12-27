const fs = require('fs');

class Analyser {
    constructor() {
        this.data = {};
        this.outputDirectory = '';

    }

    onMessage(message) { }

    formatData(sortFunction) {
        // sort data in descending order by # of tags
        // give only the top 10 results
        console.log(sortFunction)
        return Object.fromEntries(Object.entries(this.data).sort(sortFunction).slice(0, 9));
    }

    exportResults(name) {
        //
        console.log(this.data)

        fs.writeFileSync(`output/${this.outputDirectory}${name}`, JSON.stringify())
    }
}

module.exports = Analyser