"use strict";
const perPage = 8;
let start = 0;
let currentIndex = 0;
let data = [];
let dataFiltered = [];

fetch("./json/fruits.json")
.then(function(resp) {
    return resp.json();
})
.then(function(data) {
   makeTable(data);
   makePagination(data);
});

const modalLoaded = function(carbo, protein, fat, calories, sugar) {

    var iMaxCarbo = 0, iMaxProtein = 0, iMaxFat = 0, iMaxCalories = 0, iMaxSugar = 0;
    for (let item of data) {
        if (item.nutritions.carbohydrates > iMaxCarbo) { iMaxCarbo = item.nutritions.carbohydrates; }
        if (item.nutritions.protein > iMaxProtein) { iMaxProtein = item.nutritions.protein; }
        if (item.nutritions.fat > iMaxFat) { iMaxFat = item.nutritions.fat; }
        if (item.nutritions.calories > iMaxCalories) { iMaxCalories = item.nutritions.calories; }
        if (item.nutritions.sugar > iMaxSugar) { iMaxSugar = item.nutritions.sugar; }
    }

    var opts = {
        lines: 12,
        angle: 0.15,
        lineWidth: 0.44,
        pointer: {
          length: 0.64,
          strokeWidth: 0.035,
          color: '#000000'
        },
        limitMax: 'false', 
        percentColors: [[0.0, "#ff0000" ], [0.50, "#f9c802"], [1.0, "#a9d70b"]], // !!!!
        strokeColor: '#E0E0E0',
        generateGradient: true

      };

      opts.staticLabels =  {
        font: "16px sans-serif",  // Specifies font
        labels: [0, iMaxCarbo],  // Print labels at these values
        color: "#000000",  // Optional: Label text color
        fractionDigits: 1  // Optional: Numerical precision. 0=round off.
      };
      
      var target = document.getElementById('gauge1'); 
      var gauge = new Gauge(target).setOptions(opts); 
      gauge.maxValue = iMaxCarbo; // set max gauge value
      gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
      gauge.animationSpeed = 32; // set animation speed (32 is default value)
      gauge.set(carbo); // set actual value


      opts.staticLabels =  {
        font: "16px sans-serif",  // Specifies font
        labels: [0, iMaxProtein],  // Print labels at these values
        color: "#000000",  // Optional: Label text color
        fractionDigits: 1  // Optional: Numerical precision. 0=round off.
      };

      var target2 = document.getElementById('gauge2'); 
      var gauge2 = new Gauge(target2).setOptions(opts); 
      gauge2.maxValue = iMaxProtein; // set max gauge value
      gauge2.setMinValue(0);  // Prefer setter over gauge.minValue = 0
      gauge2.animationSpeed = 32; // set animation speed (32 is default value)
      gauge2.set(protein); // set actual value

      opts.staticLabels =  {
        font: "16px sans-serif",  // Specifies font
        labels: [0, iMaxFat],  // Print labels at these values
        color: "#000000",  // Optional: Label text color
        fractionDigits: 1  // Optional: Numerical precision. 0=round off.
      };

      var target3 = document.getElementById('gauge3'); 
      var gauge3 = new Gauge(target3).setOptions(opts); 
      gauge3.maxValue = iMaxFat; // set max gauge value
      gauge3.setMinValue(0);  // Prefer setter over gauge.minValue = 0
      gauge3.animationSpeed = 32; // set animation speed (32 is default value)
      gauge3.set(fat); // set actual value

      opts.staticLabels =  {
        font: "16px sans-serif",  // Specifies font
        labels: [0, iMaxCalories],  // Print labels at these values
        color: "#000000",  // Optional: Label text color
        fractionDigits: 1  // Optional: Numerical precision. 0=round off.
      };

      var target4 = document.getElementById('gauge4'); 
      var gauge4 = new Gauge(target4).setOptions(opts); 
      gauge4.maxValue = iMaxCalories; // set max gauge value
      gauge4.setMinValue(0);  // Prefer setter over gauge.minValue = 0
      gauge4.animationSpeed = 32; // set animation speed (32 is default value)
      gauge4.set(calories); // set actual value

      opts.staticLabels =  {
        font: "16px sans-serif",  // Specifies font
        labels: [0, iMaxSugar],  // Print labels at these values
        color: "#000000",  // Optional: Label text color
        fractionDigits: 1  // Optional: Numerical precision. 0=round off.
      };

      var target5 = document.getElementById('gauge5'); 
      var gauge5 = new Gauge(target5).setOptions(opts); 
      gauge5.maxValue = iMaxSugar; // set max gauge value
      gauge5.setMinValue(0);  // Prefer setter over gauge.minValue = 0
      gauge5.animationSpeed = 32; // set animation speed (32 is default value)
      gauge5.set(sugar); // set actual value
}

