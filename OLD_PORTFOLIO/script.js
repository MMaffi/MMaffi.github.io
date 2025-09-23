// Comando para deixar as Box 3d ------------------------------------------------- 

VanillaTilt.init(document.querySelectorAll(".especialidades_box"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.1,
    scale: 1.1
    
})


// Função para abrir o menu mobile ------------------------------------------------

let botao_abrir_menu = document.getElementById('botao_abrir_menu')
let menu_mobile = document.getElementById('menu_mobile')
let overlay_menu = document.getElementById('overlay_menu')

botao_abrir_menu.addEventListener('click', () => {
    menu_mobile.classList.add('menu_aberto')
})

menu_mobile.addEventListener('click', () => {
    menu_mobile.classList.remove('menu_aberto')
})

overlay_menu.addEventListener('click', () => {
    menu_mobile.classList.remove('menu_aberto')
})


// Funções dos links ---------------------------------------------------------------

const menuitens = document.querySelectorAll('.menu_desktop a, .menu_mobile a')

menuitens.forEach(item => {
    item.addEventListener('click', ScrollToIdOnClick)
})

function getScrollTopByHref(element) {
    const id = element.getAttribute('href');
    return document.querySelector(id).offsetTop
}

function ScrollToIdOnClick(event) {
    event.preventDefault();
    const to = getScrollTopByHref(event.target) - 30;
    scrollToPosition(to)
}

function scrollToPosition(to) {
    window.scroll({
        top: to,
        behavior: "smooth"
    })
}

const botaorefresh = document.querySelector('#refresh')
botaorefresh.addEventListener('click', () => {
    location.reload()
})