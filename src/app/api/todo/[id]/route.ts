import { connect } from "@/db/dbConnection";
import { NextResponse, NextRequest } from "next/server";
import Todo from "@/models/todoModel";
connect();
type Props = {
  params: {
    id: string;
  };
};

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
  

    // Extract the "id" parameter from the "params" object
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: 'Id is required' }, { status: 400 });
    }

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Todo deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
