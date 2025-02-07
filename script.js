let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let tbody = document.getElementById("tbody");
let mod = "create";
let temp;

//get total
function getTotal() {
    if (price.value != "") {
        let cnt = (+taxes.value + +ads.value + +price.value) - +discount.value;
        total.innerHTML = cnt;
        total.style.background = "green"
    } else {
        total.innerHTML = "";
        total.style.background = "rgb(121, 7, 7)"
    }
}
// create product
let dataArr = []
if (localStorage.getItem("product")) {
    dataArr = JSON.parse(localStorage.product)
} else {
    dataArr = [];
}
create.onclick = function () {
    let obj = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }

    //add with count
    if(title.value!="" && price.value!="" &&count.value<=10 &&category.value!=""){

        if (mod == "create") {
            if (obj.count > 1) {
                for (let i = 0; i < obj.count; i++) {
                    dataArr.push(obj)
                }
            } else {
                dataArr.push(obj);
            }
        }
        else {
            dataArr[temp] = obj;
            mod = "create";
            create.innerHTML = "create";
            count.style.display = "block";
        }
        clearData();
    }

    //save localstorage
    localStorage.setItem("product", JSON.stringify(dataArr))
    showData();
}

//clear input
function clearData() {
    title.value = "";
    taxes.value = "";
    ads.value = "";
    price.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
    getTotal();
}
//read
function showData() {
    table = "";
    for (let i = 0; i < dataArr.length; i++) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${dataArr[i].title}</td>
        <td>${dataArr[i].price}</td>
        <td>${dataArr[i].taxes}</td>
        <td>${dataArr[i].ads}</td>
        <td>${dataArr[i].discount}</td>
        <td>${dataArr[i].total}</td>
        <td>${dataArr[i].category}</td>
        <td>
            <button onclick="updateItem(${i})" id="update">
                Update
            </button>
        </td>
        <td>
            <button onclick="deleItem(${i})" id="delete">
                Delete
            </button>
        </td>
        </tr>

        `
    }
    tbody.innerHTML = table;

    if (dataArr.length > 0) {
        document.getElementById("deleteAll").innerHTML = `
            <button onclick="delAll()">
                Delete All ( ${dataArr.length} )
            </button>
        `
    }
    else {
        document.getElementById("deleteAll").innerHTML = "";
    }

}
showData();

//delete
function deleItem(i) {
    dataArr.splice(i, 1);
    localStorage.setItem("product", JSON.stringify(dataArr));
    showData();
}
function delAll(cnt) {
    localStorage.clear();
    dataArr = [];
    showData();

}
//update
function updateItem(i) {
    title.value = dataArr[i].title;
    price.value = dataArr[i].price;
    taxes.value = dataArr[i].taxes;
    ads.value = dataArr[i].ads;
    discount.value = dataArr[i].discount;
    category.value = dataArr[i].category;
    count.style.display = "none"
    getTotal();
    create.innerHTML = "Update";
    temp = i;
    mod = "update";
    scroll({
        top: 0,
        behavior: "smooth"
    })

}
//search
let searchMod = "title";

function getSearchMode(id) {
    let searchbtn = document.getElementById("search");
    if (id != "searchTitle") {
        searchMod = "category"
        searchbtn.placeholder = "search by Category"
    }
    else {

        searchMod = "title"
        searchbtn.placeholder = "search by Title"

    }
    searchbtn.focus();
    searchbtn.value = "";
    showData();
}
function searchData(value) {
    let table = "";
    for (let i = 0; i < dataArr.length; i++) {
        if (searchMod == "title") {
            if (dataArr[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i + 1}</td>
                <td>${dataArr[i].title}</td>
                <td>${dataArr[i].price}</td>
                <td>${dataArr[i].taxes}</td>
                <td>${dataArr[i].ads}</td>
                <td>${dataArr[i].discount}</td>
                <td>${dataArr[i].total}</td>
                <td>${dataArr[i].category}</td>
                <td>
                    <button onclick="updateItem(${i})" id="update">
                        Update
                    </button>
                </td>
                <td>
                    <button onclick="deleItem(${i})" id="delete">
                        Delete
                    </button>
                </td>
                </tr>
        
                `
            }
        }

        else {
            if (dataArr[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i + 1}</td>
                <td>${dataArr[i].title}</td>
                <td>${dataArr[i].price}</td>
                <td>${dataArr[i].taxes}</td>
                <td>${dataArr[i].ads}</td>
                <td>${dataArr[i].discount}</td>
                <td>${dataArr[i].total}</td>
                <td>${dataArr[i].category}</td>
                <td>
                    <button onclick="updateItem(${i})" id="update">
                        Update
                    </button>
                </td>
                <td>
                    <button onclick="deleItem(${i})" id="delete">
                        Delete
                    </button>
                </td>
                </tr>
        
                `
            }
        }
    }

    tbody.innerHTML = table;
}

