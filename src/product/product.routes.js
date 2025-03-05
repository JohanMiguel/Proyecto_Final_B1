import { Router } from "express";
import { saveProduct,getProducts, updateProduct, deleteProduct,getProductsFiltered} from "./product.controller.js";
import { createProductValidator,updateProductValidator,deleteProductValidator } from "../middlewares/product-validator.js";


const router = Router();

router.post("/addProduct", createProductValidator, saveProduct);
router.get("/", getProducts);
router.put("/update/:idProduct",updateProductValidator, updateProduct);
router.delete("/delete/:idProduct",deleteProductValidator, deleteProduct);
router.get("/filtros", getProductsFiltered);
export default router