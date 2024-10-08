import { useState } from 'react';
import { Alert, AlertTitle, Autocomplete, Box, Button, Stack, TextField, Typography, Chip, Grid,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import supportedDatabases from './supportedDatabases';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ConnectionDetails = ({ onNextStep, config }) => {
  const [formData, setFormData] = useState({ db_type: config.db_type || '', db_host: config.db_host || '', db_port: config.db_port || '', db_user: config.db_user || '', db_password: config.db_password || '', db_name: config.db_name || '', tableName: '',
  });
  const [tables, setTables] = useState(config.tables || []);
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [testLoader, setTestLoader] = useState(false);
  const [formErrors, setFormErrors] = useState({ db_type: false, db_host: false, db_port: false, db_user: false, db_password: false, db_name: false, tableName: false,
  });

  // Validation for required fields
  const handleValidation = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    if (!formData.db_type.trim()) {
      newErrors.db_type = true;
      valid = false;
    }
    if (!formData.db_host.trim()) {
      newErrors.db_host = true;
      valid = false;
    }
    if (!formData.db_port || isNaN(formData.db_port)) {
      newErrors.db_port = true;
      valid = false;
    }
    if (!formData.db_user.trim()) {
      newErrors.db_user = true;
      valid = false;
    }
    if (!formData.db_password.trim()) {
      newErrors.db_password = true;
      valid = false;
    }
    if (!formData.db_name.trim()) {
      newErrors.db_name = true;
      valid = false;
    }
    if (!tables.length) {
      // At least one table required
      valid = false;
      setAlertType('error');
      setAlertMessage('At least one table is required');
    } else {
      setAlertMessage('');
      setAlertType(null);
    }

    setFormErrors(newErrors);
    return valid;
  };

  // Proceed to the next step with collected data
  const handleClick = (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const partialData = {
        db_type: formData.db_type,
        db_host: formData.db_host,
        db_port: parseInt(formData.db_port, 10),
        db_user: formData.db_user,
        db_password: formData.db_password,
        db_name: formData.db_name,
        tables: tables,
      };
      onNextStep(partialData);
    } else {
      setAlertType('error');
      return;
    }
  };

  // Handle changes in the Autocomplete (Database Type)
  const handleAutocompleteChange = (event, newValue) => {
    if (newValue) {
      setFormData((prevData) => ({ ...prevData, db_type: newValue.driver }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        db_type: '',
      }));
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

  // Test the database connection using the backend API
  const handleConnectionTest = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      setTestLoader(true);

      const apiRequest = {
        db_type: formData.db_type,
        host_port: `${formData.db_host}:${formData.db_port}`,
        database: formData.db_name,
        username: formData.db_user,
        password: formData.db_password,
      };

      try {
        const response = await fetch(`${API_URL}/api/config/test_db_connection`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(apiRequest),
        });
        const responseData = await response.json();
        if (!response.ok) {
          setAlertType('error');
          setAlertMessage(`Database connection failed! ${responseData.detail}`);
          setTestLoader(false);
        } else {
          setAlertType('success');
          setAlertMessage(responseData.status);
          setTestLoader(false);
        }
      } catch (error) {
        setAlertType('error');
        console.error('Error testing connection:', error);
        setAlertMessage('An error occurred while testing the connection.');
        setTestLoader(false);
      }
    }
  };

  // Add a table to the tables array
  const handleAddTable = () => {
    if (formData.tableName.trim()) {
      setTables((prevTables) => [...prevTables, formData.tableName.trim()]);
      setFormData((prevData) => ({ ...prevData, tableName: '' }));
      setFormErrors((prevErrors) => ({ ...prevErrors, tableName: false }));
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, tableName: true }));
    }
  };

  // Remove a table from the tables array
  const handleRemoveTable = (tableToRemove) => {
    setTables((prevTables) =>
      prevTables.filter((table) => table !== tableToRemove)
    );
  };

  return (
    <Box>
      {/* Connection Details Form */}
      <Typography variant="h5">Step 1: Database Connection</Typography>
      <form autoComplete="off" onSubmit={handleClick}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Database selection and connection fields */}
          <Typography variant="body2" color="textSecondary">
            Select the database type in use and provide the connection details
          </Typography>
          <Autocomplete
            id="db-select"
            options={supportedDatabases.filter((option) => !option.disabled)}
            autoHighlight
            size="small"
            getOptionLabel={(option) => option.title}
            onChange={handleAutocompleteChange}
            renderOption={(props, option) => (
              <Box component="li" {...props} key={option.driver}>
                {option.url && (
                  <img loading="lazy" width="20" src={option.url} alt="" style={{ marginRight: 8 }}
                  />
                )}
                {option.title}
              </Box>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Database Service" variant="outlined" error={formErrors.db_type} helperText={formErrors.db_type && 'Database type is required'}
              />
            )}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Host"
                name="db_host"
                value={formData.db_host}
                onChange={handleChange}
                error={formErrors.db_host}
                helperText={formErrors.db_host && 'Host is required'}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Port" name="db_port" type="number" value={formData.db_port} onChange={handleChange} error={formErrors.db_port} helperText={formErrors.db_port && 'Valid port is required'} fullWidth
              />
            </Grid>
          </Grid>
          <TextField label="DB Username" name="db_user" value={formData.db_user} onChange={handleChange} error={formErrors.db_user} helperText={formErrors.db_user && 'Username is required'} fullWidth
          />
          <TextField label="DB Password" name="db_password" type="password" value={formData.db_password} onChange={handleChange} error={formErrors.db_password} helperText={formErrors.db_password && 'Password is required'} fullWidth
          />
          <TextField label="Database Name" name="db_name" value={formData.db_name} onChange={handleChange} error={formErrors.db_name} helperText={formErrors.db_name && 'Database name is required'} fullWidth
          />

          {/* Table Name Input */}
          <Typography variant="body2" color="textSecondary">
            Provide the tables which Tafsiri should use for data extraction
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField label="Table Name" name="tableName" value={formData.tableName} onChange={handleChange} error={formErrors.tableName} helperText={formErrors.tableName && 'Please enter a table name'}
            />
            <Button variant="contained" onClick={handleAddTable}>
              Add Table
            </Button>
          </Stack>

          {/* Display Added Tables as Chips */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {tables.map((table, index) => (
              <Chip key={index} label={table} onDelete={() => handleRemoveTable(table)} deleteIcon={<DeleteIcon />}
              />
            ))}
          </Box>
        </Box>

        {/* Connection Test and Form Actions */}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Stack direction="row" spacing={2}>
            <LoadingButton
              loading={testLoader}
              loadingPosition="start"
              variant="contained"
              color="success"
              onClick={handleConnectionTest}
              startIcon={<span />}
            >
              Test Connection
            </LoadingButton>
            <Button type={'reset'} variant="contained" color="error">
              Cancel
            </Button>
          </Stack>
        </Box>
        {/* Navigation Button */}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button type="submit" variant="contained" color="primary" sx={{ textTransform: 'capitalize', px: 3, py: 1, borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', }}
            onClick={handleClick}
          >
            Next
          </Button>
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

ConnectionDetails.propTypes = {
  onNextStep: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
};

export default ConnectionDetails;
