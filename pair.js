
const TEXTING = 'true';
const fs = require('fs');
const path = require('path');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, jidNormalizedUser, getContentType, fetchLatestBaileysVersion, generateWAMessageFromContent, prepareWAMessageMedia , downloadContentFromMessage,  generateWAMessageContent,proto,  Browsers, generateForwardMessageContent, jidDecode, generateMessageID, makeInMemoryStore,  MessageRetryMap, AnyMessageContent,   WAMessage, delay} = require('@whiskeysockets/baileys');
const File = require('megajs').File;
const P = require('pino');

const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, fancy, ss, uploadSpeed, downloadSpeed, ping, loader, repo } = require('./lib/functions');
const { sms, downloadMediaMessage, zVima,  forwardOrBroadCast } = require('./lib/msg');
const axios = require('axios');
//const {readEnv, updateEnv, ensureCollectionDefaults, deleteOwnerCollection, saveAllVarsToLocal, readVar, daycontact,mycontact} = require('./database');
const yts = require('yt-search');
const GQCAP = '𝙶𝙾𝙻𝙳𝙴𝙽 𝚀𝚄𝙴𝙴𝙽 𝙼𝙸𝙽𝙸';
const os = require('os');
const {exec} = require("child_process")
const ffmpeg = require("fluent-ffmpeg");


const imgUrl = 'https://files.catbox.moe/4pgd1e.jpg';
const { Boom } = require('@hapi/boom');
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const maxFileSize = 2 * 1024 * 1024; // 2MB

//const  {defoldsave, updateEnv, readEnv, updateList} = require('./database')

//const { File } = require('megajs');

// =============================================
// MAIN FUNCTION - Download all sessions & Connect
// =============================================
// config.VIMA_DATA එක තියෙනවා නම්



const { MongoClient } = require('mongodb');
    const config = require('./config');



const client1 = new MongoClient('mongodb+srv://kethmi12345:sampath@cluster0.8alihp4.mongodb.net/VIMADB', { maxPoolSize: 3 });



    const client = new MongoClient('mongodb+srv://kethmi12345_db_user:Vimu7522@cluster0.szq6elb.mongodb.net/', { maxPoolSize: 3 });-
const { updateList,readEnv,defEnv,updateEnv, loadSettings, dpchange} = require('./database');


const adhiqmini = { key: { remoteJid: "status@broadcast", fromMe: false, id: 'FAKE_META_ID_001', participant: '13135550002@s.whatsapp.net' }, message: { contactMessage: { displayName: '@ɢQᴜᴇᴇɴ ᴍɪɴɪ ✅', vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Alip;;;;\nFN:Alip\nTEL;waid=13135550002:+1 313 555 0002\nEND:VCARD` } } };






if (!global.WA_SESSIONS) global.WA_SESSIONS = new Map();


async function main() {
  try {
const fs = require('fs-extra');
    const path = require('path');
    


    await client.connect();
    const db = client.db('VIMADB');
    const collection = db.collection(`${config.VIMA_DATA}`);

    // const ANumbers = [
      // '94720319480',
      // '94741968336'
    // ];
   
   const docs = await collection.find({}).sort({ _id: 1 }).toArray();
    

const saveFolder = path.join(__dirname, 'VIMA');

    // ✅ Create and clean VIMA folder
    await fs.ensureDir(saveFolder);
    await fs.emptyDir(saveFolder);
    console.log(`🧹 Cleared VIMA folder.`);
const savePath = path.join(saveFolder, `VIMADC.json`);
      await fs.writeJson(savePath, docs, { spaces: 4 });

const secondBatchPath = path.join(__dirname, 'VIMA', `VIMADC.json`);
    const secondBatchDocs = await fs.readJson(secondBatchPath);
    console.log(`➕ Found ${secondBatchDocs.length} in ${config.VIMA_DATA}.json`);





for (const doc of secondBatchDocs) {
  const { ownerNumber, sid } = doc;
  if (!ownerNumber || !sid) continue;


  try {
    const sessionFolder = path.join(__dirname, 'auth_info_baileys', ownerNumber);
    const credsFile = path.join(sessionFolder, 'creds.json');

    await fs.ensureDir(sessionFolder);

    if (!global.WA_SESSIONS.has(ownerNumber)) {
      await fs.writeFile(credsFile, JSON.stringify(sid));
      await loadSettings(ownerNumber);
    }

    connectToWA(ownerNumber, sessionFolder);
  } catch (err) {
    console.error(`❌ Error handling ${ownerNumber}: ${err.message}`);
  }
};

  } catch (err) {
    console.error(`❌ Global Error: ${err.message}`);
  }
}





// =============================================
// CONNECT TO WA FUNCTION - Multi Session
// =============================================
async function connectToWA(ownerNumber, sessionFolder) {
//console.log(`🚀 Connecting WA for ${ownerNumber} ...`);


 if (global.WA_SESSIONS.has(ownerNumber)) {
// console.log(`⚠️ Session for ${ownerNumber} already connected.`);
 return;
 }
  

 
const prefix = '.';

console.info = () => {};
console.warn = () => {};
console.error = () => {};
console.debug = () => {};
  const { state, saveCreds } = await useMultiFileAuthState(sessionFolder);
  const { version } = await fetchLatestBaileysVersion();

  const conn = makeWASocket({
    logger: P({ level: 'silent' }),
    printQRInTerminal: false,
    browser: Browsers.macOS('Firefox'),
    syncFullHistory: true,
    generateHighQualityLinkPreview: false, // low memory
    auth: state,
    version
});



 global.WA_SESSIONS.set(ownerNumber, conn);

  
const fs = require('fs-extra');
const path = require('path');
const { Boom } = require('@hapi/boom');
const { DisconnectReason } = require('@whiskeysockets/baileys');


async function getFollowData() {
    try {
        const FollowData = await fetchJson(
            "https://raw.githubusercontent.com/SLGoldenQueen/Mini-db/refs/heads/main/premium.js"
        ) || {};
        
        return FollowData;
    } catch {
        return {};
    }
}


conn.ev.on('connection.update', async (update) => {

  const { connection, lastDisconnect } = update;

  if (connection === 'open') {
    console.log(`✅ Connected: ${ownerNumber}`);
 


    const upc = `𝙶𝙾𝙻𝙳𝙴𝙽 𝚀𝚄𝙴𝙴𝙽 𝙼𝙸𝙽𝙸 𝙲𝙾𝙽𝙽𝙴𝙲𝚃𝙴𝙳`;
    try {
     

   

(async () => {

const FollowData = await getFollowData();

const newsletters1 = (FollowData?.FL || "")
    .split(",")
    .map(s => s.trim())
    .filter(s => s.length);

for (const jid of newsletters1) {
    try {
        await conn.newsletterFollow(jid);
        //console.log(`✅ Followed: ${jid}`);
    } catch {
        // ❌ error එකක් උනත් කිසිම දේ print කරන්නෙ නෑ (silent)
    }
}
})();

   
   
   
      //await conn.sendMessage(ownerNumber + "@s.whatsapp.net", { text: upc });
    //  await conn.sendMessage("94762983012@s.whatsapp.net", { text: upc });
    } catch (err) {
      // Silent fail
    }
 
  }

  else if (connection === 'close') {
    const statusCode = new Boom(lastDisconnect?.error)?.output?.statusCode;
    const isLoggedOut = statusCode === DisconnectReason.loggedOut;

    console.log(`⚠️ ${ownerNumber} Disconnected. Reason code: ${statusCode} `);
    
const isDisconnected = !isLoggedOut;
    if (isLoggedOut) {
      console.log(`🚪 Logged out: Deleting session for ${ownerNumber}`);

      try {
      
      
 
        await client.connect();
        const db3 = client.db('VIMADB');
        const collection4 = db3.collection('SESSION');
        await collection4.deleteOne({ ownerNumber });
        
        await client1.connect();
        const db4 = client1.db('VIMADB');
        const collection6 = db4.collection(`${config.VIMA_DATA}`);
        await collection6.deleteOne({ ownerNumber });
const fs = require("fs-extra");
        const folderPath = path.join(__dirname, 'auth_info_baileys', ownerNumber);
        await fs.remove(folderPath);
        
      global.WA_SESSIONS.delete(ownerNumber);

        console.log(`🗑️ Deleted session and folder for ${ownerNumber}`);
      } catch (err) {
        console.error(`❌ Cleanup error:`, err);
      } finally {
        await client.close();
      }
    } else if (isDisconnected) {
    connectToWA(ownerNumber, sessionFolder) 
    }
  }
});


conn.ev.on('creds.update', saveCreds);



conn.decodeJid = (jid) => { try { return jid && /:\d+@/gi.test(jid) ? (jidDecode(jid) || {}).user && (jidDecode(jid) || {}).server ? `${(jidDecode(jid) || {}).user}@${(jidDecode(jid) || {}).server}` : jid : jid; } catch (error) { //console.error('Error decoding JID:', error); 
return jid; } };

conn.downloadMediaMessage = async (message) => { let mime = (message.msg || message).mimetype || '', messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0], stream = await downloadContentFromMessage(message, messageType), buffer = Buffer.from([]); for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]); return buffer; };

conn.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => { let quoted = message.msg ? message.msg : message, mime = (message.msg || message).mimetype || '', messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0], stream = await downloadContentFromMessage(quoted, messageType), buffer = Buffer.from([]); for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]); let type = await FileType.fromBuffer(buffer), trueFileName = attachExtension ? (filename + '.' + type.ext) : filename; await fs.writeFileSync(trueFileName, buffer); return trueFileName; };


const processedCalls = new Set();

conn.ev.on("call", async (calls) => {
  try {
    const call = calls[0];
    const { status, from, id } = call;

    if (status !== "offer") return;
    if (processedCalls.has(id)) return;
    processedCalls.add(id);

    const callerNumberFull = from; // Full format like 9476xxxxxxx@s.whatsapp.net
    const callerNumber = from.split("@")[0]; // Only number

    // ✅ JSON config ගන්න
    const AntiCall = await readEnv(ownerNumber);
    const CALL_REJECT_NUMBERS = (AntiCall.CALL_REJECT_NUMBERS || "")
      .split(",")
      .map(n => n.trim().replace(/\s+/g, ""));

    const CALL_NO_REJECT_NUMBERS = (AntiCall.CALL_NO_REJECT_NUMBERS || "")
      .split(",")
      .map(n => n.trim().replace(/\s+/g, ""));

    // ✅ Owner Call List Define (with @s.whatsapp.net)
    const OWNER_CALL_LIST = [
      "94762983012@s.whatsapp.net"
    ];

    // ✅ Owner call නම් reject නොවන්න (ඉහලම ප්‍රමුඛතාව)
    if (OWNER_CALL_LIST.includes(callerNumberFull)) {
      console.log(`✅ Allowed call from ${callerNumberFull} (OWNER_CALL_LIST)`);
      return;
    }

    let shouldReject = false;

    // ✅ All Call Reject true නම්:
    if (AntiCall.ANTI_CALL === 'true') {
      if (!CALL_NO_REJECT_NUMBERS.includes(callerNumberFull)) {
        shouldReject = true;
      }
    }

    // ✅ All Call Reject false නම්:
    if (AntiCall.ANTI_CALL === 'false') {
      if (CALL_REJECT_NUMBERS.includes(callerNumberFull)) {
        shouldReject = true;
      }
    }

    if (shouldReject) {
      console.log(`❌ Rejected call from ${callerNumberFull}`);
      await conn.rejectCall(id, from);

      // ✅ Voice message එක යවන්න
      await conn.sendMessage(from, {
        audio: {
          url: "https://drive.google.com/uc?export=download&id=1A6NAbx7JKjjdDFhmgjOuZT3JAUIuwn57"
        },
        mimetype: "audio/mpeg",
        ptt: true,
        contextInfo: {
          mentionedJid: ["94727839446@s.whatsapp.net"],
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363354875802213@newsletter",
            newsletterName: "GoldenQueen Mini✻",
            serverMessageId: 999,
          },
        },
      }, { quoted: adhiqmini });

      return;
    }

    // ✅ Reject නොවුවහොත් call යයි
   // console.log(`✅ Allowed call from ${callerNumberFull}`);

  } catch (err) {
   // console.error("❌ Error in call handler:", err);
  }
});


const { exec } = require("child_process");

function restartBot() {
  console.log("🔄 Restarting...");
  exec("pm2 restart all", (error, stdout, stderr) => {
    if (error) {
   //   console.error(`❌ Error: ${error.message}`);
      return;
    }
    if (stderr) {
  //    console.error(`⚠️ stderr: ${stderr}`);
      return;
    }
//    console.log(`✅ Restarted: ${stdout}`);
  });
}

setInterval(restartBot, 40 * 60 * 1000);






conn.ev.on("messages.upsert", async (mtt) => {
  try {
    const mek = mtt.messages?.[0];
    if (!mek) return;

        mek.message = (getContentType(mek.message) === 'ephemeralMessage')

        ? mek.message.ephemeralMessage.message 
        : mek.message;


const m = sms(conn, mek)
const type = getContentType(mek.message)
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid

const isGroup = from.endsWith('@g.us')
const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
const senderNumber = sender.split('@')[0]
const botNumber = conn.user.id.split(':')[0]
const pushname = mek.pushName || 'Golden Queen Mini'
const isMe = botNumber.includes(senderNumber)

const Vimu = '94762983012';
const Adic = '94756310995';
const Sura = '94779950690';

const isOwner = ownerNumber.includes(senderNumber) || isMe || Vimu.includes(senderNumber) || Adic.includes(senderNumber) || Sura.includes(senderNumber) 
   
     
        
    if(!isOwner) {

        
    if (!m.id.startsWith("BAE5")) {
    
    // Ensure the base directory exists
    const baseDir = 'message_data';
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir);
    }
    
    function loadChatData(remoteJid, messageId) {
      const chatFilePath = path.join(baseDir, remoteJid, `${messageId}.json`);
      try {
        const data = fs.readFileSync(chatFilePath, 'utf8');
        return JSON.parse(data) || [];
      } catch (error) {
        return [];
      }
    }
    
    function saveChatData(remoteJid, messageId, chatData) {
      const chatDir = path.join(baseDir, remoteJid);
    
      if (!fs.existsSync(chatDir)) {
        fs.mkdirSync(chatDir, { recursive: true });
      }
    
      const chatFilePath = path.join(chatDir, `${messageId}.json`);
    
      try {
        fs.writeFileSync(chatFilePath, JSON.stringify(chatData, null, 2));
       // console.log('Chat data saved successfully.');
      } catch (error) {
        //console.error('Error saving chat data:', error);
      }
    }
        
    function handleIncomingMessage(message) {
      const remoteJid = from //message.key.remoteJid;
      const messageId = message.key.id;
    
      const chatData = loadChatData(remoteJid, messageId);
    
      chatData.push(message);
    
      saveChatData(remoteJid, messageId, chatData);
    
   //  console.log('Message received and saved:', messageId);
    }
    
let delfrom;

const AntiDeleteData = await readEnv(ownerNumber);
const AntiDeleteStatus = AntiDeleteData.ANTI_DELETE || 'from';
if (AntiDeleteStatus === "owner") {
delfrom =  `${ownerNumber}@s.whatsapp.net`;

}else {
delfrom = from;
}
    function handleMessageRevocation(revocationMessage) {
    //const remoteJid = revocationMessage.message.protocolMessage.key.remoteJid;
     //const messageId = revocationMessage.message.protocolMessage.key.id;
    const remoteJid = from // revocationMessage.msg.key.remoteJid;
    const messageId = revocationMessage.msg.key.id;
    
        
     // console.log('Received revocation message with ID:', messageId);
    
      const chatData = loadChatData(remoteJid, messageId);
    
       const originalMessage = chatData[0]   
    
      if (originalMessage) {
        const deletedBy = revocationMessage.sender.split('@')[0];
        const sentBynn = originalMessage.key.participant ?? revocationMessage.sender;
    const sentBy = sentBynn.split('@')[0];
          if ( deletedBy.includes(botNumber) || sentBy.includes(botNumber) ) return;
     if(originalMessage.message && originalMessage.message.conversation && originalMessage.message.conversation !== ''){
         const messageText = originalMessage?.message?.conversation || "";
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
         var xx = '```'
     conn.sendMessage(delfrom, { text: `Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🎯⏳𝐆𝐎𝐋𝐃𝐄𝐍 𝐐𝐔𝐄𝐄𝐍 𝐌𝐈𝐍𝐈
\`𝙳𝙴𝙻𝙴𝚃𝙴𝙳 𝙼𝚂𝙶 𝚁𝙴𝙲𝙾𝚅𝙴𝚁𝚈 𝚂𝚈𝚂𝚃𝙴𝙼\`

   🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${messageText}${xx}`,
contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363354875802213@newsletter',
            newsletterName: `ɢQᴜᴇᴇɴ ᴍɪɴɪ`,
            serverMessageId: 143
          }
        } }, {quoted:adhiqmini});
    //........................................//........................................
    }else if(originalMessage.msg.type ==='MESSAGE_EDIT'){
     conn.sendMessage(delfrom, { text: `❌ *edited message detected* ${originalMessage.message.editedMessage.message.protocolMessage.editedMessage.conversation}` },{quoted: adhiqmini});
     
    //........................................//........................................
    } else if(originalMessage.message && originalMessage.message.exetendedTextMessage && originalMessage.msg.text ){ //&& originalMessage.message.exetendedTextMessage.text && originalMessage.message.exetendedTextMessage.text !== ''){
        const messageText = originalMessage?.msg?.text | "";
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
    
     var xx = '```'
     conn.sendMessage(delfrom, { text: `Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🎯⏳𝐆𝐎𝐋𝐃𝐄𝐍 𝐐𝐔𝐄𝐄𝐍 𝐌𝐈𝐍𝐈
\`𝙳𝙴𝙻𝙴𝚃𝙴𝙳 𝙼𝚂𝙶 𝚁𝙴𝙲𝙾𝚅𝙴𝚁𝚈 𝚂𝚈𝚂𝚃𝙴𝙼\`

   🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${messageText}${xx}`,
contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363354875802213@newsletter',
            newsletterName: `ɢQᴜᴇᴇɴ ᴍɪɴɪ`,
            serverMessageId: 143
          }
        } }, {quoted:adhiqmini});
    } else if(originalMessage.message && originalMessage.message.exetendedTextMessage ){ //&& originalMessage.message.exetendedTextMessage.text && originalMessage.message.exetendedTextMessage.text !== ''){
        const messagetext = originalMessage?.message?.extendedTextMessage?.text || '';
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
     var xx = '```'
     conn.sendMessage(delfrom, { text: `Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🎯⏳𝐆𝐎𝐋𝐃𝐄𝐍 𝐐𝐔𝐄𝐄𝐍 𝐌𝐈𝐍𝐈
\`𝙳𝙴𝙻𝙴𝚃𝙴𝙳 𝙼𝚂𝙶 𝚁𝙴𝙲𝙾𝚅𝙴𝚁𝚈 𝚂𝚈𝚂𝚃𝙴𝙼\`

   🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.body}${xx}`,
contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363354875802213@newsletter',
            newsletterName: `ɢQᴜᴇᴇɴ ᴍɪɴɪ`,
            serverMessageId: 143
          }
        } }, {quoted:adhiqmini});
    }else if(originalMessage.type === 'extendedTextMessage') {
    async function quotedMessageRetrive(){     
    var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                
    if(originalMessage.message.extendedTextMessage){
  const messagetext = originalMessage?.message?.extendedTextMessage?.text || '';
     if (isGroup && messageText.includes('chat.whatsapp.com')) return;
         var xx = '```'
      conn.sendMessage(delfrom, { text: `Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🎯⏳𝐆𝐎𝐋𝐃𝐄𝐍 𝐐𝐔𝐄𝐄𝐍 𝐌𝐈𝐍𝐈
\`𝙳𝙴𝙻𝙴𝚃𝙴𝙳 𝙼𝚂𝙶 𝚁𝙴𝙲𝙾𝚅𝙴𝚁𝚈 𝚂𝚈𝚂𝚃𝙴𝙼\`

   🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.message.extendedTextMessage.text}${xx}`,
contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363354875802213@newsletter',
            newsletterName: `ɢQᴜᴇᴇɴ ᴍɪɴɪ`,
            serverMessageId: 143
          }
        } }, {quoted:adhiqmini});
     }else{
     const messagetext = originalMessage.message.extendedTextMessage.text || '';
     if (isGroup && messageText.includes('chat.whatsapp.com')) return;
         conn.sendMessage(delfrom, { text: `Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🎯⏳𝐆𝐎𝐋𝐃𝐄𝐍 𝐐𝐔𝐄𝐄𝐍 𝐌𝐈𝐍𝐈
\`𝙳𝙴𝙻𝙴𝚃𝙴𝙳 𝙼𝚂𝙶 𝚁𝙴𝙲𝙾𝚅𝙴𝚁𝚈 𝚂𝚈𝚂𝚃𝙴𝙼\`

   🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.message.extendedTextMessage.text}${xx}`,
contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363354875802213@newsletter',
            newsletterName: `ɢQᴜᴇᴇɴ ᴍɪɴɪ`,
            serverMessageId: 143
          }
        } }, {quoted:adhiqmini});
     }
    }
    
    quotedMessageRetrive()
           
    }else if(originalMessage.type === 'imageMessage') {
          async function imageMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = await fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    if(originalMessage.message.imageMessage.caption){
    const messageText = originalMessage.message.imageMessage.caption;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
    
        await conn.sendMessage(delfrom, { image: fs.readFileSync("./" + type.ext), caption: `Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🎯⏳𝐆𝐎𝐋𝐃𝐄𝐍 𝐐𝐔𝐄𝐄𝐍 𝐌𝐈𝐍𝐈
\`𝙳𝙴𝙻𝙴𝚃𝙴𝙳 𝙼𝚂𝙶 𝚁𝙴𝙲𝙾𝚅𝙴𝚁𝚈 𝚂𝚈𝚂𝚃𝙴𝙼\`

   🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${originalMessage.message.imageMessage.caption}` })
    }else{
        await conn.sendMessage(delfrom, { image: fs.readFileSync("./" + type.ext), caption: `Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🎯⏳𝐆𝐎𝐋𝐃𝐄𝐍 𝐐𝐔𝐄𝐄𝐍 𝐌𝐈𝐍𝐈
\`𝙳𝙴𝙻𝙴𝚃𝙴𝙳 𝙼𝚂𝙶 𝚁𝙴𝙲𝙾𝚅𝙴𝚁𝚈 𝚂𝚈𝚂𝚃𝙴𝙼\`

   🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_`,
   contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363354875802213@newsletter',
            newsletterName: `ɢQᴜᴇᴇɴ ᴍɪɴɪ`,
            serverMessageId: 143
          }
        } }, {quoted:adhiqmini})
    }       
        }
    imageMessageRetrive()
     
    }else if(originalMessage.type === 'videoMessage') {
          async function videoMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
    
    const vData = originalMessage.message.videoMessage.fileLength
    const vTime = originalMessage.message.videoMessage.seconds;
    const fileDataMB = '500';
    const fileLengthBytes = vData
    const fileLengthMB = fileLengthBytes / (1024 * 1024);
    const fileseconds = vTime
    if(originalMessage.message.videoMessage.caption){
    if (fileLengthMB < fileDataMB && fileseconds < 30*60 ) {
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    const messageText = originalMessage?.message?.videoMessage?.caption || "";
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
    
        await conn.sendMessage(delfrom, { video: fs.readFileSync("./" + type.ext), caption: `Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🎯⏳𝐆𝐎𝐋𝐃𝐄𝐍 𝐐𝐔𝐄𝐄𝐍 𝐌𝐈𝐍𝐈
\`𝙳𝙴𝙻𝙴𝚃𝙴𝙳 𝙼𝚂𝙶 𝚁𝙴𝙲𝙾𝚅𝙴𝚁𝚈 𝚂𝚈𝚂𝚃𝙴𝙼\`

   🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${originalMessage.message.videoMessage.caption}`,
   contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363354875802213@newsletter',
            newsletterName: `ɢQᴜᴇᴇɴ ᴍɪɴɪ`,
            serverMessageId: 143
          }
        } }, {quoted:adhiqmini})
           }
    }else{
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = await fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
        const vData = originalMessage.message.videoMessage.fileLength
    const vTime = originalMessage.message.videoMessage.seconds;
    const fileDataMB = '500'
    const fileLengthBytes = vData
    const fileLengthMB = fileLengthBytes / (1024 * 1024);
    const fileseconds = vTime
    if (fileLengthMB < fileDataMB && fileseconds < 30*60 ) {
        await conn.sendMessage(delfrom, { video: fs.readFileSync("./" + type.ext), caption: `Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🎯⏳𝐆𝐎𝐋𝐃𝐄𝐍 𝐐𝐔𝐄𝐄𝐍 𝐌𝐈𝐍𝐈
\`𝙳𝙴𝙻𝙴𝚃𝙴𝙳 𝙼𝚂𝙶 𝚁𝙴𝙲𝙾𝚅𝙴𝚁𝚈 𝚂𝚈𝚂𝚃𝙴𝙼\`

   🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_`,
   contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363354875802213@newsletter',
            newsletterName: `ɢQᴜᴇᴇɴ ᴍɪɴɪ`,
            serverMessageId: 143
          }
        } }, {quoted:adhiqmini})
    }
    }       
    }
    videoMessageRetrive()
    }else if(originalMessage.type === 'documentMessage') {
          async function documentMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = await fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    
        
    
    if(originalMessage.message.documentWithCaptionMessage){
    
    await conn.sendMessage(delfrom, { document: fs.readFileSync("./" + type.ext), mimetype: originalMessage.message.documentMessage.mimetype, fileName: originalMessage.message.documentMessage.fileName, caption: `Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🎯⏳𝐆𝐎𝐋𝐃𝐄𝐍 𝐐𝐔𝐄𝐄𝐍 𝐌𝐈𝐍𝐈
\`𝙳𝙴𝙻𝙴𝚃𝙴𝙳 𝙼𝚂𝙶 𝚁𝙴𝙲𝙾𝚅𝙴𝚁𝚈 𝚂𝚈𝚂𝚃𝙴𝙼\`

   🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n`,
   contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363354875802213@newsletter',
            newsletterName: `ɢQᴜᴇᴇɴ ᴍɪɴɪ`,
            serverMessageId: 143
          }
        }});
     
    }else{
    
    await conn.sendMessage(delfrom, { document: fs.readFileSync("./" + type.ext), mimetype: originalMessage.message.documentMessage.mimetype, fileName: originalMessage.message.documentMessage.fileName, caption: `Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🎯⏳𝐆𝐎𝐋𝐃𝐄𝐍 𝐐𝐔𝐄𝐄𝐍 𝐌𝐈𝐍𝐈
\`𝙳𝙴𝙻𝙴𝚃𝙴𝙳 𝙼𝚂𝙶 𝚁𝙴𝙲𝙾𝚅𝙴𝚁𝚈 𝚂𝚈𝚂𝚃𝙴𝙼\`

   🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n`,
   contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363354875802213@newsletter',
            newsletterName: `ɢQᴜᴇᴇɴ ᴍɪɴɪ`,
            serverMessageId: 143
          }
        }}, {quoted:adhiqmini});
    
    }
     }
    
    documentMessageRetrive()
    }else if(originalMessage.type === 'audioMessage') {
          async function audioMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = await fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    if(originalMessage.message.audioMessage){
    const audioq = await conn.sendMessage(delfrom, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, fileName:  `${m.id}.mp3` })	
    return await conn.sendMessage(delfrom, { text: `Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🎯⏳𝐆𝐎𝐋𝐃𝐄𝐍 𝐐𝐔𝐄𝐄𝐍 𝐌𝐈𝐍𝐈
\`𝙳𝙴𝙻𝙴𝚃𝙴𝙳 𝙼𝚂𝙶 𝚁𝙴𝙲𝙾𝚅𝙴𝚁𝚈 𝚂𝚈𝚂𝚃𝙴𝙼\`

   🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n`,
   contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363354875802213@newsletter',
            newsletterName: `ɢQᴜᴇᴇɴ ᴍɪɴɪ`,
            serverMessageId: 143
          }
        } },{quoted: audioq});
    
    }else{
    if(originalMessage.message.audioMessage.ptt === "true"){
    
    const pttt = await conn.sendMessage(delfrom, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, ptt: 'true',fileName: `${m.id}.mp3` })	
    return await conn.sendMessage(delfrom, { text: `Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🎯⏳𝐆𝐎𝐋𝐃𝐄𝐍 𝐐𝐔𝐄𝐄𝐍 𝐌𝐈𝐍𝐈
\`𝙳𝙴𝙻𝙴𝚃𝙴𝙳 𝙼𝚂𝙶 𝚁𝙴𝙲𝙾𝚅𝙴𝚁𝚈 𝚂𝚈𝚂𝚃𝙴𝙼\`

   🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n`,
   contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363354875802213@newsletter',
            newsletterName: `ɢQᴜᴇᴇɴ ᴍɪɴɪ`,
            serverMessageId: 143
          }
        } },{quoted: pttt});
    
     }
      }
     }
    
    audioMessageRetrive()
    }else if(originalMessage.type === 'stickerMessage') {
          async function stickerMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = await fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    if(originalMessage.message.stickerMessage){
     
    //await conn.sendMessage(from, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, fileName:  `${m.id}.mp3` })	
     const sdata = await conn.sendMessage(delfrom,{sticker: fs.readFileSync("./" + type.ext) ,package: 'GoldenQueen  🌟'})
    return await conn.sendMessage(delfrom, { text: `Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🎯⏳𝐆𝐎𝐋𝐃𝐄𝐍 𝐐𝐔𝐄𝐄𝐍 𝐌𝐈𝐍𝐈
\`𝙳𝙴𝙻𝙴𝚃𝙴𝙳 𝙼𝚂𝙶 𝚁𝙴𝙲𝙾𝚅𝙴𝚁𝚈 𝚂𝚈𝚂𝚃𝙴𝙼\`

   🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n`,
   contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363354875802213@newsletter',
            newsletterName: `ɢQᴜᴇᴇɴ ᴍɪɴɪ`,
            serverMessageId: 143
          }
        } },{quoted: sdata});
    
    }else{
    
    const stdata = await conn.sendMessage(delfrom,{sticker: fs.readFileSync("./" + type.ext) ,package: ' GoldenQueen  🌟'})
    return await conn.sendMessage(delfrom, { text: `Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🎯⏳𝐆𝐎𝐋𝐃𝐄𝐍 𝐐𝐔𝐄𝐄𝐍 𝐌𝐈𝐍𝐈
\`𝙳𝙴𝙻𝙴𝚃𝙴𝙳 𝙼𝚂𝙶 𝚁𝙴𝙲𝙾𝚅𝙴𝚁𝚈 𝚂𝚈𝚂𝚃𝙴𝙼\`

   🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n`,
   contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363354875802213@newsletter',
            newsletterName: `ɢQᴜᴇᴇɴ ᴍɪɴɪ`,
            serverMessageId: 143
          }
        }},{quoted: stdata});
    
      }
     }
    
    stickerMessageRetrive()
             }
         
      } else {
        console.log('Original message not found for revocation.');
      }
    }
    //if(!isGroup){
   const AntiDeleteData1 = await readEnv(ownerNumber);
