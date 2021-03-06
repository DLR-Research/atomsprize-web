import { Scientist, Donor } from './types'

export const scientists: Scientist[] = [
  {
    name: 'Katalin Karikó',
    tagline: 'Modified mRNA',
    headshot_url: '/headshots/kariko.jpg'
  },
  {
    name: 'Drew Weissman',
    tagline: 'Modified mRNA',
    headshot_url: '/headshots/weissman.jpg'
  },
  {
    name: 'Yong-Zhen Zhang',
    tagline: 'SARS-CoV-2 genome',
    headshot_url: '/headshots/zhang.jpg'
  },
  {
    name: 'Eddie Holmes',
    tagline: 'SARS-CoV-2 genome',
    headshot_url: '/headshots/holmes.jpg'
  },
  {
    name: 'Barney Graham',
    tagline: 'Spike protein design',
    headshot_url: '/headshots/graham.jpg'
  },
  {
    name: 'Kizzmekia Corbett',
    tagline: 'Spike protein design',
    headshot_url: '/headshots/corbett.jpg'
  },
  {
    name: 'Andrew Ward',
    tagline: 'Spike protein design',
    headshot_url: '/headshots/ward.jpg',
    break: true
  },
  {
    name: 'Jason McClellan',
    tagline: 'Spike protein design',
    headshot_url: '/headshots/mcclellan.jpg'
  },
  {
    name: 'Nianshuang Wang',
    tagline: 'Spike protein design',
    headshot_url: '/headshots/wang.jpg'
  },
  {
    name: 'Daniel Wrapp',
    tagline: 'Spike protein design',
    headshot_url: '/headshots/wrapp.jpg'
  },
  {
    name: 'Pieter Cullis',
    tagline: 'Lipid nanoparticles',
    headshot_url: '/headshots/cullis.jpg'
  },
  {
    name: 'Ian MacLachlan',
    tagline: 'Lipid nanoparticles',
    headshot_url: '/headshots/maclachlan.jpg'
  }
]

const kariko_weissman_desc = () => (
  <>
    <p>
      <b>Katalin Karikó</b> and <b>Drew Weissman</b> discovered how to make messenger RNA technology safe and stable in
      the early 2000s by modifying the building blocks of mRNA known as nucleosides.
    </p>
    <p>
      mRNA-based therapies are designed from genetic sequences, which allowed the COVID-19 mRNA vaccines to be quickly
      developed using the coronavirus spike protein gene as a blueprint.
    </p>
    <p>
      Read more about their work to modify mRNA in{' '}
      <a href='https://www.statnews.com/2020/11/10/the-story-of-mrna-how-a-once-dismissed-idea-became-a-leading-technology-in-the-covid-vaccine-race/'>
        STAT News
      </a>{' '}
      and the <a href='https://www.nytimes.com/2021/04/08/health/coronavirus-mrna-kariko.html'>New York Times.</a>
    </p>
  </>
)

const zhang_holmes_desc = () => (
  <>
    <p>
      <b>Yong-Zhen Zhang</b>’s team determined the genome sequence of the SARS-CoV-2 virus within 40 hours on January 5,
      2020 and sent it to colleague <b>Eddie Holmes</b>, who{' '}
      <a href='https://virological.org/t/novel-2019-coronavirus-genome/319'>released it publicly</a> 52 minutes after
      receiving it.
    </p>
    <p>
      Their expediency and transparency led to rapid global research into SARS-CoV-2, which enabled the analysis and
      design of the spike protein sequence used for the vaccines.
    </p>
    <p>
      Read more about their work on the SARS-CoV-2 genome in{' '}
      <a href='https://time.com/5882918/zhang-yongzhen-interview-china-coronavirus-genome/'>Time Magazine</a> and{' '}
      <a href='https://www.bbc.com/news/science-environment-55565284'>BBC</a>.
    </p>
  </>
)

const spike_desc = () => (
  <>
    <p>
      <b>Kizzmekia Corbett</b>, <b>Barney Graham</b>, <b>Jason McClellan</b>, <b>Nianshuang Wang</b>, and{' '}
      <b>Daniel Wrapp</b> designed the SARS-CoV-2 spike protein in early 2020 to train the immune system to recognize
      the virus.
    </p>
    <p>
      Based on past work with <b>Andrew Ward</b> on other coronaviruses, the team replaced two amino acids in the
      SARS-CoV-2 spike protein, which stabilized the protein to generate a stronger immune response.
    </p>
    <p>
      Read more about their work on the spike protein design in{' '}
      <a href='https://www.nationalgeographic.com/science/article/these-scientists-spent-twelve-years-solving-puzzle-yielded-coronavirus-vaccines'>
        National Geographic
      </a>{' '}
      and{' '}
      <a href='https://www.washingtonpost.com/health/2020/11/17/coronavirus-vaccine-manufacturing/'>Washington Post.</a>
    </p>
  </>
)

