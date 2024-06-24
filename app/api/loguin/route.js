import { NextResponse } from "next/server";
import User from "@/models/user";
import { ConnectDB } from "@/libs/mongo";
import bcrypt from "bcryptjs";
import { createAccesToken } from "@/libs/jwt";
import { cookies } from 'next/headers'


export async function POST(request) {
 
  ConnectDB()  
  try {
    const { email, password } = await request.json()

    const userFound = await User.findOne({email})

    if(!userFound) return NextResponse.json({message : "Usuario no encontrado"},{status : 400})

    const isMatch = await bcrypt.compare(password, userFound.password);   

    if(!isMatch) return NextResponse.json({message: "Credenciales incorrectas"},{status : 400})

    const token = await createAccesToken({id: userFound._id})

    cookies().set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
    })

    return NextResponse.json(
     { 
      id: userFound._id,
      dni: userFound.dni,
      username: userFound._username,
      email: userFound.email,
      nombre: userFound.nombre,
      apellido : userFound.apellido,
      telefono :userFound.telefono,
      rol :userFound.rol,
      caja_ahorro:  userFound.caja_ahorro,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    }
    )
  } catch (error) {
    return NextResponse.json({ message: error.message },{status:500})
  }

}