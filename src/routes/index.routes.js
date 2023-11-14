const {Router} = require("express");
const router = Router();

const controller = require('../controllers/indexController')
const userController = require('../controllers/userController')

const authMiddleware = require('../middlewares/auth.middleware')
const guestMiddleware = require('../middlewares/guest.middleware')

const validationsLogin = require('../validations/login')

router.get("/", controller.vistaPaginaPrincipal);
router.get("/loginAdminMagia",guestMiddleware, controller.loginAdmin);
router.get("/funcionesAdministrador",authMiddleware, userController.funcionesAdministradorVista);

router.post("/formularioContacto", controller.formularioGoogleSheet);
router.post("/loginProcess", validationsLogin, userController.loginProcess);



module.exports = router;