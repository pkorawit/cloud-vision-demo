const mongoose = require('mongoose');
const { Schema } = mongoose;

const annotationResultSchema = new Schema({
    number: Number,
    shortcode: String,
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

    getAllLabelResult: async () => {
        return await AnnotationResult.find({}).exec();
    },

    getLabelResult: async (id) => {
        return await AnnotationResult.findOne({id: id}).exec();
    },

    updateLabelResult: async (id, result) => {       
        const doc = await AnnotationResult.findOne({_id: id}).exec();
        doc.overwrite(result);
        await doc.save();
    },
}
