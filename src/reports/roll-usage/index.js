const Analyser = require('../../analyser')

class RollUsage extends Analyser {

    constructor() {
        super();
        this.outputDirectory = 'roll-usage/'
        this.lastMessage = null;
        this.rollData = null;
    }

    storeMessage(message) {
        this.lastMessage = message
    }
    sanitizeRequestDice(request) {
        const initial = request.split('+')[0]
        const output = initial.split('d')
        return output[output.length - 1];
    }

    onMessage(message) {
        const isBot = message.nick === 'Bot'
        if (!isBot) { this.storeMessage(message); return; }

        const hasRolled = message.data.includes('rolled')
        if (!hasRolled) { this.storeMessage(message); return; }

        if (!this.lastMessage) {
            this.lastMessage = message;
        }

        const happyPath = /\d+d\d+/g
        const otherPath = / \d+.+/g
        const hasMod = message.data.indexOf('+')
        let modAmount = 0;
        if (hasMod >= 0) {
            modAmount = Number(message.data.splice(hasMod + 1, message.data.length));
        }


        this.lastMessage = message
        this.exportResults(`roll-usage.json`);
    }

}

module.exports = RollUsage