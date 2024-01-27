//! ____________________________Nav Bar__________________________
function closeSideBar() {
  let outerWidth = $(".bar").outerWidth();
  $(".sideBar").animate({ left: -outerWidth });
  $("#bar").removeClass("fa-sharp fa-solid fa-x");
  $("#bar").addClass("fa-solid fa-bars");
  $(".sideBar .bar li a").animate({ top: "300px" }, 100);
}
closeSideBar();
$("#bar").click(function () {
  if ($(".sideBar").css("left") == "0px") {
    closeSideBar();
  } else {
    $(".sideBar").animate({ left: 0 });
    $("#bar").addClass("fa-sharp fa-solid fa-x");
    $("#bar").removeClass("fa-solid fa-bars");
    for (let i = 0; i <= 5; i++) {
      $(".sideBar .bar li a")
        .eq(i)
        .animate({ top: 0 }, i * 200);
    }
  }
});
searchByName("");
// ^_________________________search By Name______________________
async function searchByName(Name) {
  document.getElementById("itemData").innerHTML = "";
  $(".loading").removeClass("d-none");
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${Name}`
  );
  let response = await api.json();
  showData(response.meals);
  $(".loading").addClass("d-none");
}
// *_________________________Show Data______________________
function showData(data) {
  let temp = ` `;
  for (let i = 0; i < data.length; i++) {
    temp += `<div onclick="getDetails(${data[i].idMeal})" class="col-md-3 item g-3">
    <div class="position-relative">
        <img src="${data[i].strMealThumb}" class="w-100 rounded"/>
        <div class="layer position-absolute bg-white w-100 overflow-hidden rounded d-flex align-items-center bg-opacity-75 start-0 end-0 bottom-0">
            <h3>${data[i].strMeal}</h3>
        </div>
    </div>
</div>`;
  }
  document.getElementById("itemData").innerHTML = temp;
}
// ~_________________________Get Category______________________
async function GetAllCategory() {
  document.getElementById("itemData").innerHTML = "";
  $(".loading").removeClass("d-none");
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let response = await api.json();
  showCategories(response.categories);
  $(".loading").addClass("d-none");
}
// &__________________show Category______________________

function showCategories(data) {
  closeSideBar();
  let temp = ` `;
  for (let i = 0; i < data.length; i++) {
    temp += `<div onclick="getCategory('${data[i].strCategory}')" class="col-md-3 item g-3">
    <div class="position-relative">
        <img src="${data[i].strCategoryThumb}" class="w-100 rounded"/>
        <div class="layer position-absolute bg-white w-100 overflow-hidden rounded d-flex align-items-center bg-opacity-75 start-0 end-0 bottom-0 flex-column">
        <h3>${data[i].strCategory}</h3>
        <p class="text-center">${data[i].strCategoryDescription}</p>
        </div>
    </div>
</div>`;
  }
document.getElementById("inputs").innerHTML = " ";
  document.getElementById("itemData").innerHTML = temp;
}
$("#Category").click(function () {
  GetAllCategory();
});
// ?__________________Get All Area______________________
async function GetAllArea() {
  document.getElementById("itemData").innerHTML = "";
  $(".loading").removeClass("d-none");
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let response = await api.json();
  console.log(response.meals);
  showArea(response.meals);
  $(".loading").addClass("d-none");
}
$("#Area").click(function () {
  GetAllArea();
});
// ~__________________show Area______________________
function showArea(data) {
  closeSideBar();
  let temp = ` `;
  for (let i = 0; i < data.length; i++) {
    temp += `<div onclick="getArea('${data[i].strArea}')" class="col-md-3 item g-3 d-flex justify-content-center">
    <div>
    <i class="fa-solid fa-house-laptop fa-4x text-light"></i>
    <h5 class="text-light ">${data[i].strArea}</h5>
    </div>
</div>`;
  }
document.getElementById("inputs").innerHTML = '';
document.getElementById("itemData").innerHTML = temp;
}
// ?__________________Get All Ingredients_________________
async function GetAllIngredients() {
  document.getElementById("itemData").innerHTML = "";
  $(".loading").removeClass("d-none");
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let response = await api.json();
  console.log(response.meals);
  showIngredients(response.meals.slice(0, 20));
  $(".loading").addClass("d-none");
}
$("#Ingredients").click(function () {
  GetAllIngredients();
});
// &__________________show Ingredients______________________
function showIngredients(data) {
  closeSideBar();
  let temp = ` `;
  for (let i = 0; i < data.length; i++) {
    temp += `<div onclick="getIngredient('${data[i].strIngredient}')" class="col-md-3 item g-3 d-flex justify-content-center">
    <div class="">
    <p class="text-center"><i class="fa-solid fa-drumstick-bite fa-4x text-light"></i></p>
    <p> </p>
    <h5 class="text-light  text-center">${data[i].strIngredient}</h5>
    <p class="text-light text-center">${data[i].strDescription
      .split(" ")
      .slice(0, 20)
      .join(" ")}</p>
    </div>
</div>`;
  }
document.getElementById("inputs").innerHTML = "";
document.getElementById("itemData").innerHTML = temp;

}
// *__________________get Details_____________________
async function getDetails(id){
  document.getElementById("itemData").innerHTML = "";
  $(".loading").removeClass("d-none");
let api= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
api=await api.json()
$(".loading").addClass("d-none");
showDetails(api.meals[0])
}
// ^_________________________show Details__________________

function showDetails(data){
  let tagsUI=``
  let Ingredient=``
  if(data.strTags!=null){
    let tags=data.strTags.split(",")
  for(let i=0;i<tags.length;i++){
   tagsUI+= `<p class="bg-danger d-inline text-light p-1 rounded mx-1">${tags[i]}</p>`
  }
  }
  for(let i=1;i<20;i++){
    if(data[`strMeasure${i}`]&&data[`strIngredient${i}`]){
   Ingredient+=  `<p class="bg-secondary d-inline text-light p-1 rounded m-2">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</p>`
    }
  }
 
  
let temp=`
<div class="col-md-4">
<img src="${data.strMealThumb}" class="w-100 rounded"/>
<h1 class="text-light">${data.strMeal}</h1>
</div>
<div class="col-md-8">
<h2 class="text-light">Instructions</h2>
<p class="text-light">${data.strInstructions}</p>
<h3 class="text-light">Area :  ${data.strArea}</h3>
<h3 class="text-light">Category : ${data.strCategory}</h3>
<h3 class="text-light">Recipes :</h3>
<div class="d-flex flex-wrap g-3">
${Ingredient?Ingredient:""}
</div>
<h3 class="text-light">Tags :</h3>
<div class="">
${tagsUI?tagsUI:""}
</div>
<div class="mt-3">
<a href=" ${data.strSource}" class="btn btn-success" target="_blank">Source</a>
<a href=" ${data.strYoutube}" class="btn btn-danger" target="_blank">YouTube</a>
</div>
</div>
`

document.getElementById("inputs").innerHTML = "";
document.getElementById("itemData").innerHTML = temp;
}
// ?__________________Filter By Category_____________________
async function getCategory(category){
  document.getElementById("itemData").innerHTML = "";
  $(".loading").removeClass("d-none");
let api= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
api=await api.json()
$(".loading").addClass("d-none");
showData(api.meals)
}
// &__________________Filter By ingredient_____________________
async function getIngredient(ingredient){
  document.getElementById("itemData").innerHTML = "";
  $(".loading").removeClass("d-none");
let api= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
api=await api.json()
$(".loading").addClass("d-none");
showData(api.meals)
}
// ~__________________Filter By Area_____________________
async function getArea(Area){
  document.getElementById("itemData").innerHTML = "";
$(".loading").removeClass("d-none");
let api= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`)
api=await api.json()
$(".loading").addClass("d-none");
showData(api.meals)
}
// !_______________________Search page_______________
function showSearch(){
  closeSideBar()
temp=
`<div class="col-md-6 py-2">
<input onkeyup="searchByName(this.value)" type="text" class="form-control" placeholder="Search By Name" value=""/>
</div>
<div class="col-md-6 py-2">
<input maxlength="1" onkeyup="searchByFirstLetter(this.value)" type="text" class="form-control" placeholder="Search By First Lettere" value=""/>
</div>
`
document.getElementById("inputs").innerHTML = temp;
document.getElementById("itemData").innerHTML = "";
}
$("#Search").click(function () {
  showSearch();
});
//*___________________________Search by First Letter_____________________
async function searchByFirstLetter(firstLetter) {
  document.getElementById("itemData").innerHTML = "";
  $(".loading").removeClass("d-none");
 if(firstLetter){
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`
  );
  let response = await api.json();
  showData(response.meals);
 }
  $(".loading").addClass("d-none");
}
// ?_________________________contact Us_________________________
function ContactUs(){
  closeSideBar()
temp=
`
<div class="col-12 col-md-5 m-auto mt-3">
<input onkeyup="NameValidation(),submitBtn()" type="text" class="form-control name" placeholder="Enter Your Name" value=""/>
<div class="alert alert-danger mt-1 d-none nameAlert" role="alert">
Special characters and numbers not allowed
</div>
</div>
<div class="col-12 col-md-5 m-auto mt-3">
<input onkeyup="EmailValidation(),submitBtn()" type="text" class="form-control email" placeholder="Enter Your Email" value=""/>
<div class="alert alert-danger mt-1 d-none emailAlert" role="alert">
Email not valid *exemple@yyy.zzz
</div>
</div>
<div class="col-12 col-md-5 m-auto mt-3">
<input onkeyup="PhoneValidation(),submitBtn()" type="phone" class="form-control phone" placeholder="Enter Your Phone" value=""/>
<div class="alert alert-danger mt-1 d-none phoneAlert" role="alert">
Enter valid Phone Number
</div>
</div>
<div class="col-12 col-md-5 m-auto mt-3">
<input onkeyup="AgeValidation(),submitBtn()"  type="number" class="form-control age" placeholder="Enter Your Age" value=""/>
<div class="alert alert-danger mt-1 d-none ageAlert" role="alert">
Enter valid age
</div>
</div>
<div class="col-12 col-md-5 m-auto mt-3">
<input onkeyup="PasswordValidation(),submitBtn()" type="password" class="form-control password" placeholder="Enter Your Password" value=""/>
<div class="alert alert-danger mt-1 d-none passwordAlert" role="alert">
Enter valid password *Minimum eight characters, at least one letter and one number:*
</div>
</div>
<div class="col-12 col-md-5 m-auto mt-3">
<input onkeyup="RePasswordValidation(),submitBtn()" type="password" class="form-control repassword" placeholder="Repassword" value=""/>
<div class="alert alert-danger mt-1 d-none repasswordAlert" role="alert">
Enter valid repassword
</div>
</div>
<div class="d-flex justify-content-center align-items-center col-md-11">
<button class="btn btn-outline-danger mt-3" disabled id="contactBtn" >Submit</button>
</div>
`
document.getElementById("inputs").innerHTML = temp;
document.getElementById("itemData").innerHTML = "";
}
$("#Contact").click(function () {
  ContactUs();
});

function NameValidation(){
let regex=/^([a-zA-Z_\s]+)$/;
if(regex.test($(".name").val())){
  $(".nameAlert").addClass("d-none")
  return true;
  
}else{
  $(".nameAlert").removeClass("d-none")
  return false;
 
}
}
function EmailValidation(){
  let regex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if(regex.test($(".email").val())){
    $(".emailAlert").addClass("d-none")
    return true;
  }else{
    $(".emailAlert").removeClass("d-none")
    return false;
   
  }
  }
function PhoneValidation(){
  let regex=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if(regex.test($(".phone").val())){
    $(".phoneAlert").addClass("d-none")
    return true;
  }else{
    $(".phoneAlert").removeClass("d-none")
    return false;
   
  }
  }
function AgeValidation(){
  let regex=/^(0?[1-9]|[0-9][0-9]|[1][0-9][0-9]|200)$/;
  if(regex.test($(".age").val())){
    $(".ageAlert").addClass("d-none")
    return true;
  }else{
    $(".ageAlert").removeClass("d-none")
    return false;
   
  }
  }
function PasswordValidation(){
  let regex=/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  if(regex.test($(".password").val())){
    $(".passwordAlert").addClass("d-none")
    return true;
  }else{
    $(".passwordAlert").removeClass("d-none")
    return false;
   
  }
  }
function RePasswordValidation(){
    if($(".password").val()==$(".repassword").val()){
      $(".repasswordAlert").addClass("d-none")
      return true;
    }else{
      $(".repasswordAlert").removeClass("d-none")    
      return false; 
    }
    }
function submitBtn(){
  if(NameValidation()&&EmailValidation()&&PhoneValidation()&&AgeValidation()&&PhoneValidation()&&PasswordValidation()&&RePasswordValidation()){
    $("#contactBtn").removeAttr("disabled")
  }else{
    document.getElementById("contactBtn").setAttribute("disabled",true)

    
  }
}