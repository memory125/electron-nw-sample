'use strict';

const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;
const Tray = electron.Tray;
const BrowserWindow = electron.BrowserWindow;

let appIcon = null;
let mainWindow = null;

const notes = [
    {
        title: 'Todo List',
        contents: 'Grocery shopping\n Pick up kids\n Send birthday party invites'
    },
    {
        title: 'Grocery List',
        contents: 'Milk\n Eggs\n Double Cream'
    },
    {
        title: 'Birthday Invites',
        contents: 'Dave\n Sue\n Sally\n John & Joanna\n Chris & Georgina\n Elliot\n'
    },
];

function displayNote(note) {
    mainWindow.webContents.send('displayNote', note);
}

function addNoteToMenu(note) {
    return {
        label: note.title,
        type: 'normal',
        click: () => {displayNote(note);}
    };
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
    appIcon = new Tray('icon.png');
    let contextMenu = Menu.buildFromTemplate(notes.map(addNoteToMenu));
    appIcon.setToolTip('Notes App');
    appIcon.setContextMenu(contextMenu);

    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.webContents.on('dom-ready', () => {
        displayNote(notes[0]);
    });
});
