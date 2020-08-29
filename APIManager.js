class APIManager {
  constructor() {
    this.data = {}
  }

  callApis(apiManager) {
    $.ajax({
      url: "https://randomuser.me/api/?results=7",
      success: function (response) {
        let userData = response.results[0]
        userData = {
          imageURL: userData.picture.medium,
          firstName: userData.name.first,
          lastName: userData.name.last,
          cityState: userData.location.city + "," + userData.location.state,
        }
        let friendsData = response.results.slice(1)
        friendsData = friendsData.map((m) => {
          return { firstName: m.name.first, lastName: m.name.last }
        })
        apiManager.data["_userInfo"] = userData
        apiManager.data["_friends"] = friendsData
      },
      error: (xhr, text, error) =>
        alert(
          text +
            ": Couldn't load users data due to some error, Please refresh the page to try again"
        ),
    })
    $.ajax({
      url: "https://api.kanye.rest",
      dataType: "json",
      success: function (response) {
        let kwQuoteData = { title:"Favorite quote:", text: `"` + response.quote + `"`, by: "Kanye West" }
        apiManager.data["_kwQuote"] = kwQuoteData
      },
      error: (xhr, text, error) =>
        alert(
          text +
            ": Couldn't load user's quote due to some error, Please refresh the page to try again"
        ),
    })

    $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon/${
        Math.floor(Math.random() * 896) + 1
      }`,
      dataType: "json",
      success: function (response) {
        let pokemonData = {
          pokeName: response.name,
          imageURL: response.sprites.front_default,
        }
        apiManager.data["_pokemon"] = pokemonData
      },
      error: (xhr, text, error) =>
        alert(
          text +
            ": Couldn't load user's pokemon due to some error, Please refresh the page to try again"
        ),
    })
    $.ajax({
      url: "https://hipsum.co/api/?type=hipster-centric&sentences=3",
      dataType: "json",
      success: function (response) {
        let loremIpsumData = { text: response[0] }
        apiManager.data["_loremIpsum"] = loremIpsumData
      },
      error: (xhr, text, error) =>
        alert(
          text +
            ": Couldn't user's about section due to some error, Please refresh the page to try again"
        ),
    })
  }

  clearData() {
    this.data = {}
  }
  getData(cb) {
    cb(this)
    return this.data
  }
}

const loadNewUserData = function () {
  apiManager.clearData()
  apiManager.getData(apiManager.callApis)
}
