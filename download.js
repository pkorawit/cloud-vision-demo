// Download post image

(async () => {

    const mongo = require('./dataaccess/mongo-microserver')
    const downloadHelper = require('./lib/downloadHelper')

    // Edit here to select a range of post data
    const docs = await mongo.getPostRange(1,10)
    const storageUri = `I:\\post_images_sandbox`


    for (let index = 0; index < docs.length; index++) {

        const { shortcode } = docs[index]
        const url = `https://www.instagram.com/p/${shortcode}/media/?size=l`

        try {                        
            await downloadHelper.downloadImage(url, `${storageUri}\\${shortcode}.jpg`)
            console.log(`${index + 1}/${docs.length} : ${shortcode} ... downloaded`);
        }
        catch (err) {
            console.log(`${index + 1}/${docs.length} : ${shortcode} ... error`);            
            console.log("🚀 ~ url", url)
        }

        

    }

})();