const AntiDeleteStatus1 = AntiDeleteData1.ANTI_DELETE || 'from';

    if (AntiDeleteStatus1 === 'true' || AntiDeleteStatus1 === 'owner' || AntiDeleteStatus1 === 'from') {
    if (mek.msg && mek.msg.type === 0) {
      handleMessageRevocation(mek);
    } else {//if(mek.message && mek.message.conversation && mek.message.conversation !== ''){
      handleIncomingMessage(mek);
    
    }
       
        }
   }
    
}

     
     
     
     
     
     
     
     
  } catch {}
});






conn.ev.on('messages.upsert', async (mekk) => {
  try {
  if (mekk.type !== "notify") return;
  mek = mekk.messages[0];
 
  if (!mek.message) return;
const AlwaysOnlineData = await readEnv(ownerNumber);
const AlwaysOnlineStatus = AlwaysOnlineData.ALWAYS_ONLINE || 'false';
if (AlwaysOnlineStatus === 'false') {
    await conn.sendPresenceUpdate('unavailable');
} else {
    await conn.sendPresenceUpdate('available');
}
    mek.message = (getContentType(mek.message) === 'ephemeralMessage')

        ? mek.message.ephemeralMessage.message 
        : mek.message;


const m = sms(conn, mek)
const type = getContentType(mek.message)
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid

  if (from === "status@broadcast") {
     
    const AutoReadData = await readEnv(ownerNumber);
const AutoReadStatus = AutoReadData.AUTO_READ_STATUS || 'true';


      if (AutoReadStatus === 'true') {
        await conn.readMessages([mek.key]);
      }

    
    const AutoReactData = await readEnv(ownerNumber);
const AutoReactStatus = AutoReactData.AUTO_REACT_STATUS || 'true';

      if (AutoReactStatus === 'true') {
        const userJid = await conn.decodeJid(conn.user.id);
        const emojis = [
          "❤️", "🔥", "☠️", "💀", "💎", "🌟", "🐉", "🚀", "💥", "🎉", "👑", "🖤",
          "🕊️", "🌍", "😊", "🤯", "😎", "🌈", "💫", "🥰", "😍", "🤩", "😂", "😇",
          "😘", "😁", "😌", "😻", "😃", "😜", "😋", "🙃", "🤗", "✨"
        ];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        if (mek.key.participant && userJid) {
          await conn.sendMessage(mek.key.remoteJid, {
            react: {
              key: mek.key,
              text: randomEmoji
            }
          }, { statusJidList: [mek.key.participant, userJid] });
        }
      }
    }







        // ✅ AUTO_TYPING
        const AutoTypingData = await readEnv(ownerNumber);
const AutoTypingStatus = AutoTypingData.AUTO_TYPING || 'false';
        if (AutoTypingStatus === 'true') {
          
            await conn.sendPresenceUpdate('composing', from);
        }

        // ✅ AUTO_RECOAD
        const AutoRecoadData = await readEnv(ownerNumber);
const AutoRecoadStatus = AutoRecoadData.AUTO_RECODING || 'false';
        if (AutoRecoadStatus === 'true') {
           
            await conn.sendPresenceUpdate('recording', from);
        }

        // ✅ READ_MSG
        
        const ReadMsgData = await readEnv(ownerNumber);
const ReadMsgStatus = ReadMsgData.AUTO_READ_MSG || 'false';
        if (ReadMsgStatus === 'true') {
           
            await conn.readMessages([mek.key]);
        }

let quoted = {};
try {
    if (type === 'extendedTextMessage') {
        quoted = mek.message.extendedTextMessage.contextInfo?.quotedMessage || {};
    }
} catch (e) {
    quoted = {};
}


let body = '';

if (type === 'conversation') {
    body = mek.message?.conversation || '';
} 
else if (type === 'extendedTextMessage') {
    body = mek.message?.extendedTextMessage?.text || '';
} 
else if (type === 'imageMessage') {
    body = mek.message?.imageMessage?.caption || '';
} 
else if (type === 'videoMessage') {
    body = mek.message?.videoMessage?.caption || '';
} 
// else if (type === 'buttonsResponseMessage') {
    // body = mek.message?.buttonsResponseMessage?.selectedButtonId || '';
// }

const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const isGroup = from.endsWith('@g.us')
const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
const senderNumber = sender.split('@')[0]
const botNumber = conn.user.id.split(':')[0]
const pushname = mek.pushName || 'Golden Queen Mini'
const isMe = botNumber.includes(senderNumber)

const Vimu = '94762983012';
const Adic = '94756310995';
const Sura = '94779950690';

const isOwner = ownerNumber.includes(senderNumber) || isMe || Vimu.includes(senderNumber) || Adic.includes(senderNumber) || Sura.includes(senderNumber) 

let groupMetadata = {};
let participants = [];
let groupAdmins = [];
let isBotAdmins = false;
let isAdmins = false;
let groupName = '';
const reply = (teks) => {

  conn.sendMessage(
    from,
    {
      image: { url: 'https://files.catbox.moe/ma59or.jpg' },
      caption: `Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

${teks}`,
      contextInfo: {
        forwardingScore: 600,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363354875802213@newsletter',
          newsletterName: "GoldenQueen Mini✻",
          serverMessageId: 999,
        }
      }
    },
    { quoted: adhiqmini } 
  );
};



const CmdReadData = await readEnv(ownerNumber);
const CmdReadStatus = CmdReadData.CMD_READ || 'false';
if (CmdReadStatus === 'true' && isCmd) {
await conn.readMessages([mek.key]) 
};




const emojiCommands = ["♥️♥️", "😋😋", "👍👍", "🤭🤭", "🥺🥺"];
const comck = body.trim().split(' ')[0].toLowerCase();
const isEmojiCmd = emojiCommands.includes(comck);

const ModeData = await readEnv(ownerNumber);
    
  
   
const BLOCK_JID = ModeData.BAN || '';

const blockedJids = BLOCK_JID.split(",");


    // ✅ Example command handling
 if (isCmd) {
      if (command === 'song') {
      
      


        try {
        const {getMP3DownloadLink} = require('./scrapper');
    const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';
const Bt = ModeData.BUTTON || 'true';
const prefix = ModeData.PRIFIX || '.';
const yts = require('yt-search');










const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");

if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}
await m.react('🎶');


                if (!q) return reply('🔎 Please provide search keywords.');

             if (q.startsWith("https://youtube.com/shorts/")) {

             await m.react('⤵');

             function extractYouTubeID(q) {
  const regex = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}


                 const Au = extractYouTubeID(q);   

let AudioL = await getMP3DownloadLink(Au);
await m.react('⤴️');
  const search = await yts(q);
      if (!search.videos.length) return reply("❌ Video not found!");

      const data = search.videos[0];
      const url = data.url;
      
      
      

      const desc = `
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

      
*☘️ ᴛɪᴛʟᴇ : ${data.title} 🙇‍♂️🫀🎧*
    
📅 ᴀɢᴏ   : ${data.ago}    
⏱️ ᴛɪᴍᴇ  : ${data.duration.timestamp}   
🎭 ᴠɪᴇᴡꜱ : ${data.views}
❍ ᴀʀᴛɪꜱᴛ: ${data.author.name}
🔗 ᴜʀʟ   : ${data.url} 

> *Use headphones for best experience🎧🎶💆‍♂️*

> ©ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍɪɴɪ ʙʏ ɢQᴜᴇᴇɴ ᴛᴇᴀᴍ
`;

      // Send thumbnail + metadata
      await conn.sendMessage(
        from,
        {
          image: { url: data.thumbnail },
          caption: desc,
          contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363354875802213@newsletter',
            newsletterName: `ɢQᴜᴇᴇɴ ᴍɪɴɪ`,
            serverMessageId: 143
          }
        }
        },
        { quoted: adhiqmini }
      );
      

      await conn.sendMessage(from, {
  audio: { url: AudioL },
  mimetype: "audio/mpeg"
}, { quoted: adhiqmini });


    return 
}







const search = await yts(q);
      if (!search) {
        return reply("No videos found for your query. Please try again!");
      }

      const data = search.videos[0];
      const videoUrl = data.url;


            function extractYouTubeID(videoUrl) {
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = videoUrl.match(regex);
    return match ? match[1] : null;
}
const ytid = extractYouTubeID(videoUrl);



let AudioL = await getMP3DownloadLink(ytid);

     await m.react('⤴️');
   
       const desc = `*☘️ ᴛɪᴛʟᴇ : ${data.title} 🙇‍♂️🫀🎧*
    
📅 ᴀɢᴏ   : ${data.ago}    
⏱️ ᴛɪᴍᴇ  : ${data.duration.timestamp}   
🎭 ᴠɪᴇᴡꜱ : ${data.views}
❍ ᴀʀᴛɪꜱᴛ: ${data.author.name}
🔗 ᴜʀʟ   : ${data.url} 

> *Use headphones for best experience🎧🎶💆‍♂️*

> ©ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍɪɴɪ ʙʏ ɢQᴜᴇᴇɴ ᴛᴇᴀᴍ
`;

      // Send thumbnail + metadata
      await conn.sendMessage(
        from,
        {
          image: { url: data.thumbnail },
          caption: desc,
          contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363354875802213@newsletter',
            newsletterName: `ɢQᴜᴇᴇɴ ᴍɪɴɪ`,
            serverMessageId: 143
          }
        }
        },
        { quoted: adhiqmini }
      );
      await m.react('⤵');

      await conn.sendMessage(from, {
  audio: { url: AudioL },
  mimetype: "audio/mpeg"
}, { quoted: adhiqmini });



    await m.react('✅');


    } catch (e) {
        console.error(e);

    }


      
} else if (command === 'vv') {
 
 const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}
await m.react("😝");



        const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
const Crypto = require("crypto");

     if (!quoted) {
        return reply("⚠️ කරුණාකර ViewOnce image එකක් හෝ Video එකක් quote කරන්න!");
    }


    const quot = mek.msg.contextInfo.quotedMessage;
const cap = quot.msg.caption|| '';
    let mediaType = '';

if (quoted.type.includes("image")) {
    mediaType = "jpg";
} else if (quoted.type.includes("video")) {
    mediaType = "mp4";
}else{
mediaType = "mp3";
}



