const getInfo = document.querySelector(".get_info");
const lists = document.getElementById("lists");

const charEndpoint = "https://www.breakingbadapi.com/api/character/random";
const quoteEndpoint = `https://www.breakingbadapi.com/api/quote/random?author=Skyler+White`;

let chars = [];
let quotes = [];
getInfo.addEventListener("click", ()=> fetchInfo); //bitchボタン押したらfetchinfo関数が呼ばれる

// const resQuote = await fetch(quoteEndpoint);
// const quotes = await resQuote.json();

// async function fetchInfo() {
function fetchInfo() {
  //   Response オブジェクトから JSON の本文の内容を抽出するには、 json() メソッドを使用

  //✅manuplate datas

  //📝1: using await twice (it was allowed to use only once)=================================================================================
  const res1 = await fetch(charEndpoint);
  const chars = await res1.json();

  console.log(res1);

  const res2 = await fetch(quoteEndpoint);
  const quotes = await res2.json();
  console.log(res2);

  //↑got an error of "Failed to execute 'json' on 'Response': body stream already read"

  
  //📝then ====================================================================================
  // const charInfo = fetch(charEndpoint);
  // charInfo.then((res) => res.json())
  // .then((data) => (chars = data));

  // console.log(charInfo); //promise: pending?

  // const quoteInfo = fetch(quoteEndpoint)
  //   .then((res2) => res2.json())
  //   .then((data2) => (quotes = data2));

  // console.log(quoteInfo);

  // const obj = {
  //   name: data.name,
  //   nickname: data.nickname,
  //   // img: charInfo.img,
  //   quote: data2.quote
  // };

  // console.log(obj);
  // console.log(obj);  -> undefined

  //DOM操作
  // //characters全部を出力するならforEach使えばいいと思う
  // lists.textContent = ""; //都度情報をクリアに
  // // responseInfo.forEach(function (info) {
  // Object.keys(response.info).forEach((info) => {
  //   const h2 = document.createElement("h2");
  //   const name = document.createElement("li");
  //   const nickname = document.createElement("li");
  //   const pic = document.createElement("img");
  //   const quate = document.createElement("p");
  //   h2.classList.add("h2");
  //   name.classList.add("li");
  //   nickname.classList.add("li");
  //   h2.textContent = "Nickname";
  //   name.textContent = info.name;
  //   nickname.textContent = info.nickname;
  //   quate.textContent = info.quate;
  //   // pic.setAttribute("src", `${responseInfo.img}`);

  //   lists.appendChild(name);
  //   lists.appendChild(h2);
  //   lists.appendChild(nickname);
  //   lists.appendChild(pic);
  // });

  //もしcharacterのnameとquoteのautherが一致したら、quoteEndpointをfetchさせる
}
//Get quotesからURLをもう１度取って、autherを{}を埋め込む
//とりあえずボタン押したらキャラクターの情報とquatesをゲットしたい
//search機能もつけたい

//chars.forEach(function (char) {
//   const h2 = document.createElement("h2");
//   const name = document.createElement("li");
//   const nickname = document.createElement("li");
//   const pic = document.createElement('img');
//   h2.classList.add("h2");
//   name.classList.add("li");
//   nickname.classList.add("li");
//   h2.textContent = "Nickname";
//   name.textContent = char.name;
//   nickname.textContent = char.nickname;
//   // pic.src = char."https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg";
//   pic.setAttribute("src", `${char.img}`);
//   //  let catsImgEl = document.createElement("img"); //img要素作成
//   // catsImgEl.setAttribute("src", `${catsImgUrl}`);

//   lists.appendChild(name);
//   lists.appendChild(h2);

 