import { Button, Grid, Typography, useTheme } from '@mui/material';

const ConfigHeader = ({ handleNewConnectionClick }) => {
  const theme = useTheme();
  const url = window.location.href;

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <>
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
            {url.includes('add') ? (
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
                onClick={handleBackClick}
              >
                Go Back
              </Button>
            ) : (
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
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ConfigHeader;
