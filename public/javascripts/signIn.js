


async function submit(){
    var name=document.getElementById("name").value;
let email=document.getElementById("email").value;
let password=document.getElementById("password").value;
    var payload={
        username:name,
        email:email,
        password:password,
    }
    const data=await fetch('/sign-in', {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
    
    var err=await data.json();
    console.log(err.error.email);

      

      if(err){
       document.getElementById("name").value="";
document.getElementById("email").value="";
document.getElementById("password").value="";
        if(err.error.email!=""){
            let emailError=document.getElementById('email');
            emailError.setAttribute('class','error');
            emailError.setAttribute('placeholder',err.error.email);

        }
 if(err.error.password!=""){
    let passwordError=document.getElementById('password');
    passwordError.setAttribute('class','error');
    passwordError.setAttribute('placeholder',err.password.email);
            
        }
      }
}