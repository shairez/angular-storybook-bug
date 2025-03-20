import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  // Return the config without directly importing @analogjs/vite-plugin-angular
  return {
    plugins: [
      // We've removed the Angular plugin from here and moved it to Storybook config
      storybookTest({
        configDir: path.join(dirname, '.storybook'),
        storybookScript: 'pnpm storybook --ci ',
      })
    ],
    test: {
      globals: true,
      workspace: [
        {
          extends: true,
          test: {
            name: 'storybook',
            setupFile: ['./.storybook/vitest.setup.ts'],
            browser: {
              enabled: true,
              headless: true,
              provider: 'playwright',
              instances: [
                {
                  browser: 'chromium',
                },
              ],
            },
          },
        },
      ],
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
