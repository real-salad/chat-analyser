// how many messages has the cringe crew send without a weirdface

const Analyser = require('../../analyser')

class BillyCrewIndex extends Analyser {

    constructor() {
        super();
        this.outputDirectory = 'billy-crew/'
        this.billyCrew = ['Xymos', 'Versicarius', 'anon', 'argonlo']
    }

    fromCrew(message) {
        return this.billyCrew.find(message.nick)
    }
    hasFace(message) {
        return message.data.includes('billyWeird')
    }

    onMessage(message) {
        const fromCrew = this.fromCrew(message)
        const hasFace = this.hasFace(message);
        this.exportResults(`billy-crew-index.json`);
    }

}

module.exports = BillyCrewIndex
