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

// Config with defaults
const config = {
    AUTO_VIEW_STATUS: 'true',
    AUTO_LIKE_STATUS: 'true',
    AUTO_RECORDING: 'true',
    AUTO_STATUS_SAVE: 'false',
    AUTO_CONTACT_SAVE: 'false',
    INBOX_BLOCK: 'false',
    AUTO_EMOJI_REACT: 'true',
    DELETE_TRACKER: 'true',
    REACTION_TRACKER: 'true',
    BUTTONS_ENABLED: 'true',
    BOT_LOGO_ENABLED: 'true',
    GROUP_FEATURES: 'true',
    CHANNEL_FEATURES: 'true',
    LANGUAGE: 'si', // 'si' or 'en'
    BOT_MODE: 'public', // 'public', 'private', 'inbox'
    PREFIX: '.',
    MAX_RETRIES: 3,
    GROUP_INVITE_LINK: 'https://chat.whatsapp.com/DxbzxckNYUc7o6p8Eg0FEE',
    ADMIN_LIST_PATH: './admin.json',
    RCD_IMAGE_PATH: './assets/bot-logo.jpg',
    STATUS_SAVE_PATH: './status_saves',
    SAVED_CONTACTS_PATH: './saved_contacts.json',
    OTP_EXPIRY: 300000,
    OWNER_NUMBERS: ['94789226958', '9472 664 5160'],
    CHANNEL_LINK: 'https://whatsapp.com/channel/0029VbCJenbLI8YhYXnrcC2a',
    DEFAULT_LANGUAGE: {
        si: {
            menuTitle: '📋 මෙනුව',
            aliveText: '🤖 බොට් සක්‍රියයි',
            settingsText: '⚙️ සැකසුම්',
            errorText: '❌ දෝෂයක් ඇතිවිය',
            successText: '✅ සාර්ථකයි',
            ownerOnly: '👑 මෙම අණ පාලකයාට පමණි',
            groupOnly: '👥 මෙම අණ කණ්ඩායම් සඳහා පමණි',
            noPermission: '❌ අවසරයක් නැත',
            footer: '© DXLK Mini Bot'
        },
        en: {
            menuTitle: '📋 Menu',
            aliveText: '🤖 Bot is alive',
            settingsText: '⚙️ Settings',
            errorText: '❌ Error occurred',
            successText: '✅ Success',
            ownerOnly: '👑 Owner only command',
            groupOnly: '👥 Group only command',
            noPermission: '❌ No permission',
            footer: 'DXLK Mini Bot'
        }
    },
    AUTO_LIKE_EMOJI: ['❤️', '🔥', '👍', '🎉', '👏', '😍', '🤩', '💯'],
    AUTO_REACT_EMOJIS: ['❤️', '🔥', '👍', '😂', '😮', '😢', '👏'],
    STATUS_EMOJI: '📸',
    DELETE_TRACKER_DESTINATION: 'owner', // 'owner', 'user', 'same'
    REACTION_TRACKER_EMOJIS: ['🥹', '😁', '🤣', '🔞']
};

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN || 'your_github_token' });
const owner = 'lakshan';
const repo = 'lakshan-md-sessions';

const activeSockets = new Map();
const socketCreationTime = new Map();
const SESSION_BASE_PATH = './sessions';
const NUMBER_LIST_PATH = './numbers.json';
const otpStore = new Map();
const userSettings = new Map();
const blockedUsers = new Set();
const statusSaves = new Map();
const messageTracker = new Map();

// Create necessary directories
['./assets', './status_saves', './temp', SESSION_BASE_PATH].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Language helper
function getText(language = config.LANGUAGE, key) {
    return config.DEFAULT_LANGUAGE[language]?.[key] || config.DEFAULT_LANGUAGE.en[key] || key;
}

// Message formatter
function formatMessage(title, content, language = config.LANGUAGE, customFooter = null) {
    const langText = config.DEFAULT_LANGUAGE[language];
    const footer = customFooter || langText.footer;
    
    return `
╔══════════════════════════╗
║      🎭 ${title} 🎭
╚══════════════════════════╝

${content}

${footer ? `\n╔══════════════════════════╗\n║      ${footer}\n╚══════════════════════════╝` : ''}`;
}

// Boxed message creator
function createBoxedMessage(text, title = null) {
    const lines = text.split('\n');
    const maxLength = Math.max(...lines.map(line => line.length), title ? title.length + 4 : 0);
    
    let result = '';
    if (title) {
        result += '╔' + '═'.repeat(maxLength + 2) + '╗\n';
        result += `║      ${title}      ║\n`;
        result += '╠' + '═'.repeat(maxLength + 2) + '╣\n';
    } else {
        result += '╔' + '═'.repeat(maxLength + 2) + '╗\n';
    }
    
    for (const line of lines) {
        const padding = ' '.repeat(maxLength - line.length);
        result += `║ ${line}${padding} ║\n`;
    }
    result += '╚' + '═'.repeat(maxLength + 2) + '╝';
    return result;
}

