import { PeopleApiResponse } from '@/interfaces/interfaces'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const peopleResponse = await fetch('https://swapi.dev/api/people/')
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
