import { useState } from 'react';
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Chip,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ConnectionDetails = ({ onNextStep }) => {
  const [formData, setFormData] = useState({
    host_port: '',
    username: '',
    password: '',
    database: '',
    db_type: '',
    tables: [''],
  });
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [testLoader, setTestLoader] = useState(false);
  const [formErrors, setFormErrors] = useState({
    host_port: false,
    username: false,
    password: false,
    database: false,
    db_type: false,
    tables: false,
  });
  const [tables, setTables] = useState([]);

  const handleValidation = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    if (!formData.host_port.trim()) {
      newErrors.host_port = true;
      valid = false;
    }
    if (!formData.username.trim()) {
      newErrors.username = true;
      valid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = true;
      valid = false;
    }
    if (!formData.database.trim()) {
      newErrors.database = true;
      valid = false;
    }
    if (!formData.db_type.trim()) {
      newErrors.db_type = true;
      valid = false;
    }
    if (
      !formData.tables.length ||
      formData.tables.some((table) => !table.trim())
    ) {
      newErrors.tables = true;
      valid = false;
    } else {
      newErrors.tables = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleClick = () => {
    if (handleValidation()) {
      let conn_str = `${formData.db_type}://${formData.username}:${formData.password}@${formData.host_port}/${formData.database}`;
      onNextStep(conn_str);
    }
  };

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleConnectionTest = async (event) => {
    if (handleValidation()) {
      setTestLoader(true);
      event.preventDefault();

      const apiRequest = {
        ...formData,
      };

      try {
        const response = await fetch(`${API_URL}/config/test_db_connection`, {
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
        console.error('Error testing connection:', JSON.stringify(error));
        setAlertMessage(error.detail);
        setTestLoader(false);
      }
    }
  };
  const handleAddTable = () => {
    if (formData.tableName.trim()) {
      setTables((prevTables) => [...prevTables, formData.tableName]);
      setFormData((prevData) => ({ ...prevData, tableName: '' })); // Clear input
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, tableName: true }));
    }
  };

  const handleRemoveTable = (tableToRemove) => {
    setTables((prevTables) =>
      prevTables.filter((table) => table !== tableToRemove)
    );
  };

  const images = [
    {
      url: '/data_sources/mysql.png',
      title: 'MySQL',
      driver: 'mysql',
    },
    {
      url: '/data_sources/mssql.png',
      title: 'MSSQL',
      driver: 'mssql+pymssql',
    },
    {
      url: '/data_sources/pgsql.png',
      title: 'Postgres',
      driver: 'postgresql',
    },
    {
      url: '/data_sources/sqlite.png',
      title: 'SQLite',
      driver: 'sqlite',
    },
    {
      url: '/data_sources/mongo.png',
      title: 'Mongo DB',
      driver: 'mongo',
      disabled: true,
    },
    {
      url: '',
      title: 'FHIR',
      driver: 'fhir',
      disabled: true,
    },
    {
      url: '',
      title: 'CSV',
      driver: 'flatfile',
      disabled: true,
    },
    {
      url: '',
      title: 'APIs/Web',
      driver: 'api',
      disabled: true,
    },
    {
      url: '/data_sources/snowflake.png',
      title: 'Snowflake',
      driver: 'snow',
      disabled: true,
    },
  ];

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
            options={images}
            autoHighlight
            size="small"
            getOptionLabel={(option) => option.title}
            onChange={handleAutocompleteChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Database Service"
                variant="outlined"
                error={formErrors.db_type}
                helperText={
                  formErrors.db_type && 'Data source service is required'
                }
              />
            )}
          />
          <TextField
            label="Host and Port"
            name="host_port"
            value={formData.host_port}
            onChange={handleChange}
            error={formErrors.host_port}
            helperText={formErrors.host_port && 'Host and Port are required'}
          />
          <TextField
            label="DB Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={formErrors.username}
            helperText={formErrors.username && 'Username is required'}
          />
          <TextField
            label="DB Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            helperText={formErrors.password && 'Password is required'}
          />
          <TextField
            label="Database"
            name="database"
            value={formData.database}
            onChange={handleChange}
            error={formErrors.database}
            helperText={formErrors.database && 'Database is required'}
          />

          {/* Table Name Input */}
          <Typography variant="body2" color="textSecondary">
            Provide the tables which Tafsiri should use for data extraction
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              label="Table Name"
              name="tableName"
              value={formData.tableName}
              onChange={handleChange}
              error={formErrors.tableName}
              helperText={formErrors.tableName && 'Please enter a table name'}
            />
            <Button variant="contained" onClick={handleAddTable}>
              Add Table
            </Button>
          </Stack>

          {/* Display Added Tables as Chips */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {tables.map((table, index) => (
              <Chip
                key={index}
                label={table}
                onDelete={() => handleRemoveTable(table)}
                deleteIcon={<DeleteIcon />}
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
            {/* <Button variant="contained" color="primary" onClick={handleClick}>
              Save
            </Button> */}
            <Button type={'reset'} variant="contained" color="error">
              Cancel
            </Button>
          </Stack>
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

export default ConnectionDetails;
