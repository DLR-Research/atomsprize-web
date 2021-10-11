import { JSX } from 'preact'
import { Donor } from '../types'

import BadgeRender from './BadgeRender'

type BadgeProps = {
  donor: Donor
  active?: boolean
  onClick?: JSX.MouseEventHandler<HTMLDivElement>
}

export default function Badge({ donor, active, onClick }: BadgeProps) {
  return (
    <div className={`gallery-item interactive${ active ? ' active' : ''}`} onClick={onClick}>
      <BadgeRender donor={donor} />
      <div className='name'>{donor.name}</div>
    </div>
  )
}
