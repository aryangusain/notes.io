import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const notes = await prisma.note.findMany({
      where: { email: session.user.email },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(
      { message: "Notes fetched successfully", notes },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    const { title, content, email } = await req.json();

    if (!title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    const note = await prisma.note.create({
      data: { title, content, email },
    });

    return NextResponse.json(
      { 
        note,
        message: "Note saved successfully",
        status: 201 
      }
    );


  } catch (error) {
    return NextResponse.json(
      { message: "Failed to save note", error: (error as Error).message },
      { status: 500 }
    );
  }
}