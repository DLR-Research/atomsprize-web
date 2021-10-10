import { useState, useEffect } from 'preact/hooks'
import PersistentModal, { ModalState } from './components/PersistentModal'
import Scientists from './components/Scientists'
import ScientistProfile from './components/ScientistProfile'
import Leaderboard from './components/Leaderboard'
import ContributeButton from './components/ContributeButton'
import { scientists, badges, project_descriptions } from './data'
import { Donor } from './types'

export type AppProps = {
  donor?: Donor
}

export default function App({ donor }: AppProps) {
  const [modal_state, set_modal_state] = useState<ModalState>({
    open: !!donor,
    content: donor ? <h1>gm {donor.name || donor.user_id}!</h1> : ''
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
          <h2 className='center'>{tagline}</h2>
          <div className='center modal-gallery'>{scientist_elements}</div>
          <div className='project-description'>{project_descriptions[tagline]()}</div>
        </>
      )
    })
  }

  const handle_esc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
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
      <div id='content'>
        <main>
          <div id='scientists' className='content-container'>
            <Scientists scientists={scientists} open_project_modal={open_project_modal} />
          </div>
          <div className='content-container contribute-container'>
            <h2>Contribute</h2>
            {
              null /*<p>
              We’ve raised <span class="bf">3,141,592</span> for these scientists. Prizes will be divided equally and awarded on October 31st, 2021.
            </p>
            <p>
              Join the <span class="bf">6,535</span> supporters today.
            </p>*/
            }
            <div id='contribute'>
              <ContributeButton set_modal_state={set_modal_state} />
            </div>
          </div>
          <div className='content-container'>
            <h2>About</h2>
            <p>
              Decades of scientific research enabled the rapid development of the COVID-19 mRNA vaccines. We are
              recognizing the teams of scientists who pioneered these foundational discoveries despite challenges with{' '}
              <a href='https://www.nber.org/papers/w28905' class='no-kerning'>
                funding
              </a>{' '}
              and <a href='https://twitter.com/goodwish916/status/1329234124394041345'>publishing</a> their research.
            </p>
            <p>
              There is a distinguished history of collective science patronage. Over $150,000 was raised in 1921 from{' '}
              <a href='https://www.smithsonianmag.com/smart-news/when-women-crowdfunded-radium-marie-curie-180963305/'>
                donations by American women for Marie Curie
              </a>
              . Jonas Salk’s polio vaccine research was funded by the March of Dimes, which raised $54 million from{' '}
              <a href='https://www.google.com/books/edition/The_Greater_Good/CYzRLhCk-uEC?hl=en&gbpv=1&pg=PA117&printsec=frontcover'>
                over 80 million people
              </a>{' '}
              in 1954.
            </p>
            <p>We hope to continue this legacy by funding and celebrating these scientific achievements together.</p>
          </div>
          <div className='content-container'>
            <h2>Contributor Gallery</h2>
            <p>Each contributor receives a unique medal as a token of appreciation.</p>
            <p>
              View and share your medal to help recognize and reward the scientists involved in developing the COVID-19
              mRNA vaccine.
            </p>
            <div id='leaderboard'>
              <Leaderboard badges={badges} />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
