'use strict';

const electron = require('electron');
const app = electron.app;                                               
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

// let img_url = './pig-2019.jpg';
// var img = new Image();

// img.src = img_url;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
    // default browserwindow
    mainWindow = new BrowserWindow();
    // this size is for pig-2019
//   mainWindow = new BrowserWindow({
//       height: 880,
//       width: 1080,
//       frame: false,
//       resizable: false
//       //webPreferences: {nodeIntegration: false}
//   });

// this size if for poems
// mainWindow = new BrowserWindow({
//     height: 980,
//     width: 1150,
//     frame: false,
//     resizable: false
//     //webPreferences: {nodeIntegration: false}
// });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', () => { mainWindow = null; });
});
