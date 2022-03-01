const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
    const searchField = document.getElementById('search-field');
    const resultBox = document.getElementById('result-box');
    const errorBox = (display,innerText) => {
        const err = document.getElementById('error-box');
        err.style.display = display;
        err.innerHTML = innerText;
    }
    const searchText = searchField.value;
    searchField.addEventListener('click', () => {
        searchField.value = '';
       
    })
    searchField.addEventListener('change', () => {
        resultBox.innerHTML = '';
         errorBox('none');
    })
    const phoneUrl = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    
    fetch(phoneUrl)
        .then(res => res.json())
        .then(data => showData(data.data));
    
    const showData = (data) => {
        if (data == '') {
            errorBox('block',`Opps , There's No Phone In This Name! <br>Search Something Else!`)
                
        } else {
            data.forEach(element => {
            const slug = element.slug;
            const detailUrl = `https://openapi.programming-hero.com/api/phone/${slug}`;
            fetch(detailUrl)
                .then(res => res.json())
                .then(details => showDetails(details.data));
            
            const showDetails = details => {
                // console.log(details);
                const div = document.createElement('div');
                div.classList.add('result');
                div.innerHTML = `<img src="${details.image}" alt="phone-image">
                    <h2>${details.name}</h2>
                    <small>${details.releaseDate}`
                resultBox.appendChild(div);
            
            }
        });
        }
        
    }  
    
    
});