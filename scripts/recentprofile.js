let recentProfilesArr = []
let profilesUl = document.getElementById("recentProfileList")
let verifyRecentUsers = localStorage.getItem("@ThiagoBettinRamos/gitSearch:recentProfiles")
if (verifyRecentUsers) {
    recentProfilesArr = JSON.parse(verifyRecentUsers)
}

function recentProfile(user) {
    if (recentProfilesArr.length > 0) {
        recentProfilesArr = recentProfilesArr.filter(u => u !== user)
    }
    recentProfilesArr.unshift(user)
    if (recentProfilesArr.length > 3) {
        recentProfilesArr = recentProfilesArr.slice(0, 3)
    }
    localStorage.setItem("@ThiagoBettinRamos/gitSearch:recentProfiles", JSON.stringify(recentProfilesArr))
}

function renderRecentProfiles() {
    recentProfilesArr.forEach(user => {
        let findUser = storagedUsers.find(u => u.login === user)
        let li = document.createElement("li")
        let img = document.createElement("img")
        let span = document.createElement("span")

        img.src = findUser.avatar
        span.innerText = "Acessar este perfil"

        li.classList = "container-li"
        span.classList = "hidden"
        span.dataset.user = findUser.login

        li.append(img, span)
        profilesUl.append(li)

        span.addEventListener("click", (e) => {
            let findUser = storagedUsers.find(user => user.login === e.target.dataset.user)
            recentProfile(e.target.dataset.user)
            if (findUser) {
                localStorage.setItem("@ThiagoBettinRamos/gitSearch:currentUser", JSON.stringify(findUser))
                window.location.assign("../profile/index.html")
            }
        })
    })
}
renderRecentProfiles()
