// utils.js

function convertBase64ToBuffer(base64String) {
    return Buffer.from(base64String, 'base64');
}

module.exports = { convertBase64ToBuffer };
