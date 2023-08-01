    let storagedUsers = []
    let verifyStoragedUsers = localStorage.getItem("@ThiagoBettinRamos/gitSearch:storagedUsers")
    if(verifyStoragedUsers){
        storagedUsers = JSON.parse(verifyStoragedUsers)
    }
    

async function getUserData(user){
    let jsonData;
    buttonUser.innerHTML = `<img src="../img/spinner.png">`
    try{
        let requisition = await fetch(`https://api.github.com/users/${user}`)
        jsonData = await requisition.json()
    }
    finally{
        buttonUser.innerHTML = "Ver perfil do github"
    }
    return await jsonData
}

async function getUserRepos(user){
    let jsonData;
    let repos = []
    try{
        let requisition = await fetch(`https://api.github.com/users/${user}/repos`)
        jsonData = await requisition.json()
    }
    finally{
        return await jsonData
    }
}

async function getUser(user){
    let userData  = await getUserData(user)
    let userRepos = await getUserRepos(user)
    if(!userData.name){
        let alert = document.querySelector(".user-not-find")
        if(!alert){
            inputUser.insertAdjacentHTML("afterend", `
            <span class="user-not-find font-text-2 color-alert">Usuário não encontrado</span>
            `)
        }
        return console.log("Usuário não encontrado")
}
    let filteredRepos = await  userRepos.map(repository => {
            let newRepo   = {
                name        : repository.name,
                description : repository.description,
                url         : repository.html_url,
                page_url    : `https://${user}.github.io/${repository.name}/`
            }
            return newRepo
        })
        let data = {
            avatar : userData.avatar_url,
            name   : userData.name,
            bio    : userData.bio,
            login  : userData.login,
            email  : userData.email,
            repos  : filteredRepos
        }
        storagedUsers.push(data)
        localStorage.setItem("@ThiagoBettinRamos/gitSearch:storagedUsers", JSON.stringify(storagedUsers))
        localStorage.setItem("@ThiagoBettinRamos/gitSearch:currentUser", JSON.stringify(data))
        window.location.assign("../profile/index.html")
}


