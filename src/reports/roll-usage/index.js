const Analyser = require('../../analyser')

class RollUsage extends Analyser {

    constructor() {
        super();
        this.lastMessage = null;
        this.rollData = null;
    }

    onMessage(message, month) {

        if (!this.lastMessage) {
            this.lastMessage = message;
        }
        const isBot = message.nick
        if (!isBot) return;

        const isRoll = message.data.includes('!roll');

        if (isRoll) {
            this.rollData = this.lastMessage.data;
            console.log(this.rollData)
        }

        // this.exportResults(`${month}-emote-usage.json`);
    }

}

module.exports = RollUsage