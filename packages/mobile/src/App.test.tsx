/**
 * @format
 */

import 'react-native';
import React from 'react';

jest.mock('react-native-push-notification', () => ({ configure: jest.fn() }));
jest.mock('react-native-gesture-handler');
import { App } from './App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});
