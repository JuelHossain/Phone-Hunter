const $ = s => document.querySelector(s);

// search utilities
const searchButton = $('#search-button');
const searchField = $('#search-field');
const resultField = $('#result-box');
const logo = $('#logo');
const err = $('#error-box');

// important functions 

const resultBox = (inner, display='none',)=>{
    resultField.style.display = display;
    resultField.innerHTML = inner;
}
const errorBox = (inner, display='none') => {
    err.style.display = display;
    err.innerHTML = inner;
};

// event handling
//making logo clicking reload page
logo.addEventListener('click', () => {
    location.reload();
})
// clearing search field when clicked to input search 
searchField.addEventListener('click', () => {
    searchField.value = '';
    errorBox();
    
})
// clearing result box when search input is changed
searchField.addEventListener('change', () => {
    resultBox();
    errorBox();
})

//click event on search button
searchButton.addEventListener('click', () => {
    //clearing resultField
    resultBox('', 'grid');

    //getting search text
    const searchText = searchField.value;

    //api
    const Url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    // fetchin api 
    fetch(Url)
        .then(res => res.json())
        .then(data => showData(data.data.slice(0, 20)));
    
    // showing data
    const showData = (data) => {

        //validating
        if (data==false) {
            errorBox(`Opps , There's No Phone In This Name! <br>Search Something Else!`, 'block');
                
        } else {

            // looping through data 
            data.forEach(e => {
                    
                // getting phone details url 
                const detailUrl = `https://openapi.programming-hero.com/api/phone/${e.slug}`;

                // fetching details data 
                fetch(detailUrl)
                    .then(res => res.json())
                    .then(details => showDetails(details.data));
                
                // showing details data 
                const showDetails = details => {
                    //getting outputs
                    let { image } = details;
                    let { name } = details;
                    let { releaseDate } = details;
                    let { brand } = details;
                    let { mainFeatures } = details;
                    let { chipset } = mainFeatures;
                    let { displaySize } = mainFeatures;
                    let { memory } = mainFeatures;
                    let { storage } = mainFeatures;
                    let { sensors } = mainFeatures;

                    const div = document.createElement('div');
                    div.classList.add('result');
                    div.innerHTML= `
                        <img src="${image}">
                        <h2>${name}</h2>
                        <p>${releaseDate ? releaseDate : "NO release Date Sorry!"}</p>
                        <p>brand: ${brand}`
                        // appending the div 
                    resultField.appendChild(div);

                        //adding event listen on div
                        div.addEventListener('click', () => {
                            resultField.style.display = 'block';
                            resultField.classList.add('details');
                            resultField.innerHTML = `
                        <img src="${image}">
                        <h2>${name}</h2>
                        <p>${releaseDate ? releaseDate : "NO release Date Sorry!"}</p>
                        <p>Chipset: ${chipset}</p>
                        <p>Display Size: ${displaySize}</p>
                        <p>Memory : ${memory}</p>
                        <p>Storage: ${storage}</p>
                        <p>Sensors: ${sensors}`
                        })
                    
                }
         });
        }
    }
});
