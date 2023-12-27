// which one hour period had the largest frequency of billys posted

const Analyser = require('../../analyser')

class BillyPerHourUsage extends Analyser {

    constructor() {
        super();
        this.outputDirectory = 'billys-per-hour/'
        this.maxDate = '';
        this.maxCount = 0;
        this.currentDateCount = 0;
        this.currentDate = '';
    }

    onMessage(message) {
        const date = new Date(message.timestamp).toDateString();

        // Reset count for a new date
        if (this.currentDate !== date) {
            this.currentDate = date;
            this.currentDateCount = 0;
        }

        // Increment count if the message matches
        if (message.data.includes('billyWeird')) {
            this.currentDateCount++;

            // Update max count and date if the current count is the new maximum
            if (this.currentDateCount > this.maxCount) {
                this.maxCount = this.currentDateCount;
                this.maxDate = message.timestamp;
            }
        }

        this.data = {
            maxDate: this.maxDate,
            maxCount: this.maxCount
        }

        this.exportResults(`billys-per-hour-usage.json`);
    }

}

module.exports = BillyPerHourUsage