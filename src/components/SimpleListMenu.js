import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function ConfigListMenu({ onSelect }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const open = Boolean(anchorEl);
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  // Fetch the configurations when the component mounts
  useEffect(() => {
    const fetchConfigurations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/config/get_configs`);
        if (response.status === 200) {
          setOptions(response.data);
          if (response.data.length > 0) {
            setSelectedIndex(0);
            if (onSelect) {
              onSelect(response.data[0]._id);
            }
          }
        } else {
          setError('Failed to fetch configurations.');
          console.error('Error fetching configurations:', response.statusText);
        }
      } catch (error) {
        setError('An error occurred while fetching configurations.');
        console.error('Error fetching configurations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfigurations();
  }, [API_URL, onSelect]);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    if (onSelect) {
      onSelect(options[index]._id);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List
        component="nav"
        aria-label="Configuration settings"
        sx={{ bgcolor: 'background.paper' }}
      >
        <ListItemButton
          id="config-button"
          aria-haspopup="listbox"
          aria-controls="config-menu"
          aria-label="currently selected configuration"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            primary="Currently running config"
            secondary={
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'limegreen',
                    borderRadius: '50%',
                    marginRight: '8px',
                  }}
                />
                {options.length > 0
                  ? options[selectedIndex]?.config_name || 'Unnamed Config'
                  : 'Loading...'}
              </span>
            }
          />
        </ListItemButton>
      </List>
      <Menu
        id="config-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'config-button',
          role: 'listbox',
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option._id || index}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option.config_name || `Config ${index + 1}`}
          </MenuItem>
        ))}
      </Menu>
      {/* Display loading or error messages if needed */}
      {/* {loading && <p>Loading configurations...</p>} */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

ConfigListMenu.propTypes = {
  onSelect: PropTypes.func,
};
