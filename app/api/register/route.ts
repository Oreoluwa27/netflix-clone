import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  interface Login {
    name: string;
    password: string;
    email: string;
  }

  try {
    const { email, name, password }: Login = await req.json();

    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ status: 400, message: "Email already exists." })
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return new Response(JSON.stringify({ user, status: 200 }));
  } catch (err) {
    //console.error(err);
    throw new Error("An error occurred.");
    //return new Response(JSON.stringify({ status: 400 }));
  }
}
