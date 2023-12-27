class Parser {
    constructor(analysers) {
        this.analysers = analysers
    }

    processMessage(message, month) {
        
        this.runAnalysis(message, month)
    }

    runAnalysis(message, month) {
        this.analysers.forEach((analyser) => {
            analyser.onMessage(message, month)
        })
    }
}

module.exports = Parser