// Configs.js

import { useNavigate } from 'react-router-dom';
import { Box, Grid, Paper, useTheme } from '@mui/material';
import ConfigsList from './ConfigsList';
import ConfigHeader from './ConfigHeader';
import DocumentTitle from '../../utils/DocumentTitles';

const Configs = () => {
  DocumentTitle('All Configs');
  const navigate = useNavigate();
  const theme = useTheme();

  // Navigate to the Add Configurations page
  const handleNewConnectionClick = () => {
    navigate('/config/add');
  };

  return (
    <Box
      sx={{ width: '100%', mt: 4, display: 'flex', justifyContent: 'center' }}
      className="dark:bg-gray-900"
    >
      <Grid
        container
        rowSpacing={4.5}
        columnSpacing={2.75}
        alignItems="center"
        justifyContent="center"
        maxWidth="1200px"
      >
        {/* Title and Button */}
        <ConfigHeader handleNewConnectionClick={handleNewConnectionClick} />
        {/* Elevated Container for Configurations List */}
        <Grid item xs={12}>
          <Paper
            elevation={4}
            sx={{
              mt: 2,
              p: 4,
              borderRadius: '12px',
              boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.05)',
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <ConfigsList />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Configs;
