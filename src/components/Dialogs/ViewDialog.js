// src/components/Dialogs/ViewDialog.js

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  AlertTitle,
  Grid,
  Chip,
} from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';

const ViewDialog = ({ configId, open, handleClose, supportedDatabases }) => {
  const [config, setConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (configId && open) {
      // Fetch the individual config when the dialog opens
      const fetchConfig = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${API_URL}/api/config/get_config/${configId}`
          );
          setConfig(response.data);
          setError(null);
        } catch (err) {
          console.error('Error fetching configuration:', err);
          setError('Failed to load configuration.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchConfig();
    }
  }, [API_URL, configId, open]);

  const getDatabaseTitle = (dbType) => {
    return (
      supportedDatabases.find((db) => db.driver === dbType)?.title || 'N/A'
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Configuration Details</DialogTitle>
      <DialogContent dividers>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        ) : config ? (
          <Box>
            <Grid container spacing={2}>
              {/* Config Name */}
              <Grid item xs={12}>
                <Typography variant="h6">
                  Config Name: {config.config_name || 'Unnamed Config'}
                </Typography>
              </Grid>

              {/* Database Details */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Database Type:</Typography>
                <Typography variant="body1">
                  {getDatabaseTitle(config.db_type)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Database Host:</Typography>
                <Typography variant="body1">
                  {config.db_host || 'Host not found'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Database Port:</Typography>
                <Typography variant="body1">
                  {config.db_port || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Database User:</Typography>
                <Typography variant="body1">
                  {config.db_user || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Database Name:</Typography>
                <Typography variant="body1">
                  {config.db_name || 'N/A'}
                </Typography>
              </Grid>

              {/* Tables */}
              <Grid item xs={12}>
                <Typography variant="subtitle1">Tables:</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {config.tables && config.tables.length > 0 ? (
                    config.tables.map((table, index) => (
                      <Chip key={index} label={table} variant="outlined" />
                    ))
                  ) : (
                    <Typography variant="body1">No tables added.</Typography>
                  )}
                </Box>
              </Grid>

              {/* Example Prompt */}
              <Grid item xs={12}>
                <Typography variant="subtitle1">Example Prompt:</Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {config.example_prompt || 'N/A'}
                </Typography>
              </Grid>

              {/* OpenMetadata Details */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">OpenMetadata Host:</Typography>
                <Typography variant="body1">
                  {config.om_host || 'N/A'}
                </Typography>
              </Grid>

              {/* Dates */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Date Created:</Typography>
                <Typography variant="body1">
                  {config.created_at
                    ? new Date(config.created_at).toLocaleString()
                    : 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Date Updated:</Typography>
                <Typography variant="body1">
                  {config.updated_at
                    ? new Date(config.updated_at).toLocaleString()
                    : 'N/A'}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Typography>No configuration found.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ViewDialog.propTypes = {
  configId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  supportedDatabases: PropTypes.array.isRequired,
};

export default ViewDialog;
