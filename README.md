# turbine [![Build Status](https://dtm-builder.ut1.mcps.adobe.net/buildStatus/icon?job=turbine)](https://dtm-builder.ut1.mcps.adobe.net/view/Reactor/job/turbine/)

This is the DTM engine. It contains the brains responsible for running rules on a client's website as well as delegating logic to extensions.

## Development Setup
1. Install [node.js](https://nodejs.org/).
2. Setup the Reactor NPM registry to install all the packages from the `@reactor` scope by running `npm config set @reactor:registry https://artifactory.corp.adobe.com/artifactory/api/npm/npm-mcps-release-local/`.
3. Install [gulp.js](http://gulpjs.com/) globally by running `npm install -g gulp`.
4. Clone this repository.
5. After navigating into the project directory, install project dependencies by running `npm install`.
6. Test the project by running `gulp test`.

See the [turbine-gulp-sandbox README](https://git.corp.adobe.com/Activation/turbine-gulp-sandbox/blob/master/README.md) and the [turbine-gulp-testrunner README](https://git.corp.adobe.com/Activation/turbine-gulp-testrunner/blob/master/README.md) for more information on how to build and test this project.
