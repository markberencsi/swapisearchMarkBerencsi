import { Planet } from '@/interfaces/interfaces'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    let planets: Planet[] = []
    let nextUrl = 'https://swapi.dev/api/planets/'

    while (nextUrl) {
      const response = await fetch(nextUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      planets = [...planets, ...data.results]
      nextUrl = data.next
    }

    return NextResponse.json(planets)
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      error: 'An error occurred while processing your request.',
    })
  }
}
