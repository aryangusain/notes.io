import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content } = await req.json();

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const id = (await params).id;
    const note = await prisma.note.update({
      where: { id },
      data: { title, content },
    });

    return NextResponse.json({note, message: "Note updated successfully" });
  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = (await params).id;
    const note = await prisma.note.delete({
      where: { id },
    });

    return NextResponse.json({
      note,
      message: "Note deleted successfully",
    });
  } 
  catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
}
