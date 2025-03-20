import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, type Preview } from '@storybook/angular';
import 'zone.js';

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [provideNoopAnimations()],
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;