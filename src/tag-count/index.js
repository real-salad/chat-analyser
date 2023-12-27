// average message length/longest message

const Analyser = require('../analyser/')

class TagCount extends Analyser {

    constructor() {
        super();
        this.outputDirectory = 'tag-count/'
        this.longestMessageLength = 0;
        this.longestMessageUser = '';
        this.averageMessageLength = 0;
        this.mostTaggedUser = '';
        this.runningCount = 0;
        this.totalMessageLength = 0;
    }

    onMessage(message, month) {
        const { entities } = message;
        if (!entities) return;
        const { nicks } = entities;
        if (!nicks) return;

        nicks.forEach((entity) => {
            if (!this.data[entity.nick]) this.data[entity.nick] = 0;

            this.data[entity.nick] = this.data[entity.nick] += 1;
        })
        this.data = this.formatData((a, b) => b[1] - a[1]);
        this.exportResults(`${month}-tag-count.json`);
    }

}

module.exports = TagCount