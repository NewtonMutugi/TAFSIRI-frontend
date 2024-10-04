import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Typography, Paper, useTheme } from '@mui/material';
import ConfigsList from './ConfigsList';

const Configs = () => {
  const navigate = useNavigate();
  const theme = useTheme(); // Material-UI theme

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
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography
                variant="h4"
                sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}
              >
                Tafsiri Configurations
              </Typography>
              <Typography variant="body2" color={theme.palette.text.secondary}>
                Manage and add new configurations for Tafsiri.
              </Typography>
            </Grid>
            <Grid item>
              <Button
                size="medium"
                variant="contained"
                sx={{
                  textTransform: 'capitalize',
                  px: 3,
                  py: 1,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                }}
                onClick={handleNewConnectionClick}
              >
                Add Database Configuration
              </Button>
            </Grid>
          </Grid>
        </Grid>

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
