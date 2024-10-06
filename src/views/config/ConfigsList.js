// src/pages/config/ConfigsList.js

import { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  CircularProgress,
  Alert,
  AlertTitle,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import DeleteDialog from '../../components/Dialogs/DeleteDialog';
import EditDialog from '../../components/Dialogs/EditDialog';
import axios from 'axios';
import supportedDatabases from './supportedDatabases';

// Table headers
const headCells = [
  {
    id: 'config_name',
    align: 'left',
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'db_type',
    align: 'left',
    disablePadding: false,
    label: 'Database Type',
  },
  {
    id: 'is_active',
    align: 'left',
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'updated_at',
    align: 'right',
    disablePadding: false,
    label: 'Date Updated',
  },
  {
    id: 'actions',
    align: 'right',
    disablePadding: false,
    label: '',
  },
];

// Component to display the status
const OrderStatus = ({ status }) => {
  let title;

  switch (status) {
    case true:
      title = 'Active';
      break;
    case false:
      title = 'Inactive';
      break;
    default:
      title = 'Unknown';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.bool,
};

// Main ConfigsList component
const ConfigsList = () => {
  const [configs, setConfigs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Delete Dialog State
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedConfigId, setSelectedConfigId] = useState(null);

  // Edit Dialog State
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editConfigId, setEditConfigId] = useState(null);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  // Fetch configurations from the backend
  const fetchConfigs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/config/get_configs`);
      setConfigs(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching configurations:', err);
      setError('Failed to fetch configurations.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle opening the delete confirmation dialog
  const handleDeleteClickOpen = (configId) => {
    setSelectedConfigId(configId);
    setDialogOpen(true);
  };

  // Handle closing the delete confirmation dialog
  const handleDeleteClose = () => {
    setDialogOpen(false);
    setSelectedConfigId(null);
  };

  // Handle deleting a configuration
  const handleDelete = async () => {
    if (!selectedConfigId) return;

    try {
      await axios.delete(`${API_URL}/config/delete_config/${selectedConfigId}`);
      // Refresh the configurations list after deletion
      fetchConfigs();
      handleDeleteClose();
    } catch (err) {
      console.error('Error deleting configuration:', err);
      setError('Failed to delete configuration. Please try again.');
      handleDeleteClose();
    }
  };

  // Handle opening the edit dialog
  const handleEditClickOpen = (configId) => {
    setEditConfigId(configId);
    setEditDialogOpen(true);
  };

  // Handle closing the edit dialog
  const handleEditClose = () => {
    setEditDialogOpen(false);
    setEditConfigId(null);
  };

  return (
    <Box>
      {/* Display loading spinner */}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Display error message */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}

      {/* Display configurations table */}
      {!isLoading && !error && (
        <TableContainer
          sx={{
            width: '100%',
            overflowX: 'auto',
            position: 'relative',
            display: 'block',
            maxWidth: '100%',
            '& td, & th': { whiteSpace: 'nowrap' },
          }}
        >
          <Table
            aria-labelledby="tableTitle"
            sx={{
              '& .MuiTableCell-root:first-of-type': {
                pl: 2,
              },
              '& .MuiTableCell-root:last-of-type': {
                pr: 3,
              },
            }}
          >
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.align}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {configs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No configurations found.
                  </TableCell>
                </TableRow>
              ) : (
                configs.map((config) => (
                  <TableRow
                    hover
                    key={config._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      <Link
                        color="secondary"
                        component={RouterLink}
                        to={`/config/details/${config._id}`}
                        underline="hover"
                      >
                        {config.config_name || 'Unnamed Config'}
                      </Link>
                    </TableCell>
                    <TableCell align="left">
                      {config.db_type || 'N/A'}
                    </TableCell>
                    <TableCell align="left">
                      <OrderStatus status={config.is_active} />
                    </TableCell>
                    <TableCell align="right">
                      {config.updated_at
                        ? new Date(config.updated_at).toLocaleDateString()
                        : 'N/A'}
                    </TableCell>
                    <TableCell align="right">
                      {/* Edit Button */}
                      <Tooltip title="Edit">
                        <IconButton
                          aria-label="Edit"
                          onClick={() => handleEditClickOpen(config._id)}
                        >
                          <EditOutlined />
                        </IconButton>
                      </Tooltip>

                      {/* Delete Button */}
                      <Tooltip title="Delete">
                        <IconButton
                          aria-label="Delete"
                          onClick={() => handleDeleteClickOpen(config._id)}
                        >
                          <DeleteOutlined />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        text="Configuration"
        open={dialogOpen}
        handleClose={handleDeleteClose}
        handleDelete={handleDelete}
      />

      {/* Edit Dialog */}
      <EditDialog
        open={editDialogOpen}
        handleClose={handleEditClose}
        configId={editConfigId}
        refreshConfigs={fetchConfigs}
        supportedDatabases={supportedDatabases}
      />
    </Box>
  );
};

export default ConfigsList;
