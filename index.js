const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

const LOG_CHANNEL_ID = process.env.LOG_CHANNEL_ID;

client.on("voiceStateUpdate", (oldState, newState) => {
  const channel = client.channels.cache.get(LOG_CHANNEL_ID);
  if (!channel) return;

  const user = newState.member.user;

  // 退出
  if (oldState.channelId && !newState.channelId) {
    channel.send(`${user.username} が VC を退出しました`);
  }

  // 参加
  if (!oldState.channelId && newState.channelId) {
    channel.send(`${user.username} が VC に参加しました`);
  }
});

client.login(process.env.TOKEN);
