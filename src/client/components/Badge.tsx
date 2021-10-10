import { JSX } from 'preact'
import { Donor } from '../types'
import Sketch from 'react-p5'
import create_renderer, { BadgeInputs } from '../../badge/render'

type BadgeProps = {
  donor: Donor
  active?: boolean
  onClick?: JSX.MouseEventHandler<HTMLDivElement>
}

export default function Badge({ donor, active, onClick }: BadgeProps) {
  const renderer = create_renderer(donor as BadgeInputs)

  return (
    <div className={`gallery-item interactive${ active ? ' active' : ''}`} onClick={onClick}>
      <Sketch setup={renderer.setup} draw={renderer.draw} />
      <div className='name'>{donor.name}</div>
    </div>
  )
}
