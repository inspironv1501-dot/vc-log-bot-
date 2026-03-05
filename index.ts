import { Client, GatewayIntentBits } from "npm:discord.js@14.14.1";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.on("voiceStateUpdate", (oldState, newState) => {
  const user = newState.member?.user;
  if (!user) return;

  const logChannelId = Deno.env.get("LOG_CHANNEL_ID");
  const logChannel = client.channels.cache.get(logChannelId);

  if (!logChannel) return; // ← これが重要！

  if (!oldState.channel && newState.channel) {
    logChannel.send(`${user.username} が ${newState.channel.name} に入ったよ`);
  }

  if (oldState.channel && !newState.channel) {
    logChannel.send(`${user.username} が ${oldState.channel.name} から出たよ`);
  }
});

client.login(Deno.env.get("TOKEN"));


