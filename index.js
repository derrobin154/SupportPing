/*
* Support Ping Bot für Discord
* Geschrieben von: derrobin154#1337
* Node Packages: discord.js
* Zur Erstinbetriebnahme: "npm i" in Console eingeben, danach die Daten in der Config anpassen
* und "node index.js" eingeben
*/
const { Client, Intents, MessageEmbed } = require("discord.js");
const config = require("./config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
    

try {
    client.on("ready", () => {
       console.log("Start OK.") 
    });
    
    client.on("voiceStateUpdate", (beforeUpdate, afterUpdate) => {
        if(afterUpdate.guild.id === config["discord-guildid"]){
            if(afterUpdate.channelId === config["discord-supportchannelid"]){
                if(afterUpdate.member.roles.cache.has(config["discord-supportrole"])) return;
                if(afterUpdate.member.roles.cache.has(config["discord-supportmuterole"])) return;
                const Embed = new MessageEmbed()
                    .setColor("#FF0000")
                    .setTitle(`${afterUpdate.member.displayName} wartet im Support Channel`)
                    .setAuthor(client.user.username, client.user.displayAvatarURL())
                    .setDescription(`**${afterUpdate.member.displayName}** wartet im Channel **${afterUpdate.channel.name}**`)
                    .setFooter("Supportping Bot by derrobin154#1337");
                afterUpdate.guild.channels.cache.get(config["discord-teamchannelid"]).send({content: `<@&${config["discord-supportrole"]}>`, embeds: [Embed]}).then((message) => {
                    console.log(`${afterUpdate.member.displayName} ging in Channel ${afterUpdate.channel.name}`);
                }).catch((e) => {
                    console.error(`FEHLER: ${e}`)
                })
            }
        }
    });

    client.login(config["discord-bottoken"]);
}catch (e) {
    console.error("Fehler im ersten Try Block", e);
}
