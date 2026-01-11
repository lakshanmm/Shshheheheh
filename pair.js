const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');
const router = express.Router();
const pino = require('pino');
const cheerio = require('cheerio');
const { Octokit } = require('@octokit/rest');
const moment = require('moment-timezone');
const Jimp = require('jimp');
const crypto = require('crypto');
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

const {
    default: makeWASocket,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers,
    jidNormalizedUser,
    proto,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateWAMessage,
    downloadContentFromMessage,
    getAggregateVotesInPollMessage
} = require('@whiskeysockets/baileys');

// Initialize Prisma for database
const prisma = new PrismaClient();

// Config with DXLK Mini Bot defaults
const config = {
    BOT_NAME: 'DXLK Mini Bot',
    BOT_LOGO_PATH: './assets/bot-logo.jpg',
    OWNER_DP_PATH: './assets/owner-dp.jpg',
    
    AUTO_VIEW_STATUS: 'true',
    AUTO_STATUS_REACT: 'true',
    AUTO_STATUS_SAVE: 'true',
    AUTO_RECORDING: 'true',
    AUTO_CONTACT_SAVE: 'false',
    AUTO_ONLINE: 'true',
    
    ANTI_DELETE: 'true',
    CHANNEL_FEATURES: 'true',
    GROUP_FEATURES: 'true',
    
    BUTTONS_ENABLED: 'true',
    LIST_BUTTONS_ENABLED: 'true',
    BOT_LOGO_ENABLED: 'true',
    
    LANGUAGE: 'en',
    BOT_MODE: 'public', // 'public', 'private', 'inbox'
    PREFIX: '.',
    
    MAX_RETRIES: 3,
    AUTO_RECONNECT: true,
    
    GROUP_INVITE_LINK: 'https://chat.whatsapp.com/DxbzxckNYUc7o6p8Eg0FEE',
    CHANNEL_LINK: 'https://whatsapp.com/channel/0029VbCJenbLI8YhYXnrcC2a',
    
    ADMIN_LIST_PATH: './admin.json',
    STATUS_SAVE_PATH: './status_saves',
    SAVED_CONTACTS_PATH: './saved_contacts.json',
    
    OWNER_NUMBERS: ['94789227570', '94762731899'],
    
    STATUS_REACT_EMOJI: '❤️',
    DELETE_TRACKER_DESTINATION: 'owner',
    
    // API Endpoints
    APIS: {
        LYRICS: 'https://lyrics-api.chamodshadow125.workers.dev/?title=',
        FACEBOOK: 'https://facebook-downloader.chamodshadow125.workers.dev/api/fb?url=',
        AI_IMAGE: 'https://ai-pic-whiteshadow.vercel.app/api/unrestrictedai?prompt=',
        NEWS: 'https://movanest.xyz/v2/news/allsites',
        YTMP3: 'https://movanest.xyz/v2/ytmp3?url=',
        SUBTITLE: 'https://movanest.xyz/v2/sublk?url=',
        YTMP4: 'https://movanest.xyz/v2/ytmp4?url=',
        TIKTOK: 'https://movanest.xyz/v2/tiktok?url='
    },
    
    DEFAULT_LANGUAGE: {
        en: {
            menuTitle: '📋 Main Menu',
            aliveText: '🤖 Bot is running',
            settingsText: '⚙️ Settings',
            errorText: '❌ Error occurred',
            successText: '✅ Success',
            ownerOnly: '👑 Owner only command',
            groupOnly: '👥 Group only command',
            noPermission: '❌ No permission',
            footer: '© DXLK Mini Bot'
        }
    },
    
    // Stylized characters for channel reactions
    STYLIZED_CHARS: {
        'a': '🅐', 'b': '🅑', 'c': '🅒', 'd': '🅓', 'e': '🅔', 'f': '🅕',
        'g': '🅖', 'h': '🅗', 'i': '🅘', 'j': '🅙', 'k': '🅚', 'l': '🅛',
        'm': '🅜', 'n': '🅝', 'o': '🅞', 'p': '🅟', 'q': '🅠', 'r': '🅡',
        's': '🅢', 't': '🅣', 'u': '🅤', 'v': '🅥', 'w': '🅦', 'x': '🅧',
        'y': '🅨', 'z': '🅩', '0': '⓿', '1': '➊', '2': '➋', '3': '➌',
        '4': '➍', '5': '➎', '6': '➏', '7': '➐', '8': '➑', '9': '➒'
    }
};

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const activeSockets = new Map();
const socketCreationTime = new Map();
const SESSION_BASE_PATH = './sessions';
const otpStore = new Map();
const userSettings = new Map();
const blockedUsers = new Set();
const statusSaves = new Map();
const messageTracker = new Map();
const reconnectAttempts = new Map();

// Create necessary directories
['./assets', './status_saves', './temp', './commands', SESSION_BASE_PATH].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Language helper
function getText(language = config.LANGUAGE, key) {
    return config.DEFAULT_LANGUAGE[language]?.[key] || config.DEFAULT_LANGUAGE.en[key] || key;
}

// Message formatter with DXLK branding
function formatMessage(title, content, language = config.LANGUAGE, customFooter = null) {
    const langText = config.DEFAULT_LANGUAGE[language];
    const footer = customFooter || `© ${config.BOT_NAME}`;
    
    return `
╔══════════════════════════╗
║    ✨ ${config.BOT_NAME} ✨
╠══════════════════════════╣
║      📌 ${title}
╚══════════════════════════╝

${content}

${footer ? `\n╔══════════════════════════╗\n║     ${footer}\n╚══════════════════════════╝` : ''}`;
}

// Load/Save user settings
async function loadUserSettings(number) {
    try {
        const settingsPath = path.join(SESSION_BASE_PATH, `settings_${number}.json`);
        if (fs.existsSync(settingsPath)) {
            const saved = JSON.parse(await fs.readFile(settingsPath, 'utf8'));
            return { ...config, ...saved };
        }
        return { ...config };
    } catch (error) {
        console.error(`Failed to load settings for ${number}:`, error);
        return { ...config };
    }
}

async function saveUserSettings(number, settings) {
    try {
        const settingsPath = path.join(SESSION_BASE_PATH, `settings_${number}.json`);
        await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2));
        userSettings.set(number, settings);
    } catch (error) {
        console.error(`Failed to save settings for ${number}:`, error);
    }
}

// Check if user is owner
function isOwner(jid) {
    const number = jid.replace(/[^0-9]/g, '');
    return config.OWNER_NUMBERS.some(ownerNum => number.endsWith(ownerNum));
}

// Check bot mode access
function checkBotAccess(settings, senderJid, isGroup = false) {
    const mode = settings.BOT_MODE || config.BOT_MODE;
    
    if (mode === 'private') {
        return isOwner(senderJid);
    } else if (mode === 'inbox') {
        return !isGroup;
    }
    return true;
}

// Send message with proper formatting
async function sendFormattedMessage(socket, jid, title, content, language, options = {}) {
    const settings = userSettings.get(socket.user.id.replace(/[^0-9]/g, '')) || config;
    const lang = language || settings.LANGUAGE;
    
    let message = {
        text: formatMessage(title, content, lang)
    };
    
    // Add image if bot logo is enabled and exists
    if (settings.BOT_LOGO_ENABLED === 'true') {
        const logoPath = settings.BOT_LOGO_PATH || config.BOT_LOGO_PATH;
        if (fs.existsSync(logoPath)) {
            message = {
                image: { url: logoPath },
                caption: formatMessage(title, content, lang)
            };
        }
    }
    
    // Add buttons if enabled
    if (settings.BUTTONS_ENABLED === 'true' && options.buttons) {
        message = {
            ...message,
            buttons: options.buttons,
            footer: getText(lang, 'footer'),
            headerType: 1
        };
    }
    
    // Add list buttons if enabled
    if (settings.LIST_BUTTONS_ENABLED === 'true' && options.sections) {
        message = {
            title: title,
            text: content,
            footer: getText(lang, 'footer'),
            buttonText: options.buttonText || 'Select Option',
            sections: options.sections
        };
    }
    
    try {
        return await socket.sendMessage(jid, message);
    } catch (error) {
        console.error('Failed to send formatted message:', error);
        // Fallback to simple text
        return await socket.sendMessage(jid, { text: formatMessage(title, content, lang) });
    }
}

