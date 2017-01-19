# sculpture-emulator-client
Responsible for communicating with the streaming server and managing state in a similar manner as the embedded system.

[![Build Status](https://travis-ci.org/anyWareSculpture/sculpture-emulator-client.svg?branch=master)](https://travis-ci.org/anyWareSculpture/sculpture-emulator-client)

## Project Setup

Install node.js and npm. Then run the following to install dependencies:

    $ npm install

To run in development mode:

    $ npm run dev

## Deployment

FIXME: Deploy to github pages

## How to update disk images

To update the disk images, add the files to the `images/` directory.  Run `gulp images`, or have `gulp watch` running prior to making changes.

Disk images must meet the following criteria:
 + Provide images in their respective 'zeroed' positions;
 + Images must be square;
 + All three must have same dimensions;
 + Image files may be `.png`, `.jpg`, or `.gif`.

The application looks for files named `disk0.png`, `disk1.png`, and `disk2.png` as the default disk images. These filenames are configurable in `config.js` under `diskUrls`.
