const form=document.getElementById('form');
const stringdata=document.getElementById('textbox');
const optCont = document.getElementById('optionContain');
const grid=document.getElementsByClassName('food-grid-con')[0];
const cardtemplate=document.createElement('div');
let total_cal=0;


let text="";
var _data={
  food:""
}





// for(var i=0;i<10;i++){
//   const clone=cardtemplate.cloneNode(true);
//   clone.innerHTML="";
//   clone.innerHTML=genTemplate("*",1,1,1,1);
//   grid.append(clone);
// }


 

    

function addData(){
if(stringdata.value!=""){
  const div=document.createElement('div');
  div.setAttribute('class','grid-items');
  div.innerText=stringdata.value;
  optCont.append(div);
  let inputdata=stringdata.value;
 
  console.log(inputdata);
    text+=inputdata+" ";
    
    
    stringdata.value="";
    _data.food=text;
    
}
}

//function to display data as cards



  
 async function sendBack(){
  document.getElementsByClassName('food-response-section')[0].classList.remove('hidden');
  grid.innerHTML="";
  let arr=optCont.children;
  let noOfCards=arr.length;
  for(var i=0;i<noOfCards;i++){
    const clone=cardtemplate.cloneNode(true);
    clone.setAttribute('class','food-response-display skeleton');
      clone.innerHTML="";
       clone.innerHTML=genTemplate("","","","","");
       grid.append(clone);
  }

 const data=await fetch('/', {
  method: "POST",
  body: JSON.stringify(_data),
  headers: {"Content-type": "application/json; charset=UTF-8"}
})
const results=await data.json();
grid.innerHTML="";
for(var i=0;i<results.parsed.length;i++){
  
  const clone=cardtemplate.cloneNode(true);
  clone.setAttribute('class','food-response-display')
  clone.classList.remove('skeleton');
let nutrivalue=document.querySelector('.nutri-value');

      clone.innerHTML="";
        clone.innerHTML=genTemplate(results.parsed[i].food.image,results.parsed[i].food.nutrients.ENERC_KCAL,results.parsed[i].food.nutrients.PROCNT,results.parsed[i].food.nutrients.FAT,results.parsed[i].food.nutrients.FIBTG);
       grid.append(clone);
       total_cal+=results.parsed[i].food.nutrients.ENERC_KCAL;
}
}




function genTemplate(image,cal,protein,fats,carb){
  var templateString=`<div class="food-response-image-container skeleton">
  <img src=${image} alt="" class="image">
</div>

<div class="food-response-data-container">
  <div class="response-wrapper" id="calories">
      <div class="value-wrapper">
        <img width="20" height="20" class="symbol" src="https://img.icons8.com/external-flat-juicy-fish/60/external-calories-gym-life-flat-flat-juicy-fish.png" alt="external-calories-gym-life-flat-flat-juicy-fish"/>
        <p class="nutri-part" style="color: white;">calories:</p>
      </div> 
      <p class="nutri-value skeleton" style="color: white;">${cal}</p>
  </div>
  <div class="response-wrapper" id="protein">
     <div class="value-wrapper">
       <img class="symbol" width="20" height="20" src="https://img.icons8.com/pulsar-gradient/48/protein-supplement.png" alt="protein-supplement" id="protein-icon"/>
       <p class="nutri-part" style="color: white;">protein:</p>
      </div> 
       <p class="nutri-value skeleton" style="color: white;">${protein}</p>
  </div>

    <div class="response-wrapper" id="fats">
        <div class="value-wrapper">
            <img class="symbol" width="20" height="20" src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-oil-industry-flaticons-flat-flat-icons.png" alt="external-oil-industry-flaticons-flat-flat-icons"/>
            <p class="nutri-part" style="color: white;">Fats:</p>
        </div> 
        <p class="nutri-value skeleton" style="color: white;">${fats}</p>
     </div>

  <div class="response-wrapper" id="carbs">
     <div class="value-wrapper">
       <img width="20" height="20" src="https://img.icons8.com/color/48/carbohydrates.png" alt="carbohydrates"/>
       <p class="nutri-part" style="color: white;">Carbohydrates:</p>
     </div> 
     <p class="nutri-value skeleton" style="color: white;">${carb}</p>
     </div>

</div>
</div>
`   

return templateString;
}
