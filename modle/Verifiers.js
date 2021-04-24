const mongoose = require("mongoose");
const crypto=require ("crypto")
const validator = require("validator");
const bcrypt = require("bcryptjs");
const schema=new mongoose.Schema({
    
    number:{type:Number,required:true},
    verifyTime:{type:Date,default:Date.now()},
    link:{type:String},
    place:{type:mongoose.ObjectId,ref: 'COVID'},
    active:{type:Boolean,default:false},
    ////////////////////////
    token:{type:String},
    validtill:{type:Date}
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  });
schema.methods.comparetoken=async function(usertoken,dbtoken){
    return crypto
    .createHash('sha256')
    .update(usertoken)
    .digest('hex') == dbtoken;
}
schema.methods.generateotp=async function (){
    let token=crypto.randomBytes(3).toString('hex');
    this.token=crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
    this.validtill=Date.now()+2*60*1000;
    return token;
}
model=mongoose.model("VERIFIERS",schema);
module.exports=model;