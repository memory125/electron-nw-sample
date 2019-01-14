'use strict';

const remote = require('electron').remote;

function toggleKiosk() {
    const button = document.getElementById('kiosk');
    const win = remote.getCurrentWindow();
    if (win.isKiosk()) {
        win.setKiosk(false);
        button.innerText = 'Enter Kisok Mode';
    } else {
        win.setKiosk(true);
        button.innerText = 'Exit Kisok Mode';
    }
}