// Anti-delete system
async function trackDeletedMessage(socket, keys, settings) {
    if (settings.ANTI_DELETE !== 'true') return;
    
    try {
        for (const key of keys) {
            const trackedMessage = messageTracker.get(key.id);
            if (!trackedMessage) continue;
            
            const { sender, content, timestamp, chatJid, mediaType, mediaUrl } = trackedMessage;
            
            const alertMessage = formatMessage(
                '🗑️ MESSAGE DELETED',
                `👤 From: ${sender}\n💬 Content: ${content.substring(0, 200)}${content.length > 200 ? '...' : ''}\n🕒 Time: ${timestamp}\n💬 Chat: ${chatJid}${mediaType ? `\n📁 Type: ${mediaType}` : ''}`,
                settings.LANGUAGE
            );
            
            // Forward to all owners
            for (const ownerNumber of config.OWNER_NUMBERS) {
                const targetJid = `${ownerNumber}@s.whatsapp.net`;
                
                // Send text alert
                await socket.sendMessage(targetJid, { text: alertMessage });
                
                // Forward media if available
                if (mediaUrl && fs.existsSync(mediaUrl)) {
                    const mediaStats = fs.statSync(mediaUrl);
                    if (mediaStats.size < 50 * 1024 * 1024) { // 50MB limit
                        if (mediaType === 'image') {
                            await socket.sendMessage(targetJid, {
                                image: fs.readFileSync(mediaUrl),
                                caption: `Deleted image from ${sender}`
                            });
                        } else if (mediaType === 'video') {
                            await socket.sendMessage(targetJid, {
                                video: fs.readFileSync(mediaUrl),
                                caption: `Deleted video from ${sender}`
                            });
                        } else if (mediaType === 'audio') {
                            await socket.sendMessage(targetJid, {
                                audio: fs.readFileSync(mediaUrl),
                                mimetype: 'audio/mpeg',
                                caption: `Deleted audio from ${sender}`
                            });
                        }
                    }
                }
            }
            
            messageTracker.delete(key.id);
        }
    } catch (error) {
        console.error('Failed to track deleted message:', error);
    }
}

// Auto status features
async function handleStatusUpdate(socket, message, settings) {
    const jid = message.key.remoteJid;
    if (jid !== 'status@broadcast') return;
    
    // Auto view status
    if (settings.AUTO_VIEW_STATUS === 'true') {
        try {
            await socket.readMessages([message.key]);
        } catch (error) {
            console.error('Failed to view status:', error);
        }
    }
    
    // Auto react to status
    if (settings.AUTO_STATUS_REACT === 'true') {
        try {
            const emoji = settings.STATUS_REACT_EMOJI || config.STATUS_REACT_EMOJI;
            await socket.sendMessage(
                jid,
                { react: { text: emoji, key: message.key } },
                { statusJidList: [message.key.participant] }
            );
        } catch (error) {
            console.error('Failed to react to status:', error);
        }
    }
    
    // Auto save status
    if (settings.AUTO_STATUS_SAVE === 'true') {
        await saveStatusMedia(socket, message, settings);
    }
}

// Save status media
async function saveStatusMedia(socket, message, settings) {
    try {
        const sender = message.key.participant;
        const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
        
        let mediaBuffer;
        let fileName;
        let fileType;
        
        if (message.message.imageMessage) {
            mediaBuffer = await downloadAndSaveMedia(message.message.imageMessage, 'image');
            fileName = `status_image_${sender.replace(/[^0-9]/g, '')}_${timestamp}.jpg`;
            fileType = 'image';
        } else if (message.message.videoMessage) {
            mediaBuffer = await downloadAndSaveMedia(message.message.videoMessage, 'video');
            fileName = `status_video_${sender.replace(/[^0-9]/g, '')}_${timestamp}.mp4`;
            fileType = 'video';
        }
        
        if (mediaBuffer) {
            const savePath = path.join(config.STATUS_SAVE_PATH, fileName);
            await fs.writeFile(savePath, mediaBuffer);
            
            // Store in memory cache
            statusSaves.set(message.key.id, {
                path: savePath,
                sender: sender,
                timestamp: timestamp,
                type: fileType
            });
            
            console.log(`✅ Status saved: ${fileName}`);
        }
    } catch (error) {
        console.error('Failed to save status:', error);
    }
}

// Download media helper
async function downloadAndSaveMedia(mediaMessage, type) {
    try {
        const stream = await downloadContentFromMessage(mediaMessage, type);
        const buffer = await streamToBuffer(stream);
        return buffer;
    } catch (error) {
        console.error(`Failed to download ${type}:`, error);
        return null;
    }
}

function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
    });
}

// Auto presence features
async function updatePresence(socket, jid, settings) {
    if (settings.AUTO_RECORDING === 'true') {
        await socket.sendPresenceUpdate('recording', jid);
    }
    
    if (settings.AUTO_ONLINE === 'true') {
        await socket.sendPresenceUpdate('available', jid);
    }
}

// Channel reaction command
async function sendChannelReaction(socket, jid, text, settings) {
    if (!isOwner(jid)) {
        await sendFormattedMessage(socket, jid, '❌ Access Denied', 'Owner only command', settings.LANGUAGE);
        return;
    }
    
    if (!jid.endsWith('@broadcast')) {
        await sendFormattedMessage(socket, jid, '❌ Error', 'This command works only in channels', settings.LANGUAGE);
        return;
    }
    
    // Convert text to stylized characters
    let stylizedText = '';
    for (const char of text.toLowerCase()) {
        if (config.STYLIZED_CHARS[char]) {
            stylizedText += config.STYLIZED_CHARS[char];
        } else {
            stylizedText += char;
        }
    }
    
    try {
        // Get recent messages in channel
        const messages = await socket.fetchMessagesFromWA(jid, 10);
        
        if (messages && messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            
            // React to the last message
            await socket.sendMessage(jid, {
                react: { text: stylizedText, key: lastMessage.key }
            });
            
            await sendFormattedMessage(socket, jid, '✅ Success', 
                `Reacted with: ${stylizedText}`, settings.LANGUAGE);
        } else {
            await sendFormattedMessage(socket, jid, '❌ Error', 
                'No messages found in channel', settings.LANGUAGE);
        }
    } catch (error) {
        console.error('Channel reaction error:', error);
        await sendFormattedMessage(socket, jid, '❌ Error', 
            'Failed to send reaction', settings.LANGUAGE);
    }
}

// API Integrations
async function downloadFromAPI(type, url, params = {}) {
    try {
        let apiUrl;
        
        switch (type) {
            case 'facebook':
                apiUrl = `${config.APIS.FACEBOOK}${encodeURIComponent(url)}`;
                break;
            case 'lyrics':
                apiUrl = `${config.APIS.LYRICS}${encodeURIComponent(url)}`;
                break;
            case 'youtube_mp3':
                apiUrl = `${config.APIS.YTMP3}${encodeURIComponent(url)}&quality=128`;
                break;
            case 'youtube_mp4':
                apiUrl = `${config.APIS.YTMP4}${encodeURIComponent(url)}&quality=${params.quality || '360'}`;
                break;
            case 'tiktok':
                apiUrl = `${config.APIS.TIKTOK}${encodeURIComponent(url)}`;
                break;
            case 'subtitle':
                apiUrl = `${config.APIS.SUBTITLE}${encodeURIComponent(url)}`;
                break;
            case 'news':
                apiUrl = config.APIS.NEWS;
                break;
            case 'ai_image':
                apiUrl = `${config.APIS.AI_IMAGE}${encodeURIComponent(params.prompt)}&style=${params.style || 'photorealistic'}`;
                break;
            default:
                return null;
        }
        
        const response = await axios.get(apiUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 30000
        });
        
        return response.data;
    } catch (error) {
        console.error(`API Error (${type}):`, error.message);
        return null;
    }
}

