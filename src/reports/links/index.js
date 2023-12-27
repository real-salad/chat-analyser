// user who posted most links
// user who posted most links from twitter / nitter

const Analyser = require('../../analyser')

class LinkUsage extends Analyser {

    constructor() {
        super();
        this.outputDirectory = 'links/'
    }

    onMessage(message) {

        // this.exportResults(`link-usage.json`);
    }

}

module.exports = LinkUsage