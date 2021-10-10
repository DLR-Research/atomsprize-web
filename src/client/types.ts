export type Scientist = {
  name: string
  tagline: string
  headshot_url: string
  break?: boolean
}

export type Badge = {
  name: string
  img_url: string
}

export type Donor = {
  user_id: number
  total_donated: number
  total_referred: number
  name?: string
  email?: string
  ens_address?: string
  eth_address?: string
}
