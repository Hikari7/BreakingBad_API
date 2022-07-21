const getInfo = document.querySelector(".get_info");
const lists = document.getElementById("lists");

const charEndpoint = "https://www.breakingbadapi.com/api/character/random";
const quoteEndpoint = `https://www.breakingbadapi.com/api/quote/random?author=Skyler+White`;

console.log(getInfo);
getInfo.addEventListener("click", () => clickHandler()); //bitchボタン押したらfetchinfo関数が呼ばれる

// import axios from 'axios'

const dataFetching = async () => {
  //how to declare the async function

  const charEndpoint = "https://www.breakingbadapi.com/api/character/random";
  const quoteEndpoint = `https://www.breakingbadapi.com/api/quote/random?author=`;

  //fetch character data👌
  const response = await axios(charEndpoint); //await: 非同期実行するメソッドの完了を待つ

  //only retrieve the data part of the response (due to axios)
  const charData = response.data[0];
  // console.log(charData);
  //extract the character's name from the object and assign to a variable
  let charaName = charData.name.replaceAll(" ", "+");

  //fetch the quote with the character's name as author's value　　　//autherと結合
  const charaQuote = await axios(quoteEndpoint + charaName); //url繋いでるだけ
  // console.log(charaQuote);
  //insert a property called `quote` in charData object
  //if charaQuote is undefined (character has no quote), assign an empty object
  charData.quote = charaQuote.data[0] || {};

  //return the character object with quote property added
  // console.log(charData);
  return charData;
};

//mock function of a callback function in an eventlistener
function clickHandler() {
  dataFetching().then((response) => {
    const h2 = document.createElement("h2");
    const name = document.createElement("li");
    const nickname = document.createElement("li");
    const pic = document.createElement("img");
    h2.classList.add("h2");
    name.classList.add("li");
    nickname.classList.add("li");
    h2.textContent = "Nickname";
    name.textContent = response.name;
    nickname.textContent = response.nickname;
    pic.src = response.img;

    lists.appendChild(name);
    lists.appendChild(h2);
    lists.appendChild(nickname);
    lists.appendChild(pic);
  });
}

//this will invoke the mock function above
// clickHandler();

//Get quotesからURLをもう１度取って、autherを{}を埋め込む
//とりあえずボタン押したらキャラクターの情報とquatesをゲットしたい
//search機能もつけたい
