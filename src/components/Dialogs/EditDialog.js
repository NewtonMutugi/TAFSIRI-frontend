import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Alert,
  AlertTitle,
  Grid,
  Stack,
  Chip,
  Autocomplete,
  Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const EditDialog = ({
  open,
  handleClose,
  configId,
  refreshConfigs,
  supportedDatabases,
}) => {
  const [formData, setFormData] = useState({
    config_name: '',
    tables: [],
    db_type: '',
    db_host: '',
    db_port: '',
    db_user: '',
    db_password: '',
    db_name: '',
    example_prompt: '',
    om_host: '',
    om_jwt: '',
  });

  const [formErrors, setFormErrors] = useState({
    config_name: false,
    db_type: false,
    db_host: false,
    db_port: false,
    db_user: false,
    db_password: false,
    db_name: false,
    example_prompt: false,
    om_host: false,
    om_jwt: false,
  });

  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  // Fetch the current configuration data when the dialog opens
  useEffect(() => {
    if (open && configId) {
      const fetchConfig = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/config/get_config/${configId}`
          );
          const data = response.data;
          setFormData({
            config_name: data.config_name || '',
            tables: data.tables || [],
            db_type: data.db_type || '',
            db_host: data.db_host || '',
            db_port: data.db_port || '',
            db_user: data.db_user || '',
            db_password: data.db_password || '',
            db_name: data.db_name || '',
            example_prompt: data.example_prompt || '',
            om_host: data.om_host || '',
            om_jwt: data.om_jwt || '',
          });
          setAlertType(null);
          setAlertMessage('');
        } catch (error) {
          console.error('Error fetching configuration:', error);
          setAlertType('error');
          setAlertMessage('Failed to fetch configuration details.');
        }
      };

      fetchConfig();
    }
  }, [open, configId]);

  // Validate required fields
  const handleValidation = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    if (!formData.config_name.trim()) {
      newErrors.config_name = true;
      valid = false;
    }
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
    if (!formData.example_prompt.trim()) {
      newErrors.example_prompt = true;
      valid = false;
    }
    if (!formData.om_host.trim()) {
      newErrors.om_host = true;
      valid = false;
    }
    if (!formData.om_jwt.trim()) {
      newErrors.om_jwt = true;
      valid = false;
    }
    if (!formData.tables.length) {
      setAlertType('error');
      setAlertMessage('At least one table is required.');
      valid = false;
    } else {
      setAlertType(null);
      setAlertMessage('');
    }

    setFormErrors(newErrors);
    return valid;
  };

  // Handle form submission to update the configuration
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!handleValidation()) {
      return;
    }
    setLoading(true);

    const configData = {
      config_name: formData.config_name,
      tables: formData.tables,
      db_type: formData.db_type,
      db_host: formData.db_host,
      db_port: parseInt(formData.db_port, 10),
      db_user: formData.db_user,
      db_password: formData.db_password,
      db_name: formData.db_name,
      example_prompt: formData.example_prompt,
      om_host: formData.om_host,
      om_jwt: formData.om_jwt,
      updated_at: new Date().toISOString(),
    };

    try {
      await axios.put(
        `${API_URL}/config/update_config/${configId}`,
        configData
      );
      setAlertType('success');
      setAlertMessage('Configuration updated successfully!');
      refreshConfigs(); // Refresh the configurations list
      handleClose(); // Close the dialog
    } catch (error) {
      console.error('Error updating configuration:', error);
      setAlertType('error');
      setAlertMessage(
        error.response?.data?.detail ||
          'An error occurred while updating the configuration.'
      );
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
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
    if (alertType) {
      setAlertType(null);
      setAlertMessage('');
    }
  };

  // Handle adding a table
  const handleAddTable = () => {
    const newTable = formData.tableName?.trim();
    if (newTable && !formData.tables.includes(newTable)) {
      setFormData((prevData) => ({
        ...prevData,
        tables: [...prevData.tables, newTable],
        tableName: '',
      }));
    }
  };

  // Handle removing a table
  const handleRemoveTable = (tableToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      tables: prevData.tables.filter((table) => table !== tableToRemove),
    }));
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

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Configuration</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Modify the configuration details below and save the changes.
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={2}>
            {/* Configuration Name */}
            <Grid item xs={12}>
              <TextField
                label="Configuration Name"
                variant="outlined"
                name="config_name"
                value={formData.config_name}
                onChange={handleChange}
                error={formErrors.config_name}
                helperText={
                  formErrors.config_name && 'Configuration name is required.'
                }
                required
                fullWidth
              />
            </Grid>

            {/* Database Type */}
            <Grid item xs={12}>
              <Autocomplete
                id="db-select"
                options={supportedDatabases.filter(
                  (option) => !option.disabled
                )}
                autoHighlight
                size="small"
                getOptionLabel={(option) => option.title}
                onChange={handleAutocompleteChange}
                renderOption={(props, option) => (
                  <Box component="li" {...props} key={option.driver}>
                    {option.url && (
                      <img
                        loading="lazy"
                        width="20"
                        src={option.url}
                        alt=""
                        style={{ marginRight: 8 }}
                      />
                    )}
                    {option.title}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Database Service"
                    variant="outlined"
                    error={formErrors.db_type}
                    helperText={
                      formErrors.db_type && 'Database type is required'
                    }
                  />
                )}
              />
            </Grid>

            {/* Host and Port */}
            <Grid item xs={6}>
              <TextField
                label="Host"
                variant="outlined"
                name="db_host"
                value={formData.db_host}
                onChange={handleChange}
                error={formErrors.db_host}
                helperText={formErrors.db_host && 'Host is required.'}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Port"
                variant="outlined"
                name="db_port"
                type="number"
                value={formData.db_port}
                onChange={handleChange}
                error={formErrors.db_port}
                helperText={formErrors.db_port && 'Valid port is required.'}
                required
                fullWidth
              />
            </Grid>

            {/* Username and Password */}
            <Grid item xs={6}>
              <TextField
                label="DB Username"
                variant="outlined"
                name="db_user"
                value={formData.db_user}
                onChange={handleChange}
                error={formErrors.db_user}
                helperText={formErrors.db_user && 'Username is required.'}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="DB Password"
                variant="outlined"
                name="db_password"
                type="password"
                value={formData.db_password}
                onChange={handleChange}
                error={formErrors.db_password}
                helperText={formErrors.db_password && 'Password is required.'}
                required
                fullWidth
              />
            </Grid>

            {/* Database Name */}
            <Grid item xs={12}>
              <TextField
                label="Database Name"
                variant="outlined"
                name="db_name"
                value={formData.db_name}
                onChange={handleChange}
                error={formErrors.db_name}
                helperText={formErrors.db_name && 'Database name is required.'}
                required
                fullWidth
              />
            </Grid>

            {/* Example Prompt */}
            <Grid item xs={12}>
              <TextField
                label="Example Prompt"
                variant="outlined"
                name="example_prompt"
                value={formData.example_prompt}
                onChange={handleChange}
                error={formErrors.example_prompt}
                helperText={
                  formErrors.example_prompt && 'Example prompt is required.'
                }
                required
                multiline
                rows={4}
                fullWidth
              />
            </Grid>

            {/* OpenMetadata Host and JWT */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="OpenMetadata Host"
                variant="outlined"
                name="om_host"
                value={formData.om_host}
                onChange={handleChange}
                error={formErrors.om_host}
                helperText={
                  formErrors.om_host && 'OpenMetadata Host is required.'
                }
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="OpenMetadata JWT"
                variant="outlined"
                name="om_jwt"
                value={formData.om_jwt}
                onChange={handleChange}
                error={formErrors.om_jwt}
                helperText={
                  formErrors.om_jwt && 'OpenMetadata JWT is required.'
                }
                required
                fullWidth
              />
            </Grid>

            {/* Tables */}
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Tables used for data extraction:
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <TextField
                  label="Table Name"
                  variant="outlined"
                  name="tableName"
                  value={formData.tableName || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, tableName: e.target.value })
                  }
                  error={formErrors.tables}
                  helperText={
                    formErrors.tables && 'At least one table is required.'
                  }
                />
                <Button variant="contained" onClick={handleAddTable}>
                  Add Table
                </Button>
              </Stack>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {formData.tables.map((table, index) => (
                  <Chip
                    key={index}
                    label={table}
                    onDelete={() => handleRemoveTable(table)}
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>

          {/* Alert Messages */}
          {alertType && (
            <Alert severity={alertType} sx={{ mt: 2 }}>
              <AlertTitle>
                {alertType === 'error' ? 'Error' : 'Success'}
              </AlertTitle>
              {alertMessage}
            </Alert>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  configId: PropTypes.string.isRequired,
  refreshConfigs: PropTypes.func.isRequired,
};

export default EditDialog;
