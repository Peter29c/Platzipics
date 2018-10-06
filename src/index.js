'use strict'

// Instanciación de los objetos app y BrowserWindow
// const { app, BrowserWindow } = require('electron');
// const devTools = require('./devtools');
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import devTools from './devtools';
import isImage from 'is-image';
import filesize from 'filesize';
import fs from 'fs';
import path from 'path';

let win;

if (process.env.NODE_ENV === 'development') {
    devTools();
}

// Imprimir un mensaje en consola antes de salir
app.on('before-quit', () => {
    console.log('Saliendo...');
});

// Ejecutar ordenes cuando la aplicación esté lista
app.on('ready', () => {

    // Crear nueva ventana
    win = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Ola ke ase?',
        center: true,
        maximizable: false,
        show: false
    });

    win.once('ready-to-show', () => {
        win.show();
    });

   /*  win.on('move', () => {
        const position = win.getPosition();
        console.log(`La posición es ${position}`);
    }); */

    // Detectar el cierre de ventana para cerrar aplicación
    win.on('closed', () => {
        win = null; 
        app.quit();
    });

    // Carga una url desde el folder renderer
    win.loadURL(`file://${__dirname}/renderer/index.html`);
    win.toggleDevTools();

});

// Se crea el canal y se queda escuchando (Servidor)
ipcMain.on('open-directory', (event) => {
    console.log('Se recibio open-directory');
    event.sender.send('load-images', 'Ola ke ase? (Desde el Servidor)');
    dialog.showOpenDialog(win, {
        title: 'Seleccione la nueva ubicación',
        buttonLabel: 'Abrir ubicación',
        properties: ['openDirectory']
    },
    (dir) => {
        const images = [];
        if (dir) {
            fs.readdir(dir[0], (err, files) => {
                if (err) {
                    console.log(err);
                }
                else {
                    for (let i = 0; i < files.length; i++) {
                        if (isImage(files[i])) {
                            let imageFile = path.join(dir[0], files[i]);
                            let stats = fs.statSync(imageFile);
                            let size =filesize(stats.size, {round: 0});
                            images.push({ filename: files[i], src: `file://${imageFile}`, size: size});
                        }
                    }
                    event.sender.send('load-images',images);
                }
            });
        }
    });
});

