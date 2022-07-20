const getInfo = document.querySelector(".get_info");
const lists = document.querySelector(".lists");
const endpoint = "https://www.breakingbadapi.com/api/character/random";
const fetched_info = document.querySelector(".fetched_info");
const char_pic = document.querySelector(".char_pic")
//btn for get randam character
getInfo.addEventListener("click", () => getinfo()); //bitchボタン押したらfetchinfo関数が呼ばれる

async function getinfo() {
  //   Response オブジェクトから JSON の本文の内容を抽出するには、 json() メソッドを使用
  const res = await fetch(endpoint);
  const chars = await res.json();
  console.log(chars);

  //DOM操作
  //characters全部を出力するならforEach使えばいいと思う
  lists.textContent = "";
  fetched_info.textContent = "";
  chars.forEach(function (char) {
    const pic = document.createElement("img");
    pic.classList.add("char_pic");

    // const h2 = document.createElement("h2");
    // h2.textContent = "Nickname";
    // h2.classList.add("h2");

    const name = document.createElement("li");
    const nickname = document.createElement("li");
    const birthday = document.createElement("li");
    const occupation = document.createElement("li");
    // h2.classList.add("h2");
    name.classList.add("list");
    nickname.classList.add("list");
    birthday.classList.add("list");
    occupation.classList.add("list");
    // h2.textContent = "Nickname";
    name.textContent = char.name;
    nickname.textContent = char.nickname;
    birthday.textContent = char.birthday;
    occupation.textContent = char.occupation;
    pic.setAttribute("src", `${char.img}`);
    // console.log(pic);
    // console.log(nickname);

    // lists.appendChild(h2);
    lists.appendChild(name);
    lists.appendChild(nickname);
    lists.appendChild(birthday);
    lists.appendChild(occupation);
    console.log(name);
    fetched_info.appendChild(pic);
  });
}
