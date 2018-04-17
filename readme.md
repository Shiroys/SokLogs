## Installation

#### Using npm

> $ npm i -g npm <br/>
$ npm i --save soklogs

#### In node js

> // Load the logger class <br/>
var SokLogs = require('soklogs'); <br/><br/>
// Init logger <br/>
var config = {
    "filename": "logs.log",
    "path": "/Users/Test/Desktop",
    "date": true,
    "service": "Test",
    "size": 500
} <br/>
var logger = new SokLogs(config); <br/><br/>
// Use logger <br/>
logger.debug("I'm a test log", {"test": "log"}, 200);

#### Config documentation

- Filename: String(Required) (Name of the file).
- Path: String(Required) (Path of the file).
- Date: Boolean(Optional) (Enable or disable date display).
- Service: String(Optional) (A string who name your service.).
- Size: Int(Optional) (Specify max size of logs files in MO).

#### Severity

- Debug (Blue color. Example: logger.debug(logs)).
- Error (Red color. Example: logger.error(logs)).
- Info (Green color. Example: logger.info(logs)).