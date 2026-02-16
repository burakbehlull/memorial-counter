import { Suspense } from 'react';
import ClientGrid from '@/components/ClientGrid';
import connectToDatabase from '@/lib/db';
import Person from '@/models/Person';

// Force dynamic rendering to ensure fresh data on each request
export const dynamic = 'force-dynamic';

async function getPeople(year: string) {
  await connectToDatabase();
  const start = new Date(`${year}-01-01`);
  const end = new Date(`${year}-12-31T23:59:59.999Z`);
  
  const people = await Person.find({ date: { $gte: start, $lte: end } })
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

export default async function Home(props: {
  searchParams: Promise<{ year?: string }>;
}) {
  const searchParams = await props.searchParams;
  const year = searchParams.year || new Date().getFullYear().toString();
  const people = await getPeople(year);

  return (
    <div className="container mx-auto px-4 py-8 pb-32 flex flex-col items-center min-h-[80vh]">
       <ClientGrid initialPeople={people} year={year} />
    </div>
  );
}