const lipid_nanoparticles_desc = () => (
  <>
    <p>
      <b>Pieter Cullis</b> and <b>Ian MacLachlan</b> developed techniques in the 1990s and 2000s to package fragile
      genetic material, such as messenger RNA, inside small envelopes of fat known as lipid nanoparticles (LNPs).
    </p>
    <p>These LNPs ensure that the mRNA is protected and delivered effectively into cells.</p>
    <p>
      Read more about their work on LNPs in{' '}
      <a href='https://cen.acs.org/pharmaceuticals/drug-delivery/Without-lipid-shells-mRNA-vaccines/99/i8'>
        Chemical & Engineering News
      </a>{' '}
      and{' '}
      <a href='https://www.forbes.com/sites/nathanvardi/2021/08/17/covids-forgotten-hero-the-untold-story-of-the-scientist-whose-breakthrough-made-the-vaccines-possible/'>
        Forbes
      </a>
      .
    </p>
  </>
)

export type ProjectDescriptionMap = {
  [k: string]: () => preact.JSX.Element
}

export const project_descriptions = {
  'Modified mRNA': kariko_weissman_desc,
  'SARS-CoV-2 genome': zhang_holmes_desc,
  'Spike protein design': spike_desc,
  'Lipid nanoparticles': lipid_nanoparticles_desc
} as ProjectDescriptionMap

type UserMap = {
  [k: number]: Donor
}

const MOCK_USERS: UserMap = {
  [0]: {
    user_id: 0,
    total_donated: 99,
    total_referred: 33,
    name: 'Test Donor0',
    email: 'jafar@dlr',
    ens_address: 'jafar.eth',
    eth_address: '0xjafar'
  },
  [1]: {
    user_id: 1,
    total_donated: 999,
    total_referred: 603,
    name: 'Test Donor1',
    email: 'rudolph@dlr',
    ens_address: 'rudolph.eth',
    eth_address: '0xrudolph'
  },
  [2]: {
    user_id: 2,
    total_donated: 9999,
    total_referred: 286,
    name: 'Test Donor2',
    email: 'cosimo@dlr',
    ens_address: 'cosimo.eth',
    eth_address: '0xcosimo'
  },
  [3]: {
    user_id: 3,
    total_donated: 999,
    total_referred: 286,
    name: 'Test Donor3',
    email: 'joseph@dlr',
    ens_address: 'joseph.eth',
    eth_address: '0xjoseph'
  },
  [4]: {
    user_id: 4,
    total_donated: 9999,
    total_referred: 286,
    name: 'Test Donor4',
    email: 'marie@dlr',
    ens_address: 'marie.eth',
    eth_address: '0xmarie'
  },
  [5]: {
    user_id: 5,
    total_donated: 9,
    total_referred: 286,
    name: 'Test Donor5',
    email: 'henry@dlr',
    ens_address: 'henry.eth',
    eth_address: '0xhenry'
  },
  [6]: {
    user_id: 6,
    total_donated: 9999,
    total_referred: 286,
    name: 'Test Donor6',
    email: 'mary@dlr',
    ens_address: 'mary.eth',
    eth_address: '0xmary'
  },
  [7]: {
    user_id: 7,
    total_donated: 999,
    total_referred: 286,
    name: 'Test Donor7',
    email: 'howard@dlr',
    ens_address: 'howard.eth',
    eth_address: '0xhoward'
  },
  [8]: {
    user_id: 8,
    total_donated: 99,
    total_referred: 286,
    name: 'Test Donor8',
    email: 'paul@dlr',
    ens_address: 'paul.eth',
    eth_address: '0xpaul'
  },
  [9]: {
    user_id: 9,
    total_donated: 99,
    total_referred: 286,
    name: 'Test Donor9',
    email: 'melinda@dlr',
    ens_address: 'melinda.eth',
    eth_address: '0xmelinda'
  }
}

const MOCK_USER_LIST = Object.values(MOCK_USERS)

export const get_mock_user = (user_id?: number) => {
  const users = MOCK_USER_LIST
  const randomUser = users[Math.floor(Math.random() * users.length)]
  return user_id ? MOCK_USERS[user_id] || randomUser : undefined
}

function simplify(s: string) {
  return s.replace(/[^A-Za-z]/g, '').toLowerCase()
}

export function mock_index_stats(t = '') {
  return MOCK_USER_LIST.filter(
    (d: Donor) => (d.name && simplify(d.name).includes(t)) || (d.email && simplify(d.email).includes(t))
  )
}
