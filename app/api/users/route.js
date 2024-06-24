import { NextResponse } from "next/server";
import User from "@/models/user";
import { ConnectDB } from "@/libs/mongo";
import bcrypt from "bcryptjs"
import { createAccesToken } from "@/libs/jwt";
import { cookies } from 'next/headers'


export async function POST(request) {
  // const { dni,
  //     username,
  //     email,
  //     nombre,
  //     apellido,
  //     password,
  //     telefono,
  //     rol
  // } = await request.json()

  // if (!password || password.length < 6) return NextResponse.json({ message: "La contraseña debe tener al menos 6 caracteres" }, { status: 400 })

  // try {     
  //     await ConnectDB()
  //     const userFound = await User.findOne({ email })
  //     if (userFound) return NextResponse.json({
  //         message: "El email ya existe"
  //     }, {
  //         status: 400
  //     })

  //     const hashedPassword = await bcrypt.hash(password, 12)

  //     const user = new User({
  //         dni,
  //         username,
  //         email,
  //         nombre,
  //         apellido,
  //         password: hashedPassword,
  //         telefono,
  //         rol
  //     })

  //     const savedUser = await user.save()
  //     console.log(savedUser)

  //     return NextResponse.json(savedUser)
  // } catch (error) {
  //     console.log(error)
  //     if( error instanceof Error){
  //         return NextResponse.json({
  //             message: error.message
  //         } , {status: 400})
  //     }       
  // }

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