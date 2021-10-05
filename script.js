import { h, render } from './lib/preact.10.5.14.module.js'
import { useState, useEffect } from './lib/hooks.10.5.14.module.js'
import htm from './lib/htm.3.1.0.module.js'

const html = htm.bind(h)

function PersistentModal({ open, content, set_modal_state }) {
  const on_close = e => {
    set_modal_state({ open: false, content })
    e.stopPropagation()
  }

  useEffect(() => {
    if (open) {
      document.body.classList.add('noscroll')
    } else {
      document.body.classList.remove('noscroll')
    }
  }, [open])

  return html`
    <div class='modal-container ${open ? 'open' : ''}' onClick=${on_close}>
      <div class='modal' onClick=${e => e.stopPropagation()}>
        <a class='x-button' onClick=${on_close}>×</a>
        ${content}
      </div>
    </div>
  `
}

function ScientistProfile(props) {
  const { name, tagline, headshot_url, interactive, open_project_modal } = props

  return html`
    <div class='gallery-item scientist ${interactive ? 'interactive' : ''}' onClick=${open_project_modal}>
      <img
        alt=${name}
        src=${headshot_url}
        class='headshot'
        width=400
        height=400
        loading="lazy"
      />
      <div class='name'>${name}</div>
      ${interactive ? html`<div class='tagline'>${tagline}</div>` : ''}
    </div>
  `
}

const Scientists = ({ scientists, open_project_modal }) => (html`
  <div class='gallery'>
    ${
      scientists.map(s => ScientistProfile({
        ...s,
        interactive: true,
        open_project_modal: () => open_project_modal(s.tagline)
      }))
    }
  </div>
`)

function ContributeButton({ set_modal_state }) {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const referrer = urlParams.get("referrer")

  const on_click = () => {
    set_modal_state({
      open: true,
      content: html`
        <h2 class='center'>Contribute</h2>
        <div>
          <a class="donate-with-crypto"
            data-custom="NoblePrize|${referrer}"
            href="https://commerce.coinbase.com/checkout/0406db10-6b39-43fa-9662-3f973b2d4fc7">
            Coinbase Commerce
          </a>
          <script src="https://commerce.coinbase.com/v1/checkout.js?version=201807">
          </script>
        </div>
      `
    })
  }

  return html`
    <button disabled onClick=${on_click}>Coming Soon</button>
  `
}

function MedalSearch({ set_modal_state }) {
  const on_click = () => {
    set_modal_state({
      open: true,
      content: html`
      <h2 class='center'>View medal</h2>
      Launching soon
      `
    })
  }

  const on_submit = e => e.preventDefault();
  
  return html`
    <form class="medal-form" onSubmit=${on_submit}>
      <input placeholder="Search by e-mail, Twitter, ENS, or wallet address..." />
      <button onClick=${on_click}>View medal</button>
    </form>
  `
}

function Badge(props) {
  const { name, img_url } = props
  return html`
    <div class='gallery-item'>
      <img
        alt=${name}
        src=${img_url}
        class='badge'
        width=400
        height=400
        loading="lazy"
      />
      <div class='name'>${name}</div>
    </div>
  `
}

const Leaderboard = props => (html`
  <div class='gallery'>
    ${props.badges.map(Badge)}
  </div>
`)

const kariko_weissman_desc = html`
  <p>
    <b>Katalin Kariko</b> and <b>Drew Weissman</b> discovered how to make messenger RNA technology safe and stable in the early 2000s by modifying nucleosides, the building blocks of mRNA.
  </p>
  <p>
    mRNA-based therapies are designed from genetic sequences, allowing the COVID-19 vaccines to be quickly developed using the spike protein gene from SARS-CoV-2 as a blueprint.
  </p>
  <p>
    Read more about their work to modify mRNA in <a href="https://www.statnews.com/2020/11/10/the-story-of-mrna-how-a-once-dismissed-idea-became-a-leading-technology-in-the-covid-vaccine-race/">STAT News</a> and the <a href="https://www.nytimes.com/2021/04/08/health/coronavirus-mrna-kariko.html">New York Times.</a>
  </p>
`

