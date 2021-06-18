const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const prefix = config.prefix;
var fs = require("fs");
var lineReader = require("line-reader");
var async = require("async");
const firstline = require("firstline");
const generated = new Set();
var os = require("os");

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function (request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});
bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity('Help: .help', { type: "PLAYING" }).catch(console.error)
});

bot.on("message", message => {
    if (message.channel.id === config.botChannel) { 
        if (message.author.bot) return;
        var command = message.content
            .toLowerCase()
            .slice(prefix.length)
            .split(" ")[0];

        if (command === "gen") {
            if (generated.has(message.author.id)) {
                message.channel.send(
                    "Vous avez un temps de récupération de 30 secondes ! - " +
                    message.author
                );
            } else {
                let messageArray = message.content.split(" ");
                let args = messageArray.slice(1);
                if (!args[0])
                    return message.reply("Veuillez fournir un service !");
                var fs = require("fs");
                const filePath = __dirname + "/" + args[0] + ".txt";
                //if(args[0] != __dirname + "txt") return message.reply("Couldnt found: " + args[0] + " in our Database!")

                const embed = {
                    title: "Out of Stock!",
                    description: "Le service que vous avez demandé est actuellement en rupture de stock !",
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/attachments/855345459802406932/855357322459873300/modele-conception-logo-lune_255467-34.png",
                        text: "Developed by Ratu$"
                    },
                    thumbnail: {
                        url:
                            "https://cdn.discordapp.com/attachments/855345459802406932/855357322459873300/modele-conception-logo-lune_255467-34.png"
                    },
                    author: {
                        name: "TheMidnightMarket Account Generator Bot",
                        url: "https://discord.gg/z2EQM2VUKf",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };

                fs.readFile(filePath, function (err, data) {
                    if (!err) {
                        data = data.toString();
                        var position = data.toString().indexOf("\n");
                        var firstLine = data.split("\n")[0];
                        if(position == -1)
                        return message.channel.send({ embed });
                        message.author.send(firstLine);
                        if (position != -1) {
                            data = data.substr(position + 1);
                            fs.writeFile(filePath, data, function (err) {
                                const embed = {
                                    title: "Account Generated!",
                                    description: "Le compte de votre service demandé a été envoyé dans vos DM!",
                                    color: 0xff033d,
                                    timestamp: new Date(),
                                    footer: {
                                        icon_url:
                                            "https://cdn.discordapp.com/attachments/855345459802406932/855357322459873300/modele-conception-logo-lune_255467-34.png",
                                        text: "Developed by Ratu$"
                                    },
                                    thumbnail: {
                                        url:
                                            "https://cdn.discordapp.com/attachments/855345459802406932/855357322459873300/modele-conception-logo-lune_255467-34.png"
                                    },
                                    author: {
                                        name: "TheMidnightMarket Account Generator Bot",
                                        url: "https://discord.gg/z2EQM2VUKf",
                                        icon_url: bot.displayAvatarURL
                                    },
                                    fields: []
                                };
                                message.channel.send({ embed });
                                generated.add(message.author.id);
                                setTimeout(() => {
                                    generated.delete(message.author.id);
                                }, 30000); // 86400000 = 24 H , 150000 = 15 Min
                                if (err) {
                                    console.log(err);
                                }
                            });
                        } else {
                            message.channel.send("Out of Stock!");
                        }
                    } else {
                        const embed = {
                            title: "Service Not found!",
                            description: "Le service demandé est introuvable!",
                            color: 0xff033d,
                            timestamp: new Date(),
                            footer: {
                                icon_url:
                                    "https://cdn.discordapp.com/attachments/855345459802406932/855357322459873300/modele-conception-logo-lune_255467-34.png",
                                text: "Developed by Ratu$"
                            },
                            thumbnail: {
                                url:
                                    "https://cdn.discordapp.com/attachments/855345459802406932/855357322459873300/modele-conception-logo-lune_255467-34.png"
                            },
                            author: {
                                name: "TheMidnightMarket Account Generator Bot",
                                url: "https://discord.gg/z2EQM2VUKf",
                                icon_url: bot.displayAvatarURL
                            },
                            fields: []
                        };
                        message.channel.send({ embed });
                        return;
                    }
                });
            }
        }
        else
            if (command === "stats") {
                const embed = {
                    title: "Stats",
                    description: `Total Users: ${bot.users.size}`,
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/attachments/855345459802406932/855357322459873300/modele-conception-logo-lune_255467-34.png",
                        text: "Developed by Ratu$"
                    },
                    thumbnail: {
                        url:
                            "https://cdn.discordapp.com/attachments/855345459802406932/855357322459873300/modele-conception-logo-lune_255467-34.png"
                    },
                    author: {
                        name: "TheMidnightMarket Account Generator Bot",
                        url: "https://discord.gg/z2EQM2VUKf",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            }
        
            if (command === "help") {

                const embed = {
                    color: 0xff033d,
                    title: 'TheMidnightMarket Account Generator Bot',
                    url: 'https://discord.gg/z2EQM2VUKf',
                    author: {
                        name: 'Command list',
                        icon_url: 'https://cdn.discordapp.com/attachments/855345459802406932/855357322459873300/modele-conception-logo-lune_255467-34.png',
                        url: 'https://discord.gg/z2EQM2VUKf',
                    },
                    description: '**This is a List of all Commands**',
                    thumbnail: {
                        url: 'https://cdn.discordapp.com/attachments/855345459802406932/855357322459873300/modele-conception-logo-lune_255467-34.png',
                    },
                    fields: [
                        {
                            name: 'Generate Accounts',
                            value: 'Usage: .gen <Service Name>',
                        },
                        {
                            name: 'Create Service',
                            value: 'Usage: .create <Service Name>',
                        },
                        {
                            name: 'Restock Service',
                            value: 'Usage: .restock <ServiceName>',
                        },
                        {
                            name: 'Add Accounts',
                            value: 'Usage: .add <user:pass> <ServiceName>',
                        },
                        {
                            name: 'Show Stats of AraCore Bot',
                            value: 'Usage: .stats',
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: 'Developed by Ratu$',
                        icon_url: 'https://cdn.discordapp.com/attachments/855345459802406932/855357322459873300/modele-conception-logo-lune_255467-34.png',
                    },
                };
                message.channel.send({ embed });
            }

        if (command === "add") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("You dont have Permissions to do that!");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            var account = args[0]
            var service = args[1]
            if(!account) return message.reply("Provide a Formated Account String first!")
            if(!service) return message.reply("Provide a Service first!")
            const filePath = __dirname + "/" + args[1] + ".txt";
            fs.appendFile(filePath, os.EOL + args[0], function (err) {
                if (err) return console.log(err);
                const embed = {
                    title: "Account added!",
                    description: "Successfully added Account to " + service + "!",
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/attachments/855345459802406932/855357322459873300/modele-conception-logo-lune_255467-34.png",
                        text: "Developed by Ratu$"
                    },
                    thumbnail: {
                        url:
                            "https://cdn.discordapp.com/attachments/855345459802406932/855357322459873300/modele-conception-logo-lune_255467-34.png"
                    },
                    author: {
                        name: "TheMidnightMarket Account Generator Bot",
                        url: "https://discord.gg/z2EQM2VUKf",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            });


        }
        if (command === "create") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("You dont have Permissions to do that!");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            const filePath = __dirname + "/" + args[0] + ".txt";
            fs.writeFile(filePath, 'AraCore:AraCore', function (err) {
                if (err) throw err;
                const embed = {
                    title: "Created Service!",
                    description: "Successfully created Service " + args[0] + "!",
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/attachments/855345459802406932/855357322459873300/modele-conception-logo-lune_255467-34.png",
                        text: "Developed by Ratu$"
                    },
                    thumbnail: {
                        url:
                            "https://cdn.discordapp.com/attachments/855345459802406932/855357322459873300/modele-conception-logo-lune_255467-34.png"
                    },
                    author: {
                        name: "TheMidnightMarket Account Generator Bot",
                        url: "https://discord.gg/z2EQM2VUKf",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            });
        }
        if (command === "restock") {
            const embed = {
                title: "Provide Service!",
                description: "Veuillez fournir le nom du service réapprovisionné!",
                color: 0xff033d,
                timestamp: new Date(),
                footer: {
                    icon_url:
                        "https://cdn.discordapp.com/attachments/855345459802406932/855357322459873300/modele-conception-logo-lune_255467-34.png",
                    text: "Developed by Ratu$"
                },
                thumbnail: {
                    url:
                        "https://cdn.discordapp.com/attachments/605044891839365132/709708459528159252/aracore.png"
                },
                author: {
                    name: "TheMidnightMarket Account Generator Bot",
                    url: "https://discord.gg/z2EQM2VUKf",
                    icon_url: bot.displayAvatarURL
                },
                fields: []
            };
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("You dont have Permissions to do that!");
            if (!args[0])
            {
                return message.channel.send({ embed });
            }
            else {
            message.channel.send("@everyone Service " + args[0] + " has been restocked by " + "<@" + message.author.id +">");
            }
        }
    }
});

bot.login(config.token);