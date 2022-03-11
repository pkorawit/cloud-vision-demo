// Transform cloud-vision result from mongodb to pg

(async () => {
    const pg = require('./dataaccess/pg-microserver')
    const mongo = require('./dataaccess/mongo-microserver')

    // Edit here to select a range of post data
    const docs = await mongo.getAllLabelResult()


    for (let index = 0; index < docs.length; index++) {

        const { number, Labels, Landmarks } = docs[index]

        const labels = Labels.map((x) => x.description).join(",")
        // console.log("🚀 ~ labels", labels)

        const landmarks = Landmarks.map((x) => x.description).join(",")
        // console.log("🚀 ~ landmarks", landmarks)

        await pg.updateTouristPost(number, labels, landmarks)
        console.log(`${index+1}/${docs.length} : Updated... ${number}`);

    }

})();