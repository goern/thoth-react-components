const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
    "@storybook/preset-create-react-app",
    "storybook-dark-mode",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.(svg|ttf|eot|woff|woff2)$/,
      // only process modules with this loader
      // if they live under a 'fonts' or 'pficon' directory
      include: [
        path.resolve(__dirname, "node_modules/patternfly/dist/fonts"),
        path.resolve(
          __dirname,
          "node_modules/@patternfly/react-core/dist/styles/assets/fonts"
        ),
        path.resolve(
          __dirname,
          "node_modules/@patternfly/react-core/dist/styles/assets/pficon"
        ),
        path.resolve(
          __dirname,
          "node_modules/@patternfly/patternfly/assets/fonts"
        ),
        path.resolve(
          __dirname,
          "node_modules/@patternfly/patternfly/assets/pficon"
        ),
      ],
      use: {
        loader: "file-loader",
        options: {
          // Limit at 50k. larger files emited into separate files
          limit: 5000,
          outputPath: "fonts",
          name: "[name].[ext]",
        },
      },
    });

    return config;
  },
};
