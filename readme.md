## Installation

#### Using npm

> $ npm i -g npm <br/>
$ npm i --save sokLog

#### In node js

> // Load the logger class <br/>
var SokLogs = require('sokLog'); <br/>
// Init logger <br/>
var config = {
    "date": true,
    "service": "Test"
} <br/>
var logger = new SokLogs(config);

#### Config documentation

- Filename: String(Required) (Name of the file where you want your logs saved).
- Path: String(Required) (Path of the file where you want your logs saved).
- Date: Boolean(Optionnal) (Enable or disable date display before message).
- Service: String(Optionnal) (A string who name your service. Appear between date and message).
- Size: Int(Optionnal) (Specify max size of logs files in MO).

#### Severity

- Debug (Appear with a blue color. Example: logger.debug(message)).
- Error (Appear with a red color. Example: logger.error(message)).
- Info (Appear with a green color. Example: logger.info(message)).