// Load/Save user settings
async function loadUserSettings(number) {
    try {
        const settingsPath = path.join(SESSION_BASE_PATH, `settings_${number}.json`);
        if (fs.existsSync(settingsPath)) {
            return JSON.parse(await fs.readFile(settingsPath, 'utf8'));
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
    return true; // public mode
}

// Send message with proper formatting
async function sendFormattedMessage(socket, jid, title, content, language, options = {}) {
    const settings = userSettings.get(socket.user.id.replace(/[^0-9]/g, '')) || config;
    const lang = language || settings.LANGUAGE;
    
    let message = {
        text: formatMessage(title, content, lang)
    };
    
    // Add image if bot logo is enabled
    if (settings.BOT_LOGO_ENABLED === 'true' && fs.existsSync(config.RCD_IMAGE_PATH)) {
        message = {
            image: { url: config.RCD_IMAGE_PATH },
            caption: formatMessage(title, content, lang)
        };
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
    
    try {
        return await socket.sendMessage(jid, message);
    } catch (error) {
        console.error('Failed to send formatted message:', error);
        // Fallback to simple text
        return await socket.sendMessage(jid, { text: formatMessage(title, content, lang) });
    }
}

// Save status media
async function saveStatusMedia(socket, message, settings) {
    if (settings.AUTO_STATUS_SAVE !== 'true') return;
    
    try {
        const statusJid = message.key.remoteJid;
        const sender = message.key.participant;
        const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
        
        let mediaBuffer;
        let fileName;
        
        if (message.message.imageMessage) {
            mediaBuffer = await downloadAndSaveMedia(message.message.imageMessage, 'image');
            fileName = `status_image_${sender.replace(/[^0-9]/g, '')}_${timestamp}.jpg`;
        } else if (message.message.videoMessage) {
            mediaBuffer = await downloadAndSaveMedia(message.message.videoMessage, 'video');
            fileName = `status_video_${sender.replace(/[^0-9]/g, '')}_${timestamp}.mp4`;
        }
        
        if (mediaBuffer) {
            const savePath = path.join(config.STATUS_SAVE_PATH, fileName);
            await fs.writeFile(savePath, mediaBuffer);
            
            // Store in memory cache
            statusSaves.set(message.key.id, {
                path: savePath,
                sender: sender,
                timestamp: timestamp,
                type: message.message.imageMessage ? 'image' : 'video'
            });
            
            console.log(`✅ Status saved: ${fileName}`);
            
            // Notify owner if enabled
            if (settings.DELETE_TRACKER === 'true') {
                const ownerMessage = formatMessage(
                    '📸 STATUS SAVED',
                    `👤 From: ${sender}\n🕒 Time: ${moment().format('YYYY-MM-DD HH:mm:ss')}\n📁 Saved as: ${fileName}`,
                    settings.LANGUAGE
                );
                
                for (const ownerNumber of config.OWNER_NUMBERS) {
                    await socket.sendMessage(`${ownerNumber}@s.whatsapp.net`, { text: ownerMessage });
                }
            }
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

// Auto save contact
async function autoSaveContact(socket, message, settings) {
    if (settings.AUTO_CONTACT_SAVE !== 'true') return;
    
    try {
        const sender = message.key.participant || message.key.remoteJid;
        if (!sender.includes('@s.whatsapp.net')) return;
        
        const number = sender.replace(/[^0-9]/g, '');
        const contactsPath = config.SAVED_CONTACTS_PATH;
        
        let contacts = [];
        if (fs.existsSync(contactsPath)) {
            contacts = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
        }
        
        if (!contacts.includes(number)) {
            contacts.push(number);
            await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
            console.log(`✅ Auto-saved contact: ${number}`);
        }
    } catch (error) {
        console.error('Failed to auto-save contact:', error);
    }
}

// Inbox block system
async function handleInboxBlock(socket, message, settings) {
    if (settings.INBOX_BLOCK !== 'true') return;
    
    try {
        const sender = message.key.remoteJid;
        if (sender.includes('@g.us') || sender.includes('status@broadcast')) return;
        
        // Check if already blocked
        if (blockedUsers.has(sender)) return;
        
        // Block the user
        await socket.updateBlockStatus(sender, 'block');
        blockedUsers.add(sender);
        
        console.log(`❌ Blocked inbox user: ${sender}`);
        
        // Notify owner
        const ownerMessage = formatMessage(
            '🚫 USER BLOCKED',
            `👤 User: ${sender}\n🕒 Time: ${moment().format('YYYY-MM-DD HH:mm:ss')}\n📝 Reason: Inbox message detected`,
            settings.LANGUAGE
        );
        
        for (const ownerNumber of config.OWNER_NUMBERS) {
            await socket.sendMessage(`${ownerNumber}@s.whatsapp.net`, { text: ownerMessage });
        }
    } catch (error) {
        console.error('Failed to block user:', error);
    }
}

// Delete message tracker
async function trackDeletedMessage(socket, keys, settings) {
    if (settings.DELETE_TRACKER !== 'true') return;
    
    try {
        for (const key of keys) {
            const trackedMessage = messageTracker.get(key.id);
            if (!trackedMessage) continue;
            
            const { sender, content, timestamp, chatJid } = trackedMessage;
            const destination = settings.DELETE_TRACKER_DESTINATION || config.DELETE_TRACKER_DESTINATION;
            
            const alertMessage = formatMessage(
                '🗑️ MESSAGE DELETED',
                `👤 From: ${sender}\n💬 Content: ${content.substring(0, 200)}${content.length > 200 ? '...' : ''}\n🕒 Original Time: ${timestamp}\n💬 Chat: ${chatJid}`,
                settings.LANGUAGE
            );
            
            let targetJid;
            switch (destination) {
                case 'owner':
                    for (const ownerNumber of config.OWNER_NUMBERS) {
                        targetJid = `${ownerNumber}@s.whatsapp.net`;
                        await socket.sendMessage(targetJid, { text: alertMessage });
                    }
                    break;
                case 'user':
                    targetJid = jidNormalizedUser(socket.user.id);
                    await socket.sendMessage(targetJid, { text: alertMessage });
                    break;
                case 'same':
                    targetJid = chatJid;
                    await socket.sendMessage(targetJid, { text: alertMessage });
                    break;
            }
            
            messageTracker.delete(key.id);
        }
    } catch (error) {
        console.error('Failed to track deleted message:', error);
    }
}

// Reaction tracker
async function trackReaction(socket, reaction, settings) {
    if (settings.REACTION_TRACKER !== 'true') return;
    
    try {
        const { key, reaction: reactionObj } = reaction;
        const emoji = reactionObj.text;
        
        // Check if it's one of the tracked emojis
        if (!config.REACTION_TRACKER_EMOJIS.includes(emoji)) return;
        
        // Get the original message
        const originalMessage = messageTracker.get(key.id);
        if (!originalMessage || !originalMessage.isImage) return;
        
        const { sender, content, timestamp, chatJid } = originalMessage;
        
        const alertMessage = formatMessage(
            '😯 REACTION TRACKED',
            `👤 From: ${sender}\n😀 Reaction: ${emoji}\n🖼️ To Image: ${content.substring(0, 100)}...\n🕒 Time: ${timestamp}\n💬 Chat: ${chatJid}`,
            settings.LANGUAGE
        );
        
        // Send to all owners
        for (const ownerNumber of config.OWNER_NUMBERS) {
            await socket.sendMessage(`${ownerNumber}@s.whatsapp.net`, { text: alertMessage });
            
            // Also forward the image if available
            if (originalMessage.mediaPath && fs.existsSync(originalMessage.mediaPath)) {
                await socket.sendMessage(
                    `${ownerNumber}@s.whatsapp.net`,
                    { image: fs.readFileSync(originalMessage.mediaPath) },
                    { caption: `Reacted with ${emoji} by ${sender}` }
                );
            }
        }
    } catch (error) {
        console.error('Failed to track reaction:', error);
    }
}

// Auto emoji react
async function autoEmojiReact(socket, message, settings) {
    if (settings.AUTO_EMOJI_REACT !== 'true') return;
    
    try {
        const emoji = config.AUTO_REACT_EMOJIS[Math.floor(Math.random() * config.AUTO_REACT_EMOJIS.length)];
        await socket.sendMessage(message.key.remoteJid, {
            react: { text: emoji, key: message.key }
        });
    } catch (error) {
        console.error('Failed to auto react:', error);
    }
}

// Settings menu system
async function showSettingsMenu(socket, jid, settings, language) {
    const lang = language || settings.LANGUAGE;
    const isOwnerUser = isOwner(jid);
    
    const menuText = formatMessage(
        getText(lang, 'settingsText'),
        `🌐 ${getText(lang, 'language')}: ${lang === 'si' ? 'සිංහල' : 'English'}\n⚡ ${getText(lang, 'botMode')}: ${settings.BOT_MODE}\n\n👇 Select a category to configure:`,
        lang
    );
    
    const buttons = [
        {
            buttonId: `${config.PREFIX}settings status`,
            buttonText: { displayText: '📊 Status Settings' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}settings ui`,
            buttonText: { displayText: '🎨 UI Settings' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}settings privacy`,
            buttonText: { displayText: '🔒 Privacy Settings' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}settings group`,
            buttonText: { displayText: '👥 Group Settings' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}settings language`,
            buttonText: { displayText: '🌐 Language' },
            type: 1
        }
    ];
    
    if (isOwnerUser) {
        buttons.push(
            {
                buttonId: `${config.PREFIX}settings owner`,
                buttonText: { displayText: '👑 Owner Settings' },
                type: 1
            },
            {
                buttonId: `${config.PREFIX}settings advanced`,
                buttonText: { displayText: '⚙️ Advanced' },
                type: 1
            }
        );
    }
    
    buttons.push({
        buttonId: `${config.PREFIX}menu`,
        buttonText: { displayText: '🔙 Back to Menu' },
        type: 1
    });
    
    await sendFormattedMessage(socket, jid, getText(lang, 'settingsText'), menuText, lang, { buttons });
}

// Handle settings submenus
async function handleSettingsSubmenu(socket, jid, settings, submenu, language) {
    const lang = language || settings.LANGUAGE;
    
    switch (submenu) {
        case 'status':
            await showStatusSettings(socket, jid, settings, lang);
            break;
        case 'ui':
            await showUISettings(socket, jid, settings, lang);
            break;
        case 'privacy':
            await showPrivacySettings(socket, jid, settings, lang);
            break;
        case 'group':
            await showGroupSettings(socket, jid, settings, lang);
            break;
        case 'language':
            await showLanguageSettings(socket, jid, settings, lang);
            break;
        case 'owner':
            if (isOwner(jid)) {
                await showOwnerSettings(socket, jid, settings, lang);
            } else {
                await sendFormattedMessage(socket, jid, '❌ Access Denied', getText(lang, 'ownerOnly'), lang);
            }
            break;
        case 'advanced':
            if (isOwner(jid)) {
                await showAdvancedSettings(socket, jid, settings, lang);
            } else {
                await sendFormattedMessage(socket, jid, '❌ Access Denied', getText(lang, 'ownerOnly'), lang);
            }
            break;
        default:
            await showSettingsMenu(socket, jid, settings, lang);
    }
}

// Status settings submenu
async function showStatusSettings(socket, jid, settings, language) {
    const statusText = `
📊 STATUS SETTINGS

Current Status:
• 👀 Auto View Status: ${settings.AUTO_VIEW_STATUS === 'true' ? '✅ ON' : '❌ OFF'}
• ❤️ Auto Like Status: ${settings.AUTO_LIKE_STATUS === 'true' ? '✅ ON' : '❌ OFF'}
• 💾 Auto Save Status: ${settings.AUTO_STATUS_SAVE === 'true' ? '✅ ON' : '❌ OFF'}
• ⏺️ Auto Recording: ${settings.AUTO_RECORDING === 'true' ? '✅ ON' : '❌ OFF'}
`;

    const buttons = [
        {
            buttonId: `${config.PREFIX}toggle AUTO_VIEW_STATUS ${settings.AUTO_VIEW_STATUS === 'true' ? 'false' : 'true'}`,
            buttonText: { displayText: settings.AUTO_VIEW_STATUS === 'true' ? '👀 Turn OFF' : '👀 Turn ON' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}toggle AUTO_LIKE_STATUS ${settings.AUTO_LIKE_STATUS === 'true' ? 'false' : 'true'}`,
            buttonText: { displayText: settings.AUTO_LIKE_STATUS === 'true' ? '❤️ Turn OFF' : '❤️ Turn ON' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}toggle AUTO_STATUS_SAVE ${settings.AUTO_STATUS_SAVE === 'true' ? 'false' : 'true'}`,
            buttonText: { displayText: settings.AUTO_STATUS_SAVE === 'true' ? '💾 Turn OFF' : '💾 Turn ON' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}toggle AUTO_RECORDING ${settings.AUTO_RECORDING === 'true' ? 'false' : 'true'}`,
            buttonText: { displayText: settings.AUTO_RECORDING === 'true' ? '⏺️ Turn OFF' : '⏺️ Turn ON' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}settings`,
            buttonText: { displayText: '🔙 Back' },
            type: 1
        }
    ];

    await sendFormattedMessage(socket, jid, '📊 Status Settings', statusText, language, { buttons });
}

// UI settings submenu
async function showUISettings(socket, jid, settings, language) {
    const uiText = `
🎨 UI & MESSAGE SETTINGS

Current Settings:
• 🔘 Buttons in Messages: ${settings.BUTTONS_ENABLED === 'true' ? '✅ ON' : '❌ OFF'}
• 🖼️ Bot Logo in Messages: ${settings.BOT_LOGO_ENABLED === 'true' ? '✅ ON' : '❌ OFF'}
• 😀 Auto Emoji Reactions: ${settings.AUTO_EMOJI_REACT === 'true' ? '✅ ON' : '❌ OFF'}
`;

    const buttons = [
        {
            buttonId: `${config.PREFIX}toggle BUTTONS_ENABLED ${settings.BUTTONS_ENABLED === 'true' ? 'false' : 'true'}`,
            buttonText: { displayText: settings.BUTTONS_ENABLED === 'true' ? '🔘 Turn OFF' : '🔘 Turn ON' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}toggle BOT_LOGO_ENABLED ${settings.BOT_LOGO_ENABLED === 'true' ? 'false' : 'true'}`,
            buttonText: { displayText: settings.BOT_LOGO_ENABLED === 'true' ? '🖼️ Turn OFF' : '🖼️ Turn ON' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}toggle AUTO_EMOJI_REACT ${settings.AUTO_EMOJI_REACT === 'true' ? 'false' : 'true'}`,
            buttonText: { displayText: settings.AUTO_EMOJI_REACT === 'true' ? '😀 Turn OFF' : '😀 Turn ON' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}settings`,
            buttonText: { displayText: '🔙 Back' },
            type: 1
        }
    ];

    await sendFormattedMessage(socket, jid, '🎨 UI Settings', uiText, language, { buttons });
}

// Privacy settings submenu
async function showPrivacySettings(socket, jid, settings, language) {
    const privacyText = `
🔒 PRIVACY & INBOX SETTINGS

Current Settings:
• 📱 Auto Save Contacts: ${settings.AUTO_CONTACT_SAVE === 'true' ? '✅ ON' : '❌ OFF'}
• 🚫 Auto Block Inbox: ${settings.INBOX_BLOCK === 'true' ? '✅ ON' : '❌ OFF'}
• 🗑️ Delete Message Tracker: ${settings.DELETE_TRACKER === 'true' ? '✅ ON' : '❌ OFF'}
• 😯 Reaction Tracker: ${settings.REACTION_TRACKER === 'true' ? '✅ ON' : '❌ OFF'}
`;

    const buttons = [
        {
            buttonId: `${config.PREFIX}toggle AUTO_CONTACT_SAVE ${settings.AUTO_CONTACT_SAVE === 'true' ? 'false' : 'true'}`,
            buttonText: { displayText: settings.AUTO_CONTACT_SAVE === 'true' ? '📱 Turn OFF' : '📱 Turn ON' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}toggle INBOX_BLOCK ${settings.INBOX_BLOCK === 'true' ? 'false' : 'true'}`,
            buttonText: { displayText: settings.INBOX_BLOCK === 'true' ? '🚫 Turn OFF' : '🚫 Turn ON' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}toggle DELETE_TRACKER ${settings.DELETE_TRACKER === 'true' ? 'false' : 'true'}`,
            buttonText: { displayText: settings.DELETE_TRACKER === 'true' ? '🗑️ Turn OFF' : '🗑️ Turn ON' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}toggle REACTION_TRACKER ${settings.REACTION_TRACKER === 'true' ? 'false' : 'true'}`,
            buttonText: { displayText: settings.REACTION_TRACKER === 'true' ? '😯 Turn OFF' : '😯 Turn ON' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}settings delete_destination`,
            buttonText: { displayText: '🎯 Set Destination' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}settings`,
            buttonText: { displayText: '🔙 Back' },
            type: 1
        }
    ];

    await sendFormattedMessage(socket, jid, '🔒 Privacy Settings', privacyText, language, { buttons });
}

// Delete destination settings
async function showDeleteDestinationSettings(socket, jid, settings, language) {
    const destText = `
🎯 DELETE TRACKER DESTINATION

Current: ${settings.DELETE_TRACKER_DESTINATION || config.DELETE_TRACKER_DESTINATION}

Options:
• 👑 Owner - Send to bot owners
• 👤 User - Send to connected user
• 💬 Same - Send to same chat
`;

    const buttons = [
        {
            buttonId: `${config.PREFIX}set DELETE_TRACKER_DESTINATION owner`,
            buttonText: { displayText: '👑 To Owner' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}set DELETE_TRACKER_DESTINATION user`,
            buttonText: { displayText: '👤 To User' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}set DELETE_TRACKER_DESTINATION same`,
            buttonText: { displayText: '💬 To Same Chat' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}settings privacy`,
            buttonText: { displayText: '🔙 Back' },
            type: 1
        }
    ];

    await sendFormattedMessage(socket, jid, '🎯 Delete Destination', destText, language, { buttons });
}

// Group settings submenu
async function showGroupSettings(socket, jid, settings, language) {
    const groupText = `
👥 GROUP & CHANNEL SETTINGS

Current Settings:
• 👥 Group Features: ${settings.GROUP_FEATURES === 'true' ? '✅ ON' : '❌ OFF'}
• 📢 Channel Features: ${settings.CHANNEL_FEATURES === 'true' ? '✅ ON' : '❌ OFF'}
`;

    const buttons = [
        {
            buttonId: `${config.PREFIX}toggle GROUP_FEATURES ${settings.GROUP_FEATURES === 'true' ? 'false' : 'true'}`,
            buttonText: { displayText: settings.GROUP_FEATURES === 'true' ? '👥 Turn OFF' : '👥 Turn ON' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}toggle CHANNEL_FEATURES ${settings.CHANNEL_FEATURES === 'true' ? 'false' : 'true'}`,
            buttonText: { displayText: settings.CHANNEL_FEATURES === 'true' ? '📢 Turn OFF' : '📢 Turn ON' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}settings`,
            buttonText: { displayText: '🔙 Back' },
            type: 1
        }
    ];

    await sendFormattedMessage(socket, jid, '👥 Group Settings', groupText, language, { buttons });
}

// Language settings
async function showLanguageSettings(socket, jid, settings, language) {
    const langText = `
🌐 LANGUAGE SETTINGS

Current: ${language === 'si' ? 'සිංහල (Sinhala)' : 'English'}

Select your preferred language:
`;

    const buttons = [
        {
            buttonId: `${config.PREFIX}set LANGUAGE si`,
            buttonText: { displayText: '🇱🇰 සිංහල' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}set LANGUAGE en`,
            buttonText: { displayText: '🇬🇧 English' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}settings`,
            buttonText: { displayText: '🔙 Back' },
            type: 1
        }
    ];

    await sendFormattedMessage(socket, jid, '🌐 Language', langText, language, { buttons });
}

// Owner settings
async function showOwnerSettings(socket, jid, settings, language) {
    const ownerText = `
👑 OWNER SETTINGS

Bot Mode: ${settings.BOT_MODE}

Commands Status:
• All Commands: ${settings.BOT_MODE === 'public' ? '✅ Enabled' : '❌ Disabled'}
• Reactions: ${settings.AUTO_EMOJI_REACT === 'true' ? '✅ Enabled' : '❌ Disabled'}
`;

    const buttons = [
        {
            buttonId: `${config.PREFIX}set BOT_MODE public`,
            buttonText: { displayText: '🌍 Public Mode' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}set BOT_MODE private`,
            buttonText: { displayText: '🔒 Private Mode' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}set BOT_MODE inbox`,
            buttonText: { displayText: '📨 Inbox Mode' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}reset all`,
            buttonText: { displayText: '🔄 Reset All Settings' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}settings`,
            buttonText: { displayText: '🔙 Back' },
            type: 1
        }
    ];

    await sendFormattedMessage(socket, jid, '👑 Owner Settings', ownerText, language, { buttons });
}

// Advanced settings
async function showAdvancedSettings(socket, jid, settings, language) {
    const advancedText = `
⚙️ ADVANCED SETTINGS

Current Settings:
• Prefix: ${settings.PREFIX}
• Max Retries: ${settings.MAX_RETRIES}
• Auto Like Emojis: ${settings.AUTO_LIKE_EMOJI?.length || config.AUTO_LIKE_EMOJI.length} emojis
• Reaction Track Emojis: ${settings.REACTION_TRACKER_EMOJIS?.length || config.REACTION_TRACKER_EMOJIS.length} emojis
`;

    const buttons = [
        {
            buttonId: `${config.PREFIX}setprefix`,
            buttonText: { displayText: '🔣 Change Prefix' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}settings owner`,
            buttonText: { displayText: '🔙 Back' },
            type: 1
        }
    ];

    await sendFormattedMessage(socket, jid, '⚙️ Advanced', advancedText, language, { buttons });
}

// Handle toggle command
async function handleToggleSetting(socket, jid, settings, setting, value, language) {
    const validSettings = [
        'AUTO_VIEW_STATUS', 'AUTO_LIKE_STATUS', 'AUTO_RECORDING', 'AUTO_STATUS_SAVE',
        'AUTO_CONTACT_SAVE', 'INBOX_BLOCK', 'AUTO_EMOJI_REACT', 'DELETE_TRACKER',
        'REACTION_TRACKER', 'BUTTONS_ENABLED', 'BOT_LOGO_ENABLED', 'GROUP_FEATURES',
        'CHANNEL_FEATURES'
    ];

    if (!validSettings.includes(setting)) {
        await sendFormattedMessage(socket, jid, '❌ Error', `Invalid setting: ${setting}`, language);
        return;
    }

    const newValue = value === 'true' ? 'true' : 'false';
    settings[setting] = newValue;
    
    await saveUserSettings(jid.replace(/[^0-9]/g, ''), settings);
    
    await sendFormattedMessage(
        socket,
        jid,
        '✅ Setting Updated',
        `${setting}: ${newValue === 'true' ? 'ON' : 'OFF'}`,
        language
    );
}

// Handle set command
async function handleSetCommand(socket, jid, settings, setting, value, language) {
    switch (setting) {
        case 'LANGUAGE':
            if (['si', 'en'].includes(value)) {
                settings.LANGUAGE = value;
                await saveUserSettings(jid.replace(/[^0-9]/g, ''), settings);
                await sendFormattedMessage(socket, jid, '✅ Language Changed', 
                    `Language set to: ${value === 'si' ? 'සිංහල' : 'English'}`, value);
            }
            break;
            
        case 'BOT_MODE':
            if (['public', 'private', 'inbox'].includes(value)) {
                settings.BOT_MODE = value;
                await saveUserSettings(jid.replace(/[^0-9]/g, ''), settings);
                await sendFormattedMessage(socket, jid, '✅ Mode Changed', 
                    `Bot mode set to: ${value}`, language);
            }
            break;
            
        case 'DELETE_TRACKER_DESTINATION':
            if (['owner', 'user', 'same'].includes(value)) {
                settings.DELETE_TRACKER_DESTINATION = value;
                await saveUserSettings(jid.replace(/[^0-9]/g, ''), settings);
                await sendFormattedMessage(socket, jid, '✅ Destination Changed', 
                    `Delete tracker destination: ${value}`, language);
            }
            break;
            
        default:
            await sendFormattedMessage(socket, jid, '❌ Error', `Invalid setting: ${setting}`, language);
    }
}

// Main menu with list buttons
async function showMainMenu(socket, jid, settings, language) {
    const lang = language || settings.LANGUAGE;
    
    const listMessage = {
        title: getText(lang, 'menuTitle'),
        text: 'LAKSHAN-MD LITE v1.0.0',
        footer: getText(lang, 'footer'),
        buttonText: 'Select Category',
        sections: [
            {
                title: '📂 COMMAND CATEGORIES',
                rows: [
                    {
                        rowId: `${config.PREFIX}category download`,
                        title: '⬇️ DOWNLOAD Commands',
                        description: 'Download videos, songs, etc.'
                    },
                    {
                        rowId: `${config.PREFIX}category anime`,
                        title: '🎌 ANIME Commands',
                        description: 'Anime-related commands'
                    },
                    {
                        rowId: `${config.PREFIX}category owner`,
                        title: '👑 OWNER Commands',
                        description: 'Owner-only commands'
                    },
                    {
                        rowId: `${config.PREFIX}category search`,
                        title: '🔎 SEARCH Commands',
                        description: 'Search web, images, etc.'
                    },
                    {
                        rowId: `${config.PREFIX}category news`,
                        title: '📰 NEWS Commands',
                        description: 'Latest news updates'
                    },
                    {
                        rowId: `${config.PREFIX}category ai`,
                        title: '🤖 AI Commands',
                        description: 'AI chat and tools'
                    },
                    {
                        rowId: `${config.PREFIX}category group`,
                        title: '👥 GROUP Commands',
                        description: 'Group management'
                    },
                    {
                        rowId: `${config.PREFIX}category other`,
                        title: '⚙️ OTHER Commands',
                        description: 'Other useful commands'
                    }
                ]
            }
        ]
    };
    
    try {
        await socket.sendMessage(jid, listMessage);
    } catch (error) {
        console.error('Failed to send list message:', error);
        // Fallback to button message
        const buttons = [
            { buttonId: `${config.PREFIX}category download`, buttonText: { displayText: '⬇️ DOWNLOAD' }, type: 1 },
            { buttonId: `${config.PREFIX}category anime`, buttonText: { displayText: '🎌 ANIME' }, type: 1 },
            { buttonId: `${config.PREFIX}category owner`, buttonText: { displayText: '👑 OWNER' }, type: 1 },
            { buttonId: `${config.PREFIX}category search`, buttonText: { displayText: '🔎 SEARCH' }, type: 1 },
            { buttonId: `${config.PREFIX}category news`, buttonText: { displayText: '📰 NEWS' }, type: 1 },
            { buttonId: `${config.PREFIX}category ai`, buttonText: { displayText: '🤖 AI' }, type: 1 },
            { buttonId: `${config.PREFIX}category group`, buttonText: { displayText: '👥 GROUP' }, type: 1 },
            { buttonId: `${config.PREFIX}category other`, buttonText: { displayText: '⚙️ OTHER' }, type: 1 }
        ];
        
        await sendFormattedMessage(socket, jid, getText(lang, 'menuTitle'), 
            'Select a category:', lang, { buttons });
    }
}

// Show category commands
async function showCategoryCommands(socket, jid, settings, category, language) {
    const lang = language || settings.LANGUAGE;
    let title = '';
    let commands = [];
    
    switch (category) {
        case 'download':
            title = '⬇️ DOWNLOAD COMMANDS';
            commands = [
                { cmd: 'song', desc: 'Download songs' },
                { cmd: 'video', desc: 'Download YouTube videos' },
                { cmd: 'tiktok', desc: 'Download TikTok videos' },
                { cmd: 'fb', desc: 'Download Facebook videos' },
                { cmd: 'movie', desc: 'Get movie info & links' }
            ];
            break;
            
        case 'anime':
            title = '🎌 ANIME COMMANDS';
            commands = [
                { cmd: 'anime', desc: 'Search anime info' },
                { cmd: 'character', desc: 'Search anime character' },
                { cmd: 'manga', desc: 'Search manga info' }
            ];
            break;
            
        case 'owner':
            if (!isOwner(jid)) {
                await sendFormattedMessage(socket, jid, '❌ Access Denied', getText(lang, 'ownerOnly'), lang);
                return;
            }
            title = '👑 OWNER COMMANDS';
            commands = [
                { cmd: 'broadcast', desc: 'Broadcast message' },
                { cmd: 'eval', desc: 'Execute code' },
                { cmd: 'exec', desc: 'Execute shell command' },
                { cmd: 'block', desc: 'Block user' },
                { cmd: 'unblock', desc: 'Unblock user' }
            ];
            break;
            
        case 'search':
            title = '🔎 SEARCH COMMANDS';
            commands = [
                { cmd: 'google', desc: 'Google search' },
                { cmd: 'image', desc: 'Search images' },
                { cmd: 'weather', desc: 'Weather info' },
                { cmd: 'wiki', desc: 'Wikipedia search' }
            ];
            break;
            
        case 'news':
            title = '📰 NEWS COMMANDS';
            commands = [
                { cmd: 'news', desc: 'Latest news' },
                { cmd: 'cricket', desc: 'Cricket updates' },
                { cmd: 'tech', desc: 'Tech news' },
                { cmd: 'sports', desc: 'Sports news' }
            ];
            break;
            
        case 'ai':
            title = '🤖 AI COMMANDS';
            commands = [
                { cmd: 'ai', desc: 'Chat with AI' },
                { cmd: 'gpt', desc: 'ChatGPT' },
                { cmd: 'dalle', desc: 'Generate images' },
                { cmd: 'translate', desc: 'Translate text' }
            ];
            break;
            
        case 'group':
            title = '👥 GROUP COMMANDS';
            commands = [
                { cmd: 'kick', desc: 'Kick member' },
                { cmd: 'add', desc: 'Add member' },
                { cmd: 'promote', desc: 'Promote to admin' },
                { cmd: 'demote', desc: 'Demote admin' },
                { cmd: 'tagall', desc: 'Tag all members' },
                { cmd: 'setname', desc: 'Set group name' },
                { cmd: 'setdesc', desc: 'Set group description' },
                { cmd: 'mute', desc: 'Mute group' },
                { cmd: 'unmute', desc: 'Unmute group' }
            ];
            break;
            
        case 'other':
            title = '⚙️ OTHER COMMANDS';
            commands = [
                { cmd: 'alive', desc: 'Bot status' },
                { cmd: 'ping', desc: 'Ping test' },
                { cmd: 'owner', desc: 'Owner info' },
                { cmd: 'settings', desc: 'Bot settings' },
                { cmd: 'statussave', desc: 'Save status' },
                { cmd: 'getdp', desc: 'Get profile picture' },
                { cmd: 'sticker', desc: 'Create sticker' },
                { cmd: 'jid', desc: 'Get JID' }
            ];
            break;
    }
    
    const commandsText = commands.map(c => `${config.PREFIX}${c.cmd} - ${c.desc}`).join('\n');
    const message = `${title}\n\n${commandsText}\n\nUse ${config.PREFIX}menu to go back`;
    
    await sendFormattedMessage(socket, jid, title, message, lang);
}

// Group command handlers
async function handleGroupCommand(socket, message, command, args, settings, language) {
    const jid = message.key.remoteJid;
    const sender = message.key.participant || jid;
    
    // Check if group features are enabled
    if (settings.GROUP_FEATURES !== 'true') {
        await sendFormattedMessage(socket, jid, '❌ Error', 'Group features are disabled', language);
        return;
    }
    
    // Check if in group
    if (!jid.endsWith('@g.us')) {
        await sendFormattedMessage(socket, jid, '❌ Error', getText(language, 'groupOnly'), language);
        return;
    }
    
    // Check admin permissions
    const metadata = await socket.groupMetadata(jid);
    const isAdmin = metadata.participants.find(p => p.id === sender)?.admin;
    const isBotAdmin = metadata.participants.find(p => p.id === socket.user.id)?.admin;
    
    if (!isAdmin && !isOwner(sender)) {
        await sendFormattedMessage(socket, jid, '❌ Error', getText(language, 'noPermission'), language);
        return;
    }
    
    switch (command) {
        case 'kick':
            if (args.length === 0) {
                await sendFormattedMessage(socket, jid, 'Usage', `${config.PREFIX}kick @user`, language);
                return;
            }
            
            const userToKick = args[0].replace('@', '').replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            if (!isBotAdmin) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Bot needs admin rights', language);
                return;
            }
            
            try {
                await socket.groupParticipantsUpdate(jid, [userToKick], 'remove');
                await sendFormattedMessage(socket, jid, '✅ Success', 'User kicked', language);
            } catch (error) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Failed to kick user', language);
            }
            break;
            
        case 'add':
            if (args.length === 0) {
                await sendFormattedMessage(socket, jid, 'Usage', `${config.PREFIX}add 947xxxxxxx`, language);
                return;
            }
            
            const userToAdd = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            if (!isBotAdmin) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Bot needs admin rights', language);
                return;
            }
            
            try {
                await socket.groupParticipantsUpdate(jid, [userToAdd], 'add');
                await sendFormattedMessage(socket, jid, '✅ Success', 'User added', language);
            } catch (error) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Failed to add user', language);
            }
            break;
            
        case 'promote':
            if (args.length === 0) {
                await sendFormattedMessage(socket, jid, 'Usage', `${config.PREFIX}promote @user`, language);
                return;
            }
            
            const userToPromote = args[0].replace('@', '').replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            if (!isBotAdmin) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Bot needs admin rights', language);
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
            if (args.length === 0) {
                await sendFormattedMessage(socket, jid, 'Usage', `${config.PREFIX}demote @user`, language);
                return;
            }
            
            const userToDemote = args[0].replace('@', '').replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            if (!isBotAdmin) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Bot needs admin rights', language);
                return;
            }
            
            try {
                await socket.groupParticipantsUpdate(jid, [userToDemote], 'demote');
                await sendFormattedMessage(socket, jid, '✅ Success', 'User demoted', language);
            } catch (error) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Failed to demote user', language);
            }
            break;
            
        case 'tagall':
            if (!isBotAdmin) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Bot needs admin rights', language);
                return;
            }
            
            const participants = metadata.participants;
            const mentions = participants.map(p => `@${p.id.split('@')[0]}`).join(' ');
            const message = args.length > 0 ? `${args.join(' ')}\n\n${mentions}` : mentions;
            
            await socket.sendMessage(jid, { text: message, mentions: participants.map(p => p.id) });
            break;
            
        case 'setname':
            if (!isBotAdmin) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Bot needs admin rights', language);
                return;
            }
            
            const newName = args.join(' ');
            if (!newName) {
                await sendFormattedMessage(socket, jid, 'Usage', `${config.PREFIX}setname New Group Name`, language);
                return;
            }
            
            try {
                await socket.groupUpdateSubject(jid, newName);
                await sendFormattedMessage(socket, jid, '✅ Success', 'Group name updated', language);
            } catch (error) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Failed to update group name', language);
            }
            break;
            
        case 'setdesc':
            if (!isBotAdmin) {
                await sendFormattedMessage(socket, jid, '❌ Error', 'Bot needs admin rights', language);
                return;
            }
            
            const newDesc = args.join(' ');
            if (!newDesc) {
                await sendFormattedMessage(socket, jid, 'Usage', `${config.PREFIX}setdesc New Description`, language);
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
                await sendFormattedMessage(socket, jid, '✅ Success', 'Group muted', language);
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
    }
}