// Main menu with list buttons
async function showMainMenu(socket, jid, settings, language) {
    const lang = language || settings.LANGUAGE;
    
    const listMessage = {
        title: `✨ ${config.BOT_NAME} ✨`,
        text: 'Select a category to explore commands:',
        footer: getText(lang, 'footer'),
        buttonText: '📂 Open Categories',
        sections: [
            {
                title: '🔧 CORE COMMANDS',
                rows: [
                    {
                        rowId: `${config.PREFIX}menu`,
                        title: '📋 Main Menu',
                        description: 'Show this menu again'
                    },
                    {
                        rowId: `${config.PREFIX}alive`,
                        title: '🤖 Bot Status',
                        description: 'Check bot status and info'
                    },
                    {
                        rowId: `${config.PREFIX}ping`,
                        title: '🏓 Ping Test',
                        description: 'Check bot latency'
                    },
                    {
                        rowId: `${config.PREFIX}owner`,
                        title: '👑 Owner Info',
                        description: 'Show bot owner details'
                    },
                    {
                        rowId: `${config.PREFIX}settings`,
                        title: '⚙️ Settings',
                        description: 'Configure bot settings'
                    }
                ]
            },
            {
                title: '⬇️ DOWNLOAD COMMANDS',
                rows: [
                    {
                        rowId: `${config.PREFIX}song`,
                        title: '🎵 Download Song',
                        description: 'Download music/audio'
                    },
                    {
                        rowId: `${config.PREFIX}video`,
                        title: '🎥 Download Video',
                        description: 'Download YouTube videos'
                    },
                    {
                        rowId: `${config.PREFIX}ytmp3`,
                        title: '🔊 YouTube to MP3',
                        description: 'Convert YouTube to audio'
                    },
                    {
                        rowId: `${config.PREFIX}fb`,
                        title: '📘 Facebook Video',
                        description: 'Download Facebook videos'
                    },
                    {
                        rowId: `${config.PREFIX}tiktok`,
                        title: '📱 TikTok Video',
                        description: 'Download TikTok videos'
                    }
                ]
            },
            {
                title: '🔍 SEARCH & MEDIA',
                rows: [
                    {
                        rowId: `${config.PREFIX}movie`,
                        title: '🎬 Movie Info',
                        description: 'Get movie information'
                    },
                    {
                        rowId: `${config.PREFIX}lyrics`,
                        title: '📝 Song Lyrics',
                        description: 'Find song lyrics'
                    },
                    {
                        rowId: `${config.PREFIX}news`,
                        title: '📰 Latest News',
                        description: 'Get news updates'
                    },
                    {
                        rowId: `${config.PREFIX}aiimg`,
                        title: '🤖 AI Image',
                        description: 'Generate AI images'
                    }
                ]
            },
            {
                title: '👥 GROUP COMMANDS',
                rows: [
                    {
                        rowId: `${config.PREFIX}tagall`,
                        title: '🏷️ Tag All',
                        description: 'Tag all group members'
                    },
                    {
                        rowId: `${config.PREFIX}promote`,
                        title: '⬆️ Promote',
                        description: 'Promote member to admin'
                    },
                    {
                        rowId: `${config.PREFIX}demote`,
                        title: '⬇️ Demote',
                        description: 'Demote admin to member'
                    },
                    {
                        rowId: `${config.PREFIX}kick`,
                        title: '👢 Kick',
                        description: 'Remove member from group'
                    },
                    {
                        rowId: `${config.PREFIX}add`,
                        title: '➕ Add',
                        description: 'Add member to group'
                    }
                ]
            },
            {
                title: '👤 PROFILE COMMANDS',
                rows: [
                    {
                        rowId: `${config.PREFIX}getdp`,
                        title: '🖼️ Get DP',
                        description: 'Get profile picture'
                    },
                    {
                        rowId: `${config.PREFIX}bio`,
                        title: '📝 Get Bio',
                        description: 'Get user bio'
                    },
                    {
                        rowId: `${config.PREFIX}jid`,
                        title: '🆔 Get JID',
                        description: 'Get user JID'
                    },
                    {
                        rowId: `${config.PREFIX}vv`,
                        title: '✅ View Once',
                        description: 'Save view once media'
                    }
                ]
            },
            {
                title: '📢 CHANNEL/GROUP SEND',
                rows: [
                    {
                        rowId: `${config.PREFIX}songch`,
                        title: '🎵 Send to Channel',
                        description: 'Send song to channel'
                    },
                    {
                        rowId: `${config.PREFIX}videogp`,
                        title: '🎥 Send to Group',
                        description: 'Send video to group'
                    },
                    {
                        rowId: `${config.PREFIX}textch`,
                        title: '📝 Text to Channel',
                        description: 'Send text to channel'
                    }
                ]
            }
        ]
    };
    
    try {
        if (settings.LIST_BUTTONS_ENABLED === 'true') {
            await socket.sendMessage(jid, listMessage);
        } else {
            // Fallback to button message
            const buttons = [
                { buttonId: `${config.PREFIX}category download`, buttonText: { displayText: '⬇️ DOWNLOAD' }, type: 1 },
                { buttonId: `${config.PREFIX}category group`, buttonText: { displayText: '👥 GROUP' }, type: 1 },
                { buttonId: `${config.PREFIX}category profile`, buttonText: { displayText: '👤 PROFILE' }, type: 1 },
                { buttonId: `${config.PREFIX}settings`, buttonText: { displayText: '⚙️ SETTINGS' }, type: 1 }
            ];
            
            await sendFormattedMessage(socket, jid, '📋 Main Menu', 
                `✨ Welcome to ${config.BOT_NAME}!\n\nSelect a category:`, lang, { buttons });
        }
    } catch (error) {
        console.error('Failed to send menu:', error);
        // Simple text fallback
        const menuText = `
✨ ${config.BOT_NAME} ✨

Available Commands:
• ${config.PREFIX}menu - Show this menu
• ${config.PREFIX}alive - Bot status
• ${config.PREFIX}ping - Ping test
• ${config.PREFIX}settings - Bot settings
• ${config.PREFIX}song - Download music
• ${config.PREFIX}video - Download video
• ${config.PREFIX}fb - Facebook download
• ${config.PREFIX}tiktok - TikTok download
• ${config.PREFIX}owner - Owner info
• ${config.PREFIX}getdp - Get profile picture
• ${config.PREFIX}tagall - Tag all members
• ${config.PREFIX}lyrics - Song lyrics
• ${config.PREFIX}news - Latest news

Use ${config.PREFIX}help [command] for more info.`;
        
        await socket.sendMessage(jid, { text: menuText });
    }
}

// Download commands handler
async function handleDownloadCommand(socket, message, command, args, settings, language) {
    const jid = message.key.remoteJid;
    const query = args.join(' ');
    
    if (!query) {
        await sendFormattedMessage(socket, jid, '❌ Usage', 
            `${config.PREFIX}${command} [URL or search term]`, language);
        return;
    }
    
    await sendFormattedMessage(socket, jid, '⏳ Processing', 
        `Processing your request... Please wait.`, language);
    
    try {
        switch (command) {
            case 'song':
                // Search and download song
                const songData = await downloadFromAPI('youtube_mp3', query);
                if (songData && songData.downloadUrl) {
                    await socket.sendMessage(jid, {
                        audio: { url: songData.downloadUrl },
                        mimetype: 'audio/mpeg',
                        caption: `🎵 ${songData.title || 'Downloaded Song'}\n\n✨ Downloaded via ${config.BOT_NAME}`
                    });
                } else {
                    await sendFormattedMessage(socket, jid, '❌ Error', 
                        'Failed to download song. Please try again.', language);
                }
                break;
                
            case 'video':
            case 'ytmp4':
                const videoData = await downloadFromAPI('youtube_mp4', query, { quality: '720' });
                if (videoData && videoData.downloadUrl) {
                    await socket.sendMessage(jid, {
                        video: { url: videoData.downloadUrl },
                        caption: `🎥 ${videoData.title || 'Downloaded Video'}\n\n✨ Downloaded via ${config.BOT_NAME}`
                    });
                } else {
                    await sendFormattedMessage(socket, jid, '❌ Error', 
                        'Failed to download video. Please try again.', language);
                }
                break;
                
            case 'ytmp3':
                const mp3Data = await downloadFromAPI('youtube_mp3', query);
                if (mp3Data && mp3Data.downloadUrl) {
                    await socket.sendMessage(jid, {
                        audio: { url: mp3Data.downloadUrl },
                        mimetype: 'audio/mpeg',
                        caption: `🔊 ${mp3Data.title || 'YouTube MP3'}\n\n✨ Downloaded via ${config.BOT_NAME}`
                    });
                } else {
                    await sendFormattedMessage(socket, jid, '❌ Error', 
                        'Failed to convert to MP3. Please try again.', language);
                }
                break;
                
            case 'fb':
            case 'facebook':
                const fbData = await downloadFromAPI('facebook', query);
                if (fbData && fbData.videoUrl) {
                    await socket.sendMessage(jid, {
                        video: { url: fbData.videoUrl },
                        caption: `📘 Facebook Video\n\n✨ Downloaded via ${config.BOT_NAME}`
                    });
                } else {
                    await sendFormattedMessage(socket, jid, '❌ Error', 
                        'Failed to download Facebook video. Please check the URL.', language);
                }
                break;
                
            case 'tiktok':
                const tiktokData = await downloadFromAPI('tiktok', query);
                if (tiktokData && tiktokData.videoUrl) {
                    await socket.sendMessage(jid, {
                        video: { url: tiktokData.videoUrl },
                        caption: `📱 TikTok Video\n\n✨ Downloaded via ${config.BOT_NAME}`
                    });
                } else {
                    await sendFormattedMessage(socket, jid, '❌ Error', 
                        'Failed to download TikTok video. Please check the URL.', language);
                }
                break;
                
            case 'lyrics':
                const lyricsData = await downloadFromAPI('lyrics', query);
                if (lyricsData && lyricsData.lyrics) {
                    await sendFormattedMessage(socket, jid, '📝 Lyrics', 
                        `🎵 ${lyricsData.title || 'Song'}\n\n${lyricsData.lyrics.substring(0, 1500)}${lyricsData.lyrics.length > 1500 ? '...' : ''}`, language);
                } else {
                    await sendFormattedMessage(socket, jid, '❌ Error', 
                        'No lyrics found. Please try another song.', language);
                }
                break;
                
            case 'news':
                const newsData = await downloadFromAPI('news');
                if (newsData && Array.isArray(newsData.articles)) {
                    const articles = newsData.articles.slice(0, 5);
                    let newsText = '📰 LATEST NEWS\n\n';
                    
                    articles.forEach((article, index) => {
                        newsText += `${index + 1}. ${article.title}\n`;
                        if (article.description) {
                            newsText += `   ${article.description.substring(0, 100)}...\n`;
                        }
                        newsText += `   📍 Source: ${article.source || 'Unknown'}\n\n`;
                    });
                    
                    await sendFormattedMessage(socket, jid, '📰 News Update', newsText, language);
                } else {
                    await sendFormattedMessage(socket, jid, '❌ Error', 
                        'Failed to fetch news. Please try again later.', language);
                }
                break;
                
            case 'movie':
                const subtitleData = await downloadFromAPI('subtitle', query);
                if (subtitleData && subtitleData.movieName) {
                    const movieText = `
🎬 MOVIE INFORMATION

📽️ Title: ${subtitleData.movieName}
🗣️ Language: ${subtitleData.language || 'Sinhala'}
📄 Format: ${subtitleData.format || '.srt'}

${subtitleData.downloadUrl ? '✅ Subtitle available for download' : '⚠️ No direct download link'}
`;
                    
                    await sendFormattedMessage(socket, jid, '🎬 Movie Info', movieText, language);
                    
                    if (subtitleData.downloadUrl) {
                        const buttons = [
                            {
                                buttonId: `${config.PREFIX}downloadsub ${encodeURIComponent(subtitleData.downloadUrl)} ${encodeURIComponent(subtitleData.movieName)}`,
                                buttonText: { displayText: '📥 Download Subtitle' },
                                type: 1
                            }
                        ];
                        
                        await sendFormattedMessage(socket, jid, '📝 Subtitle', 
                            'Click below to download subtitle:', language, { buttons });
                    }
                } else {
                    await sendFormattedMessage(socket, jid, '❌ Error', 
                        'Movie not found. Please check the URL.', language);
                }
                break;
                
            case 'aiimg':
                const style = args[1] || 'photorealistic';
                const aiData = await downloadFromAPI('ai_image', null, { prompt: query, style });
                if (aiData && aiData.imageUrl) {
                    await socket.sendMessage(jid, {
                        image: { url: aiData.imageUrl },
                        caption: `🤖 AI Generated Image\n🎨 Style: ${style}\n📝 Prompt: ${query}`
                    });
                } else {
                    await sendFormattedMessage(socket, jid, '❌ Error', 
                        'Failed to generate AI image. Please try again.', language);
                }
                break;
        }
    } catch (error) {
        console.error(`Download command error (${command}):`, error);
        await sendFormattedMessage(socket, jid, '❌ Error', 
            'An error occurred while processing your request.', language);
    }
}

