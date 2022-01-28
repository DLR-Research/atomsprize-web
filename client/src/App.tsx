import { useState, useEffect } from 'preact/hooks'
import PersistentModal, { ModalState } from './components/PersistentModal'
import Scientists from './components/Scientists'
import ScientistProfile from './components/ScientistProfile'
import Leaderboard from './components/Leaderboard'
import ContributeButton from './components/ContributeButton'
import FaqAccordion from './components/FaqAccordion'
import { scientists, project_descriptions } from './data'
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
          <h1 className='center'>{tagline}</h1>
          <div className='center modal-gallery'>{scientist_elements}</div>
          <div className='project-description'>{project_descriptions[tagline]()}</div>
        </>
      )
    })
  }

  const handle_esc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      set_modal_state(state => ({ ...state, open: false }))
    }
  }

  const handle_coinbase_close = (event: MessageEvent) => {
    if (
      (function (names: string) {
        if (/^[a-zA-Z0-9:\/.-]+$/.test(names)) {
          return (
            /^https?:\/\//i.test(names) || (names = 'https://' + names),
            /:\d+$/.test(names) || (names = names + (/^https:/i.test(names) ? ':443' : ':80')),
            names.toLowerCase()
          )
        }
      })(event.origin) === 'https://commerce.coinbase.com:443' &&
      event.data.event === 'checkout_modal_closed'
    ) {
      set_modal_state(state => ({ ...state, open: false }))
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handle_esc, false)
    typeof window !== 'undefined' && window.addEventListener('message', handle_coinbase_close, false)
    return () => {
      document.removeEventListener('keydown', handle_esc, false)
      typeof window !== 'undefined' && window.removeEventListener('message', handle_coinbase_close, false)
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
              There is a distinguished history of collective science patronage. Over $150,000 was raised in 1921 from
              donations by American women for {' '}
              <a href='https://www.smithsonianmag.com/smart-news/when-women-crowdfunded-radium-marie-curie-180963305/'>
                Marie Curie
              </a>
              . Jonas Salk’s polio vaccine research was funded by the {' '}
              <a href='https://www.google.com/books/edition/The_Greater_Good/CYzRLhCk-uEC?hl=en&gbpv=1&pg=PA117&printsec=frontcover'>
              March of Dimes</a>, which raised $54 million from
              over 80 million people in 1954.
            </p>
            <p>We hope to continue this legacy by funding and celebrating these scientific achievements together.</p>
          </div>

          <div className='content-container'>
            <h2>Contributor Gallery</h2>
            <p>Each contributor receives a unique medal as a token of appreciation.</p>
            <p>
              Find and share your medal to help recognize and reward the scientists involved in developing the COVID-19
              mRNA vaccine.
            </p>
            <div id='leaderboard'>
              <Leaderboard set_modal_state={set_modal_state} />
            </div>
          </div>
          <div className='content-container'>
            <h2>FAQ</h2>
            <FaqAccordion question='Are donations tax-deductible?'>
              <p>
                Yes! We are fiscally sponsored through a 501(c)(3), the
                {' '}
                <a href='https://hackclub.com/bank/' target='_blank'>Hack Foundation (EIN: 81-2908499).
                </a>
              </p>
            </FaqAccordion>
            <FaqAccordion question='Who are the organizers of this prize?'>
              <p>
                <a href='https://atoms.org' target='_blank'>
                  Atoms.org
                </a>{' '}
                is an organization developing new tools for funding and publishing open science. We are supported by
                grants from{' '}
                <a href='https://protocol.ai/' target='_blank'>
                  Protocol Labs
                </a>{' '}
                and the{' '}
                <a href='https://ethereum.foundation/' target='_blank'>
                  Ethereum Foundation
                </a>
                .
              </p>
            </FaqAccordion>
            <FaqAccordion question='How will the prize money be spent?'>
              <p>
                The prize will be split evenly among the recipient scientists named above. To cover the costs of credit
                card processing fees, tax filing, and accounting, 7% goes to our nonprofit fiscal sponsor,{' '}
                <a href='https://hackclub.com/bank/' target='_blank'>
                  Hack Foundation
                </a>
                , which is dedicated to student coding education. Atoms.org will not be receiving any funds raised from
                this prize.
              </p>
            </FaqAccordion>
            <FaqAccordion question='What are the donor badges?'>
              <p>
                Each donor receives a unique badge as a token of appreciation. They have been generated by an algorithm
                derived from artist{' '}
                <a href='https://openprocessing.org/user/56835?view=sketches' target='_blank'>
                  Konstantin Makhmutov
                </a>
                . Larger and earlier donations result in badges that are more likely to be visually distinct.
              </p>
              <p>
                If desired, donors can optionally claim their badge on the Gnosis chain. The Gnosis chain ensures{' '}
                <a
                  href='https://www.xdaichain.com/about-xdai/news-and-information/xdai-energy-efficiency/green-nfts-on-xdai#moving-to-xdai'
                  target='_blank'
                >
                  effectively zero environmental impact or transaction fees
                </a>
                .
              </p>
            </FaqAccordion>
          </div>
        </main>
      </div>
    </>
  )
}
