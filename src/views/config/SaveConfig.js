// SaveConfig.js

import { useState } from 'react';
import { Alert, AlertTitle, Box, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const SaveConfig = ({ config, onSuccess }) => {
  const [formData, setFormData] = useState({
    config_name: config.config_name || '',
    example_prompt: config.example_prompt || '',
  });
  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  // Validate required fields
  const handleValidation = () => {
    let valid = true;
    if (!formData.config_name.trim() || !formData.example_prompt.trim()) {
      setAlertType('error');
      setAlertMessage('Please fill in all required fields.');
      valid = false;
    }
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!handleValidation()) {
      return;
    }
    setLoading(true);

    // Prepare the config data as per TafsiriConfigSchema
    const configData = {
      config_name: formData.config_name,
      example_prompt: formData.example_prompt,
      ...config,
    };

    try {
      const response = await fetch(`${API_URL}/config/new_config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(configData),
      });
      const responseData = await response.json();
      if (!response.ok) {
        setAlertType('error');
        setAlertMessage(`Failed to create config: ${responseData.detail}`);
      } else {
        setAlertType('success');
        setAlertMessage('Configuration created successfully!');
        // Inform the parent component to proceed to the final step
        onSuccess();
      }
    } catch (error) {
      setAlertType('error');
      console.error('Error creating config:', error);
      setAlertMessage('An error occurred while creating the configuration.');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (alertType) {
      setAlertType(null);
      setAlertMessage('');
    }
  };

  return (
    <Box>
      <Typography variant="h5">Step 3: Prompt and Config Name</Typography>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex flex-col"
      >
        <Typography variant="body2" color="textSecondary">
          Provide the example prompt that Tafsiri will use to generate the SQL
          query. This should contain examples from your system and specifics
          that may not be defined in the Data Dictionary.
        </Typography>
        <TextField
          label="Example Prompt"
          multiline
          rows={4}
          variant="outlined"
          name={'example_prompt'}
          value={formData.example_prompt}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Configuration Name"
          variant="outlined"
          name={'config_name'}
          value={formData.config_name}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        {/* Form Actions */}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={loading}
            disabled={loading}
            sx={{
              textTransform: 'capitalize',
              px: 3,
              py: 1,
              borderRadius: '8px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          >
            Submit
          </LoadingButton>
        </Box>
      </form>
      {/* Alert for success */}
      {alertType === 'success' && (
        <Alert severity="success" sx={{ mt: 2 }}>
          <AlertTitle>Success</AlertTitle>
          <Typography variant="body1">{alertMessage}</Typography>
        </Alert>
      )}

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

SaveConfig.propTypes = {
  config: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default SaveConfig;