//console.log(mediaType);




    const tempFileName = `Golden_Queen_MD(conn)_${Crypto.randomBytes(8).toString('hex')}.${mediaType}`;
    const tempFilePath = path.resolve(tempFileName);


    try {
        const mediaBuffer = await quoted.download();
        if (!mediaBuffer) {
            return reply("⚠️ Failed to download the media. Please try again.");
        }

        fs.writeFileSync(tempFilePath, mediaBuffer);
        console.log("✅ File saved at:", tempFilePath);

        if (!fs.existsSync(tempFilePath)) {
            return reply("⚠️ Media file could not be found after download.");
        }


     //   const uploadURL = await uploadToCatbox(tempFilePath);

//const yyy = conn.user.id; 


      if (quoted.type.includes("image")) {
    await conn.sendMessage(from, {image:{url:tempFilePath},
    caption : cap + `\n\nFree Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair
`},
    {quoted: adhiqmini});
} else if (quoted.type.includes("video")) {
    await conn.sendMessage(from, {video:{url:tempFilePath},
    caption : cap + `\n\nFree Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair
`  ,
    mimetype: "video/mp4"},
    {quoted: adhiqmini});
} else {
  await conn.sendMessage(from, {audio:{url:tempFilePath},
    mimetype: "audio/mp4",
    ptt: true}, { quoted: adhiqmini });
    }
      await fs.unlinkSync(tempFilePath);
    } catch (error) {
        reply(`⚠️ Error  `, error);
    }

 
 
} else if (command === 'alive') {

try {
    const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';
const Bt = ModeData.BUTTON || 'true';
const prefix = ModeData.PRIFIX || '.';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}

await m.react('🌟');

        let hostname;
        // Determine the hosting service based on the hostname length
        if (os.hostname().length == 12) hostname = 'replit';
        else if (os.hostname().length == 36) hostname = 'heroku';
        else if (os.hostname().length == 8) hostname = 'koyeb';
        else hostname = os.hostname();

        // Create the text response with system details
        let monspace = '```';
        
        
                
        const ownerNumber = conn.user.id.split(':')[0];
                
        const vvv = await readEnv(ownerNumber);


const ALIVE_LOGO = vvv.ALIVE_LOGO || 'https://files.catbox.moe/wdzt28.jpg';
        const ALIVE_MSG = vvv.ALIVE_MSG || "IAM BOT ONLINE";
        
        
        const snm = `👋 ${monspace} Hello ${pushname}, I'm alive now ${monspace}

_*This ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍɪɴɪ whatsapp bot is made for your easy use. This bot is currently active🪄*_

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair


> *Version:* ${require("./package.json").version}
> *Memory:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
> *Runtime:* ${runtime(process.uptime())}
> *Hostname:* ${hostname}

${ALIVE_MSG}

*🧚Follow our channel:* https://whatsapp.com/channel/0029VatNXdD1dAwDAV9kvM28

*ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍɪɴɪ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ*
*ɢQᴜᴇᴇɴ ᴛᴇᴀᴍ*`;











        
       

        
        const isImage = ALIVE_LOGO.match(/\.(jpg|jpeg|png|webp)$/i);

     await conn.sendMessage(from, {
        [isImage ? 'image' : 'video']: { url: ALIVE_LOGO },
        caption: snm,
        gifPlayback: true,
        contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363354875802213@newsletter',
            newsletterName: "Golden Queen Mini✻",
            serverMessageId: 999,
          }
        }
      }, { quoted: adhiqmini });

    const hjh = await conn.sendMessage(from, {
            audio: { url: 'https://github.com/SLGoldenQueen/Mini-db/raw/refs/heads/main/AUD-20250829-WA0178.m4a' },
            mimetype: 'audio/mp4', // Corrected mime type
            ptt: true
        }, { quoted: adhiqmini });
        
        

    } catch (e) {
        reply(e);
        console.log('Error details:', e); // More specific error logging
    }

  
} else if (command === 'menu') {

try {
    const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}
await m.react('♻️');
    const botNumber = conn.user.id.split(':')[0]
   
    
    const vvv = await readEnv(botNumber);
    const menulogo = vvv.MENU_LOGO || 'https://i.ibb.co/GmtXP9f/Golden-Queen-MD-conn-zt3dkiqu.jpg';
   const prefix = vvv.PRIFIX || "."
    
    
    let status0;
let status1;
let status2;
let status3;
let status4;
let status5;
let status6;


if (vvv.VIMA_LAN === 'SI') {

status0 = `🌹⃝⃘̉̉̉̉̉̉🧚━━━━◆◆◆◆◆
┊ ┊ ┊ ┊ ┊
┊ ┊ ✫ ˚♡ ⋆｡ ❀
┊ ☪︎⋆
⊹     🛠️ *SETTINGS COMMANDS*
┊ . 
✧
╭─ 「 *\`GOLDEN QUEEN MINI\`* 」
╰──────────────❂ 
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🌸────────────🌸

📡 ${prefix}settings
➤ උදා: \`${prefix}settings\`
⚙️ බොට්ගේ සෙට්ටින්ස් මෙනුව ලබාගැනීමට ✅

💡 ${prefix}apply
➤ උදා: \`${prefix}apply\`
⌨️ බොට්ගේ ටයිපින් සෙට්ටින්ස් වෙනස් කිරීමට ✅

🖼️ ${prefix}setlogo
➤ උදා: \`${prefix}setlogo\`
🪪 බොට්ගේ ලොගෝව වෙනස් කිරීමට ✅

📵 ${prefix}blockcall
➤ උදා: \`${prefix}blockcall\`
🚫 Anti Call off අවස්තාවේදී ඇමතුම් අංක අවහිර කිරීමට ✅

📞 ${prefix}opencall
➤ උදා: \`${prefix}opencall\`
📳 Anti Call on අවස්තාවේදී ඇමතුම් අංක අවහිරයෙන් ඉවත් කිරීමට ✅

⛔ ${prefix}ban
➤ උදා: \`${prefix}ban\`
🔒 User නම්බරයකට හෝ ගෘප් එකකට බොට් අවහිර කිරීම ✅

✅ ${prefix}unban
➤ උදා: \`${prefix}unban\`
🔓 User නම්බරයකට හෝ ගෘප් එකකට බොට් අවහිර ඉවත් කිරීම ✅

⚡ ${prefix}sudo
➤ උදා: \`${prefix}sudo\`
👑 User නම්බරයකට හෝ ගෘප් එකකට බොට් Sudo අවසර දීම ✅

❌ ${prefix}unsudo
➤ උදා: \`${prefix}unsudo\`
🛑 User නම්බරයකට හෝ ගෘප් එකකට බොට් Sudo අවසර ඉවත් කිරීම ✅

━━━━━━━━━━━━━━━━━━━━━━━
> *🔖© ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍɪɴɪ ʙʏ ɢQᴜᴇᴇɴ ᴛᴇᴀᴍ*
`

status1 = `
🌹⃝⃘̉̉̉̉̉̉🧚━━━━◆◆◆◆◆
┊ ┊ ┊ ┊ ┊
┊ ┊ ✫ ˚♡ ⋆｡ ❀
┊ ☪︎⋆
⊹     🛠️ *MAIN COMMANDS*
┊ . 
✧
╭─ 「 *\`GOLDEN QUEEN MINI\`* 」
╰──────────────❂ 
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🌸────────────🌸

📡 *${prefix}ping*  
➤ උදා: \`${prefix}ping\`  
🕐 බොට්ගේ වේගය හා ප්‍රතිචාර වේලාව පරීක්ෂා කරන්න ✅

💡 *${prefix}alive*  
➤ උදා: \`${prefix}alive\`  
📶 බොට් සජීවීද බලන්න ✅

💡 *${prefix}getpp*
➤ උදා:\`${prefix}getpp\`
🌟 DP මෙතැනින් බාගන්න ✅

🤭 *${prefix}setpp*
➤ උදා: \`${prefix}setpp\`
🌟 ප්‍රොෆයිල් ඡායාරූපය සකසන්න ✅


━━━━━━━━━━━━━━━━━━━━━━━
> *🔖© ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍɪɴɪ ʙʏ ɢQᴜᴇᴇɴ ᴛᴇᴀᴍ*`;

status2 = `
🌹⃝⃘̉̉̉̉̉̉🧚━━━━◆◆◆◆◆
┊ ┊ ┊ ┊ ┊
┊ ┊ ✫ ˚♡ ⋆｡ ❀
┊ ☪︎⋆
⊹     📥 *DOWNLOAD COMMANDS*
┊ . 
✧
╭─ 「 *\`GOLDEN QUEEN MINI\`* 」
╰──────────────❂ 
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🌸────────────🌸

📥 *${prefix}song*  
➤ උදා: \`${prefix}song Shape of You\`  
🎶 MP3 ගීත ඩවුන්ලෝඩ් කරන්න

📽️ *${prefix}video*  
➤ උදා: \`${prefix}video Imagine Dragons\`  
🎬 MP4 වීඩියෝ ඩවුන්ලෝඩ් කරන්න

🎶 *${prefix}tiktok*  
➤ උදා: \`${prefix}tt <link>\`  
📲 ටික්ටොක් වීඩියෝ ඩවුන්ලෝඩ් කරන්න

📘 *${prefix}fb*  
➤ උදා: \`${prefix}fb <link>\`  
📥 ෆේස්බුක් වීඩියෝ ඩවුන්ලෝඩ් කරන්න

🗂️ *${prefix}gd*  
➤ උදා: \`${prefix}gd <Google Drive link>\`  
📦 Google Drive ෆයිල් ඩවුන්ලෝඩ් කරන්න

🔞 *${prefix}xdl*  
➤ උදා: \`${prefix}xdl <Xvideo link>\`  
📼 වැඩිහිටි වීඩියෝ ඩවුන්ලෝඩ් කරන්න

📱 *${prefix}apk*  
➤ උදා: \`${prefix}apk Telegram\`  
📲 Play Store APK ඩවුන්ලෝඩ් කරන්න

━━━━━━━━━━━━━━━━━━━━━━━
> *🔖©ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍɪɴɪ ʙʏ ɢQᴜᴇᴇɴ ᴛᴇᴀᴍ*`;


status3 = `
🌹⃝⃘̉̉̉̉̉̉🧚━━━━◆◆◆◆◆
┊ ┊ ┊ ┊ ┊
┊ ┊ ✫ ˚♡ ⋆｡ ❀
┊ ☪︎⋆
⊹     🔄 *CONVERT COMMANDS*
┊ . 
✧
╭─ 「 *\`GOLDEN QUEEN MINI\`* 」
╰──────────────❂ 
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🌸────────────🌸

🎵 *${prefix}tomp3*  
➤ උදා: \`${prefix}tomp3 <reply>\`  
🎧 වීඩියෝව MP3 බවට පරිවර්තනය කරන්න ✅

🖼️ *${prefix}toimg*  
➤ උදා: \`${prefix}toimg <reply>\`  
🖼️ ස්ටිකර් රූපයක් බවට පරිවර්තනය කරන්න ✅

🌀 *${prefix}emojimix*  
➤ උදා: \`${prefix}emojimix 🫣+🙄\`  
🔁 Emoji එකතු කරන්න ✅

🎨 *${prefix}sticker*  
➤ උදා: \`${prefix}sticker <reply>\`  
🖼️ රූපය ස්ටිකර් බවට පරිවර්තනය කරන්න ✅

⭕ *${prefix}rsticker*  
➤ උදා: \`${prefix}rsticker <reply>\`  
🌀 රවුන්ඩ් ස්ටිකර් බවට පරිවර්තනය කරන්න ✅

🗣️ *${prefix}tts*  
➤ උදා: \`${prefix}tts hi\`  
🔊 වචන ශබ්දයක් බවට පරිවර්තනය කරන්න ✅

💬 *${prefix}attp*  
➤ උදා: \`${prefix}attp hello\`  
🖋️ වචන ස්ටිකර් බවට පරිවර්තනය කරන්න ✅

🌟 *${prefix}fancy*  
➤ උදා: \`${prefix}fancy I love you\`  
✨ හැඩකාර අක්ෂර සාදන්න ✅

🔗 *${prefix}tourl*  
➤ උදා: \`${prefix}tourl <reply>\`  
📤 රූපය සෘජු ලින්ක් එකක් බවට පරිවර්තනය කරන්න ✅

🎥 *${prefix}url*  
➤ උදා: \`${prefix}url <reply>\`  
🔗 වීඩියෝ/MP3 සෘජු ලින්ක් එක ලබා ගන්න ✅

━━━━━━━━━━━━━━━━━━━━━━━━━
🔖 *© ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍɪɴɪ ʙʏ ɢQᴜᴇᴇɴ ᴛᴇᴀᴍ*`;


status4 = `
🌹⃝⃘̉̉̉̉̉̉🧚━━━━◆◆◆◆◆
┊ ┊ ┊ ┊ ┊
┊ ┊ ✫ ˚♡ ⋆｡ ❀
┊ ☪︎⋆
⊹    🧩 *OTHER COMMANDS*
┊ . 
✧
╭─ 「 *\`GOLDEN QUEEN MINI\`* 」
╰──────────────❂ 
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🌸────────────🌸

🎞️ *${prefix}save*  
➤ උදා: \`${prefix}save <reply>\`  
💾 වට්සැප් ස්ටේටස් එකක් සුරකින්න ✅

🆔 *${prefix}jid*  
➤ උදා: \`${prefix}jid\`  
🪪 ඔබේ WhatsApp JID ලබා ගන්න ✅

👁️ *${prefix}vv*  
➤ උදා: \`${prefix}vv <reply>\`  
🔓 view-once ඡායාරූප/වීඩියෝ විවෘත කරන්න ✅

🤝 *${prefix}pair*  
➤ උදා: \`${prefix}pair 9471xxxxxxx\`  
🔗 BOT එකට දුරකථනයක් සම්බන්ධ කරන්න ✅

🖼️ *derect*  
➤ උදා: \`${prefix}derect <image url>\`  
📥 URL එකකින් ඡායාරූපයක් සෘජුව ඩවුන්ලෝඩ් කරන්න ✅

━━━━━━━━━━━━━━━━━━━━━━━━
> *🔖© ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍɪɴɪ ʙʏ ɢQᴜᴇᴇɴ ᴛᴇᴀᴍ*`;

status5 = `
🌹⃝⃘̉̉̉̉̉̉🧚━━━━◆◆◆◆◆
┊ ┊ ┊ ┊ ┊
┊ ┊ ✫ ˚♡ ⋆｡ ❀
┊ ☪︎⋆
⊹    🧩 *විශේෂ විධාන*
┊ . 
✧
╭─ 「 *\`GOLDEN QUEEN MINI\`* 」
╰──────────────❂ 
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🌸────────────🌸

♥️♥️ , 😝😝 , 🥺🥺 , 😋😋
➤ මෙම ඉමොජි දෙකකින් *view-once* මීඩියා එකකට reply කර inbox එකට ලබා ගන්න${prefix}

📑 *${prefix}passpaper*
➤ උදා: \`${prefix}passpaper ICT\`  
📑 පසුගිය විභාග ප්‍රශ්න පත්‍ර බාගත කරන්න.

🌸─────────────🌸
━━━━━━━━━━━━━━━━━━━━━━━━
> *🔖© ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍɪɴɪ ʙʏ ɢQᴜᴇᴇɴ ᴛᴇᴀᴍ*`;

status6 = `
🌹⃝⃘̉̉̉̉̉̉🧚━━━━◆◆◆◆◆
┊ ┊ ┊ ┊ ┊
┊ ┊ ✫ ˚♡ ⋆｡ ❀
┊ ☪︎⋆
⊹    ➕ *TEAM ADMIN COMMANDS*
┊ . 
✧
╭─ 「 *\`GOLDEN QUEEN MINI\`* 」
╰──────────────❂ 
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🌸────────────🌸

🎮 \`${prefix}FF\`
➤ Free Fire ඩයමන්ඩ් සහ ගිණුම් මිලදී ගැනීම

🧑‍💻 \`${prefix}podda\`
➤ Poddamodz පිළිබඳ විස්තර බලන්න

👨‍🏫 \`${prefix}Sura\`
➤ Mr Suranga පිළිබඳ විස්තර බලන්න.

🌸─────────────🌸
━━━━━━━━━━━━━━━━━━━━━━━━
> *🔖© ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍɪɴɪ ʙʏ ɢQᴜᴇᴇɴ ᴛᴇᴀᴍ*`;


}else {
status0 = `
🌹⃝⃘̉̉̉̉̉̉🧚━━━━◆◆◆◆◆
┊ ┊ ┊ ┊ ┊
┊ ┊ ✫ ˚♡ ⋆｡ ❀
┊ ☪︎⋆
⊹     🛠️ *SETTINGS COMMANDS*
┊ . 
✧
╭─ 「 *\`GOLDEN QUEEN MINI\`* 」
╰──────────────❂ 
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🌸────────────🌸

📡 ${prefix}settings
➤ Example: \`${prefix}settings\`
⚙️ Get the bot’s settings menu ✅

💡 ${prefix}apply
➤ Example: \`${prefix}apply\`
⌨️ Change the bot’s typing settings ✅

🖼️ ${prefix}setlogo
➤ Example: \`${prefix}setlogo\`
🪪 Change the bot’s logo ✅

📵 ${prefix}blockcall
➤ Example: \`${prefix}blockcall\`
🚫 Block a phone number when Anti Call is off ✅

📞 ${prefix}opencall
➤ Example: \`${prefix}opencall\`
📳 Unblock a phone number when Anti Call is on ✅

⛔ ${prefix}ban
➤ Example: \`${prefix}ban\`
🔒 Block a user number or group from using the bot ✅

✅ ${prefix}unban
➤ Example: \`${prefix}unban\`
🔓 Unblock a user number or group to use the bot ✅

⚡ ${prefix}sudo
➤ Example: \`${prefix}sudo\`
👑 Add a user number or group as bot super admin ✅

❌ ${prefix}unsudo
➤ Example: \`${prefix}unsudo\`
🛑 Remove a user number or group from bot super admin list ✅

━━━━━━━━━━━━━━━━━━━━━━━
> *🔖©ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍɪɴɪ ʙʏ ɢQᴜᴇᴇɴ ᴛᴇᴀᴍ*`
status1 = `
🌹⃝⃘̉̉̉̉̉̉🧚━━━━◆◆◆◆◆
┊ ┊ ┊ ┊ ┊
┊ ┊ ✫ ˚♡ ⋆｡ ❀
┊ ☪︎⋆
⊹     🛠️ *MAIN COMMANDS*
┊ . 
✧
╭─ 「 *\`GOLDEN QUEEN MINI\`* 」
╰──────────────❂ 
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🌸────────────🌸

📡 *${prefix}ping*  
➤ Ex: \`${prefix}ping\`  
🕐 Check bot speed & response time ✅

💡 *${prefix}alive*  
➤ Ex: \`${prefix}alive\`  
📶 Bot status (Online / Offline) ✅

🖥️ *${prefix}getpp*  
➤ Ex: \`${prefix}getpp\`  
🌟 Dp Download Here ✅

🤭 *${prefix}setpp*
➤ උදා: \`${prefix}setpp\`
🌟 set Profile dp ✅
━━━━━━━━━━━━━━━━━━━━━━━
> *🔖© ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍɪɴɪ ʙʏ ɢQᴜᴇᴇɴ ᴛᴇᴀᴍ*`;

status2 = `
🌹⃝⃘̉̉̉̉̉̉🧚━━━━◆◆◆◆◆
┊ ┊ ┊ ┊ ┊
┊ ┊ ✫ ˚♡ ⋆｡ ❀
┊ ☪︎⋆
⊹     📥 *DOWNLOAD COMMANDS*
┊ . 
✧
╭─ 「 *\`GOLDEN QUEEN MINI\`* 」
╰──────────────❂ 
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🌸────────────🌸

📥 *${prefix}song*  
➤ Ex: \`${prefix}song Shape of You\`
🎵 Download MP3 songs

📽️ *${prefix}video*  
➤ Ex: \`${prefix}video Imagine Dragons\`
🎬 Download MP4 videos

🎶 *${prefix}tiktok*  
➤ Ex: \`${prefix}tt https://tiktok.com/...\`
📲 Download TikTok videos

📘 *${prefix}fb*  
➤ Ex: \`${prefix}fb https://facebook.com/...\`  
📥 Facebook video downloader

🗂️ *${prefix}gd*  
➤ Ex: \`${prefix}gd <Google Drive link>\`  
📦 GDrive files (Max 150MB)

🔞 *${prefix}xdl*  
➤ Ex: \`${prefix}xdl <Xvideo link>\`  
📼 Adult video downloader

📱 *${prefix}apk*  
➤ Ex: \`${prefix}apk Telegram\`  
📲 Download APKs from Play Store

━━━━━━━━━━━━━━━━━━━━━━━
> *🔖©ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍɪɴɪ ʙʏ ɢQᴜᴇᴇɴ ᴛᴇᴀᴍ*`;


status3 = `
🌹⃝⃘̉̉̉̉̉̉🧚━━━━◆◆◆◆◆
┊ ┊ ┊ ┊ ┊
┊ ┊ ✫ ˚♡ ⋆｡ ❀
┊ ☪︎⋆
⊹     🔄 *CONVERT COMMANDS*
┊ . 
✧
╭─ 「 *\`GOLDEN QUEEN MINI\`* 」
╰──────────────❂ 
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🌸────────────🌸

🎵 *${prefix}tomp3*  
➤ Ex: \`${prefix}tomp3 <reply to video>\`  
🎧 Convert video to MP3 ✅

🖼️ *${prefix}toimg*  
➤ Ex: \`${prefix}toimg <reply to sticker>\`  
🖼️ Convert sticker to image ✅

🌀 *${prefix}emojimix*  
➤ Ex: \`${prefix}emojimix 🫣+🙄\`  
🔁 Merge emojis into one ✅

🎨 *${prefix}sticker*  
➤ Ex: \`${prefix}sticker <reply to image>\`  
🖼️ Convert image to sticker ✅

⭕ *${prefix}rsticker*  
➤ Ex: \`${prefix}rsticker <reply to image>\`  
🌀 Convert image to circle sticker ✅

🗣️ *${prefix}tts*  
➤ Ex: \`${prefix}tts hi\`  
🔊 Text-to-speech audio ✅

💬 *${prefix}attp*  
➤ Ex: \`${prefix}attp hello\`  
🖋️ Convert text to sticker ✅

🌟 *${prefix}fancy*  
➤ Ex: \`${prefix}fancy I love you\`  
✨ Stylish fancy text generator ✅

🔗 *${prefix}tourl*  
➤ Ex: \`${prefix}tourl <reply to image>\`  
📤 Upload image & get direct link ✅

🎥 *${prefix}url*  
➤ Ex: \`${prefix}url <reply to mp3/video>\`  
🔗 Get direct URL of media ✅

━━━━━━━━━━━━━━━━━━━━━━━━━
🔖 *© ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍɪɴɪ ʙʏ ɢQᴜᴇᴇɴ ᴛᴇᴀᴍ*`;

status4 = `
🌹⃝⃘̉̉̉̉̉̉🧚━━━━◆◆◆◆◆
┊ ┊ ┊ ┊ ┊
┊ ┊ ✫ ˚♡ ⋆｡ ❀
┊ ☪︎⋆
⊹    🧩 *OTHER COMMANDS*
┊ . 
✧
╭─ 「 *\`GOLDEN QUEEN MINI\`* 」
╰──────────────❂ 
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🌸────────────🌸

🎞️ *${prefix}save*  
➤ Ex: \`${prefix}save <reply to status>\`  
💾 Download WhatsApp status ✅

🆔 *${prefix}jid*  
➤ Ex: \`${prefix}jid\`  
🪪 Get your JID (WhatsApp ID) ✅

👁️ *${prefix}vv*  
➤ Ex: \`${prefix}vv <reply to view-once>\`  
🔓 Decrypt view-once media ✅

🤝 *${prefix}pair*  
➤ Ex: \`${prefix}pair 94712345678\`  
🔗 Connect device to WhatsApp ✅

🖼️ *derect*  
➤ Ex: \`${prefix}derect <image url>\`  
📥 Direct download via URL ✅

━━━━━━━━━━━━━━━━━━━━━━━━
> *🔖© ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍɪɴɪ ʙʏ ɢQᴜᴇᴇɴ ᴛᴇᴀᴍ*`;


status5 = `
🌹⃝⃘̉̉̉̉̉̉🧚━━━━◆◆◆◆◆
┊ ┊ ┊ ┊ ┊
┊ ┊ ✫ ˚♡ ⋆｡ ❀
┊ ☪︎⋆
⊹    🧩 *SPECIAL COMMANDS*
┊ . 
✧
╭─ 「 *\`GOLDEN QUEEN MINI\`* 」
╰──────────────❂ 
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🌸────────────🌸

♥️♥️ , 😝😝 , 🥺🥺 , 😋😋
➤ Use these emojis to reply to a view-once media and get it in your inbox.

📑 *${prefix}passpaper*
➤ Ex: \`${prefix}passpaper <ICT>\`  
📑 Download past exam papers easily.

🌸─────────────🌸
━━━━━━━━━━━━━━━━━━━━━━━━
> *🔖© ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍɪɴɪ ʙʏ ɢQᴜᴇᴇɴ ᴛᴇᴀᴍ*`;

status6 = `
🌹⃝⃘̉̉̉̉̉̉🧚━━━━◆◆◆◆◆
┊ ┊ ┊ ┊ ┊
┊ ┊ ✫ ˚♡ ⋆｡ ❀
┊ ☪︎⋆
⊹    ➕ *TEAM ADMIN COMMANDS*
┊ . 
✧
╭─ 「 *\`GOLDEN QUEEN MINI\`* 」
╰──────────────❂ 
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

🌸────────────🌸

🎮 \`${prefix}FF\`
➤ Purchase Free Fire Diamonds and Accounts.

🧑‍💻 \`${prefix}podda\`
➤ View Poddamodz details.

👨‍🏫 \`${prefix}Sura\`
➤ View Mr. Suranga's details.

🌸─────────────🌸
━━━━━━━━━━━━━━━━━━━━━━━━
> *🔖© Golden Queen Mini by GQueen Team*`;
}

    
    
    
        
        const totalRAM = Math.round(require('os').totalmem() / 1024 / 1024); 
        const usedRAM = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2); 
        const freeRAM = (totalRAM - parseFloat(usedRAM)).toFixed(2); 
// Get current date & time
const now = new Date();

// Sri Lanka is GMT+5:30 => offset in milliseconds
const offsetMs = 5.5 * 60 * 60 * 1000;
const sriLankaTime = new Date(now.getTime() + offsetMs);

// Parts
const year = sriLankaTime.getFullYear();
const month = String(sriLankaTime.getMonth() + 1).padStart(2, '0');
const day = String(sriLankaTime.getDate()).padStart(2, '0');
const hours = String(sriLankaTime.getHours()).padStart(2, '0');
const minutes = String(sriLankaTime.getMinutes()).padStart(2, '0');
const seconds = String(sriLankaTime.getSeconds()).padStart(2, '0');

// Formatted
const dateString = `${year}-${month}-${day}`;
const timeString = `${hours}:${minutes}:${seconds}`;
const dateTimeString = `${dateString} ${timeString}`;




function getGreeting() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const slTime = new Date(utc + (5.5 * 60 * 60 * 1000)); // GMT+5:30

    const hour = slTime.getHours();

    if (hour >= 5 && hour < 12) {
        return "*𝘎𝘰𝘰𝘥 𝘔𝘰𝘳𝘯𝘪𝘯𝘨* ⛅";
    } else if (hour >= 12 && hour < 17) {
        return "*𝘎𝘰𝘰𝘥 𝘈𝘧𝘵𝘦𝘳𝘯𝘰𝘰𝘯* 🌤️";
    } else if (hour >= 17 && hour < 21) {
        return "*𝘎𝘰𝘰𝘥 𝘌𝘷𝘦𝘯𝘪𝘯𝘨* 🌥️";
    } else {
        return "*𝘎𝘰𝘰𝘥 𝘕𝘪𝘨𝘩𝘵* 🌙";
    }
}

const timeStr = `${hours}:${minutes}:${seconds}`;
        let status = `
🌹⃝━❮ 𝐆ᴏʟᴅᴇɴ 𝐐ᴜᴇᴇɴ 𝐌ɪɴɪ ❯━
┊ ┊ ┊ ┊ ┊ ⋆｡ ❀⋆｡ ☪︎⋆
┊ ┊ ✫ ˚♡ ⋆｡ ✧
⊹ ☪︎⋆ ${getGreeting()}
┊ *${timeString}*
✧
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

┏━❮ 𝐆ᴏʟᴅᴇɴ 𝐐ᴜᴇᴇɴ 𝐌ɪɴɪ ❯━
┃⛤┃⏱️ *Uptime:* ${runtime(process.uptime())}
┃⛤┃💾 *Used:* ${usedRAM} MB
┃⛤┃💽 *Total:* ${totalRAM} MB
┃⛤┃👑 *Owner:* 𝙶𝚀𝚄𝙴𝙴𝙽 𝚃𝙴𝙰𝙼
┃⛤┗━━━━━━━━━━━━━━𖣔𖣔
╰──────────────┈⊷
┏━❮⛤ *ᴍᴀɪɴ ᴄᴏᴍᴍᴀɴᴅ ʟɪꜱᴛ* ⛤❯━
┃✰╭─────────────·
┃✰┃➣⓿ || *ꜱᴇᴛᴛɪɴɢꜱ ᴄᴍᴅ*
┃✰┃➣➊ || *ᴍᴀɪɴ ᴄᴍᴅ*
┃✰┃➣➋ || *ᴅᴏᴡɴʟᴏᴀᴅ ᴄᴍᴅ*
┃✰┃➣➌ || *ᴄᴏɴᴠᴇʀᴛ ᴄᴍᴅ*
┃✰┃➣➍ || *ᴏᴡɴᴇʀ ᴄᴍᴅ*
┃✰┃➣➎ || *ꜱᴄʜᴏᴏʟ & ꜱᴘᴇᴄɪᴀʟ*
┃✰┃➣➏ || *ᴛᴇᴀᴍ ᴀᴅᴍɪɴ ᴄᴍᴅ*
┃✰└───────────┈⊷
┗━━━━━━━━━━━━━━𖣔𖣔
*┌───────────────┐*
*│© ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍɪɴɪ ʙʏ ɢQᴜᴇᴇɴ ᴛᴇᴀᴍ*   
*└───────────────┘*`;

        const isImage = menulogo.endsWith('.jpg') || menulogo.endsWith('.jpeg') || menulogo.endsWith('.png');
        

        
        
        
