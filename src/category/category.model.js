import { Schema, model} from "mongoose";

const categoySchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [50, "Name cannot exceed 25 characters"]
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        maxLength: [125, "Description cannot exceed 25 characters"]
    },
    products: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Product" 
    }],
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})
export default model("Category", categoySchema)