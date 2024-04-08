//  navmenu
let menuBtn = document.getElementById('menu-btn')
let mnavBar = document.getElementById('navbar-a')
mnavBar.classList.toggle("show");
menuBtn.addEventListener('click', function () {
    mnavBar.classList.toggle("show");

})

// display sections
let links = document.querySelectorAll('.nav-link')
let slids = document.querySelectorAll('section')
console.log(slids)
let link_array = Array.from(links);
let slids_array = Array.from(slids);
link_array.forEach((e) => {

    e.addEventListener('click', (e) => {
        slids_array.forEach((slids) => {
            slids.style.display = 'none';
        });
        console.log(e.currentTarget.dataset.slid)
        let sec = e.currentTarget.dataset.slid
        let sece = document.querySelector(`.${sec}`)
        sece.style.display = "block"
        mnavBar.classList.toggle("show");
        ereaData()
        catData()
        ingrediantData()

    })

});
let searchInputName = document.getElementById('by-name');


async function searchByName() {
    let searchInput = searchInputName.value.trim();
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    let finalResponse = await response.json();

    let mealSearch = finalResponse.meals;
    console.log(mealSearch);

    let cards = ""

    for (let i = 0; i < mealSearch.length; i++) {

        cards += `
    <div class="col-md-3 ">
          <div data-slid="details" class="meal card rounded-1 mt-2 ser-meal">
            <img src="${mealSearch[i].strMealThumb}">
            <div class="overlay">
              <h3>${mealSearch[i].strMeal}</h3>
            </div>
          </div>
    </div>
        
        `
        document.querySelector(".search").innerHTML = cards;
        let sr_card = document.querySelectorAll('.ser-meal')
        for (let i = 0; i < sr_card.length; i++) {
            sr_card[i].addEventListener('click', function (e) {
                slids_array.forEach((slids) => {
                    slids.style.display = 'none';
                });

                let sec = e.currentTarget.dataset.slid
                let sece = document.querySelector(`.${sec}`)
                sece.style.display = "block"
                getdetails(mealSearch[i].idMeal);
            })
        }
    }
}





// <<<<<<<<<<<<<<<<<<<<search section by first letter >>>>>>>>>>>>>>>>>>

let searchLetter = document.getElementById("by-letter");

async function searchFisrtletter() {
    let searchInputLetter = searchLetter.value.trim();

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInputLetter}`);
    let finalResponse = await response.json();

    let mealSearchLetter = finalResponse.meals;

    let cards = ""

    for (let i = 0; i < mealSearchLetter.length; i++) {

        cards += `
        <div class="col-md-3 ">
          <div data-slid="details" class="meal card rounded-1 mt-2 ser-meal">
            <img src="${mealSearchLetter[i].strMealThumb}">
            <div class="overlay">
              <h3>${mealSearchLetter[i].strMeal}</h3>
            </div>
          </div>
    </div>
        
        `



        document.querySelector(".search").innerHTML = cards;
    }


    let sr_card = document.querySelectorAll('.ser-meal')
    for (let i = 0; i < sr_card.length; i++) {
        sr_card[i].addEventListener('click', function (e) {
            slids_array.forEach((slids) => {
                slids.style.display = 'none';
            });

            let sec = e.currentTarget.dataset.slid
            let sece = document.querySelector(`.${sec}`)
            sece.style.display = "block"
            getdetails(mealSearchLetter[i].idMeal);
        })
    }

}






// get-data
mainData()
async function mainData() {
    let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let finalRespons = await respons.json()
    let meals = finalRespons.meals
    let card = ""
    for (let i = 0; i < meals.length; i++) {
        card += `
    
        <div class="col-md-3  ">
            <div data-slid="details" class="meal card rounded-1 mt-2 mealdetails ">
                <img src="${meals[i].strMealThumb}" alt="" class="">
                <div class="overlay">
                <h3>${meals[i].strMeal}</h3>
</div>                
            </div>          
        </div>  
