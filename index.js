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
    const leftChannel = oldState.channel;
    channel.send(`${user.username} がチャンネル「${leftChannel.name}」から退室したよ。`);
  }

  // 参加
  if (!oldState.channelId && newState.channelId) {
    const joinedChannel = newState.channel;
    channel.send(`${user.username} がチャンネル「${joinedChannel.name}」に入室したよ。`);
  }
});

client.login(process.env.TOKEN);
