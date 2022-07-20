const getInfo = document.querySelector(".get_info");
const lists = document.getElementById("lists");
const endpoint = "https://www.breakingbadapi.com/api/character/random";

//btn for get randam character
getInfo.addEventListener("click", fetchinfo); //bitchボタン押したらfetchinfo関数が呼ばれる
async function fetchinfo() {
  //   Response オブジェクトから JSON の本文の内容を抽出するには、 json() メソッドを使用
  const res = await fetch(endpoint);
  const chars = await res.json();
  console.log(chars);
  //DOM操作
  //characters全部を出力するならforEach使えばいいと思う
  lists.textContent = "";
  chars.forEach(function (char) {
    const pic = document.createElement('img');
    pic.classList.add("pic");
    const h2 = document.createElement("h2");
    h2.textContent = "Nickname";
    h2.classList.add("h2");
    const name = document.createElement("li");
    const nickname = document.createElement("li");
    h2.classList.add("h2");
    name.classList.add("li");
    nickname.classList.add("li");
    h2.textContent = "Nickname";
    name.textContent = char.name;
    nickname.textContent = char.nickname;
    pic.setAttribute("src", `${char.img}`);
    // pic.src = char."https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg";
    //  let catsImgEl = document.createElement("img"); //img要素作成
    // catsImgEl.setAttribute("src", `${catsImgUrl}`);

    lists.appendChild(name);
    lists.appendChild(h2);
    lists.appendChild(nickname);
    lists.appendChild(pic);
  });
}