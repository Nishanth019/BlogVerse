import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, email, password } = await request.json();

  await connect();

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new NextResponse("User with this email already exists", {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12); // Increase cost factor for stronger security

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return new NextResponse("Registration successful", {
      status: 201,
    });
  } catch (error) {
    console.error("Error during user registration:", error);

    return new NextResponse("An error occurred during registration", {
      status: 500,
    });
  }
};
