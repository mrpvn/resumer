import Resume from "@/lib/database/models/resume/resume.model";
import connectToDatabase from "@/lib/database/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { resumeId: string } }) {

  const {resumeId} = params;

  try {
    await connectToDatabase();
    const resume = await Resume.findOne({resumeId});

    if(!resume) return NextResponse.json({"message": "No resume found!"}, {status: 200});

    return NextResponse.json(resume, {status: 200});

  } catch (error) {
    return NextResponse.json({error}, {status: 500})
  }
}

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

export async function DELETE(req: Request, {params}: {params: { resumeId: string }}) {
  const { resumeId } = params;
  try {
    await connectToDatabase();
    const deletedResume = await Resume.findOneAndDelete({resumeId});

    if(!deletedResume) return NextResponse.json({"message": "Some error occur while deleting the resume."}, {status: 200});

    return NextResponse.json(deletedResume, {status: 200});

  } catch (error) {
    return NextResponse.json({error}, {status: 500})
  }
}