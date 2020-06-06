
function populateUFs() {
    const ufselect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for ( const state of states ) {
            ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
                  
    } )
}

populateUFs()


function getCities(event) {
    const cityselect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for ( const city of cities ) {
            cityselect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        cityselect.disabled = false
                  
    } )
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)