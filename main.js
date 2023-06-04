
let input = document.querySelector('.input')
let list = document.querySelector('.list')

input.addEventListener('keyup',display)

let citis = [];
let endPoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'
fetch(endPoint).then((reqset) => reqset.json()).then((data) => citis.push(...data))

function match(word, citis) {
    return citis.filter((place) =>
        place.city && place.city.toLowerCase().includes(word.toLowerCase()) || 
        place.state && place.state.toLowerCase().includes(word.toLowerCase()) 
    )
}

function display() {
    let results = match(input.value, citis);
    let html = results.map((place) => {
        let regex = new RegExp(this.value,'gi')
        let cityName = place.city.replace(regex,`<span class="lh">${this.value}</span>`)
        let stateName = place.state.replace(regex,`<span class="lh">${this.value}</span>`)
        return `<li>
        <span>${cityName} , ${stateName}</span>
        <span>${cumma(place.population) }</span>
        </li>`
    }).join('')
    list.innerHTML= html
}

function cumma(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
}