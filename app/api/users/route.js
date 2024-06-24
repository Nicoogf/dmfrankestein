import { NextResponse } from "next/server";
import User from "@/models/user";
import { ConnectDB } from "@/libs/mongo";
import bcrypt from "bcryptjs"
import { createAccesToken } from "@/libs/jwt";
import { cookies } from 'next/headers'


export async function POST(request) {
 
  ConnectDB()
  try {
    const { dni, username, email, nombre ,apellido, password, telefono , rol } = await request.json()

    const passwordHash = await bcrypt.hash( password , 12 )

    const newUser = new User({
      dni,
      username , 
      email , 
      nombre, 
      apellido, 
      password :passwordHash,
      telefono , rol })

    const userSaved = await newUser.save()
    const token = await createAccesToken({id: userSaved._id})

    cookies().set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
    })

    return NextResponse.json(
     { 
      id: userSaved._id,
      dni: userSaved.dni,
      username: userSaved._username,
      email: userSaved.email,
      nombre: userSaved.nombre,
      apellido : userSaved.apellido,
      telefono :userSaved.telefono,
      rol :userSaved.rol,
      caja_ahorro:  userSaved.caja_ahorro,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt
    }
    )
  } catch (error) {
    return NextResponse.json({ message: error.message },{status:500})
  }

}