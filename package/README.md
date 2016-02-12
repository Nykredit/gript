# GRIPT - Angular Gulp Sass Typescript application builder
<img align="right" src="https://github.com/Nykredit/gript/raw/master/package/img/gript_logo_big.png">

This project is the basis for the creation of an [npm module](https://www.npmjs.com/package/gript) containing a "complete" Gulp build setup for
an AngularJS application using Sass. Your application source and test files can be written in JavaScript or TypeScript.
If it's TypeScript, it will be validated and then compiled to JavaScript.

The goal of this tool is to provide the handy workflow for developing Angular based applications (no matter what language you use - JavaScript or TypeScript)
and ensure the profound checking of the code quality at the same time.
The module orchestrates a collection of gulp build functionality into a single npm dependency
and makes it easier for developers to have and maintain the build setup for own Angular projects.

The project includes a sample application to make it possible to test the build setup.
The local sample application exemplifies the needed structure for applications supported by the `gript` npm package.
The sample application resides in the `app` folder.
The `index.html` in the `app` folder is especially important - it contains markers where generated files will be included.

## Features

- Javascript validation using `es-lint`.
- TypeScript validation and incremental compilation
- SASS validation and compilation
- HTML linting using [htmllint](https://github.com/htmllint/)
- unit tests performed using Karma and PhantomJS (tests can be written in JavaScript or TypeScript)
- unit testing coverage metered by Istanbul
- HTML partials pre-loading into the Angular $templateCache
- full concatenation/minification for all production JS and CSS files
- Live-reload capability: web app is auto-refreshed if HTML, TypeScript or Sass files change.
- watch tasks: if your source files change, they will be checked for errors, compiled and then injected into your application.
 Gript uses [Chokidar](https://github.com/paulmillr/chokidar) which notices the changes instantly, keeping the CPU usage down at the same time.
- contains the locked set of specific `npm` dependencies, to minimize "the dependency hell".

## Structure requirements for applications supported

The use of the this Gulp build tool is based on applications code being structured according to Google's
 [Best Practice Recommendations for Angular App Structure](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/mobilebasic?pli=1). The primary directories and files are:

    |---- /app
    |     |
    |     |---- components
    |     |---- sections
    |     |---- img
    |     |---- styles
    |     |---- index.html
    |     |---- app.js
    |     |---- .eslint.rc.yml
    |---- /bower_components
    |---- /target
    |     |---- dist
    |     |---- tmp
    |---- gulpfile.js
    |---- bower.json
    |---- package.json
    |---- .eslint.rc.yml
    |---- .scsslint.rc.yml

which means:

- `app` : contains the application source code
- `app/sections` : contains the subsections of the application code
- `app/components`: contains the components (directives, services etc.) embedded in the application
- `app/app.js` or `app/App.ts` : the entry point of the Angular application
- `bower_components` : libraries downloaded by [Bower](http://bower.io/)
- `node_modules` : tools downloaded by [npm](https://www.npmjs.org/)
- `target/tmp` : contains generated files (compiled TypeScript, compiled Sass styles, Angular templates etc.)
- `target/dist` : contains app distribution package
- `gulpfile.js` : the build files importing the gulp tasks defined in the `node_modules/gript`
- `bower.json` : contains bower dependencies
- `.eslint.rc.yml` : contains rules for es-linter (cascading rules configuration is possible)
- `.scsslint.rc.yml` : contains rules for Sass linter (scss-linter)

## Setup GRIPT in your project

To make use of the `gript` npm module define the dependency to `gript` in the `package.json` file in your own application:

      "dependencies": {
          "gulp": "3.9.0",
          "gript": "~0.0.9",
          ....

together with your other npm dependencies. Gript is available in the [npm repository](https://www.npmjs.com/package/gript).

Running the command

    `npm install --save-dev`

will include `gript` in your `node_modules` folder and make it available for development.

## Configure your project

The tool comes with a guide for the enabling of the build tool in your project.

#### The sample Gulp file and configuration files

The supported Angular application is built by [gulp.js](http://gulpjs.com), which is controlled by `gulpfile.js`.
Gript includes a sample Gulp file, located in the `sample_configs` directory.
There are also example configuration files for `Bower`, `es-lint`, and `scss-lint` in the `sample_configs` directory.

#### Using the sample Gulp file
This `sample_configs/gulpfile.js` can be used as a starter for your project. This is where you define the dependency to `gript` module and specify the options for the build process of your own application:

       var gulp = require('gulp');

       require('gript')(gulp);

       // Set the config to use across the gulp build
       gulp.config = {
           module: 'yourApp',
           hostHeader: 'no-specified-hostHeader',
           url: 'http://no-specified-project-url',
           repository: 'http://git.nykreditnet.net/scm/dist/xpa-no-specified-project.git',
           server: {
			   port: 8080,
			   host: 'localhost',
			   livereload: {
				   port: 35729
			   }
		   }
       };

Be sure to set values for the configuration in your copy of the `sample_configs/gulpfile.js`.

These values are:

- `module` : the name of the project
- `hostHeader` host header
- `url` the url of your project
- `repository` the GIT url of your application, used in the `release` and `prerelease` tasks.
- `server` configuration options for the web server like port number, live reload port number, host name etc.

You may kickstart your project by copying `sample_configs/gulpfile.js` to the root of your own project.
This gives you to have a very simple build configuration as a starting scenario.

NOTE: If you have no tests the

    gulp test

command will fail, until you create your first piece of logic and its corresponding test.

## Building your project

The **default** task builds an application and then starts the development server. Your source code (TypeScript, HTML, Sass) will be watched for changes, and - if neccessary, compiled and injected into the `index.html`.
Just by running

    gulp

you are ready to start developing your project.

The `gulpfile.js` from Gript contains also these specific tasks:

- **build** : builds the application for the development
- **dist** : builds and minifies the application for the deployment. The application will be copied to `target/dist` directory.
- **ts** : compiles your app TypeScript files
- **partials** : compiles HTML partials into Angular's $templateCache Javascript files.
- **styles** : compiles Sass files
- **inject** : injects Bower dependencies, compiled HTML partials, TypeScript and Sass into your app's `index.html`. Files will be injected according to the marking in the `index.html` file. Refer to the [Files injection](#injection) section of this readme for details.
    - **inject-bower** : downloads and injects Bower dependencies
    - **inject-styles** : compiles and injects Sass styles
    - **inject-partials** : compiles HTML partials into Angular's $templateCache and then injects
    - **inject-js** : complies the TypesScript and then injects all JavaScript files
- **lint** : runs linters on the HTML, Sass, Javascript and TypeScript source files. Refer to the [Linting](#linting) section for possible options.
	- **lint-js**
	- **lint-scss**
	- **lint-ts**
	- **lint-html**
- **test** : runs the unit tests through [Karma](http://karma-runner.github.io) - NOTE: fails if no tests are available. Your tests can be written in JavaScript or TypeScript (they will be compiled first). Tests filenames must end in `test` or `Test` (for example `PortfolioServiceTest.ts`, `PortfolioService_test.ts`, `portfolioService_test.js`).
- **clean** : removes the whole `target` directory (temporary generated files and distribution package)
    - **clean-dist** : removes the `target/dist` directory (the distribution package)
    - **clean-tmp** : removes the `target/tmp` directory (all temporary generated files)
    - **clean-js** : removes the `target/tmp/js` directory (compiled TypeScript files)
    - **clean-partials** : removes the `target/tmp/partials` directory (Angular's $templateCache Javascript files)
    - **clean-styles** : removes the `target/tmp/styles` directory (compiled Sass files)
    - **clean-bower** : removes the `bower_components` directory
- **fonts** : searches for all `eot`, `ttf`, `woff` , `woff2` files, flattens the directory structure and copies them into your app
- **images** : copies all image files into the `dist` directory
- **watch** : watches the source code for changes and runs the relevant task(s) whenever something changes
- **server** : starts a development server
- **server:dist** : starts a server using the deployment directory (`target/dist`)

You can list all of the available tasks by running the command:

    gulp --tasks

## TypeScript compilation
If you develop your app in the TypeScript, files will be compiled and then injected. The example setup uses [DefinitelyTyped](http://definitelytyped.org/)
 to get the TypeScript types definitions. They are being downloaded by [Bower](http://bower.io/).
 We assume that they will be downloaded to `bower_components/DefinitelyTyped` directory, which is excluded from the TypeScript linting.
 The resulting JavaScript files will be placed in the `target/tmp/js` directory.

<a name="linting"></a>
## Linting
To ensure the profound checking of the code quality of your application, Gript will check all your HTML, Sass, TypeScript and JavaScript files.
The linting process is executed during the build, and is also included in the `watch` task, to re-lint the file on the fly, after you change it.
The number of configuration files are being used to customize the linting options:

- `.eslint.yml` contains configuration for the powerful JavaScript linter, the [ESLint](http://eslint.org). Refer to the [Options](http://eslint.org/docs/user-guide/configuring) section for avaialable options.
- `.scss-lint.yml` contains configuration for Sass linter, the [scss-lint](https://github.com/brigade/scss-lint). Referer to the [Configuration](https://github.com/brigade/scss-lint#configuration) for options.
- `tslint.json` contains options for [TSLint](http://palantir.github.io/tslint/). Refer [here](http://palantir.github.io/tslint/rules/) for the description of rules.
- `.htmllintrc` contains setup for [htmllint](https://github.com/htmllint). Refer to the [options](https://github.com/htmllint/htmllint/wiki/Options) for possible settings.

For your convenience, Gript contains sample configuration files for all linters in the `sample_configs` directory.

<a name="injection"></a>
## Compiled files injection

By default, all TypeScript, Sass and HTML files will be compiled and injected into your app's `index.html` file.
The `target/tmp` directory is the place for the compilation output:

- `target/tmp/js` : will contain compiled TypeScript files
- `target/tmp/partials` : will contain all HTML partials from your Angular app compiled into Angular $templateCache.
- `target/tmp/styles` : will contain compiled Sass files

Compiled scripts and styles will then be injected into the app's `index.html` according to the injection markings:

- `<!-- bower:css --><!-- endbower -->` : Bower CSS dependencies
- `<!-- inject:css --><!-- endinject -->` : compiled Sass files
- `<!-- bower:js --><!-- endbower -->` : Bower JS dependencies
- `<!-- inject:js --><!-- endinject -->` : TypeScript files compiled into JS
- `<!-- inject:partials --><!-- endinject -->` : HTML partials compiled into Angular's $templateCache.

After executing the `dist` task, all the stylesheets and JavaScripts will be minimized and concatenated.
The result will be injected into `target/dist/index.html` according to these injection markings:
- `<!-- build:css styles/vendor.css --><!-- endbuild -->`: vendor stylesheets (from `bower_components`)
- `<!-- build:css styles/main.css --><!-- endbuild -->`: your own stylesheets
- `<!-- build:js scripts/vendor.js --><!-- endbuild -->`: vendor scripts (from `bower_components`)
- `<!-- build:js scripts/main.js --><!-- endbuild -->`: your own scripts

Refer to `app/index.html` or `sample_configs/index.html` for an example how to define these markings.

## External dependencies

Gript makes use of [node-gyp] (https://github.com/nodejs/node-gyp) which is a cross-platform command-line tool written in Node.js for compiling native addon modules for Node.js.
To use [node-gyp] (https://github.com/nodejs/node-gyp) you will need some external dependencies, depending on your platform:

**On Unix**

- python (v2.7 recommended, v3.x.x is not supported)
- make
- A proper C/C++ compiler toolchain, like GCC

**On Mac OS X**

- python (v2.7 recommended, v3.x.x is not supported). It's already installed by default on Mac OS X.
- [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)
- You also need to install the Command Line Tools via Xcode. You can find this under the menu _Xcode -> Preferences -> Downloads_. (This step will install gcc and the related toolchain containing make)
- for scss-lint to work properly, you need `scss-lint` Ruby gem installed:

        $ gem install scss_lint

**Windows**

- Python (v2.7.10 recommended, v3.x.x is not supported). Make sure that you have a `PYTHON` environment variable, and it is set to drive:\path\to\python.exe not to a folder

**Windows XP/Vista/7**

- Microsoft Visual Studio C++ 2013 (Express version works well). If the install fails, try uninstalling any C++ 2010 x64&x86 Redistributable that you have installed first. If you get errors that the 64-bit compilers are not installed you may also need the compiler update for the Windows SDK 7.1

**Windows 7/8**

- Microsoft Visual Studio C++ 2013 for Windows Desktop (Express version works well)

**Windows 10**

- Install the latest version of npm
- Install Python 2.7 from https://www.python.org/download/releases/2.7/ and make sure its on the System Path
- Install Visual Studio Community 2015 Edition. (Custom Install, Select Visual C++ during the installation)
- Set the environment variable `GYP_MSVS_VERSION=2015`
- Run the command prompt as Administrator
    $ npm install (--msvs_version=2015) <-- Shouldn't be needed if you have set GYP_MSVS_VERSION env
If the above steps have not worked or you are unsure please visit http://www.serverpals.com/blog/building-using-node-gyp-with-visual-studio-express-2015-on-windows-10-pro-x64 for a full walkthrough

**All Windows Versions**

- For 64-bit builds of node and native modules you will also need the Windows 7 64-bit SDK
- You may need to run one of the following commands if your build complains about WindowsSDKDir not being set, and you are sure you have already installed the SDK:

        call "C:\Program Files\Microsoft SDKs\Windows\v7.1\bin\Setenv.cmd" /Release /x86
        call "C:\Program Files\Microsoft SDKs\Windows\v7.1\bin\Setenv.cmd" /Release /x64

The Gript logo contains modified version of the [Link icon](https://commons.wikimedia.org/wiki/File:Chain_link_icon.png) licensed under
[Creative Commons](https://en.wikipedia.org/wiki/en:Creative_Commons) license.

<img align="center" src="https://github.com/Nykredit/gript/raw/master/package/img/gript_logo_mini.png">