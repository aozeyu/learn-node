document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:5000/getAll")
    .then((response) => response.json())
    .then((data) => loadHTMLTable(data["data"]));
});
document.querySelector('table tbody').addEventListener('click',function (event) {
  if (event.target.className === 'delete-row-btn') {
    deleteRowById(event.target.dataset.id)
  }
})

//根据id删除行数据
function deleteRowById(id) {
  //字符串加数字=字符串 将传入的id拼接成请求url
  fetch('http://localhost:5000/delete/' + id, {
    method: 'DELETE'
  }).then(response => response.json()).then(data => {
    if (data.success) {
      location.reload()
    }
  })
}


const addBtn = document.querySelector("#add-name-btn");
addBtn.onclick = function () {
  const nameInput = document.querySelector("#name-input");
  const name = nameInput.value;
  nameInput.value = "";
  //拿到输入的名字后发请求插入后端数据库清空输入框
  fetch("http://localhost:5000/insert", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ name: name }), // 将对象转化成json字符串
    // data['data']才是拿到的数组
  })
    .then((response) => response.json())
    .then((data) => insertRowIntoTable(data["data"]))
    .catch((err) => console.log(err));
};

function insertRowIntoTable(data) {
  //传入的data是一个对象不是数组
  const table = document.querySelector("table tbody");
  const isTableData = table.querySelector(".no-data");
  let tableHtml = "<tr>";
  //遍历对象的键
  for(var key in data) {
    if (data.hasOwnProperty(key)) {
      if (key === 'dateAdded') {
        data[key] = new Date(data[key]).toLocaleString()
      }
      tableHtml += `<td>${data[key]}</td>`
    }
  }
  tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</button></td>`;
  tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</button></td>`;
  tableHtml += "</tr>"
  if (isTableData) {
    table.innerHTML = tableHtml
  }else {
    const newRow = table.insertRow()
    newRow.innerHTML = tableHtml
  }
}

//首次加载执行的函数
function loadHTMLTable(data) {
  const table = document.querySelector("table tbody");
  if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
    return;
  }
  let tableHtml = "";
  data.forEach(function ({ id, name, date_added }) {
    tableHtml += "<tr>";
    tableHtml += `<td>${id}</td>`;
    tableHtml += `<td>${name}</td>`;
    tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
    tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</button></td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</button></td>`;
    tableHtml += "</tr>";
  });
  table.innerHTML = tableHtml;
}
