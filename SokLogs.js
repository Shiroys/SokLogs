'use strict';

/*------------------------------------------------------------------------------------*/
// Type: Logger
// Made by: Simon BELLAIS
// Email: Sokkar <sokkar.pro@gmail.com>
// Last Release: 16/04/2018
/*------------------------------------------------------------------------------------*/

const fs = require('fs');
const zlib = require('zlib');

class SokLogs {
    constructor(config) {
        this.yellow = "\x1b[33m";
        this.blue = "\x1b[34m";
        this.green = "\x1b[32m";
        this.red = "\x1b[31m";
        this.magenta = "\x1b[35m";
        this.reset = "\x1b[0m";
        if (!config.filename)
            throw new TypeError("No filename provided in configuration");
        else
            this.filename = config.filename;
        if (!config.path)
            throw new TypeError("No path provided in configuration");
        else
            (config.path[config.path.length - 1] !== '/') ? this.path = config.path + "/" : this.path = config.path;
        (config.size) ? this.size = config.size : this.size = 500;
        (config.date) ? this.date = true : this.date = false;
        (config.service) ? this.service = config.service : this.service = null;
    }

    compressFile(copyFile, newFile) {
        try {
            let readStream = fs.createReadStream(copyFile);
            let writeStream = fs.createWriteStream(newFile);
            readStream.pipe(zlib.createGzip()).pipe(writeStream);
        } catch (err) {
            throw new TypeError(err);
        }
    }

    saveLogs(output) {
        try {
            let fileSize = fs.statSync(this.path + this.filename).size / 1000000.0;
            if (fileSize >= this.size) {
                let count = 0;
                fs.copyFileSync(this.path + this.filename, this.path + 'tmpLogs.logs');
                fs.readdirSync(this.path).map((element) => {
                    let eleSplit = element.split('.');
                    return ((eleSplit.length === 4 && eleSplit[0] === this.filename.split('.')[0]) ? parseInt(eleSplit[1]) : 0);
                }).forEach((element) => {
                    if (element > count) {
                        count = element;
                    }
                });
                let newFile = this.path + this.filename.split('.')[0] + "." + (count + 1).toString() + "." + this.filename.split('.')[1] + ".gz";
                this.compressFile(this.path + "tmpLogs.logs", newFile, output);
                fs.writeFileSync(this.path + this.filename, '');
                fs.appendFileSync(this.path + this.filename, output);
                fs.unlinkSync(this.path + 'tmpLogs.logs');
            } else {
                fs.appendFileSync(this.path + this.filename, output);
            }
        } catch (err) {
            if (err.code === "ENOENT") {
                fs.appendFileSync(this.path + this.filename, output);
            } else {
                throw new TypeError(err);
            }
        }
    }

    retMessage(argsMess) {
        let keys = Object.keys(argsMess);
        let mess;
        let prev = this.yellow + " |-> " + this.reset;
        if (keys.length > 0) {
            mess = keys.map((element) => {
                let typeData = (typeof argsMess[element]).charAt(0).toUpperCase() + (typeof argsMess[element]).slice(1);
                if (typeData === "Object") {
                    return (this.red + typeData + ": " + this.reset + JSON.stringify(argsMess[element]));
                } else if (typeData === "String") {
                    return (this.red + typeData + ": " + this.reset + '"' + argsMess[element] + '"');
                } else {
                    return (this.red + typeData + ": " + this.reset + argsMess[element]);
                }
            });
            mess[0] = prev + mess[0];
        } else {
            mess = this.red + "No message defined !" + this.reset;
        }
        return ((typeof mess === "string") ? " " + mess : mess.join(prev));
    }

    debug() {
        let output = "";
        if (this.date === true) {
            output += this.blue + "[ " + new Date().toISOString().split('T')[0] + " ]" + this.reset;
        }
        if (this.service) {
            output += ((this.date) ? " - " : "") + this.blue + "[-> " + this.service + " <-]" + this.reset + " -";
        }
        this.saveLogs(output + this.retMessage(arguments) + "\n");
    }

    error() {
        let output = "";
        if (this.date === true) {
            output += this.red + "[ " + new Date().toISOString().split('T')[0] + " ]" + this.reset;
        }
        if (this.service) {
            output += ((this.date) ? " - " : "") + this.red + "[-> " + this.service + " <-]" + this.reset + " -";
        }
        this.saveLogs(output + this.retMessage(arguments) + "\n");
    }

    info() {
        let output = "";
        if (this.date === true) {
            output += this.green + "[ " + new Date().toISOString().split('T')[0] + " ]" + this.reset;
        }
        if (this.service) {
            output += ((this.date) ? " - " : "") + this.green + "[-> " + this.service + " <-]" + this.reset + " -";
        }
        this.saveLogs(output + this.retMessage(arguments) + "\n");
    }

    warn() {
        let output = "";
        if (this.date === true) {
            output += this.magenta + "[ " + new Date().toISOString().split('T')[0] + " ]" + this.reset;
        }
        if (this.service) {
            output += ((this.date) ? " - " : "") + this.magenta + "[-> " + this.service + " <-]" + this.reset + " -";
        }
        this.saveLogs(output + this.retMessage(arguments) + "\n");
    }
}

module.exports = SokLogs;

