/* eslint-disable id-match, id-length */
import DemoApp from './demoapp';
import React from 'react';
import Reacti13nTealium from './index.js';
import TealiumConfig from './example-config.js';
import { setupI13n } from 'react-i13n';

const TrackedApp = setupI13n(DemoApp, {
  rootModelData: {
    product: 'The World If',
  },
  isViewportEnabled: true,
}, [ new Reacti13nTealium(TealiumConfig) ]);
export default(<TrackedApp />);
