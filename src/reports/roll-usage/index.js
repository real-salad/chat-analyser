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

    onMessage(message) {
        const isBot = message.nick === 'Bot'
        if (!isBot) { this.storeMessage(message); return; }
        const hasRolled = message.data.includes('rolled')
        if (!hasRolled) { this.storeMessage(message); return; }
        if (!this.lastMessage) {
            this.lastMessage = message;
        }
        console.log(this.lastMessage.data, message.data)

        this.lastMessage = message
        this.exportResults(`roll-usage.json`);
    }

}

module.exports = RollUsage