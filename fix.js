
(async () => {
    const pg = require('./dataaccess/pg-microserver')
    const mongo = require('./dataaccess/mongo-microserver')

    const pgrows = await pg.getTouristPost(1, 10000)

    // Get label data
    const rows = await mongo.getAllLabelResult();
    for (let index = 0; index < rows.length; index++) {

        const row = rows[index]
        const pgrow = pgrows[index]

        const newRow =
        {
            number: pgrow.id,
            shortcode: pgrow.shortcode,
            Labels: row.Labels,
            Landmarks: row.Landmarks
        }
        // Update the document
        await mongo.updateLabelResult(row.id, newRow)
        console.log(`${row.id}...updated`);

    }

})();