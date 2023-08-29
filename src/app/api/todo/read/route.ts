
import { NextRequest, NextResponse } from 'next/server';
import {connect} from '@/db/dbConnection';
import Todo from '@/models/todoModel';

export async function GET(req: NextRequest) {
 
  try {
    await connect();

    const todos = await Todo.find({});

    return NextResponse.json(todos,{status:200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' },{status:500});
  }
}
