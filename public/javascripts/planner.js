let submit=document.getElementById('submit');
let options=document.querySelector('.diet-container').children;
let cals=document.getElementById('calory-input');
let container=document.getElementsByClassName('result-container')[0];
let _dta={
  
    cals:"",
    type:""
}
const map=["vegetarian","keto-friendly","vegan","high-fiber","low-carb"]
function option(opt){
    
    for(var i=0;i<options.length;i++){
if(options[i].getAttribute("id")==opt){
options[i].style.backgroundColor="rgb(95, 232, 237)";
options[i].style.color="white";

}
else
options[i].style.backgroundColor="white";
options[i].style.color="blue";

}
console.log(map[opt-1]);
_dta.type=map[opt-1];
}
async function add(){

_dta.cals=cals.innerText;


    const data=await fetch('/planner',{
        method: "POST",
        body: JSON.stringify(_dta),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      const ans=await data.json();

      container.innerHTML=addtemplate();
      console.log(ans.break,ans.lunch,ans.dinner);
      const b1=document.getElementById('b1');

      const l1=document.getElementById('l1');
     
      const d1=document.getElementById('d1');

       b1.setAttribute('src',ans.break.image);
       l1.setAttribute('src',ans.lunch.image);
       d1.setAttribute('src',ans.dinner.image);

  var bt=    document.getElementById("break-title")
  var lt=     document.getElementById("lunch-title")
  var dt=       document.getElementById("dinner-title")

  var bc=      document.getElementById("break-cals")
  var lc=document.getElementById("lunch-cals")
  var dc=document.getElementById("dinner-cals")

  var bs=    document.getElementById("break-serve")
  var ls=     document.getElementById("lunch-serve")
  var ds=    document.getElementById("dinner-serve")

   bt.innerText=   ans.break.label;
   lt.innerText=   ans.lunch.label;
   dt.innerText=   ans.dinner.label;


   bc.innerText=   "calory:  "+ans.break.calories;
   lc.innerText="calory:  "+ans.lunch.calories;
   dc.innerText="calory:  "+ans.dinner.calories;

  bs.innerText=  "servings:  "+ ans.break.NoPeople;
   ls.innerText=   "servings:  "+ ans.lunch.NoPeople;
   ds.innerText=   "servings:  "+ ans.dinner.NoPeople;
}
 function addtemplate(){
   return template=` <div class="breakfastcontainer">
    <div class="breakfast-result"><img id="b1"><div class="details"><h2 id="break-title"></h2><h3 id="break-cals"></h3><h3 id="break-serve"></h3></div></div>
    
    </div>
<div class="lunchcontainer">
    <div class="lunch-result"><img id="l1"><div class="details"><h2 id="lunch-title"></h2><h3 id="lunch-cals"></h3><h3 id="lunch-serve"></h3></div></div>
</div>
<div class="dinnercontainer">
    <div class="dinner-result"><img id="d1"><div class="details"><h2 id="dinner-title"></h2><h3 id="dinner-cals"></h3><h3 id="dinner-serve"></h3></div></div>
</div>`
 }