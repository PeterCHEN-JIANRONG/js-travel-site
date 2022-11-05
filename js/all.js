let data = [
  {
    id: 0,
    name: "肥宅心碎賞櫻3日",
    imgUrl:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    area: "高雄",
    description: "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    group: 87,
    price: 1400,
    rate: 10,
  },
  {
    id: 1,
    name: "貓空纜車雙程票",
    imgUrl:
      "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    area: "台北",
    description:
      "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    group: 99,
    price: 240,
    rate: 2,
  },
  {
    id: 2,
    name: "台中谷關溫泉會1日",
    imgUrl:
      "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    area: "台中",
    description:
      "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    group: 20,
    price: 1765,
    rate: 7,
  },
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
const cantFindArea = document.querySelector(".cantFind-area");
const ticketNameMessage = document.querySelector("#ticketName-message");
const ticketImgUrlMessage = document.querySelector("#ticketImgUrl-message");
const ticketRegionMessage = document.querySelector("#ticketRegion-message");
const ticketPriceMessage = document.querySelector("#ticketPrice-message");
const ticketNumMessage = document.querySelector("#ticketNum-message");
const ticketRateMessage = document.querySelector("#ticketRate-message");
const ticketDescriptionMessage = document.querySelector(
  "#ticketDescription-message"
);

// 監聽事件
regionSearch.addEventListener("change", function (e) {
  const selectValue = e.target.value;
  if (selectValue == "") {
    // 全部
    filterData = data;
  } else {
    filterData = data.filter((item) => item.area == selectValue);
  }
  ticketListRender(filterData);
});

addTicketBtn.addEventListener("click", function (e) {
  if (!checkTicketInputSuccess()) {
    return;
  }

  const obj = {
    id: data.length,
    name: ticketName.value,
    imgUrl: ticketImgUrl.value,
    area: ticketRegion.value,
    description: ticketDescription.value,
    group: parseInt(ticketNum.value),
    price: parseInt(ticketPrice.value),
    rate: parseInt(ticketRate.value),
  };

  data.push(obj);
  ticketListRender(data);
  ticketForm.reset();
});

// list 渲染
function ticketListRender(data) {
  let str = "";
  data.forEach((item) => {
    str += `
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
    </li>`;
  });

  ticketList.innerHTML = str;
  ticketCount.innerHTML = `本次搜尋共 ${data.length} 筆資料`;

  // 顯示無資料
  if (data.length <= 0) {
    cantFindArea.classList.remove("hidden");
  } else {
    cantFindArea.classList.add("hidden");
  }
}

// getAlertMessageHtml
function getAlertMessageHtml(text) {
  return `<i class="fas fa-exclamation-circle"></i>
  <span>${text}</span>`;
}

// checkTicketInputSuccess - 判斷資料未填寫，不可新增
function checkTicketInputSuccess() {
  if (!ticketName.value.trim()) {
    ticketNameMessage.innerHTML = getAlertMessageHtml("套票名稱必填!");
    ticketName.focus();
    return false;
  } else {
    ticketNameMessage.innerHTML = "";
  }

  if (!ticketImgUrl.value.trim()) {
    ticketImgUrlMessage.innerHTML = getAlertMessageHtml("圖片網址必填!");
    ticketImgUrl.focus();
    return false;
  } else {
    ticketImgUrlMessage.innerHTML = "";
  }

  if (!ticketRegion.value.trim()) {
    ticketRegionMessage.innerHTML = getAlertMessageHtml("景點地區必填!");
    ticketRegion.focus();
    return false;
  } else {
    ticketRegionMessage.innerHTML = "";
  }

  if (parseInt(ticketPrice.value) <= 0) {
    ticketPriceMessage.innerHTML = getAlertMessageHtml("金額不可為 0 或負數!");
    ticketPrice.focus();
    return false;
  } else if (!parseInt(ticketPrice.value)) {
    // 非數值 NaN
    ticketPriceMessage.innerHTML = getAlertMessageHtml("金額為必填!");
    ticketPrice.focus();
    return false;
  } else {
    ticketPriceMessage.innerHTML = "";
  }

  if (parseInt(ticketNum.value) <= 0) {
    ticketNumMessage.innerHTML =
      getAlertMessageHtml("套票組數不可為 0 或負數!");
    ticketNum.focus();
    return false;
  } else if (!parseInt(ticketNum.value)) {
    // 非數值 NaN
    ticketNumMessage.innerHTML = getAlertMessageHtml("套票組數為必填!");
    ticketNum.focus();
    return false;
  } else {
    ticketNumMessage.innerHTML = "";
  }

  if (parseInt(ticketRate.value) <= 0 || parseInt(ticketRate.value) > 10) {
    ticketRateMessage.innerHTML = getAlertMessageHtml("套票星級限制 1~10");
    ticketRate.focus();
    return false;
  } else if (!parseInt(ticketRate.value)) {
    // 非數值 NaN
    ticketRateMessage.innerHTML = getAlertMessageHtml("套票星級為必填!");
    ticketRate.focus();
    return false;
  } else {
    ticketRateMessage.innerHTML = "";
  }

  if (!ticketDescription.value.trim()) {
    ticketDescriptionMessage.innerHTML = getAlertMessageHtml("套票描述必填!");
    ticketDescription.focus();
    return false;
  } else if (ticketDescription.value.trim().length > 100) {
    ticketDescriptionMessage.innerHTML =
      getAlertMessageHtml("套票描述限制 100 個字!");
    ticketDescription.focus();
    return false;
  } else {
    ticketDescriptionMessage.innerHTML = "";
  }
  return true;
}

// 初始化
function init() {
  ticketListRender(data);
}

init();
