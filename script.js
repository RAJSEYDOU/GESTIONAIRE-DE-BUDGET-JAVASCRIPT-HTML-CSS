//get element
// boutton 
const btnRevenue = document.querySelector('.btnRevenu')
const btnDepense = document.querySelector('.btnDepense')
const btnAll = document.querySelector('.btnAll')

const contentItemRevenue = document.querySelector('.contentItemRevenue')
const contentItemDepense = document.querySelector('.contentItemDepense')
const contentItemAll = document.querySelector('.contentItemAll')
    // select Liste
const listeDepense = document.querySelector('.contentItemDepenseP')
const listeRevenue = document.querySelector('.contentItemRevenueP')
const listeAll = document.querySelector('.contentItemAllP')

// input Selector
const CtiDName = document.querySelector('#CtiDName')
const CtiDPrix = document.querySelector('#CtiDPrix')
const CtiRName = document.querySelector('#CtiRName')
const CtiPrix = document.querySelector('#CtiRPrix')
    // inner-Selector- Balance ,Revenue,Depense
const balanceInner = document.querySelector('.balance-Inner')
const revenueInner = document.querySelector('.revenue-Inner')
const depenseInner = document.querySelector('.depense-Inner')



// setting Variable
let LISTE = [];
let id = 0;

let data = localStorage.getItem("LISTE")

if (data) {
    data = JSON.parse(data)
    showlisteItemALL(listeAll, data)
    showlisteItemOTHERS(data)
    LISTE = data
    id = data.length
} else {
    LISTE = [];
    id = 0;
}




// menu item

btnRevenue.addEventListener('click', function() {
    addClass(btnRevenue)
    removeClass([btnAll, btnDepense])
    showContent(contentItemRevenue)
    hideContent([contentItemAll, contentItemDepense])

})
btnDepense.addEventListener('click', function() {
    addClass(btnDepense)
    removeClass([btnAll, btnRevenue])
    showContent(contentItemDepense)
    hideContent([contentItemAll, contentItemRevenue])
})
btnAll.addEventListener('click', function() {
    addClass(btnAll)
    removeClass([btnDepense, btnRevenue])
    showContent(contentItemAll)
    hideContent([contentItemRevenue, contentItemDepense])
})


function removeClass(array) {
    array.forEach(function(item) {
        item.classList.remove("active")
    })
}

function addClass(item) {
    item.classList.add("active")

}

function hideContent(array) {
    array.forEach(function(item) {
        item.style.display = "none";
    })
}

function showContent(item) {
    item.style.display = "block";
}
// menu item

// Clear Input

function Clear(a, b) {
    a.value = "";
    b.value = ""

}

// get input 
document.addEventListener('keydown', getInput)

function getInput(event) {

    if (event.keyCode == 13) {

        if (CtiDName.value && CtiDPrix.value) {

            let depense = {
                type: "depense",
                id: id,
                nom: CtiDName.value,
                prix: CtiDPrix.value
            }
            LISTE.push(depense)

            showlisteItem(listeDepense, depense.id, depense.nom, depense.prix, depense.type)
            showlisteItem(listeAll, depense.id, depense.nom, depense.prix, depense.type)
            console.log(calculDepense(LISTE))

            Clear(CtiDName, CtiDPrix)
        } else if (CtiRName.value && CtiRPrix.value) {
            let revenue = {
                type: "revenue",
                id: id,
                nom: CtiRName.value,
                prix: CtiRPrix.value
            }
            LISTE.push(revenue)
            showlisteItem(listeRevenue, revenue.id, revenue.nom, revenue.prix, revenue.type)
            showlisteItem(listeAll, revenue.id, revenue.nom, revenue.prix, revenue.type)
            console.log(calculRevenue(LISTE))

            Clear(CtiRName, CtiRPrix)
        } else {
            alert("champ vide")
        }

        id++;
        localStorage.setItem("LISTE", JSON.stringify(LISTE))
        calculBalance(calculRevenue(LISTE), calculDepense(LISTE))




    }


}




// show on liste INITIALIZER



// liste Item
function showlisteItem(liste, id, nom, prix, type) {

    let COLOR = (type == "depense") ? "red" : "blue";

    const position = "beforeend"
    const template = `<li style="color:${COLOR};width:70%;height:20px;border:1px solid white;">${id} -${nom} - ${prix}-${type}<li>`

    liste.insertAdjacentHTML(position, template)
}

// FIRST CONNECTION TO LOCALSTORAGE

function showlisteItemALL(liste, array) {
    array.forEach(item => {
        let COLOR = (item.type == "depense") ? "red" : "blue";


        const position = "beforeend"
        const template = `<li style="color:${COLOR};width:70%;height:20px;border:1px solid white;">${item.id} -${item.nom} - ${item.prix}-${item.type}<li>`

        liste.insertAdjacentHTML(position, template)

    })


}

function showlisteItemOTHERS(array) {
    array.forEach(item => {
        let COLOR = (item.type == "depense") ? "red" : "blue";
        if (item.type == "revenue") {
            const position = "beforeend"
            const template = `<li style="color:${COLOR};width:70%;height:20px;border:1px solid white;">${item.id} -${item.nom} - ${item.prix}-${item.type}<li>`

            listeRevenue.insertAdjacentHTML(position, template)

        } else {

            const position = "beforeend"
            const template = `<li style="color:${COLOR};width:70%;height:20px;border:1px solid white;">${item.id} -${item.nom} - ${item.prix}-${item.type}<li>`

            listeDepense.insertAdjacentHTML(position, template)
        }




    })


}

// calcul total

function calculDepense(array) {
    let sum = 0;
    array.forEach(item => {
        if (item.type == "depense") {
            sum += parseInt(item.prix)
        }
    })

    depenseInner.innerHTML = sum + " " + "FCFA";
    return sum
}

function calculRevenue(array) {
    let sum = 0;
    array.forEach(item => {
        if (item.type == "revenue") {

            sum += parseInt(item.prix)
        }
    })
    revenueInner.innerHTML = "FCFA" + " " + sum;

    return sum
}
// BALANCE CALCUL
function calculBalance(a, b) {
    let diff = a - b
    diff = (diff < 0) ? Math.abs(diff) : diff
    balanceInner.innerHTML = diff + " " + "FCFA"
}