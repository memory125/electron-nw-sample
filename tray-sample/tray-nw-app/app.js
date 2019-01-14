'use strict';

const gui = require('nw.gui');
const tray = new gui.Tray({icon: 'golden-star.png'});
const menu = new gui.Menu();

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
    document.getElementById('title').innerText = note.title;
    document.getElementById('contents').innerText = note.contents;
}

function appendNoteToMenu(note) {
    const menuItem = new gui.MenuItem({
        label: note.title,
        click: () => {displayNote(note);}
    });

    menu.append(menuItem);
}

notes.map(appendNoteToMenu);

document.addEventListener('DOMContentLoaded', () => {
    displayNote(notes[0]);
});

tray.menu = menu;