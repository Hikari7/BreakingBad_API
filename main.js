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
  chars.forEach(function (char) {
    const li = document.createElement("li");
    li.textContent = chars.name;
    li.textContent = chars.birthday;
    lists.appendChild(li);
  });
}
//Get quotesからURLをもう１度取って、autherを{}を埋め込む
//とりあえずボタン押したらキャラクターの情報とquatesをゲットしたい
//search機能もつけたい