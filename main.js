const getInfo = document.querySelector(".get_info");

const searchInfo = document.querySelector(".search");
const lists = document.createElement("div"); //infoの方のdiv
const list = document.createElement("ul"); //infoの方のdiv
const wrap_name = document.querySelector(".wrap_name"); //ul_nameの親
const fetched_info = document.querySelector(".fetched_info");
searchInfo.addEventListener("change", () => showChars());

//filter the data which is searched
const searchData = async () => {
  const allChar = await axios.get(
    "https://www.breakingbadapi.com/api/characters"
  ); //全キャラクター用のAPI
  const resData = allChar.data; //全キャラクターのデータを取ってくる
  let putValue = searchInfo.value;
  let text = putValue.slice(0, 1).toUpperCase() + putValue.slice(1); //make to upperCase only the first letter
  let searchResult = resData.filter(
    (char) => char.name.includes(text) //keyupした値がキャラクターの名前に含まれているかフィルター
  );
  return searchResult; //changeしたデータが返ってくる
};

function showChars() {
  let isClicked = false;
  fetched_info.textContent = "";
  wrap_name.textContent = "";

  const datas = [
    searchData().then((searchResult) => {
      const searChar = searchResult.map((char, index) => {
        //map has iteration func
        const pic = document.createElement("img");
        pic.classList.add("pic_wrap");
        const ul_name = document.createElement("div");
        const ul_nickname = document.createElement("div"); //infoのdivの中のdiv(ulて書いてあるけどw)
        const ul_birthday = document.createElement("div"); //infoのdivの中のdiv
        const ul_occupation = document.createElement("div"); //infoのdivの中のdiv
        // const fetched_info = document.querySelector(".fetched_info");

        //infoの見出し
        const head_name = document.createElement("p"); //p作る //ulの子供
        const head_nickname = document.createElement("p");
        const head_birthday = document.createElement("p");
        const head_occupation = document.createElement("p");

        //create divs for dynamic
        const dynamicChar = document.createElement("div");
        const dynamicContainer = document.createElement("div");
        const dynamicWrapName = document.createElement("div");

        dynamicChar.classList.add("dynamic_char");
        dynamicContainer.classList.add("dynamic_container");
        dynamicWrapName.classList.add("dynamic_wrap_name");
        dynamicContainer.setAttribute("name", "container" + index);

        console.log(dynamicWrapName);
        // console.log(dynamicContainer);
        // console.log(dynamicWrapName);

        //bottun toggle====================================
        const buttonToggle = document.createElement("button");
        buttonToggle.classList.add("button-toogle");
        //====================================

        ul_name.classList.add("list-name");
        ul_nickname.classList.add("list-name");
        ul_birthday.classList.add("list-name");
        ul_occupation.classList.add("list-name");
        // fetched_info.classList.add("container " + index);

        head_name.classList.add("list"); //ulの子供
        head_nickname.classList.add("list");
        head_birthday.classList.add("list");
        head_occupation.classList.add("list");

        head_name.textContent = "Name: ";
        head_nickname.textContent = "Nickname: ";
        head_birthday.textContent = "birthday: ";
        head_nickname.textContent = "Nickname: ";
        head_birthday.textContent = "Birthday: ";
        head_occupation.textContent = "Occupation: ";

        //Fetchで取ってきた情報
        const name = document.createElement("li");
        const nickname = document.createElement("li");
        const birthday = document.createElement("li");
        const occupation = document.createElement("li");

        name.classList.add("list");
        nickname.classList.add("list-nickname");
        birthday.classList.add("list-bday");
        occupation.classList.add("list-occupation");
        dynamicChar.style.position = "relative";
        pic.style.position = "relative";

        console.log(dynamicChar);

        name.textContent = char.name;
        nickname.textContent = char.nickname;
        birthday.textContent = char.birthday;
        occupation.textContent = char.occupation;
        pic.setAttribute("src", `${char.img}`);
        lists.classList.add("lists");

        if (char.birthday == null) {
          birthday.textContent = "Invalid option!";
        } else {
          birthday.textContent = char.birthday;
        }

        buttonToggle.addEventListener("click", () => {
          isClicked = !isClicked;
          if (isClicked) {

            // dynamicWrapName.classList.add("lists-active");
            dynamicContainer.classList.add("dynamic-lists-active");
            console.log("Hey");
          } else {
            // dynamicWrapName.classList.remove("lists-active");
            dynamicContainer.classList.remove("dynamic-lists-active");

            console.log("No Hey");
            // lists.classList.add("lists-active");
          }
        });

        ul_name.appendChild(head_name);
        ul_nickname.appendChild(head_nickname);
        ul_birthday.appendChild(head_birthday);
        ul_occupation.appendChild(head_occupation);

        ul_name.appendChild(name);
        ul_nickname.appendChild(nickname);
        ul_birthday.appendChild(birthday);
        ul_occupation.appendChild(occupation);

        dynamicChar.appendChild(pic);
        // dynamicContainer.appendChild(lists);
        fetched_info.appendChild(dynamicChar);

        dynamicWrapName.appendChild(ul_name);
        dynamicWrapName.appendChild(ul_nickname);
        dynamicWrapName.appendChild(ul_birthday);
        dynamicWrapName.appendChild(ul_occupation);
        fetched_info.appendChild(buttonToggle);
        // dynamicContainer.appendChild(dynamicWrapName);
        dynamicContainer.appendChild(dynamicWrapName);
        dynamicChar.appendChild(dynamicContainer);
      });
    }),
  ];

  return datas;
}

//datasを配列にしてそこからnewmapにしてforeachで１つずつ処理できんもんかね
//(ボタン機能を各キャラクターにつけたい)

// let showChar = showChars();
// let data = new Map(showChar.datas);

// console.log(data);

// showChars.datas.forEach(showdata);
// function showdata(data){
//   console.log(data);
// }

// const buttonToggle = document.createElement("button");
// buttonToggle.classList.add("button-toogle");
// fetched_info.appendChild(buttonToggle);
// console.log(showChars);

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
  //クリックしたら発火
  dataFetching().then((response) => {
    let isClicked = false;
    fetched_info.textContent = "";
    wrap_name.textContent = "";

    //DOM操作
    const pic = document.createElement("img");
    pic.classList.add("char_pic");
    pic.classList.add("pic_wrap");

    //スタイリングのためのdivとul

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
        lists.classList.add("lists-active");
      } else {
        // console.log("No Hey");
        lists.classList.remove("lists-active");
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

    if (response.quote?.quote === undefined) {
      quote.textContent = "Invalid option!";
    } else {
      quote.textContent = response.quote?.quote;
    }

    if (response.birthday == null) {
      birthday.textContent = "Invalid option!";
    } else {
      birthday.textContent = response.birthday;
    }

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

    wrap_name.appendChild(ul_name);
    wrap_name.appendChild(ul_nickname);
    wrap_name.appendChild(ul_birthday);
    wrap_name.appendChild(ul_occupation);
    wrap_name.appendChild(ul_quote);

    lists.appendChild(wrap_name);
  });
}
