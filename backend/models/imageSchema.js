const imageSchema = new Schema({
    filename: String,  // Original filename of the image
    contentType: String,  // MIME type of the image
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;