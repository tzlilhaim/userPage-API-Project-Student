class UserPages {
  constructor() {
    this.userPages = []
  }
  addUserPage(userPage) {
    this.userPages.push(userPage)
  }
  getAllPages() {
    return this.userPages
  }
  clearData() {
    this.userPages = []
  }
}

class UserPage {
  constructor(userData) {
    this._userInfo = userData.userInfo
    this._friends = userData.friends
    this._kwQuote = userData.kwQuote
    this._pokemon = userData.pokemon
    this._loremIpsum = userData.loremIpsum
  }
}

class LocalStorageManager {
  constructor() {
    this.isEmpty = localStorage.getItem("users") === null ? true : false
  }
  saveUsersToLS(userPagesArr) {
    let existingUsersLS = []
    this.isEmpty? null : (existingUsersLS = this.getAllUserPagesFromLS())
    existingUsersLS.push(...userPagesArr)
    existingUsersLS.reverse()
    const users = JSON.stringify(existingUsersLS)
    localStorage.setItem("users", users)
    this.isEmpty = false
  }
  clearUsersFromLS() {
    localStorage.removeItem("users")
    this.isEmpty = true
  }
  getAllUserPagesFromLS() {
    return JSON.parse(localStorage.getItem("users") || "{}")
  }
  getUserDataFromLS(fullName) {
    const allSavedPages = this.getAllUserPagesFromLS()
    const splittedName = fullName.split(" ")
    const userPageData = allSavedPages.find(
      (up) =>
        up._userInfo.firstName === splittedName[0] &&
        up._userInfo.lastName === splittedName[1]
    )
    return userPageData
  }
}

const saveUserPageToLS = function (userData) {
  userPages.addUserPage(new UserPage(userData))
  localStorageManager.saveUsersToLS(userPages.getAllPages())
}
