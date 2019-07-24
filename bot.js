const Discord = require('discord.js');
const { token, gifToken } = require('./auth.json');
const giphy = require('giphy-api')(gifToken);

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  // If the message is '!rip'
  if (message.content === 'coding') {
    // Create the attachment using Attachment
    giphy
      .search('coding')
      .then(res => {
        const totalresponse = res.data.length;
        const responseIndex =
          Math.floor(Math.random() * 100 + 1) % totalresponse;
        const responseFinal = res.data[responseIndex];
        // Send the attachment in the message channel
        message.channel.send(responseFinal.images.fixed_height.url);
      })
      .catch(err => {
        message.channel.send('Error');
      });
  }
});

client.login(token);
