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

    cityselect.innerHTML = "<option value>Selecione a Cidade</option>"
    cityselect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        
        for ( const city of cities ) {
            cityselect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        cityselect.disabled = false
                  
    } )
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Itens de coleta
// pegar todos os LIs
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
   
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {

    const itemLi = event.target

    //adiconar ou remover uma classe com JS
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // verificar se existem items selecionados,
    // se sim pegar os items selecionados
    //const alreadySelected = selectedItems.findIndex( function(item) {
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId 
        return itemFound
    })


    // se ja estiver selecionado 
    if( alreadySelected >= 0 ) {
        // tirar da selecao
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent 

        })

        selectedItems = filteredItems
    } else {
    // se nao tiver selecionad adicionar a selecao
        selectedItems.push(itemId)
    }

    console.log(selectedItems)

    // atualizar o campo escondindo com os items selecionados
    collectedItems.value = selectedItems
    

}
