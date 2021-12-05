// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();


(async () => {
    const pg = require('./dataaccess/pg-microserver')
    const mongo = require('./dataaccess/mongo-microserver')
    
    // Get post data
    const rows = await pg.getTouristPost(1, 10)

    for (let index = 0; index < rows.length; index++) {

        const row = rows[index]
        const filename = `I:\\post_images\\${row.shortcode}.jpg`

        console.log(`🚀 ~ processing.. (${index+1}/${rows.length}) ${filename}`)
        
        let doc = {
            Labels: [],
            Landmarks:[]
        }

        // Use Cloud Vision APIs for labeling and annotation
        // Performs label detection on the image file
        const [labelResult] = await client.labelDetection(filename);
        const labels = labelResult.labelAnnotations;
        doc.Labels = labels;

        // Performs landmark detection on the image file
        const [landmarkResult] = await client.landmarkDetection(filename);
        const landmarks = landmarkResult.landmarkAnnotations;
        doc.Landmarks = landmarks;

        // Save data to mongoDB
        await mongo.addLabelResult(doc);
    }

})();