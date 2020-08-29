// Instances Definition
const apiManager = new APIManager()
const userPages = new UserPages()
const localStorageManager = new LocalStorageManager()
const renderer = new Renderer()

if (localStorageManager.isEmpty) {
  renderer.hideLoadUserPageMenu()
} else {
  const userPagesFromLS = localStorageManager.getAllUserPagesFromLS()
  renderLoadUserPageSection(userPagesFromLS)
}

$(".buttons").on("click", "button:contains('Load User Data')", function () {
  loadNewUserData()
  const $loadUserDataBtn = $("button:contains('Load User Data')")
  const $displayDataBtn = $("button:contains('Display User')")
  renderer.showLoadingAwaitingUserData($loadUserDataBtn, $displayDataBtn)
})

$(".buttons").on("click", "button:contains('Display User')", function () {
  const newUserData = apiManager.data
  renderUserData(newUserData)
  const $saveUserPageBtn = $("button:contains('Save User Page')")
  renderer.enableBtn($saveUserPageBtn)
  const $loadUserPageBtn = $("button:contains('Load User Page')")
  renderer.enableBtn($loadUserPageBtn)
})

$(".buttons").on("click", "button:contains('Save User Page')", function () {
  const currUserData = renderer.captureCurrentUser()
  saveUserPageToLS(currUserData)
  const $saveUserPageBtn = $("button:contains('Save User Page')")
  renderer.disableBtn($saveUserPageBtn)
  const userPagesFromLS = localStorageManager.getAllUserPagesFromLS()
  renderLoadUserPageSection(userPagesFromLS)
})

$("#load-user-page-menu").on(
  "click",
  "button:contains('Load User Page')",
  function () {
    const selectedUserName = $("select option:selected").val()
    const selectedUserData = localStorageManager.getUserDataFromLS(
      selectedUserName
    )
    renderUserData(selectedUserData)
    const $saveUserPageBtn = $("button:contains('Save User Page')")
    const $loadUserPageBtn = $("button:contains('Load User Page')")
    renderer.disableBtn($saveUserPageBtn)
    renderer.disableBtn($loadUserPageBtn)

    $("#select-user-page").on("change", function () {
      renderer.enableBtn($loadUserPageBtn)
    })
  }
)
