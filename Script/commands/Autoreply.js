const axios = require("axios");

const apiList = "https://raw.githubusercontent.com/shahadat-sahu/SAHU-API/refs/heads/main/SAHU-API.json";

const getMainAPI = async () => (await axios.get(apiList)).data.simsimi;

module.exports.config = {
  name: "autoreplybot",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  usePrefix: false,
  commandCategory: "Chat",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, body, senderID } = event;
  if (!body) return;

  const msg = body.toLowerCase().trim();

  const responses = {
    "miss you": "Dhn kha🖕🏻",
    "Tui kha": "Tui kha amr ta😭",
    "kiss de": "Thap dibo🥒",
    "👍": "Angul des kn angul vore dibo🙄",
    "hi": "Arek bessha chda ashche🤮",
    "bc": "Tor mayre cdi🙄",
    "Tor mare cdi": "Tor bpre cdi bessha🙄",
    "good morning": "More jah niggi",
    "good night": "Sebla jat ghumah🐕",
    "tor bal": "Bal bal koros kn tor bal uthe nai🤮",
    "Shuva": "Oni Ahiyan jijur shathe busy amake bol ki hoiche🤡",
    "owner": "‎[𝐎𝐖𝐍𝐄𝐑:☞ SHAHADAT SAHU ☜\nFacebook: https://www.facebook.com/profile.php?id=100044713412032\nWhatsApp: +8801882333052",
    "admin": "She is Shuva Sheikh Take shobai S5 shuva name chine🍒",
    "Magi": "Tor ma magi🖕🏻",
    "chup": "Tui chup kor bessha jat🫩",
    "Assalamualaikum": "Walaikum assalam🤍🦢",
    "fork": "",
    "kiss me": "Thap dibo Vagh🙄",
    "Thanks": "Your always welcome mera baccha🤍",
    "i love you": "মেয়ে হলে আমার বস সাহু এর ইনবক্সে এখুনি গুঁতা দিন🫢😻",
    "love you": "ভালোবাসা নামক আবলামী করতে চাইলে Boss সাহু এর ইনবক্সে গুতা দিন 😘",
    "by": "কিরে তুই কই যাস কোন মেয়ের সাথে চিপায় যাবি..!🌚🌶️",
    "Ami shuva": "Yes ma'am you're my owner🤍",
    "bot er baccha": "Amr baccha tor boyfriend er pete🤡",
    "tor nam ki": "My name is Jannat rahman",
    "pic de": "Voda show😋",
    "cudi": "Tore akashe batashe ghuray uray chudi🙄",
    "bal": "Bal bal koros kn amr dhn kha🍑👈🏻",
    "heda": "Heda chire adrita re dhukay dibo 🤮",
    "buda": "Tor bhuday adrita hijra re diye chodai😭",
    "kire ki koros": "Adritar voda khai🤮",
    "ki koros": "Bristy sax kore dekhi😋",
    "kire bot": "Pagol chagol ignore🖕🏻",
    "valo aso": "Alhamdulilah",
    "pagol": "Tor mayre bap🥒",
    "breakup": "Don't do this to me kochu gache fash nibo😭",
    "tui ke": "Ami shuva sheikh er chat bot🍒",
    "umm": "Umm koros kn angul maros naki🐕",
    "hmm": "hmmm koros kn tanju hat mere dey nki🤡",
    "Ami Bristy": "hae amra jani tui top magi👉🏻👌🏻"
  };

  if (!responses[msg]) return;

  if (!global.client.handleReply) global.client.handleReply = [];

  return api.sendMessage(
    responses[msg],
    threadID,
    (err, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "sahu"
      });
    },
    messageID
  );
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  if (event.senderID !== handleReply.author) return;

  try {
    const text = event.body.trim();

    const base = await getMainAPI();
    const link = `${base}/simsimi?text=${encodeURIComponent(text)}`;

    const res = await axios.get(link);

    const reply = Array.isArray(res.data.response)
      ? res.data.response[0]
      : res.data.response;

    if (!global.client.handleReply) global.client.handleReply = [];

    return api.sendMessage(
      reply,
      event.threadID,
      (err, info) => {
        global.client.handleReply.push({
          name: module.exports.config.name,
          messageID: info.messageID,
          author: event.senderID,
          type: "sahu"
        });
      },
      event.messageID
    );

  } catch {
    return api.sendMessage("🙂 একটু পরে আবার বলো", event.threadID, event.messageID);
  }
};

module.exports.run = async function ({ api, event }) {
  return module.exports.handleEvent({ api, event });
};
