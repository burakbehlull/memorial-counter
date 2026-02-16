import { Suspense } from 'react';
import ClientGrid from '@/components/ClientGrid';
import connectToDatabase from '@/lib/db';
import PersonModel from '@/models/Person';
import { Person } from '@/types';

// Force dynamic rendering to ensure fresh data on each request
export const dynamic = 'force-dynamic';

async function getPeople(year: string): Promise<Person[]> {
  await connectToDatabase();
  const start = new Date(`${year}-01-01`);
  const end = new Date(`${year}-12-31T23:59:59.999Z`);
  
  const people = await PersonModel.find({ date: { $gte: start, $lte: end } })
    .sort({ date: -1 })
    .lean();
    
  // Serialize for client component
  return people.map((p: any) => ({
    _id: p._id.toString(),
    name: p.name,
    date: p.date.toISOString(),
    description: p.description,
    details: p.details,
    photoUrl: p.photoUrl,
    createdAt: p.createdAt?.toISOString(),
  }));
}

// Update type definition
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const yearParam = searchParams.year;
  const year = typeof yearParam === 'string' ? yearParam : new Date().getFullYear().toString();
  
  let people: Person[] = [];
  try {
    people = await getPeople(year);
  } catch (error) {
    console.error("Failed to fetch people:", error);
    // You could return an error UI here or just empty list
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-32 flex flex-col items-center min-h-[80vh]">
       <ClientGrid initialPeople={people} year={year} />
    </div>
  );
}
