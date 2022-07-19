const getInfo = document.querySelector(".get_info");
const lists = document.getElementById("lists");

const charEndpoint = "https://www.breakingbadapi.com/api/character/random";
const quoteEndpoint = `https://www.breakingbadapi.com/api/quote/random?author=${charEndpoint.name}`;

getInfo.addEventListener("click", fetInfo); //bitchボタン押したらfetchinfo関数が呼ばれる

// const resQuote = await fetch(quoteEndpoint);
// const quotes = await resQuote.json();

// async function fetchChar() {
function fetInfo() {
  //   Response オブジェクトから JSON の本文の内容を抽出するには、 json() メソッドを使用
  //データの操作
  // const res = await fetch(charEndpoint);
  // const chars = await res.json();

  // // async function fetchQuote() {
  //   const res2 = await fetch(quoteEndpoint);
  //   const quotes = await res.clone().json();
  // }

  //↑got an error of "Failed to execute 'json' on 'Response': body stream already read"

  Promise.all([fetch(charEndpoint), fetch(quoteEndpoint)])
    .then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(
        responses.map(function (response) {
          return response.json();
        })
      );
    })
    .then(function (data) {
      // Log the data to the console
      // You would do something with both sets of data here

      const response = function () {
        const info = {
          name: data.name,
          nickname: data.nickname,
          // img: charEndpoint.img,
          quote: quoteEndpoint,
        };
      };
      console.log(data);
    })
    .catch(function (error) {
      // if there's an error, log it
      console.log(error);
    });

  // const responseInfo = {
  //   name: data.name,
  //   nickname: data.nickname,
  //   // img: charEndpoint.img,
  //   quote: quoteEndpoint,
  // };

  //DOM操作
  //characters全部を出力するならforEach使えばいいと思う
  lists.textContent = ""; //都度情報をクリアに
  // responseInfo.forEach(function (info) {
  Object.keys(response.info).forEach((info) => {
    const h2 = document.createElement("h2");
    const name = document.createElement("li");
    const nickname = document.createElement("li");
    const pic = document.createElement("img");
    const quate = document.createElement("p");
    h2.classList.add("h2");
    name.classList.add("li");
    nickname.classList.add("li");
    h2.textContent = "Nickname";
    name.textContent = info.name;
    nickname.textContent = info.nickname;
    quate.textContent = info.quate;
    // pic.setAttribute("src", `${responseInfo.img}`);

    lists.appendChild(name);
    lists.appendChild(h2);
    lists.appendChild(nickname);
    lists.appendChild(pic);
  });

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
//   lists.appendChild(nickname);
//   lists.appendChild(pic);
// })
