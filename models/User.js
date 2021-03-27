const mongoose = require('mongoose');
const {isEmail,isURL} = require('validator');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: [40, 'name maximum characters length is 40']
    },
    email: {
        type: String,
        unique:true,
        trim:true,
        validate: [isEmail, 'Please fill a valid email address']
    },
    job:{
        type: String,
        maxlength: [40, 'job maximum characters length is 40 characters'],
        default:null
    },
    company:{
        type: String,
        maxlength: [40, 'company maximum characters length is 40 characters'],
        default:null
    },
    linkedin:{
        type: String,
        unique:true,
        validate: [isURL, 'Please fill a valid URL address'],
        default:null
    },
   biography:{
        type:String,
        maxlength:[200,'bigraphy maximum length is 200 characters'],
        default:null
   }
    
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);