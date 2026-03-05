import { Client, GatewayIntentBits } from "npm:discord.js@14.14.1";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

let ready = false;

client.once("ready", () => {
  console.log("Bot is ready");
  ready = true;
});

client.on("voiceStateUpdate", (oldState, newState) => {
  if (!ready) return; // ← 起動直後の暴発を防ぐ

  const user = newState.member?.user;
  if (!user) return;

  const logChannelId = Deno.env.get("LOG_CHANNEL_ID");
  const logChannel = client.channels.cache.get(logChannelId);

  if (!logChannel) return;

  if (!oldState.channel && newState.channel) {
    logChannel.send(`${user.username} が ${newState.channel.name} に入ったよ`);
  }

  if (oldState.channel && !newState.channel) {
    logChannel.send(`${user.username} が ${oldState.channel.name} から出たよ`);
  }
});

client.login(Deno.env.get("TOKEN"));
