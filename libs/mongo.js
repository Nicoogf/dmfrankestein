import mongoose from "mongoose";
const { MONGODB_URI } = process.env


if(!MONGODB_URI) {
    throw new Error("La direccion de la bases de datos no fue declarada")
}

export const ConnectDB = async() => {
    try {
        const {connection} = await mongoose.connect(MONGODB_URI)
        if( connection.readyState === 1 ){
            console.log(">>>> MongoDB Conectado")
            return Promise.resolve(true)
        }
    } catch (error) {
        console.log(error)
        return Promise.resolve(false)
    }
}