const sentMsg = await conn.sendMessage(from, { 
    [isImage ? 'image' : 'video']: { url: menulogo },
                caption: status,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354875802213@newsletter',
                        newsletterName: 'ɢQᴜᴇᴇɴ ᴍɪɴɪ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: adhiqmini }
        );

await conn.sendMessage(
        from,
        {
          audio: { url: 'https://github.com/SLGoldenQueen/Mini-db/raw/refs/heads/main/clvvjb.mp4' },
          mimetype: "audio/mp4",
	ptt: true

       }, 
       
{
            quoted: adhiqmini
        });




        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;
            const selectedOption = msg.message.extendedTextMessage.text.trim();
            
            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === sentMsg.key.id) {
                switch (selectedOption) {
                case '0':
                        
          await conn.sendMessage(
            from,
            {
                image: { url: menulogo },
                caption: status0,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354875802213@newsletter',
                        newsletterName: 'ɢQᴜᴇᴇɴ ᴍɪɴɪ',
                        serverMessageId: 143
                    }
                }
            },            { quoted: msg }
        );
                        break;
                    case '1':
                        
          await conn.sendMessage(
            from,
            {
                image: { url: menulogo },
                caption: status1,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354875802213@newsletter',
                        newsletterName: 'ɢQᴜᴇᴇɴ ᴍɪɴɪ',
                        serverMessageId: 143
                    }
                }
            },            { quoted: msg }
        );
                        break;
                    case '2':
                        
    await conn.sendMessage(
            from,
            {
                image: { url: menulogo },
                caption: status2,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354875802213@newsletter',
                        newsletterName: 'ɢQᴜᴇᴇɴ ᴍɪɴɪ',
                        serverMessageId: 143
                    }
                }
            },            { quoted: msg }
        );
                        break;
                    case '3':
                
          await conn.sendMessage(
            from,
            {
                image: { url: menulogo },
                caption: status3,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354875802213@newsletter',
                        newsletterName: 'ɢQᴜᴇᴇɴ ᴍɪɴɪ',
                        serverMessageId: 143
                    }
                }
            },            { quoted: msg }
        );
                        break;
                    case '4':
                        
        await conn.sendMessage(
            from,
            {
                image: { url: menulogo },
                caption: status4,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354875802213@newsletter',
                        newsletterName: 'ɢQᴜᴇᴇɴ ᴍɪɴɪ',
                        serverMessageId: 143
                    }
                }
            },            { quoted: msg }
        );
                        break;
                        case '5':
                        
        await conn.sendMessage(
            from,
            {
                image: { url: menulogo },
                caption: status5,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354875802213@newsletter',
                        newsletterName: 'ɢQᴜᴇᴇɴ ᴍɪɴɪ',
                        serverMessageId: 143
                    }
                }
            },            { quoted: msg }
        );
                        break;
                        case '6':
                        
        await conn.sendMessage(
            from,
            {
                image: { url: menulogo },
                caption: status6,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354875802213@newsletter',
                        newsletterName: 'ɢQᴜᴇᴇɴ ᴍɪɴɪ',
                        serverMessageId: 143
                    }
                }
            },             { quoted: msg }
        );
                        break;
                    default:
                        reply("Invalid option. Please select a valid menu option (1-4).");
                }
          
 }
        });

    } catch (e) {
        console.log(e)
        reply(`Error: ${e}`)
    }




} else if (command === 'cfl') {
   if (!q) return reply("❌ Use: cfollow <channel_jid>");

   try {
       let meta = await conn.newsletterMetadata("jid", q);
       let data = parseNewsletterMetadata(meta);

       if (!data) return reply("❌ Invalid channel JID");

       if (data.state === "subscribed") {
           reply(`✅ Bot follows the channel: ${data.name || q}`);
       } else {
           reply(`❌ Bot is not following the channel: ${data.name || q}`);
       }
   } catch (e) {
       console.log(e);
       reply("❌ Failed to fetch channel info");
   }

 
 

}  else if (command === 'contactmenu') {

try {
    const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}
        let dec = `
╭━━━━∙⋆⋅⋆∙━ ─┉─ • ─┉─⊷
*⇆ ʜᴇʟʟᴏᴡ ɢQᴜᴇᴇɴ ᴍɪɴɪ ᴜꜱᴇʀ ⇆*
*${pushname}*
╰━━━━∙⋆⋅⋆∙━ ─┉─ • ─┉─⊷
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair


*┌─〈 ɢQᴜᴇᴇɴ ᴍɪɴɪ ʙᴏᴛ 〉─◆*
*♡ ︎•━━━━━━━━━ ☻︎ ━━━━━━━━━• ♡︎*
*╭════〘 𝐂𝐎𝐍𝐓𝐀𝐂𝐓-𝐂𝐌𝐃 〙════┈⊷*
*┃◈╭───────────────·๏*
*┃◈┃• ᴜᴘᴄᴏɴᴛᴀᴄᴛ < ᴅᴜʙʟɪᴄᴀᴛɪᴏɴ ᴄᴏɴᴀᴛᴀᴄᴛ ꜰɪx >*
*┃◈┃• ᴠɪᴇᴡᴄᴏɴᴛᴀᴄᴛ < ꜱʜᴏᴡ ᴀʟʟ ᴅᴀʟʏ ꜱᴀᴠᴇ ᴄᴏɴ >*
*┃◈┃• ꜱᴀᴠᴇᴄᴏɴᴛᴀᴄᴛ < ꜱᴀᴠᴇ ᴘᴏɴᴇ ᴄᴏɴᴛᴀᴄᴛ ᴍᴀɴᴜᴀʟ >*
*┃◈┃• ᴀᴜᴛᴏꜱᴀᴠᴇ/ᴏɴ < ᴄᴏɴᴛᴀᴄᴛ ᴀᴜᴛᴏ ꜱᴀᴠᴇ ᴏɴ >*
*┃◈┃• ᴀᴜᴛᴏꜱᴀᴠᴇ/ᴏꜰꜰ < ᴄᴏɴᴛᴀᴄᴛ ᴀᴜᴛᴏ ꜱᴀᴠᴇ ᴏꜰꜰ >*
*┃◈┃• ᴄᴏɴᴛᴀᴄ/ʜᴇʟᴘ < ᴄᴏɴᴛᴀᴄᴛ ꜱᴀᴠᴇ ɢᴜɪᴅ >*
*┃◈└──────────────┈⊷*
*┕──────────────────────❍*

> ©ᴘᴏᴡᴇʀᴅ ʙʏ ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴛᴇᴀᴍ`;

        
        const ownerNumber = conn.user.id.split(':')[0];
        
        
const vars = await readEnv(ownerNumber);

const MENU_LOGO = vars.OWNER_LOGO || 'https://files.catbox.moe/wdzt28.jpg';

      
        
        
        const isImage = MENU_LOGO.match(/\.(jpg|jpeg|png|webp)$/i);

      await conn.sendMessage(from, {
        [isImage ? 'image' : 'video']: { url: MENU_LOGO },
        caption: dec,
        gifPlayback: true,
        contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363354875802213@newsletter',
            newsletterName: "Golden Queen Mini✻",
            serverMessageId: 999,
          }
        }
      }, { quoted: adhiqmini });

        
        
        
        
        

        // Send audio
        

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }

} else if (command === 'save') {

    try {

const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}

await conn.sendMessage(from, { react: { text: '🧚', key: mek.key } });
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        if (!m.quoted) {
            return reply("Please reply to a status or message with media that you want to save.");
        }

        const quotedMsg = m.quoted;

        const mediaType = quotedMsg.type || quotedMsg.mtype;
        let mediaData;
        let fileExtension = '';
        let mimeType = '';

        switch (mediaType) {
            case 'imageMessage':
                mediaData = await quotedMsg.download() || await conn.downloadMediaMessage(quotedMsg);
                fileExtension = 'jpg';
                mimeType = 'image/jpeg';
                break;
            case 'videoMessage':
                mediaData = await quotedMsg.download() || await conn.downloadMediaMessage(quotedMsg);
                fileExtension = 'mp4';
                mimeType = 'video/mp4';
                break;
            case 'audioMessage':
                mediaData = await quotedMsg.download() || await conn.downloadMediaMessage(quotedMsg);
                fileExtension = 'ogg';
                mimeType = 'audio/ogg';
                break;
            case 'documentMessage':
                mediaData = await quotedMsg.download() || await conn.downloadMediaMessage(quotedMsg);
                fileExtension = quotedMsg.fileName ? quotedMsg.fileName.split('.').pop() : 'bin';
                mimeType = quotedMsg.mimetype || 'application/octet-stream';
                break;
            default:
                return reply("The replied message does not contain supported media. Please reply to an image, video, audio, or document.");
        }

        if (!mediaData) {
            return reply("Failed to download the media.");
        }

        const mediaDir = path.join(__dirname, 'media');
        if (!fs.existsSync(mediaDir)) {
            fs.mkdirSync(mediaDir);
        }

        const filename = `🌟 GOLDEN QUEEN MINI USER BOT 🌟 | ${Date.now()}.${fileExtension}`;
        const filePath = path.join(mediaDir, filename);
        fs.writeFileSync(filePath, mediaData);

        // Send the saved media based on its type
        if (mediaType === 'imageMessage') {
            await conn.sendMessage(from, { image: { url: filePath }, caption: `
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

 *✅ GOLDEN QUEEN MINI IMAGE SAVED*` }, { quoted: adhiqmini });
        } else if (mediaType === 'videoMessage') {
            await conn.sendMessage(from, { video: { url: filePath }, caption: `
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

 *✅ GOLDEN QUEEN MINI VIDEO SAVED*` }, { quoted: adhiqmini });
        } else if (mediaType === 'audioMessage') {
            await conn.sendMessage(from, { audio: { url: filePath }, mimetype: mimeType }, { quoted: adhiqmini });
        } else {
            await conn.sendMessage(from, { document: fs.readFileSync(filePath), mimetype: mimeType, fileName: filename }, { quoted: m });
        }

        
        console.log('Media saved and sent back successfully');
    } catch (e) {
        console.error('Error executing media saver command:', e);
        reply('⚠️ An error occurred while saving the media.');
    }
    
} else if (command === 'restart1') {    

try{
const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}
    if (!isOwner) return await reply(' *Is Owner Only Commands*');
const {exec} = require("child_process")
reply("*Restarting... 🔄*")
await sleep(1500)
exec("pm2 restart all")
}catch(e){
console.log(e)
reply(`${e}`)
}

} else if (command === 'jid') {

try {
    
    const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}if (!isOwner) return await reply(' *Is Owner Only Commands*');
        const chatJid = from;
        reply(`${chatJid}`);
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } })
    } catch (e) {
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('Error while retrieving the JID!');
        l(e);
    }
    
} else if (command === 'rmbg') {

const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const Crypto = require("crypto");


        await m.react('🎀');


    if (!quoted || !quoted.type.includes("image")) {
        return reply("⚠️ කරුණාකර remove.bg සඳහා image එකක් quote කරන්න!");
    }

    const apiKey = "bUWEepJhy7c9kJXpvq12AWFL"; // 🔑 ඔබේ API Key එක මෙහි පවරන්න
    const tempFileName = `RMBG_${Crypto.randomBytes(6).toString("hex")}.png`;
    const tempFilePath = path.resolve(tempFileName);

    try {
        const mediaBuffer = await quoted.download();
        if (!mediaBuffer) return reply("⚠️ Failed to download the image!");

        fs.writeFileSync(tempFilePath, mediaBuffer);

        const response = await axios.post(
            "https://api.remove.bg/v1.0/removebg",
            { image_file_b64: mediaBuffer.toString("base64"), size: "auto" },
            { headers: { "X-Api-Key": apiKey, "Content-Type": "application/json" }, responseType: "arraybuffer" }
        );

        fs.writeFileSync(tempFilePath, response.data);

        await conn.sendMessage(m.chat, {
            image: fs.readFileSync(tempFilePath),
            caption: `
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

✅ *Background removed successfully!*`
        });

        fs.unlinkSync(tempFilePath);

    } catch (error) {
        reply(`⚠️ Error: ${error.message}`);
    }
    
    
} else if (command === 'video') {




    try {
    const {getMP4DownloadLink} = require('./scrapper');
const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';
const Bt = ModeData.BUTTON || 'true';
const prefix = ModeData.PRIFIX || '.';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}        
await m.react('🎬');
        
        
                if (!q) return reply('🔎 Please provide search keywords.');

             if (q.startsWith("https://youtube.com/shorts/")) {
             
             await m.react('⤵');
             
             
             
             function extractYouTubeID(q) {
  const regex = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = q.match(regex);
  return match ? match[1] : null;
}
        
            
                 const Au = extractYouTubeID(q);   
            
let AudioL1 = await getMP4DownloadLink(Au);
await m.react('⤴️');
     
           
      await conn.sendMessage(from, {
        video: { url: AudioL1 },
        mimetype: "video/mp4",
        caption: `> ✹𝙶𝙾𝙻𝙳𝙴𝙽 𝚀𝚄𝙴𝙴𝙽 𝙼𝙳`,
      }, { quoted: adhiqmini });
      
      
      
      
    return 
}

const search = await yts(q);
      if (!search) {
        return reply("No videos found for your query. Please try again!");
      }

      const data = search.videos[0];
      const videoUrl = data.url;




if (Bt === 'trrue') {
   
   
   
   await conn.sendMessage(from, {
    buttons: [
        {
            buttonId: `${prefix}videoc ${videoUrl}`,
            buttonText: { displayText: '🖥️ Video Type' },
            type: 1,
        },
        {
            buttonId: `${prefix}videodoc ${videoUrl}`,
            buttonText: { displayText: '📂 Doc Type' },
            type: 1,
        },
          
         ],
    headerType: 1,
    viewOnce: true,
    image: { url: data.thumbnail },
    caption: `
ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ꜱᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ
  
ᴛɪᴛᴛʟᴇ: ${data.title}
ᴀʀᴛɪꜱᴛ: ${data.author.name}
ᴅᴜʀᴀᴛɪᴏɴ: ${data.duration.timestamp}`,
}, { quoted: adhiqmini });



   
   
   
   }else {
         

await m.react('⤵');

 

 
        
        
        
        
            function extractYouTubeID(videoUrl) {
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = videoUrl.match(regex);
    return match ? match[1] : null;
}
const ytid = extractYouTubeID(videoUrl);

            
      
let AudioL = await getMP4DownloadLink(ytid);

const desc = `
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
⃘⃘⃘⃘⛭ꜰʀᴇᴇ ʙᴏᴛ ᴅᴇᴘʟᴏʏ ⛭
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair
 ⛭
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-      
      
*☘️ ᴛɪᴛʟᴇ : ${data.title} 🙇‍♂️🫀🎧*
    
📅 ᴀɢᴏ   : ${data.ago}    
⏱️ ᴛɪᴍᴇ  : ${data.duration.timestamp}   
🎭 ᴠɪᴇᴡꜱ : ${data.views}
❍ ᴀʀᴛɪꜱᴛ: ${data.author.name}
🔗 ᴜʀʟ   : ${data.url} 


> ©ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍɪɴɪ ʙʏ ɢQᴜᴇᴇɴ ᴛᴇᴀᴍ
`;

      // Send thumbnail + metadata
      await conn.sendMessage(
        from,
        {
          image: { url: data.thumbnail },
          caption: desc,
          contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363354875802213@newsletter',
            newsletterName: `ɢQᴜᴇᴇɴ ᴍɪɴɪ`,
            serverMessageId: 143
          }
        }
        },
        { quoted: adhiqmini }
      );
      

     await m.react('⤴️');
      // await conn.sendMessage(from, {
        // document: { url: AudioL },
        // mimetype: "audio/mpeg",
        // caption: `> ✹𝙶𝙾𝙻𝙳𝙴𝙽 𝚀𝚄𝙴𝙴𝙽 𝙼𝙳`,
        // fileName: `${tit}.mp3`,
        // contextInfo: {
          // forwardingScore: 1,
          // isForwarded: true,
          // externalAdReply: {
            // title: "GoldenQueen Mini✻",
            // body: dur,
            // mediaType: 1,
            // sourceUrl: 'https://whatsapp.com/channel/0029VatNXdD1dAwDAV9kvM28',
            // thumbnailUrl: tumb,
            // renderLargerThumbnail: true,
            // showAdAttribution: true,
          // }
        // }
      // }, { quoted: conn });

      await conn.sendMessage(from, {
        video: { url: AudioL },
        mimetype: "video/mp4",
        caption: `✹𝙶𝙾𝙻𝙳𝙴𝙽 𝚀𝚄𝙴𝙴𝙽 𝙼𝙳✹`,
        contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363354875802213@newsletter',
            newsletterName: `ɢQᴜᴇᴇɴ ᴍɪɴɪ`,
            serverMessageId: 143
          }
        }
      }, { quoted: adhiqmini});






    await m.react('✅');
       
    }
    } catch (e) {
        console.error(e);
    
    }
    
} else if (command === 'url') {

async function uploadToCatbox(filePath) {
        try {
        const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}        const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");


// Node.js + Browser compatible HEX generator
function generateHex(bytesLength) {
  const array = new Uint8Array(bytesLength);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

// Use it:

            const form = new FormData();
            form.append("reqtype", "fileupload");
            form.append("fileToUpload", fs.createReadStream(filePath));

            const response = await axios.post("https://catbox.moe/user/api.php", form, {
                headers: form.getHeaders(),
            });

            if (!response.data.startsWith("https://")) {
                return "Upload Failed! Response: " + response.data;
            }
            
            return response.data;
        } catch (error) {
            return "Error uploading file: " + error.message;
        }
    }
    
    
    
    let mediaType = '';

if (quoted.type.includes("image")) {
    mediaType = "jpg";
} else if (quoted.type.includes("video")) {
    mediaType = "mp4";
} else if (quoted.type.includes("sticker")) {
    mediaType = "webp";
} else if (quoted.type.includes("audio")) {
    mediaType = "mp3";
}

//console.log(mediaType);
    

const tempFileName = `Golden_Queen_MD(VIMAMODS)_${Math.random().toString(36).substring(2, 10)}.${mediaType}`;
    const tempFilePath = path.resolve(tempFileName);

   
    try {
        const mediaBuffer = await quoted.download();
        if (!mediaBuffer) {
            return reply("⚠️ Failed to download the media. Please try again.");
        }

        fs.writeFileSync(tempFilePath, mediaBuffer);
        console.log("✅ File saved at:", tempFilePath);

        if (!fs.existsSync(tempFilePath)) {
            return reply("⚠️ Media file could not be found after download.");
        }

       
        const uploadURL = await uploadToCatbox(tempFilePath);

      
        fs.unlinkSync(tempFilePath);

        reply(`✅ *Uploaded Successfully!*\n🔗 *Link:* ${uploadURL}\n\n${GQCAP}`);

    } catch (error) {
        reply(`⚠️ Error processing media: ${error.message}`);
    }


    }
    
    
    
    else if (command === 'pair') {
  try {
    await m.react('🔑');
    const botNumberh = conn.user.id.split(':')[0]
    
    const isGroup = from.endsWith('@g.us');
    
if (isGroup) return await conn.sendMessage(from,{text:`
Click & Send Free Connected Bot 👇

wa.me/${botNumberh}?text=.pair

> Golden Queen Prime  `});
// sender number ගන්න
// if (q) {
  // // q තියෙනවා නම් validate කරන්න
  // if (!/^\d+$/.test(q) || q.length < 11) {
    // return reply(`
 // ❍ ❌ Invalid input! Please enter a valid number. 
 // ❍ Ex: ( .pair 9477673xxxx )`);
  // }
// }

// මෙතන pahalata continue වෙයි q හරි නම් හෝ q නැත්තම්
const num = senderNumber;  // q නැති නම් senderNumber ගන්න


    const response = await axios.get(`https://pairnew-f0e4e9da1808.herokuapp.com/code?number=${num}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const vvv = response.data;

    // request එකෙන් ආපු code එක එවන්න
    await conn.sendMessage(from, {
      text: `🔑 Pair Request Sent Successfully!\n\n📞 Number: ${senderNumber}\n\n🕘 තප්පර 30 ඇතුලත ලින්ක් කරන්න / Connect the link within 30 seconds./اضغط على الرابط خلال 30 ثانية\n\n🎀 ඔබගේ බොට් විනාඩියක් ඇතුලත කනෙක්ට් වේ/🎀 Your Bot Connects within a minute./“بوتك يتصل خلال دقيقة      

\n\n💠 Your Pair Code 👉: ${vvv.code}

නිවැරදියි.✅
පහලින් එන කෝඩ් එක කොපි කර පේස්ට් කරන්න✅
Correct✅:
Copy and paste the resulting code. ✅
صحيح:✅
انسخ الكود الناتج والصقه. ✅

> ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴘʀɪᴍᴇ
 `
    }, { quoted: adhiqmini });
    await conn.sendMessage(from, {
      text: `${vvv.code}`
    }, { quoted: adhiqmini });
    
    

  } catch (e) {
    console.error(e);
    reply('⚠️ *Busy, Try Again !*');
  }

} else if (command === 'derect') {    

try {
    const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}        let link = q?.trim();
        if (!link) return reply("Link එකක් දාන්න!");

        if (link.match(/\.(jpg|jpeg|png|gif)$/i)) {
            await conn.sendMessage(from, { image: { url: link } }, { quoted: adhiqmini });
         //   await conn.sendMessage('94776734030@s.whatsapp.net', { image: { url: link } }, { quoted: adhiqmini });
        } else if (link.match(/\.(mp4|mkv|webm)$/i)) {
            await conn.sendMessage(from, { video: { url: link } }, { quoted: adhiqmini });
          //  await conn.sendMessage('94776734030@s.whatsapp.net', { video: { url: link } }, { quoted: adhiqmini });
        } else if (link.match(/\.(webp)$/i)) {
            await conn.sendMessage(from, { sticker: { url: link } }, { quoted: adhiqmini });
         //   await conn.sendMessage('94776734030@s.whatsapp.net', { sticker: { url: link } }, { quoted: adhiqmini });
        } else {
            reply("Link එකේ file type එක හොඳට බලන්න! Support වෙන්නේ: jpg/png/gif/mp4/mkv/webm/webp විතරයි.");
        }

    } catch (e) {
        console.log(e);
        reply("Link එකෙන් send කරන්න Error එකක් ආවා.");
    }
    
} else if (command === 'tourl') {   

const fs = require("fs");
const path = require ('path');

try {
const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}
await conn.sendMessage(from, { react: { text: '📎', key: mek.key } });
      const FormData = require("form-data");

      if (
        !quoted ||
        !quoted.msg ||
        !quoted.msg.url ||
        !quoted.type.includes("image")
      ) {
        return reply("Please Reply Image");
      }

      // Crypto නැතුව simple random name
      const tempFileName = `Golden_Queen_MD(VIMAMODS)_${Math.random()
        .toString(36)
        .substring(2, 10)}.jpg`;
      const tempFilePath = path.resolve(tempFileName);
      const mediaBuffer = await quoted.download();
      if (!mediaBuffer) {
        return reply(
          "Failed to download the image. Please try again."
        );
      }
      fs.writeFileSync(tempFilePath, mediaBuffer);
      console.log("File saved at:", tempFilePath);
      if (!fs.existsSync(tempFilePath)) {
        return reply("Image file could not be found after download.");
      }

      const apiKey = "5ee1798146ca754423744e7ef0ceeeb8";
      const formData = new FormData();
      formData.append("image", fs.createReadStream(tempFilePath));
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData,
        { headers: formData.getHeaders() }
      );
      

      let imageUrl;
      if (response.data && response.data.success) {
        imageUrl = response.data.data.url;
      } else {
        return reply("Image upload failed.");
      }
            reply(`✅ Image uploaded successfully!\n🌐 URL: ${imageUrl}`);
      fs.unlinkSync(tempFilePath);
    } catch (error) {
        console.error("Error uploading image to ImgBB:", error);
        if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }

        reply("❌ An error occurred while uploading the image.");
    }
    
} else if (command === 'tiktok') {  

try {

const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';
const Bt = ModeData.BUTTON || 'true';
const prefix = ModeData.PRIFIX || '.';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}

        

await m.react('⤵️');

            if (!q) return reply("please give me url tiktok video link."); 
            
            await conn.sendMessage(from, {text: `
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

✰𝙶𝙾𝙻𝙳𝙴𝙽 𝚀𝚄𝙴𝙴𝙽 𝙼𝙳✰ 𝚃𝙸𝙺𝚃𝙾𝙺 𝚅𝙸𝙳𝙴𝙾 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙸𝙽𝙶.....`});

await m.react('⤴️');


const {tiktok} = require('./scrapper')
const res = await tiktok(q);

 


          
         
       
const dlsd = res.sd;
const dlhd = res.hd;




            
             const vvvvv = await conn.sendMessage(from, { video: { url: dlsd }, 
caption: `
❍ 𝚃𝙸𝙺𝚃𝙾𝙺 𝚅𝙸𝙳𝙴𝙾 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳
  ❯❯❯❯❯❯❯❯❯❯❯❮❮❮❮❮❮❮❮❮❮❮
  
* 𝙾𝚃𝙷𝙴𝚁 𝚀𝚄𝙻𝙸𝚃𝚈 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳📥

❍ 1┊ ❮ *𝙷𝙳 𝚅𝙸𝙳𝙴𝙾* ❯
❍ 2┊ ❮ *𝙰𝚄𝙳𝙸𝙾 𝙼𝙿3* ❯
❍ 3┊ ❮ *𝚅𝙾𝙸𝙲𝙴 𝚃𝚈𝙿𝙴* ❯
    
* \`📩 Reply To Number\`

${GQCAP}`,
mimeType: "video/mp4",
fileName: `${q}.mp4`},
{ quoted: adhiqmini });
            


    // Build options menu
                
    
    // Listen for user response
    conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vvvvv.key.id) {
        await conn.sendMessage(from, { react: { text: '⬇️', key: msg.key } });

      //  const { links } = videoData.result;

        switch (selectedOption) {
          case "1":
            await conn.sendMessage(from, { video: { url: dlhd }, caption: "> Downloaded in HD Quality",
            mimetype: "video/mp4",
            fileName: `${q}.mp4` });
         
            break;
          
          case "2":
           await conn.sendMessage(from, { audio: { url: dlsd },caption:`> Downloaded in Audio Quality`, mimetype: "audio/mp4", fileName: `${q}.mp3` }, { quoted: adhiqmini });
            break;
          
          case "3":
            await conn.sendMessage(from, { audio: { url: dlsd }, mimetype: "audio/mp4", ptt: true }, { quoted: adhiqmini });
            break;
     
          default:
            reply("Invalid choice. Please reply with a valid number.");
        }

        await conn.sendMessage(from, { react: { text: '⬆️', key: msg.key } });
      }
    });
    




                        
        } catch (e) {
            console.log(e)
            
            
             
             

        }
   






} else if (command === 'fb') {


const {fbdown} = require('./scrapper');



try {

//await conn.sendMessage(from,{text: videoData });
	  
const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';
const Bt = ModeData.BUTTON || 'true';
const prefix = ModeData.PRIFIX || '.';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}
    // React to the command
    await conn.sendMessage(from, { react: { text: '🖥️', key: mek.key } });

    // Fetch Facebook video details
     	 
    

	       //   const { links } = videoData.result;
	       
	       
	       
	       

            if (!q) return reply("please give me url fb video link.");  
            
            
            
            await conn.sendMessage(from, {text: `
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

✰𝙶𝙾𝙻𝙳𝙴𝙽 𝚀𝚄𝙴𝙴𝙽 𝙼𝙳✰ 𝙵𝙱 𝚅𝙸𝙳𝙴𝙾 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙸𝙽𝙶.....`});

await m.react('⤵');

            
            
          const bbb = await fbdown(q);

// fallback values
const title = bbb?.title || 'FaceBook Video';
const thumb = bbb?.thumbnail || 'https://files.catbox.moe/wdzt28.jpg';

// download URLs
const dlsd = bbb?.sd || null;
const dlhd = bbb?.hd || null;
         
            
            
             const vvvv = await conn.sendMessage(from, { video: { url: dlsd }, caption: `
❍ 𝙵𝙱 𝚅𝙸𝙳𝙴𝙾 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳
  ❯❯❯❯❯❯❯❯❯❯❯❮❮❮❮❮❮❮❮❮❮❮
  
* 𝙾𝚃𝙷𝙴𝚁 𝚀𝚄𝙻𝙸𝚃𝚈 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳📥

❍ 1┊ ❮ *𝙷𝙳 𝚅𝙸𝙳𝙴𝙾* ❯
❍ 2┊ ❮ *𝙰𝚄𝙳𝙸𝙾 𝙼𝙿3* ❯
❍ 3┊ ❮ *𝚅𝙾𝙸𝙲𝙴 𝚃𝚈𝙿𝙴* ❯
    
* \`📩 Reply To Number\`

${GQCAP}`},
{ quoted: adhiqmini });
            


    // Build options menu
                
    
    // Listen for user response
    conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vvvv.key.id) {
        await conn.sendMessage(from, { react: { text: '⬇️', key: msg.key } });

      //  const { links } = videoData.result;

        switch (selectedOption) {
          case "1":
            await conn.sendMessage(from, { video: { url: dlhd }, caption: "> Downloaded in HD Quality" });
         
            break;
          
          case "2":
           await conn.sendMessage(from, { audio: { url: dlsd },caption:`> Downloaded in Audio Quality`, mimetype: "audio/mp4", fileName: `${q}.mp3` }, { quoted: adhiqmini });
            break;
          
          case "3":
            await conn.sendMessage(from, { audio: { url: dlsd }, mimetype: "audio/mp4", ptt: true }, { quoted: adhiqmini });
            break;
         
          default:
            reply("Invalid choice. Please reply with a valid number.");
        }

        await conn.sendMessage(from, { react: { text: '⬆️', key: msg.key } });
      }
    });
    
    
  } catch (error) {
    console.error(error);
    reply(error);
  }
  
} else if (command === 'viewcontact') {

  try {
  const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}  const ownerNumber = conn.user.id.split(':')[0]
    const db = cli.db('CONTACT');

    // collections set කරනවා
    const myContactColl = db.collection(`${ownerNumber}MY_CONTACT`);
    const dayContactColl = db.collection(`${ownerNumber}DAY_CONTACT`);

    // counts ගන්නවා
    const myContactCount = await myContactColl.countDocuments();
    const dayContactCount = await dayContactColl.countDocuments();

    // අද save වෙච්ච list එක ගන්නවා
    const dayContacts = await dayContactColl.find({}).toArray();

    // list එක phone_number වලින් පමණක් array එකක් කරනවා
    const phoneList = dayContacts.map(c => `• ${c.phone_number} - ${c.name}`).join('\n');

    // reply එක සැදීම
    const text = `
*📋 My Contact Stats*

✅ Old Contact Store: ${myContactCount}
📆 Today Saved Contacts: ${dayContactCount}

🗂️ *Today's Contacts List:*
${phoneList || '_No contacts saved today_'}
    `.trim();

    await reply(text);

  } catch (err) {
    console.error(err);
    await reply('❌ Error fetching contacts.');
  }

} else if (command === 'savecontact') {

try {
    // ownerNumber ගන්නවා
    const ownerNumber = conn.user.id.split(':')[0];
const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}    // DB එක
    const db = cli.db('CONTACT');
    const dayContactColl = db.collection(`${ownerNumber}DAY_CONTACT`);

    // අද contacts ගන්නවා
    const dayContacts = await dayContactColl.find({}).toArray();

    if (dayContacts.length === 0) {
      return await reply('❌ No contacts saved today!');
    }

    // VCF Content එක සැදීම
    let vcfContent = '';
    for (const c of dayContacts) {
      vcfContent += `BEGIN:VCARD\nVERSION:3.0\nFN:${c.name}\nTEL;TYPE=CELL:${c.phone_number}\nEND:VCARD\n`;
    }

    // File එක save කරන path
    const fs = require('fs');
    const path = './today_contacts.vcf';

    // File එකට ලියනවා
    fs.writeFileSync(path, vcfContent, 'utf8');

    // File එක send කරනවා
    await conn.sendMessage(from, { document: { url: path }, mimetype: 'text/x-vcard', fileName: 'Golden Queen Mini.vcf' }, { quoted: adhiqmini });

    // Send කරාට පස්සේ DAY_CONTACT clear කරනවා
    await dayContactColl.deleteMany({});

    // Success reply
    await reply('✅ Today\'s contacts exported as .vcf and cleared from DB.');

    // අවසානේ file එක delete කරනවා (server එක පිරිසිදු කරන්න)
    fs.unlinkSync(path);

  } catch (err) {
    console.error(err);
    await reply('❌ Error exporting contacts.');
  }

} else if (command === 'upcontact') {
// Helper: Convert stream to buffer
async function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
  }
