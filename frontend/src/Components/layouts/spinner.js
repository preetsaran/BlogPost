import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const spinnerGif = () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </Fragment>
);


export default spinnerGif;