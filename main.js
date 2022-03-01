// search utilities
const searchButton = document.getElementById('search-button');
const searchField = document.getElementById('search-field');
const resultBox = document.getElementById('result-box');
const logo = document.getElementById('logo');

// important functions 
const $ = s => document.querySelector(s);
const errorBox = (display,innerText) => {
    const err = document.getElementById('error-box');
    err.style.display = display;
    err.innerHTML = innerText;
}

// event handling
//making logo clicking reload page
logo.addEventListener('click', () => {
    location.reload();
})
// clearing search field when clicked to input search 
searchField.addEventListener('click', () => {
    searchField.value = '';
    
})
// clearing result box when search input is changed
searchField.addEventListener('change', () => {
    resultBox.innerHTML = '';
        errorBox('none');
})

//click event on search button
searchButton.addEventListener('click', () => {
    //clearing resultbox
    resultBox.innerHTML = '';
    resultBox.style.display = 'grid';
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
        if (data == '') {
            errorBox('block',`Opps , There's No Phone In This Name! <br>Search Something Else!`)
                
        } else {

            // looping through data 
            data.forEach(element => {

                // showing only 20 product 
                // getting id 
                const slug = element.slug;
                    
                // getting phone details url 
                const detailUrl = `https://openapi.programming-hero.com/api/phone/${slug}`;

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


                    // creating div 
                    const div = document.createElement('div');
                    // adding css class 
                    div.classList.add('result');
                    // console.log(details);;
                    // inject data to innerHTML
                    div.innerHTML = `
                        <img src="${image}">
                        <h2>${name}</h2>
                        <p>${releaseDate ? releaseDate : "NO release Date Sorry!"}</p>`
                    
                    // appending the div 
                    resultBox.appendChild(div);

                    //adding event listen on div
                    div.addEventListener('click', () => {
                        resultBox.style.display = 'block';
                        resultBox.classList.add('details');
                        resultBox.innerHTML = `
                        <img src="${image}">
                        <h2>${name}</h2>
                        <p>${releaseDate ? releaseDate : "NO release Date Sorry!"}</p>`
                    })
                }
         });
        }
    }
});