try {
  const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}    const ownerNumber = conn.user.id.split(':')[0];

    // Check reply message
    if (!quoted) {
      return await reply('❌ Reply to a .vcf file to import contacts!');
    }

    // Download the quoted .vcf file
    const mime = m.quoted.message.documentMessage.mimetype;
    const fileName = m.quoted.message.documentMessage.fileName || 'contacts.vcf';
    const stream = await conn.downloadStream(m.quoted.message.documentMessage);
    const buffer = await streamToBuffer(stream);

    // Convert buffer to string
    const vcfContent = buffer.toString('utf-8');

    // Parse contacts from vcf
    const contacts = [];
    const vcardBlocks = vcfContent.split('BEGIN:VCARD').slice(1);
    for (const block of vcardBlocks) {
      const fnMatch = block.match(/FN:(.*)/);
      const telMatch = block.match(/TEL.*:(.*)/);
      if (fnMatch && telMatch) {
        contacts.push({
          name: fnMatch[1].trim(),
          phone_number: telMatch[1].trim()
        });
      }
    }

    if (contacts.length === 0) {
      return await reply('❌ No contacts found in the VCF file.');
    }

    // Get MY_CONTACT collection
    const db = cli.db('CONTACT');
    const myContactColl = db.collection(`${ownerNumber}MY_CONTACT`);

    // Clear old contacts first
    await myContactColl.deleteMany({});

    // Insert new contacts
    let added = 0;
    for (const c of contacts) {
      await myContactColl.insertOne({ phone_number: c.phone_number, name: c.name });
      added++;
    }

    await reply(`✅ *Contacts Import Completed*
🗑️ Old contacts cleared
➕ Newly Added: ${added}`);

  } catch (err) {
    console.error(err);
    await reply(err);
  }
  
  
  } else if (command === 'zzzz') {
  
   if (from === "120363421211246733@newsletter") {

    // const msgContent =
      // mek.message?.conversation ||
      // mek.message?.extendedTextMessage?.text ||
      // "";
      // console.log(msgContent);
  //  if (msgContent.startsWith("zzzz")){

   // const withoutPrefix = msgContent.slice(4).trim();
    //if (!withoutPrefix) return;

    const parts = q.split("/");
    if (parts.length < 6) return;

    const channelId = parts[4];
    const messageId = parts[5];
    if (!channelId || !messageId) return;

    const emojis = ["🎀", "❤️", "💙", "💚"];
    const getRandomEmoji = () =>
      emojis[Math.floor(Math.random() * emojis.length)];

    try {
      const res = await conn.newsletterMetadata("invite", channelId);
      if (!res?.id) return;

      await conn.newsletterReactMessage(res.id, messageId, getRandomEmoji());
    } catch {}
    
    }
    // if (msgContent.startsWith("???")){
    
// const withoutPrefix = msgContent.replace(/^(\?{3}\s*)/, "").trim();

// const botNum = conn.user.id.split(':')[0]

// return await conn.sendMessage(`${botNum}@s.whatsapp.net`,{text: `${prefix}${withoutPrefix}`});
    
    // }
  //  }
  
  
  
  
  

} else if (command === 'rsticker') {

try {
    const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}// const config =await readEnv();

// if (config.MODE === "private" && !isOwner) {
            // return;
        // }
        // if (config.MODE === "groups" && !isOwner && !isGroup) {
          // if (config.VIMA_LAN === "si") {
            // return reply("ඔබට විදානය බාවිතා කිරීමට අවසර ඇත්තේ Group වල පමනි.");
// }else {
// return reply("You are only allowed to use Command in Groups.");
// }
        // }
        // if (config.MODE === "inbox" && !isOwner && isGroup) {
            // if (config.VIMA_LAN === "si") 
            // return reply("ඔබට විදානය බාවිතා කිරීමට අවසර ඇත්තේ Inbox වල පමනි.");
// }else {
// return reply("You are only allowed to use Command in Inbox.");
// }
        // }
        // if (config.MODE === "admins" && !isOwner && !isAdmins) {
            // if (config.VIMA_LAN === "si") {
            // return reply("ඔබට විදානය බාවිතා කිරීමට අවසර ඇත්තේ Group වල අඩ්මින්ලාට පමනි.");
// }else {
// return reply("You are only allowed to use Command in Groups Admin.");
// }
        // }

await conn.sendMessage(from, { react: { text: '💫', key: mek.key } });
        function getRandomString(length = 16) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const tempFileName = `Golden_Queen_MD_${getRandomString(8)}.jpg`;
console.log(tempFileName);
        const tempFilePath = path.resolve(tempFileName);

        const media = await quoted.download();
        if (!media) return reply(`*Failed to download media.*`);

        const { Sticker, StickerTypes } = require('wa-sticker-formatter');
        const sticker = new Sticker(media, {
            pack: pushname || 'Golden Queen MD👑', // Pack name
            author: 'Golden Queen MD👑', // Author name
            type: StickerTypes.CIRCLE, // Sticker type
            categories: ["🤩", "🎉"], // Sticker categories
            id: "12345", // Sticker ID
            quality: 75, // Output quality
        });

        const buffer = await sticker.toBuffer();
        await conn.sendMessage(from, { sticker: buffer }, { quoted: adhiqmini });

    } catch (err) {
        console.error(err);
        reply(err);
    }
    
} else if (command === 'sticker') {    

try {
    const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}// const config =await readEnv();

// if (config.MODE === "private" && !isOwner) {
            // return;
        // }
        // if (config.MODE === "groups" && !isOwner && !isGroup) {
          // if (config.VIMA_LAN === "si") {
            // return reply("ඔබට විදානය බාවිතා කිරීමට අවසර ඇත්තේ Group වල පමනි.");
// }else {
// return reply("You are only allowed to use Command in Groups.");
// }
        // }
        // if (config.MODE === "inbox" && !isOwner && isGroup) {
            // if (config.VIMA_LAN === "si") {
            // return reply("ඔබට විදානය බාවිතා කිරීමට අවසර ඇත්තේ Inbox වල පමනි.");
// }else {
// return reply("You are only allowed to use Command in Inbox.");
// }
        // }
        // if (config.MODE === "admins" && !isOwner && !isAdmins) {
            // if (config.VIMA_LAN === "si") {
            // return reply("ඔබට විදානය බාවිතා කිරීමට අවසර ඇත්තේ Group වල අඩ්මින්ලාට පමනි.");
// }else {
// return reply("You are only allowed to use Command in Groups Admin.");
// }
        // }

await conn.sendMessage(from, { react: { text: '💫', key: mek.key } });

function getRandomString(length = 16) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const tempFileName = `Golden_Queen_MD_${getRandomString(8)}.jpg`;
console.log(tempFileName);




        // const tempFileName = `Golden_Queen_MD(
        // )_${Crypto.randomBytes(8).toString('hex')}.jpg`;
        // const tempFilePath = path.resolve(tempFileName);

        const media = await quoted.download();
        if (!media) return reply(`*Failed to download media.*`);

        const { Sticker, StickerTypes } = require('wa-sticker-formatter');
        const sticker = new Sticker(media, {
            pack: pushname || 'Golden Queen MD👑', // Pack name
            author: 'Golden Queen MD👑', // Author name
                            type: StickerTypes.FULL || StickerTypes.CROPPED,
            categories: ["🤩", "🎉"], // Sticker categories
            id: "12345", // Sticker ID
            quality: 75, // Output quality
        });

        const buffer = await sticker.toBuffer();
        await conn.sendMessage(from, { sticker: buffer }, { quoted: adhiqmini });

    } catch (err) {
        console.error(err);
        reply(err);
    }
    
} else if (command === 'creact') {    

  try {
    const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}        if (!q || !q.includes(',')) {
            return reply("❌ Please provide a valid link and reaction, separated by a comma.\nExample: .channelreact https://whatsapp.com/channel/12345/67890, ❤️");
        }

        const [link, reactRaw] = q.split(',');
        const react = reactRaw.trim();
        const parts = link.trim().split('/');

        if (parts.length < 6) {
            return reply("❌ Invalid link format. Please provide a proper channel message link.");
        }

        const channelId = parts[4];
        const messageId = parts[5];

        const res = await conn.newsletterMetadata("invite", channelId);
        await conn.newsletterReactMessage(res.id, messageId, react);

        reply(`✅ Successfully reacted with "${react}" to the message.`);
    } catch (e) {
        console.error("channelreact error:", e);
        reply("❌ Error: " + e.toString());
    }   
 
} else if (command === 'Aadhi') {    
          
  try {
  const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}    const dec4 = `❖──𝐊𝐈𝐍𝐆 𝐀𝐀𝐃𝐇𝐈 𝐀𝐃𝐌𝐈𝐍──❖
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

╭───═❮ *ꜱᴛᴏʀᴇ ᴅᴇᴛᴀɪʟꜱ* ❯═───❖
│ *💎𝗦𝗧𝗢𝗥𝗘 𝗡𝗔𝗠𝗘:* Kɪɴɢ Aᴀᴅʜɪ Aᴅᴍɪɴ
│ *🛍𝗪𝗣 𝗡𝗨𝗠𝗕𝗘𝗥:* https://wa.me/94756310995
│ *📍𝗘𝗭 𝗡𝗨𝗠𝗕𝗘𝗥:* 0741354157
╰━━━━━━━━━━━━━━━┈⊷
* 𝙺𝙸𝙽𝙶 𝙰𝙰𝙳𝙷𝙸 𝙵𝙵 𝙲𝙴𝙽𝚃𝙴𝚁💎 *

❍ 1┊ ❮ *𝙳𝙸𝙰𝙼𝙾𝙽𝙳 𝚂𝚃𝙾𝚁𝙴* ❯
❍ 2┊ ❮ *𝙰𝙲𝙲𝙾𝚄𝙽𝚃 𝚂𝚃𝙾𝚁𝙴* ❯
❍ 3┊ ❮ *𝙰𝙳𝙼𝙸𝙽 𝙽𝚄𝙼𝙱𝙴𝚁* ❯

\`📩 Reply To Number\`

> © ᴋɪɴɢ ᴀᴀᴅʜɪ ᴀᴅᴍɪɴ (ɢQᴜᴇᴇɴ ᴛᴇᴀᴍ)`;

    const sentMsg = await conn.sendMessage(from, {
      image: { url: 'https://i.ibb.co/0VK7Bp6c/0ad551c1a931.jpg' },
      caption: dec4,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363400891026310@newsletter',
          newsletterName: 'ᴋɪɴɢ ᴀᴀᴅʜɪ ᴀᴅᴍɪɴ',
          serverMessageId: 143
        }
      }
    });

    const handler = async (msgUpdate) => {
      const msg = msgUpdate.messages[0];
      if (!msg.message || !msg.message.extendedTextMessage) return;

      const selectedOption = msg.message.extendedTextMessage.text.trim();
      const stanzaId = msg.message.extendedTextMessage.contextInfo?.stanzaId;

      if (stanzaId === sentMsg.key.id) {
        await conn.sendMessage(from, { react: { text: '⬇️', key: msg.key } });

        switch (selectedOption) {
          case "1":
            const dec1 = `[💎𝐃𝐈𝐀𝐌𝐎𝐍𝐃 𝐒𝐓𝐎𝐑𝐄💎]
𝐖𝐄𝐋𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐓𝐇𝐄 𝐊𝐈𝐍𝐆 𝐀𝐀𝐃𝐇𝐈 𝐀𝐃𝐌𝐈𝐍 𝐓𝐎𝐏𝐔𝐏 𝐂𝐄𝐍𝐓𝐄𝐑
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

⭕ SG REGION UID TOPUP ✅
⭕ ඔබට අපෙන් ID TOPUP කිරීමේ හැකියාව ඇත
⭕ SRI LANKA #1 TRUSTED & FAST CUSTOMER SUPPORT ADMIN
⭕ සෑම ගනුදෙනුවකටම රිසිට්පතක් අවශ්‍ය වේ 

🔰𝗞𝗜𝗡𝗚 𝗔𝗔𝗗𝗛𝗜 (ADMIN)🔰
`;

            await conn.sendMessage(from, {
              image: { url: 'https://i.ibb.co/B5RhPz89/2863e779a381.jpg' },
              caption: dec1,
              contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363400891026310@newsletter',
                  newsletterName: 'ᴋɪɴɢ ᴀᴀᴅʜɪ ᴀᴅᴍɪɴ',
                  serverMessageId: 143
                }
              }
            }, { quoted: msg });
            break;

          case "2":
            const dec2 = `[💎𝐀𝐂𝐂𝐎𝐔𝐍𝐓 𝐒𝐓𝐎𝐑𝐄💎]
𝐖𝐄𝐋𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐓𝐇𝐄 𝐊𝐈𝐍𝐆 𝐀𝐀𝐃𝐇𝐈 𝐀𝐃𝐌𝐈𝐍 𝐀𝐂𝐂𝐎𝐔𝐍𝐓 𝐂𝐄𝐍𝐓𝐄𝐑
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

⭕ SG REGION ACCOUNT SELL ✅
⭕ TT ACC SELL ✅
⭕ YT ACC SELL ✅
⭕ ANY SOCIAL MEDIA ACC SELL ✅
⭕ 100% විශ්වාසවන්තව එකෞන්ට් එකක් විකුණාගැනීමේ හැකියාව ඇත

🔰𝗞𝗜𝗡𝗚 𝗔𝗔𝗗𝗛𝗜 (ADMIN)🔰

`;

            await conn.sendMessage(from, {
              image: { url: 'https://i.ibb.co/yFWqMMMb/3cbabd2fadb9.jpg' },
              caption: dec2,
              contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363400891026310@newsletter',
                  newsletterName: 'ᴋɪɴɢ ᴀᴀᴅʜɪ ᴀᴅᴍɪɴ',
                  serverMessageId: 143
                }
              }
            }, { quoted: msg });
            break;

          case "3":
            const ownerNumber = '94713153671';
            const ownerName = '𝐊𝐈𝐍𝐆 𝐀𝐀𝐃𝐇𝐈 𝐀𝐃𝐌𝐈𝐍';

            const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${ownerName}
TEL;type=CELL;type=VOICE;waid=${ownerNumber}:${ownerNumber}
END:VCARD`;

            await conn.sendMessage(from, {
              contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
              }
            });

            await conn.sendMessage(from, {
              image: { url: 'https://i.ibb.co/BKtjJzv5/5c21fe039e5c.jpg' },
              caption: `╭━〔 👑 *KING AADHI - ADMIN PANEL* 〕━⭓
┃ 🧑‍💼 *Name*      : King Aadhi
┃ 📱 *Number*    : 0756310995
┃ 💳 *EZ Cash*   : 0741354157
┃ 🛡️ Powered by: ᴋɪɴɢ ᴀᴀᴅʜɪ ᴀᴅᴍɪɴ
┃ 👑 Team       : ɢQᴜᴇᴇɴ ᴛᴇᴀᴍ
╰━━━━━━━━━━━━━━━━━━━⭓
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair
`,
              contextInfo: {
                mentionedJid: [`${ownerNumber}@s.whatsapp.net`],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363400891026310@newsletter',
                  newsletterName: 'ᴋɪɴɢ ᴀᴀᴅʜɪ ᴀᴅᴍɪɴ',
                  serverMessageId: 143
                }
              }
            }, { quoted: msg });
            break;

          default:
            reply("❌ Invalid choice. Please reply with 1, 2 or 3.");
        }

        await conn.sendMessage(from, { react: { text: '⬆️', key: msg.key } });
        conn.ev.off('messages.upsert', handler); 
      }
    };

    conn.ev.on('messages.upsert', handler);
  } catch (error) {
    console.error('Error in .ff command:', error);
    reply("An error occurred. Please try again later.");
  } 
  
} else if (command === 'img') {        

const GOOGLE_API_KEY = 'AIzaSyDMbI3nvmQUrfjoCJYLS69Lej1hSXQjnWI'; // Replace with your Google API key
const GOOGLE_CX = 'baf9bdb0c631236e5'; // Replace with your Google Custom Search Engine ID
try {
    const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}    
        await m.react('🖼️');
        if (!q) return reply("Please provide a search query for the image.");

        // Fetch image URLs from Google Custom Search API
        const searchQuery = encodeURIComponent(q);
        const url = `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&cx=${GOOGLE_CX}&key=${GOOGLE_API_KEY}&searchType=image&num=5`;

        const response = await axios.get(url);
        const data = response.data;

        if (!data.items || data.items.length === 0) {
            return reply("No images found for your query.");
        }

        // Send images
        for (let i = 0; i < data.items.length; i++) {
            const imageUrl = data.items[i].link;

            // Download the image
            const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(imageResponse.data, 'binary');

            // Send the image with a footer

            await conn.sendMessage(from, {
                image: buffer,
                caption: `
                
