const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    
    fetch(url)
        .then(res => res.json())
        .then(data => showData(data.data));
    
    const showData = (data) => {
        const resultBox = document.getElementById('result-box');
        data.forEach(element => {
            console.log(element);
            const div = document.createElement('div');
            div.classList.add('result');
            div.innerHTML = `<img src="${element.image}" alt="phone-image">
              <h2>${element.phone_name}</h2>
              <p>release date:date</p>
              <p>Phone Details</p>`
            resultBox.appendChild(div);
              
        });
        }  
    
});