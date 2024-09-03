import connectToDatabase from "@/lib/database/mongoose";
import { NextResponse } from "next/server";
import Resume from "@/lib/database/models/resume/resume.model";

// export async function GET(req: NextApiRequest, res: NextApiResponse){
//   const {id} = req.query;
//   try {
//     await connectToDatabase();
//     const resume = await Resume.findById({clerkId: id});

//     if(!resume) res.status(404).json({ error: 'Resume not found' });

//     return res.status(200).json(resume);

//   } catch (error) {
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

// export async function POST(req: Request){
//   const formData = await req.json();
//   try {
//     await connectToDatabase();
//     const newResume = await PersonalDetail.create(formData);

//     return NextResponse.json(newResume, {status: 200});

//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

export async function POST(req: Request) {
  const newResumeData = await req.json();
  try {
    await connectToDatabase();
    const newResume = await Resume.create(newResumeData);

    return NextResponse.json(newResume, {status: 200});

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get('email[queryKey][1]');

  try {
    await connectToDatabase();
    const resumes = await Resume.find({userEmail});

    if(!resumes) return NextResponse.json({message: "No resume found"}, {status: 200});

    return NextResponse.json(resumes, {status: 200});
    
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}