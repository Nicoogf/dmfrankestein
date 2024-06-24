import { NextResponse } from "next/server";

export function GET( request, response ) {
    return NextResponse.json({message : "profile"})
}