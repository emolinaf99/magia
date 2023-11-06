

const controller = {
    vistaPaginaPrincipal: (req,res) => {
        res.render('index')
    },

    formularioGoogleSheet: (req,res) => {
        console.log(JSON.stringify(req.body));
    },
}

module.exports = controller