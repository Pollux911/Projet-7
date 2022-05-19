const multer = require('multer');
const path = require('path')

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
}

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../images"),
    filename: (req, file, callback) => {
        console.log(file, 'le fichierbackend')
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('image');