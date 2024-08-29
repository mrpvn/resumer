import connectToDatabase from "@/lib/database/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import Resume from "@/lib/database/models/resume/resume.model";

export async function GET(req: NextApiRequest, res: NextApiResponse){
  const {id} = req.query;
  try {
    await connectToDatabase();
    const resume = await Resume.findById({clerkId: id});

    if(!resume) res.status(404).json({ error: 'Resume not found' });

    return res.status(200).json(resume);

  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse){
  const {data} = req.body;
  try {
    await connectToDatabase();
    const newResume = await Resume.create(data);

    return res.status(200).json(newResume);

  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}