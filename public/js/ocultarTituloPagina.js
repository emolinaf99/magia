
const tituloPaginaMagia = document.querySelector('.bloqueTitle')

if(tituloPaginaMagia) {
    window.addEventListener('scroll',() => {
        let scroll = window.scrollY

        if(scroll > 35){
            tituloPaginaMagia.style.display = 'none'
        } else {
            tituloPaginaMagia.style.display = 'block'
        }

    })
}