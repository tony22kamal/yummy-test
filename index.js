
$(document).ready(function () {
  getMeals().then(()=>{
    $(".loading").fadeOut(500, function () {
      $("body").css("overflow", "visible");    
    });
  })
 
});

function openSideNav() {
  $("nav").animate(
    {
      left: 0,
    },
    500
  );

  $(".change").removeClass("fa-bars");
  $(".change").addClass("fa-x");

  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 5) * 100
      );
  }
}

function closeSideNav() {
  let boxWidth = $("nav .nav-left").outerWidth();
  $("nav").animate(
    {
      left: -boxWidth,
    },
    500
  );

  $(".change").addClass("fa-bars");
  $(".change").removeClass("fa-x");

  $("nav li").animate(
    {
      top: 500,
    },
    500
  );
}

closeSideNav();
$("nav i.change").click(() => {
  if ($("nav").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});
/////////////////////////////////
let search = document.querySelector("#search");
let contSearch = document.querySelector("#search-container");
let contact = document.querySelector("#contact");
let contContact = document.querySelector("#contact-container");
let category = document.querySelector("#category");
let contCategory = document.querySelector("#category-container");
let area = document.querySelector("#area");
let contArea = document.querySelector("#area-container");
let ingred = document.querySelector("#ingred");
let contIngred = document.querySelector("#ingred-container");
let mealData = document.querySelector("#meal-data");

search.addEventListener("click", function () {
  closeSideNav();
  contSearch.classList.remove("d-none");
  contArea.classList.add("d-none");
  contIngred.classList.add("d-none");
  contCategory.classList.add("d-none");
  contContact.classList.add("d-none");
  mealData.classList.add("d-none");
  row.classList.add('d-none');
});

category.addEventListener("click", function () {
  $(".loading").fadeIn(500);
  closeSideNav();
  getCategories();
  contSearch.classList.add("d-none");
  contArea.classList.add("d-none");
  contIngred.classList.add("d-none");
  contCategory.classList.remove("d-none");
  contContact.classList.add("d-none");
  mealData.classList.add("d-none");
  row.classList.add('d-none');
  $(".loading").fadeOut(500);
});

area.addEventListener("click", function () {
  $(".loading").fadeIn(500);
  closeSideNav();
  getArea();
  contSearch.classList.add("d-none");
  contArea.classList.remove("d-none");
  contIngred.classList.add("d-none");
  contCategory.classList.add("d-none");
  contContact.classList.add("d-none");
  mealData.classList.add("d-none");
  row.classList.add('d-none');
  $(".loading").fadeOut(500);
});

ingred.addEventListener("click", function () {
  $(".loading").fadeIn(500);
  closeSideNav();
  getIngredients();
  contSearch.classList.add("d-none");
  contArea.classList.add("d-none");
  contIngred.classList.remove("d-none");
  contCategory.classList.add("d-none");
  contContact.classList.add("d-none");
  mealData.classList.add("d-none");
  row.classList.add('d-none');
  $(".loading").fadeOut(500);
});

contact.addEventListener("click", function () {
  closeSideNav();
  contSearch.classList.add("d-none");
  contArea.classList.add("d-none");
  contIngred.classList.add("d-none");
  contCategory.classList.add("d-none");
  contContact.classList.remove("d-none");
  mealData.classList.add("d-none");
  row.classList.add('d-none');
});

/////////////////////////////////////
let row = document.querySelector("#home");
async function getMeals() {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  response = await response.json();
  console.log(response);
  displayHome(response);
}

function displayHome(response) {
  let cartoona = "";
  for (let i = 0; i < response.meals.length; i++) {
    cartoona += `
       <div onclick="getMealDetails('${response.meals[i].idMeal}')" class="col-md-3 px-3 position-relative overflow-hidden meal">
            <figure class"position-relative overflow-hidden">
                <img src="${response.meals[i].strMealThumb}" alt="" class="w-100 rounded-2">
            </figure>
            <figcaption class="d-flex justify-content-start align-items-center rounded-2 p-2 overlay position-absolute">
                <h3>${response.meals[i].strMeal}</h3>
            </figcaption>
        </div>`;
  }

  row.innerHTML = cartoona;
  contSearch.classList.add("d-none");
  contArea.classList.add("d-none");
  contIngred.classList.add("d-none");
  contCategory.classList.add("d-none");
  contContact.classList.add("d-none");
  mealData.classList.add("d-none");
  row.classList.remove("d-none");
}
getMeals();

async function getMealDetails(mealID) {
  $(".loading").fadeIn(500);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  let finalResponse = await response.json();
  displayMealDetails(finalResponse.meals[0]);
  closeSideNav();
  contSearch.classList.add("d-none");
  contArea.classList.add("d-none");
  contIngred.classList.add("d-none");
  contCategory.classList.add("d-none");
  contContact.classList.add("d-none");
  row.classList.add("d-none");
  mealData.classList.remove("d-none");
  $(".loading").fadeOut(500);
}
//////////////////////////////////////////////////

async function getCategories() {
  $(".loading").fadeIn(500);
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let finalResponse = await response.json();
  console.log(finalResponse);
  displayCategory(finalResponse);
  $(".loading").fadeOut(500);
}

function displayCategory(finalResponse) {
  let cartoona = "";
  for (let i = 0; i < finalResponse.categories.length; i++) {
    cartoona += `
         <div onclick="specialCategory('${finalResponse.categories[i].strCategory}')" class="col-lg-3 overflow-hidden position-relative cate">
            <figure>
                <img src="${finalResponse.categories[i].strCategoryThumb}"  class="w-100 px-3 rounded-5" alt="category">
            </figure>
            <figcaption class="rounded-3 text-center w-100  layer position-absolute  p-2">
                <h3>${finalResponse.categories[i].strCategory}</h3>
                <p class="overflow-hidden">${finalResponse.categories[i].strCategoryDescription.slice(0,100)}</p>
            </figcaption>
        </div>`;
  }
  contCategory.innerHTML = cartoona;
}

async function specialCategory(category) {
  $(".loading").fadeIn(500);
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let finalResponse = await respone.json();
  displayHome(finalResponse);
  $(".loading").fadeOut(500);
}


//////////////////////////////////////

async function getArea() {
  $(".loading").fadeIn(500);
  let respone = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let finalResponse = await respone.json();
  displayArea(finalResponse);
  console.log(finalResponse);
  $(".loading").fadeOut(500);
}

function displayArea(finalResponse) {
  let cartoona = "";
  for (let i = 0; i < finalResponse.meals.length; i++) {
    cartoona += `
    <div onclick="specialArea('${finalResponse.meals[i].strArea}')" class="col-lg-3 text-center text-white mb-3">
    <i class="fa-solid fa-house-laptop fa-4x"></i>
    <h2>${finalResponse.meals[i].strArea}</h2>
    </div>`;
  }
  contArea.innerHTML = cartoona;
}



async function specialArea(area) {
  $(".loading").fadeIn(500);
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let finalResponse = await respone.json();
  displayHome(finalResponse);
  $(".loading").fadeOut(500);
}

/////////////////////////////////////

async function getIngredients() {
  $(".loading").fadeIn(500);
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let finalResponse = await response.json();
  console.log(finalResponse.meals.slice(0, 20));
  displayIngred(finalResponse);
  $(".loading").fadeOut(500);
}

function displayIngred(finalResponse) {
  let cartoona = "";
  for (let i = 0; i < 20; i++) {
    cartoona += `
    <div onclick="specialIngred('${
      finalResponse.meals[i].strIngredient
    }')" class="col-lg-3 text-white text-center overflow-hidden ">
   <i class="fa-solid fa-drumstick-bite fa-4x"></i>
   <h3>${finalResponse.meals[i].strIngredient}</h3>
   <p class="overflow-hidden">${finalResponse.meals[i].strDescription?.split("")
     .slice(0, 110)
     .join("")}</p>
  </div>`;
  }
  contIngred.innerHTML = cartoona;
}

async function specialIngred(ingred) {
  $(".loading").fadeIn(500);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred}`
  );
  let finalResponse = await response.json();
  displayHome(finalResponse);
  $(".loading").fadeOut(500);
}

/////////////////////////////////
async function searchByName(name) {
  $(".loading").fadeIn(500);
  name == ""? name = displayHome() : " ";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  let finalResponse = await response.json();
  displayHome(finalResponse);
  finalResponse.meals ? displayHome(finalResponse.meals) : displayHome([]) 
  $(".loading").fadeOut(500);
}

async function searchByFLetter(letter) {
  $(".loading").fadeIn(500);
  letter == "" ? letter = "a": "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  let finalResponse = await response.json();
  displayHome(finalResponse);
  finalResponse.meals ? displayHome(finalResponse.meals) : displayHome([])
  $(".loading").fadeOut(500);
}

function displayMealDetails(meal) {
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  // let tags = meal.strTags.split(",")
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let cartoona = `
    <div class="col-md-4 ps-5">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

  mealData.innerHTML = cartoona;
}