const makeTable = dataRec => {
    const elem = document.getElementById('elementID');
    let html = "";
  // console.log(data);

  dataFiltered = dataRec;

  if (data.length == 0) data = dataRec;
  else makePagination(dataRec);

    let stop = dataRec.length;
    // console.log(json.length)

    if (start + perPage < dataRec.length) {
        stop = start + perPage;
  }
  
  // for (let item of data) {
    for (let i = start; i < stop; i++){
        // console.log(item);

        html += 


        `    <div class="card" data-index-number="${i}" onclick="modalOpen(this)" style="cursor:pointer">
        <div class="card-top">
          <img class="card-img" src="img/${dataRec[i].img}" alt="" />
        </div>
        <div class="card-title"><h3 class="title">${dataRec[i].name}</h3></div>
        <div class="card-family"><h4 class="family">${dataRec[i].family}</h4></div>
      </div>`;

    }
    elem.innerHTML = html;
}

const modalOpen = function (sender) 
{
    var element = document.getElementById("modal1");
    var elementContent = document.getElementById("modal-content1");
    var i = sender.dataset.indexNumber;
    let html = "";

    html += `

    <div class="testen">

    <div class="kop">
            <img class="c-modal-fruit-image" src="img/${dataFiltered[i].img}" alt="">
            <div class="c-modal-fruit-text">
            <h1 class="c-modal-fruit-text-title" id="FruitTitle">${dataFiltered[i].name}</h4>
              <p class="c-kaders-item__inhoud-subtitel c-modal-fruit-text-family"><div class="c-modal-fruit-text-description-family"> <div class="c-modal-fruit-text-description-subtitle">family:</div>${dataFiltered[i].family}</div></p>
              
</div>

            </div></div>
            <div class="o-label">About</div>
            <div class="c-modal-description-fruit">
            <p>${dataFiltered[i].about}</p>
</div>
            <div class="testen">
            <div class="o-label">Nutritions</div>
            <div class="nutritionssorted">
            <div>
                <p class="c-kaders-item__inhoud-subtitel">
                    <div class="c-modal-fruit-text-description"> <div class="c-modal-fruit-text-description-nutrition">carbohydrates:</div>${dataFiltered[i].nutritions.carbohydrates} g</div> 
                </p>
                <canvas id="gauge1"> </canvas>
            </div>
            <div>
            <p class="c-kaders-item__inhoud-subtitel"><div class="c-modal-fruit-text-description"> <div class="c-modal-fruit-text-description-nutrition">protein:</div>${dataFiltered[i].nutritions.protein} g</div> </p>
                <canvas id="gauge2"> </canvas>
            </div>
    
        <div>
        <p class="c-kaders-item__inhoud-subtitel"><div class="c-modal-fruit-text-description"> <div class="c-modal-fruit-text-description-nutrition">fat:</div>${dataFiltered[i].nutritions.fat} g</div> </p>
            <canvas id="gauge3"> </canvas>
        </div>
    
    <div>
    <p class="c-kaders-item__inhoud-subtitel"><div class="c-modal-fruit-text-description"> <div class="c-modal-fruit-text-description-nutrition">calories:</div>${dataFiltered[i].nutritions.calories} g</div> </p>
        <canvas id="gauge4"> </canvas>
    
    </div>
    <div>
    <p class="c-kaders-item__inhoud-subtitel"><div class="c-modal-fruit-text-description"> <div class="c-modal-fruit-text-description-nutrition">sugar:</div>${dataFiltered[i].nutritions.sugar} g</div> </p>
        <canvas id="gauge5"> </canvas>
    
    </div></div>

            <div class="o-label">Recept</div>
            <div class="c-modal-recept">
              <img class="c-modal-recept-image" src="img/${dataFiltered[i].recept.imgrecept}" alt="">
              <div class="c-modal-recept-text">
              <h1 class="c-modal-recept-text-title">${dataFiltered[i].recept.title}</h4>
                <p class="c-kaders-item__inhoud-subtitel"><div class="c-modal-recept-text-description"> <div class="c-modal-recept-text-description-ingredients"></div>${dataFiltered[i].recept.ingredient1}</div></p>
                <p class="c-kaders-item__inhoud-subtitel"><div class="c-modal-recept-text-description"> <div class="c-modal-recept-text-description-ingredients"></div>${dataFiltered[i].recept.ingredient2}</div></p>
                <p class="c-kaders-item__inhoud-subtitel"><div class="c-modal-recept-text-description"> <div class="c-modal-recept-text-description-ingredients"></div>${dataFiltered[i].recept.ingredient3}</div></p>
                <p class="c-kaders-item__inhoud-subtitel"><div class="c-modal-recept-text-description"> <div class="c-modal-recept-text-description-ingredients"></div>${dataFiltered[i].recept.ingredient4}</div></p>
                <p class="c-kaders-item__inhoud-subtitel"><div class="c-modal-recept-text-description"> <div class="c-modal-recept-text-description-ingredients"></div>${dataFiltered[i].recept.ingredient5}</div></p>
                <p class="c-kaders-item__inhoud-subtitel"><div class="c-modal-recept-text-description"> <div class="c-modal-recept-text-description-ingredients"></div>${dataFiltered[i].recept.ingredient6}</div></p>
  
              </div></div>
              <div class="o-label">Description</div>
              <div class="c-modal-description-recept">
                <p>${dataFiltered[i].recept.howto}</p>
    </div>`

    elementContent.innerHTML = html;
    
    modalLoaded(dataFiltered[i].nutritions.carbohydrates, dataFiltered[i].nutritions.protein, dataFiltered[i].nutritions.fat, dataFiltered[i].nutritions.calories, dataFiltered[i].nutritions.sugar);

    element.classList.add("is-visible");
}

