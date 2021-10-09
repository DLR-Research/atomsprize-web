import { useState, useEffect } from 'react'
import { Scientist, Badge } from './types'
import { ProjectDescriptionMap } from './data'
import PersistentModal, { ModalState } from './PersistentModal'
import Scientists from './Scientists'
import ScientistProfile from './ScientistProfile'
import Leaderboard from './Leaderboard'
import MedalSearch from './MedalSearch'
import ContributeButton from './ContributeButton'

type AppProps = {
  scientists: Scientist[]
  badges: Badge[]
  project_descriptions: ProjectDescriptionMap
  // TODO change these two to numbers
  total_raised: string
  number_contributors: string
}

export default function App({
  scientists,
  // total_raised,
  // number_contributors,
  badges,
  project_descriptions
}: AppProps) {
  const [modal_state, set_modal_state] = useState<ModalState>({
    open: false,
    content: ''
  })

  const open_project_modal = (tagline: string) => {
    const project_scientists = scientists.filter(s => s.tagline === tagline)

    const scientist_elements = []

    for (let i = 0; i < project_scientists.length; i++) {
      const s = project_scientists[i]
      scientist_elements.push(ScientistProfile({ scientist: s }))
      if (s.break) {
        scientist_elements.push(<br />)
      }
    }

    set_modal_state({
      open: true,
      content: (
        <>
          <h2 className="center">{tagline}</h2>
          <div className="center modal-gallery">{scientist_elements}</div>
          <div>{project_descriptions[tagline]()}</div>
        </>
      )
    })
  }

  const handle_esc = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      set_modal_state(s => ({ ...s, open: false }))
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handle_esc, false)
    return () => {
      document.removeEventListener('keydown', handle_esc, false)
    }
  }, [])

  return (
    <>
      <PersistentModal state={modal_state} set_modal_state={set_modal_state} />
      <div id="content">
        <main>
          <div id="scientists" className="content-container">
            <Scientists
              scientists={scientists}
              open_project_modal={open_project_modal}
            />
          </div>
          <div className="content-container contribute-container">
            <h2>Contribute</h2>
            {
              null /*<p>
              We’ve raised <span class="bf">\$${total_raised}</span> for these scientists. Prizes will be divided equally and awarded on October 31st, 2021.
            </p>
            <p>
              Join the <span class="bf">${number_contributors}</span> supporters today.
            </p>*/
            }
            <div id="contribute">
              <ContributeButton set_modal_state={set_modal_state} />
            </div>
          </div>
          <div className="content-container">
            <h2>About</h2>
            <p>
              Decades of scientific research enabled the rapid development of
              the COVID-19 mRNA vaccines. We are recognizing the teams of
              scientists who pioneered these foundational discoveries despite
              challenges with{" "}
              <a href="https://www.nber.org/papers/w28905">funding</a> and{" "}
              <a href="https://twitter.com/goodwish916/status/1329234124394041345">
                publishing
              </a>{" "}
              their research.
            </p>
            <p>
              There is a distinguished history of collective science patronage.
              Over $150,000 was raised in 1921 from{" "}
              <a href="https://www.smithsonianmag.com/smart-news/when-women-crowdfunded-radium-marie-curie-180963305/">
                donations by American women for Marie Curie
              </a>
              . Jonas Salk’s polio vaccine research was funded by the March of
              Dimes, which raised $54 million from{" "}
              <a href="https://www.google.com/books/edition/The_Greater_Good/CYzRLhCk-uEC?hl=en&gbpv=1&pg=PA117&printsec=frontcover">
                over 80 million people
              </a>{" "}
              in 1954.
            </p>
            <p>
              We hope to continue this legacy by funding and celebrating these
              scientific achievements together.
            </p>
          </div>
          <div className="content-container">
            <h2>Contributor Gallery</h2>
            <p>
              Each contributor receives a unique medal as a token of
              appreciation.
            </p>
            <p>
              View and share your medal to help recognize and reward the
              scientists involved in developing the COVID-19 mRNA vaccine.
            </p>
            <div id="contribute" className="center">
              <MedalSearch set_modal_state={set_modal_state} />
            </div>
            <div id="leaderboard">
              <Leaderboard badges={badges} />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
