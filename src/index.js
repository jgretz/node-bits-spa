import path from 'path';

// compile
const defaultOptions = {
  js: 'bundle',
  css: 'styles',
  html: 'index',
  includeMap: true,
};

const compileConfiguration = (options = defaultOptions, bitsConfig) => {
  return {
    ...options,
    ...bitsConfig,
  };
};

export default (options) => {
  return {
    loadRoutes: (bitsConfig) => {
      const config = compileConfiguration(options, bitsConfig);
      const routes = [];

      const addRoute = (route, file) => {
        routes.push({
          verb: 'GET',
          route,
          implementation: (req, res) => {
            res.status(200).sendFile(path.join(config.path, file));
          }
        });
      };

      // add routes
      addRoute(`${config.root}`, `${config.index}.html`);
      addRoute(`${config.root}${config.js}.js`, `${config.js}.js`);
      addRoute(`${config.root}${config.css}.css`, `${config.css}.css`);

      if (config.includeMap) {
        addRoute(`${config.js}.js.map`, `${config.js}.js.map`);
        addRoute(`${config.css}.css.map`, `${config.css}.css.map`);
      }
    }
  };
};
