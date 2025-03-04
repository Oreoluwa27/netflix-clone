import serverAuth from "@/lib/serverAuth";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
  try {
    const { user } = await serverAuth(req);

    return new Response(JSON.stringify({ status: 200, user }));
  } catch (err) {
    //console.error(err);
    return new Response(JSON.stringify({ status: 400 }));
  }
}