// Group management commands
async function handleGroupCommand(socket, message, command, args, settings, language) {
    const jid = message.key.remoteJid;
    const sender = message.key.participant || jid;
    
    if (!jid.endsWith('@g.us')) {
        await sendFormattedMessage(socket, jid, '❌ Error', 'This command works only in groups', language);
        return;
    }
    
    if (settings.GROUP_FEATURES !== 'true') {
        await sendFormattedMessage(socket, jid, '❌ Error', 'Group features are disabled', language);
        return;
    }
    
    // Check admin permissions
    const metadata = await socket.groupMetadata(jid);
    const isAdmin = metadata.participants.find(p => p.id === sender)?.admin;
    const isBotAdmin = metadata.participants.find(p => p.id === socket.user.id)?.admin;
    
    if (!isAdmin && !isOwner(sender)) {
        await sendFormattedMessage(socket, jid, '❌ Error', 'Admin permission required', language);
        return;
    }
    
    switch (command) {
        case 'tagall':
            if (!isBotAdmin) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Bot needs admin rights', language);
                return;
            }
            
            const participants = metadata.participants;
            const mentions = participants.map(p => `@${p.id.split('@')[0]}`).join(' ');
            const tagMessage = args.length > 0 ? `${args.join(' ')}\n\n${mentions}` : mentions;
            
            await socket.sendMessage(jid, { 
                text: tagMessage, 
                mentions: participants.map(p => p.id) 
            });
            break;
            
        case 'hidetag':
            if (!isBotAdmin) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Bot needs admin rights', language);
                return;
            }
            
            const hideMessage = args.length > 0 ? args.join(' ') : 'Hello everyone!';
            await socket.sendMessage(jid, {
                text: hideMessage,
                mentions: metadata.participants.map(p => p.id)
            });
            break;
            
        case 'promote':
            if (!isBotAdmin) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Bot needs admin rights', language);
                return;
            }
            
            const userToPromote = args[0] ? args[0].replace('@', '').replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null;
            if (!userToPromote) {
                await sendFormattedMessage(socket, jid, '❌ Usage', `${config.PREFIX}promote @user`, language);
                return;
            }
            
            try {
                await socket.groupParticipantsUpdate(jid, [userToPromote], 'promote');
                await sendFormattedMessage(socket, jid, '✅ Success', 'User promoted to admin', language);
            } catch (error) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Failed to promote user', language);
            }
            break;
            
        case 'demote':
            if (!isBotAdmin) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Bot needs admin rights', language);
                return;
            }
            
            const userToDemote = args[0] ? args[0].replace('@', '').replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null;
            if (!userToDemote) {
                await sendFormattedMessage(socket, jid, '❌ Usage', `${config.PREFIX}demote @user`, language);
                return;
            }
            
            try {
                await socket.groupParticipantsUpdate(jid, [userToDemote], 'demote');
                await sendFormattedMessage(socket, jid, '✅ Success', 'User demoted from admin', language);
            } catch (error) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Failed to demote user', language);
            }
            break;
            
        case 'kick':
            if (!isBotAdmin) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Bot needs admin rights', language);
                return;
            }
            
            const userToKick = args[0] ? args[0].replace('@', '').replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null;
            if (!userToKick) {
                await sendFormattedMessage(socket, jid, '❌ Usage', `${config.PREFIX}kick @user`, language);
                return;
            }
            
            try {
                await socket.groupParticipantsUpdate(jid, [userToKick], 'remove');
                await sendFormattedMessage(socket, jid, '✅ Success', 'User kicked from group', language);
            } catch (error) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Failed to kick user', language);
            }
            break;
            
        case 'add':
            if (!isBotAdmin) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Bot needs admin rights', language);
                return;
            }
            
            const userToAdd = args[0] ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null;
            if (!userToAdd) {
                await sendFormattedMessage(socket, jid, '❌ Usage', `${config.PREFIX}add 947xxxxxxx`, language);
                return;
            }
            
            try {
                await socket.groupParticipantsUpdate(jid, [userToAdd], 'add');
                await sendFormattedMessage(socket, jid, '✅ Success', 'User added to group', language);
            } catch (error) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Failed to add user', language);
            }
            break;
            
        case 'gname':
            if (!isBotAdmin) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Bot needs admin rights', language);
                return;
            }
            
            const newName = args.join(' ');
            if (!newName) {
                await sendFormattedMessage(socket, jid, '❌ Usage', `${config.PREFIX}gname New Group Name`, language);
                return;
            }
            
            try {
                await socket.groupUpdateSubject(jid, newName);
                await sendFormattedMessage(socket, jid, '✅ Success', 'Group name updated', language);
            } catch (error) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Failed to update group name', language);
            }
            break;
            
        case 'gdesc':
            if (!isBotAdmin) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Bot needs admin rights', language);
                return;
            }
            
            const newDesc = args.join(' ');
            if (!newDesc) {
                await sendFormattedMessage(socket, jid, '❌ Usage', `${config.PREFIX}gdesc New Description`, language);
                return;
            }
            
            try {
                await socket.groupUpdateDescription(jid, newDesc);
                await sendFormattedMessage(socket, jid, '✅ Success', 'Group description updated', language);
            } catch (error) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Failed to update description', language);
            }
            break;
            
        case 'mute':
            if (!isBotAdmin) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Bot needs admin rights', language);
                return;
            }
            
            try {
                await socket.groupSettingUpdate(jid, 'announcement');
                await sendFormattedMessage(socket, jid, '✅ Success', 'Group muted (admins only)', language);
            } catch (error) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Failed to mute group', language);
            }
            break;
            
        case 'unmute':
            if (!isBotAdmin) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Bot needs admin rights', language);
                return;
            }
            
            try {
                await socket.groupSettingUpdate(jid, 'not_announcement');
                await sendFormattedMessage(socket, jid, '✅ Success', 'Group unmuted', language);
            } catch (error) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Failed to unmute group', language);
            }
            break;
            
        case 'linkgc':
            try {
                const inviteCode = await socket.groupInviteCode(jid);
                const groupLink = `https://chat.whatsapp.com/${inviteCode}`;
                await sendFormattedMessage(socket, jid, '🔗 Group Link', 
                    `Group Invite Link:\n${groupLink}`, language);
            } catch (error) {
                await sendFormattedMessage(socket, jid, '❌ Error', 
                    'Failed to get group link. Make sure bot is admin.', language);
            }
            break;
            
        case 'revoke':
            if (!isBotAdmin) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Bot needs admin rights', language);
                return;
            }
            
            try {
                await socket.groupRevokeInvite(jid);
                await sendFormattedMessage(socket, jid, '✅ Success', 
                    'Group invite link revoked and new one generated', language);
            } catch (error) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Failed to revoke link', language);
            }
            break;
    }
}

