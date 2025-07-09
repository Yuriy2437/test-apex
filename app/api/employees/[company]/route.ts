import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@lib/db';
import { ObjectId } from 'mongodb';

export async function GET(
  req: NextRequest,
  { params }: { params: { company: string } }
) {
  const db = await connectToDatabase();
  const employees = await db.collection(params.company).find().toArray();
  return NextResponse.json({ employees });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { company: string } }
) {
  const db = await connectToDatabase();
  const data = await req.json();
  const result = await db.collection(params.company).insertOne(data);
  return NextResponse.json({ id: result.insertedId });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { company: string } }
) {
  const db = await connectToDatabase();
  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ success: false });
  await db.collection(params.company).deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: true });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { company: string } }
) {
  const db = await connectToDatabase();
  const employees = await req.json();
  await db.collection(params.company).deleteMany({});
  if (employees.length > 0) {
    await db.collection(params.company).insertMany(
      employees.map((e: any) => {
        const { _id, ...rest } = e;
        return rest;
      })
    );
  }
  return NextResponse.json({ success: true });
}
