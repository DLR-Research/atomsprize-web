import { Scientist } from '../types'

type ScientstProfileProps = {
  scientist: Scientist
  interactive?: boolean
  open_project_modal?: () => void
}

export default function ScientistProfile({ scientist, interactive, open_project_modal }: ScientstProfileProps) {
  return (
    <div class={`gallery-item scientist ${interactive ? 'interactive' : ''}`} onClick={open_project_modal}>
      <img alt={scientist.name} src={scientist.headshot_url} class='headshot' width={400} height={400} loading='lazy' />
      <div class='name'>{scientist.name}</div>
      {interactive ? <div class='tagline'>{scientist.tagline}</div> : ''}
    </div>
  )
}
