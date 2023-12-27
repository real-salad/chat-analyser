// which one hour period had the largest frequency of billys posted

const Analyser = require('../../analyser')

class BillyPerHourUsage extends Analyser {

    constructor() {
        super();
    }

    onMessage(message) {

        // this.exportResults(`link-usage.json`);
    }

}

module.exports = BillyPerHourUsage