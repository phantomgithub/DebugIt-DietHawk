const mongoose=require('mongoose');
const connectdb=async function(){
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongoDB connected`);
    }
    catch(error){
        console.error(`Error: ${error.message}`);
        
    }

}
module.exports=connectdb;