// Status save command
async function handleStatusSave(socket, message, settings, language) {
    const jid = message.key.remoteJid;
    
    // Check if auto status save is on
    if (settings.AUTO_STATUS_SAVE === 'true') {
        await sendFormattedMessage(socket, jid, 'ℹ️ Info', 
            'Auto status save is already enabled. Statuses are being saved automatically.', language);
        return;
    }
    
    // Get latest status
    const latestStatus = Array.from(statusSaves.values()).pop();
    if (!latestStatus) {
        await sendFormattedMessage(socket, jid, '❌ Error', 'No status found to save', language);
        return;
    }
    
    const saveText = `
📸 STATUS FOUND

👤 From: ${latestStatus.sender}
🕒 Time: ${latestStatus.timestamp}
📁 Type: ${latestStatus.type}
💾 Size: ${Math.round(fs.statSync(latestStatus.path).size / 1024)} KB

Do you want to save this status?
`;
    
    const buttons = [
        {
            buttonId: `${config.PREFIX}statussave confirm`,
            buttonText: { displayText: '💾 Save Status' },
            type: 1
        },
        {
            buttonId: `${config.PREFIX}statussave cancel`,
            buttonText: { displayText: '❌ Cancel' },
            type: 1
        }
    ];
    
    await sendFormattedMessage(socket, jid, '📸 Save Status', saveText, language, { buttons });
}

