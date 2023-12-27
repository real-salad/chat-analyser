const Analyser = require('../../analyser')

class EmoteUsage extends Analyser {

    constructor() {
        super();
        this.outputDirectory = 'emote-usage/'
    }

    onMessage(message, month) {
        //
        const { entities } = message;
        if (!entities) return;
        const { emotes } = entities;
        if (!emotes) return;

        emotes.forEach((emote) => {
            let emoteData = this.data[emote.name];
            if (!emoteData) this.data[emote.name] = 0;
            this.data[emote.name] += 1;
        })

        this.exportResults(`${month}-emote-usage.json`);
    }

}

module.exports = EmoteUsage