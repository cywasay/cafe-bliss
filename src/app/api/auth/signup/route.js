import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return Response.json({ error: "Email and password are required" }, { status: 400 });
    }

    if (password.length < 6) {
      return Response.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json({ error: "User with this email already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        role: email === "owner@coffee.com" ? "admin" : "user", // Special admin account
      },
    });

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;
    return Response.json({ 
      user: userWithoutPassword,
      message: "Account created successfully" 
    }, { status: 201 });

  } catch (error) {
    console.error("Signup error:", error);
    return Response.json({ error: "Signup failed" }, { status: 500 });
  }
}
