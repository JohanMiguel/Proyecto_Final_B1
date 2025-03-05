import { body,param } from "express-validator";
import { validarCampos} from "./validate-fields.js";
import { deleteFileOnError} from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js"
import { categoryExists } from "../helpers/db-validators.js";
import { hasRoles } from "./validate-roles.js";

export const createProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("description").notEmpty().withMessage("La descripción es requerida"),
    body("price").notEmpty().withMessage("El precio es requerida"),
    body("stock").notEmpty().withMessage("El stock es requerida"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const updateProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("category").optional().isMongoId().withMessage("Invalid category ID").custom(categoryExists),
    validarCampos,
    handleErrors
]

export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("category").optional().isMongoId().withMessage("Invalid category ID").custom(categoryExists),
    validarCampos,
    handleErrors
]