let number_of_users = document.getElementById("users_number");

let get_hashtag = document.getElementById("input_data");

let status = document.getElementById("Status");

let data_obj = {
  Hashtag: "",
  Script: "",
  ip_client: ""
};

function displayRadioValue() {
  if (get_hashtag.value.length !== 0) {
    var ele = document.getElementsByName("drone");
    data_obj.Hashtag = get_hashtag.value;

    for (i = 0; i < ele.length; i++) {
      if (ele[i].checked) {
        console.log(ele[i].id);
        data_obj.Script = ele[i].id;
      }
    }
    send_Hashtag(data_obj)
    status.style = "color: green";
    status.innerHTML = "status: PASSED 1/2";
  } else {
    status.style = "color: red";
    status.innerHTML = "status: write a correct hashtag";
  }
}

async function send_Hashtag(sending_data) {
  let res_ip = await fetch('https://api.ipify.org?format=json')
  res_ip = await res_ip.json()
  let data_ip = res_ip.ip
  data_obj.ip_client = data_ip

  status.innerHTML = "status: PASSED 2/2";
  let send = await fetch(
    "https://script-hashtag-default-rtdb.firebaseio.com/save_hashtag.json",
    {
      method: "POST",
      Headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sending_data)
    }
  );
  status.innerHTML = "status: Done";
}

async function get_number_of_user() {
  let respone = await fetch(
    "https://script-beta-default-rtdb.firebaseio.com/save_id.json"
  );
  respone = await respone.json();
  data = respone;
  let save_data = [];
  for (const key in data) {
    save_data.push(data[key]["Twitter_id"]);
  }
  let unique_id = [...new Set(save_data)];
  number_of_users.innerHTML = `Script users: ${unique_id.length} user`;
}
get_number_of_user();
