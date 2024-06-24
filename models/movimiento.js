import mongoose, { Schema } from "mongoose";

const movimientoSchema =  new Schema({
    monto:{
        type: Number
    },
    fecha:{
        default: Date.now()
    },
    tipo:{
        type:string
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

export default mongoose.model("Movimiento" , movimientoSchema )