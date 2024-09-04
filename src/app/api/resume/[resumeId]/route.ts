import Resume from "@/lib/database/models/resume/resume.model";
import connectToDatabase from "@/lib/database/mongoose";
import { UpdateResume } from "@/services/api.svc";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { resumeId: string } }) {
  const { resumeId } = params;
  const updateData = await req.json(); 
  try {
    await connectToDatabase();
    const updatedResume = await Resume.findOneAndUpdate(
      {resumeId},
      {$set: updateData},
      {returnOriginal: false}
    );

    if(!updatedResume) return NextResponse.json({"message": "Update failed"}, {status: 200});

    return NextResponse.json(updatedResume, {status: 200});

  } catch (error) {
    return NextResponse.json({error}, {status: 500})
  }
}