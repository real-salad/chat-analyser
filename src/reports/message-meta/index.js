// average message length/longest message
// most tagged user

const Analyser = require('../../analyser')

class MessageMeta extends Analyser {

    constructor() {
        super();
    }

    onMessage(message) {

        // this.exportResults(`message-meta.json`);
    }

}

module.exports = MessageMeta