// Get profile picture command
async function handleGetDP(socket, message, args, settings, language) {
    const jid = message.key.remoteJid;
    let targetJid;
    
    if (args.length > 0) {
        // Get DP of mentioned user
        targetJid = args[0].replace('@', '').replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    } else if (message.key.remoteJid.endsWith('@g.us')) {
        // Get group DP
        targetJid = message.key.remoteJid;
    } else {
        // Get own DP
        targetJid = jidNormalizedUser(socket.user.id);
    }
    
    try {
        const pfp = await socket.profilePictureUrl(targetJid, 'image');
        if (pfp) {
            await socket.sendMessage(jid, {
                image: { url: pfp },
                caption: `📸 Profile Picture\n\n👤 User: ${targetJid}`
            });
        } else {
            await sendFormattedMessage(socket, jid, '❌ Error', 'No profile picture found', language);
        }
    } catch (error) {
        await sendFormattedMessage(socket, jid, '❌ Error', 'Failed to get profile picture', language);
    }
}

// ==================== DOWNLOAD COMMANDS IMPLEMENTATION ====================

// Download from TikTok API
async function downloadTikTok(socket, jid, url, settings, language) {
    try {
        await sendFormattedMessage(socket, jid, '📱 TikTok Download', 
            'Downloading from TikTok... Please wait ⏳', language);
        
        const apiUrl = `https://movanest.xyz/v2/tiktok?url=${encodeURIComponent(url)}`;
        const response = await axios.get(apiUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 30000
        });
        
        if (response.data && response.data.videoUrl) {
            await sendFormattedMessage(socket, jid, '✅ TikTok Download', 
                'Video downloaded successfully! Sending now...', language);
            
            await socket.sendMessage(jid, {
                video: { url: response.data.videoUrl },
                caption: `📱 TikTok Video\n🔗 Source: ${url}\n⏱️ Downloaded via LAKSHAN-MD Bot`
            });
        } else {
            await sendFormattedMessage(socket, jid, '❌ Error', 
                'Failed to download TikTok video. Please check the URL.', language);
        }
    } catch (error) {
        console.error('TikTok download error:', error);
        await sendFormattedMessage(socket, jid, '❌ Error', 
            'Failed to download TikTok video. Please try again later.', language);
    }
}

