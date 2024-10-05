import { Button, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import DocumentTitle from '../../utils/DocumentTitles';
import { ReactComponent as AiImage } from '../../assets/ai-platform.svg';
import { ReactComponent as DataDict } from '../../assets/data-dict.svg';
import { ReactComponent as Transparency } from '../../assets/transparency.svg';

const LandingPage = () => {
  DocumentTitle('Home');

  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Hero Section */}
      <Container
        maxWidth="lg"
        className="flex-1 flex items-center justify-center p-16"
      >
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h3" className="text-4xl md:text-5xl font-bold">
            Simplifying Database Queries with Natural Language
          </Typography>
          <Typography variant="body1" className="text-lg md:text-xl mt-4">
            Transform your questions into precise SQL queries powered by
            LlamaIndex and informed by data dictionaries.
          </Typography>
          <div className="mt-6">
            <Button
              variant="contained"
              color="primary"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full"
              href={user ? '/tafsiri' : '/login'}
            >
              Get Started
            </Button>
            <span className="inline-block w-4"></span>
          </div>
        </motion.div>
      </Container>

      {/* Features Section */}
      <section id="features" className="py-20 dark:bg-customDarkGray">
        <Container maxWidth="lg">
          <motion.div
            className="text-center space-y-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h4" className="text-3xl font-bold text-white">
              Key Features
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Feature
                title="Natural Language Processing"
                description="Convert questions into SQL queries effortlessly with advanced NLP integration."
                Image={<AiImage className="h-24 w-24 mx-auto mb-4" />}
              />
              <Feature
                title="Data Dictionary Powered"
                description="Leverage data dictionaries for contextual accuracy when querying large databases."
                Image={<DataDict className="h-24 w-24 mx-auto mb-4" />}
              />
              <Feature
                title="Query Transparency"
                description="Get both the SQL query and results, ensuring full transparency for users."
                Image={<Transparency className="h-24 w-24 mx-auto mb-4" />}
              />
            </div>
          </motion.div>
        </Container>
      </section>
      <span className="h-4"></span>
      {/* Call to Action */}
      <section className="py-10 bg-gray-900">
        <Container maxWidth="md" className="text-center">
          <Typography variant="h5" className="text-2xl font-bold text-white">
            Ready to transform your data experience?
          </Typography>
          <span className="h-2"></span>
          <Button
            variant="contained"
            color="primary"
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full"
            href="#"
          >
            Sign Up Now
          </Button>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 text-center">
        <Typography variant="body2" className="text-gray-300">
          &copy; 2022 Tafsiri. All rights reserved.
        </Typography>
      </footer>
    </div>
  );
};

const Feature = ({ title, description, Image }) => (
  <motion.div
    className="bg-gray-500 p-8 rounded-lg shadow-lg"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    {Image}
    <Typography variant="h6" className="text-xl font-bold text-white">
      {title}
    </Typography>
    <Typography variant="body2" className="mt-4 text-gray-300">
      {description}
    </Typography>
  </motion.div>
);

export default LandingPage;