// Profile commands
async function handleProfileCommand(socket, message, command, args, settings, language) {
    const jid = message.key.remoteJid;
    let targetJid;
    
    // Determine target JID
    if (args.length > 0) {
        targetJid = args[0].replace('@', '').replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    } else if (message.message.extendedTextMessage && message.message.extendedTextMessage.contextInfo && 
               message.message.extendedTextMessage.contextInfo.participant) {
        targetJid = message.message.extendedTextMessage.contextInfo.participant;
    } else {
        targetJid = jid;
    }
    
    try {
        switch (command) {
            case 'getdp':
                const pfp = await socket.profilePictureUrl(targetJid, 'image');
                if (pfp) {
                    await socket.sendMessage(jid, {
                        image: { url: pfp },
                        caption: `🖼️ Profile Picture\n👤 User: ${targetJid}`
                    });
                } else {
                    await sendFormattedMessage(socket, jid, '❌ Error', 'No profile picture found', language);
                }
                break;
                
            case 'bio':
                try {
                    const status = await socket.fetchStatus(targetJid);
                    if (status && status.status) {
                        await sendFormattedMessage(socket, jid, '📝 Bio', 
                            `👤 User: ${targetJid}\n📝 Bio: ${status.status}`, language);
                    } else {
                        await sendFormattedMessage(socket, jid, '❌ Error', 'No bio found', language);
                    }
                } catch (error) {
                    await sendFormattedMessage(socket, jid, '❌ Error', 'Failed to get bio', language);
                }
                break;
                
            case 'jid':
                await sendFormattedMessage(socket, jid, '🆔 JID', 
                    `User JID: ${targetJid}\n\n💡 To use this JID in commands, copy everything before @`, language);
                break;
                
            case 'vv':
                // Save view once media
                if (message.message.viewOnceMessageV2) {
                    const viewOnceMsg = message.message.viewOnceMessageV2.message;
                    let mediaBuffer;
                    let fileType;
                    
                    if (viewOnceMsg.imageMessage) {
                        mediaBuffer = await downloadAndSaveMedia(viewOnceMsg.imageMessage, 'image');
                        fileType = 'image';
                    } else if (viewOnceMsg.videoMessage) {
                        mediaBuffer = await downloadAndSaveMedia(viewOnceMsg.videoMessage, 'video');
                        fileType = 'video';
                    }
                    
                    if (mediaBuffer) {
                        const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
                        const fileName = `viewonce_${timestamp}.${fileType === 'image' ? 'jpg' : 'mp4'}`;
                        const savePath = path.join('./temp', fileName);
                        
                        await fs.writeFile(savePath, mediaBuffer);
                        
                        if (fileType === 'image') {
                            await socket.sendMessage(jid, {
                                image: fs.readFileSync(savePath),
                                caption: '✅ View once image saved'
                            });
                        } else {
                            await socket.sendMessage(jid, {
                                video: fs.readFileSync(savePath),
                                caption: '✅ View once video saved'
                            });
                        }
                        
                        // Clean up after 5 minutes
                        setTimeout(() => {
                            if (fs.existsSync(savePath)) fs.unlinkSync(savePath);
                        }, 300000);
                    } else {
                        await sendFormattedMessage(socket, jid, '❌ Error', 'No view once media found', language);
                    }
                } else {
                    await sendFormattedMessage(socket, jid, '❌ Error', 'Reply to a view once message', language);
                }
                break;
        }
    } catch (error) {
        console.error(`Profile command error (${command}):`, error);
        await sendFormattedMessage(socket, jid, '❌ Error', 'Failed to process command', language);
    }
}

// Channel/Group send commands
async function handleSendCommand(socket, message, command, args, settings, language) {
    const jid = message.key.remoteJid;
    const sender = message.key.participant || jid;
    
    if (!isOwner(sender)) {
        await sendFormattedMessage(socket, jid, '❌ Access Denied', 'Owner only command', language);
        return;
    }
    
    if (args.length < 2) {
        await sendFormattedMessage(socket, jid, '❌ Usage', 
            `${config.PREFIX}${command} <target_jid/group_link> <content/url>`, language);
        return;
    }
    
    const target = args[0];
    const content = args.slice(1).join(' ');
    
    let targetJid;
    
    // Check if it's a group link
    if (target.includes('chat.whatsapp.com')) {
        try {
            const inviteCode = target.split('/').pop();
            const response = await socket.groupGetInviteInfo(inviteCode);
            targetJid = response.id;
            
            // Join group if not already a member
            const metadata = await socket.groupMetadata(targetJid).catch(() => null);
            if (!metadata) {
                await socket.groupAcceptInvite(inviteCode);
            }
        } catch (error) {
            await sendFormattedMessage(socket, jid, '❌ Error', 'Invalid group link', language);
            return;
        }
    } else {
        targetJid = target.includes('@') ? target : target + '@s.whatsapp.net';
    }
    
    try {
        switch (command) {
            case 'songch':
            case 'songgp':
                const songData = await downloadFromAPI('youtube_mp3', content);
                if (songData && songData.downloadUrl) {
                    await socket.sendMessage(targetJid, {
                        audio: { url: songData.downloadUrl },
                        mimetype: 'audio/mpeg',
                        caption: `🎵 Sent via ${config.BOT_NAME}`
                    });
                    await sendFormattedMessage(socket, jid, '✅ Success', 'Song sent successfully', language);
                } else {
                    await sendFormattedMessage(socket, jid, '❌ Error', 'Failed to download song', language);
                }
                break;
                
            case 'videoch':
            case 'videogp':
                const videoData = await downloadFromAPI('youtube_mp4', content, { quality: '720' });
                if (videoData && videoData.downloadUrl) {
                    await socket.sendMessage(targetJid, {
                        video: { url: videoData.downloadUrl },
                        caption: `🎥 Sent via ${config.BOT_NAME}`
                    });
                    await sendFormattedMessage(socket, jid, '✅ Success', 'Video sent successfully', language);
                } else {
                    await sendFormattedMessage(socket, jid, '❌ Error', 'Failed to download video', language);
                }
                break;
                
            case 'textch':
            case 'textgp':
                await socket.sendMessage(targetJid, { text: content });
                await sendFormattedMessage(socket, jid, '✅ Success', 'Text sent successfully', language);
                break;
        }
    } catch (error) {
        console.error(`Send command error (${command}):`, error);
        await sendFormattedMessage(socket, jid, '❌ Error', 'Failed to send content', language);
    }
}

