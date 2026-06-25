import Container from '@mui/material/Container';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminLoginForm from '@/components/AdminLoginForm';
import { ADMIN_SESSION_COOKIE_NAME, getAdminToken } from '@/lib/cms/auth';

export default async function LoginPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  const adminToken = getAdminToken();

  if (adminToken && sessionToken === adminToken) {
    redirect('/admin');
  }

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 8, md: 14 } }}>
      <AdminLoginForm />
    </Container>
  );
}