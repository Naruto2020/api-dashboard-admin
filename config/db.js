// initialisation de la bdd avec le framework mongoose
const mongoose = require("mongoose");
const MONGODB_URI = "mongodb+srv://" + process.env.DB_USER_PASS  + "@cluster0.0jnb7.mongodb.net/CRUD-review";

// connexion à mongo atlas 
mongoose.connect(MONGODB_URI,
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false,
        useCreateIndex: true
    },
    (err)=>{
        if(!err){
            console.log("connecter avec succes a mongodb!...");
        }else{

            console.log("erreur de connexion avec la bd:" + JSON.stringify(err, undefined, 2));  
        }

    }
);

module.exports = mongoose;