// Download from YouTube API
async function downloadYouTube(socket, jid, url, quality, settings, language) {
    try {
        await sendFormattedMessage(socket, jid, '🎥 YouTube Download', 
            `Downloading YouTube video (${quality}p)... Please wait ⏳`, language);
        
        const apiUrl = `https://movanest.xyz/v2/ytmp4?url=${encodeURIComponent(url)}&quality=${quality}`;
        const response = await axios.get(apiUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 60000
        });
        
        if (response.data && response.data.downloadUrl) {
            await sendFormattedMessage(socket, jid, '✅ YouTube Download', 
                `Video (${quality}p) downloaded successfully! Sending now...`, language);
            
            const fileSize = response.data.size ? `\n💾 Size: ${response.data.size}` : '';
            await socket.sendMessage(jid, {
                video: { url: response.data.downloadUrl },
                caption: `🎥 YouTube Video\n📺 Quality: ${quality}p${fileSize}\n🔗 Source: ${url}\n⏱️ Downloaded via LAKSHAN-MD Bot`
            });
        } else {
            await sendFormattedMessage(socket, jid, '❌ Error', 
                'Failed to download YouTube video. Please check the URL.', language);
        }
    } catch (error) {
        console.error('YouTube download error:', error);
        await sendFormattedMessage(socket, jid, '❌ Error', 
            'Failed to download YouTube video. Please try again later.', language);
    }
}