//////////////////////////////////////////

let userNameInput = document.querySelector("#name");
let mailInput = document.querySelector("#mail");
let phoneInput = document.querySelector("#phone");
let ageInput = document.querySelector("#age");
let passwordInput = document.querySelector("#pass");
let repass = document.querySelector("#repass");

function validName() {
  let regex = /^[a-z]{3,15}$/i;
  if (regex.test(userNameInput.value) == true) {
    return true;
  } else {
    return false;
  }
}

function validMail() {
  let regex = /^[a-z]{3,12}[0-9]{0,4}@[a-z]{3,7}.com$/i;
  if (regex.test(mailInput.value) == true) {
    return true;
  } else {
    return false;
  }
}

function validPhone() {
  let regex = /^(011|015|012|010)[0-9]{8}$/;
  if (regex.test(phoneInput.value) == true) {
    return true;
  } else {
    return false;
  }
}

function validAge() {
  let regex = /^[1-9][0-9]$/;
  if (regex.test(ageInput.value) == true) {
    return true;
  } else {
    return false;
  }
}

function validPass() {
  let regex = /^[0-9]{3,10}[a-z]{0,9}$/gi;
  if (regex.test(passwordInput.value) == true) {
    return true;
  } else {
    return false;
  }
}

function validPass2() {
  if (passwordInput.value == repass.value) {
    return true;
  } else {
    return false;
  }
}