// Settings menu system
async function showSettingsMenu(socket, jid, settings, language) {
    const lang = language || settings.LANGUAGE;
    const isOwnerUser = isOwner(jid);
    
    const settingsText = `
⚙️ ${config.BOT_NAME} SETTINGS

📊 Current Status:
• 🌐 Language: ${lang.toUpperCase()}
• 🎯 Bot Mode: ${settings.BOT_MODE}
• 🔘 Buttons: ${settings.BUTTONS_ENABLED === 'true' ? '✅ ON' : '❌ OFF'}
• 📋 List Buttons: ${settings.LIST_BUTTONS_ENABLED === 'true' ? '✅ ON' : '❌ OFF'}
• 🖼️ Bot Logo: ${settings.BOT_LOGO_ENABLED === 'true' ? '✅ ON' : '❌ OFF'}

🔧 Auto Features:
• 👀 View Status: ${settings.AUTO_VIEW_STATUS === 'true' ? '✅ ON' : '❌ OFF'}
• ❤️ React Status: ${settings.AUTO_STATUS_REACT === 'true' ? '✅ ON' : '❌ OFF'}
• 💾 Save Status: ${settings.AUTO_STATUS_SAVE === 'true' ? '✅ ON' : '❌ OFF'}
• ⏺️ Recording: ${settings.AUTO_RECORDING === 'true' ? '✅ ON' : '❌ OFF'}
• 🌐 Online: ${settings.AUTO_ONLINE === 'true' ? '✅ ON' : '❌ OFF'}

🛡️ Security:
• 🗑️ Anti-Delete: ${settings.ANTI_DELETE === 'true' ? '✅ ON' : '❌ OFF'}
• 👥 Group Features: ${settings.GROUP_FEATURES === 'true' ? '✅ ON' : '❌ OFF'}
• 📢 Channel Features: ${settings.CHANNEL_FEATURES === 'true' ? '✅ ON' : '❌ OFF'}
`;

    const buttons = [
        {
            buttonId: `${config.PREFIX}settings bot`,
            buttonText: { displayText: '🤖 Bot Control' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}settings auto`,
            buttonText: { displayText: '⚡ Auto Features' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}settings security`,
            buttonText: { displayText: '🛡️ Security' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}settings ui`,
            buttonText: { displayText: '🎨 UI Settings' },
            type: 1
        }
    ];
    
    if (isOwnerUser) {
        buttons.push(
            {
                buttonId: `${config.PREFIX}settings owner`,
                buttonText: { displayText: '👑 Owner Settings' },
                type: 1
            }
        );
    }
    
    buttons.push({
        buttonId: `${config.PREFIX}menu`,
        buttonText: { displayText: '🔙 Back to Menu' },
        type: 1
    });
    
    await sendFormattedMessage(socket, jid, '⚙️ Settings Menu', settingsText, lang, { buttons });
}

// Owner commands handler
async function handleOwnerCommand(socket, message, command, args, settings, language) {
    const jid = message.key.remoteJid;
    const sender = message.key.participant || jid;
    
    if (!isOwner(sender)) {
        await sendFormattedMessage(socket, jid, '❌ Access Denied', 'Owner only command', language);
        return;
    }
    
    switch (command) {
        case 'public':
            settings.BOT_MODE = 'public';
            await saveUserSettings(socket.user.id.replace(/[^0-9]/g, ''), settings);
            await sendFormattedMessage(socket, jid, '✅ Mode Changed', 'Bot mode set to: PUBLIC', language);
            break;
            
        case 'private':
            settings.BOT_MODE = 'private';
            await saveUserSettings(socket.user.id.replace(/[^0-9]/g, ''), settings);
            await sendFormattedMessage(socket, jid, '✅ Mode Changed', 'Bot mode set to: PRIVATE', language);
            break;
            
        case 'inbox':
            settings.BOT_MODE = 'inbox';
            await saveUserSettings(socket.user.id.replace(/[^0-9]/g, ''), settings);
            await sendFormattedMessage(socket, jid, '✅ Mode Changed', 'Bot mode set to: INBOX ONLY', language);
            break;
            
        case 'restart':
            await sendFormattedMessage(socket, jid, '🔄 Restarting', 'Bot is restarting...', language);
            process.exit(0);
            break;
            
        case 'shutdown':
            await sendFormattedMessage(socket, jid, '🛑 Shutting Down', 'Bot is shutting down...', language);
            
            // Close all active sockets
            activeSockets.forEach((sock, num) => {
                try {
                    sock.ws.close();
                } catch (error) {
                    console.error(`Failed to close socket for ${num}:`, error);
                }
            });
            
            activeSockets.clear();
            process.exit(0);
            break;
            
        case 'block':
            if (args.length === 0) {
                await sendFormattedMessage(socket, jid, '❌ Usage', `${config.PREFIX}block @user`, language);
                return;
            }
            
            const userToBlock = args[0].replace('@', '').replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            try {
                await socket.updateBlockStatus(userToBlock, 'block');
                await sendFormattedMessage(socket, jid, '✅ Success', 'User blocked', language);
            } catch (error) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Failed to block user', language);
            }
            break;
            
        case 'unblock':
            if (args.length === 0) {
                await sendFormattedMessage(socket, jid, '❌ Usage', `${config.PREFIX}unblock @user`, language);
                return;
            }
            
            const userToUnblock = args[0].replace('@', '').replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            try {
                await socket.updateBlockStatus(userToUnblock, 'unblock');
                await sendFormattedMessage(socket, jid, '✅ Success', 'User unblocked', language);
            } catch (error) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Failed to unblock user', language);
            }
            break;
            
        case 'setname':
            const newBotName = args.join(' ');
            if (!newBotName) {
                await sendFormattedMessage(socket, jid, '❌ Usage', `${config.PREFIX}setname New Bot Name`, language);
                return;
            }
            
            config.BOT_NAME = newBotName;
            settings.BOT_NAME = newBotName;
            await saveUserSettings(socket.user.id.replace(/[^0-9]/g, ''), settings);
            
            try {
                await socket.updateProfileName(newBotName);
                await sendFormattedMessage(socket, jid, '✅ Success', 
                    `Bot name changed to: ${newBotName}`, language);
            } catch (error) {
                await sendFormattedMessage(socket, jid, '⚠️ Partial Success', 
                    `Bot name saved as ${newBotName} but couldn't update profile (might need phone connection)`, language);
            }
            break;
            
        case 'setlogo':
            // Check for replied image
            if (message.message.imageMessage || (message.message.extendedTextMessage && 
                message.message.extendedTextMessage.contextInfo && 
                message.message.extendedTextMessage.contextInfo.quotedMessage && 
                message.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage)) {
                
                let imageMsg = message.message.imageMessage;
                if (!imageMsg && message.message.extendedTextMessage && 
                    message.message.extendedTextMessage.contextInfo) {
                    imageMsg = message.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage;
                }
                
                if (imageMsg) {
                    const imageBuffer = await downloadAndSaveMedia(imageMsg, 'image');
                    if (imageBuffer) {
                        const logoPath = config.BOT_LOGO_PATH;
                        await fs.writeFile(logoPath, imageBuffer);
                        
                        // Update profile picture if possible
                        try {
                            await socket.updateProfilePicture(jidNormalizedUser(socket.user.id), imageBuffer);
                            await sendFormattedMessage(socket, jid, '✅ Success', 
                                'Bot logo and profile picture updated', language);
                        } catch (error) {
                            await sendFormattedMessage(socket, jid, '✅ Success', 
                                'Bot logo saved (profile picture update may require phone connection)', language);
                        }
                    } else {
                        await sendFormattedMessage(socket, jid, '❌ Error', 
                            'Failed to download image', language);
                    }
                }
            } else {
                await sendFormattedMessage(socket, jid, '❌ Usage', 
                    'Reply to an image with .setlogo', language);
            }
            break;
            
        case 'setownerdp':
            // Similar to setlogo but for owner's DP
            if (message.message.imageMessage || (message.message.extendedTextMessage && 
                message.message.extendedTextMessage.contextInfo && 
                message.message.extendedTextMessage.contextInfo.quotedMessage && 
                message.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage)) {
                
                let imageMsg = message.message.imageMessage;
                if (!imageMsg && message.message.extendedTextMessage && 
                    message.message.extendedTextMessage.contextInfo) {
                    imageMsg = message.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage;
                }
                
                if (imageMsg) {
                    const imageBuffer = await downloadAndSaveMedia(imageMsg, 'image');
                    if (imageBuffer) {
                        const ownerDpPath = config.OWNER_DP_PATH;
                        await fs.writeFile(ownerDpPath, imageBuffer);
                        await sendFormattedMessage(socket, jid, '✅ Success', 
                            'Owner DP saved', language);
                    } else {
                        await sendFormattedMessage(socket, jid, '❌ Error', 
                            'Failed to download image', language);
                    }
                }
            } else {
                await sendFormattedMessage(socket, jid, '❌ Usage', 
                    'Reply to an image with .setownerdp', language);
            }
            break;
            
        case 'statusreact':
            const statusReactState = args[0];
            if (statusReactState === 'on' || statusReactState === 'off') {
                settings.AUTO_STATUS_REACT = statusReactState === 'on' ? 'true' : 'false';
                await saveUserSettings(socket.user.id.replace(/[^0-9]/g, ''), settings);
                await sendFormattedMessage(socket, jid, '✅ Setting Updated', 
                    `Auto status react: ${statusReactState.toUpperCase()}`, language);
            } else {
                await sendFormattedMessage(socket, jid, '❌ Usage', 
                    `${config.PREFIX}statusreact on/off`, language);
            }
            break;
            
        case 'setstatusemoji':
            const emoji = args[0];
            if (emoji) {
                settings.STATUS_REACT_EMOJI = emoji;
                await saveUserSettings(socket.user.id.replace(/[^0-9]/g, ''), settings);
                await sendFormattedMessage(socket, jid, '✅ Setting Updated', 
                    `Status reaction emoji set to: ${emoji}`, language);
            } else {
                await sendFormattedMessage(socket, jid, '❌ Usage', 
                    `${config.PREFIX}setstatusemoji ❤️`, language);
            }
            break;
            
        case 'autorecord':
            const recordState = args[0];
            if (recordState === 'on' || recordState === 'off') {
                settings.AUTO_RECORDING = recordState === 'on' ? 'true' : 'false';
                await saveUserSettings(socket.user.id.replace(/[^0-9]/g, ''), settings);
                await sendFormattedMessage(socket, jid, '✅ Setting Updated', 
                    `Auto recording: ${recordState.toUpperCase()}`, language);
            } else {
                await sendFormattedMessage(socket, jid, '❌ Usage', 
                    `${config.PREFIX}autorecord on/off`, language);
            }
            break;
            
        case 'online':
            const onlineState = args[0];
            if (onlineState === 'on' || onlineState === 'off') {
                settings.AUTO_ONLINE = onlineState === 'on' ? 'true' : 'false';
                await saveUserSettings(socket.user.id.replace(/[^0-9]/g, ''), settings);
                await sendFormattedMessage(socket, jid, '✅ Setting Updated', 
                    `Auto online: ${onlineState.toUpperCase()}`, language);
            } else {
                await sendFormattedMessage(socket, jid, '❌ Usage', 
                    `${config.PREFIX}online on/off`, language);
            }
            break;
            
        case 'autocontact':
            const contactState = args[0];
            if (contactState === 'on' || contactState === 'off') {
                settings.AUTO_CONTACT_SAVE = contactState === 'on' ? 'true' : 'false';
                await saveUserSettings(socket.user.id.replace(/[^0-9]/g, ''), settings);
                await sendFormattedMessage(socket, jid, '✅ Setting Updated', 
                    `Auto contact save: ${contactState.toUpperCase()}`, language);
            } else {
                await sendFormattedMessage(socket, jid, '❌ Usage', 
                    `${config.PREFIX}autocontact on/off`, language);
            }
            break;
            
        case 'autostatussave':
            const statusSaveState = args[0];
            if (statusSaveState === 'on' || statusSaveState === 'off') {
                settings.AUTO_STATUS_SAVE = statusSaveState === 'on' ? 'true' : 'false';
                await saveUserSettings(socket.user.id.replace(/[^0-9]/g, ''), settings);
                await sendFormattedMessage(socket, jid, '✅ Setting Updated', 
                    `Auto status save: ${statusSaveState.toUpperCase()}`, language);
            } else {
                await sendFormattedMessage(socket, jid, '❌ Usage', 
                    `${config.PREFIX}autostatussave on/off`, language);
            }
            break;
            
        case 'antidelete':
            const antiDeleteState = args[0];
            if (antiDeleteState === 'on' || antiDeleteState === 'off') {
                settings.ANTI_DELETE = antiDeleteState === 'on' ? 'true' : 'false';
                await saveUserSettings(socket.user.id.replace(/[^0-9]/g, ''), settings);
                await sendFormattedMessage(socket, jid, '✅ Setting Updated', 
                    `Anti-delete: ${antiDeleteState.toUpperCase()}`, language);
            } else {
                await sendFormattedMessage(socket, jid, '❌ Usage', 
                    `${config.PREFIX}antidelete on/off`, language);
            }
            break;
            
        case 'chr':
        case 'creact':
            const reactionText = args.join(' ');
            if (!reactionText) {
                await sendFormattedMessage(socket, jid, '❌ Usage', 
                    `${config.PREFIX}chr YourText`, language);
                return;
            }
            await sendChannelReaction(socket, jid, reactionText, settings);
            break;
    }
}

