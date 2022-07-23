const getInfo = document.querySelector(".get_info");
const fetched_info = document.querySelector(".fetched_info");

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
    fetched_info.textContent = "";

    //DOM操作
    const pic = document.createElement("img");
    pic.classList.add("char_pic");
    pic.classList.add("pic_wrap");

    //スタイリングのためのdivとul
    const lists = document.createElement("div"); //infoの方のdiv
    // const list = document.createElement("ul"); //infoの方のdiv
    const ul_name = document.createElement("div"); //infoのdivの中のul
    const ul_nickname = document.createElement("div"); //infoのdivの中のul
    const ul_birthday = document.createElement("div"); //infoのdivの中のul
    const ul_occupation = document.createElement("div"); //infoのdivの中のul
    const ul_quote = document.createElement("div"); //infoのdivの中のul

    //infoの見出し
    const head_name = document.createElement("p"); //p作る //ulの子供
    const head_nickname = document.createElement("p");
    const head_birthday = document.createElement("p");
    const head_occupation = document.createElement("p");
    const head_quote = document.createElement("p");

    ul_name.classList.add("list-name");
    ul_nickname.classList.add("list-name");
    ul_birthday.classList.add("list-name");
    ul_occupation.classList.add("list-name");
    ul_quote.classList.add("list-name");

    head_name.classList.add("list"); //ulの子供
    head_nickname.classList.add("list");
    head_birthday.classList.add("list");
    head_occupation.classList.add("list");
    head_quote.classList.add("list");

    head_name.textContent = "Name";
    head_nickname.textContent = "Nickname";
    head_birthday.textContent = "birthday";
    head_nickname.textContent = "Nickname";
    head_birthday.textContent = "Birthday";
    head_occupation.textContent = "Occupation";
    head_quote.textContent = "Quote";

    //Fetchで取ってきた情報
    const name = document.createElement("li");
    const nickname = document.createElement("li");
    const birthday = document.createElement("li");
    const occupation = document.createElement("li");
    const quote = document.createElement("li");
    const buttonToggle = document.createElement("button");

    buttonToggle.addEventListener("click", (index) => {
      isClicked = !isClicked;
      if (isClicked) {
        console.log("Hey");
        lists.classList.remove("lists-active");
      } else {
        console.log("No Hey");
        lists.classList.add("lists-active");
      }
    });

    name.classList.add("list");
    nickname.classList.add("list-nickname");
    birthday.classList.add("list-bday");
    occupation.classList.add("list-occupation");
    quote.classList.add("list-quote");

    buttonToggle.classList.add("button-toogle");

    name.textContent = response.name;
    nickname.textContent = response.nickname;
    birthday.textContent = response.birthday;
    occupation.textContent = response.occupation;
    quote.textContent = response.quote?.quote; //[object object]
    pic.setAttribute("src", `${response.img}`);
    lists.classList.add("lists");

    ul_name.appendChild(head_name);
    ul_nickname.appendChild(head_nickname);
    ul_birthday.appendChild(head_birthday);
    ul_occupation.appendChild(head_occupation);
    ul_quote.appendChild(head_quote);

    ul_name.appendChild(name);
    ul_nickname.appendChild(nickname);
    ul_birthday.appendChild(birthday);
    ul_occupation.appendChild(occupation);
    ul_quote.appendChild(quote);

    fetched_info.appendChild(pic);
    fetched_info.appendChild(lists);
    fetched_info.appendChild(buttonToggle);
    lists.appendChild(ul_name);
    lists.appendChild(ul_nickname);
    lists.appendChild(ul_birthday);
    lists.appendChild(ul_occupation);
    lists.appendChild(ul_quote);
  });
}
