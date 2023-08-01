const inputUser  = document.getElementById("usuário")
const buttonUser = document.getElementById("login")

inputUser.addEventListener("input", () => {
    if(inputUser.value === ""){
        buttonUser.classList = "login inactive"
    }
    else{
        buttonUser.classList = "login"
    }
    let alert = document.querySelector(".user-not-find")
    if(alert) alert.remove()
})

buttonUser.addEventListener("click", () => {
    let findUser = storagedUsers.find(user => user.login === inputUser.value)
    recentProfile(inputUser.value)
    if(findUser){
        localStorage.setItem("@ThiagoBettinRamos/gitSearch:currentUser", JSON.stringify(findUser))
        window.location.assign("../profile/index.html")
    }
    else{
        getUser(inputUser.value)
    }
})

