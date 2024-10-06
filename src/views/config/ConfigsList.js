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
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import DeleteDialog from '../../components/Dialogs/DeleteDialog';
import axios from 'axios';

// Define the table headers
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

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedConfigId, setSelectedConfigId] = useState(null);

  const navigate = useNavigate();

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
  const handleClickOpen = (configId) => {
    setSelectedConfigId(configId);
    setDialogOpen(true);
  };

  // Handle closing the delete confirmation dialog
  const handleClose = () => {
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
      handleClose();
      alert('Configuration deleted successfully.');
    } catch (err) {
      console.error('Error deleting configuration:', err);
      alert('Failed to delete configuration. Please try again.');
    }
  };

  // Handle editing a configuration
  const handleEdit = (configId) => {
    navigate(`/config/edit/${configId}`);
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
                    key={config._id} // Use _id instead of id
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      <Link
                        color="secondary"
                        component={RouterLink}
                        to={`/config/details/${config._id}`} // Use _id
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
                          onClick={() => handleEdit(config._id)} // Use _id
                        >
                          <EditOutlined />
                        </IconButton>
                      </Tooltip>

                      {/* Delete Button */}
                      <Tooltip title="Delete">
                        <IconButton
                          aria-label="Delete"
                          onClick={() => handleClickOpen(config._id)} // Use _id
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
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default ConfigsList;