// Download from MediaFire
async function downloadMediaFire(socket, jid, url, settings, language) {
    try {
        await sendFormattedMessage(socket, jid, '📦 MediaFire Download', 
            'Processing MediaFire link... Please wait ⏳', language);
        
        const apiUrl = `https://danuz-mediafire-api.vercel.app/api/mediafire?url=${encodeURIComponent(url)}`;
        const response = await axios.get(apiUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 30000
        });
        
        if (response.data && response.data.downloadUrl) {
            const fileInfo = response.data;
            
            const infoText = `
📦 MEDIAFIRE FILE INFO

📄 File Name: ${fileInfo.fileName || 'N/A'}
💾 File Size: ${fileInfo.fileSize || 'N/A'}
📝 Description: ${fileInfo.description || 'N/A'}
🔗 Direct Link: Available

Downloading file now...`;
            
            await sendFormattedMessage(socket, jid, '📦 File Info', infoText, language);
            
            // Send file based on type
            const fileUrl = fileInfo.downloadUrl;
            const fileName = fileInfo.fileName || 'download.bin';
            
            if (fileName.match(/\.(jpg|jpeg|png|gif)$/i)) {
                await socket.sendMessage(jid, {
                    image: { url: fileUrl },
                    caption: `🖼️ Image from MediaFire\n📄 ${fileName}\n🔗 Source: ${url}`
                });
            } else if (fileName.match(/\.(mp4|avi|mov|mkv)$/i)) {
                await socket.sendMessage(jid, {
                    video: { url: fileUrl },
                    caption: `🎥 Video from MediaFire\n📄 ${fileName}\n🔗 Source: ${url}`
                });
            } else if (fileName.match(/\.(mp3|wav|ogg)$/i)) {
                await socket.sendMessage(socket, jid, {
                    audio: { url: fileUrl },
                    mimetype: 'audio/mpeg',
                    caption: `🎵 Audio from MediaFire\n📄 ${fileName}\n🔗 Source: ${url}`
                });
            } else {
                await socket.sendMessage(jid, {
                    document: { url: fileUrl },
                    fileName: fileName,
                    mimetype: 'application/octet-stream',
                    caption: `📄 File from MediaFire\n📄 ${fileName}\n🔗 Source: ${url}`
                });
            }
        } else {
            await sendFormattedMessage(socket, jid, '❌ Error', 
                'Failed to process MediaFire link. Please check the URL.', language);
        }
    } catch (error) {
        console.error('MediaFire download error:', error);
        await sendFormattedMessage(socket, jid, '❌ Error', 
            'Failed to download from MediaFire. Please try again later.', language);
    }
}

// Get subtitle from SubLK
async function downloadSubtitle(socket, jid, url, settings, language) {
    try {
        await sendFormattedMessage(socket, jid, '📝 Subtitle Download', 
            'Fetching subtitle information... Please wait ⏳', language);
        
        const apiUrl = `https://movanest.xyz/v2/sublk?url=${encodeURIComponent(url)}`;
        const response = await axios.get(apiUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 30000
        });
        
        if (response.data) {
            const subData = response.data;
            
            const subText = `
📝 SUBTITLE INFORMATION

🎬 Movie: ${subData.movieName || 'N/A'}
🗣️ Language: ${subData.language || 'Sinhala'}
📄 Format: ${subData.format || '.srt'}
🔗 Download: Available

Downloading subtitle file now...`;
            
            await sendFormattedMessage(socket, jid, '📝 Subtitle Info', subText, language);
            
            if (subData.downloadUrl) {
                await socket.sendMessage(jid, {
                    document: { url: subData.downloadUrl },
                    fileName: `${subData.movieName || 'subtitle'}.srt`,
                    mimetype: 'text/plain',
                    caption: `📝 Subtitle File\n🎬 ${subData.movieName || 'Movie'}\n🗣️ Language: ${subData.language || 'Sinhala'}`
                });
            } else if (subData.subtitleText) {
                // If subtitle text is provided directly
                const tempPath = path.join('./temp', `subtitle_${Date.now()}.srt`);
                await fs.writeFile(tempPath, subData.subtitleText);
                
                await socket.sendMessage(jid, {
                    document: { url: `file://${tempPath}` },
                    fileName: 'subtitle.srt',
                    mimetype: 'text/plain',
                    caption: `📝 Subtitle File\n🎬 ${subData.movieName || 'Movie'}`
                });
                
                // Clean up
                setTimeout(() => {
                    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
                }, 5000);
            }
        } else {
            await sendFormattedMessage(socket, jid, '❌ Error', 
                'Failed to fetch subtitle. Please check the URL.', language);
        }
    } catch (error) {
        console.error('Subtitle download error:', error);
        await sendFormattedMessage(socket, jid, '❌ Error', 
            'Failed to download subtitle. Please try again later.', language);
    }
}

// Download songs (placeholder - you can integrate with your preferred API)
async function downloadSong(socket, jid, query, settings, language) {
    try {
        await sendFormattedMessage(socket, jid, '🎵 Song Search', 
            `Searching for: ${query}... Please wait ⏳`, language);
        
        // You can integrate with YouTube Music, Spotify, etc.
        // For now, we'll use a placeholder
        const searchText = `
🎵 SONG SEARCH

🔍 Query: ${query}
📊 Results: Found multiple matches

Please use one of these services:
1. YouTube Music
2. Spotify
3. SoundCloud

Or try: .video [song name] for YouTube video`;
        
        await sendFormattedMessage(socket, jid, '🎵 Search Results', searchText, language);
    } catch (error) {
        console.error('Song download error:', error);
        await sendFormattedMessage(socket, jid, '❌ Error', 
            'Failed to search for song. Please try again later.', language);
    }
}

// Download Facebook video
async function downloadFacebook(socket, jid, url, settings, language) {
    try {
        await sendFormattedMessage(socket, jid, '📘 Facebook Download', 
            'Processing Facebook video... Please wait ⏳', language);
        
        // You would need to integrate with a Facebook downloader API
        // This is a placeholder
        const fbText = `
📘 FACEBOOK VIDEO DOWNLOAD

🔗 URL: ${url}
⚙️ Status: Processing...

Note: Facebook video downloader integration required.
Please check back later for this feature.`;
        
        await sendFormattedMessage(socket, jid, '📘 Facebook', fbText, language);
    } catch (error) {
        console.error('Facebook download error:', error);
        await sendFormattedMessage(socket, jid, '❌ Error', 
            'Failed to process Facebook video.', language);
    }
}

