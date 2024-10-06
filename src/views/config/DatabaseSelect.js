import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

const images = [
  {
    url: '../../assets/mysql.png',
    title: 'MySQL',
    width: '200px',
    driver: 'mysql',
  },
  {
    url: '../../assets/sql-server.png',
    title: 'MSSQL',
    width: '200px',
    driver: 'mssql',
  },
  {
    url: '../../assets/postgres.png',
    title: 'Postgres',
    width: '200px',
    driver: 'pgsql',
  },
  {
    url: '',
    title: 'SQLite',
    width: '200px',
    driver: 'sqlite',
  },
  {
    url: '../../mongodb.png',
    title: 'Mongo DB',
    width: '200px',
    driver: 'mongo',
    disabled: true,
  },
  {
    url: '',
    title: 'FHIR',
    width: '200px',
    driver: 'fhir',
    disabled: true,
  },
  {
    url: '',
    title: 'FlatFiles',
    width: '200px',
    driver: 'flatfile',
    disabled: true,
  },
  {
    url: '',
    title: 'APIs/Web',
    width: '200px',
    driver: 'api',
    disabled: true,
  },
  {
    url: 'https://data.kenyahmis.org:8082/service-icon-snowflakes.png',
    title: 'Snowflake',
    width: '200px',
    driver: 'snow',
    disabled: true,
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const DatabaseSelect = ({ onNextStep }) => {
  const handleClick = (driver) => {
    onNextStep(driver);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
          onClick={() => handleClick(image.driver)}
          disabled={image.disabled}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
  );
};

export default DatabaseSelect;
