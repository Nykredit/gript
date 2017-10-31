# GRIPT - Angular Gulp Sass Typescript application builder - OBSOLETE

## Obsolete notice

This project is obsolete.

[![npm](https://img.shields.io/npm/v/gript.svg)](http://npmjs.com/package/gript)
[![npm](https://img.shields.io/npm/dm/gript.svg)](http://npmjs.com/package/gript)
[![npm](https://img.shields.io/npm/dt/gript.svg)](http://npmjs.com/package/gript)

<img align="right" src="package/img/gript_logo_big.png">

This project is the basis for the creation of an [npm module](https://www.npmjs.com/package/gript) containing a "complete" [Gulp](http://gulpjs.com) build setup for
an [AngularJS](https://angularjs.org) application using [Sass](http://sass-lang.com). Your application source and test files can be written in JavaScript or [TypeScript](http://www.typescriptlang.org/).
If it's TypeScript, it will be validated and then compiled to JavaScript.

The goal of this tool is to provide the handy workflow for developing Angular based applications (no matter what language you use - JavaScript or TypeScript)
and ensure the profound checking of the code quality at the same time.
The module orchestrates a collection of [Gulp](http://gulpjs.com) build functionality into a single npm dependency
and makes it easier for developers to have and maintain the build setup for own Angular projects.

The [Gript Newsgroup](https://groups.google.com/forum/#!forum/gript) is the place for announcements and discussion about Gript's features. Feel free to join.
 
The project includes a sample application to make it possible to test the build setup.
The local sample application exemplifies the needed structure for applications supported by the `gript` npm package.
The sample application resides in the `app` folder. 
The `index.html` in the `app` folder is especially important - it contains markers where generated files will be included.

## Features

- JavaScript validation using [ESLint](http://eslint.org),
- TypeScript validation ([TSLint](http://palantir.github.io/tslint/)) and incremental compilation,
- scss validation ([scss-lint](https://github.com/brigade/scss-lint)) and compilation,
- HTML validation using [htmllint](https://github.com/htmllint/),
- unit tests performed using [Karma](https://karma-runner.github.io) and [PhantomJS](http://phantomjs.org) (tests can be written in JavaScript or TypeScript),
- unit testing coverage metered by [Istanbul](https://github.com/gotwarlost/istanbul),
- HTML partials pre-loading into the Angular `$templateCache`,
- includes custom generated [Modernizr](https://modernizr.com) script
- full concatenation/minification for all production JS and CSS files,
- Live-reload capability: web app is auto-refreshed if HTML, TypeScript or scss files change,
- watch tasks: if your source files change, they will be checked for errors, compiled and then injected into your application,
 Gript uses [Chokidar](https://github.com/paulmillr/chokidar) which notices the changes instantly, keeping the CPU usage down at the same time,
- contains the mock server based on `YAML/JSON/JS` configuration files. Refer to the [Mock Server](#mocks) section for usage guidelines.
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
    |     |---- resources
    |     |---- lib
    |     |---- index.html
    |     |---- app.js
    |     |---- .eslint.rc.yml
    |     |---- constants.json
    |---- /bower_components
    |---- /target
    |     |---- dist
    |     |---- tmp
    |---- /mocks
    |---- gulpfile.js
    |---- bower.json
    |---- package.json
    |---- .eslint.rc.yml
    |---- .scsslint.rc.yml
    |---- tslint.json
    |---- .htmllint.rc

which means:

- `app` : contains the application source code
- `app/sections` : contains the subsections of the application code
- `app/components`: contains the components (directives, services etc.) embedded in the application
- `app/app.js` or `app/App.ts` : the entry point of the [Angular](https://angularjs.org) application
- `app/resources`: the place for other resources, like translation files. This will be copied to /target/dist
- `app/lib`: the place for JavaScript libraries not coming from Bower. It will be excluded from linting.
- `app/constants.json`: optional constants file from which Angular constants module will be generated
- `bower_components` : libraries downloaded by [Bower](http://bower.io/)
- `node_modules` : tools downloaded by [npm](https://www.npmjs.org/)
- `target/tmp` : contains generated files (compiled TypeScript, compiled scss styles, Angular templates etc.)
- `target/dist` : contains app distribution package
- `mocks` : contains your mock services definitions.
- `gulpfile.js` : the build files importing the [Gulp](http://gulpjs.com) tasks defined in the `node_modules/gript`
- `bower.json` : contains [Bower](http://bower.io) dependencies
- `.eslint.rc.yml` : contains rules for es-linter ([ESLint](http://eslint.org)). Cascading rules configuration is possible.
- `.scsslint.rc.yml` : contains rules for scss linter ([scss-lint](https://github.com/brigade/scss-lint))
- `tslint.json` : rules for the TypeScript linter ([TSLint](http://palantir.github.io/tslint/))
- `.htmllint.rc` : rules for the HTML linter ([htmllint](https://github.com/htmllint))

## Setup GRIPT in your project

To make use of the `gript` npm module define the dependency to `gript` in the `package.json` file in your own application:

      "dependencies": {
          "gulp": "3.9.0",
          "gript": "~0.0.38",
          ....

together with your other npm dependencies. Gript is available in the [npm repository](https://www.npmjs.com/package/gript).

Running the command

    `npm install --save-dev`

will include `gript` in your `node_modules` folder and make it available for development.

## Configure your project

The tool comes with a guide for the enabling of the build tool in your project.

#### The sample Gulp file and configuration files

The supported Angular application is built by [Gulp](http://gulpjs.com), which is controlled by the `gulpfile.js`.
Gript includes a sample Gulp file, located in the `sample_configs` directory.
There are also example configuration files for `Bower`, `es-lint`, and `scss-lint` in the `sample_configs` directory.

#### Using the sample Gulp file
This `sample_configs/gulpfile.js` can be used as a starter for your project. This is where you define the dependency to `gript` module and specify the options for the build process of your own application:

```javascript
       var gulp = require('gulp');
       
       require('gript')(gulp);
       
       // Set the config to use across the gulp build
       gulp.config = {
           repository: 'http://git.nykreditnet.net/scm/dist/xpa-no-specified-project.git',
           skipAppCacheGeneration: true,
           app: {
               module: 'yourApp',
               constantsFile: 'app/constants.json'
           },
           server: {
			   module: 'yourApp',
			   configFile: 'app/config.json'
		   },
		   partials: ['app/**/*.html'],
		   server: {
               port: 8080,
               host: 'localhost',
               livereload: {
                   port: 35729
               }
           },
           serverDist: {
               port: 8080,
               host: 'localhost'
           },
           proxy: {
               port: 8001,
               hostHeader: 'gript',
               targetURL: 'http://gript'
           },
           mocks: {
               stubby: {
                   location: 'localhost',
                   stubs: 8050,
                   tls: 8443,
                   admin: 8051,
                   relativeFilesPath: true,
                   files: [
                       'mocks/*.{json,yaml,js}'
                   ]
               },
               multimocks: {
                   src: 'multiMocks'
               }
           },
           typeScript: {
               compilerOptions: {
                   noImplicitAny: true,
                   target: "es5",
                   sourceMap: true,
                   declarationFiles: true,
                   noExternalResolve: false,
                   sortOutput: true,
                   removeComments: false,
                   preserveConstEnums: true
               }
           },
           minification: {
               html: {
                   removeEmptyAttributes: false,
                   collapseBooleanAttributes: false,
                   collapseWhitespace: true,
                   caseSensitive: true
               },
               css: {
                   safe: true,
                   autoprefixer: false,
                   discardUnused: false,
                   reduceIdents: false,
                   mergeIdents: false
               },
               javascript: {
                   mangle: true,
                   preserveComments: false
               }
           },
           modernizr: {
               //cssprefix: true, // add this line to fix conflicts with bootstrap (e.g not adding class 'hidden' to html tag)
               options: [
                   'addTest',
                   'html5printshiv',
                   'testProp',
                   'fnBind',
                   'setClasses'
               ],
               'feature-detects': []
		   },
           fontsScan: [
               'bower_components/font-awesome', 
               'bower_components/bootstrap-sass-official'
           ]
           karma: {
               browsers: ['PhantomJS']
           }
	   };
```

Be sure to set values for the configuration in your copy of the `sample_configs/gulpfile.js`.

These values are:

- `app.module` : mandatory name of the project. It's being used as a module name when generating Angular modules, like `$templateCache` or constants modules.
- `repository` the GIT url of your application, used in the `release` and `prerelease` tasks.
- `skipAppCacheGeneration` allows to do not generate appcache manifest as it is [not recommended anymore](https://html.spec.whatwg.org/multipage/browsers.html#offline)
- `partials` is a glob pattern to specify what files should bne considered as Angular `$templateCache` templates. Refer to the [Partials](#partials) section for details.
- `server` configuration options for the web server like port number, live reload port number, host name etc.
- `serverDist` configuration options for the web server started from `dist` by using `server:dist` task.
- `proxy` optional proxy port, host header and target URL configuration. The proxy will start only if you specify `proxy` section in your `gulpfile.js`.
- `mocks` mock server configuration
- `typescript` typescript compilation options
- `minification` minification related options
 
You may kickstart your project by copying `sample_configs/gulpfile.js` to the root of your own project.
This gives you a very simple build configuration as a starting scenario.

NOTE: If you have no tests the

    gulp test

command will fail, until you create your first piece of logic and its corresponding test.

## Building your project

The **default** task builds an application and then starts the development server. Your source code (TypeScript, HTML, scss) will be watched for changes, and - if neccessary, compiled and injected into the `index.html`.
Just by running

    gulp

you are ready to start developing your project.

The `gulpfile.js` from Gript contains also these specific tasks:

- **build** : builds the application for the development
- **dist** : builds and minifies the application for the deployment. The application will be copied to `target/dist` directory.
- **ts** : compiles your app TypeScript files
- **partials** : compiles HTML partials into Angular's `$templateCache` Javascript files. All files matching `partials` config glob are considered as templates.
- **styles** : compiles scss files
- **inject** : injects Bower dependencies, compiled HTML partials, TypeScript and scss into your app's `index.html`. Files will be injected according to the marking in the `index.html` file. Refer to the [Files injection](#injection) section of this readme for details.
    - **inject-bower** : downloads and injects [Bower](http://bower.io/) dependencies
    - **inject-styles** : compiles and injects scss styles
    - **inject-partials** : compiles HTML partials into Angular's `$templateCache` and then injects them into the `index.html`
    - **inject-js** : complies the TypesScript and then injects all JavaScript files
- **lint** : runs linters on the HTML, scss, Javascript and TypeScript source files. Refer to the [Linting](#linting) section for possible options.
	- **lint-js**
	- **lint-scss**
	- **lint-ts**
	- **lint-html**
- **test** : runs the unit tests through [Karma](http://karma-runner.github.io) - NOTE: fails if no tests are available. Refer to the [Testing](#testing) section for details.
- **clean** : removes the whole `target` directory (temporary generated files and distribution package)
    - **clean-dist** : removes the `target/dist` directory (the distribution package)
    - **clean-tmp** : removes the `target/tmp` directory (all temporary generated files)
    - **clean-js** : removes the `target/tmp/js` directory (compiled TypeScript files)
    - **clean-partials** : removes the `target/tmp/partials` directory (Angular's `$templateCache` Javascript files)
    - **clean-styles** : removes the `target/tmp/styles` directory (compiled scss files)
    - **clean-bower** : removes the `bower_components` directory
- **fonts** : searches for all `eot`, `ttf`, `woff` , `woff2` files, flattens the directory structure and copies them into your app. It will search the whole `bower_components` directory, unless you configure it otherwise in the `fontsScan` array in the config section of the `gulpfile.js`.
- **images** : copies all image files into the `dist` directory
- **watch** : watches the source code for changes and runs the relevant task(s) whenever something changes
- **server** : starts a development server
- **server:dist** : starts a server using the deployment directory (`target/dist`)
- **mocks** : starts a server with mock services. Refer to the [Mock server](#mocks) section for guidelines.
- **modernizr** : builds custom [Modernizr](http://modernizr.com) script and injects it into `index.html`
- **config** : creates an optional Angular constants module with values from the file specified in `gulp.config.app.constantsFile`. The default is `app/constants.json`.

You can list all of the available tasks by running the command:

    gulp --tasks

<a name="testing"></a>
## Testing
Gript will automatically run your tests using [Karma](https://karma-runner.github.io). Your tests can be written in JavaScript or TypeScript (they will be compiled first). Tests filenames must end in `test` or `Test` (for example `PortfolioServiceTest.ts`, `PortfolioService_test.ts`, `portfolioService_test.js`).
Your tests will be executed using headless, [PhantomJS](http://phantomjs.org) browser. You can customize this behavior altogether with other Karma options in the `karma` section of the `gulpfile.js`.
Refer to [Karma Configuration docs](https://karma-runner.github.io/0.13/config/configuration-file.html) for possible options and values. 
For example, if you need to run your tests under Chrome browser, amend the default configuration:
 
 ```
  karma: {
         frameworks: ['jasmine', 'sinon', 'angular-filesort'],
         plugins: [
             'karma-jasmine',
             'karma-sinon',
             'karma-angular-filesort',
             'karma-phantomjs-launcher',
             'karma-chrome-launcher',
             'karma-junit-reporter',
             'karma-coverage',
             'karma-ng-html2js-preprocessor'
         ],
         browsers: ['Chrome']
     }
 ```

<a name="partials"></a>
## Partials
The `partials` task will create Angular `$templateCache` files from your HTML files. The resulting JavaScript files will be created in the `target/tmp/partials` directory.
These files will then be injected into the `index.html` file, according to `<!-- inject:partials --><!-- endinject -->` markings.
The `dist` task will minify and concatenate them with other JavaScript files from your application.
Gript considers all HTML files in the `app` directory (except the `index.html`) as partials by default. You can change this behaviour by setting up the `partials` configuration value in the `gulpfile.js`. This may come in handy when you don't want a specific HTML file to be converted to Angular `$templateCache` partial.
For example:
```
partials: ['app/**/*.html', '!app/sections/welcome/testOauth.html']
```
 
will generate `$templateCache` from all HTML files except the `app/sections/welcome/testOauth.html`.
Take note that all files excluded from partials generation will be just copied to the `target` directory. At the same time, all files considered as partials will not be copied - after the conversion to JavaScript we don't need them anymore.

If you need to customize the partials generation, use the `partialsOptions` in the `gulpfile.js`, for example:

```
partials: ['app/**/*.html'],
partialsOptions: {
    prefix: './'
},
```

Refer to the [gulp-ng-html2js](https://www.npmjs.com/package/gulp-ng-html2js) documentation for possible options. 

<a name="linting"></a>
## Linting
To ensure the profound checking of the code quality of your application, Gript will check all your HTML, scss, TypeScript and JavaScript files.
The linting process is executed during the build, and is also included in the `watch` task, to re-lint the file on the fly, after you change it.
The number of configuration files are being used to customize the linting options:

- `.eslint.yml` contains configuration for the powerful JavaScript linter, the [ESLint](http://eslint.org). Refer to the [Options](http://eslint.org/docs/user-guide/configuring) section for avaialable options.
- `.scss-lint.yml` contains configuration for scss linter, the [scss-lint](https://github.com/brigade/scss-lint). Referer to the [Configuration](https://github.com/brigade/scss-lint#configuration) for options.
- `tslint.json` contains options for [TSLint](http://palantir.github.io/tslint/). Refer [here](http://palantir.github.io/tslint/rules/) for the description of rules.
- `.htmllintrc` contains setup for [htmllint](https://github.com/htmllint). Refer to the [options](https://github.com/htmllint/htmllint/wiki/Options) for possible settings.

For your convenience, Gript contains sample configuration files for all linters in the `sample_configs` directory.
During the linting process, Gript generates Checkstyle-like XML reports in the `target` directory:

- `es-lint-result.xml`
- `html-lint-result.xml`
- `scss-lint-result.xml`
- `ts-lint-result.xml`

The reports from tests execution and code coverage are also generated into the `target` directory:

- `cobertura-coverage.xml`
- `test-results.xml`

You can use linting, test and coverage reports in your continuous integration setup, like [Jenkins](https://jenkins-ci.org) for example.

## Modernizr
During the build process, Gript will analyse your JavaScript and CSS files and generate custom [Modernizr](http://modernizr.com).
The custom script will be injected into the `index.html`.
You can customize the script generation by changing options in the `modernizr` section of the `gulpfile.js`.
Refer to the [Modernizr build options](https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json) for possible values.

## TypeScript compilation
If you develop your app in the TypeScript, files will be compiled and then injected. The example setup uses [DefinitelyTyped](http://definitelytyped.org/)
 to get the TypeScript types definitions. They are being downloaded by [Bower](http://bower.io/) into the `bower_components/DefinitelyTyped` directory, which is excluded from the TypeScript linting.
 The resulting JavaScript files will be placed in the `target/tmp/js` directory.
 You can customize your TypeScript compile options using the `typeScript` section in the `gulpfile.js`.
 Refer to the [Compiler-Options](https://github.com/Microsoft/TypeScript/wiki/Compiler-Options) section in the TypeScript documentation for available options.

<a name="minification"></a>
## Minification
After executing a `dist` task, all resulting HTML, CSS and JavaScript files will be concatenated and minified.
You can customize the minification options by modyfying the `minification` section in your `gulpfile.js`.

- HTML files will be minified using [html-minifer](https://github.com/kangax/html-minifier). See the [html-minifier docs](https://github.com/kangax/html-minifier) for available options.
- CSS files will be minified with [cssnano](https://github.com/ben-eb/cssnano). Refer to the [documentation](http://cssnano.co/optimisations/) for possible optimisations.
- JavaScript will be compressed with [UglifyJS](http://lisperator.net/uglifyjs/). Refere to the [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) module docs for help how to set options.

:warning: Note: too agressive optimisations will break your build or make your app useless. Gript includes the default set of options, which are pretty safe.

<a name="injection"></a>
## Compiled files injection

By default, all TypeScript, scss and HTML files will be compiled and injected into your app's `index.html` file.
The `target/tmp` directory is the place for the compilation output:

- `target/tmp/js` : will contain compiled TypeScript files
- `target/tmp/partials` : will contain all HTML partials from your Angular app compiled into Angular `$templateCache`.
- `target/tmp/styles` : will contain compiled scss files

Compiled scripts and styles will then be injected into the app's `index.html` according to the injection markings:

- `<!-- bower:css --><!-- endbower -->` : Bower CSS dependencies
- `<!-- inject:css --><!-- endinject -->` : compiled scss files
- `<!-- bower:js --><!-- endbower -->` : Bower JS dependencies
- `<!-- inject:js --><!-- endinject -->` : TypeScript files compiled into JS
- `<!-- inject:partials --><!-- endinject -->` : HTML partials compiled into Angular's `$templateCache`.

After executing the `dist` task, all the stylesheets and JavaScripts will be minimized and concatenated.
The result will be injected into `target/dist/index.html` according to these injection markings:
- `<!-- build:css styles/vendor.css --><!-- endbuild -->`: vendor stylesheets (from `bower_components`)
- `<!-- build:css styles/main.css --><!-- endbuild -->`: your own stylesheets
- `<!-- build:js scripts/vendor.js --><!-- endbuild -->`: vendor scripts (from `bower_components`)
- `<!-- build:js scripts/main.js --><!-- endbuild -->`: your own scripts

Refer to `app/index.html` or `sample_configs/index.html` for an example how to define these markings.

<a name="mocks"></a>
## Mock server
There are two mock engines implementations included in Gript: [stubby4node](https://github.com/mrak/stubby4node) and [Angular-Multimocks](https://github.com/wongatech/angular-multimocks).
[stubby4node](https://github.com/mrak/stubby4node) allows you to have a mock server running during the development, using the standard `gulp` or `gulp server` tasks.
[Angular-Multimocks](https://github.com/wongatech/angular-multimocks), on the other hand - will generate some source code which will enable mocking services within your application (useful when you want to deploy your application with mocked services).
You setup the mock configuration in the `mocks` section in the `gulpfile.js`:
    
```
mocks: {
    stubby: {
        location: 'localhost',
        stubs: 8050,
        tls: 8443,
        admin: 8051,
        relativeFilesPath: true,
        files: [
            'mocks/*.{json,yaml,js}'
        ]
    },
    multimocks: {
        src: 'multiMocks'
    }
}
```

You have an option to start both of them, just a single one or none. If the configuration for the specific mock engine is not present in the `gulpfile.js` - it will not be started.

### stubby4node
[stubby4node](https://github.com/mrak/stubby4node) It's a highly configurable server for mocking/stubbing external systems during development.
Gript takes endpoint descriptors in the form of a YAML or JSON files that tell it how to respond to incoming requests.
For each incoming request, configured endpoints are checked in-order until a match is found.
The endpoints can contain regular expressions, any of HTTP methods, queries, headers, dynamic token interpolation, defined fake response latency and so on.
The response can be parametrized or served from a file - the possiblities are endless.
Refer to the Stubby [endpoint configuration](https://github.com/mrak/stubby4node#endpoint-configuration) section for assistance how to define your own endpoints.
By default, the `mocks` Gulp task will start together with the `server` and `server:dist` tasks.
Gript contains some simple endpoints definitions in the `mocks` and `sample_config/mocks` directory to get you started.
You can customize the mocks directory name and server ports in the `mocks` section of your `gulpfile.js`.
To create new mocked service, simply put the new definition of the endpoint into the `mocks` folder.
You can disable the runtime mock server by using `--nomocks` option when executing any of the tasks, for example:

```
gulp --nomocks
```

### Angular-multimocks
[Angular-Multimocks](https://github.com/wongatech/angular-multimocks) lets you test how your app behaves with different responses from an API. Angular Multimocks allows you to define sets of mock API responses for different scenarios as JSON files.
The only mandatory configuration option exposed for Angular-multimocks is the `src`: the directory to load mock files from.
Gript will read your mock files and generate the needed source files (mock scenarios) into the `multimocks.js` file in the `target/tmp/js` folder. They will be minified and concatenated with your other JS files when doing `dist`.
Take note that if you want [Angular-Multimocks](https://github.com/wongatech/angular-multimocks) to do it's job, you need to include `angular-multimocks` and `Angular Mocks` (which [Angular-Multimocks](https://github.com/wongatech/angular-multimocks) depends on) in your `bower.rc`:

```
 "angular-mocks": "1.2.29",
 "angular-multimocks": "0.6.8",
```
The `sample_configs` contains `multiMocks` directory with example `mockResources.json` and some mock responses to get you started.
Refer to the [Angular-Multimocks](https://github.com/wongatech/angular-multimocks) documentation for more details.
     
## External dependencies

Gript makes use of [node-gyp](https://github.com/nodejs/node-gyp) which is a cross-platform command-line tool written in Node.js for compiling native addon modules for Node.js.
To use [node-gyp](https://github.com/nodejs/node-gyp) you will need some external dependencies, depending on your platform:

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

## Building the `gript` module

The `gulpfile.js` for the `gript` npm module is located in the root of the project. It contains a Gulp task to package and the verify the npm module:

- **create-package**    creates the npm package
- **verify-package**    verifies its contents

After that the npm module is ready to be published to the `npm` repository.

The Gript logo contains modified version of the [Link icon](https://commons.wikimedia.org/wiki/File:Chain_link_icon.png) licensed under 
[Creative Commons](https://en.wikipedia.org/wiki/en:Creative_Commons) license.

<img align="center" src="package/img/gript_logo_mini.png">
