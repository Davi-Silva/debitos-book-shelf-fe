import { Provider } from 'react-redux';

import Layout from '../components/Layout';

import { store } from '../store';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider></Provider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
