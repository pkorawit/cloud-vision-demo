const mongoose = require('mongoose');
const { Schema } = mongoose;

const annotationResultSchema = new Schema({
    number: Number,
    shortcode: String,
    Labels: [{}],
    Landmarks:[{}]
});

const PostSchema = new Schema({
    created_at: Date,
    shortcode : String,
    media: Object
});

const AnnotationResult = mongoose.model('cloudvision', annotationResultSchema);
const Post =  mongoose.model('instagrams', PostSchema);

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

    getAllPost: async () => {
        return await Post.find({}).limit(10).exec();
    },

    getPostRange: async (start, end) => {
        return await Post.find({}).skip(start - 1).limit(end - start + 1).exec();
    },
}
