import { NextResponse, NextRequest } from "next/server";
import Todo from "@/model/todoModel";
import { connectDB } from "@/config/db";
// interface ITodo {
//   readonly _id: string;
//   todo: string;
//   isCompleted: boolean;
//   isUpdated?: boolean;
// }
export async function GET(): Promise<NextResponse> {
  await connectDB();
  try {
    const allTodos= await Todo.find();

    return NextResponse.json({
      message: "Hello World",
      allTodos,
    });
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json({ message: "Error" });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  await connectDB();
  try {
    const body = await request.json();
    const newTodo = await Todo.create(body);

    return NextResponse.json({
      message: "Todo created successfully",
      newTodo,
    });
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json({ message: "Error" });
  }
}
export async function PUT(request: NextRequest): Promise<NextResponse> {
  await connectDB();
  try {
    const body = await request.json();
    const todoInDB = await Todo.findById(body._id);
    todoInDB.todo = body.todo;
    todoInDB.isCompleted = body.isCompleted;
    todoInDB.isUpdated = body.isUpdated;
    const updatedTodo = await todoInDB.save();
    return NextResponse.json({
      message: "Todo created successfully",
      updatedTodo,
    });
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json({ message: "Error" });
  }
}
export async function DELETE(request: NextRequest): Promise<NextResponse> {
  await connectDB();
  try {
    const body = await request.json();
    await Todo.findByIdAndDelete(body._id);

    return NextResponse.json(
      {
        message: "Todo deleted successfully",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json({ message: "Error" });
  }
}
