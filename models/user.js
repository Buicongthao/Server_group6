const mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
    {
        userName:{type:String , require:true},
        userPass:{type:String , require:true} , 
        
    }, 

)

let userModel = mongoose.model('userModel' , userSchema);
module.exports = {userModel};