"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import{initializeDefaultCategory} from "../src/category/category.controller.js"
import {initializeAdminUser } from "../src/user/user.controller.js"
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import categoryRoutes from "../src/category/category.routes.js"
import productRoutes from "../src/product/product.routes.js"
import cartRoutes from "../src/cart/cart.routes.js"
import billRoutes from "../src/bill/bill.routes.js"
const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
}

const routes = (app) =>{
    app.use("/shopflow/v1/auth", authRoutes)
    app.use("/shopflow/v1/user", userRoutes)
    app.use("/shopflow/v1/category", categoryRoutes)
    app.use("/shopflow/v1/product", productRoutes)
    app.use("/shopflow/v1/cart", cartRoutes)
    app.use("/shopflow/v1/bill", billRoutes)
}

const conectarDB = async () =>{
    try{
        await dbConnection()
        await initializeAdminUser()
        await initializeDefaultCategory()
    }catch(err){
        console.log(`❌Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`✅Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`❌Server init failed: ${err}`)
    }
}