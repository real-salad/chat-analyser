const Analyser = require('../../analyser')

/**
 * The AnonBedIndex analyses the following:
 * - how many days of the year did anon send a message in chat?
 * - of those days, how many did he send a message that included the word "bed"?
 */
class AnonBedIndex extends Analyser {

    constructor() {
        super();
        this.daysWithAnon = 0;
        this.daysWithAnonAndBedtime = 0;
        this.daysWithAnonWithoutBedtime = 0;
        this.daysWithoutAnon = 0;
        this.lastProcessedDay = null;
        this.foundFooToday = false;
        this.foundBedtimeToday = false;
        this.outputDirectory = 'anon-bed-index/'
    }

    onMessage(message) {
        const date = new Date(message.timestamp).toDateString();

        // Check if we're still processing the same day
        if (this.lastProcessedDay !== date) {
            // Process the previous day's data
            this.processDayData();

            // Reset for the new day
            this.lastProcessedDay = date;
            this.foundFooToday = false;
            this.foundBedtimeToday = false;
        }

        // Check for 'anon' and 'Bedtime' in the message
        if (message.nick === 'anon') {
            this.foundFooToday = true;
            if (message.data && message.data.includes('bedtime')) {
                this.foundBedtimeToday = true;
            }
        }

        this.data = {
            daysWithAnon: this.daysWithAnon,
            daysWithoutAnon: this.daysWithoutAnon,
            daysWithAnonAndBedtime: this.daysWithAnonAndBedtime,
            daysWithAnonWithoutBedtime: this.daysWithAnonWithoutBedtime,
        }
        this.exportResults('anon-bed-index.json')
    }

    processDayData() {
        // If the lastProcessedDay is null, it means we are processing the first message
        if (this.lastProcessedDay === null) return;

        if (this.foundFooToday) {
            this.daysWithAnon++;
            if (this.foundBedtimeToday) {
                this.daysWithAnonAndBedtime++;
            } else {
                this.daysWithAnonWithoutBedtime++;
            }
        } else {
            this.daysWithoutAnon++;
        }
    }
}

module.exports = AnonBedIndex