const modalClose = function () 
{
    var element = document.getElementById("modal1");
    element.classList.remove("is-visible");
}

  const topScroll = function () {
    const btnTop = document.querySelector(".js-button--top");

    btnTop.addEventListener("click", (e) => {
        e.preventDefault();
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    });
};

const makePagination = function (rcv) { 
  const aantalPages = Math.ceil(rcv.length / perPage);
  
  if (aantalPages == 0) { document.querySelector('.js-users-pagination').innerHTML = ""; return;}

  let htmlString = `<div class="c-pagination-circle"><a class="c-pagination-arrow js-pag-left" href="#"><svg class="c-pagination-svg" xmlns="http://www.w3.org/2000/svg" width="16.757" height="30.514"
  viewBox="0 0 16.757 30.514" transform="rotate(180)">
  <path id="PijlRechts" class="c-pagination-svg__stroke"
      d="M13.5,35.271,26.636,22.136,13.5,9" transform="translate(-11.379 -6.879)"
      fill="none" stroke-linecap="round" stroke-linejoin="round"
      stroke-width="3"/>       
</svg></a></div>`;
  for (let i = 0; i < aantalPages; i++){
      htmlString += `<div class="c-pagination-circle js-pag-item" data-index="${i}"><a href="#"  class="c-pagination-number ">${i + 1}</a></div>`;
  }

  htmlString += `<div class="c-pagination-circle"><a href="#" class="c-pagination-arrow js-pag-right"><svg class="c-pagination-svg" xmlns="http://www.w3.org/2000/svg" width="16.757" height="30.514"
  viewBox="0 0 16.757 30.514">
  <path id="PijlRechts" class="c-pagination-svg__stroke"
      d="M13.5,35.271,26.636,22.136,13.5,9" transform="translate(-11.379 -6.879)"
      fill="none" stroke-linecap="round" stroke-linejoin="round"
      stroke-width="3" />
</svg></a></div>`;
  

  if (aantalPages  == 1) { document.querySelector('.js-users-pagination').innerHTML = "";  }
  else {document.querySelector('.js-users-pagination').innerHTML = htmlString;}

  pagClick();
}

