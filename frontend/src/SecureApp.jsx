import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Generate a random nonce value for each request
const generateNonce = () => {
  return Math.random().toString(36).substring(2, 17);
};

const nonceValue = generateNonce();

const SecureApp = ({ children }) => (
  <HelmetProvider>
    <Helmet>
      <meta http-equiv="Content-Security-Policy" content={`default-src 'self'; script-src 'self' ; object-src 'none'; style-src 'self' 'nonce-${nonceValue}' https://fonts.googleapis.com; connect-src 'self' https://dev-z5txzw3n.us.auth0.com http://localhost:8000; img-src 'self' data: https:; font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;`} />
      <meta http-equiv="X-Content-Type-Options" content="nosniff" />
      <meta http-equiv="X-Frame-Options" content="DENY" />
      <meta http-equiv="X-XSS-Protection" content="1; mode=block" />
      <meta http-equiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains" />
    </Helmet>
    {React.cloneElement(children, { nonce: nonceValue })}
  </HelmetProvider>
);

export default SecureApp;
