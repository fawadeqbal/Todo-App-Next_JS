import {connect} from '@/db/dbConnection';
import Todo from '@/models/todoModel';
import { NextRequest,NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connect();

    const { title, description } = await req.json();
    console.log(title+description)

    if (!title || !description) {
      return NextResponse.json({ message: 'Title and description are required' },{status:400});
    }

    const newTodo = new Todo({
      title,
      description,
    });

    await newTodo.save();

    return NextResponse.json({ message: 'Todo created successfully', todo: newTodo },{status:201});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' },{status:500});
  }
}
