const {Router} = require("express");
const router = Router();
const controller = require('../controllers/indexController')
const userController = require('../controllers/userController')

router.get("/", controller.vistaPaginaPrincipal);
router.get("/loginAdminMagia", controller.loginAdmin);
router.post("/formularioContacto", controller.formularioGoogleSheet);
router.post("/loginProcess", userController.loginProcess);



module.exports = router;