async function quickstart() {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  const fileName = './resources/BrII286n9s-.jpg';

  // Performs label detection on the image file
  const [result] = await client.labelDetection(fileName);
  const labels = result.labelAnnotations;
  console.log('Labels:');
  labels.forEach(label => {
    console.log(label.description)
  });

  // Performs landmark detection on the image file
  const [result2] = await client.landmarkDetection(fileName);
  const landmarks = result2.landmarkAnnotations;
  console.log('Landmarks:');
  landmarks.forEach(landmark => console.log(landmark));
}
quickstart();