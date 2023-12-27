const Analyser = require('../../analyser')

class ComboUsage extends Analyser {
    constructor() {
        super();
        this.outputDirectory = 'combos/'
        this.lastMessage = null
        this.comboCounter = {}
        this.isFirstFlag = false;
    }

    checkEntities(entities) {
        if (entities.emotes) {
            const { emotes } = entities;
            if (emotes) {
                const { combo } = emotes[0];
                if (combo) {
                    return true;
                } else return false
            } else return false
        } else return false
    }

    onMessage(message, month) {
        const { entities } = message;
        const validForCombo = this.checkEntities(entities)

        if (validForCombo) {
            const { combo } = entities.emotes[0];
            let currentHighestCombo = this.comboCounter[entities.emotes[0].name]
            if (!currentHighestCombo) currentHighestCombo = 0;
            this.comboCounter[entities.emotes[0].name] = (combo > currentHighestCombo) ? combo : currentHighestCombo;
        }

        this.data = this.comboCounter
        this.exportResults(`${month}-combos.json`);
    }
}

module.exports = ComboUsage