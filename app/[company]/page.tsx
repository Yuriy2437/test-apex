'use client';
import { useSession } from 'next-auth/react';
import AdminHeader from '../components/AdminHeader';
import EmployeeTable from '../components/EmployeeTable';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CompanyAdminPage({
  params,
}: {
  params: { company: string };
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
    if (session?.user?.company !== params.company) {
      router.push('/');
    }
  }, [status, session, params.company, router]);

  if (status === 'loading') {
    return (
      <div
        style={{ color: '#FFD700', fontWeight: 'bold', textAlign: 'center' }}
      >
        Загрузка...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#014421', padding: '0' }}>
      <AdminHeader company={params.company} />
      <EmployeeTable company={params.company} />
    </div>
  );
}