`
        document.querySelector('.row').innerHTML = card
        let mealdetail = document.querySelectorAll('.mealdetails');
        for (let i = 0; i < mealdetail.length; i++) {

            mealdetail[i].addEventListener('click', function (e) {

                slids_array.forEach((slids) => {
                    slids.style.display = 'none';
                });
                console.log(e.currentTarget.dataset.slid)
                let sec = e.currentTarget.dataset.slid
                let sece = document.querySelector(`.${sec}`)
                sece.style.display = "block"

                getdetails(meals[i].idMeal);
            });
        }

    }

}
//<<<<<<categories>>>>>>>>>
async function catData() {
    let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let finalRespons = await respons.json()
    let catMeals = finalRespons.categories

    let card = ""
    for (let i = 0; i < catMeals.length; i++) {

        card += `
            <div class="col-md-3  ">
                <div class="meal card rounded-1 mt-2 catCard">
                    <img src="${catMeals[i].strCategoryThumb}" alt="" class="">
                    <div class="overlay">
                    <h3>${catMeals[i].strCategory}</h3>
                    <p>${catMeals[i].strCategoryDescription}</p>
    </div>
                </div>
            </div>   
               `
        document.querySelector('.row-2').innerHTML = card

        let cat_meal = document.querySelectorAll('.catCard')
        for (let i = 0; i < cat_meal.length; i++) {
            cat_meal[i].addEventListener('click', function (e) {
                console.log(e.target)
                catCrds(catMeals[i].strCategory)
            })
        }
    }
    async function catCrds(neamMeal) {
        let dataCat = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${neamMeal}`)
        let finalData = await dataCat.json()
        let meals = finalData.meals

        let card = ""
        for (let i = 0; i < meals.length; i++) {
            let idm = meals[i].idMeal
            card += `
        <div class="col-md-3  ">
            <div data-slid="details" class="meal card rounded-1 mt-2 cc-meal">
                <img src="${meals[i].strMealThumb}" alt="" class="">
                <div class="overlay">
                <h3>${meals[i].strMeal}</h3>
                </div>
            </div>
        </div>   
                 `
            document.querySelector('.row-2').innerHTML = card
            let cc_meal = document.querySelectorAll('.cc-meal')
            for (let i = 0; i < cc_meal.length; i++) {
                cc_meal[i].addEventListener('click', function (e) {
                    slids_array.forEach((slids) => {
                        slids.style.display = 'none';
                    });
                    console.log(e.currentTarget.dataset.slid)
                    let sec = e.currentTarget.dataset.slid
                    let sece = document.querySelector(`.${sec}`)
                    sece.style.display = "block"
                    getdetails(idm);
                })
            }

        }
    }


}
//<<<<<<erea>>>>>>>>>//

