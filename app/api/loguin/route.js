import { ConnectDB } from "@/libs/mongo";
import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({message : "Hola mundo"})
}

export function POST() {
   
    return NextResponse.json({message : "SignUp"})
}