import { route } from 'preact-router'
import { Scientist } from '../types'

type ScientstProfileProps = {
  scientist: Scientist
  interactive?: boolean
}

export default function ScientistProfile({ scientist, interactive }: ScientstProfileProps) {
  return (
    <div
      class={`gallery-item scientist ${interactive ? 'interactive' : ''}`}
      onClick={() => (interactive && route(`/scientists/${scientist.short_name}`))}
    >
      <img alt={scientist.name} src={scientist.headshot_url} class='headshot' width={400} height={400} loading='lazy' />
      <div class='name'>{scientist.name}</div>
      {interactive ? <div class='tagline'>{scientist.tagline}</div> : ''}
    </div>
  )
}
