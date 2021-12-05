const mongoose = require('mongoose');
const { Schema } = mongoose;

const annotationResultSchema = new Schema({
    Labels: [{}],
    Landmarks:[{}]
});

const AnnotationResult = mongoose.model('cloudvision', annotationResultSchema);

const dburl = 'mongodb://manalab:zxc123**@172.26.117.18:27017/instagram?authSource=admin&ssl=false';
(async () => {
    try {
        await mongoose.connect(dburl);
    } catch (error) {
        console.log("🚀 ~ error", error)
    }
})()

console.log("connected");

module.exports = {
    addLabelResult: async (result) => {
        const doc = new AnnotationResult(result);
        await doc.save();
    },
}