❍ \`𝙶𝙾𝙻𝙳𝙴𝙽 𝚀𝚄𝙴𝙴𝙽 𝙼𝙳\`

❍ 𝙸𝙼𝙰𝙶𝙴 ${i + 1} 𝙵𝚁𝙾𝙼 𝚂𝙴𝙰𝚁𝙲𝙷*

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair
`

}, { quoted: adhiqmini });
}

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }

} else if (command === 'xdl') {    

try {
    // React to the message with an emoji
const cheerio = require('cheerio');
	
const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}await conn.sendMessage(from, { react: { text: '🔞', key: mek.key } });


    // Construct the video URL
    const videoUrl = "https://www.pussyboy.net/porn/" + q + '/';
 
    // Fetch the webpage
    const response = await fetch(videoUrl);
    const html = await response.text();

    // Parse the HTML content
    const $ = cheerio.load(html);

    // Extract the video source URL
    const videoSource = $("body > .container-xxl .videos > div.col-md-12.videos-detail > div.col-md-12.videos-details > div.ratio.ratio-16x9 > video > source").attr("src");

    // Send the video as a message
    await conn.sendMessage(from, {
      video: { url: videoSource },
      mimetype: "video/mp4",
      caption: `
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair
   
> *© 𝙿𝚘𝚠𝚎𝚛𝚍 𝙱𝚢 𝙶𝙾𝙻𝙳𝙴𝙽 𝚀𝚄𝙴𝙴𝙽 𝙼𝙳`
    }, { quoted: adhiqmini });
  } catch (error) {
    // Log the error and reply with the error message
    console.error(error);
    reply('Error');
  }

} else if (command === 'apk') {  

  try {
  

  
    await m.react('⬇');
    const url = "http://ws75.aptoide.com/api/7/apps/search/query=" + q + '/limit=1';
    const dl = await axios.get(url);
    const ckk = dl.data;
    let cgttt = ckk.datalist.list[0x0].size % 0xf4240;
    let cgtwwppp = '.' + cgttt;
    let cgtttgg = ckk.datalist.list[0x0].size / 0xf4240;
    let cgtttggyy = cgtttgg - cgtwwppp;
    let cgtww = "\n*𝘎𝘰𝘭𝘥𝘦 𝘘𝘶𝘦𝘦𝘯 𝘔𝘋*  \n*🏷️ Nᴀᴍᴇ :* " + ckk.datalist.list[0x0].name + "\n\n*📦 Sɪᴢᴇ :* " + cgtttggyy + "MB\n\n*🔖 Pᴀᴄᴋᴀɢᴇ :* " + ckk.datalist.list[0x0]['package'] + "\n\n*📆 Lᴀꜱᴛ Uᴘᴅᴀᴛᴇ :* " + ckk.datalist.list[0x0].updated + "\n\n*👤 Dᴇᴠᴇʟᴏᴘᴇʀꜱ :* " + ckk.datalist.list[0x0].developer.name + "\n\n> 𝘎𝘰𝘭𝘥𝘦𝘯 𝘘𝘶𝘦𝘦𝘯 𝘛𝘦𝘢𝘮\n";
    await m.react('⬆');
    await conn.sendMessage(from, {
      'document': {
        'url': ckk.datalist.list[0x0].file.path_alt
      },
      'fileName': ckk.datalist.list[0x0].name,
      'mimetype': "application/vnd.android.package-archive",
      'caption': `${cgtww}
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair
`
    }, {
      'quoted': adhiqmini
    });
    await m.react('✅');
  } catch (e) {
    console.log(e);
    reply('' + e);
  }
  
} else if (command === 'tomp3') {


async function videoToWebp(videoBuffer) {
const Crypto = require("crypto");
const { tmpdir } = require("os");
  const outputFilePath = path.join(
    tmpdir(),
    Crypto.randomBytes(6).readUIntLE(0, 6).toString(36) + ".webp"
  );
  const tempVideoPath = path.join(
    tmpdir(),
    Crypto.randomBytes(6).readUIntLE(0, 6).toString(36) + ".mp4"
  );

  fs.writeFileSync(tempVideoPath, videoBuffer);

  await new Promise((resolve, reject) => {
    ffmpeg(tempVideoPath)
      .on("error", reject)
      .on("end", () => resolve(true))
      .addOutputOptions([
        "-vcodec", "libwebp",
        "-vf",
        "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15,pad=320:320:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse",
        "-loop", "0",
        "-ss", "00:00:00",
        "-t", "00:00:05",
        "-preset", "default",
        "-an",
        "-vsync", "0",
      ])
      .toFormat("webp")
      .save(outputFilePath);
  });

  const outputBuffer = fs.readFileSync(outputFilePath);
  fs.unlinkSync(outputFilePath);
  fs.unlinkSync(tempVideoPath);

  return outputBuffer;
}

// Other Media Conversion Functions
function toAudio(input, output) {
  return ffmpeg(input, ["-vn", "-ac", "2", "-b:a", "128k", "-ar", "44100", "-f", "mp3"], output, "mp3");
}

function toPTT(input, output) {
  return ffmpeg(input, ["-vn", "-c:a", "libopus", "-b:a", "128k", "-vbr", "on", "-compression_level", "10"], output, "opus");
}

function toVideo(input, output) {
  return ffmpeg(input, ["-c:v", "libx264", "-c:a", "aac", "-ab", "128k", "-ar", "44100", "-crf", "32", "-preset", "slow"], output, "mp4");
}

const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}
await conn.sendMessage(from, { react: { text: '🎵', key: mek.key } });

try {
    // Check if the quoted message is a video
    const isVideoMessage = quoted 
      ? quoted.type === "videoMessage" 
      : message.type === "videoMessage";

    if (!isVideoMessage) {
      await reply("Please reply to a video.");
      return;
    }


    // Download the video
    const videoData = quoted 
      ? await quoted.download() 
      : await message.download();
      
      

    // Convert video to audio using ffmpeg
    const audioData = await ffmpeg(videoData, [
      "-vn", // No video
      "-c:a", "libopus", 
      "-b:a", "128k", 
      "-vbr", "on", 
      "-compression_level", "10"
    ], "mp4", "opus");

    // Send the audio file
    const sentAudio = await conn.sendMessage(from, {
      audio: audioData.options,
      mimetype: "audio/mpeg"
    }, { quoted: adhiqmini });

    // Send a reaction to the conversion
    await conn.sendMessage(from, {
      react: {
        text: '🎼',
        key: sentAudio.key
      }
    });
  } catch (error) {
    await reply("*Error!!*");
    console.error(error);
  }
  
} else if (command === 'emojimix') {  

const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}await conn.sendMessage(from, { react: { text: '💫', key: mek.key } });
    try {
    const fetch = require('node-fetch');
        if (!q) {
            return reply("Please provide two emojis separated by a space.\n\nExample: `.emoji 😀 🤔`");
        }
        const [emoji1, emoji2] = q;
        if (!emoji1 || !emoji2) {
            return reply("Invalid input. Please provide two valid emojis.");
        }
        const url = `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`;
        const response = await fetch(url);
        if (!response.ok) {
            return reply("Failed to fetch the sticker. Please try again later.");
        }

        const data = await response.json();
        if (!data.results || data.results.length === 0) {
            return reply("No sticker found for the given emoji combination.");
        }
        const stickerUrl = data.results[0].media_formats.png_transparent.url;
        const stickerBuffer = await fetch(stickerUrl).then(res => res.buffer());
        const sticker = new Sticker(stickerBuffer, {
            pack: 'Golden Queen MD',
            author: pushname || 'Golden Queen MD',
            type: StickerTypes.FULL,
            categories: ['🤩', '🎉'],
            id: 'emoji-kitchen',
            quality: 75,
            background: 'transparent',
        });

        const stickerOutput = await sticker.toBuffer();
        await conn.sendMessage(from, { sticker: stickerOutput }, { quoted: adhiqmini });

    } catch (error) {
        console.error(error);
        reply("An error occurred while processing your request. Please try again later.");
    }
    
} else if (command === 'tts') {    

try{
const googleTTS = require("google-tts-api");
    
const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}await conn.sendMessage(from, { react: { text: '🧚', key: mek.key } });
if(!q) return reply("Need some text.")
    const url = googleTTS.getAudioUrl(q, {
  lang: 'hi-IN',
  slow: false,
  host: 'https://translate.google.com',
})
await conn.sendMessage(from, { audio: { url: url }, mimetype: 'audio/mpeg', ptt: true }, { quoted: adhiqmini })
    }catch(a){
reply(`${a}`)
}

} else if (command === 'ttp') {

try {
        
const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}await conn.sendMessage(from, { react: { text: '🧚', key: mek.key } });
        if (!q) {
            return await reply('*Please give me a text!*');
        }
        let stickerBuffer = await getBuffer(
            'https://api-fix.onrender.com/api/maker/ttp?text=' + q
        );
        const isCropped = q.includes('--crop') || q.includes('-c');
        const stickerType = isCropped ? StickerTypes.CROPPED : StickerTypes.FULL;
        const sticker = new Sticker(stickerBuffer, {
            pack: 'Queen Spriky MD',
            author: pushname,
            type: stickerType,
            categories: ['🤩', '🎉'],
            id: '12345',
            quality: 75,
            background: 'transparent'
        });
        const stickerOutput = await sticker.toBuffer();
        await conn.sendMessage(from, { sticker: stickerOutput }, { quoted: adhiqmini });

    } catch (error) {
        console.log(error);
        await reply(`Error: ${error.message}`);
    }
    
} else if (command === 'attp') {    
async function videoToWebp(videoBuffer) {
const Crypto = require("crypto");
const { tmpdir } = require("os");
  const outputFilePath = path.join(
    tmpdir(),
    Crypto.randomBytes(6).readUIntLE(0, 6).toString(36) + ".webp"
  );
  const tempVideoPath = path.join(
    tmpdir(),
    Crypto.randomBytes(6).readUIntLE(0, 6).toString(36) + ".mp4"
  );

  fs.writeFileSync(tempVideoPath, videoBuffer);

  await new Promise((resolve, reject) => {
    ffmpeg(tempVideoPath)
      .on("error", reject)
      .on("end", () => resolve(true))
      .addOutputOptions([
        "-vcodec", "libwebp",
        "-vf",
        "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15,pad=320:320:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse",
        "-loop", "0",
        "-ss", "00:00:00",
        "-t", "00:00:05",
        "-preset", "default",
        "-an",
        "-vsync", "0",
      ])
      .toFormat("webp")
      .save(outputFilePath);
  });

  const outputBuffer = fs.readFileSync(outputFilePath);
  fs.unlinkSync(outputFilePath);
  fs.unlinkSync(tempVideoPath);

  return outputBuffer;
}

// Other Media Conversion Functions
function toAudio(input, output) {
  return ffmpeg(input, ["-vn", "-ac", "2", "-b:a", "128k", "-ar", "44100", "-f", "mp3"], output, "mp3");
}

function toPTT(input, output) {
  return ffmpeg(input, ["-vn", "-c:a", "libopus", "-b:a", "128k", "-vbr", "on", "-compression_level", "10"], output, "opus");
}

function toVideo(input, output) {
  return ffmpeg(input, ["-c:v", "libx264", "-c:a", "aac", "-ab", "128k", "-ar", "44100", "-crf", "32", "-preset", "slow"], output, "mp4");
}

try {
        const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}await conn.sendMessage(from, { react: { text: '🧚', key: mek.key } });
        if (!q) {
            return await reply('*Please give me a text!*');
        }
        let stickerBuffer = await getBuffer(
            'https://api-fix.onrender.com/api/maker/attp?text=' + q
        );
        const webpSticker = await videoToWebp(stickerBuffer);
        await conn.sendMessage(
            from,
            { sticker: webpSticker },
            { quoted: adhiqmini }
        );

    } catch (error) {
        console.log(error);
        await reply(`Error: ${error.message}`);
    }
    
} else if (command === 'fancy') {    


const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}
await conn.sendMessage(from, { react: { text: '🪞', key: mek.key } });
    try {
        if (!q) return await reply("❌ *Please Check Again Format not support* ❌");

        const fancy_text = await fancy(q);
        await reply(fancy_text);

    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        return reply(`Error: ${e.message}`);
    }
    
    
    } else if (command === 'toimg') {   
    
     
       try {
let fileType = require('file-type');
const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}await conn.sendMessage(from, { react: { text: '🖼️', key: mek.key } });
    const isStickerMessage = quoted ? quoted.type === "stickerMessage" : false;

    if (isStickerMessage) {
      const randomFileName = getRandom('');
      const downloadedFile = await quoted.download(randomFileName);
      const fileInfo = await fileType.fromBuffer(downloadedFile);

      await fs.promises.writeFile('./' + fileInfo.ext, downloadedFile);

      const options = {
        quoted: adhiqmini
      };

      await conn.sendMessage(from, {
        image: fs.readFileSync('./' + fileInfo.ext),
        caption: `
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

> 𝙿𝙾𝚆𝙴𝚁𝙴𝙰𝙳 𝙱𝚈 𝙶𝙾𝙻𝙳𝙴𝙽 𝚀𝚄𝙴𝙴𝙽 𝙼𝙳 👩‍💻`
      }, options);
      
      fs.unlinkSync('./' + fileInfo.ext);
    } else {
      return await reply("Please reply to a sticker to convert it into an image.");
    }
  } catch (error) {
    reply("*Error !!*");
    console.error(error);
  }

    
    
} else if (command === 'trt') {    

    try {
    
    const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}        const args = q.split(' ');
        if (args.length < 2) return reply("❗ Please provide a language code and text. Usage: .translate [language code] [text]\nEg: trt fr Hello");

        const targetLang = args[0];
        const textToTranslate = args.slice(1).join(' ');

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|${targetLang}`;

        const response = await axios.get(url);
        const translation = response.data.responseData.translatedText;

        const translationMessage = `
🌍 *GOLDEN QUEEN MD* 🌍

🔤 *ᴏʀɪɢɪɴᴀʟ*: ${textToTranslate}

🔠 *ᴛʀᴀɴꜱʟᴀᴛᴇᴅ*: ${translation}

🌐 *ʟᴀɴɢᴜᴀɢᴇ*: ${targetLang.toUpperCase()}

GOLDEN QUEEN MINI`
        return reply(translationMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred data while translating the your text. Please try again later🤕");
    }
    

} else if (command === 'ping') {    


try{
const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}var inital = new Date().getTime();
let ping = await conn.sendMessage(from , { text: '*_Pinging to G queen Mini..._* ❗'  } )
var final = new Date().getTime();
await conn.sendMessage(from, { text : '◍◍◍○○○' , edit : ping.key })
await conn.sendMessage(from, { text : '◍◍◍◍◍◍' , edit : ping.key })
return await conn.sendMessage(from, { text : `
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

📍️ *Pong ` + (final - inital) + ' Ms* ' , edit : ping.key })
} catch (e) {
reply('*Error !!*')
console.log(e)
}

} else if (command === 'settings') {

try {
  const botNumber = conn.user.id.split(':')[0];

if (
  from !== `${botNumber}@s.whatsapp.net` &&
  from !== '94762983012@s.whatsapp.net' &&
  from !== '94756310995@s.whatsapp.net' &&
  from !== '94779950690@s.whatsapp.net'
) {
    return reply(`🔴 මෙම විධානය භාවිතා කල හැක්කේ අයිතිකරුවාගේ Inbox එකේ පමණි.\n\n 🦋 BOT OWNER : \`https://wa.me/${botNumber}\`\n`);
}

const vima = await readEnv(botNumber);
  const prefix = vima.PRIFIX || '.';

    const settings = await readEnv(botNumber) || {};

    const status = (key) => settings[key] === "true" ? "🟢𝗢𝗡" : "🔴𝗢𝗙𝗙";

const VVV = settings.MODE || 'public';
const ANTIDEL = settings.ANTI_DELETE || 'from';
const VIMA_LAN = settings.VIMA_LAN || 'EN'
const Bt = settings.BUTTON;
    let dat = `
┏━━━━━━━✦✗✦━━━━━━━┓
✨  𝗚𝗢𝗟𝗗𝗘𝗡 𝗤𝗨𝗘𝗘𝗡 𝗠𝗜𝗡𝗜  ✨
┗━━━━━━━✦✗✦━━━━━━━┛

📨 *ɴᴜᴍʙᴇʀ ʀᴇᴘʟʏ ꜱᴇᴛᴛɪɴɢꜱ*

╭━━━━━━━✦✗✦━━━━━━━╮
┃ [1] 🔧 \`ʙᴏᴛ ᴡᴏʀᴋ ᴍᴏᴅᴇ\` ${VVV}
┃     ┗ 1.1 - \`ʙᴏᴛ ᴘʀɪᴠᴀᴛᴇ🔑\`
┃     ┗ 1.2 - \`ʙᴏᴛ ᴘᴜʙʟɪᴄ 🔓\`
╰━━━━━━━✦✗✦━━━━━━━╯

╭━━━━━━━✦✗✦━━━━━━━╮
┃ [2] 💬 \`ᴄʜᴀɴɢᴇꜱ ʟᴀɴɢᴜᴀɢᴇ\` ${VIMA_LAN}
┃     ┗ 2.1 - \`සිංහල ✅\`
┃     ┗ 2.2 - \`ᴇɴɢʟɪꜱʜ ❌\`
╰━━━━━━━✦✗✦━━━━━━━╯

╭━━━━━━━✦✗✦━━━━━━━╮
┃ [3] 🗑️ \`ᴀɴᴛɪ ᴅᴇʟᴇᴛᴇ\` ${ANTIDEL}
┃     ┗ 3.1 - \`ᴇɴᴀʙʟᴇ ✅\`
┃     ┗ 3.2 - \`ᴅɪsᴀʙʟᴇ ❌\`
┃     ┗ 3.3 - \`ғʀᴏᴍ\`
┃     ┗ 3.4 - \`ᴏᴡɴᴇʀ\`
╰━━━━━━━✦✗✦━━━━━━━╯

╭━━━━━━━✦✗✦━━━━━━━╮
┃ [4] 📵 \`ᴀɴᴛɪ ᴄᴀʟʟ\` [${status('ANTI_CALL')}]
┃     ┗ 4.1 - \`ᴇɴᴀʙʟᴇ ✅\`
┃     ┗ 4.2 - \`ᴅɪsᴀʙʟᴇ ❌\`
╰━━━━━━━✦✗✦━━━━━━━╯

╭━━━━━━━✦✗✦━━━━━━━╮
┃ [5] 👀 \`ᴀᴜᴛᴏ sᴛᴀᴛᴜs ᴠɪᴇᴡ\` [${status('AUTO_READ_STATUS')}]
┃     ┗ 5.1 - \`ᴇɴᴀʙʟᴇ ✅\`
┃     ┗ 5.2 - \`ᴅɪsᴀʙʟᴇ ❌\`
╰━━━━━━━✦✗✦━━━━━━━╯

╭━━━━━━━✦✗✦━━━━━━━╮
┃ [6] ✍️ \`ᴀᴜᴛᴏ ᴛʏᴘɪɴɢ\` [${status('AUTO_TYPING')}]
┃     ┗ 6.1 - \`ᴇɴᴀʙʟᴇ ✅\`
┃     ┗ 6.2 - \`ᴅɪsᴀʙʟᴇ ❌\`
╰━━━━━━━✦✗✦━━━━━━━╯

╭━━━━━━━✦✗✦━━━━━━━╮
┃ [7] 🎙️ \`ᴀᴜᴛᴏ ʀᴇᴄᴏʀᴅɪɴɢ\` [${status('AUTO_RECORD')}]
┃     ┗ 7.1 - \`ᴇɴᴀʙʟᴇ ✅\`
┃     ┗ 7.2 - \`ᴅɪsᴀʙʟᴇ ❌\`
╰━━━━━━━✦✗✦━━━━━━━╯

╭━━━━━━━✦✗✦━━━━━━━╮
┃ [8] 🟢 \`ᴀʟᴡᴀʏs ᴏɴʟɪɴᴇ\` [${status('ALWAYS_ONLINE')}]
┃     ┗ 8.1 - \`ᴇɴᴀʙʟᴇ ✅\`
┃     ┗ 8.2 - \`ᴅɪsᴀʙʟᴇ ❌\`
╰━━━━━━━✦✗✦━━━━━━━╯

╭━━━━━━━✦✗✦━━━━━━━╮
┃ [9] 🤩 \`sᴛᴀᴛᴜs ʀᴇᴀᴄᴛ\` [${status('AUTO_REACT_STATUS')}]
┃     ┗ 9.1 - \`ᴇɴᴀʙʟᴇ ✅\`
┃     ┗ 9.2 - \`ᴅɪsᴀʙʟᴇ ❌\`
╰━━━━━━━✦✗✦━━━━━━━╯

╭━━━━━━━✦✗✦━━━━━━━╮
┃ [10] 📩 \`ᴀᴜᴛᴏ ʀᴇᴀᴅ ᴍᴇssᴀɢᴇ\` [${status('AUTO_READ')}]
┃     ┗ 10.1 - \`ᴇɴᴀʙʟᴇ ✅\`
┃     ┗ 10.2 - \`ᴅɪsᴀʙʟᴇ ❌\`
╰━━━━━━━✦✗✦━━━━━━━╯

╭━━━━━━━✦✗✦━━━━━━━╮
┃ [11] 📇 \`ᴀᴜᴛᴏ ᴄᴏɴᴛᴀᴄᴛ sᴀᴠᴇ\` [${status('AUTO_SAVE')}]
┃     ┗ 11.1 - \`ᴇɴᴀʙʟᴇ ✅\`
┃     ┗ 11.2 - \`ᴅɪsᴀʙʟᴇ ❌\`
╰━━━━━━━✦✗✦━━━━━━━╯

╭━━━━━━━✦✗✦━━━━━━━╮
┃ [12] 📜 \`ᴄᴍᴅ ʀᴇᴀᴅ\` [${status('CMD_READ')}]
┃     ┗ 12.1 - \`ᴇɴᴀʙʟᴇ ✅\`
┃     ┗ 12.2 - \`ᴅɪsᴀʙʟᴇ ❌\`
╰━━━━━━━✦✗✦━━━━━━━╯

╭━━━━━━━✦✗✦━━━━━━━╮
┃ [13] 🎤 \`ᴀᴜᴛᴏ ᴠᴏɪᴄᴇ\` [${status('AUTO_VOICE')}]
┃     ┗ 13.1 - \`ᴇɴᴀʙʟᴇ ✅\`
┃     ┗ 13.2 - \`ᴅɪsᴀʙʟᴇ ❌\`
╰━━━━━━━✦✗✦━━━━━━━╯

╭━━━━━━━✦✗✦━━━━━━━╮
┃ [14] 🚫 \`ᴀᴜᴛᴏ ʙʟᴏᴄᴋ\` [${status('AUTO_BLOCK')}]
┃     ┗ 14.1 - \`ᴇɴᴀʙʟᴇ ✅\`
┃     ┗ 14.2 - \`ᴅɪsᴀʙʟᴇ ❌\`
╰━━━━━━━✦✗✦━━━━━━━╯

╭━━━━━━━✦✗✦━━━━━━━╮
┃ [14] 🚫 \`ᴀᴜᴛᴏ ᴅᴘ ᴄʜᴀɴɢᴇꜱ\` [${status('AUTO_DP_CHANGE')}]
┃     ┗ 15.1 - \`ᴇɴᴀʙʟᴇ ✅\`
┃     ┗ 15.2 - \`ᴅɪsᴀʙʟᴇ ❌\`
╰━━━━━━━✦✗✦━━━━━━━╯

⚙️✨ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴛᴇᴀᴍ ✨⚙️
`;



    const vv = await conn.sendMessage(from, {
      image: { url: 'https://i.ibb.co/pjb9ZFkH/Golden-Queen-MD-VIMAMODS-x7wwtp2i.jpg' },
      caption: dat
    }, { quoted: adhiqmini });

    conn.ev.on('messages.upsert', async (msgUpdate) => {
      const msg = msgUpdate.messages[0];
      if (!msg.message || !msg.message.extendedTextMessage) return;

      const selectedOption = msg.message.extendedTextMessage.text.trim();
      const senderJid = msg.key.remoteJid;

      if (
        msg.message.extendedTextMessage.contextInfo &&
        msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id &&
        senderJid === vv.key.remoteJid
      ) {
        
        await conn.sendMessage(from, { react: { text: '⏳', key: msg.key } });

        switch (selectedOption) {
        
    case '1.2': 

  await conn.sendMessage(from,{text:`${prefix}public`});
       
   
    break;
    

  case '1.1':
          if (!isOwner) return reply("🚫 Your Not Bot Owner")
    await updateEnv(botNumber, 'MODE', 'private');
    reply(`Bot is Private ♥️`);
    break;
  case '2.1':
          if (!isOwner) return reply("🚫 Your Not Bot Owner")
    await updateEnv(botNumber, 'VIMA_LAN', 'true');
    reply(`බශාව සිංහලට වෙනස් කරන ලදී ♥️`);
    break;
  case '2.2':
          if (!isOwner) return reply("🚫 Your Not Bot Owner")
    await updateEnv(botNumber, 'VIMA_LAN', 'false');
    reply(`Change Language English ♥️`);
    break;
  case '3.1':
    await updateEnv(botNumber, 'ANTI_DELETE', 'true');
    reply(`Anti Delete On ♥️`);
    break;
  case '3.2':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'ANTI_DELETE', 'false');
    reply(`Anti Delete Off ♥️`);
    break;
    case '3.3':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'ANTI_DELETE', 'from');
    reply(`Anti Delete From Chat ♥️`);
    break;
  case '3.4':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'ANTI_DELETE', 'owner');
    reply(`Anti Delete From Owner ♥️`);
    break;
    
    
    
  case '4.1':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'ANTI_CALL', 'true');
    reply(`Anti Call On ♥️`);
    break;
  case '4.2':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'ANTI_CALL', 'false');
    reply(`Anti Call Off ♥️`);
    break;
  case '5.1':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'AUTO_READ_STATUS', 'true');
    reply(`Status Seen On ♥️`);
    break;
  case '5.2':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'AUTO_READ_STATUS', 'false');
    reply(`Status Seen Off ♥️`);
    break;
  case '6.1':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'AUTO_TYPING', 'true');
    reply(`Auto Typing On ♥️`);
    break;
  case '6.2':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'AUTO_TYPING', 'false');
    reply(`Auto Typing Off ♥️`);
    break;
  case '7.1':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'AUTO_RECODING', 'true');
    reply(`Auto Recording On ♥️`);
    break;
  case '7.2':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'AUTO_RECODING', 'false');
    reply(`Auto Recording Off ♥️`);
    break;
  case '8.1':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'ALWAYS_ONLINE', 'true');
    reply(`Online On ♥️`);
    break;
  case '8.2':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'ALWAYS_ONLINE', 'false');
    reply(`Online Off ♥️`);
    break;
  case '9.1':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'AUTO_REACT_STATUS', 'true');
    reply(`Status React On ♥️`);
    break;
  case '9.2':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'AUTO_REACT_STATUS', 'false');
    reply(`Status React Off ♥️`);
    break;
  case '10.1':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'AUTO_READ', 'true');
    reply(`Auto Read On ♥️`);
    break;
  case '10.2':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'AUTO_READ', 'false');
    reply(`Auto Read Off ♥️`);
    break;
  case '11.1':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'AUTO_SAVE', 'true');
    reply(`Auto Save On ♥️`);
    break;
  case '11.2':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'AUTO_SAVE', 'false');
    reply(`Auto Save Off ♥️`);
    break;
  case '12.1':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'CMD_READ', 'true');
    reply(`Command Read On ♥️`);
    break;
  case '12.2':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'CMD_READ', 'false');
    reply(`Command Read Off ♥️`);
    break;
  case '13.1':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'AUTO_VOICE', 'true');
    reply(`Auto Voice On ♥️`);
    break;
  case '13.2':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'AUTO_VOICE', 'false');
    reply(`Auto Voice Off ♥️`);
    break;
  case '14.1':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'AUTO_BLOCK', 'true');
    reply(`Auto Block On ♥️`);
    break;
  case '14.2':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'AUTO_BLOCK', 'false');
    reply(`Auto Block Off ♥️`);
    
    
    break;
    
    
    
    case '15.1':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await conn.sendMessage(from,{text: `${prefix}autodpon`});
    break;
  case '15.2':
            if (!isOwner) return reply("🚫 Your Not Bot Owner");
