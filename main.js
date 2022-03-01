const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data));
    
    
});