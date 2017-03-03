# node-bits-spa
node-bits-spa provides a simple way to expose the files located in a directory from a node-bits server. This is most commonly done for single page apps, thus the name of the bit.

## Install
```
npm install node-bits-spa --save
```

or

```
yarn add node-bits-spa
```

## Configuration
Simply provide the name of the path, and node-bits-spa will create routes to expose all files in that path at their equivalent addresses in the url.

```
nodeBitsSpa({
  root: '/',
  html: '/index.html',
  path: `${__dirname}/spa`,
}),
```

### path
This is the path for node-bits-spa to scan. This is often configured to be the folder into which your spa is built.

### root
This property is defaulted to '/';

This is the root url you want to the files to served under. For example, if an image named ```foo.png``` is found inside the path and the root is ```/bar```, that file will be served at ```/bar/foo.png```.

To support SPA routing any url under root that is not specifically tied to a file will be passed to the index html file.

### html
This property defaults to '/index.html'

This is the html file to use to launch the SPA.
