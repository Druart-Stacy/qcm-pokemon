const { app, BrowserWindow } = require('electron');

function createWindow () {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    autoHideMenuBar: true // Cache la barre de menu classique
  });

  win.loadFile('index.html'); // Charge votre fichier HTML principal
}

app.whenReady().then(createWindow);