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

        const request = this.lastMessage.data.split(' ');
        const results = message.data.split(' ');

        const seekResults = results.findIndex((ele) => ele === 'rolled');
        const seekRequest = request.findIndex((ele) => ele === '!roll')

        const requestDice = request[seekRequest + 1];
        const resultUser = results[seekResults - 1];
        const resultAmount = results[seekResults + 1];

        this.data[resultUser] = { ...this.data[resultUser], [this.sanitizeRequestDice(requestDice)]: resultAmount }

        this.lastMessage = message
        this.exportResults(`roll-usage.json`);
    }

}

module.exports = RollUsage