// Main command handler
function setupCommandHandlers(socket, number) {
    socket.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.remoteJid === 'status@broadcast') return;
        
        const jid = msg.key.remoteJid;
        const sender = msg.key.participant || jid;
        const settings = await loadUserSettings(number);
        const language = settings.LANGUAGE;
        
        // Check bot access based on mode
        if (!checkBotAccess(settings, sender, jid.endsWith('@g.us'))) {
            if (settings.BOT_MODE === 'private') {
                await sendFormattedMessage(socket, jid, '❌ Access Denied', 
                    'This bot is in private mode. Owner only.', language);
            } else if (settings.BOT_MODE === 'inbox' && jid.endsWith('@g.us')) {
                await sendFormattedMessage(socket, jid, '❌ Access Denied', 
                    'This bot is in inbox-only mode.', language);
            }
            return;
        }
        
        // Update presence
        await updatePresence(socket, jid, settings);
        
        // Track messages for anti-delete
        if (settings.ANTI_DELETE === 'true') {
            const messageContent = msg.message.conversation || 
                                 msg.message.extendedTextMessage?.text || 
                                 msg.message.imageMessage?.caption ||
                                 msg.message.videoMessage?.caption ||
                                 'Media message';
            
            let mediaType = null;
            let mediaUrl = null;
            
            if (msg.message.imageMessage) {
                mediaType = 'image';
                // Save image temporarily
                try {
                    const mediaBuffer = await downloadAndSaveMedia(msg.message.imageMessage, 'image');
                    if (mediaBuffer) {
                        const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
                        mediaUrl = path.join('./temp', `track_${timestamp}.jpg`);
                        await fs.writeFile(mediaUrl, mediaBuffer);
                    }
                } catch (error) {
                    console.error('Failed to save image for tracking:', error);
                }
            } else if (msg.message.videoMessage) {
                mediaType = 'video';
            } else if (msg.message.audioMessage) {
                mediaType = 'audio';
            }
            
            messageTracker.set(msg.key.id, {
                sender: sender,
                content: messageContent,
                timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
                chatJid: jid,
                mediaType: mediaType,
                mediaUrl: mediaUrl
            });
            
            // Clean old tracked messages after 1 hour
            setTimeout(() => {
                messageTracker.delete(msg.key.id);
                if (mediaUrl && fs.existsSync(mediaUrl)) {
                    fs.unlinkSync(mediaUrl);
                }
            }, 3600000);
        }
        
        // Extract command
        let command = null;
        let args = [];
        let text = '';
        
        if (msg.message.conversation) {
            text = msg.message.conversation;
        } else if (msg.message.extendedTextMessage?.text) {
            text = msg.message.extendedTextMessage.text;
        } else if (msg.message.buttonsResponseMessage) {
            text = msg.message.buttonsResponseMessage.selectedButtonId;
        } else if (msg.message.listResponseMessage) {
            text = msg.message.listResponseMessage.singleSelectReply.selectedRowId;
        }
        
        if (text.startsWith(settings.PREFIX || config.PREFIX)) {
            const parts = text.slice((settings.PREFIX || config.PREFIX).length).trim().split(/\s+/);
            command = parts[0].toLowerCase();
            args = parts.slice(1);
        }
        
        if (!command) return;
        
        try {
            // Handle main commands
            switch (command) {
                case 'menu':
                case 'help':
                    await showMainMenu(socket, jid, settings, language);
                    break;
                    
                case 'alive':
                    const startTime = socketCreationTime.get(number) || Date.now();
                    const uptime = Date.now() - startTime;
                    const hours = Math.floor(uptime / 3600000);
                    const minutes = Math.floor((uptime % 3600000) / 60000);
                    const seconds = Math.floor((uptime % 60000) / 1000);
                    
                    const aliveText = `
🤖 ${config.BOT_NAME} STATUS

📊 SYSTEM INFO:
• 🟢 Status: ACTIVE
• ⏰ Uptime: ${hours}h ${minutes}m ${seconds}s
• 📱 Number: ${number}
• 👥 Active Sessions: ${activeSockets.size}
• ⚡ Mode: ${settings.BOT_MODE}

⚙️ CURRENT SETTINGS:
• 🎯 Bot Mode: ${settings.BOT_MODE}
• 🔘 Buttons: ${settings.BUTTONS_ENABLED === 'true' ? '✅ ON' : '❌ OFF'}
• 🛡️ Anti-Delete: ${settings.ANTI_DELETE === 'true' ? '✅ ON' : '❌ OFF'}
• 👀 View Status: ${settings.AUTO_VIEW_STATUS === 'true' ? '✅ ON' : '❌ OFF'}

🔗 IMPORTANT LINKS:
• 📢 Channel: ${config.CHANNEL_LINK}
• 👥 Support: ${config.GROUP_INVITE_LINK}
• 👑 Owner: ${config.OWNER_NUMBERS[0]}
`;
                    await sendFormattedMessage(socket, jid, '🤖 Bot Status', aliveText, language);
                    break;
                    
                case 'ping':
                    const start = Date.now();
                    await socket.sendPresenceUpdate('available', jid);
                    const latency = Date.now() - start;
                    
                    const pingText = `
🏓 PING TEST

📊 RESULTS:
• ⚡ Latency: ${latency}ms
• 🌐 Connection: ${latency < 100 ? 'Excellent' : latency < 300 ? 'Good' : 'Fair'}
• 🚀 Speed: ${latency < 100 ? '⭐⭐⭐⭐⭐' : latency < 200 ? '⭐⭐⭐⭐' : latency < 300 ? '⭐⭐⭐' : '⭐⭐'}
• 💾 Memory: Optimal

💡 TIPS:
• Low latency = Fast responses
• Keep bot updated
• Check internet connection
`;
                    await sendFormattedMessage(socket, jid, '🏓 Ping Test', pingText, language);
                    break;
                    
                case 'owner':
                    const ownerText = `
👑 BOT OWNER INFORMATION

📞 CONTACT:
• Owner 1: +${config.OWNER_NUMBERS[0]}
• Owner 2: +${config.OWNER_NUMBERS[1]}

🏢 BOT DETAILS:
• 🤖 Name: ${config.BOT_NAME}
• 🎯 Version: 2.0.0
• 📦 Type: Multi-Feature WhatsApp Bot
• ⚡ Status: Premium Edition

🔗 LINKS:
• 📢 Channel: ${config.CHANNEL_LINK}
• 👥 Group: ${config.GROUP_INVITE_LINK}

💡 FEATURES:
• ✅ Auto Status Features
• ✅ Media Downloader
• ✅ Group Management
• ✅ AI Tools
• ✅ News Updates
• ✅ Custom Settings
`;
                    await sendFormattedMessage(socket, jid, '👑 Owner Info', ownerText, language);
                    break;
                    
                case 'settings':
                    if (args.length === 0) {
                        await showSettingsMenu(socket, jid, settings, language);
                    } else {
                        // Handle settings submenus
                        // (You can expand this based on your settings structure)
                        await sendFormattedMessage(socket, jid, '⚙️ Settings', 
                            'Settings submenu under development. Use .settings for main menu.', language);
                    }
                    break;
                    
                // Download commands
                case 'song':
                case 'video':
                case 'ytmp3':
                case 'ytmp4':
                case 'fb':
                case 'facebook':
                case 'tiktok':
                case 'lyrics':
                case 'news':
                case 'movie':
                case 'aiimg':
                    await handleDownloadCommand(socket, msg, command, args, settings, language);
                    break;
                    
                // Group commands
                case 'tagall':
                case 'hidetag':
                case 'promote':
                case 'demote':
                case 'kick':
                case 'add':
                case 'gname':
                case 'gdesc':
                case 'mute':
                case 'unmute':
                case 'linkgc':
                case 'revoke':
                    await handleGroupCommand(socket, msg, command, args, settings, language);
                    break;
                    
                // Profile commands
                case 'getdp':
                case 'bio':
                case 'jid':
                case 'vv':
                    await handleProfileCommand(socket, msg, command, args, settings, language);
                    break;
                    
                // Channel/Group send commands
                case 'songch':
                case 'songgp':
                case 'videoch':
                case 'videogp':
                case 'textch':
                case 'textgp':
                    await handleSendCommand(socket, msg, command, args, settings, language);
                    break;
                    
                // Owner commands
                case 'public':
                case 'private':
                case 'inbox':
                case 'restart':
                case 'shutdown':
                case 'block':
                case 'unblock':
                case 'setname':
                case 'setlogo':
                case 'setownerdp':
                case 'statusreact':
                case 'setstatusemoji':
                case 'autorecord':
                case 'online':
                case 'autocontact':
                case 'autostatussave':
                case 'antidelete':
                case 'chr':
                case 'creact':
                    await handleOwnerCommand(socket, msg, command, args, settings, language);
                    break;
                    
                default:
                    await sendFormattedMessage(socket, jid, '❌ Unknown Command', 
                        `Command "${command}" not found. Use ${settings.PREFIX}menu to see all commands.`, language);
            }
        } catch (error) {
            console.error('Command handler error:', error);
            await sendFormattedMessage(socket, jid, '❌ Error', 
                'An error occurred while processing your command.', language);
        }
    });
    
    // Handle delete messages (Anti-delete)
    socket.ev.on('messages.delete', async ({ keys }) => {
        if (keys && keys.length > 0) {
            const settings = await loadUserSettings(number);
            if (settings.ANTI_DELETE === 'true') {
                await trackDeletedMessage(socket, keys, settings);
            }
        }
    });
    
    // Handle status updates
    socket.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;
        
        const settings = await loadUserSettings(number);
        await handleStatusUpdate(socket, msg, settings);
    });
    
    // Handle connection updates (auto reconnect)
    socket.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error?.output?.statusCode !== 401);
            
            if (shouldReconnect && config.AUTO_RECONNECT) {
                console.log(`Connection closed for ${number}, attempting reconnect...`);
                
                // Track reconnect attempts
                const attempts = reconnectAttempts.get(number) || 0;
                if (attempts < config.MAX_RETRIES) {
                    reconnectAttempts.set(number, attempts + 1);
                    
                    // Wait before reconnecting
                    await delay(5000);
                    
                    // Re-pair
                    try {
                        await EmpirePair(number, { send: () => {}, status: () => {} });
                    } catch (error) {
                        console.error(`Reconnect failed for ${number}:`, error);
                    }
                } else {
                    console.error(`Max reconnect attempts reached for ${number}`);
                    activeSockets.delete(number);
                    reconnectAttempts.delete(number);
                }
            } else {
                console.log(`Connection closed permanently for ${number}`);
                activeSockets.delete(number);
                reconnectAttempts.delete(number);
            }
        } else if (connection === 'open') {
            console.log(`✅ Connected successfully for ${number}`);
            reconnectAttempts.delete(number);
        }
    });
}

