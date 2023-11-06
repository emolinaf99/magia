const {resolve,extname} = require('path');
const {existsSync,mkdirSync} = require('fs');

const multer = require('multer');

const destination = function(req,file,cb){
    let folder = resolve(__dirname,'..','..','public','media');
    if(!existsSync(folder)){
        mkdirSync(folder)
    }
    return cb(null,folder)
};

const filename = function(req,file,cb){
    let unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    let name = file.fieldname + '-' + unique + extname(file.originalname);
    return cb(null,name)
};

const upload = multer({
    storage:multer.diskStorage({destination,filename})
});

module.exports = upload; 