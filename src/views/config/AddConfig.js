import { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Typography, useTheme, Grid } from '@mui/material';
import ConnectionDetails from './ConnectionDetails';
import MainCard from '../../components/MainCard';
import SaveConfig from './SaveConfig';
import FinalStepPage from './FinalStepPage';
import ConfigHeader from './ConfigHeader';
import DocumentTitle from '../../utils/DocumentTitles';
import DataDictionary from './DataDictionary';

const steps = ['Connection Details', 'Data Dictionary', 'Save Configuration'];
const titles = ['Connection Details', 'Data Dictionary', 'Save Configuration'];

const AddConfigs = () => {
  DocumentTitle('Add Config');
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const theme = useTheme();

  // Initialize the configuration state
  const [config, setConfig] = useState({ config_name: '', tables: [], db_type: '', db_host: '', db_port: 0, db_user: '', db_password: '', db_name: '', example_prompt: '', om_host: '', om_jwt: '',
  });
  // Navigate to the next step
  const handleNext = () => {
    let newSkipped = skipped;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  // Navigate to the previous step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Update the config state with partial data from each step
  const handleNextStep = (partialData) => {
    setConfig((prevConfig) => ({ ...prevConfig, ...partialData }));
    handleNext();
  };

  // Finalize the configuration and navigate to the final step
  const handleFinish = () => {
    setActiveStep(steps.length);
  };

  return (
    <Box
      sx={{ width: '100%', mt: 4, display: 'flex', justifyContent: 'center' }}
      className="dark:bg-gray-900"
    >
      <Grid container rowSpacing={4.5} columnSpacing={2.75} alignItems="center" justifyContent="center" maxWidth="1200px"
      >
        <ConfigHeader />
        <Box
          sx={{ width: '100%', mt: 4, display: 'flex', justifyContent: 'center', bgcolor: theme.palette.background.default, minHeight: '100vh', py: 4,
          }}
          className="dark:bg-gray-900"
        >
          <Box
            sx={{ width: '100%', maxWidth: '800px', bgcolor: theme.palette.background.paper, p: 4, borderRadius: '16px', boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
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
                  sx={{ p: 3, borderRadius: '12px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)', bgcolor: theme.palette.background.paper}}
                  content={true}
                  title={
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 'bold', color: theme.palette.text.primary}}
                    >
                      {titles[activeStep]}
                    </Typography>
                  }
                >
                  {activeStep === 0 && (
                    <ConnectionDetails
                      onNextStep={handleNextStep}
                      config={config}
                    />
                  )}
                  {activeStep === 1 && (
                    <DataDictionary onNextStep={handleNextStep} handleBack={handleBack} config={config}
                    />
                  )}
                  {activeStep === 2 && (
                    <SaveConfig config={config} handleBack={handleBack} onSuccess={handleFinish}
                    />
                  )}
                </MainCard>
              </>
            )}
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default AddConfigs;
