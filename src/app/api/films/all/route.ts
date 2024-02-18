import { Film } from '@/interfaces/interfaces'
import { NextResponse } from 'next/server'

export async function GET() {
  let films: Film[] = []
  let nextUrl = 'https://swapi.dev/api/films/'

  while (nextUrl) {
    try {
      const response = await fetch(nextUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      films = [...films, ...data.results]
      nextUrl = data.next
    } catch (error) {
      console.error('There was an error fetching the data', error)
      return NextResponse.json({
        error: 'An error occurred while processing your request.',
      })
    }
  }

  return NextResponse.json(films)
}
