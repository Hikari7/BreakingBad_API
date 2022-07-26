const getInfo = document.querySelector(".get_info");
const fetched_info = document.querySelector(".fetched_info");
const searchInfo = document.querySelector(".search");
const lists = document.createElement("div"); //infoの方のdiv
const list = document.createElement("ul"); //infoの方のdiv

searchInfo.addEventListener("change", () => showChar());

//filter the data which is searched
const searchData = async () => {
  const allChar = await axios.get(
    "https://www.breakingbadapi.com/api/characters"
  ); //全キャラクター用のAPI
  const resData = allChar.data; //全キャラクターのデータを取ってくる
  // console.log(resData);
  let putValue = searchInfo.value;
  let text = putValue.slice(0, 1).toUpperCase() + putValue.slice(1); //make to upperCase only the first letter
  let searchResult = resData.filter(
    (char) => char.name.includes(text) //keyupした値がキャラクターの名前に含まれているかフィルター
  );

  // console.log(searchResult); //keyupしたデータが返ってくる
  return searchResult;
};

function showChar() {
  searchData().then((searchResult) => {
    const searChar = searchResult.map((char) => {
      // fetched_info.textContent = "";
      console.log(char.name);
      const pic = document.createElement("img");
      pic.classList.add("char_pic");
      pic.classList.add("pic_wrap");

      // pic.setAttribute("src", `${char.img}`);
      // fetched_info.appendChild(pic);
      //一応名前は羅列することができたっぽい
      // console.log(char.name);
      // const name = document.createElement("li");
      // name.classList.add("list");
      // name.textContent = char.name;
      // fetched_info.appendChild(name);
      //===========const ul_name = document.createElement("div"); //infoのdivの中のul
      let isHoverd = false;
      const ul_name = document.createElement("div");
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

      head_name.textContent = "Name: ";
      head_nickname.textContent = "Nickname: ";
      head_birthday.textContent = "birthday: ";
      head_nickname.textContent = "Nickname: ";
      head_birthday.textContent = "Birthday: ";
      head_occupation.textContent = "Occupation: ";

      head_quote.textContent = "Quote: ";

      //Fetchで取ってきた情報
      const name = document.createElement("li");
      const nickname = document.createElement("li");
      const birthday = document.createElement("li");
      const occupation = document.createElement("li");
      const quote = document.createElement("li");
      const buttonToggle = document.createElement("button");

      buttonToggle.addEventListener("click", () => {
        isHoverd = !isHoverd;
        if (isHoverd) {
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

      name.textContent = char.name;
      nickname.textContent = char.nickname;
      birthday.textContent = char.birthday;
      occupation.textContent = char.occupation;
      pic.setAttribute("src", `${char.img}`);
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

    // console.log(pic);
  });
}

//search a character  データを返す関数
// function searchData() {
//   const characterData = dataFetching();
//   console.log(characterData);
//   const results = characterData.filter((char) =>
//     char.name.includes(searchInfo.value)
//   );
//   console.log(results);

//   // let search = searchInfo.value;
//   // dataFetching(search)

//   const result = charData.filter((char) => res.name);
//   console.log(result);
// });
// }

getInfo.addEventListener("click", () => clickHandler()); //bitchボタン押したらfetchinfo関数が呼ばれる
// import axios from 'axios'
const dataFetching = async () => {
  const charEndpoint = "https://www.breakingbadapi.com/api/character/random";
  const quoteEndpoint = `https://www.breakingbadapi.com/api/quote/random?author=`;

  const response = await axios(charEndpoint); //await: 非同期実行するメソッドの完了を待つ,axiousは簡単にfetchできるコンポーネント
  //only retrieve the data part of the response (due to axios)
  const charData = response.data[0]; //APIのDataの情報を取ってくる

  //extract the character's name from the object and assign to a variable
  let charaName = charData.name.replaceAll(" ", "+");
  //fetch the quote with the character's name as author's value　　　//autherと結合
  let charaQuote = await axios(quoteEndpoint + charaName); //url繋いでるだけ
  //insert a property called `quote` in charData object
  //if charaQuote is undefined (character has no quote), assign an empty object
  charData.quote = charaQuote.data[0] || {};
  return charData;
};

//get a random character
function clickHandler() {
  dataFetching().then((response) => {
    let isClicked = false;
    fetched_info.textContent = "";

    console.log(response);
    //DOM操作
    const pic = document.createElement("img");
    pic.classList.add("char_pic");
    pic.classList.add("pic_wrap");

    //スタイリングのためのdivとul
    // const lists = document.createElement("div"); //infoの方のdiv
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

    head_name.textContent = "Name: ";
    head_nickname.textContent = "Nickname: ";
    head_birthday.textContent = "birthday: ";
    head_nickname.textContent = "Nickname: ";
    head_birthday.textContent = "Birthday: ";
    head_occupation.textContent = "Occupation: ";

    head_quote.textContent = "Quote: ";

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
        // console.log("Hey");
        lists.classList.remove("lists-active");
      } else {
        // console.log("No Hey");
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
    pic.setAttribute("src", `${response.img}`);
    lists.classList.add("lists");

    if (response.quote.quote === {}) {
      quote.textContent = "Invalid option!";
    } else {
      quote.textContent = response.quote?.quote;
    }
    // quote.textContent = response.quote?.quote; //[object object]

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
