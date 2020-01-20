const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();
// const Datastore = require('nedb');

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => { 
    console.log(`Starting sever at ${port}`) 
});

app.use(express.static('public')); //show public dir
app.use(express.json({ limit: '2mb' }));

let data = {};
app.post('/post', async (request, response) => {
    console.log('I got a request!');
    // console.log(request);
    data = request.body;
    const url = new URL('http://courseap.itc.ntnu.edu.tw/acadmOpenCourse/CofopdlCtrl');
    url.search = new URLSearchParams(data).toString();
    const fetch_response = await fetch(url);
    fetch_response.type = 'basic'
    const rr = await fetch_response.json();
    response.json(rr['List']);
    
});