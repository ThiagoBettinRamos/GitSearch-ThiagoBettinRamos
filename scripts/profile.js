const profileData = JSON.parse(localStorage.getItem("@ThiagoBettinRamos/gitSearch:currentUser"))
const header      = document.querySelector("header")
const ul          = document.querySelector("ul")

function renderProfiles(){
    let bio = fixBio()
    header.innerHTML = `    
    <div class="header-info">
    <img src="${profileData.avatar}">
  <div>
    <h3 class="font-title-2-bold color-grey-6">${profileData.name}</h3>
    <span class="font-title-4 color-grey-5">${bio}</span>
  </div>
  </div>
  <div class="header-button">
  <a href="mailto:${profileData.email}" target="_blank"><button class="email">Email</button></a>
    <a href="../index.html"><button class="change">Trocar de usuário</button></a>
  </div>`
    
    profileData.repos.forEach(repository => {
        let description = fixRepos(repository)
        ul.insertAdjacentHTML("beforeend", `
        <li class="card-box">
        <h3 class="font-title-3 color-grey-6">${repository.name}</h3>
        <h4 class="font-text-2 color-grey-5">${description}</h4>
        <div>
          <a href="${repository.url}" target="_blank"><button class="button-1 font-title-5">Repositório</button></a>
          <a href="${repository.page_url}" target="_blank"><button class="button-2 font-title-5">Demo</button></a>
        </div>
      </li>
        `)
  })
}


function fixBio(){
    let bio;
    if(profileData.bio === null){
        bio = ""
    }
    if(profileData.bio !== null){
        bio = profileData.bio.slice(0,29) + "..."
    }
    return bio
}

function fixRepos(repository){
    if(repository.description === null){
        repository.description = "Sem descrição."
    }
    return repository.description
}

renderProfiles()