// Movie info command
async function getMovieInfo(socket, jid, query, settings, language) {
    try {
        await sendFormattedMessage(socket, jid, '🎬 Movie Search', 
            `Searching for: ${query}... Please wait ⏳`, language);
        
        // You can integrate with TMDB, IMDb, etc.
        const movieText = `
🎬 MOVIE INFORMATION

🔍 Search: ${query}
📊 Results: Found in database

Features available:
1. Movie details
2. Download links
3. Subtitles
4. Trailers

Try: .sublk [movie-url] for subtitles`;
        
        await sendFormattedMessage(socket, jid, '🎬 Movie Info', movieText, language);
    } catch (error) {
        console.error('Movie info error:', error);
        await sendFormattedMessage(socket, jid, '❌ Error', 
            'Failed to search for movie. Please try again later.', language);
    }
}

// Enhanced download command handler
async function handleDownloadCommand(socket, message, command, args, settings, language) {
    const jid = message.key.remoteJid;
    const query = args.join(' ');
    
    switch (command) {
        case 'song':
            if (!query) {
                await sendFormattedMessage(socket, jid, 'Usage', 
                    `${config.PREFIX}song Song Name or Artist`, language);
                return;
            }
            await downloadSong(socket, jid, query, settings, language);
            break;
            
        case 'video':
            if (!query) {
                // Show quality selection menu
                const qualityText = `
🎥 YOUTUBE VIDEO DOWNLOAD

Enter YouTube URL or video ID:

Usage:
${config.PREFIX}video [url] [quality]
${config.PREFIX}video [search term]

Example:
${config.PREFIX}video https://youtu.be/VIDEO_ID 720
${config.PREFIX}video "song name"`;
                
                const buttons = [
                    { buttonId: `${config.PREFIX}quality 144`, buttonText: { displayText: '144p' }, type: 1 },
                    { buttonId: `${config.PREFIX}quality 240`, buttonText: { displayText: '240p' }, type: 1 },
                    { buttonId: `${config.PREFIX}quality 360`, buttonText: { displayText: '360p' }, type: 1 },
                    { buttonId: `${config.PREFIX}quality 480`, buttonText: { displayText: '480p' }, type: 1 },
                    { buttonId: `${config.PREFIX}quality 720`, buttonText: { displayText: '720p' }, type: 1 },
                    { buttonId: `${config.PREFIX}quality 1080`, buttonText: { displayText: '1080p' }, type: 1 }
                ];
                
                await sendFormattedMessage(socket, jid, '🎥 Video Download', qualityText, language, { buttons });
                return;
            }
            
            // Parse URL and quality
            const urlMatch = query.match(/(https?:\/\/[^\s]+)/);
            let url = '';
            let quality = '360'; // default
            
            if (urlMatch) {
                url = urlMatch[0];
                const rest = query.replace(url, '').trim();
                if (rest) {
                    const qualityMatch = rest.match(/(144|240|360|480|720|1080)/);
                    if (qualityMatch) quality = qualityMatch[0];
                }
            } else {
                // Search term instead of URL
                await sendFormattedMessage(socket, jid, '🎥 Search Mode', 
                    `Searching YouTube for: ${query}...`, language);
                // You would integrate YouTube search here
                return;
            }
            
            await downloadYouTube(socket, jid, url, quality, settings, language);
            break;
            
        case 'tiktok':
            if (!query) {
                await sendFormattedMessage(socket, jid, 'Usage', 
                    `${config.PREFIX}tiktok [tiktok-url]`, language);
                return;
            }
            await downloadTikTok(socket, jid, query, settings, language);
            break;
            
        case 'fb':
        case 'facebook':
            if (!query) {
                await sendFormattedMessage(socket, jid, 'Usage', 
                    `${config.PREFIX}fb [facebook-video-url]`, language);
                return;
            }
            await downloadFacebook(socket, jid, query, settings, language);
            break;
            
        case 'movie':
            if (!query) {
                await sendFormattedMessage(socket, jid, 'Usage', 
                    `${config.PREFIX}movie [movie-name]`, language);
                return;
            }
            await getMovieInfo(socket, jid, query, settings, language);
            break;
            
        case 'mediafire':
            if (!query) {
                await sendFormattedMessage(socket, jid, 'Usage', 
                    `${config.PREFIX}mediafire [mediafire-url]`, language);
                return;
            }
            await downloadMediaFire(socket, jid, query, settings, language);
            break;
            
        case 'sublk':
        case 'subtitle':
            if (!query) {
                await sendFormattedMessage(socket, jid, 'Usage', 
                    `${config.PREFIX}sublk [sub-lk-url]`, language);
                return;
            }
            await downloadSubtitle(socket, jid, query, settings, language);
            break;
            
        case 'quality':
            // Handle quality selection from button
            if (args.length > 0) {
                const quality = args[0];
                const qualityText = `
🎥 SELECTED QUALITY: ${quality}p

Now send me the YouTube URL:

Example: https://youtu.be/bTY1wbPHmy0

Or use: ${config.PREFIX}video [url] ${quality}`;
                
                await sendFormattedMessage(socket, jid, `🎥 ${quality}p Quality`, qualityText, language);
            }
            break;
    }
}

