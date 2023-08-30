import { connect } from '@/db/dbConnection';
import Todo from '@/models/todoModel';
import { NextRequest, NextResponse } from 'next/server';


const getConnection = async () => {
  await connect();
}

getConnection()

export async function POST(req: NextRequest) {

  try {

    const { title, userId } = await req.json();
    console.log(userId)



    if (!title) {
      return NextResponse.json({ message: 'Title is required' }, { status: 400 });
    }

    const newTodo = new Todo({
      title,
      userId: userId
    });

    await newTodo.save();

    return NextResponse.json({ message: 'Todo created successfully', todo: newTodo }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}





export async function PUT(req: NextRequest) {

  try {

    const { _id, title, completed } = await req.json()

    if (!_id || !title) {
      return NextResponse.json({ message: 'Id, title, and description are required' }, { status: 400 });
    }
    const updatedTodo = await Todo.findByIdAndUpdate(_id, {
      title,
      completed,
    }, { new: true });

    if (!updatedTodo) {
      return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Todo updated successfully', todo: updatedTodo }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


