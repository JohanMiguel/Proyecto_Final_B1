import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Gestor de sistema de Supermercado",
            version: "1.0.0",
            description: "API para un sistema de gestión de Supermercado",
            contact:{
                name: "Johan Tojin",
                email: "jtojin-2020591@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/shopflow/v1"
            }
        ]
    },

    apis:[
        "./src/auth/*.js",
        "./src/user/*.js",
        "./src/category/*.js",
        "./src/product/*.js",
        "./src/cart/*.js",
        "./src/bill/*.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}
