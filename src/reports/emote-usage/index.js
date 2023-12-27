const Analyser = require('../../analyser')

class EmoteUsage extends Analyser {

    constructor() {
        super();
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

        this.exportResults(`emotes/${month}-emote-usage.json`);
    }

}

module.exports = EmoteUsage