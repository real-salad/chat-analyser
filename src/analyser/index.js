const fs = require('fs');

class Analyser {
    constructor() {
        this.data = {};
        this.outputDirectory = '';
        
    }

    onMessage(message) { }

    sortResults(results) {
        let foo = Object.entries(results);
        foo = foo.sort((a, b) => b[1] - a[1])
        return Object.fromEntries(foo);
    }

    exportResults(name) {
        //
        fs.writeFileSync(`output/${this.outputDirectory}${name}`, JSON.stringify(this.sortResults(this.data)))
    }
}

module.exports = Analyser