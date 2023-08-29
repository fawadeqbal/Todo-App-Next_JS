import { NextRequest, NextResponse } from 'next/server';
import {connect} from '@/db/dbConnection';
import Todo from '@/models/todoModel';

export async function DELETE(req: NextRequest) {
 
  try {
    await connect();

    const { _id } = await req.json();

    if (!_id) {
      return NextResponse.json({ message: 'Id is required' },{status:400});
    }

    const deletedTodo = await Todo.findByIdAndDelete(_id);

    if (!deletedTodo) {
      return NextResponse.json({ message: 'Todo not found' },{status:404});
    }

    return NextResponse.json({ message: 'Todo deleted successfully' },{status:200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' },{status:500});
  }
}
