import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;
    return Response.json({ 
      user: userWithoutPassword,
      message: "Login successful" 
    });

  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}
