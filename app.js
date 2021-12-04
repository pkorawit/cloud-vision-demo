
(async () =>  {
    const db = require('./dataaccess/mongo-microserver')

    // const rows = await db.getTouristPost(1,100)
    // console.log("🚀 ~ rows", rows)

    const rows = await db.updateTouristPost(1, 'Test Label', 'Big Buddha')
    console.log("🚀 ~ rows", rows)

})();