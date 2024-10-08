import { useState} from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import PropTypes from 'prop-types';

export default function ConfigListMenu({
  setSelectedIndex,
  options,
  selectedIndex,
  onSelect,
  error,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
