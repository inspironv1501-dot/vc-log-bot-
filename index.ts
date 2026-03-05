import { Client, GatewayIntentBits } from "npm:discord.js@14.14.1";

// Discordクライアント作成
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

// VC入退室ログ
client.on("voiceStateUpdate", (oldState, newState) => {
  const user = newState.member?.user;
  if (!user) return;

  const logChannelId = Deno.env.get("LOG_CHANNEL_ID");
  const logChannel = client.channels.cache.get(logChannelId);

  // 入室
  if (!oldState.channel && newState.channel) {
    logChannel?.send(`${user.username} が「${newState.channel.name}」に入ったよ`);
  }

  // 退室
  if (oldState.channel && !newState.channel) {
    logChannel?.send(`${user.username} が「${oldState.channel.name}」から出たよ`);
  }
});

// Bot起動
client.login(Deno.env.get("TOKEN"));
