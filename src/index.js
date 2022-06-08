const imageApi = 'https://random.imagecdn.app/250/250' // como no hay fotos de los lugares, uso esto y fue
const locationApi = 'https://rickandmortyapi.com/api/location?page='
// concatenar el nro de pagina. El tamaño de pagina es de 20 unidades

// capturo mis elementos
const requestTarget = document.getElementById('request-target')
const cardsContainer = document.getElementById('cards-container')

// estado inicial
let loading = false
let page = 1

/* OBSERVER */

// options
const options = {
    thresgold: 1, // cuando se vea la totalidad del elemento observado
}

// callback
// como cuando carga la pagina, no va a haber cartitas, intersectará y me va a llenar con datos la pagina
const onIntersect = (entry) => {
    console.log('Intersecte')
    loadData()
}

let observer = new IntersectionObserver(onIntersect, options)

observer.observe(requestTarget)

const loadData = async () => {
    try {
        loading = true
    } catch (error) {
        console.log('Error en loadData', error)
    } finally {
        loading = false
    }
}
