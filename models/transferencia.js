import mongoose, { Schema } from "mongoose";

const transferenciaSchema =  new Schema({
    monto:{
        type: Number
    },
    fecha:{
        default: Date.now()
    },
    descripcion:{
        type: String
    },
    destinatario:{
        type: String
    },
    user_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
})

export default mongoose.model("Movimiento" , transferenciaSchema )