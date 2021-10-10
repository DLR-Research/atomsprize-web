import { JSX } from 'preact'
import { Badge } from '../types'

type BadgeProps = {
  badge: Badge
  active?: boolean
  onClick?: JSX.MouseEventHandler<HTMLDivElement>
}

export default function BadgeComponent({ badge: { name, img_url }, active, onClick }: BadgeProps) {
  return (
    <div className={`gallery-item interactive${ active ? ' active' : ''}`} onClick={onClick}>
      <img alt={name} src={img_url} className='badge' width={400} height={400} loading='lazy' />
      <div className='name'>{name}</div>
    </div>
  )
}
