const db = require('./dataaccess/mongo-microserver')

async function quickstart() {

  let doc = {
    Labels: [],
    Landmarks:[]
  }
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  const fileName = './resources/BrII286n9s-.jpg';

  // Performs label detection on the image file
  const [result] = await client.labelDetection(fileName);
  const labels = result.labelAnnotations;
  console.log('Labels:');
  console.log(labels);
  doc.Labels = labels;

  // Performs landmark detection on the image file
  const [result2] = await client.landmarkDetection(fileName);
  const landmarks = result2.landmarkAnnotations;
  console.log('Landmarks:');
  doc.Landmarks = landmarks;
  await db.addLabelResult(doc);
}
quickstart();