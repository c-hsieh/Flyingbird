// require('bootstrap');

let dep = {};
// console.log('about to fetch a poem');
async function getDep() {
    const res = await fetch('listdep.json');
    return await res.json();
};

const classLevel = {
    "": "",
    "甲班": "1",
    "乙班": "2",
    "丙班": "3",
    "丁班": "4",
    "大碩博合開": "7",
    "碩博合開": "8",
    "大碩合開": "9",
};

for (let i of Object.keys(classLevel)) {
    const option = document.createElement('option');
    // a.href = "#";
    option.innerText = i;
    document.getElementById("classCode").appendChild(option);
};

getDep().then(async list => {
    // let dep = {};
    dep = await list;

    // console.log(dep);
    for (let i of Object.keys(dep)) {
        const option = document.createElement('option');
        // a.href = "#";
        option.innerText = i;
        document.getElementById("deptCode").appendChild(option);
    };
})
//$('#deptCode').selectpicker();
// $(function () {
//     $('#deptCode').selectpicker();
// });
$('.select2').select2();

function getKeyByValue(object, value) {
    for (let prop in object) {
        if (object.hasOwnProperty(prop)) {
            if (object[prop] === value)
                return prop;
        }
    }
};
let firstSearch = true;

function showLoding(){
    const div = document.createElement('div');
    div.className = "spinner-border";
    div.setAttribute('role', "status");
    div.id = 'loading';
    const span = document.createElement('span');
    span.className = "sr-only";
    div.append(span);
    document.getElementById('formData').append(div);
    // document.body.append(div);
    
};
function hideLoding(){
    const div = document.getElementById('loading');
    div.parentNode.removeChild(div);
}


const button = document.getElementById('confirm');
button.addEventListener('click', async (event) => {
    event.preventDefault();
    if (document.getElementById('loading') != null){
        hideLoding()
    }
    showLoding()
    const formData = document.getElementById('formData').elements;
    // console.log(button);
    // console.log(formData['acadmYear'].value);
    const acadmYear = formData['acadmYear'].value;
    const acadmTerm = formData['acadmTerm'].value;
    const engTeach = formData['engTeach'].checked == true ? "Y" : "N";
    // console.log('engTeach', engTeach);
    // const deptCodeValue = formData['deptCode'].value;
    // const deptCode = getKeyByValue(dep, deptCodeValue);
    const deptCode = dep[formData['deptCode'].value];
    console.log(deptCode);
    // const classCode = formData['classCode'].value;
    const classCode = classLevel[formData['classCode'].value];
    // console.log(classCode);
    const teacher = encodeURI(formData['teacher'].value);
    // console.log('teacher', typeof(teacher));
    const chn = encodeURI(formData['chn'].value);
    const serial_number = formData['serial_number'].value;
    const course_code = formData['course_code'].value;
    
    const data = {
        '_dc': '1579204364030',
        'acadmYear': acadmYear,
        'acadmTerm': acadmTerm,
        'chn': chn,
        'engTeach': engTeach,
        'moocs': 'N',
        'remoteCourse': 'N',
        'digital': 'N',
        'adsl': 'N',
        'deptCode': deptCode,
        // 'deptCode': 'SU40',
        'classCode': classCode,
        'teacher': teacher,
        'serial_number': serial_number,
        'course_code': course_code,
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
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };
    console.log('Hello1')
    try{
        const api_response = await fetch('/post', options);
        const json = await api_response.json();
        hideLoding()
        console.log(json);
        console.log('Hello2');
        // $(function () {$('#dataTable').bootstrapTable('refresh')});
        if (document.getElementById('divtable') != null){
            const ele = document.getElementById('divtable');
            ele.parentNode.removeChild(ele);
        }
        const div = document.createElement('div');
        div.id = 'divtable';
        document.body.append(div);
        
        const divtable = document.getElementById('divtable');
        const table = document.createElement('table');
        table.id = 'dataTable';
        table.className = "table table-striped table-bordered table-sm";
        table.setAttribute("data-pagination", "true");
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        
        // let headT = ["chn_name", "course_code", "dept_chiabbr", "serial_no", "teacher", "time_inf"];
        const headT = {
            "開課序號": "course_code",
            "開課代碼": "serial_no",
            "開課單位": "dept_chiabbr",
            "必/選": "option_code",
            "學分": "credit",
            "課程名稱": "chn_name",
            "教師": "teacher",
            "時間地點": "time_inf",
            "現修人數": "limit_count_h",
            "授權碼人數": "authorize_p",
            "現修": "restrict",
        };
        // let headT = ["chn_name", "course_code"];
        // let columns = [];
        // for (h of headT) {
        //     let t = {
        //         title: h,
        //         field: h,
        //         sortable: true
        //         }
        //     columns.push(t);
        // };
        // function operateFormatter() {
        //     return [
        //         '<a class="like" href="javascript:void(0)" title="Like">',
        //         '<i class="fa fa-heart"></i>',
        //         '</a>  ',
        //         '<a class="remove" href="javascript:void(0)" title="Remove">',
        //         '<i class="fa fa-trash"></i>',
        //         '</a>'
        //     ].join('')
        // };
        const operateFormatter = [
            '<a class="like" href="javascript:void(0)" title="Like">',
            'Like',
            // '<i class="fa fa-heart"></i>',
            '</a>  '
        ].join('');
        

        for (h of Object.keys(headT)){
            const th = document.createElement('th');
            th.className = 'th-sm';
            th.textContent = h;
            th.setAttribute("data-sortable", "true");
            // th.setAttribute("data-escape", "false");
            th.setAttribute("data-field", headT[h]);
            tr.append(th);
        };
        // <th data-field="operate" data-formatter="operateFormatter" data-events="operateEvents">Item Price</th>
        const th = document.createElement('th');
        th.textContent = 'LOVE';
        th.setAttribute("data-field", "operate");
        th.setAttribute("data-escape", "false");
        th.setAttribute("data-formatter", operateFormatter);
        th.setAttribute("data-events", "operateEvents");
        tr.append(th);
        thead.append(tr);
        table.append(thead);
        // body
        // const tbody = document.createElement('tbody');
        // for (i of json){
        //     const tr2 = document.createElement('tr');
        //     for (j of headT){
        //         const td = document.createElement('td');
        //         td.textContent = i[j];
        //         tr2.append(td);
        //     }
        //     tbody.append(tr2);
        // }
        // table.append(tbody);
        // document.body.append(table);
        divtable.appendChild(table);

        // const p = document.createElement('p');
        // p.textContent = 'HA';
        // document.body.append(p);
        // console.log('p');
        // let data = [{
        //     chn_name: "ABC",
        //     course_code: 123
        // },{
        //     "chn_name": "CDE",
        //     "course_code": 456
        // }];
        $(function () {
            // $('#dataTable').bootstrapTable({
                
            // });
            $('#dataTable').bootstrapTable({
                // columns: columns,
                data: json,
                sortStable: true,
                search: true,
                showColumns: true,
                // buttonsAlign: "left"
            });
            
            $('#dataTable').bootstrapTable('updateFormatText','formatSearch', 'Enter keywords...')
            // $('.dataTables_length').addClass('bs-select');
        });
        
        window.operateEvents = {
            'click .like': function (e, value, row, index) {
                alert('You click like action, row: ' + JSON.stringify(row))
            }
        }


    } catch(error) {
        console.error(error);
    };
    

});

