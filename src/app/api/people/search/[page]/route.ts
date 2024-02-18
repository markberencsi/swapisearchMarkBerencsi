import { PeopleApiResponse } from '@/interfaces/interfaces'
import { filterPeople } from '@/util/helpers'
import { NextRequest, NextResponse } from 'next/server'

const peopleApiBaseUrl = 'https://swapi.dev/api/people/'
const pageSize = 10

export async function GET(req: NextRequest) {
  try {
    const urlPath = req.nextUrl.pathname
    const searchParams = req.nextUrl.searchParams

    const page = urlPath.split('/').pop()
    const query = searchParams.get('query')
    const gender = searchParams.get('gender')
    const homeworld = searchParams.get('homeworld')

    let genderFilter
    let homeworldFilter
    if (!gender) {
      genderFilter = undefined
    } else {
      genderFilter = gender
    }
    if (!homeworld) {
      homeworldFilter = undefined
    } else {
      homeworldFilter = homeworld
    }

    const requestUrl = req.url

    if (gender || homeworld) {
      const response = await filterPeople(
        `${peopleApiBaseUrl}?search=${query}`,
        Number(page),
        requestUrl,
        pageSize,
        genderFilter,
        homeworldFilter,
      )
      return NextResponse.json(response)
    }

    const peopleResponse = await fetch(
      `https://swapi.dev/api/people/?search=${query}&page=${page}`,
    )
    if (!peopleResponse.ok) {
      throw new Error(`HTTP error! status: ${peopleResponse.status}`)
    }
    const peopleData: PeopleApiResponse = await peopleResponse.json()

    return NextResponse.json(peopleData)
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      error: 'An error occurred while processing your request.',
    })
  }
}