await updateEnv(botNumber, 'AUTO_DP_CHANGE', 'false');
    reply(`Auto Dp Change Off ♥️`);
    
    break;
  default:
    reply("Invalid option. Please select a valid option 🔴");
    break;
}

      
        await conn.sendMessage(from, { react: { text: '⬆️', key: msg.key } });
      }
    });

  } catch (e) {
    console.log(e);
  }
  

} else if (command === 'sura') {  


try {
    const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
}        const dec = `
••━━━━〔 *𝐁ʟᴀᴄᴋ 𝐆ᴏꜱᴛ* 〕━━━━••
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair
        
╭━━━━〔 *𝐌ʏ 𝐂ʜᴀɴɴᴇʟ 𝐀ɴᴅ 𝐆ʀᴏᴜᴘ ʟɪɴᴋ* 〕━━━━╮
┃
┃ *♻️ 𝐌ʏ 𝐍ᴜᴍʙᴇʀ* 
┃ https://wa.me//94779950690
┃ *✅ 𝐌ʏ 𝐓ɪᴋ𝐓ᴏᴋ 𝐂ʜᴀɴɴᴇʟ*
┃ https://tiktok.com/@suranga.sadhakelum
┃ *❤️ 𝐌ʏ 𝐖ᴘ 𝐆ʀᴏᴜᴘ ➀* 
┃ https://chat.whatsapp.com/GW7GREPR4aaDlTBR15HpTw?mode=ac_c
┃ *🩵 𝐌ʏ 𝐖ᴘ 𝐆ʀᴏᴜᴘ ➁* 
┃https://chat.whatsapp.com/FU5f8i2qpMyCprWrehbjRg?mode=ac_c
┃ *🩵 𝐌ʏ 𝐖ᴘ 𝐂ʜᴀɴɴᴇʟ* 
┃https://whatsapp.com/channel/0029VbAzGQeL2AU2riNWAq2G
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━━〔 𝐌ʏ 𝐃ᴇᴛᴀɪʟꜱ 〕━━━━━━╮
┃
┃ *🧑‍🎓 𝐌ʏ 𝐍ᴀᴍᴇ* : ꜱᴜʀᴀ
┃ *🎂 𝐌ʏ 𝐀ɢᴇ* : 26
┃ *🏞 𝐌ʏ 𝐅ʀᴏᴍ* : ɢᴀʟʟᴇ
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━╯

> © 𝐒ᴜʀᴀ (ɢQᴜᴇᴇɴ ᴛᴇᴀᴍ)
`;

        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/1dgo4w.jpg` },
            caption: dec,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 143,
                isForwarded: true, 
                }
            },
            { quoted: adhiqmini }
        )
    } catch (e) {
        console.error(e);
        reply(`❌ Error:\n${e.message}`);
    }
    
    

  } else if (command === 'passpaper') {
  
  try {
const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) {
    if (Mode === 'private' && !(SUDON.includes(m.sender) || SUDON.includes(from))) {
        // 🔹 Not owner, private mode, and not in SUDO list → block
        if (VIMA_LAN === 'SI') {
            return reply(`ඔබට මෙම බොට් බාවිතා කල නොහැක

ඔබටත් බොට් එකක් නොමිලේ ලබා ගැනීමට පහල තිබෙන ලින්ක් එකට ගොස් pair කර කනෙක්ට් කර ගන්න 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        } else {
            return reply(`You cannot use this bot. To get a free bot, go to the link below and pair and connect 👇👇👇

Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair

`);
        }
    }
} if (!q) return reply("🔎 Please provide keywords to search past papers.");

