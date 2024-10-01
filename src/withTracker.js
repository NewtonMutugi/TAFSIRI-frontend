import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { GA_TRACKING_ID } from './constants';
import { useLocation } from 'react-router-dom';

ReactGA.initialize(GA_TRACKING_ID);

const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = (page) => {
    ReactGA.set({
      page,
      ...options,
    });
    ReactGA.send({ hitType: 'pageview', page });
  };

  const HOC = (props) => {
    const location = useLocation();

    useEffect(() => {
      trackPage(location.pathname);
    }, [location.pathname]);

    return <WrappedComponent {...props} />;
  };

  return HOC;
};

export default withTracker;
