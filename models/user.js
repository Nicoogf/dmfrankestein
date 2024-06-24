import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    dni	:{
        type: Number
    },
    username:{
        type:String
    },
    email:{
        type: String
    },
    nombre:{
        type:String
    },
    apellido:{
        type:String
    },
    password:{
        type:String,
        select : false
    },
    telefono:{
        type: Number
    },
    rol:{
        type: String,
        default: "usuario"
    }
},{
    timestamps: true
})

export default mongoose.models.User || mongoose.model("User", userSchema);
