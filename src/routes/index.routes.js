const {Router} = require("express");
const router = Router();
const controller = require('../controllers/indexController')

router.get("/", controller.vistaPaginaPrincipal);
router.post("/formularioContacto", controller.formularioGoogleSheet);





module.exports = router;