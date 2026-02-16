import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminPanel from '@/components/AdminPanel';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('admin_auth');

  if (!auth) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminPanel />
    </div>
  );
}
