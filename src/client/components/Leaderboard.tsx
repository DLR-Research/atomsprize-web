import { Badge } from '../types'
import BadgeComponent from './Badge'

type LeaderboardProps = {
  badges: Badge[]
}

export default function Leaderboard({ badges }: LeaderboardProps) {
  const badge_elements = badges.map(b => <BadgeComponent key={b.name} badge={b} />)

  return <div className='gallery'>{badge_elements}</div>
}
