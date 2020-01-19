// import { request } from "express";

let dep = {};
// console.log('about to fetch a poem');
async function getDep() {
    const res = await fetch('listdep.json');
    return await res.json();
};

// console.log(getDep());

getDep().then(async list => {
    // let dep = {};
    dep = await list;

    for (let i in dep) {
        const option = document.createElement('option');
        // a.href = "#";
        option.innerText = dep[i];
        document.getElementById("deptCode").appendChild(option);
    };
})
//$('#deptCode').selectpicker();
// $(function () {
//     $('#deptCode').selectpicker();
// });
$('.select2').select2();
// console.log(dep);


const button = document.getElementById('confirm');
button.addEventListener('click', async (event) => {
    const data = {
        '_dc': '1579204364030',
        'acadmYear': '108',
        'acadmTerm': '2',
        'chn': '',
        'engTeach': 'N',
        'moocs': 'N',
        'remoteCourse': 'N',
        'digital': 'N',
        'adsl': 'N',
        'deptCode': 'SU40',
        'classCode': '',
        'teacher': '',
        'serial_number': '',
        'course_code': '',
        'language': 'chinese',
        'action': 'showGrid',
        'start': '0',
        'limit': '99999',
        'page': '1'
    };
    console.log(data);
    const options = {
        method: 'POST',
        headers: {
            // 'Content-Type': 'text/plain',
            'Content-Type': 'application/json',
        },
        // body: data
        body: JSON.stringify(data)
    };
    console.log('Hello 1')
    try{
        const api_response = await fetch('/ppost', options);
        const te = await api_response.text();
        console.log(te)
        // const json = await response.json();
        // console.log(json)
        console.log('Hello 2')
        // const res = await fetch('/get');
        // const te2 = await res.text();
        // console.log(res)
        // fetch('/get')
        //     .then(res => res.json())
        //     .then(json => console.log(json))
        //     .catch(error => {
        //         console.error(error);
        //     });
        // console.log(res.)
    } catch(error) {
        console.error(error);
    };
    

});
// const sendRq = fetch(, 
// {
//     headers: {
//         "Access-Control-Allow-Origin": 'http://localhost:3000'
//         // "Content-Type": "text/plain"
//     },
//     credentials: 'include'
// });

