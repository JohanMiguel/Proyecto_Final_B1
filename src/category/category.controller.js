import Category from "./category.model.js"
import Product from "../product/product.model.js"; 
import fs from "fs/promises"

export const initializeDefaultCategory = async () => {
    try {
        const defaultCategory = await Category.findOne({ name: "Global" });

        if (!defaultCategory) {
            const category = new Category({
                name: "Global",
                description: "Categoria por defecto",
                status: true,
            });

            await category.save();
            console.log("✨ Categoría por defecto creada correctamente");
        }
    } catch (error) {
        console.error("❌ Error al inicializar la categoría por defecto:", error);
    }
};

// se inicia Trabajo de category_team
export const saveCategory  = async(req, res) => {
    try {
        const { name, description} = req.body;
        const newCategory = new Category({
            name,description
            })

        await newCategory.save();
        return res.status(201).json({
            succes: true,
            message: "Categoria creada exitosamente",
            Category: newCategory
        })

    } catch (err) {
        return res.status(500).json({
            succes: false,
            msg: "Error al crear la categoria ",
            err
        })
    }
}

export const getCategorys = async(req,res) =>{
    try {
        const { limite = 5, desde = 0 } = req.query
        const query = {};
        const [total, categorys] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            succes: true,
            total,
            categorys
        })
    } catch (err) {
        return res.status(500).json({
            succes: false,
            message: "Error al obtener las categorias"
        })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const {idCategory} = req.params;
        const data = req.body;
        const category = await Category.findByIdAndUpdate(idCategory, data, {new: true});
        res.status(200).json({
            success: true,
            message: "Categoria actualizada",
            data: category
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar",
        });
    }
}

  export const getCategoryByName = async (req, res) => {
    try {
        const { name } = req.params;
        const category = await Category.findOne({ name: new RegExp(`^${name}$`, "i") });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada",
            });
        }

        res.status(200).json({
            success: true,
            category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al buscar la categoría",
            error: error.message,
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { idCategory } = req.params;
        const category = await Category.findOneAndDelete(idCategory);


        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada"
            });
        }
       
        return res.status(200).json({
            success: true,
            message: "Categoría eliminada",
            category
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la categoría",
            error: err.message
        });
    }
}