async function ereaData() {
    let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let finalRespons = await respons.json()
    let meals = finalRespons.meals
    let card = ""
    for (let i = 0; i < meals.length; i++) {
        card += `
            <div id="" class="col-md-3 ereaCard ">
                <div class="meal card rounded-1 mt-2">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>      
                    <h3>${meals[i].strArea}</h3>
                </div>
            </div>   
                `
        document.querySelector('.row-3').innerHTML = card
        let dataCard = document.querySelectorAll('.ereaCard')
        for (let i = 0; i < dataCard.length; i++) {
            async function update() {
                let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${meals[i].strArea}`)
                let f_data = await data.json()
                let final_data = f_data.meals

                let ereaCard = ""
                for (let i = 0; i < final_data.length; i++) {

                    ereaCard += `
                    <div data-slid="details" class="col-md-3 mealErea  ">
                <div class="meal card rounded-1 mt-2">                  
                <img src="${final_data[i].strMealThumb}" alt="" class="">
                    <h3>${final_data[i].strMeal}</h3>
                </div>
                </div>   
                    `
                    document.querySelector('.row-3').innerHTML = ereaCard
                }
                let cardMeal = document.querySelectorAll('.mealErea');
                for (let i = 0; i < cardMeal.length; i++) {
                    cardMeal[i].addEventListener('click', function (e) {
                        slids_array.forEach((slids) => {
                            slids.style.display = 'none';
                        });
                        console.log(e.currentTarget.dataset.slid)
                        let sec = e.currentTarget.dataset.slid
                        let sece = document.querySelector(`.${sec}`)
                        sece.style.display = "block"

                        getdetails(final_data[i].idMeal);
                    });
                }
            }
            dataCard[i].addEventListener('click', function () {
                update()
            });
        }
    }

}


let dataCard = document.querySelectorAll('.ereaCard')
for (let i = 0; i < dataCard.length; i++) {
    async function update() {
        let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${meals[i].strArea}`)
        let f_data = await data.json()
        let final_data = f_data.meals

        let ereaCard = ""
        for (let i = 0; i < final_data.length; i++) {

            ereaCard += `
                    <div data-slid="details" class="col-md-3 mealErea  ">
                <div class="meal card rounded-1 mt-2">                  
                <img src="${final_data[i].strMealThumb}" alt="" class="">
                    <h3>${final_data[i].strMeal}</h3>
                </div>
                </div>   
                    `
            document.querySelector('.row-3').innerHTML = ereaCard
        }
        let cardMeal = document.querySelectorAll('.mealErea');
        for (let i = 0; i < cardMeal.length; i++) {
            cardMeal[i].addEventListener('click', function (e) {
                slids_array.forEach((slids) => {
                    slids.style.display = 'none';
                });
                console.log(e.currentTarget.dataset.slid)
                let sec = e.currentTarget.dataset.slid
                let sece = document.querySelector(`.${sec}`)
                sece.style.display = "block"

                getdetails(final_data[i].idMeal);
            });
        }
    }
    dataCard[i].addEventListener('click', function () {
        update()
    });
}


async function ingrediantData() {
    let ingred = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let finalingred = await ingred.json()
    let meals = finalingred.meals
    let card = ""
    for (let i = 0; i < 25; i++) {
        card += `
                    <div id="" class="col-md-3 ereaCard ">
                        <div data-slid="ingred" class="text-light rounded-1 w-100 mt-2 ms-2 mealingred ">
                            <i onclick="" class="fa-solid fa-drumstick-bite fa-4x"></i>      
                            <h3>${meals[i].strIngredient}</h3>
                            <p class="">${meals[i].strDescription.slice(0, 130)}</p>
                        </div>
                    </div>   
                        `
        document.querySelector('.row-4').innerHTML = card
        async function ingrediantFilter(strIngredient) {
            let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient} `)
            let mealList = await data.json()
            let fdata = mealList.meals
            let mealCard = ""
            for (let i = 0; i < fdata.length; i++) {
                let idMeal = fdata[i].idMeal
                mealCard += `
                <div class="col-md-3" >
                    <div onclick="" data-slid="details"  class="mealdetails card rounded-1 mt-2">
                    <p>${fdata[i].idMeal}</p>
                        <img src="${fdata[i].strMealThumb}" alt="" class="">
                            <h3>${fdata[i].strMeal}</h3>
                    </div>
                </div>
            `
                document.querySelector('.row-4').innerHTML = mealCard
                let mealdetail = document.querySelectorAll('.mealdetails')

                for (let i = 0; i < mealdetail.length; i++) {

                    mealdetail[i].addEventListener('click', function (e) {

                        slids_array.forEach((slids) => {
                            slids.style.display = 'none';
                        });
                        console.log(e.currentTarget.dataset.slid)
                        let sec = e.currentTarget.dataset.slid
                        let sece = document.querySelector(`.${sec}`)
                        sece.style.display = "block"
                        getdetails(idMeal)

                    });
                }
            }

        }
        let crdMeal = document.querySelectorAll('.mealingred');
        for (let i = 0; i < crdMeal.length; i++) {
            crdMeal[i].addEventListener('click', function (e) {
                ingrediantFilter(meals[i].strIngredient)
            });
        }

    }

}


























































async function closeee() {
    let secDetail = document.getElementById('secDetail')
    secDetail.classList.add('hidden2')
    document.querySelector('.main').style.display = 'block'
    if (document.querySelector('.main').style.display = 'block') {
        secDetail.classList.remove('hidden2')
        document.querySelector('#detail').style.display = 'none'

    }
}






async function getdetails(id) {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let finalResponse = await response.json();
    let mealDetail = finalResponse.meals;
    let detailsaCard = ""


    for (let i = 0; i < mealDetail.length; i++) {
        detailsaCard += `
    <div  class="row  my-3 position-relative" style="width:100%">
          <div class="col-md-4">
              <img src="${mealDetail[i].strMealThumb}" class="w-100 m-auto my-3"  alt="">
              <h2 class="mx-5">${mealDetail[i].strMeal}</h2>
          </div>
          
          <div class="col-md-8 close text-light">
              <h2>Instructions</h2>
              <i  id="close" onclick="closeee()" class="fa-solid fa-circle-xmark position-absolute  end-0 top-0 "></i>
              <p>${mealDetail[i].strInstructions}</p>
              
              <div class="d-flex align-items-center">
                <h3 class="me-3">Area :</h3>
                <span>${mealDetail[i].strArea}</span>
              </div>
              
              <div class="d-flex align-items-center mb-2">
                <h3 class="me-3">Category :</h3>
                <span>${mealDetail[i].strCategory}</span>
              </div>
             
              
              <h3>Recipes :</h3>
              
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  <li class="alert alert-info m-2 p-1">${mealDetail[i].strIngredient1}</li>
                  <li class="alert alert-info m-2 p-1">${mealDetail[i].strIngredient2}</li>
                  <li class="alert alert-info m-2 p-1">${mealDetail[i].strIngredient3}</li>
                  <li class="alert alert-info m-2 p-1">${mealDetail[i].strIngredient4}</li>
                  <li class="alert alert-info m-2 p-1">${mealDetail[i].strIngredient5}</li>
                  <li class="alert alert-info m-2 p-1">${mealDetail[i].strIngredient6}</li>
                  <li class="alert alert-info m-2 p-1">${mealDetail[i].strIngredient7}</li>
                  <li class="alert alert-info m-2 p-1">${mealDetail[i].strIngredient8}</li>
                  <li class="alert alert-info m-2 p-1">${mealDetail[i].strIngredient9}</li>
                  <li class="alert alert-info m-2 p-1">${mealDetail[i].strIngredient10}</li>
                  <li class="alert alert-info m-2 p-1">${mealDetail[i].strIngredient11}</li>
              </ul>
              
              <h3>Tags: </h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  <li class="alert alert-danger m-2 p-1">${mealDetail[i].strCategory}</li>
               
              </ul>                    
                   
              <a target="_blank" href="${mealDetail[0].strSource}" class="btn btn-success">Source</a>
              <a target="_blank" href="${mealDetail[0].strYoutube}" class="btn btn-danger">Youtube</a>
          </div>
      </div>
    `
    }



    document.querySelector("#secDetail").innerHTML = detailsaCard
}







