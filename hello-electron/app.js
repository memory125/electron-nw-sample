'use strict';

const fs = require('fs');
const async = require('async');
const osenv = require('osenv');
const path = require('path');

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

function inspectAndDescribeFiles(folderPath, files, cb) {
    async.map(files, (file, asyncCb) => {
        let resolvedFilePath = path.resolve(folderPath, file);
        inspectAndDescribeFile(resolvedFilePath, asyncCb);
    }, cb);
}

function displayFiles(err, files) {
    if (err) {
        return alter('Sorry, we could not display your home files');
    }

    files.forEach((file) => {console.log(file)});
}

function main() {
    const folderPath = getUsersHomeFolder();
    getFilesInFolder(folderPath, (err, files) => {
        if (err) {
            return alter('Sorry, we could not load your home folder');
        }
        // 1st -loop the folder
        files.forEach((file) => {
            console.log(folderPath + '/' + file);
        });

        // 2nd - inspect directory or file
        inspectAndDescribeFiles(folderPath, files, displayFiles);        
    });
}

main();