// Pairing function with auto reconnect
async function EmpirePair(number, res) {
    const sanitizedNumber = number.replace(/[^0-9]/g, '');
    const sessionPath = path.join(SESSION_BASE_PATH, `session_${sanitizedNumber}`);
    
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    const logger = pino({ level: process.env.NODE_ENV === 'production' ? 'fatal' : 'info' });
    
    try {
        const socket = makeWASocket({
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, logger),
            },
            printQRInTerminal: false,
            logger,
            browser: Browsers.macOS('Safari'),
            markOnlineOnConnect: true,
            syncFullHistory: false,
            linkPreviewImageThumbnailWidth: 192,
            generateHighQualityLinkPreview: true,
            emitOwnEvents: true,
            defaultQueryTimeoutMs: 60000,
            getMessage: async (key) => {
                return null;
            }
        });
        
        socketCreationTime.set(sanitizedNumber, Date.now());
        
        // Load user settings
        const settings = await loadUserSettings(sanitizedNumber);
        userSettings.set(sanitizedNumber, settings);
        
        // Setup handlers
        setupCommandHandlers(socket, sanitizedNumber);
        
        // Request pairing code if not registered
        if (!socket.authState.creds.registered) {
            try {
                const code = await socket.requestPairingCode(sanitizedNumber);
                if (res && !res.headersSent) {
                    res.send({ code });
                }
                return;
            } catch (error) {
                console.error('Failed to request pairing code:', error);
                if (res && !res.headersSent) {
                    res.status(500).send({ error: 'Failed to get pairing code' });
                }
                return;
            }
        }
        
        // Handle creds update
        socket.ev.on('creds.update', saveCreds);
        
        // Handle connection
        socket.ev.on('connection.update', async (update) => {
            const { connection } = update;
            if (connection === 'open') {
                activeSockets.set(sanitizedNumber, socket);
                
                // Send welcome message
                const settings = userSettings.get(sanitizedNumber);
                const welcomeText = `
🎉 WELCOME TO ${config.BOT_NAME}

✅ CONNECTION SUCCESSFUL
• 📱 Number: ${sanitizedNumber}
• 🟢 Status: CONNECTED
• ⚡ Speed: Optimal
• 🎯 Mode: ${settings.BOT_MODE}

⚙️ BOT FEATURES:
• 📊 Status Auto Features
• 🎵 Media Downloader
• 👥 Group Management
• 🤖 AI Tools
• 📰 News Updates
• ⚡ Fast & Stable

🛠️ GETTING STARTED:
1. Type ${settings.PREFIX}menu for main menu
2. Type ${settings.PREFIX}settings to configure
3. Explore all features!

🔗 IMPORTANT LINKS:
• 📢 Channel: ${config.CHANNEL_LINK}
• 👥 Group: ${config.GROUP_INVITE_LINK}
• 👑 Owner: ${config.OWNER_NUMBERS[0]}
`;
                
                await sendFormattedMessage(socket, jidNormalizedUser(socket.user.id), 
                    '🎉 Connected!', welcomeText, settings.LANGUAGE);
                
                console.log(`✅ Bot connected for ${sanitizedNumber}`);
            }
        });
        
    } catch (error) {
        console.error('Pairing error:', error);
        if (res && !res.headersSent) {
            res.status(500).send({ error: 'Pairing failed' });
        }
    }
}

// Routes
router.get('/', async (req, res) => {
    const { number } = req.query;
    if (!number) {
        return res.status(400).send({ error: 'Number parameter is required' });
    }
    
    if (activeSockets.has(number.replace(/[^0-9]/g, ''))) {
        return res.status(200).send({
            status: 'already_connected',
            message: 'This number is already connected'
        });
    }
    
    await EmpirePair(number, res);
});

router.get('/active', (req, res) => {
    res.status(200).send({
        count: activeSockets.size,
        numbers: Array.from(activeSockets.keys()),
        settings: Array.from(userSettings.entries()).map(([num, settings]) => ({
            number: num,
            bot_name: settings.BOT_NAME || config.BOT_NAME,
            language: settings.LANGUAGE,
            mode: settings.BOT_MODE
        }))
    });
});

router.get('/settings/:number', async (req, res) => {
    const { number } = req.params;
    const settings = await loadUserSettings(number);
    res.status(200).send(settings);
});

router.post('/settings/:number', async (req, res) => {
    const { number } = req.params;
    const newSettings = req.body;
    
    try {
        await saveUserSettings(number, newSettings);
        userSettings.set(number, newSettings);
        
        // Update active socket if exists
        const socket = activeSockets.get(number);
        if (socket) {
            const jid = jidNormalizedUser(socket.user.id);
            await sendFormattedMessage(socket, jid, '✅ Settings Updated', 
                'Settings have been updated via API', newSettings.LANGUAGE);
        }
        
        res.status(200).send({ status: 'success' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to save settings' });
    }
});

router.get('/status-saves', (req, res) => {
    const saves = Array.from(statusSaves.values()).map(save => ({
        sender: save.sender,
        timestamp: save.timestamp,
        type: save.type,
        path: save.path
    }));
    res.status(200).send({ saves });
});

// Cleanup
process.on('exit', () => {
    activeSockets.forEach((socket, number) => {
        try {
            socket.ws.close();
        } catch (error) {
            console.error(`Failed to close socket for ${number}:`, error);
        }
    });
    activeSockets.clear();
    socketCreationTime.clear();
    reconnectAttempts.clear();
    
    // Clean temp files
    if (fs.existsSync('./temp')) {
        fs.readdirSync('./temp').forEach(file => {
            try {
                fs.unlinkSync(path.join('./temp', file));
            } catch (error) {
                console.error(`Failed to delete temp file ${file}:`, error);
            }
        });
    }
});

module.exports = router;
