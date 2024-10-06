// DataDictionary.js

import { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';
import PropTypes from 'prop-types';

const DataDictionary = ({ onNextStep, config }) => {
  const [formData, setFormData] = useState({
    om_host: config.om_host || '',
    om_jwt: config.om_jwt || '',
  });
  const [formErrors, setFormErrors] = useState({
    om_host: false,
    om_jwt: false,
  });
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  // Validate required fields
  const handleValidation = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    if (!formData.om_host.trim()) {
      newErrors.om_host = true;
      valid = false;
    }
    if (!formData.om_jwt.trim()) {
      newErrors.om_jwt = true;
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  // Proceed to the next step with collected data
  const handleNext = () => {
    if (handleValidation()) {
      const partialData = {
        om_host: formData.om_host,
        om_jwt: formData.om_jwt,
      };
      onNextStep(partialData);
    } else {
      setAlertType('error');
      setAlertMessage('Please fill in all required fields.');
    }
  };

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  return (
    <Box>
      <Typography variant="h5">Step 2: Data Dictionary</Typography>
      <form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
        className="flex flex-col"
      >
        <Typography variant="body2" color="textSecondary">
          Provide the connection to your OpenMetadata system. This will be used
          for the data dictionary, or metadata repository which Tafsiri will use
          to get a better idea of your database.
        </Typography>
        <TextField
          label="OpenMetadata Connection Host"
          variant="outlined"
          name={'om_host'}
          value={formData.om_host}
          onChange={handleChange}
          error={formErrors.om_host}
          helperText={formErrors.om_host && 'OpenMetadata Host is required'}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="OpenMetadata JWT"
          variant="outlined"
          name={'om_jwt'}
          value={formData.om_jwt}
          onChange={handleChange}
          error={formErrors.om_jwt}
          helperText={formErrors.om_jwt && 'OpenMetadata JWT is required'}
          required
          fullWidth
          margin="normal"
        />
        {/* Navigation Button */}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
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
        </Box>
      </form>
      {/* Alert for error */}
      {alertType === 'error' && (
        <Alert severity="error" sx={{ mt: 2 }}>
          <AlertTitle>Error</AlertTitle>
          <Typography variant="body1">{alertMessage}</Typography>
        </Alert>
      )}
    </Box>
  );
};

DataDictionary.propTypes = {
  onNextStep: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
};

export default DataDictionary;