//pagination click events
const pagClick = function () {
  const pagLeftArrow = document.querySelector(".js-pag-left");
  const pagRightArrow = document.querySelector(".js-pag-right");
  const pagItems = document.querySelectorAll(".js-pag-item");
  const totalPages = Math.ceil(data.length / perPage);

  if (pagItems.length == 0) { return; }
  
  pagItems[0].classList.add("pag-active");
  
  $(".js-pag-item").on("click", function (e) {
      e.preventDefault();
      currentIndex = $(this).data("index");
      // console.log(currentIndex);
      $(".js-pag-item").removeClass("pag-active");
      $(this).addClass("pag-active");
      start = $(this).data("index") * perPage;
      makeTable(data);
  })

  //left arrow
  pagLeftArrow.addEventListener("click", (e) => {
      e.preventDefault();

      // console.log("right arr");
      if (start <= 0) {
          start = 0;
      } else {
          start = start - perPage;
      }

      if (currentIndex <= 0) {
          currentIndex = 0;
      } else {
          currentIndex = currentIndex - 1;
      }

      $(".js-pag-item").removeClass("pag-active");
      $(`.js-pag-item[data-index=${currentIndex}]`).addClass('pag-active');
      // console.log(currentIndex);
      makeTable(data);
  })

  //pagination right arrow
  pagRightArrow.addEventListener("click", (e) => {
      e.preventDefault();
      // console.log("right arr");
      if (start >= data.length - perPage) {
          return false
      } else {
          start = start + perPage;
      }

      if (currentIndex > totalPages) {
          currentIndex = totalPages;
      } else {
          currentIndex = currentIndex + 1;
      }

      $(".js-pag-item").removeClass("pag-active");
      $(`.js-pag-item[data-index=${currentIndex}]`).addClass('pag-active');

      // console.log("right start", currentIndex);
      makeTable(data);
  });
}

const searchTable = () => {
    const searchBar = $("#search-input");
    searchBar.on("keyup", () => {
        let inputValue = searchBar.val();
        console.log(data.length);
        const newData = searchValue(inputValue, data);
        makeTable(newData);
    })
}

const searchValue = (value, dataArr) => {
    let searchedName = [];
    //console.log(dataArr)
    for (let item of dataArr) {
        value = value.toLowerCase();
        const fullName = item.name.toLowerCase();
        //console.log(fullName)
        if (fullName.includes(value)) {
            searchedName.push(item);
        }
    }
//console.log(searchedName);
    return searchedName;
}

const filterFamilyValue = (value, dataArr) => {
    let searchedName = [];
    for (let item of dataArr) {
        value = value.toLowerCase();
        const fullName = item.family.toLowerCase();
        //console.log(fullName)
        if (fullName.includes(value)) {
            searchedName.push(item);
        }
    }
//console.log(searchedName);
    return searchedName;
}

function filterSelection(c) {
    const newData = filterFamilyValue(c, data);
    makeTable(newData);
}

const init = function () {
  topScroll();
  searchTable();
}

document.addEventListener("DOMContentLoaded", init);