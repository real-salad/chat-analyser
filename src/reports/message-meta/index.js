// average message length/longest message

const Analyser = require('../../analyser')

class MessageMeta extends Analyser {

    constructor() {
        super();
        this.outputDirectory = 'message-meta/'
        this.longestMessageLength = 0;
        this.longestMessageUser = '';
        this.averageMessageLength = 0;
        this.mostTaggedUser = '';
        this.runningCount = 0;
        this.totalMessageLength = 0;
    }

    onMessage(message) {
        this.runningCount++
        if (message.data.length > this.longestMessageLength) {
            this.longestMessageLength = message.data.length
            this.longestMessageUser = message.nick;
        }
        this.totalMessageLength += message.data.length;
        this.averageMessageLength = this.totalMessageLength / this.runningCount;

        this.data = {
            longestLength: this.longestMessageLength,
            longestBy: this.longestMessageUser,
            average: Math.floor(this.averageMessageLength)
        }

        this.exportResults(`message-meta.json`);
    }

}

module.exports = MessageMeta