const imageApi = 'https://random.imagecdn.app/200/200' // como no hay fotos de los lugares, uso esto y fue
const locationApi = 'https://rickandmortyapi.com/api/location?page='
let next = locationApi + '1'
// concatenar el nro de pagina. El tamaño de pagina es de 20 unidades

// capturo mis elementos
const requestTarget = document.getElementById('request-target')
const cardsContainer = document.getElementById('cards-container')

// estado inicial
let loading = false
let page = 1

/* OBSERVER para el SCROLLING */

// options
const scrollingOptions = {
    thresgold: 1, // cuando se vea la totalidad del elemento observado
}

// callback
// como cuando carga la pagina, no va a haber cartitas, intersectará y me va a llenar con datos la pagina
const onScrollToBottom = ([entry]) => {
    // recibo un array de entries, el primero es la ultima interseccion del elemento observado
    if (!loading && entry.isIntersecting && next) {
        loadData()
    }
}

let scrollObserver = new IntersectionObserver(
    onScrollToBottom,
    scrollingOptions
)

scrollObserver.observe(requestTarget)

/** Load next cards */
const loadData = async () => {
    try {
        loading = true
        const response = await fetch(next)
        const data = await response.json()

        next = data.info.next
        renderResults(data.results)
    } catch (error) {
        console.log('Error en loadData', error)
    } finally {
        loading = false
    }
}

const renderResults = (results) => {
    results.forEach((result) => {
        const card = createCard(result)
        cardsContainer.appendChild(card)

        // creo el observer para esconder el elemento cuando no esta
        const cardOptions = {
            threshold: 0.2,
        }
        const onCardIntersect = ([entry]) => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hide')
                entry.target.classList.add('show')
            } else {
                entry.target.classList.remove('show')
                entry.target.classList.add('hide')
            }
        }

        let cardObserver = new IntersectionObserver(
            onCardIntersect,
            cardOptions
        )
        cardObserver.observe(card)
    })
}

const createCard = (cardInfo) => {
    const card = document.createElement('div')
    card.classList.add('card')

    card.innerHTML = `
        <h4 class='card-title'>${cardInfo.name}</h4>
        <h5 class='card-subtitle'>${cardInfo.dimension}</h6>
        <div class='image-container'>
            <img src='${imageApi}' loading='lazy'/>
        </div>
        <div class='card-description'>
            <p>${`Type: ${cardInfo.type}`}</p>
            <p>${`Population: ${cardInfo.residents.length}`}</p>
        </div>
    `
    return card
}
