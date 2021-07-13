//here will crete the user model and schema 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = 'supersecret';

const userSchema = new mongoose.Schema(
    {
        username : {
            type :String ,
              required:true ,
              

        },
        email :{
            type :String ,
            required:true ,
            unique:true
        },

        password: {
            type: String,
            required:true ,

        }
     

    }
);




userSchema.virtual('token').get(function () {
    let tokenObject = {
      username: this.username,
    
    };
    return jwt.sign(tokenObject,SECRET,{expiresIn: '15m'});
  });
  
  userSchema.pre('save', async function () {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  });
  
  
  // BASIC AUTH
  userSchema.statics.authenticateBasic = async function (username,password) {
      const user = await this.findOne({ username })
    //   const email = await this.findOne({email})
      const valid = await bcrypt.compare(password, user.password)
      if (valid) { return user; }
      throw new Error('Invalid User');
    }
  
  
  
  // BEARER AUTH
  userSchema.statics.authenticateWithToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token,SECRET);
      const user = await this.findOne({ username: parsedToken.username });
      if (user) { return user; }
      else{
        throw new Error('User Not Found');
      }
    
    } catch (e) {
      throw new Error(e.message);
    }
  };
  
  
  
  

module.exports=mongoose.model("User",userSchema);