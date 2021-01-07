import React from 'react';
import { Helmet } from 'react-helmet';

const MetaData = ({ title, description }) => (
  <>
    <Helmet
      link={[
        {
          'rel': 'icon',
          'type': 'image/png',
          'href': '/greens.ico',
        },
      ]}
    >
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  </>
);

export default MetaData;
