const getInfo = document.querySelector(".get_info");
const lists = document.getElementById("lists");

const endpoint = "https://www.breakingbadapi.com/api/character/random";
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
    const h2 = document.createElement("h2");
    const name = document.createElement("li");
    const nickname = document.createElement("li");
    const pic = document.createElement('img');
    h2.classList.add("h2");
    name.classList.add("li");
    nickname.classList.add("li");
    h2.textContent = "Nickname";
    name.textContent = char.name;
    nickname.textContent = char.nickname;
    // pic.src = char."https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg";
    pic.setAttribute("src", `${char.img}`);
    //  let catsImgEl = document.createElement("img"); //img要素作成
    // catsImgEl.setAttribute("src", `${catsImgUrl}`);

    lists.appendChild(name);
    lists.appendChild(h2);
    lists.appendChild(nickname);
    lists.appendChild(pic);
  });
}

// function display() {
//   const div = document.createElement("div");
//   const html = chars.map((char) => {
//     return `
//     <h2>${char.name}</h2>
//     <div>

//     </div>
//     `;
// });
// div.appendChild(html);

//Get quotesからURLをもう１度取って、autherを{}を埋め込む
//とりあえずボタン押したらキャラクターの情報とquatesをゲットしたい
//search機能もつけたい
