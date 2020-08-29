class Renderer {
  constructor() {
    this._userInfo = {
      $templateSource: $("#user-info-template"),
      $viewElement: $(".user-container"),
      data: {},
    }
    this._friends = {
      $templateSource: $("#friends-template"),
      $viewElement: $(".friends-container"),
      data: {},
    }
    this._kwQuote = {
      $templateSource: $("#quote-template"),
      $viewElement: $(".quote-container"),
      data: {},
    }
    this._pokemon = {
      $templateSource: $("#pokemon-template"),
      $viewElement: $(".pokemon-container"),
      data: {},
    }
    this._loremIpsum = {
      $templateSource: $("#lorem-ipsum-template"),
      $viewElement: $(".lorem-ipsum-container"),
      data: {},
    }
    this._userPagesSelect = {
      $templateSource: $("#user-page-option-template"),
      $viewElement: $("#select-user-page"),
    }
    this._loadingStateBtn = {$templateSource: $("#loading-state-btn-template")}
  }
  getTemplateHTML(dataType, data) {
    const source = dataType.$templateSource.html()
    const template = Handlebars.compile(source)
    const newHTML = template({ data })
    return newHTML
  }

  renderUserInfo(userData) {
    this._userInfo.data = userData
    const newHTML = this.getTemplateHTML(this._userInfo, userData)
    this._userInfo.$viewElement.append(newHTML)
  }
  renderFriends(friendsData) {
    this._friends.data = friendsData
    const newHTML = this.getTemplateHTML(this._friends, friendsData)
    this._friends.$viewElement.append(newHTML)
  }
  renderkwQuote(kwQuoteData) {
    this._kwQuote.data = kwQuoteData
    const newHTML = this.getTemplateHTML(this._kwQuote, kwQuoteData)
    this._kwQuote.$viewElement.append(newHTML)
  }
  renderPokemon(pokemonData) {
    this._pokemon.data = pokemonData
    const newHTML = this.getTemplateHTML(this._pokemon, pokemonData)
    this._pokemon.$viewElement.append(newHTML)
  }
  renderLoremIpsum(loremIpsumData) {
    this._loremIpsum.data = loremIpsumData
    const newHTML = this.getTemplateHTML(this._loremIpsum, loremIpsumData)
    this._loremIpsum.$viewElement.append(newHTML)
  }

  renderView(data) {
    this.clearView()
    this.renderUserInfo(data._userInfo)
    this.renderFriends(data._friends)
    this.renderkwQuote(data._kwQuote)
    this.renderPokemon(data._pokemon)
    this.renderLoremIpsum(data._loremIpsum)
  }
  clearView() {
    this._userInfo.$viewElement.empty()
    this._friends.$viewElement.empty()
    this._kwQuote.$viewElement.empty()
    this._pokemon.$viewElement.empty()
    this._loremIpsum.$viewElement.empty()
  }
  captureCurrentUser() {
      debugger
    const userData = {
      userInfo: this._userInfo.data,
      friends: this._friends.data,
      kwQuote: this._kwQuote.data,
      pokemon: this._pokemon.data,
      loremIpsum: this._loremIpsum.data,
    }
    return userData === {} ? null : userData
  }
  renderUserPageOptions(userPagesArr) {
    this._userPagesSelect.$viewElement.empty()
    const newHTML = this.getTemplateHTML(this._userPagesSelect, userPagesArr)
    this._userPagesSelect.$viewElement.append(newHTML)
  }
  disableBtn($button) {
    $button.attr("disabled", true)
  }
  enableBtn($button) {
    $button.attr("disabled", false)
  }
  hideLoadUserPageMenu() {
    $("#load-user-page-menu").css("display", "none")
  }
  showLoadUserPageMenu() {
    $("#load-user-page-menu").css("display", "block")
  }
  showLoadingAwaitingUserData($loadUserDataBtn, $displayDataBtn = 0) {

    // Showing loading state for 2 seconds while data is retreived
    this.disableBtn($loadUserDataBtn)
    $displayDataBtn ? this.disableBtn($displayDataBtn) : null
    const btnText = $loadUserDataBtn.text()
    const newHTML = this.getTemplateHTML(this._loadingStateBtn, {text:"Loading..."})
    $loadUserDataBtn.html(newHTML)

    setTimeout(() => {
      $loadUserDataBtn.find(".i.fa-spinner").css("display", "none")
      $loadUserDataBtn.html(btnText)
      this.enableBtn($loadUserDataBtn)
      $displayDataBtn ? this.enableBtn($displayDataBtn) : null
    }, 2000)
  }
}

const renderUserData = function (data) {
  renderer.renderView(data)
}

const renderLoadUserPageSection = function (userPagesFromLS) {
  renderer.renderUserPageOptions(userPagesFromLS)
  renderer.showLoadUserPageMenu()
}
