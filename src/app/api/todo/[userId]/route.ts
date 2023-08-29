import { connect } from "@/db/dbConnection";
import { NextResponse, NextRequest } from "next/server";
import Todo from "@/models/todoModel";
connect();
type Props = {
  params: {
    userId: string;
  };
};

export async function GET(req: NextRequest,{ params }: Props) {
  try {
     const {userId} = params;
    
    if (!userId) {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    await connect();

    const todos = await Todo.find({ userId: userId});
    console.log(todos)
    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
  
    const { userId } = params;

    if (!userId) {
      return NextResponse.json({ message: 'Id is required' }, { status: 400 });
    }

    const deletedTodo = await Todo.findByIdAndDelete(userId);

    if (!deletedTodo) {
      return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Todo deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