function contactUs() {
  if (
    validName() == true &&
    validMail() == true &&
    validPhone() == true &&
    validAge() == true &&
    validPass() == true &&
    validPass2() == true
  ) {
    document.querySelector("#con").removeAttribute("disable");
  } else {
    document.querySelector("#check").classList.remove("d-none");
  }
}

userNameInput.addEventListener("keyup", function () {
  if (validName() == true) {
    document.querySelector("#alertName").classList.add("d-none");
  } else {
    document.querySelector("#alertName").classList.replace("d-none", "d-block");
  }
});

mailInput.addEventListener("keyup", function () {
  if (validMail() == true) {
    document.querySelector("#alertMail").classList.add("d-none");
  } else {
    document.querySelector("#alertMail").classList.replace("d-none", "d-block");
  }
});

phoneInput.addEventListener("keyup", function () {
  if (validPhone() == true) {
    document.querySelector("#alertPhone").classList.add("d-none");
  } else {
    document
      .querySelector("#alertPhone")
      .classList.replace("d-none", "d-block");
  }
});

ageInput.addEventListener("keyup", function () {
  if (validAge() == true) {
    document.querySelector("#alertAge").classList.add("d-none");
  } else {
    document.querySelector("#alertAge").classList.replace("d-none", "d-block");
  }
});

passwordInput.addEventListener("keyup", function () {
  if (validPass() == true) {
    document.querySelector("#alertPass").classList.add("d-none");
  } else {
    document.querySelector("#alertPass").classList.replace("d-none", "d-block");
  }
});

repass.addEventListener("keyup", function () {
  if (validPass2() == true) {
    document.querySelector("#alertRepass").classList.add("d-none");
  } else {
    document
      .querySelector("#alertRepass")
      .classList.replace("d-none", "d-block");
  }
});
