import CharacterSearchContainer from '@/components/CharacterSearchContainer'
import React from 'react'

let currentPage: number = 1

const Home = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
    gender?: string
    homeworld?: string
  }
}) => {
  const query = searchParams?.query
  const pageNumber = searchParams?.page
  const genderFilter = searchParams?.gender
  const homeworldFilter = searchParams?.homeworld

  if (pageNumber) {
    currentPage = Number(pageNumber)
  }

  let apiUrlParams = new URLSearchParams()
  let apiUrl = new URL(`http://localhost:3000/api/people/${currentPage}`)
  if (query) {
    apiUrl = new URL(`http://localhost:3000/api/people/search/${currentPage}`)
    apiUrlParams.append('query', query)
  }
  if (genderFilter) {
    apiUrlParams.append('gender', genderFilter)
  }
  if (homeworldFilter) {
    apiUrlParams.append('homeworld', homeworldFilter)
  }
  apiUrl.search = apiUrlParams.toString()

  return <CharacterSearchContainer apiUrl={apiUrl} />
}

export default Home
