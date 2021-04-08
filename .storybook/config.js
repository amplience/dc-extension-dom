import { configure, addDecorator } from '@storybook/react';
import { theme, fixtures, iconFont } from './decorators';

addDecorator(theme);
addDecorator(fixtures);
addDecorator(iconFont);

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.tsx?$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
