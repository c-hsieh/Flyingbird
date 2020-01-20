const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors')
// const Datastore = require('nedb');

const app = express(cors());
const port = process.env.PORT || 3000;
app.listen(3000, () => { 
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
    // console.log(fetch_response.status);
    // console.log(fetch_response.statusText);
    // console.log(fetch_response.redirected);
    // console.log(fetch_response.ok);
    // console.log(fetch_response.url);
    // console.log(fetch_response.type);
    // console.log('hI',rr['List'][2]['teacher']);
    response.json(rr['List']);
    // response.text(rr['List'][0]['teacher'])
    // response.send('Success');
    
});
// app.get('/get', async (request, response) => {
//     // data = request.body;
//     // console.log(request);
//     const url = new URL('http://courseap.itc.ntnu.edu.tw/acadmOpenCourse/CofopdlCtrl');
//     url.search = new URLSearchParams(data).toString();
//     const fetch_response = await fetch(url);
//     const rr = await fetch_response.json();
//     console.log(rr['List'][2]['teacher']);
//     response.json(rr['List'][2]);
//     // response.text(rr['List'][0]['teacher'])
//     // response.send('Success2');
//     // response.json(data);
// });
// app.get('/get', (request, response) => {
//     const url = new URL('http://courseap.itc.ntnu.edu.tw/acadmOpenCourse/CofopdlCtrl');
//     url.search = new URLSearchParams(data).toString();
//     catchUrl()
//         .then(res => {
//             // document.getElementById('poem').innerText = poem;
//             console.log('yay');
//             console.log(res['List'][2]['teacher']);
//             const da = res['List'][2];
//             response.json(da)
//         })
//         .catch(error => {
//             console.log('error!');
//             console.error(error);
//         });
//     async function catchUrl() {
//         const response = await fetch(url);
//         // document.getElementById('poem').innerText = await response.text();
//         return await response.json();
//     };
//     // response.json(da);
//     // console.log(da)
//     // response.json(data);
// });