import Product from './product.model.js';
import Category from '../category/category.model.js';
import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const saveProduct = async (req, res) => {
    try {
        const data = req.body;
        const product = await Product.create(data);
        return res.status(201).json({
            success: true,
            message: "Producto agregado al Sistema",
            data: product
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al agregar Prodducto",
            error: err.message
        })
    }
}

export const getProducts = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { status: true };

    try {
        const products = await Product.find(query).populate("category", "name") 
            .skip(Number(desde))
            .limit(Number(limite));

        const total = await Product.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los productos',
            error: error.message,
        });
    }
};

//actualizar informacion del producto
export const updateProduct = async (req, res) => {
    try {
        const { idProduct } = req.params;
        const data = req.body;


        const updatePro = await Product.findByIdAndUpdate(idProduct, data, {new: true} )

        return res.status(200).json({
            message: "Producto Actualizado",
            updatePro
        });
    } catch (err) {
        return res.status(500).json({
            message: "Poducto no actualizado",
            error: err.message
        });
    }
};

// eliminar
export const deleteProduct = async (req, res) => {
    try {
        const { idProduct } = req.params;
        const product = await Product.findByIdAndUpdate(idProduct, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Producto eliminado correctamente",
            product
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar Producto",
            error: err.message
        });
    }
};

export const getProductsFiltered = async (req, res) => {
    try {
        const { desde = 0, limite = 900, filtro, name, category } = req.query;
        const query = {};

        if (name) {
            query.name = new RegExp(name, "i");
        }

        if (category) {
            const categoryFound = await Category.findOne({ name: new RegExp(`^${category}$`, "i") }).lean();
            if (categoryFound) {
                query.category = categoryFound._id;
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Categoría no encontrada"
                });
            }
        }

        let sortOptions = {};

        switch (filtro) {
            case "agotados":
                query.stock = 0;
                break;
            case "mas-vendidos":
                sortOptions = { totalSold: -1 };
                break;
            default:
                sortOptions = {};
        }

        const products = await Product.find(query)
            .sort(sortOptions)
            .limit(Number(limite))
            .lean();

        return res.status(200).json({
            success: true,
            total: products.length,
            products
        });
    } catch (error) {
        console.error("❌ Error en getProductsFiltered:", error);
        return res.status(500).json({
            success: false,
            message: "Error en el servidor",
            error: error.message
        });
    }
};
