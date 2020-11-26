'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: "hp/K+6X7L0Nba8iMwyRIH/4MoafQbUvY1oFMRhfGuXkuOdfGvlHnyiH4t4gUzdUS31KZX4mNR4eCj2zLk4AqPPjm2qW7ZioR14KhXwcmN/n6DsbeSUHjVuk08t7+VplcHFSpZl9nNIURudWEsBHp5wdB04t89/1O/w1cDnyilFU=",
  channelSecret: "b1cd91f12aedcafa6af9eebd01bca9d1",
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});





// event handler
function handleEvent(event) {


  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  else if (event.type === 'message' || event.message.text === 'hello')
  {
    const payload = {
      type: 'text',
      text: "Hello by mew"
    };
    return client.replyMessage(event.replyToken, payload);
  } 

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);


}







// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
