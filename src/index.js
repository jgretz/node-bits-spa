import _ from 'lodash';
import glob from 'glob';
import path from 'path';

// configuration
const defaultOptions = {
  root: '/',
  html: '/index.html',
};

const compileConfiguration = (options = {}, bitsConfig) => {
  return {
    ...defaultOptions,
    ...options,
    ...bitsConfig,
  };
};

// routes
const defineRoute = (configPath, filePath) => {
  // use this rather than base name so we can keep the folder structure in place
  const relativePath = filePath.replace(configPath, '');

  return {
    verb: 'get',
    route: relativePath,
    implementation: {
      get: (req, res) => {
        res.status(200).sendFile(filePath);
      }
    }
  };
};

export default (options) => {
  return {
    loadRoutes: (bitsConfig) => {
      const config = compileConfiguration(options, bitsConfig);

      // map all the files in the directory
      const files = glob.sync(path.join(config.path, '**/*.*'));
      const routes = files.map((filePath) => defineRoute(config.path, filePath));

      // map the index route
      const index = _.find(routes, r => r.route === config.html);
      routes.push({
        ...index,
        route: config.root,
      });

      // return
      return routes;
    }
  };
};