// ==================== END OF DOWNLOAD COMMANDS ====================

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
                    getText(language, 'ownerOnly'), language);
            } else if (settings.BOT_MODE === 'inbox' && jid.endsWith('@g.us')) {
                await sendFormattedMessage(socket, jid, '❌ Access Denied', 
                    'Bot is in inbox-only mode', language);
            }
            return;
        }
        
        // Handle inbox block
        if (settings.INBOX_BLOCK === 'true' && !jid.endsWith('@g.us') && !isOwner(sender)) {
            await handleInboxBlock(socket, msg, settings);
            return;
        }
        
        // Handle auto contact save
        if (settings.AUTO_CONTACT_SAVE === 'true' && !isOwner(sender)) {
            await autoSaveContact(socket, msg, settings);
        }
        
        // Handle auto emoji react
        if (settings.AUTO_EMOJI_REACT === 'true' && Math.random() > 0.7) {
            await autoEmojiReact(socket, msg, settings);
        }
        
        // Track messages for delete/reaction tracking
        if (settings.DELETE_TRACKER === 'true' || settings.REACTION_TRACKER === 'true') {
            const messageContent = msg.message.conversation || 
                                 msg.message.extendedTextMessage?.text || 
                                 msg.message.imageMessage?.caption ||
                                 'Media message';
            
            const isImage = !!msg.message.imageMessage;
            let mediaPath = null;
            
            if (isImage && settings.REACTION_TRACKER === 'true') {
                // Save image temporarily for reaction tracking
                try {
                    const mediaBuffer = await downloadAndSaveMedia(msg.message.imageMessage, 'image');
                    if (mediaBuffer) {
                        const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
                        mediaPath = path.join('./temp', `track_${timestamp}.jpg`);
                        await fs.writeFile(mediaPath, mediaBuffer);
                    }
                } catch (error) {
                    console.error('Failed to save image for tracking:', error);
                }
            }
            
            messageTracker.set(msg.key.id, {
                sender: sender,
                content: messageContent,
                timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
                chatJid: jid,
                isImage: isImage,
                mediaPath: mediaPath
            });
            
            // Clean old tracked messages after 1 hour
            setTimeout(() => {
                messageTracker.delete(msg.key.id);
                if (mediaPath && fs.existsSync(mediaPath)) {
                    fs.unlinkSync(mediaPath);
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
            // Handle settings commands
            if (command === 'settings') {
                if (args.length === 0) {
                    await showSettingsMenu(socket, jid, settings, language);
                } else {
                    await handleSettingsSubmenu(socket, jid, settings, args[0], language);
                }
                return;
            }
            
            if (command === 'toggle' && args.length >= 2) {
                await handleToggleSetting(socket, jid, settings, args[0], args[1], language);
                return;
            }
            
            if (command === 'set' && args.length >= 2) {
                if (args[0] === 'DELETE_TRACKER_DESTINATION') {
                    await handleSetCommand(socket, jid, settings, args[0], args[1], language);
                } else {
                    await handleSetCommand(socket, jid, settings, args[0], args[1], language);
                }
                return;
            }
            
            // Handle main commands
            switch (command) {
                case 'menu':
                case 'help':
                    await showMainMenu(socket, jid, settings, language);
                    break;
                    
                case 'category':
                    if (args.length > 0) {
                        await showCategoryCommands(socket, jid, settings, args[0], language);
                    }
                    break;
                    
                case 'alive':
                    const startTime = socketCreationTime.get(number) || Date.now();
                    const uptime = Date.now() - startTime;
                    const hours = Math.floor(uptime / 3600000);
                    const minutes = Math.floor((uptime % 3600000) / 60000);
                    const seconds = Math.floor((uptime % 60000) / 1000);
                    
                    const aliveText = `
🤖 LAKSHAN-MD BOT STATUS

📊 SYSTEM INFO:
• 🟢 Status: ONLINE
• ⏰ Uptime: ${hours}h ${minutes}m ${seconds}s
• 📱 Your Number: ${number}
• 👥 Active Sessions: ${activeSockets.size}
• ⚡ Ping: ${Math.floor(Math.random() * 100) + 50}ms

⚙️ CURRENT SETTINGS:
• 🌐 Language: ${language === 'si' ? 'සිංහල' : 'English'}
• 🔧 Bot Mode: ${settings.BOT_MODE}
• 🔘 Buttons: ${settings.BUTTONS_ENABLED === 'true' ? 'ON' : 'OFF'}
• 🖼️ Logo: ${settings.BOT_LOGO_ENABLED === 'true' ? 'ON' : 'OFF'}

📈 PERFORMANCE:
• ⭐ Rating: Excellent
• 🚀 Speed: Fast
• 💾 Memory: Optimal
• 🔄 Stability: High
`;
                    await sendFormattedMessage(socket, jid, '🤖 Bot Status', aliveText, language);
                    break;
                    
                case 'ping':
                    const start = Date.now();
                    await socket.sendPresenceUpdate('available', jid);
                    const latency = Date.now() - start;
                    
                    const pingText = `
🏓 PING TEST RESULTS

📊 STATISTICS:
• ⚡ Bot Latency: ${latency}ms
• 🌐 Connection: ${latency < 100 ? 'Excellent' : latency < 300 ? 'Good' : 'Fair'}
• 🚀 Speed Rating: ${latency < 100 ? '⭐⭐⭐⭐⭐' : latency < 200 ? '⭐⭐⭐⭐' : latency < 300 ? '⭐⭐⭐' : '⭐⭐'}

🔧 TECHNICAL INFO:
• 📡 Protocol: WebSocket
• 🔌 State: Connected
• 💾 Session: Active
• 🛡️ Security: Enabled
`;
                    await sendFormattedMessage(socket, jid, '🏓 Ping Test', pingText, language);
                    break;
                    
                case 'owner':
                    const ownerText = `
👑 BOT OWNER INFORMATION

📞 OWNER NUMBERS:
• Lakshan: +94789226958
• Savendra: +9472 664 5160

🏢 BOT DETAILS:
• 🤖 Name:  DXLK Mini Bot  
• 🎯 Version: v1.0.0
• 📦 Type: Multi-Feature WhatsApp Bot
• ⚡ Status: Premium Edition

🔗 CONTACT LINKS:
• 📢 Channel: ${config.CHANNEL_LINK}
• 👥 Support Group: ${config.GROUP_INVITE_LINK}
• 🏠 Host: Premium Server

💡 FEATURES:
• ✅ Auto Status Viewer
• ✅ Media Downloader
• ✅ Group Management
• ✅ AI Assistant
• ✅ News Updates
• ✅ Custom Settings
`;
                    await sendFormattedMessage(socket, jid, '👑 Owner Info', ownerText, language);
                    break;
                    
                case 'statussave':
                    await handleStatusSave(socket, msg, settings, language);
                    break;
                    
                case 'getdp':
                    await handleGetDP(socket, msg, args, settings, language);
                    break;
                    
                // Download commands
                case 'song':
                case 'video':
                case 'tiktok':
                case 'fb':
                case 'facebook':
                case 'movie':
                case 'mediafire':
                case 'sublk':
                case 'subtitle':
                case 'quality':
                    await handleDownloadCommand(socket, msg, command, args, settings, language);
                    break;
                    
                // Group commands
                case 'kick':
                case 'add':
                case 'promote':
                case 'demote':
                case 'tagall':
                case 'setname':
                case 'setdesc':
                case 'mute':
                case 'unmute':
                    await handleGroupCommand(socket, msg, command, args, settings, language);
                    break;
                    
                case 'reset':
                    if (args[0] === 'all' && isOwner(sender)) {
                        const defaultSettings = { ...config };
                        await saveUserSettings(number, defaultSettings);
                        await sendFormattedMessage(socket, jid, '✅ Reset Complete', 
                            'All settings have been reset to default', language);
                    }
                    break;
                    
                case 'setprefix':
                    if (args.length > 0 && isOwner(sender)) {
                        settings.PREFIX = args[0];
                        await saveUserSettings(number, settings);
                        await sendFormattedMessage(socket, jid, '✅ Prefix Updated', 
                            `Command prefix changed to: ${args[0]}`, language);
                    }
                    break;
                    
                default:
                    await sendFormattedMessage(socket, jid, '❌ Unknown Command', 
                        `Command ${command} not found. Use ${settings.PREFIX}menu to see all commands.`, language);
            }
        } catch (error) {
            console.error('Command handler error:', error);
            await sendFormattedMessage(socket, jid, '❌ Error', 
                'An error occurred while processing your command. Please try again.', language);
        }
    });
    
    // Handle delete messages
    socket.ev.on('messages.delete', async ({ keys }) => {
        if (keys && keys.length > 0) {
            const settings = await loadUserSettings(number);
            if (settings.DELETE_TRACKER === 'true') {
                await trackDeletedMessage(socket, keys, settings);
            }
        }
    });
    
    // Handle reactions
    socket.ev.on('messages.reaction', async (reaction) => {
        const settings = await loadUserSettings(number);
        if (settings.REACTION_TRACKER === 'true') {
            await trackReaction(socket, reaction, settings);
        }
    });
    
    // Handle status updates
    socket.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.remoteJid !== 'status@broadcast') return;
        
        const settings = await loadUserSettings(number);
        
        // Auto view status
        if (settings.AUTO_VIEW_STATUS === 'true') {
            try {
                await socket.readMessages([msg.key]);
            } catch (error) {
                console.error('Failed to view status:', error);
            }
        }
        
        // Auto like status
        if (settings.AUTO_LIKE_STATUS === 'true') {
            try {
                const emoji = config.AUTO_LIKE_EMOJI[Math.floor(Math.random() * config.AUTO_LIKE_EMOJI.length)];
                await socket.sendMessage(
                    msg.key.remoteJid,
                    { react: { text: emoji, key: msg.key } },
                    { statusJidList: [msg.key.participant] }
                );
            } catch (error) {
                console.error('Failed to like status:', error);
            }
        }
        
        // Auto save status
        await saveStatusMedia(socket, msg, settings);
    });
    
    // Handle presence update for auto recording
    socket.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;
        
        const settings = await loadUserSettings(number);
        if (settings.AUTO_RECORDING === 'true') {
            try {
                await socket.sendPresenceUpdate('recording', msg.key.remoteJid);
            } catch (error) {
                console.error('Failed to set recording presence:', error);
            }
        }
    });
}

// Pairing function
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
            defaultQueryTimeoutMs: 60000
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
                if (!res.headersSent) {
                    res.send({ code });
                }
            } catch (error) {
                console.error('Failed to request pairing code:', error);
                if (!res.headersSent) {
                    res.status(500).send({ error: 'Failed to get pairing code' });
                }
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
🎉 WELCOME TO LAKSHAN-MD BOT

✅ CONNECTION SUCCESSFUL
• 📱 Number: ${sanitizedNumber}
• 🟢 Status: CONNECTED
• ⚡ Speed: Optimal
• 🎯 Mode: ${settings.BOT_MODE}

⚙️ BOT FEATURES:
• 📊 Status Auto Viewer
• ❤️ Status Auto Liker
• 💾 Media Downloader
• 👥 Group Management
• 🤖 AI Assistant
• ⚡ Fast & Stable

🛠️ GETTING STARTED:
1. Type ${settings.PREFIX}menu for main menu
2. Type ${settings.PREFIX}settings to configure bot
3. Explore all features!

🔗 IMPORTANT LINKS:
• 📢 Channel: ${config.CHANNEL_LINK}
• 👥 Group: ${config.GROUP_INVITE_LINK}
• 👑 Owner: ${config.OWNER_NUMBERS[0]}
`;
                
                await sendFormattedMessage(socket, jidNormalizedUser(socket.user.id), 
                    '🎉 Welcome!', welcomeText, settings.LANGUAGE);
                
                console.log(`✅ Bot connected for ${sanitizedNumber}`);
            }
        });
        
    } catch (error) {
        console.error('Pairing error:', error);
        if (!res.headersSent) {
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
