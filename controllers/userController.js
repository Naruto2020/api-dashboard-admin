const {User} = require("../models/user");
const objetId = require("mongoose").Types.ObjectId

// C
module.exports.signUp =  (req, res)=>{
    const  { nom , username, email, password} = req.body;
    
    try{
        const newUser =   new User({ nom , username, email, password});
        // enregistrement du profil 
        newUser.save((err, docs) =>{
            if(!err)
              return res.send(docs);
            return res.status(500).send(`erreur lors de l'enregistrement de l'utilisateur ${JSON.stringify(err, undefined, 2)}`);  
        });
    }catch(err){
        res.status(400).send(err);
    }
}

//R
module.exports.getAllUsers = (req, res)=>{
    try{
        User.find((err, docs)=>{
            if(!err)
              return res.send(docs);
            return res.status(500).send(`err not  user found`);  
        }).select("-password");

    }catch(err){
        return res.status(400).send(err);
    }
};

module.exports.currentUser =  (req, res)=>{
    if(!objetId.isValid(req.params.id))
      res.status(400).send(`Id invalide ${req.params.id}`);

    try{
        User.findById(
            req.params.id,
            (err, docs)=>{
                if(!err)
                  return res.send(docs);
                return res.status(500).send(`utilisateur introuvable ou inexistant`);  
            }
        ).select("-password");
    }catch(err){
        return res.status(400).send(err);
    }  
}

// number of users 

module.exports.numUsers = (req, res) =>{
    try{
        User.countDocuments(
            {},
            (err, count)=>{
                if(!err)
                  return res.json({count:count});
                return res.status(500).send(`users not founds`);  
            }
        );
    }catch(err){
        return res.status(400).send(err);
    }
};

//U

module.exports.editUser =  async (req, res)=>{
    if(!objetId.isValid(req.params.id))
      return res.status(400).send(`Id invalide ${req.params.id}`);

    let newUser = {
        nom : req.body.nom , 
        username : req.body.username
    };
    try{
        await User.findByIdAndUpdate(
            req.params.id,
            {$set:newUser},
            {new:true, upsert:true, setDefaultsOnInsert: true},
            (err, docs)=>{
                if(!err){
                    return res.send(docs);

                }else{

                    return res.status(500).send(`err lors de la maj du compte user`);  
                }
            }
        );
    }catch(err){
        return res.status(400).send(err);
    }  
};

// D

module.exports.deleteUser = (req, res) =>{
    if(!objetId.isValid(req.params.id))
      return res.status(400).send(`Id invalide ${req.params.id}`);
    
    try{
        User.findByIdAndDelete(
            req.params.id,
            (err, docs) =>{
                if(!err)
                  return res.send(docs);
                return res.status(500).send(`erreur lors de la suppression du compte utilisateur `);  
            }
        );
    }catch(err){
        return res.status(400).send(err);
    }  
};