'use strict'

// Instanciación de los objetos app y BrowserWindow
// const { app, BrowserWindow } = require('electron');
// const devTools = require('./devtools');
import { app, BrowserWindow } from 'electron';
import devTools from './devtools';

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
    let win = new BrowserWindow({
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

    win.loadURL(`file://${__dirname}/renderer/index.html`);
    win.toggleDevTools();

});

