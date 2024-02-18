export interface CardProps {
  text: string
  imageSource: string
}

export interface CharacterModalProps {
  visible: boolean
  onClose: Function
  modalContent?: CharacterProps
}

export interface CharacterProps {
  name: string
  imageSource: string
  height: string
  mass: string
  films: string[]
}

export interface ResultContainerProps {
  characterResults: Character[]
  totalPages: number
  films: Map<string, string>
  resultMessage?: string
}

export interface SearchProps {
  apiUrl: URL
}

export interface Character {
  name: string
  birth_year: string
  eye_color: string
  gender: string
  hair_color: string
  height: string
  mass: string
  skin_color: string
  homeworld: string
  films: string[]
  species: string[]
  starships: string[]
  vehicles: string[]
  url: string
  created: string
  edited: string
}

export interface Planet {
  name: string
  diameter: string
  rotation_period: string
  orbital_period: string
  gravity: string
  population: string
  climate: string | string[]
  terrain: string | string[]
  surface_water: string
  residents: string[]
  films: string[]
  url: string
  created: string
  edited: string
}

export interface Film {
  title: string
  episode_id: number
  opening_crawl: string
  director: string
  producer: string
  release_date: string
  species: string[]
  starships: string[]
  vehicles: string[]
  characters: string[]
  planets: string[]
  url: string
  created: string
  edited: string
}

export interface PeopleApiResponse {
  count: number
  next: string | null
  previous: string | null
  results: Character[]
}

export interface PlanetApiResponse {
  count: number
  next: string | null
  previous: string | null
  results: Planet[]
}
