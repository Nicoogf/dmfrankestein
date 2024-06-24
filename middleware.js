import { NextResponse } from 'next/server'
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from './config';

export function middleware(request) {
    if (request.nextUrl.pathname.includes("/cuenta")) {
        const token = request.cookies.get("token")
        if (!token) return NextResponse.json({ message: "No se encontro Token, sin autorizacion" }, { status: 400 })

        jwt.verify(token, TOKEN_SECRET, (err, user) => {
            if (err) return NextResponse.json({ message: "Token invalido" }, { status: 400 })

            return NextResponse.json(user)
        })
    }


    return NextResponse.next()
}