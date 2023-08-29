import { NextRequest, NextResponse } from 'next/server';
import {connect} from '@/db/dbConnection';
import Todo from '@/models/todoModel';

export async function PUT(req: NextRequest) {

  try {
    await connect();

    const { _id, title, description, completed } = await req.json()

    if (!_id || !title || !description) {
      return NextResponse.json({ message: 'Id, title, and description are required' },{status:400});
    }

    const updatedTodo = await Todo.findByIdAndUpdate(_id, {
      title,
      description,
      completed,
    }, { new: true });

    if (!updatedTodo) {
      return NextResponse.json({ message: 'Todo not found' },{status:404});
    }

    return NextResponse.json({ message: 'Todo updated successfully', todo: updatedTodo },{status:200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' },{status:500});
  }
}
