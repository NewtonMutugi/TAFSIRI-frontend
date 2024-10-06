// Database type options with images and drivers
const supportedDatabases = [
  {
    url: '',
    title: 'MySQL',
    driver: 'mysql',
  },
  {
    url: '',
    title: 'MSSQL',
    driver: 'mssql+pymssql',
  },
  {
    url: '',
    title: 'Postgres',
    driver: 'postgresql',
  },
  {
    url: '',
    title: 'SQLite',
    driver: 'sqlite',
  },
  {
    url: '',
    title: 'Mongo DB',
    driver: 'mongo',
    disabled: false,
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
    url: '',
    title: 'Snowflake',
    driver: 'snow',
    disabled: true,
  },
];

export default supportedDatabases;
