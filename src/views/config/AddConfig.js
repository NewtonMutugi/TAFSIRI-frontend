import { useState } from 'react';
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  useTheme,
  Grid,
} from '@mui/material';
import ConnectionDetails from './ConnectionDetails';
import MainCard from '../../components/MainCard';
import SaveConfig from './SaveConfig';
import FinalStepPage from './FinalStepPage';
import ConfigHeader from './ConfigHeader';

const steps = ['Connection Details', 'Save Configuration'];
const titles = ['Connection Details', 'Save Configuration'];

const AddConfigs = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [connString, setConnString] = useState('');
  const theme = useTheme();

  const handleNext = () => {
    let newSkipped = skipped;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onNextStep = (driver) => {
    setConnString(driver);
    handleNext();
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
        <ConfigHeader />
        <Box
          sx={{
            width: '100%',
            mt: 4,
            display: 'flex',
            justifyContent: 'center',
            bgcolor: theme.palette.background.default,
            minHeight: '100vh',
            py: 4,
          }}
          className="dark:bg-gray-900"
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '800px',
              bgcolor: theme.palette.background.paper,
              p: 4,
              borderRadius: '16px',
              boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Stepper */}
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel
                    sx={{
                      '& .MuiStepLabel-label': {
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: theme.palette.text.secondary,
                      },
                      '& .Mui-active .MuiStepLabel-label': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Step Content */}
            {activeStep === steps.length ? (
              <FinalStepPage />
            ) : (
              <>
                <MainCard
                  sx={{
                    p: 3,
                    borderRadius: '12px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
                    bgcolor: theme.palette.background.paper,
                  }}
                  content={true}
                  title={
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        color: theme.palette.text.primary,
                      }}
                    >
                      {titles[activeStep]}
                    </Typography>
                  }
                >
                  {activeStep === 0 && (
                    <ConnectionDetails onNextStep={onNextStep} />
                  )}
                  {activeStep === 1 && (
                    <SaveConfig connString={connString} onFinish={handleNext} />
                  )}
                </MainCard>

                {/* Navigation Buttons */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 4,
                  }}
                >
                  <Button
                    variant="contained"
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{
                      textTransform: 'capitalize',
                      px: 3,
                      py: 1,
                      borderRadius: '8px',
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    Back
                  </Button>
                  {activeStep < steps.length - 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      sx={{
                        textTransform: 'capitalize',
                        px: 3,
                        py: 1,
                        borderRadius: '8px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      sx={{
                        textTransform: 'capitalize',
                        px: 3,
                        py: 1,
                        borderRadius: '8px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      Finish
                    </Button>
                  )}
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default AddConfigs;
