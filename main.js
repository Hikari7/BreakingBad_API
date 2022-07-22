const getInfo = document.querySelector(".get_info");
const fetched_info = document.querySelector(".fetched_info");
// const infoWrap = document.getElementById("lists");

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
  let charaQuote = await axios(quoteEndpoint + charaName); //url繋いでるだけ

  //insert a property called `quote` in charData object
  //if charaQuote is undefined (character has no quote), assign an empty object
  charData.quote = charaQuote.data[0] || {};
  console.log(charData.quote);

  //return the character object with quote property added
  console.log(charData.quote); //[object, object]
  return charData;
};

function clickHandler() {
  dataFetching().then((response) => {
    let isClicked = false;
    // lists.textContent = "";
    fetched_info.textContent = "";
    // lists.textContent = "";
    // const lists = document.getElementsByClassName("lists");
    // console.log(lists);
    //DOM操作
    const pic = document.createElement("img");
    pic.classList.add("char_pic");
    pic.classList.add("pic_wrap");

    const h2 = document.createElement("h2");
    h2.classList.add("h2");
    h2.textContent = "Nickname";

    // console.log(infoWrap);
    const lists = document.createElement("div"); //infoの方のdiv

    const name = document.createElement("li");
    const nickname = document.createElement("li");
    const birthday = document.createElement("li");
    const occupation = document.createElement("li");
    const quote = document.createElement("li");
    const buttonToggle = document.createElement("button");
    // infoWrap.classList.add("lists");

    buttonToggle.addEventListener("click", (index) => {
      isClicked = !isClicked;
      if (isClicked) {
        console.log("Hey");
        lists.classList.add("lists-active");
      } else {
        console.log("No Hey");
        lists.classList.remove("lists-active");
      }
    });

    name.classList.add("list-name");
    nickname.classList.add("list-nickname");
    birthday.classList.add("list-bday");
    occupation.classList.add("list-occupation");
    quote.classList.add("list-quote");
    buttonToggle.classList.add("button-toogle");
    name.textContent = response.name;
    nickname.textContent = response.nickname;
    birthday.textContent = response.birthday;
    occupation.textContent = response.occupation;
    // JSON.stringify(response.quote)
    quote.textContent = response.quote?.quote; //[object object]
    // console.log(response.charaQuote);
    pic.setAttribute("src", `${response.img}`);
    lists.classList.add("lists");
    lists.appendChild(h2);
    lists.appendChild(name);
    lists.appendChild(nickname);
    lists.appendChild(birthday);
    lists.appendChild(occupation);
    lists.appendChild(quote);
    // console.log(quote);
    fetched_info.appendChild(pic);

    fetched_info.appendChild(lists);
    fetched_info.appendChild(buttonToggle);
  });
}
