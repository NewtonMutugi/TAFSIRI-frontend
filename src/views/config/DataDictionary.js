import { Box, TextField, Typography } from '@mui/material';

const DataDictionary = () => {
  return (
    <Box>
      <Typography variant="h5">Step 2: Data Dictionary</Typography>
      <form
        // onSubmit={handleSubmit}
        autoComplete="off"
        className="flex flex-col"
      >
        <Typography variant="body2" color="textSecondary">
          Provide the connection to your OpenMetadata system. This will be used
          for the data dictionary, or metadata repository which Tafsiri will use
          to get a better idea of your database
        </Typography>
        <TextField
          label="OpenMetadata Connection Host"
          variant="outlined"
          name={'connectionName'}
          // value={formData.om_host}
          // onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="OpenMetadata JWT"
          variant="outlined"
          name={'connectionName'}
          // value={formData.om_jwt}
          // onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
      </form>
    </Box>
  );
};

export default DataDictionary;
