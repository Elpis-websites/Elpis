import { contactHandler } from "@/lib/mailer";

export const runtime = "nodejs"; // nodemailer richiede Node.js, non l'ambiente "edge"
export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  return contactHandler()(request);
}
