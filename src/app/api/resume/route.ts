import connectToDatabase from "@/lib/database/mongoose";
import Resume from "@/lib/database/models/resume/resume.model";
import PersonalDetail from "@/lib/database/models/resume/personalDetail.model";
import { NextResponse } from "next/server";
import User from "@/lib/database/models/user/user.model";

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

export async function POST(req: Request){
  const formData = await req.json();
  try {
    await connectToDatabase();
    const userId = await User.findById({clerkId: })
    const newResume = await PersonalDetail.create(formData);

    return NextResponse.json(newResume, {status: 200})

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}