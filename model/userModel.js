const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator:function(v){
                return /^\w([\.-]?\w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/.test(v);
            },
            message:"invalid email"
        },
        required:[true,"email is required"],
        unique:[true,"This email already exists"]
    },
    password:{
        type:String,
        required:true,
        minlength:[6,"Minimum password length is 6"]
    }
});
UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt=await bcrypt.genSalt(5);
    this.password=await bcrypt.hash(this.password,salt);
});
UserSchema.statics.login=async function(email,password){
    const seekuser=await this.findOne( { email });
    if(seekuser){
      const auth= await  bcrypt.compare(password,seekuser.password);
      if(auth){
        return seekuser
      }
      throw Error("incorrect password");
    }
throw Error("incorrect email");
}

const User=mongoose.model('User',UserSchema);
module.exports=User;