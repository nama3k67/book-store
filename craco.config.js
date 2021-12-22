const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "rgba(67, 113, 93, 1)",
              "@error-color": "#ea7a7a",
              "@border-radius-base": "4px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
