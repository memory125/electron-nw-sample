'use strict';

const fs = require('fs');
const async = require('async');
const osenv = require('osenv');
const path = require('path');

let shell;
if (process.versions.electron) {
    shell = require('electron').shell;
} else {
    shell = window.require('nw.gui').Shell;
}

function getUsersHomeFolder() {
    return osenv.home();
}

function getFilesInFolder(folderPath, cb) {
    fs.readdir(folderPath, cb);
}

function inspectAndDescribeFile(filePath, cb) {
    let result = {
        file: path.basename(filePath),
        path: filePath, type: ''
    };

    fs.stat(filePath, (err, stat) => {
        if (err) {
            cb(err);
        } else {
            if (stat.isFile()) {
                result.type = 'file';
            }
            if (stat.isDirectory()) {
                result.type = 'directory';
            }
            cb(err, result);
        }
    });
}

function openFile(filePath) {
    shell.openItem(filePath);
}

function inspectAndDescribeFiles(folderPath, files, cb) {
    async.map(files, (file, asyncCb) => {
        let resolvedFilePath = path.resolve(folderPath, file);
        inspectAndDescribeFile(resolvedFilePath, asyncCb);
    }, cb);
}

module.exports = {
    getUsersHomeFolder,
    getFilesInFolder,
    openFile,
    inspectAndDescribeFiles
}
