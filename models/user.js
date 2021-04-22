const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        nom : {
            type: String,
            required: true,
            minlength : 3,
            maxlength : 55
        },
     
        username : {
            type:String,
            required: true,
            minlength : 3,
            maxlength : 55,
            unique: true,
            trim : true
        },
        password : {
            type: String,
            required: true,
            minlength : 6,
            maxlength : 1024
    
        },
    
        email : {
            type: String,
            required: true,
            lowercase:true,
            unique:true,
            match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            trim:true
        },
     
        phone : {
            type : Number,
            //required: 'le champ coordonnees doit etre remplit',
        },
    
    }
);

const User = mongoose.model("User", userSchema); 
module.exports = {User};