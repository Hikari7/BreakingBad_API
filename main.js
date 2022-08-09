const getInfo = document.querySelector(".get_info");
const searchInfo = document.querySelector(".search");
const lists = document.createElement("div");
const list = document.createElement("ul");
const wrap_name = document.querySelector(".wrap_name");
const fetched_info = document.querySelector(".fetched_info");
searchInfo.addEventListener("change", () => showChars());

const searchData = async () => {
  const allChar = await axios.get(
    "https://www.breakingbadapi.com/api/characters"
  );
  const resData = allChar.data;
  let putValue = searchInfo.value;
  let text = putValue.slice(0, 1).toUpperCase() + putValue.slice(1);
  let searchResult = resData.filter((char) => char.name.includes(text));
  return searchResult;
};

function showChars() {
  let isClicked = false;
  fetched_info.textContent = "";
  wrap_name.textContent = "";

  const datas = [
    searchData().then((searchResult) => {
      const searChar = searchResult.map((char, index) => {
        const pic = document.createElement("img");
        pic.classList.add("pic_wrap");
        const ul_name = document.createElement("div");
        const ul_nickname = document.createElement("div");
        const ul_birthday = document.createElement("div");
        const ul_occupation = document.createElement("div");
        const fetched_info = document.querySelector(".fetched_info");

        //infoの見出し
        const head_name = document.createElement("p");
        const head_nickname = document.createElement("p");
        const head_birthday = document.createElement("p");
        const head_occupation = document.createElement("p");

        //create divs for dynamic
        const dynamicLists = document.createElement("div");
        const dynamicContainer = document.createElement("div");
        const dynamicWrapName = document.createElement("div");

        dynamicLists.classList.add("dynamic_lists");
        dynamicContainer.classList.add("dynamic_container");
        dynamicWrapName.classList.add("dynamic_wrap_name");
        dynamicContainer.setAttribute("name", "container" + index);

        const buttonToggle = document.createElement("button");
        buttonToggle.classList.add("button-toogle");

        ul_name.classList.add("list-name");
        ul_nickname.classList.add("list-name");
        ul_birthday.classList.add("list-name");
        ul_occupation.classList.add("list-name");

        head_name.classList.add("list");
        head_nickname.classList.add("list");
        head_birthday.classList.add("list");
        head_occupation.classList.add("list");

        head_name.textContent = "Name: ";
        head_nickname.textContent = "Nickname: ";
        head_birthday.textContent = "birthday: ";
        head_nickname.textContent = "Nickname: ";
        head_birthday.textContent = "Birthday: ";
        head_occupation.textContent = "Occupation: ";

        const name = document.createElement("li");
        const nickname = document.createElement("li");
        const birthday = document.createElement("li");
        const occupation = document.createElement("li");

        name.classList.add("list");
        nickname.classList.add("list-nickname");
        birthday.classList.add("list-bday");
        occupation.classList.add("list-occupation");
        dynamicContainer.style.position = "relative";
        pic.style.position = "relative";

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
            dynamicLists.classList.add("dynamic-lists-active");
            console.log("Hey");
          } else {
            dynamicLists.classList.remove("dynamic-lists-active");
            console.log("No Hey");
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

        //container > pic/lists > wrapname
        fetched_info.appendChild(dynamicContainer);

        dynamicContainer.appendChild(pic);
        dynamicContainer.appendChild(dynamicLists);
        dynamicContainer.appendChild(buttonToggle);

        dynamicLists.appendChild(dynamicWrapName);

        dynamicWrapName.appendChild(ul_name);
        dynamicWrapName.appendChild(ul_nickname);
        dynamicWrapName.appendChild(ul_birthday);
        dynamicWrapName.appendChild(ul_occupation);
      });
    }),
  ];

  return datas;
}

getInfo.addEventListener("click", () => clickHandler());
const dataFetching = async () => {
  const charEndpoint = "https://www.breakingbadapi.com/api/character/random";
  const quoteEndpoint = `https://www.breakingbadapi.com/api/quote/random?author=`;

  const response = await axios(charEndpoint);
  const charData = response.data[0];

  let charaName = charData.name.replaceAll(" ", "+");
  let charaQuote = await axios(quoteEndpoint + charaName);

  charData.quote = charaQuote.data[0] || {};
  return charData;
};

function clickHandler() {
  dataFetching().then((response) => {
    let isClicked = false;
    fetched_info.textContent = "";
    wrap_name.textContent = "";

    const pic = document.createElement("img");
    pic.classList.add("char_pic");
    pic.classList.add("pic_wrap");

    const ul_name = document.createElement("div");
    const ul_nickname = document.createElement("div");
    const ul_birthday = document.createElement("div");
    const ul_occupation = document.createElement("div");
    const ul_quote = document.createElement("div");

    const head_name = document.createElement("p");
    const head_nickname = document.createElement("p");
    const head_birthday = document.createElement("p");
    const head_occupation = document.createElement("p");
    const head_quote = document.createElement("p");

    ul_name.classList.add("list-name");
    ul_nickname.classList.add("list-name");
    ul_birthday.classList.add("list-name");
    ul_occupation.classList.add("list-name");
    ul_quote.classList.add("list-name");

    head_name.classList.add("list");
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

    const name = document.createElement("li");
    const nickname = document.createElement("li");
    const birthday = document.createElement("li");
    const occupation = document.createElement("li");
    const quote = document.createElement("li");
    const buttonToggle = document.createElement("button");

    buttonToggle.addEventListener("click", (index) => {
      isClicked = !isClicked;
      if (isClicked) {
        lists.classList.add("lists-active");
      } else {
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
