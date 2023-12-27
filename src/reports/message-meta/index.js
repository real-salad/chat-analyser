// average message length/longest message
// most tagged user

const Analyser = require('../../analyser')

class MessageMeta extends Analyser {

    constructor() {
        super();
        this.outputDirectory = 'message-meta/'
    }

    onMessage(message) {

        this.exportResults(`message-meta.json`);
    }

}

module.exports = MessageMeta