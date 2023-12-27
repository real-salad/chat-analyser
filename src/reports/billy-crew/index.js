// how many messages has the cringe crew send without a weirdface

const Analyser = require('../../analyser')

class BillyCrewIndex extends Analyser {

    constructor() {
        super();
        this.outputDirectory = 'billy-crew/'
    }

    onMessage(message) {

        this.exportResults(`billy-crew-index.json`);
    }

}

module.exports = BillyCrewIndex
