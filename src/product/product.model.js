import { Schema, model, version} from "mongoose"

const productSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [50, "Name cannot exceed 25 characters"]
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        maxLength: [150, "Name cannot exceed 25 characters"]
    },
    price:{
        type: Number,
        required: [true, "The Price is required"]
    },
    stock:{
        type: Number,
        required: [true, "The stock is required"],
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category", 
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Product", productSchema)