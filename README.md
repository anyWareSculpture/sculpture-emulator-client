# sculpture-emulator-client
Responsible for communicating with the streaming server and managing state in a similar manner as the embedded system.

[![Build Status](https://travis-ci.org/anyWareSculpture/sculpture-emulator-client.svg?branch=master)](https://travis-ci.org/anyWareSculpture/sculpture-emulator-client)

## Project Setup

Clone this repository:

    $ git clone --recursive https://github.com/anyWareSculpture/sculpture-emulator-client

Install Node.js and npm. Then run the following to install dependencies:

    $ npm install
    $ npm install -g bower
    $ bower install

Install gulp:

    $ npm install -g gulp

To build (lint, run tests, compile css, copy templates, etc., transpile)
run gulp:

    $ gulp

There are also more specific tasks if you only want to perform some actions:

    $ gulp test
    $ gulp lint
    $ gulp clean
    $ gulp css
    $ gulp build

See the gulpfile.js for more details and for all the tasks.

Run any server from the `dist/` directory to see the app:

    cd dist
    sudo python -m SimpleHTTPServer 80

You may have to leave the directory and enter it again and then call the above command if you run `gulp` or `gulp clean` since those commands delete the `dist/` directory.
