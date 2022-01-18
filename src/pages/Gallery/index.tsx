import { Container, Typography } from '@mui/material';

import { Navigation } from 'components/Navigation/Navigation';

export const GalleryPage = () => {
  return (
    <>
      <Navigation />
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Typography>Gallery</Typography>
      </Container>
    </>
  );
};
