const fs = require('node:fs');
const express = require("express");

const serverStoragePath = 'server-storage';
const serverStorageUploadsPath = 'server-storage/uploads';
const serverStorageAvatarsPath = 'server-storage/uploads/avatars';
const serverStorageBackgroundsPath = 'server-storage/uploads/backgrounds';

const applyServerStorageMiddleware = (app, diContainer) => {
    if (!fs.existsSync(serverStorageAvatarsPath)) {
        fs.mkdirSync(serverStorageAvatarsPath, { recursive: true });
    }

    if (!fs.existsSync(serverStorageBackgroundsPath)) {
        fs.mkdirSync(serverStorageBackgroundsPath);
    }

    app.use('/uploads', express.static(serverStorageUploadsPath));
};


module.exports = applyServerStorageMiddleware;