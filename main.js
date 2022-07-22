const getInfo = document.querySelector(".get_info");
const fetched_info = document.querySelector(".fetched_info");
const infoWrap = document.getElementById("lists");

getInfo.addEventListener("click", () => clickHandler()); //bitchボタン押したらfetchinfo関数が呼ばれる

// import axios from 'axios'
const dataFetching = async () => {
  //how to declare the async function

  const charEndpoint = "https://www.breakingbadapi.com/api/character/random";
  const quoteEndpoint = `https://www.breakingbadapi.com/api/quote/random?author=`;
  //fetch character data
  const response = await axios(charEndpoint);
  //await: 非同期実行するメソッドの完了を待つ,axiousは簡単にfetchできるコンポーネント

  //only retrieve the data part of the response (due to axios)
  const charData = response.data[0];
  //extract the character's name from the object and assign to a variable
  let charaName = charData.name.replaceAll(" ", "+");

  //fetch the quote with the character's name as author's value　　　//autherと結合
  const charaQuote = await axios(quoteEndpoint + charaName); //url繋いでるだけ

  //insert a property called `quote` in charData object
  //if charaQuote is undefined (character has no quote), assign an empty object
  charData.quote = charaQuote.data[0] || {};
console.log(charData.quote );
  //return the character object with quote property added
  return charData;
};

function clickHandler() {
  dataFetching().then((response) => {
    // lists.textContent = "";
    fetched_info.textContent = "";
    //DOM操作
    const pic = document.createElement("img");
    pic.classList.add("char_pic");
    pic.classList.add("pic_wrap");

    const h2 = document.createElement("h2");
    h2.classList.add("h2");
    h2.textContent = "Nickname";

    // console.log(infoWrap);

    const name = document.createElement("li");
    const nickname = document.createElement("li");
    const birthday = document.createElement("li");
    const occupation = document.createElement("li");
    const quote = document.createElement("li");

    // infoWrap.classList.add("lists");

    name.classList.add("list");
    nickname.classList.add("list");
    birthday.classList.add("list");
    occupation.classList.add("list");
    quote.classList.add("list");

    name.textContent = response.name;
    nickname.textContent = response.nickname;
    birthday.textContent = response.birthday;
    occupation.textContent = response.occupation;
    quote.textContent = response.charaQuote ;
    console.log(quote);
    pic.setAttribute("src", `${response.img}`);


    fetched_info.appendChild(h2);
    fetched_info.appendChild(name);
    fetched_info.appendChild(nickname);
    fetched_info.appendChild(birthday);
    fetched_info.appendChild(occupation);
    fetched_info.appendChild(quote);
console.log(quote);
    fetched_info.appendChild(pic);
  });
}
