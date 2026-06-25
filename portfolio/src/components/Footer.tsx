import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface FooterProps {
  copyrightName: string;
}

export default function Footer({ copyrightName }: FooterProps) {
  return (
    <Box component="footer" sx={{ py: 3, textAlign: 'center', borderTop: 1, borderColor: 'divider' }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} {copyrightName}
      </Typography>
    </Box>
  );
}
