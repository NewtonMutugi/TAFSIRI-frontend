  import { useState } from 'react';
  import {
    Box,
    TextField,
    Typography,
    Button,
    CircularProgress,
    Alert,
    AlertTitle,
    Divider,
  } from '@mui/material';

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const SaveConfig = ({ connString, onFinish }) => {
    const [formData, setFormData] = useState({
      connectionName: '',
      systemName: '',
      systemVersion: '',
    });
    const [loading, setLoading] = useState(false);
    const [alertType, setAlertType] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [loader, setLoader] = useState(false);

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);

      const connectionData = {
        conn_string: connString,
        name: formData.connectionName,
        system: formData.systemName,
        version: formData.systemVersion,
      };

      try {
        const response = await fetch(`${API_URL}/db_access/add_connection`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(connectionData),
        });
        const responseData = await response.json();
        if (!response.ok) {
          setAlertType('error');
          setAlertMessage(`Database connection failed! ${responseData.detail}`);
          setLoader(false);
        } else {
          setAlertType('success');
          setAlertMessage(responseData?.message);
          setLoader(false);
        }

        onFinish();
      } catch (error) {
        setAlertType('error');
        console.error('Error testing connection:', JSON.stringify(error));
        setAlertMessage(error.detail);
        setLoader(false);
      } finally {
        setLoading(false);
      }
    };

    return (
      <Box>
        <Typography variant="h5">Step 3: Prompt and Config name</Typography>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="flex flex-col"
        >
          <Typography variant="body2" color="textSecondary">
            Provide the example prompt that Tafsiri will use to generate the SQL
            query. This should contain examples from your system and specifics
            that my not be defined in the Data dictionary
          </Typography>
          <TextField
            id="filled-multiline-static"
            label="Example prompt"
            multiline
            rows={4}
            defaultValue="Default Value"
            variant="filled"
            value={formData.systemName}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            maxRows={5}
          />
          <TextField
            label="Configuration Name"
            variant="outlined"
            name={'connectionName'}
            value={formData.connectionName}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loader ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </Box>
        </form>
        {/* Alert for success */}
        {alertType === 'success' && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            <Typography variant="body1">{alertMessage}</Typography>
          </Alert>
        )}

        {/* Alert for error */}
        {alertType === 'error' && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <Typography variant="body1">{alertMessage}</Typography>
          </Alert>
        )}
      </Box>
    );
  };

  export default SaveConfig;
