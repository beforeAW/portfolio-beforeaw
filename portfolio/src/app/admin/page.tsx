import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CmsAdmin from '@/components/CmsAdmin';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_SESSION_COOKIE_NAME, getAdminToken } from '@/lib/cms/auth';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  const adminToken = getAdminToken();

  if (!adminToken || sessionToken !== adminToken) {
    redirect('/login');
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" color="primary" letterSpacing={3}>
          Private Area
        </Typography>
        <Typography variant="h3" fontWeight={700}>
          Content Management
        </Typography>
      </Box>
      <CmsAdmin />
    </Container>
  );
}