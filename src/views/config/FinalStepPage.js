import { Box, Button, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import MainCard from '../../components/MainCard';

const FinalStepPage = () => {
  const navigate = useNavigate();

  // Navigate to the configurations list
  const handleFinish = () => {
    navigate('/config');
  };

  return (
    <React.Fragment>
      <MainCard sx={{ mt: 2 }} content={true} title={`Done`}>
        <Typography sx={{ mt: 2, mb: 1 }}>
          Database Configuration successfully added - You&apos;re now finished
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Stack direction="row" spacing={2}>
            <Button
              variant={`contained`}
              color={`success`}
              onClick={handleFinish}
            >
              Finish
            </Button>
          </Stack>
        </Box>
      </MainCard>
    </React.Fragment>
  );
};

export default FinalStepPage;