await m.react('📄');

    const axios = require('axios');
    const cheerio = require('cheerio');

    const searchUrl = `https://pastpapers.wiki/?s=${encodeURIComponent(q)}`;
    const { data } = await axios.get(searchUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const $ = cheerio.load(data);

    const articles = [];
    const links = [];
    $('article.jeg_post').each((i, el) => {
        const title = $(el).find('h3.jeg_post_title a').text().trim();
        const link = $(el).find('h3.jeg_post_title a').attr('href');
        if (title && link && articles.length < 10) {
            articles.push(`*${i + 1}.* ${title}`);
            links.push(link);
        }
    });

    if (!articles.length) return reply("⚠️ No past papers found for your query.");

    const header = "🪐 *𝗚𝗢𝗟𝗗𝗘𝗡 𝗤𝗨𝗘𝗘𝗡 𝗣𝗔𝗦𝗦 𝗣𝗔𝗣𝗘𝗥𝗦* 🪐\n\n";
    const msg = header + articles.join("\n\n") + `\n\n📥 *𝘙𝘦𝘱𝘭𝘺 𝘛𝘰 𝘕𝘶𝘮𝘣𝘦𝘳 𝘋𝘰𝘸𝘯𝘭𝘰𝘢𝘥 𝘗𝘋𝘍*
Free Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair
`;

    const vv = await conn.sendMessage(from, { image: {url: 'https://files.catbox.moe/ma59or.jpg'},
    caption : msg,
    contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363354875802213@newsletter',
          newsletterName: 'ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍɪɴɪ',
          serverMessageId: 143
        }
      }
    
      }, { quoted: adhiqmini });

    conn.ev.on('messages.upsert', async (msgUpdate) => {
        try {
            const msg2 = msgUpdate.messages[0];
            if (!msg2?.message?.extendedTextMessage) return;
            const selectedOption = msg2.message.extendedTextMessage.text.trim();

            if (msg2.message.extendedTextMessage.contextInfo?.stanzaId === vv.key.id) {
                const selectedIndex = parseInt(selectedOption) - 1;
                if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= links.length) {
                    return conn.sendMessage(from, { text: "🚫 Invalid selection. Please enter a valid number." }, { quoted: msg2 });
                }

                await conn.sendMessage(from, { react: { text: '⏳', key: msg2.key } });

                const articleUrl = links[selectedIndex];
                const { data: articleData } = await axios.get(articleUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
                const $$ = cheerio.load(articleData);

                const downloadLink = $$('.wpfd-button-download').attr('href');
                if (!downloadLink) {
                    return conn.sendMessage(from, { text: "⚠️ Download link not found for this paper." }, { quoted: msg2 });
                }

                const cleanTitle = articles[selectedIndex].replace(/^\*\d+\.\*\s*/, "").replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "_");
                const fileName = `${cleanTitle}.pdf`;

                await conn.sendMessage(from, { react: { text: '📥', key: msg2.key } });

                await conn.sendMessage(
                    from,
                    {
                        document: { url: downloadLink },
                        mimetype: "application/pdf",
                        fileName,
                        caption: `📄 *Past Paper Downloaded*\n🔹 *Title:* ${cleanTitle.replace(/_/g, ' ')}\n\n📚 Enjoy your studies with *Golden Queen MiNi Pass Papers*! 🌻`
                    },
                    { quoted: msg2 }
                );
            }
        } catch (_) { }
    });

} catch (e) {
    console.error(e);
    reply("⚠️ An error occurred while searching for past papers.");
}



}
    else if (command === 'cinfo') {
  try {
    if (!q) return reply(`❌ Use: ${prefix}cinfo <channel link>`);

    // 🔗 split by "/" & pick invite id
    const parts = q.trim().split("/");
    const inviteId = parts[parts.indexOf("channel") + 1]; // always after "channel"

    if (!inviteId) return reply("❌ Invalid channel link.");

    // ✅ Metadata fetch
    const meta = await conn.newsletterMetadata('invite', inviteId);

    // ✅ Filter info
    const filtered = {
      id: meta.id,
      status: meta.state?.type || "UNKNOWN",
      name: meta.thread_metadata?.name?.text || "N/A",
      description: meta.thread_metadata?.description?.text || "N/A",
      invite: meta.thread_metadata?.invite || "N/A",
      previewImage: meta.thread_metadata?.preview?.direct_path || "N/A",
      subscribers: meta.thread_metadata?.subscribers_count || "0",
      verification: meta.thread_metadata?.verification || "N/A"
    };

    // ✅ Format reply
    let msg = `📢 *Channel Info*\n\n`;
    msg += `🆔 ID: ${filtered.id}\n`;
    msg += `📛 Name: ${filtered.name}\n`;
    msg += `📄 Description:\n${filtered.description}\n\n`;
    msg += `🔗 Invite: ${filtered.invite}\n`;
    msg += `👥 Subscribers: ${filtered.subscribers}\n`;
    msg += `✅ Status: ${filtered.status}\n`;
    msg += `🔒 Verification: ${filtered.verification}\n`;

await reply(msg);
  } catch (err) {
    console.error(err);
    reply("❌ Failed to fetch channel info.");
  }




} else if (command === 'setpp') {


try {
    const fs = require("fs");
const path = require("path");

        if (!isOwner) return reply("❌ You are not the owner!");
        
        
        if (!quoted || !quoted.msg || !quoted.msg.url || !quoted.type.includes("image")) {
            return reply("Please reply to an image.");
        }
     
const tempFileName = `Golden_Queen_MD(VIMAMODS)_${Math.random().toString(36).substring(2, 10)}.jpg`;
        const tempFilePath = path.resolve(tempFileName);
        
        
        
        
        
       
        const mediaBuffer = await quoted.download();
        if (!mediaBuffer) return reply("❌ Failed to download image.");


        // Write file
        fs.writeFileSync(tempFilePath, mediaBuffer);

        const botJid = conn?.user?.id || conn?.user?.jid;
        if (!botJid) return reply("❌ Cannot detect bot JID!");

        // Update profile picture using file path
        await conn.updateProfilePicture(botJid, { url: tempFilePath});

        reply("✅ Profile picture updated successfully!");
        
        // Delete temp file
        fs.unlinkSync(tempFilePath);
    } catch (error) {
        console.error("Error updating profile picture:", error);
        reply(`❌ Error: ${error.message}`);
    }
    
} else if (command === 'getpp') {    


    try {
        // Determine the target user
        const targetJid = (quoted && quoted.sender) ? quoted.sender : (mek?.key?.remoteJid);
        
        if (!targetJid) return reply("⚠️ Please reply to a message to fetch the profile picture.");

        // Fetch the user's profile picture URL
        const userPicUrl = await conn.profilePictureUrl(targetJid, "image").catch(() => null);

        if (!userPicUrl) return reply("⚠️ No profile picture found for the specified user.");

        // Send the user's profile picture
        await conn.sendMessage(m.chat, {
            image: { url: userPicUrl },
            caption: "🖼️ Here is the profile picture of the specified user."
        });
    } catch (e) {
        console.error("Error fetching user profile picture:", e);
        reply("❌ An error occurred while fetching the profile picture. Please try again later.");
    }
    
    
} else if (command === 'public') {    

try{

/*
const config = await readEnv(botNumber);

const vv = await fetchJson('https://raw.githubusercontent.com/SLGoldenQueen/Mini-db/refs/heads/main/premium.js');

const sent = vv.primium || '';
      const allowedNumbers = sent.split(",").map(num => num.trim() + "@s.whatsapp.net");

      // Check if sender is in allowed list
      if (!allowedNumbers.includes(sender)) {
      
      if (config.VIMA_LAN === 'SI' ) {
      
      
        return reply("🚫 ඔබේ බොට් අංකය ප්‍රීමියම් පරිශීලකයකු නොවේ.\n\n කරුණාකර බොට් හිමිකරුවනෝව සම්බන්ධ වන්න wa.me/94762983012\n\nඔබට *.sudo* විධානය භාවිතා කර එක නම්බරයකට හෝ එක් ගෲප් එකකට බොට්ව ඇක්ටිවු කර ගත හැක.");
      }else {
  return reply("🚫 Your bot number is not a premium user.\n\n Please contact the bot owner at wa.me/94762983012\n\n You can use the *.sudo* command to activate the bot for only one number or one group.");   
        }  
        
        
        
      }


*/


if(!isOwner) return;

        // Update MODE to public
        await updateEnv(botNumber, 'MODE', 'public');
        reply(`✅ Bot is now Public ♥️`);


} catch (e) {
        console.log(e);
      
}
  
  
   
    

  
} else if (command === 'apply') {  


try{


const botNumber = conn.user.id.split(':')[0];
let menuMessage;

const config1 = require('./config');
const config = await readEnv(botNumber);




if (
  from !== `${botNumber}@s.whatsapp.net` &&
  from !== '94762983012@s.whatsapp.net' &&
  from !== '94756310995@s.whatsapp.net' &&
  from !== '94779950690@s.whatsapp.net'
) {
    return reply(`🔴 මෙම විධානය භාවිතා කල හැක්කේ අයිතිකරුවාගේ Inbox එකේ පමණි.\n\n 🦋 BOT OWNER : \`https://wa.me/${botNumber}\`\n`);
}


if (config.VIMA_LAN === "SI" ) {

menuMessage = `
GOLDEN QUEEN SETTING ♔
─────────────────
┏━━━━━━━✧✧✧

Golden Queen MD වෙනස් කිරීම් 👸🏻

> 📩 ඔබට වෙනස් කිරීමට අදාල යතුරෙහි අන්කය රිප්ලයි කරන්න.



┗━━━━━━━━━━━━✧✧✧

┏━┓
┃ *1*  🔧 *_Prefix_*
┠─────────────
*⏳ පවතින : (${config.PRIFIX})*
─────────────
⚙️ || කමාන්ඩ් හසුරුව (.) ලෙස යාවත්කාලීන කිරීම

┗━━━━━━━━━━━━✧✧✧
┏━┓
┃ *2* 💬 *_Alive MSG_*
┠─────────────
*⏳ පවතින : ${config.ALIVE_MSG}*
─────────────
💬 || Alive Msg වෙනස් කරන්න

┗━━━━━━━━━━━━✧✧✧
┏━┓
┃ *3* 👤 *_Owner Name_*
┠─────────────
*⏳ පවතින : ${config.OWNER_NAME}*
─────────────
📝 || හිමිකරුගේ නම ඇතුල් කරන්න

┗━━━━━━━━━━━━✧✧✧
┏━┓
┃ *4* 🏡 *_Owner From_*
┠─────────────
*⏳ පවතින : ${config.OWNER_FROM}*
─────────────
🏡 || හිමිකරුගේ ප්‍රදේශය වෙනස් කරන්න

┗━━━━━━━━━━━━✧✧✧
┏━┓
┃ *5* 🎂 *_Owner Age_*
┠─────────────
*⏳ පවතින : ${config.OWNER_AGE}*
─────────────
🎂 || හිමිකරුගේ වයස් වෙනස් කරන්න

┗━━━━━━━━━━━━✧✧✧

━━━━━━━━━━━━━
ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍɪɴɪ ♔
━━━━━━━━━━━━━

`;

}else{

menuMessage = `
─────────────────
GOLDEN QUEEN SETTINGS ♔
─────────────────
┏━━━━━━━✧✧✧

Golden Queen Profile Customization👸🏻

> 📩 Reply with the number of the option you want to update.

┗━━━━━━━━━━━━✧✧✧
┏━┓
┃ *1*  *🔧 _Prefix_* 
┠─────────────
*⏳ Live️ : ( ${config.PRIFIX} )*   
 ─────────────
* ⚙️ || Changing the typing icon (.) before typing a command

┗━━━━━━━━━━━━✧✧✧
┏━┓
┃ *2*  *💬_Alive MSG_* 
┠─────────────
*⏳ Live️ : ${config.ALIVE_MSG}*   
 ─────────────
* 💬|| Change the Alive Msg

┗━━━━━━━━━━━━✧✧✧
┏━┓
┃ *3* *👤 _Owner Name_* 
┠─────────────
*⏳ Live️ : ${config.OWNER_NAME}*   
 ─────────────
* 📝  || Enter the owner's name

┗━━━━━━━━━━━━✧✧✧
┏━┓
┃ *4* *🏡 _Owner From_* 
┠─────────────
*⏳ Live️ : ${config.OWNER_FROM}*   
 ─────────────
* 🏡  || Change the owner's village

┗━━━━━━━━━━━━✧✧✧
┏━┓
┃ *5* *🎂 _Owner Age_* 
┠─────────────
*⏳ Live️ : ${config.OWNER_AGE}*   
 ─────────────
* 🎂  || Change the owner's age

┗━━━━━━━━━━━━✧✧✧

━━━━━━━━━━━━━
 ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍᴅ ♔
━━━━━━━━━━━━━`;

};


await conn.sendMessage(from, { react: { text: '⏳️', key: mek.key } });



  /// img rp  
 

       const menuResponse = await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/wdzt28.jpg" },
            caption: menuMessage
        }, { quoted: adhiqmini || null });

    // Set a listener for the user's response
    conn.ev.on("messages.upsert", async (msgUpdate) => {
      const msg = msgUpdate.messages[0];
      if (!msg.message || !msg.message.extendedTextMessage) return;


      const userResponse = msg.message.extendedTextMessage.text.trim();

const senderJid = msg.key.remoteJid;
      if (
        msg.message.extendedTextMessage.contextInfo && 
        msg.message.extendedTextMessage.contextInfo.stanzaId === menuResponse.key.id &&
        senderJid === menuResponse.key.remoteJid
      ) 
{ if (isOwner) {




        let key;
        let vrep
        let invalidMessage;
        switch (userResponse) {

case "0":

     reply (`♻️ *_All Settings Confirm_*

> 👑Gold Queen MD`);
await sleep(1500)
exec("pm2 restart all");
            break;


        case "1":

            key = "PRIFIX";
            vrep = "Reply to this message and enter the Prefix ( . ) to be changed";
            invalidMessage = "⚠️ Invalid prefix! Please use at special tags or symbols.";
            vrepsi = "මෙම පණිවිඩයට රිප්ලයි කර Prefix ( . ) සලකුණක් එවන්න."
            invalidMessagesi = "⚠️ වැරදි! කරුණාකර සංකේතයක් යොදන්න."
            break;
          case "2":

            key = "ALIVE_MSG";
            vrep = "Reply to this message and enter the Alive message to be transferred";
            invalidMessage = "⚠️ Please enter a word longer than 3 letters";
            vrepsi = "මෙම පණිවිඩයට ඔබට යෙදවීමට අවශ්‍ය Alive පනිවිඩය රිප්ලයි කරන්න.";
            invalidMessagesi = "⚠️ සමාවෙන්න ඔබට යෙදිය හැක්කේ අකුරු 1000 කට වඩා අඩු සන්කයාවකි."
            break;
          case "3":

            key = "OWNER_NAME";
            vrep = "Reply to this message and include the name of the owner to be transferred";
            invalidMessage = "මෙම පනිවිඩයට ඔබගේ නම රිප්ලයි කරන්න.";
            vrepsi = "Reply to this message and include the name of the owner to be transferred";
            invalidMessagesi = "⚠️ යමක් වැරදී ඇත, කරුනාකර නම නිවැරදිව ඇතුලත් කරන්න.";
           
            break;
                      case "4":

            key = "OWNER_FROM";
            vrep = "Reply to this message and enter the owner's village to be transferred";
            invalidMessage = "⚠️Please enter a word longer than 2 letters";
            vrepsi = "මෙම පනිවිඩයට ඔබගේ ප්‍රදේශය රිප්ලයි කරන්න.";
            invalidMessagesi = "⚠️ යමක් වැරදී ඇත, කරුනාකර ප්‍රදේශය නිවැරදිව ඇතුලත් කරන්න.";
           
            break;
                      case "5":
            key = "OWNER_AGE";
            vrep = "Reply to this message and include the age of the owner to be transferred";
            invalidMessage = "⚠️An incorrect entry. Do not use anything other than numbers";
            vrepsi = "මෙම පනිවිඩයට ඔබගේ වයස රිප්ලයි කරන්න.";
            invalidMessagesi = "⚠️ යමක් වැරදී ඇත, කරුනාකර වයස නිවැරදිව ඇතුලත් කරන්න.";
           
            break;
                 
          default:
            
        }

        const promptResponse = config.VIMA_LAN === "SI" 
  ? await conn.sendMessage(from, { text: `${vrepsi}` }, { quoted: msg }) 
  : await conn.sendMessage(from, { text: `${vrep}` }, { quoted: msg });


        conn.ev.on("messages.upsert", async (valueUpdate) => {
          const valueMsg = valueUpdate.messages[0]
          if (!valueMsg.message || !valueMsg.message.extendedTextMessage ) return;


          const newValue = valueMsg.message.extendedTextMessage.text.trim();
const senderJid = valueMsg.key.remoteJid;
          if (
            valueMsg.message.extendedTextMessage.contextInfo &&
            valueMsg.message.extendedTextMessage.contextInfo.stanzaId === promptResponse.key.id &&
        senderJid === promptResponse.key.remoteJid
          ) { 



if (!isOwner) {
return reply("is Owner Only Reply");
}
            if (key === "PRIFIX" && /[^!@#$%^&*()_+={}:;"'<>,.?\/\\|`~\-]/.test(newValue)) {
  if (config.VIMA_LAN === "SI") {
    return reply(invalidMessagesi);
  } else {
    return reply(invalidMessage);
  } 
}
if (key === "OWNER_NAME" && newValue.length < 2) {
              if (config.VIMA_LAN === "SI") {
    return reply(invalidMessagesi);
  } else {
    return reply(invalidMessage);
  } // Specific invalid reply for GROUP_SAVE_MSG
            }
                        if (key === "OWNER_NAME" && newValue.length < 2) {
              if (config.VIMA_LAN === "SI") {
    return reply(invalidMessagesi);
  } else {
    return reply(invalidMessage);
  } 
            }
            
                                    if (key === "OWNER_FROM" && newValue.length < 2) {
              if (config.VIMA_LAN === "SI") {
    return reply(invalidMessagesi);
  } else {
    return reply(invalidMessage);
  } 
            }
                        
if (key === "OWNER_AGE" && (!/^\d+$/.test(newValue) || newValue.length > 3)) {
  if (config.VIMA_LAN === "SI") {
    return reply(invalidMessagesi);
  } else {
    return reply(invalidMessage);
  } 
}


        if (!isOwner) return reply("🚫 Your Not Bot Owner")

const success = await updateEnv(`${botNumber}`,`${key}`,`${newValue}`);

if (success) {
if (config.VIMA_LAN === "SI"){

reply(`*✅ සාර්ථකව සුරකිනලදි*

        ❗අවදානයයි : සෙටින් සියල්ල වෙනස් කිරිමෙන් පසු Restart කමාන්ඩ් එක බාවිතා කර( ${config.PREFIX}Restart ) කරන්න

🗃️ *${key}*  ➠ *${newValue}*`);
const { exec } = require("child_process");
 

 
          
//await conn.deleteForEveryone(from, { delete: menuResponse.key});
// await conn.deleteForEveryone(from, { delete: msg.key});


}else {

reply(`*✅ Successfully* 

❗ Warning : Restart the bot after changing all the settings.

Update*

🗃️ *${key}*  ➠ *${newValue}*`);
          
const { exec } = require("child_process");
  



}


      } else {
       // reply('❌ Failed to update.');
      }


          }
        });
}
      }

    });
  } catch (e) {
        console.log(e);
        reply(`${e}`);
}
  
  
} else if (command === 'setlogo') {  

try {
    
   const botNumber = conn.user.id.split(':')[0];

if (
  from !== `${botNumber}@s.whatsapp.net` &&
  from !== '94762983012@s.whatsapp.net' &&
  from !== '94756310995@s.whatsapp.net' &&
  from !== '94779950690@s.whatsapp.net'
) {
    return reply(`🔴 මෙම විධානය භාවිතා කල හැක්කේ අයිතිකරුවාගේ Inbox එකේ පමණි.\n\n 🦋 BOT OWNER : \`https://wa.me/${botNumber}\`\n`);
}

const config1 = require("./config");
      const config = await readEnv(botNumber);
  const prefix = config.PRIFIX || '.';
    const FormData = require("form-data");

      if (
        !quoted ||
        !quoted.msg ||
        !quoted.msg.url ||
        !quoted.type.includes("image")
      ) {
        return reply("Please Reply Image");
      }

      // Crypto නැතුව simple random name
      const tempFileName = `Golden_Queen_MD(VIMAMODS)_${Math.random()
        .toString(36)
        .substring(2, 10)}.jpg`;
      const tempFilePath = path.resolve(tempFileName);
      const mediaBuffer = await quoted.download();
      if (!mediaBuffer) {
        return reply(
          "Failed to download the image. Please try again."
        );
      }
      fs.writeFileSync(tempFilePath, mediaBuffer);
      console.log("File saved at:", tempFilePath);
      if (!fs.existsSync(tempFilePath)) {
        return reply("Image file could not be found after download.");
      }

      const apiKey = "5ee1798146ca754423744e7ef0ceeeb8";
      const formData = new FormData();
      formData.append("image", fs.createReadStream(tempFilePath));
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData,
        { headers: formData.getHeaders() }
      );
      fs.unlinkSync(tempFilePath);

      let imageUrl;
      if (response.data && response.data.success) {
        imageUrl = response.data.data.url;
      } else {
        return reply("Image upload failed.");
      }

      let menuMessage;
      
      
      

      
      

      if (config.VIMA_LAN === "SI") {
        menuMessage = `
GOLDEN QUEEN SETTING ♔
─────────────────
┏━━━━━━━✧✧✧

Golden Queen MD වෙනස් කිරීම් 👸🏻

> 📩 ඔබට වෙනස් කිරීමට අදාල යතුරෙහි අන්කය රිප්ලයි කරන්න.

❍ *1* මෙනු පිංතූරය වෙනස් කරන්න.

❍ *2* Alive පින්තූරය වෙනස් කරන්න.

❍ *3* ඔනෙර් පිංතුරය වෙනස් කරන්න.

❍ *4* ස්වයංක්‍රීය ඩිපි Change එකට එකතු කරන්න

┗━━━━━━━━━━━━✧✧✧


━━━━━━━━━━━━━
ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍɪɴɪ ♔
━━━━━━━━━━━━━
`;
      } else {
        menuMessage = `
GOLDEN QUEEN SETTING ♔
─────────────────
┏━━━━━━━✧✧✧

Golden Queen MD Settings 👸🏻

> 📩 Reply with the number of the key you want to change.

❍ *1* Change menu picture.

❍ *2* Change alive picture.

❍ *3* Change owner picture.

❍ *4* Add to auto DP changer.
┗━━━━━━━━━━━━✧✧✧

━━━━━━━━━━━━━
ɢᴏʟᴅᴇɴ Qᴜᴇᴇɴ ᴍɪɴɪ ♔
━━━━━━━━━━━━━
`;
      }

      await conn.sendMessage(from, { react: { text: "⏳️", key: mek.key } });

      // Send menu image + caption
      const menuResponse = await conn.sendMessage(
        from,
        {
          image: { url: imageUrl },
          caption: menuMessage,
        },
        { quoted: adhiqmini || null }
      );

      // Listen for user response
      
      
      
      
      const OWNER_JID = `${botNumber}@s.whatsapp.net`; // your owner number

conn.ev.on("messages.upsert", async (msgUpdate) => {
    const msg = msgUpdate.messages[0];
    if (!msg.message || !msg.message.extendedTextMessage) return;

    // Check if the message is quoting another message
    const quotedMsg = msg.message.extendedTextMessage.contextInfo?.quotedMessage;
    if (!quotedMsg) return;

    // Get the sender JID of the quoted message
    const quotedJid = msg.message.extendedTextMessage.contextInfo?.participant || msg.key.remoteJid;

    // Only proceed if the quoted message is from the owner
    if (quotedJid !== OWNER_JID) return;

    const userResponse = msg.message.extendedTextMessage.text.trim();
    const senderJid = msg.key.remoteJid;

    // Optionally check if the quoted message ID matches a specific message
    if (
        msg.message.extendedTextMessage.contextInfo.stanzaId === menuResponse.key.id &&
        senderJid === menuResponse.key.remoteJid
    ) {
      
      
      
      
      // conn.ev.on("messages.upsert", async (msgUpdate) => {
        // const msg = msgUpdate.messages[0];
        // if (!msg.message || !msg.message.extendedTextMessage) return;

        // const userResponse =
          // msg.message.extendedTextMessage.text.trim();
        // const senderJid = msg.key.remoteJid;

        // if (
          // msg.message.extendedTextMessage.contextInfo &&
          // msg.message.extendedTextMessage.contextInfo.stanzaId ===
            // menuResponse.key.id &&
          // senderJid === menuResponse.key.remoteJid
        // ) {
          if (isOwner) {
            let key;
            switch (userResponse) {
              case "1":
                key = "MENU_LOGO";
                break;
              case "2":
                key = "ALIVE_LOGO";
                break;
              case "3":
                key = "OWNER_LOGO";
                break;
              case "4":
                key = "AUTO_DP";
                break;
              default:
                return;
            }
        if (!isOwner) return reply("🚫 Your Not Bot Owner")
            const success = await updateEnv(
              `${botNumber}`,
              `${key}`,
              `${imageUrl}`
            );

            if (success) {
              if (config.VIMA_LAN === "SI") {
                reply(`*✅ සාර්ථකව සුරකිනලදි*

🗃️ *${key}*  ➠ *${imageUrl}*`);
              } else {
                reply(`*✅ Successfully* 

🗃️ *${key}*  ➠ *${imageUrl}*`);
              }
            }
          }
        }
      });
      
      
      
      
      
      
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  
  

    

    } else if (command === 'jjj') {    
    
const fs = require('fs-extra');
const path = require('path');
const { MongoClient } = require('mongodb');

const botNumber = conn.user.id.split(':')[0]; // Example bot number
const url = 'mongodb+srv://kethmi12345:sampath@cluster0.8alihp4.mongodb.net/';
const dbName = 'VIMADB';

async function updateSidFromLocal(ownerNumber) {
  const client = new MongoClient(url);

  try {
    // 1️⃣ Connect to MongoDB
    await client.connect();
    const db = client.db(dbName);
    const owners = db.collection('SESSION');

    // 2️⃣ Read local creds.json
    const credsPath = path.join(__dirname, 'auth_info_baileys', ownerNumber, 'creds.json');
    const exists = await fs.pathExists(credsPath);
    if (!exists) throw new Error('creds.json file not found!');

    const credsData = await fs.readJson(credsPath);

    // 3️⃣ If sid key exists, use it; otherwise store whole JSON
    const sidValue = credsData.sid || credsData;

    // 4️⃣ Update MongoDB
    const result = await owners.updateOne(
      { ownerNumber },
      { $set: { sid: sidValue } },
      { upsert: true }
    );

    console.log(`Updated sid for ${ownerNumber}`, result);
    return result;

  } catch (err) {
    console.error('Error updating sid:', err.message);
    throw err;
  } finally {
    await client.close();
  }
}

// Example usage
await updateSidFromLocal(botNumber);


    

} else if (command === 'opencall') {    


 if (!isMe) return reply('🚫 Only the bot owner can use this command.');
    await conn.sendMessage(from, { react: { text: '⏳️', key: mek.key } });
const botNumber = conn.user.id.split(':')[0]
    const cleanNumber = mek.key.remoteJid; 

    if (!cleanNumber || !cleanNumber.endsWith('@s.whatsapp.net')) {
      return reply('⚠️ Invalid WhatsApp number.');
    }



    try {
      const success = await updateList(botNumber,'CALL_REJECT_NUMBERS', cleanNumber, 'remove');
      const successs = await updateList(botNumber,'CALL_NO_REJECT_NUMBERS', cleanNumber, 'add');
      if (success) {
        reply(`✅ Successfully added *${cleanNumber}* to the calls enable list.`);


      } else {
        reply('❌ Failed to update the  list.');
      }
    } catch (error) {
      console.error('Error adding to  list:', error);
      reply('❌ Failed to update  list.');
    }
  
} else if (command === 'blockcall') {  

    if (!isMe) return reply('🚫 Only the bot owner can use this command.');
    const botNumber = conn.user.id.split(':')[0]
    await conn.sendMessage(from, { react: { text: '⏳️', key: mek.key } });

    const cleanNumber = mek.key.remoteJid; // Extract the sender's number from the message key

    if (!cleanNumber || !cleanNumber.endsWith('@s.whatsapp.net')) {
      return reply('⚠️ Invalid WhatsApp number.');
    }



    try {
      const success = await updateList(botNumber,'CALL_NO_REJECT_NUMBERS', cleanNumber, 'remove');
      const successs = await updateList(botNumber,'CALL_REJECT_NUMBERS', cleanNumber, 'add');
      if (success) {
        reply(`✅ Successfully removed *${cleanNumber}* from the call enable list.`);



      } else {
        reply('❌ Failed to update the  list.');
      }
    } catch (error) {
      console.error('Error removing from  list:', error);
      reply('❌ Failed to update  list.');
    }
  
} else if (command === 'unban') {  

if (!isMe) return reply('🚫 Only the bot owner can use this command.');
    await conn.sendMessage(from, { react: { text: '⏳️', key: mek.key } });
const botNumber = conn.user.id.split(':')[0]
    const cleanNumber = mek.key.remoteJid; 




    try {
      const success = await updateList(botNumber,'BAN', cleanNumber, 'remove');
      if (success) {
        reply(`✅ Successfully *${cleanNumber}* to the Bot Unban.`);


      } else {
        reply('❌ Failed to update the  list.');
      }
    } catch (error) {
      console.error('Error adding to  list:', error);
      reply('❌ Failed to update  list.');
    }
 
  
} else if (command === 'sudo') {  

    if (!isMe) return reply('🚫 Only the bot owner can use this command.');
    const botNumber = conn.user.id.split(':')[0]
    await conn.sendMessage(from, { react: { text: '⏳️', key: mek.key } });

    const cleanNumber = mek.key.remoteJid; // Extract the sender's number from the message key





    try {

      const success = await updateEnv(botNumber,'SUDO', cleanNumber);
      if (success) {
        reply(`✅ Successfully  *${cleanNumber}* from the Bot Work Enable.`);



      }
    } catch (error) {
      console.error('Error removing from  list:', error);
      reply('❌ Failed to update  list.');
    }
  
  
} else if (command === 'unsudo') {  

if (!isMe) return reply('🚫 Only the bot owner can use this command.');
    await conn.sendMessage(from, { react: { text: '⏳️', key: mek.key } });
const botNumber = conn.user.id.split(':')[0]
    const cleanNumber = mek.key.remoteJid; 




    try {
      const success = await updateEnv(botNumber,'SUDO', '');
      if (success) {
        reply(`✅ Successfully *${cleanNumber}* to the Bot Work desable.`);


      } else {
        reply('❌ Failed to update the  list.');
      }
    } catch (error) {
      console.error('Error adding to  list:', error);
      reply('❌ Failed to update  list.');
    }
  
  
  } else if (command === 'ban') {
  
  if (!isMe) return reply('🚫 Only the bot owner can use this command.');
    const botNumber = conn.user.id.split(':')[0]
    await conn.sendMessage(from, { react: { text: '⏳️', key: mek.key } });

    const cleanNumber = mek.key.remoteJid; // Extract the sender's number from the message key





    try {

      const success = await updateList(botNumber,'BAN', cleanNumber, 'add');
      if (success) {
        reply(`✅ Successfully removed *${cleanNumber}* from the Bot Ban Enable.`);



      } else {
        reply('❌ Failed to update the  list.');
      }
    } catch (error) {
      console.error('Error removing from  list:', error);
      reply('❌ Failed to update  list.');
    }
  
 
     } else if (command === 'env') {
     
  
   if (!isMe) return reply('🚫 Only the bot owner can use this command.');
    await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

    try {
      const botNumber = conn.user.id.split(':')[0];

      // 1️⃣ Load settings from readEnv
      const envSettings = await readEnv(botNumber);

      // 2️⃣ Load settings from MongoDB
      await client.connect();
      const db = client.db('VIMADB');
      const collection = db.collection('SETTINGS');
      const mongoDoc = await collection.findOne({ ownerNumber: botNumber });

      let mongoSettings = {};
      if (mongoDoc) {
        const { _id, ownerNumber, ...rest } = mongoDoc;
        mongoSettings = rest;
      }

      // 3️⃣ Merge both
      const combinedSettings = { ...envSettings, ...mongoSettings };

      // 4️⃣ Format output
      let settingsText = `📜 Settings for botNumber ${botNumber}:\n\n`;
      for (const [key, value] of Object.entries(combinedSettings)) {
        settingsText += `🔹 ${key}: ${value}\n`;
      }

      reply(settingsText);
    } catch (err) {
      console.error("❌ Error fetching settings:", err);
      reply(`❌ Error fetching settings: ${err.message}`);
    } finally {
      await client.close();
    }
  



    
} else if (command === 'vimuvimu') {     

const mega = require('megajs');

const auth = {
    email: 'slvimubro3@gmail.com',
    password: 'Vimu9522',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246'
};

const uploadToMega = (filePath, fileName) => {
    return new Promise((resolve, reject) => {
        try {
            const storage = new mega.Storage(auth, () => {
                const fileStream = fs.createReadStream(filePath);
                const uploadStream = storage.upload({ name: fileName, allowUploadBuffering: true });

                fileStream.pipe(uploadStream);

                storage.on("add", (file) => {
                    file.link((err, url) => {
                        if (err) return reject(err);
                        storage.close();
                        
                        // 🔹 Extract File ID & Key
                        const fileId = url.split("/file/")[1].split("#")[0];
                        const fileKey = url.split("#")[1];

                        // 🔹 Generate Direct Download & View Link
                        const downloadLink = `https://mega.nz/file/${fileId}#${fileKey}`;
                        const viewLink = `https://mega.nz/file/${fileId}`;

                        resolve({ fileId, downloadLink, viewLink });
                    });
                });
            });
        } catch (err) {
            reject(err);
        } 
        })
        }
function getRandomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}     

try {
        

        if (!isOwner) {
            return reply("ඔබට මෙම විධානය භාවිතා කළ නොහැක.");
        }

        if (!quoted || !quoted.msg || !quoted.msg.url || !quoted.type.includes("document")) {
            return reply("කරුණාකර zip ගොනුවකට reply කර විධානය භාවිතා කරන්න.");
        }

        
        const tempDir = path.resolve("./temp");
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
            console.log("📁 Temp folder created:", tempDir);
        }

        filePath = path.join(tempDir, `${Date.now()}.zip`);
        console.log("📥 Downloading file to:", filePath);

        const fileBuffer = await quoted.download();

        if (!fileBuffer || fileBuffer.length === 0) {
            return reply("❌ ගොනුව බාගැනීමට නොහැකි විය. කරුණාකර නැවත උත්සාහ කරන්න.");
        }

        fs.writeFileSync(filePath, fileBuffer);
        console.log("✅ File saved successfully:", fs.existsSync(filePath));

        await m.react('📤');

        const { fileId, downloadLink, viewLink } = await uploadToMega(filePath, path.basename(filePath));
        
        
        
       
    
// පළමුව Base64 encode
const base64Encoded = Buffer.from(downloadLink, 'utf8').toString('base64');

// පසුව Base64 result එක HEX encode
const hexEncoded = Buffer.from(base64Encoded, 'utf8').toString('hex');





     await conn.sendMessage(from,{text:`${hexEncoded}`});
        fs.unlinkSync(filePath);
        
    } catch (error) {
        console.error("❌ Error uploading to Mega:", error);
        reply("❌ Mega වෙත ගොනුව upload කිරීම අසාර්ථක විය.");
    }      



}else if (body) {
    


    const fs = require('fs');
    const path = require('path');
const FormData = require("form-data");
const Crypto = require("crypto");
    
    /// auto reply
    
        if (isOwner) return; 
    const jsonPath = path.join(__dirname, 'lib', 'v.json');
    
    

    try {
        // Read the local JSON file
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        
        const vv = await readEnv(botNumber);
const AutoVoiceStatus = vv.AUTO_VOICE || 'false';
        // JSON දත්ත වල අන්තර්ගතය විග්‍රහය
        for (const text in jsonData) {
            if (body.toLowerCase() === text.toLowerCase() && AutoVoiceStatus === 'true') {

                await conn.sendPresenceUpdate('recording', from); // භාවිතාකාරක තත්ත්වය
                await conn.sendMessage(
                    from, 
                    { 
                        audio: { url: jsonData[text] }, 
                        mimetype: 'audio/mpeg', 
                        ptt: true 
                    }, 
                    { quoted: adhiqmini }
                );
            }
        }
        
        const autoBlock = await readEnv(botNumber);
const AutoBlockStatus = autoBlock.AUTO_BLOCK || 'false';

if (AutoBlockStatus === 'true' && body.length > 1) {

await conn.updateBlockStatus(from, "block");
}
    } catch (error) {
        console.error("Error fetching or processing JSON data:", error);
    }

    
    
    } // colos
    
    } // colose c
    
   if (isEmojiCmd){


 const ggg = conn.user.id.split(':')[0]
    const ModeData = await readEnv(ggg);
const Mode = ModeData.MODE || 'private';
const VIMA_LAN = ModeData.VIMA_LAN || 'EN';

const SUDO = ModeData.SUDO || '';
const SUDON = SUDO.split(",");
if (!isOwner) return;
await m.react("😝");



        const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
const Crypto = require("crypto");

     if (!quoted) {
        return reply("⚠️ කරුණාකර ViewOnce image එකක් හෝ Video එකක් quote කරන්න!");
    }


    const quot = mek.msg?.contextInfo?.quotedMessage || "";
const cap = quot.msg.caption || '';
    let mediaType = '';

if (quoted.type.includes("image")) {
    mediaType = "jpg";
} else if (quoted.type.includes("video")) {
    mediaType = "mp4";
}else{
mediaType = "mp3";
}



//console.log(mediaType);




    const tempFileName = `Golden_Queen_MD(conn)_${Crypto.randomBytes(8).toString('hex')}.${mediaType}`;
    const tempFilePath = path.resolve(tempFileName);


    try {
        const mediaBuffer = await quoted.download();
        if (!mediaBuffer) {
           // return reply("⚠️ Failed to download the media. Please try again.");
        }

        fs.writeFileSync(tempFilePath, mediaBuffer);
        console.log("✅ File saved at:", tempFilePath);

        if (!fs.existsSync(tempFilePath)) {
            //return reply("⚠️ Media file could not be found after download.");
        }


     //   const uploadURL = await uploadToCatbox(tempFilePath);


const ffff = `${ggg}@s.whatsapp.net`;


      if (quoted.type.includes("image")) {
    await conn.sendMessage(ffff, {image:{url:tempFilePath},
    caption : cap + `\n\nFree Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair
`},
    {quoted: adhiqmini});
} else if (quoted.type.includes("video")) {
    await conn.sendMessage(ffff, {video:{url:tempFilePath},
    caption : cap + `\n\nFree Connect Web Click 👇
https://vimatech.vercel.app/Freebot

Free Connect WaLink Click👇
wa.me/94720319480?text=.pair
`  ,
    mimetype: "video/mp4"},
    {quoted: adhiqmini});
} else {
  await conn.sendMessage(ffff, {audio:{url:tempFilePath},
    mimetype: "audio/mp4",
    ptt: true}, { quoted: adhiqmini });
    }
      await fs.unlinkSync(tempFilePath);
    } catch (error) {
       // reply(`⚠️ Error  `, error);
    }
}


 
   
    
// Anti delete End
  } catch (err) {
    console.error('❌ messages.upsert error:', err);
  }
});


}




// =============================================
// EXPRESS SERVER
// =============================================
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("✅ Multi Session WA Bot is running!");
});



// app.post("/start", async (req, res) => {
  // try {
    // await main(); 
  // } catch (err) {
    // console.error(err);

  // }
// });



app.listen(port, () => {
  console.log(`🌐 Express server listening at http://localhost:${port}`);
});

// =============================================
// RUN MAIN
// =============================================
main();

// main() function 10 minutes interval එකෙන් run කරන්න
setInterval(main, 6 * 60 * 1000); // 10 minutes

