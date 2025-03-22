import GenerativeAI from "@/lib/gemini";

export async function GenerateSummaryFromAI(role: string) {
  const PROMPT = `
      Generate a JSON response containing a resume summary for the role of ${role} across three experience levels: "Fresher", "Mid-level", and "Experienced". Each entry in the JSON should have:

      1. "experience_level": Specify the level (e.g., Fresher, Mid-level, Experienced).
      2. "summary": Provide a 4-5 line summary that highlights relevant skills, technologies, and key achievements based on the experience level. The summary should be professional and concise.

     The JSON should be a flat array of objects, with no additional keys.
    `;
  const result = await GenerativeAI(PROMPT);
  const response = await JSON.parse(result.response.text());
  return response;
}
