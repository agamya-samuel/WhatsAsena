/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');

const fs = require('fs');

Asena.addCommand({pattern: 'kickme', fromMe: true, desc: 'Yazdığınız gruptan sizi çıkarır.', onlyGroup: true}, (async (message, match) => {    
    await message.sendMessage('```Güle Güle! Ben gidiyorum 🤠```');
    await message.client.groupLeave(message.jid);
}));

Asena.addCommand({pattern: 'pp', fromMe: true, desc: 'Yanıt verdiğiniz fotoğrafı profil fotoğrafınız yapar.'}, (async (message, match) => {    
    if (message.reply_message === false || message.reply_message.image === false) return await message.sendMessage('*Bana bir fotoğraf ver!*');
    
    var load = await message.reply('```Profil fotoğrafı yapılıyor...```');
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    await message.client.updateProfilePicture(message.client.user.jid, fs.readFileSync(location));
    await load.delete();
}));