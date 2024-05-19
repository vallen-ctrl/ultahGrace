window.addEventListener("load", async (a) => {
    renderElemen(await getMessage());
  });
  async function postMassage() {
    var myHeaders = new Headers();
    myHeaders.append(
      "Cookie",
      "NID=514=uWynju8Bb59Wzgi3FY9tKqqlxvGf8Wyqk_n7KqXgNr9K3ECjhuXv81vOibKTvfbJCIeeFmDualV02itRs5sMmJ-QomuY_ZY7HM61dH9hGwNG5L0x2b9gjSmXL_ydwFWeaP5QfA94rk2KQEsGJtzEg8uMVFk5K2zzqAU0av3FM0E"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const userName =
      document.getElementById("username").value.split(" ") == []
        ? "anonimus"
        : document.getElementById("username").value.split(" ").join("+");
    const userMessage = document
      .getElementById("message")
      .value.split(" ")
      .join("+");
    console.log(userName);
    console.log(userMessage);

    const url = `https://docs.google.com/forms/d/e/1FAIpQLSeTWWrtp_HHAdX-H4teXSEQnQ-K2oT9xr0xpdGstJ01q6_nUw/formResponse?usp=pp_url&entry.1407603725=${userName}&entry.184409190=${userMessage}`;
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  async function getMessage() {
    var myHeaders = new Headers();
    myHeaders.append(
      "Cookie",
      "NID=514=uWynju8Bb59Wzgi3FY9tKqqlxvGf8Wyqk_n7KqXgNr9K3ECjhuXv81vOibKTvfbJCIeeFmDualV02itRs5sMmJ-QomuY_ZY7HM61dH9hGwNG5L0x2b9gjSmXL_ydwFWeaP5QfA94rk2KQEsGJtzEg8uMVFk5K2zzqAU0av3FM0E"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let a = await fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ92H2prTbLB2zBfZ7XN4r5zkdtNcPF_neRD6QYxPs4XZSPfrym7pn72NWEbFZYMA6pukkSgpIwt8BP/pub?gid=847515822&single=true&output=csv",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const messages_raw = result.split("\n");
        const messages_clean = () => {
          let a = [];
          messages_raw.forEach((f) => {
            a.push(f.split(",").slice(1));
          });
          return a.slice(1);
        };
        let b = messages_clean();
        return b;
      })
      .catch((error) => console.log("error", error));

    return a;
  }

  function renderElemen(elemen = Array) {
    let elements = [];
    let lenght = elemen.length;
    for (let i = 0; i < lenght; i++) {
      let outer = document.createElement("div");
      let username = document.createElement("h5");
      let message = document.createElement("p");

      let data_username = elemen[i][0] == "" ? "anonimus" : elemen[i][0];
      let data_message = elemen[i][1];
      username.innerText = data_username;
      message.innerText = data_message;

      outer.appendChild(username);
      outer.appendChild(message);
      elements.push(outer);
    }

    let messages = document.getElementById("messages");
    for (let i = 0; i < elements.length; i++) {
      messages.appendChild(elements[i]);
    }
  }