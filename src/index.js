import _ from 'lodash';
import glob from 'glob';
import path from 'path';
import {logWarning} from 'node-bits';

// configuration
const compileConfiguration = (options = {}, bitsConfig) =>
  ({
    root: '/',
    html: '/index.html',

    ...options,
    ...bitsConfig,
  });

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
      },
    },
  };
};

export default options =>
  ({
    loadRoutes: bitsConfig => {
      const config = compileConfiguration(options, bitsConfig);

      // map all the files in the directory
      const files = glob.sync(path.join(config.path, '**/*.*'));
      const routes = files.map(filePath => defineRoute(config.path, filePath));

      // map the index routes
      const index = _.find(routes, r => r.route === config.html);
      const roots = [config.root, `${config.root}*`];

      if (!index) {
        logWarning('No index html file found. Root route will not display.');
      }

      _.forEach(roots, root => {
        routes.push({...index, route: root});
      });

      // return
      return routes;
    },
  });
