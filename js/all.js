
let data = [
  {
    "id": 0,
    "name": "肥宅心碎賞櫻3日",
    "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    "area": "高雄",
    "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    "group": 87,
    "price": 1400,
    "rate": 10
  },
  {
    "id": 1,
    "name": "貓空纜車雙程票",
    "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台北",
    "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    "group": 99,
    "price": 240,
    "rate": 2
  },
  {
    "id": 2,
    "name": "台中谷關溫泉會1日",
    "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台中",
    "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    "group": 20,
    "price": 1765,
    "rate": 7
  }
];

let filterData = [];

// DOM 元素
const ticketList = document.querySelector(".ticketCard-area");
const regionSearch = document.querySelector(".regionSearch");
const ticketCount = document.querySelector("#searchResult-text"); // 這裡為 id 選擇器，用 #
const ticketName = document.querySelector("#ticketName");
const ticketImgUrl = document.querySelector("#ticketImgUrl");
const ticketRegion = document.querySelector("#ticketRegion");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketNum = document.querySelector("#ticketNum");
const ticketRate = document.querySelector("#ticketRate");
const ticketDescription = document.querySelector("#ticketDescription");
const addTicketBtn = document.querySelector(".addTicket-btn");
const ticketForm = document.querySelector(".addTicket-form");

// 監聽事件
regionSearch.addEventListener("change", function(e){
  const  selectValue = e.target.value;
  if( selectValue == ""){
    // 全部
    filterData = data;
  } else {
    filterData = data.filter(item=> item.area == selectValue)
  }
  ticketListRender(filterData);
})

addTicketBtn.addEventListener("click", function(e){
  const obj = {
    "name": ticketName.value,
    "imgUrl": ticketImgUrl.value,
    "area": ticketRegion.value,
    "description": ticketDescription.value,
    "group": ticketNum.value,
    "price": ticketPrice.value,
    "rate": ticketRate.value
  }

  data.push(obj)
  ticketListRender(data);
  ticketForm.reset();
})

// list 渲染
function ticketListRender(data){
  let str = "";
  data.forEach(item=>{
    str+=`
    <li class="ticketCard">
      <div class="ticketCard-img">
        <a href="#">
          <img
            src=${item.imgUrl}
            alt=${item.name}
          />
        </a>
        <div class="ticketCard-region">${item.area}</div>
        <div class="ticketCard-rank">${item.rate}</div>
      </div>
      <div class="ticketCard-content">
        <div>
          <h3>
            <a href="#" class="ticketCard-name">${item.name}</a>
          </h3>
          <p class="ticketCard-description">${item.description}</p>
        </div>
        <div class="ticketCard-info">
          <p class="ticketCard-num">
            <span><i class="fas fa-exclamation-circle"></i></span>
            剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
          </p>
          <p class="ticketCard-price">
            TWD <span id="ticketCard-price">$${item.price}</span>
          </p>
        </div>
      </div>
    </li>`
  })

  ticketList.innerHTML = str;
  ticketCount.innerHTML = `本次搜尋共 ${data.length} 筆資料`;
}

// 初始化
function init(){
  ticketListRender(data);
}

init();