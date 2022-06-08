const images = [
    'https://random.imagecdn.app/200/200',
    'https://imago-mc.com/wp-content/uploads/2016/10/chrome-logo-200x200.png',
    'https://tdj.gg/uploads/attachs/90430_66956401-BCC3-40B6-B951-32503B0895DE.png',
    'https://displaypt.com/wp-content/uploads/2018/10/TEAM-200x200.png',
    'https://cn.i.cdn.ti-platform.com/content/343/showpage/historias-corrientes/es/regularshow-200x200.png',
    'https://placekitten.com/200/200',
    'https://placekitten.com/406/406',
    'https://placekitten.com/407/407',
] // como no hay fotos de los lugares de la api que uso, uso esto y fue. Lo unico que queria era hacer el lazy loading

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
    })
}

const createCard = (cardInfo) => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.id = `card-${cardInfo.id}`
    const rnd = Math.floor(Math.random() * images.length)
    console.log(rnd)
    card.innerHTML = `
        <h4 class='card-title'>${cardInfo.name}</h4>
        <h5 class='card-subtitle'>${cardInfo.dimension}</h6>
        <div class='image-container'>
            <img src='${images[rnd]}' loading='lazy' alt="foto falopa"/>
        </div>
        <div class='card-description'>
            <p>${`Type: ${cardInfo.type}`}</p>
            <p>${`Population: ${cardInfo.residents.length}`}</p>
        </div>
    `
    return card
}
