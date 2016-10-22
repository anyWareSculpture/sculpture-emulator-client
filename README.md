# sculpture-emulator-client
Responsible for communicating with the streaming server and managing state in a similar manner as the embedded system.

[![Build Status](https://travis-ci.org/anyWareSculpture/sculpture-emulator-client.svg?branch=master)](https://travis-ci.org/anyWareSculpture/sculpture-emulator-client)

## Project Setup

Install Node.js and npm. Then run the following to install dependencies:

    $ npm install
    $ npm install -g bower
    $ bower install

Install gulp:

    $ npm install -g gulp

To build (lint, run tests, compile css, copy templates, transpile, etc.)
run gulp:

    $ gulp

There are also more specific tasks if you only want to perform some actions:

    $ gulp test
    $ gulp lint
    $ gulp clean
    $ gulp css
    $ gulp build
    $ gulp images

See the gulpfile.js for more details and for all the tasks.

Run any server from the `dist/` directory to see the app:

    $ cd dist
    $ sudo python -m SimpleHTTPServer 80

It's also possible to use the built-in server:

    $ gulp serve


You may have to leave the directory and enter it again and then call the above command if you run `gulp` or `gulp clean` since those commands delete the `dist/` directory.

While developing, instead of running all the individual build commands over and over again you can use `watch` commands.

    $ gulp watch

Will watch everything but tests and then rebuild automatically whenever a file changes.

    $ gulpTests

Will watch source files and tests only for when you're doing test development. It will lint and test the files.

Look through [gulpfile.js](gulpfile.js) to see all the commands that are available.

## How to update disk images

To update the disk images, add the files to the `images/` directory.  Run `gulp images`, or have `gulp watch` running prior to making changes.

Disk images must meet the following criteria:
 + Provide images in their respective 'zeroed' positions;
 + Images must be square;
 + All three must have same dimensions;
 + Image files may be `.png`, `.jpg`, or `.gif`.

The application looks for files named `disk0.png`, `disk1.png`, and `disk2.png` as the default disk images. These filenames are configurable in `config.js` under `diskUrls`.