const zhang_holmes_desc = html`
  <p>
    <b>Yong-Zhen Zhang</b>’s team determined the genome sequence of SARS-CoV-2 within 40 hours on January 5, 2020 and sent it to colleague <b>Eddie Holmes</b>, who <a href="https://virological.org/t/novel-2019-coronavirus-genome/319">released it publicly</a> 52 minutes after receiving it.
  </p>
  <p>
    Their expediency and transparency led to rapid global research into SARS-CoV-2, including the analysis and design of the spike protein sequence used for the vaccines.
  </p>
  <p>
    Read more about their work on the SARS-CoV-2 genome in <a href="https://time.com/5882918/zhang-yongzhen-interview-china-coronavirus-genome/">Time Magazine</a> and <a href="https://www.bbc.com/news/science-environment-55565284">BBC</a>.
  </p>
`
const spike_desc = html`
  <p>
    <b>Kizzmekia Corbett</b>, <b>Barney Graham</b>, <b>Jason McClellan</b>, <b>Nianshuang Wang</b>, and <b>Daniel Wrapp</b> designed the SARS-CoV-2 spike protein in early 2020 to train the immune system to recognize the virus.
  </p>
  <p>
    Based on past work with other viruses, the team replaced two amino acids to help stabilize the SARS-CoV-2 spike protein, which generated a stronger immune response.
  </p>
  <p>
    Read more about their work on the spike protein design in <a href="https://www.nationalgeographic.com/science/article/these-scientists-spent-twelve-years-solving-puzzle-yielded-coronavirus-vaccines">National Geographic</a> and <a href="https://www.washingtonpost.com/health/2020/11/17/coronavirus-vaccine-manufacturing/">Washington Post.</a>
  </p>
`

const lipid_nanoparticles_desc = html`
  <p>
    <b>Pieter Cullis</b> and <b>Ian MacLachlan</b> developed techniques in the 1990s and 2000s to package fragile genetic material, such as messenger RNA, inside small envelopes of fat known as lipid nanoparticles (LNPs). 
  </p>
  <p>
    These LNPs ensure that the mRNA is protected and delivered effectively into cells after injection.
  </p>
  <p>
    Read more about their work on LNPs in <a href="https://cen.acs.org/pharmaceuticals/drug-delivery/Without-lipid-shells-mRNA-vaccines/99/i8">Chemical & Engineering News</a> and <a href="https://www.forbes.com/sites/nathanvardi/2021/08/17/covids-forgotten-hero-the-untold-story-of-the-scientist-whose-breakthrough-made-the-vaccines-possible/">Forbes</a>.
  </p>
`

const darpa_desc = html`
  <p>
    <b>Regina Dugan</b> led the Defense Advanced Research Projects Agency (DARPA) and provided grants for mRNA vaccine technology in the early 2010s. 
  </p>
  <p>
    This funding accelerated the development of mRNA-based vaccines to prepare for pandemics where rapid response technologies would be necessary.
  </p>
  <p>
    Read more about this effort to fund new vaccines in <a href="https://www.washingtonpost.com/national-security/how-a-secretive-pentagon-agency-seeded-the-ground-for-a-rapid-coronavirus-cure/2020/07/30/ad1853c4-c778-11ea-a9d3-74640f25b953_story.html">Washington Post</a>.
  </p>
`

const project_descriptions = {
  'Modified mRNA': kariko_weissman_desc,
  'SARS-CoV-2 genome': zhang_holmes_desc,
  'Spike protein design': spike_desc,
  'Lipid nanoparticles': lipid_nanoparticles_desc,
  'DARPA director': darpa_desc
}

const scientists = [
  {
    name: 'Katalin Kariko',
    tagline: 'Modified mRNA',
    headshot_url: 'headshots/kariko.jpg'
  },
  {
    name: 'Drew Weissman',
    tagline: 'Modified mRNA',
    headshot_url: 'headshots/weissman.jpg'
  },
  {
    name: 'Yong-Zhen Zhang',
    tagline: 'SARS-CoV-2 genome',
    headshot_url: 'headshots/zhang.jpg'
  },
  {
    name: 'Eddie Holmes',
    tagline: 'SARS-CoV-2 genome',
    headshot_url: 'headshots/holmes.jpg'
  },
  {
    name: 'Barney Graham',
    tagline: 'Spike protein design',
    headshot_url: 'headshots/graham.jpg'
  },
  {
    name: 'Kizzmekia Corbett',
    tagline: 'Spike protein design',
    headshot_url: 'headshots/corbett.jpg',
    break: true
  },
  {
    name: 'Jason McClellan',
    tagline: 'Spike protein design',
    headshot_url: 'headshots/mcclellan.jpg'
  },
  {
    name: 'Nianshuang Wang',
    tagline: 'Spike protein design',
    headshot_url: 'headshots/wang.jpg'
  },
  {
    name: 'Daniel Wrapp',
    tagline: 'Spike protein design',
    headshot_url: 'headshots/wrapp.jpg'
  },
  {
    name: 'Pieter Cullis',
    tagline: 'Lipid nanoparticles',
    headshot_url: 'headshots/cullis.jpg'
  },
  {
    name: 'Ian MacLachlan',
    tagline: 'Lipid nanoparticles',
    headshot_url: 'headshots/maclachlan.jpg'
  },
  {
    name: 'Regina Dugan',
    tagline: 'DARPA director',
    headshot_url: 'headshots/dugan.jpg'
  },
]

