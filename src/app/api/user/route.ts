import User from "@/lib/database/models/user/user.model";
import connectToDatabase from "@/lib/database/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request){
  try {
    await connectToDatabase();
    const userData = await req.json();
    const newUser = await User.create(userData);
    if(!newUser){
      console.log("User not created")
    }
    return NextResponse.json(newUser, {status: 200})
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}