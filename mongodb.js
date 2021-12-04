(async () => {
    const db = require('./dataaccess/mongo-microserver')

    data = {
        labelResult: [{
            description: "Test description labelResult", score: 0.985565, topicality: 0.556
        }],
        landMarkResult:  [{
            description: "Test description landMarkResult", score: 0.985565, topicality: 0.556
        }]
    }
    await db.addLabelResult(data)

})();