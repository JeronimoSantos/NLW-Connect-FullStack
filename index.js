const app = document.getElementById("app");

const users = [
  {
    email: "jejedev@dev.com",
    phone: "999999999999",
    ref: 100,
    refBy: null
  },
  {
    email: "joejoedev@dev.com",
    phone: "99999999999",
    ref: 200,
    refBy: 100
  },
  {
    email: "juejuedev@dev.com",
    phone: "99999999999",
    ref: 300,
    refBy: 200
  }
]

const getUser = (userData) => {
  return users.find((user) => {
    return user.email == userData.email
  })
}

const getTotalSubscribers = (userData) => {
  const subs = users.filter((user) => {
    return user.refBy == userData.ref
  })
  return subs.length
}

const showInvite = (userData) => {
  app.innerHTML = 
  `
    <main>
      <h3>Incrição confirmada!</h3>
        <p>
          Convide mais pessoas e concorra a prêmios! 
          <br/>
          Compartilhe o link e acompanhe as incrições.
        </p>
      <section class="input-group">
        <label for="link">
          <img src="link.svg" alt="Link icon"/>
        </label>
        <input type="text" id="link" value="https://evento.com?ref=${userData.ref}" disabled/>
      </section>
    </main>

    <section id="stats">
      <h4>${getTotalSubscribers(userData)}</h4>
      <p class="ins-feitas">Inscrições Feitas</p>
    </section>
  `
  app.setAttribute('class', 'page-invite')
  upadateImageLinks();
}

const saveUser = (userData) => {
  const meuUser = {
    ...userData,
    ref: Math.round(Math.random() * 4000),
    refBy: 100
  }
  users.push(meuUser)
  return meuUser
}

const formAction = () => {
  const form = document.getElementById("form");
  form.onsubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(form);
    const userData = {
      email: formData.get('email'),
      phone: formData.get('phone'),
    } 

    const user = getUser(userData) 
    if (user) {
      showInvite(user)
    } else {
      const meuUser = saveUser(userData)
      showInvite(meuUser)
    }
  }
}

const upadateImageLinks = () => {
  document.querySelectorAll("img").forEach((img) => {
    if (img.src.includes("githubusercontent")) {
      return
    }

    const src = img.getAttribute("src");

    img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`
  })
}

const startApp = () => {
  const content =
  `
    <main>
      <section class="about">
        <section class="section-header">
          <h2>Sobre o evento</h2>
          <span class="badge">AO VIVO</span>
        </section>
          <p>
            Um evento feito por e para pessoas desenvolvedoras apaixonadas por criar soluções inovadoras e compartilhar conhecimento. Vamos mergulhar nas tendências mais recentes em desenvolvimento de software, arquitetura de sistemas e tecnologias emergentes, com palestras, workshops e hackathons.
            <br/><br/>
            Dias 15 a 17 de março | Das 18h às 21h | Online &amp; Gratuit
          </p>
      </section>

      <section class="registration">
        <h2>Inscrição</h2>

        <form id="form">
          <section class="input-wrapper">
            <section class="input-group">
              <label for="email">
                <img src="mail.svg" alt="Email icon"/>
                <input type="email" name="email" id="email" placeholder="E-email"/>
              </label>
            </section>

            <section class="input-group">
              <label for="phone">
                <img src="phone.svg" alt="Phone icon" class="icon-button"/>
                <input type="text" name="phone" id="phone" placeholder="Telefone"/>
              </label>
            </section>

            <button>
              Confirmar
              <img src="arrow.svg" alt="Arrow right"/>
            </button>
          </section>
        </form>
      </section>
    </main>
`

app.innerHTML = content
app.setAttribute('class', 'page-start')
upadateImageLinks();
formAction();
}

startApp();

document.getElementById("logo").onclick = () => startApp();
