import React from 'react'
import ResultContainer from './ResultContainer'
import Search from './Search'
import { PeopleApiResponse, SearchProps } from '@/interfaces/interfaces'

const pageSize: number = 10
let resultMessage: string

async function fetchAllPlanets() {
  try {
    const allPlanetsResponse = await fetch(
      'http://localhost:3000/api/planets/all',
    )
    if (!allPlanetsResponse.ok) {
      throw new Error(`HTTP error! status: ${allPlanetsResponse.status}`)
    }
    const allPlanets = await allPlanetsResponse.json()
    return allPlanets
  } catch (error) {
    resultMessage = 'Error while getting data'
    return []
  }
}

async function fetchAllFilms() {
  try {
    const allFilmsResponse = await fetch('http://localhost:3000/api/films/all')
    if (!allFilmsResponse.ok) {
      throw new Error(`HTTP error! status: ${allFilmsResponse.status}`)
    }
    const allFilms = await allFilmsResponse.json()
    const filmsMap = new Map<string, string>()
    allFilms.forEach((film: any) => {
      filmsMap.set(film.url, film.title)
    })
    return filmsMap
  } catch (error) {
    resultMessage = 'Error while getting data'
    return new Map()
  }
}

export async function fetchData(apiUrl: URL) {
  try {
    const peopleResponse = await fetch(apiUrl.href)
    if (!peopleResponse.ok) {
      throw new Error(`HTTP error! status: ${peopleResponse.status}`)
    }
    const peopleData: PeopleApiResponse = await peopleResponse.json()
    return peopleData
  } catch (error) {
    console.error(error)
    resultMessage = 'Error while getting data'
    return { results: [], count: 0 }
  }
}

const CharacterSearchContainer: React.FC<SearchProps> = async ({ apiUrl }) => {
  const films = await fetchAllFilms()
  const homeworlds = await fetchAllPlanets()
  const data = await fetchData(apiUrl)
  const totalPageAmount = Math.ceil(data.count / pageSize)
  if (data.results.length === 0) {
    resultMessage = 'No results'
  }

  return (
    <div>
      <div className="flex justify-center m-3 bg-white bg-opacity-10 rounded-xl p-4">
        <Search homeworlds={homeworlds} />
      </div>
      <ResultContainer
        characterResults={data.results}
        totalPages={totalPageAmount}
        films={films}
        resultMessage={resultMessage}
      />
    </div>
  )
}

export default CharacterSearchContainer
