
function validacionFrontLogin (inputUser, errorUser, inputPassword, errorPassword, btnJoin) {

    const inputs = [
        {
            input: inputUser,
            error: errorUser
        },
        {
            input: inputPassword,
            error: errorPassword
        }
    ]

    btnJoin.addEventListener('click',(e) => {
        inputs.forEach(input => {
            
            if(input.input.value == ''){
                e.preventDefault()
                input.input.style.border = '1px solid #FEC91B'
                input.error.innerText = 'Campo obligatorio'
            } else {
                input.input.style.border = 'white 0px solid'
                input.error.innerText = ''
            }
        })
    })
}