// user who posted most links
// user who posted most links from twitter / nitter

const Analyser = require('../../analyser')

class LinkUsage extends Analyser {

    constructor() {
        super();
        this.outputDirectory = 'links/'
    }

    onMessage(message) {

        if (message.nick === 'psrngafk' || 'Bot') return;
        const { entities } = message;

        if (!entities) return;
        const { links } = entities;

        if (!links) return;

        if (!this.data[message.nick]) {
            this.data[message.nick] = 0;
        }

        this.data[message.nick] ? this.data[message.nick] += 1 : 0;

        this.data = this.formatData((a, b) => b[1] - a[1]);
        this.exportResults(`link-usage.json`);
    }

}

module.exports = LinkUsage