const requestURL = "catchThis";
//Необходимо открывать именно по этому адресу, а не localhost
const formRequest = "http://127.0.0.1:8888";
let sendBtn = document.querySelector("#sendBtn");

loginFunc = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", formRequest);
  let inputs = document.querySelectorAll('input[type="text"]');

  let userData = {
    log: inputs[0].value,
    pas: inputs[1].value
  };

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(userData));
  xhr.onload = function() {
    console.log(this.responseURL, "responseURL");
    console.log(this.responseType, "responseType");
    console.log(this.HEADERS_RECEIVED, "HEADERS_RECEIVED");
  };
  xhr.onerror = function() {
    alert("server error");
  };
};

sendBtn && sendBtn.addEventListener("click", loginFunc);

//START canceled change page
let formBlock = document.querySelector("form");
formPrevent = event => {
  event.preventDefault();
};
// formBlock.addEventListener("click", formPrevent);
// END
