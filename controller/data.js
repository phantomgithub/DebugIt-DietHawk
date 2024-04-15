
const axios=require('axios');
var usermodel=require('../model/userModel');
const bcrypt=require('bcryptjs');
var jsonRes=require('../middleware/apicall')
let receiveddata="";
let getDatafromAPI=require('../middleware/apicall');
const jwt=require('jsonwebtoken');

exports.getData=async function(req, res, next) {
    res.render('homepage');
  }
exports.postData=async function(req,res,next){

const dat1=await fetch('https://api.edamam.com//api/food-database/v2/parser?app_id=2f932c4c&app_key=acb61965889d4c1c6fbcec54647e82ea&ingr='+req.body.food)
const dat2=await dat1.json();
res.json(dat2);
}
exports.sendData=function(req,res,next){
receiveddata=bug;
}
exports.sign_in=function(req,res,next){
    res.render('sign-in');
}
exports.post_sign_in=async function(req,res,next){
    var salt=await bcrypt.genSalt(10);

    var name=req.body.username;
    var email=req.body.email;
    var password=req.body.password;
     try{ 
        const ifexist=usermodel.findOne({email});
    const user=await usermodel.create({
        name,
        email,
        password
    });
    const token=createToken(user._id);
    res.cookie('payload47',token,{ httpOnly:true,maxAge:1000*60*60*24*3})
    res.redirect('/');
   }
   catch(err){
    const error=handleError(err);
    res.json({error});
   }
}
exports.logIn=function(req,res,next){
    res.render('log-in');
}
exports.postLogIn=async function(req,res,next){
    var email=req.body.email;
    var password=req.body.password;
try{
const seekuser=await usermodel.login(email,password);
const token=createToken(user._id);
res.cookie('payload47',token,{ httpOnly:true,maxAge:1000*60*60*24*3})
}
catch(err)
{
    const error=handleError(err);
    res.json({error});
}
}
exports.planner=function(req,res,next){
    res.render('planner');
}
exports.getPlan =async function(req,res,next){
    var dataBreak,dataLunch,dataDinner;
    const meal={
        breakfast:{
            recipes:""
        },
        lunch:{
            recipes:""
        },
        dinner:{
            recipes:""
        },
    }
    if(req.body.type=="low-carb" || req.body.type=="high-fiber")
    {
         dataBreak=await fetch('https://api.edamam.com/api/recipes/v2/?type=public&app_id=3585d849&app_key=e284a9d8b249c4d2b5769648195ded02&diet='+req.body.type+'&mealType=breakfast&calories='+(req.body.cals-30)/3+'-'+(req.body.cals)/3)
         dataLunch=await fetch('https://api.edamam.com/api/recipes/v2/?type=public&app_id=3585d849&app_key=e284a9d8b249c4d2b5769648195ded02&diet='+req.body.type+'&mealType=lunch&calories='+(req.body.cals-30)/3+'-'+(req.body.cals)/3)
         dataDinner=await fetch('https://api.edamam.com/api/recipes/v2/?type=public&app_id=3585d849&app_key=e284a9d8b249c4d2b5769648195ded02&diet='+req.body.type+'&mealType=dinner&calories='+(req.body.cals-30)/3+'-'+(req.body.cals)/3)
    }
else
{
    dataBreak=await fetch('https://api.edamam.com/api/recipes/v2/?type=public&app_id=3585d849&app_key=e284a9d8b249c4d2b5769648195ded02&health='+req.body.type+'&mealType=breakfast&calories='+(req.body.cals-30)/3+'-'+(req.body.cals)/3)
     dataLunch=await fetch('https://api.edamam.com/api/recipes/v2/?type=public&app_id=3585d849&app_key=e284a9d8b249c4d2b5769648195ded02&health='+req.body.type+'&mealType=lunch&calories='+(req.body.cals-30)/3+'-'+(req.body.cals)/3)
     dataDinner=await fetch('https://api.edamam.com/api/recipes/v2/?type=public&app_id=3585d849&app_key=e284a9d8b249c4d2b5769648195ded02&health='+req.body.type+'&mealType=dinner&calories='+(req.body.cals-30)/3+'-'+(req.body.cals)/3)
}
    const finDB= await dataBreak.json();
    const finDL= await dataLunch.json();

    const finDD= await dataDinner.json();

    console.log(finDB);
    var Bi=Random(finDB.hits.length);
    var Li=Random(finDL.hits.length);
    var Di=Random(finDD.hits.length);
    console.log(Bi);

    console.log(finDB.hits[Bi].recipe.label);



    var sendData={
        break:{
            label:finDB.hits[Bi].recipe.label,
            image:finDB.hits[Bi].recipe.images.REGULAR.url,
            NoPeople:finDB.hits[Bi].recipe.yield,
            calories:finDB.hits[Bi].recipe.calories
        },
        lunch:{
            label:finDL.hits[Li].recipe.label,
            image:finDL.hits[Li].recipe.images.REGULAR.url,
            NoPeople:finDL.hits[Li].recipe.yield,
            calories:finDL.hits[Li].recipe.calories
        },
        dinner:{
            label:finDD.hits[Di].recipe.label,
            image:finDD.hits[Di].recipe.images.REGULAR.url,
            NoPeople:finDD.hits[Di].recipe.yield,
            calories:finDD.hits[Di].recipe.calories
        }
    }
res.json(sendData);

}

const createToken=function(id){
    return jwt.sign({ id },process.env.JSONSECRET,{
        expiresIn:60*60*24*3
    })
}

const handleError = function(err){
    console.log(err.message,err.code);
    let error={email:'',password:''};

    //if already exists user
    if(err.code==11000){
        console.log("user hai yaar")
        error.email="Email already registered";
        return error;
    }
    // wrong email
    if(err.message=='incorrect email'){
        error.email="Entered email does not exist"
    }
    // wrong password
    if(err.message=='incorrect password'){
        error.email="Entered password is wrong";
    }
    //if password is wrogn
    if(err.message.includes('user validation failed')){
        error.email="Invalid email or password";
    }
    return error;
}

function Random(max){
    return Math.floor(Math.random() * (max-1));
}

