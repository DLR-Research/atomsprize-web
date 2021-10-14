import { JSX } from 'preact'
import { Donor } from '../types'

type BadgeProps = {
  donor: Donor
  onClick?: JSX.MouseEventHandler<HTMLDivElement>
}

export default function Badge({ donor, onClick }: BadgeProps) {
  return (
    <div className={`gallery-item interactive`} onClick={onClick}>
      <img width={128} height={128} src={`/badge/${donor.user_id}.png`} />
      <div className='name'>{donor.name}</div>
    </div>
  )
}
