import { Router } from "express"
import { register, login} from "./auth.controller.js"
import { registerValidator, loginValidator } from "../middlewares/user-validators.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"

const router = Router()

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: profilePicture
 *         type: file
 *         description: The user's profile picture.
 *       - in: formData
 *         name: username
 *         type: string
 *         description: The user's username.
 *       - in: formData
 *         name: password
 *         type: string
 *         description: The user's password.
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post("/register", uploadProfilePicture.single("profilePicture"), registerValidator, register)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to login.
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - password
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Bad request
 */
router.post("/login", loginValidator, login)

export default router