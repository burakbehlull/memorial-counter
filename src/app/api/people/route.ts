import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Person from '@/models/Person';

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const year = searchParams.get('year');

  let query = {};
  if (year) {
    const start = new Date(`${year}-01-01`);
    const end = new Date(`${year}-12-31T23:59:59.999Z`);
    query = { date: { $gte: start, $lte: end } };
  }

  try {
    const people = await Person.find(query).sort({ date: -1 });
    return NextResponse.json(people);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  try {
    const body = await req.json();
    const { name, date, description, details, photoUrl } = body;

    // Simple validation
    if (!name || !date) {
      return NextResponse.json({ error: 'Name and date are required' }, { status: 400 });
    }

    const person = await Person.create({
      name,
      date: new Date(date),
      description,
      details,
      photoUrl,
    });

    return NextResponse.json(person, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create entry' }, { status: 500 });
  }
}