const badges = [
  {
    name: "Ja'far ibn Yahya",
    img_url: "medals/img0001.jpg"
  },
  {
    name: "Rudolph II",
    img_url: "medals/img0002.jpg"
  },
  {
    name: "Cosimo II de Medici",
    img_url: "medals/img0003.jpg"
  },
  {
    name: "Sir Joseph Banks",
    img_url: "medals/img0004.jpg"
  },
  {
    name: "Marie Meloney",
    img_url: "medals/img0005.jpg"
  },
  {
    name: "Henry Wellcome",
    img_url: "medals/img0006.jpg"
  },
  {
    name: "Mary Lasker",
    img_url: "medals/img0007.jpg"
  },
  {
    name: "Howard Hughes",
    img_url: "medals/img0008.jpg"
  },
]

function App({ scientists, total_raised, number_contributors, badges, project_descriptions }) {
  const [modal_state, set_modal_state] = useState({
    open: false,
    content: ''
  })

  const open_project_modal = tagline => {
    const project_scientists = scientists.filter(s => s.tagline === tagline)

    const scientist_elements = []

    for (let i = 0; i < project_scientists.length; i++) {
      const s = project_scientists[i]
      scientist_elements.push(ScientistProfile(s))
      if (s.break) {
        scientist_elements.push(html`<br />`)
      }
    }

    set_modal_state({
      open: true,
      content: html`
        <h2 class='center'>${tagline}</h2>
        <div class='center modal-gallery'>
          ${scientist_elements}
        </div>
        <div>
          ${project_descriptions[tagline]}
        </div>
      `
    })
  }

  const handle_esc = (event) => {
    if(event.keyCode === 27) {
      set_modal_state(s => ({ ...s, open: false }))
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handle_esc, false);
    return () => {
      document.removeEventListener("keydown", handle_esc, false);
    };
  }, []);

  return html`
    <${PersistentModal} open=${modal_state.open} content=${modal_state.content} set_modal_state=${set_modal_state} />
    <div id='content'>
      <main>
        <div id="scientists" class="content-container">
          <${Scientists} scientists=${scientists} open_project_modal=${open_project_modal} />
        </div>
        <div class="content-container contribute-container">
          <h2>Contribute</h2>
          ${null/*<p>
            We’ve raised <span class='bf'>\$${total_raised}</span> for these scientists. Prizes will be divided equally and awarded on October 31st, 2021.  
          </p>
          <p>
            Join the <span class='bf'>${number_contributors}</span> supporters today.
          </p>*/}
          <p>
            <div id="contribute">
              <${ContributeButton} set_modal_state=${set_modal_state} />
            </div>
          </p>
        </div>
        <div class="content-container">
          <h2>About</h2>
          <p>
            Decades of scientific research enabled the rapid development of the COVID-19 mRNA vaccines. We are recognizing the teams of scientists who pioneered these foundational discoveries despite challenges with <a href="https://www.nber.org/papers/w28905">funding</a> and <a href="https://twitter.com/goodwish916/status/1329234124394041345">publishing</a> their research.
          </p>
          <p>
            There is a distinguished history of collective science patronage. Over \$150,000 was raised in 1921 from <a href="https://www.smithsonianmag.com/smart-news/when-women-crowdfunded-radium-marie-curie-180963305/">donations by American women for Marie Curie</a>. Jonas Salk’s polio vaccine research was funded by the March of Dimes, which raised \$54 million from <a href="https://www.google.com/books/edition/The_Greater_Good/CYzRLhCk-uEC?hl=en&gbpv=1&pg=PA117&printsec=frontcover">over 80 million people</a> in 1954.
          </p>
          <p>
            We hope to continue this legacy by funding and celebrating these scientific achievements together.
          </p>
        </div>
        <div class="content-container">
          <h2>Contributor Gallery</h2>
          <p>
            Each contributor receives a unique medal as a token of appreciation.  
          </p>
          <p>
            View and share your medal to help recognize and reward the scientists involved in developing the COVID-19 mRNA vaccine.
          </p>
          <p>
            <div id="contribute" class="center">
              <${MedalSearch} set_modal_state=${set_modal_state} />
            </div>
          </p>
          <div id="leaderboard">
            <${Leaderboard} badges=${badges} />
          </div>
        </div>
      </main>
    </div>
  `
}

render(
  html`<${App}
    scientists=${scientists}
    total_raised='3,141,592'
    number_contributors='6,535'
    badges=${badges}
    project_descriptions=${project_descriptions} />`,
  document.getElementById('app-root')
)