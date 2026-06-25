'use client';

import { FormEvent, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';

export default function AdminLoginForm() {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const body = (await response.json()) as { error?: string };
        throw new Error(body.error ?? 'Login failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (loginError) {
      const message = loginError instanceof Error ? loginError.message : 'Login failed';
      setError(message);
      setStatus('error');
    }
  };

  return (
    <Paper sx={{ p: { xs: 3, md: 4 } }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="overline" color="primary" letterSpacing={3}>
            Admin Access
          </Typography>
          <Typography variant="h4" fontWeight={700}>
            Sign in to CMS
          </Typography>
        </Box>

        <Typography color="text.secondary">
          Enter your admin password to manage portfolio content.
        </Typography>

        {error ? <Alert severity="error">{error}</Alert> : null}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Admin Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              fullWidth
            />
            <Button type="submit" variant="contained" size="large" disabled={status === 'loading'}>
              {status === 'loading' ? 'Signing in...' : 'Sign In'}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}