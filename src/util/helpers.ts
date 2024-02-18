import { Character, PeopleApiResponse } from '@/interfaces/interfaces'

export function filterPeopleByGender(people: Character[], gender: string) {
  const filteredPeople = people.filter((person) => person.gender === gender)
  return filteredPeople
}

function filterPeopleByHomeworld(people: Character[], homeworldUrl: string) {
  const filteredPeople = people.filter(
    (person) => person.homeworld === homeworldUrl,
  )
  return filteredPeople
}

export async function filterPeople(
  firstPageUrl: string,
  pageNumber: number,
  currentUrl: string,
  pageSize: number,
  gender?: string,
  homeworld?: string,
) {
  let filteredResults = await getAllPeople(firstPageUrl)
  if (gender) {
    filteredResults = filterPeopleByGender(filteredResults, gender)
  }
  if (homeworld) {
    filteredResults = filterPeopleByHomeworld(filteredResults, homeworld)
  }
  return paginateArray(filteredResults, pageNumber, pageSize, currentUrl)
}

async function getAllPeople(firstPage: string) {
  let people: Character[] = []
  let nextUrl = firstPage

  while (nextUrl) {
    const response = await fetch(nextUrl)
    const data = await response.json()
    people = [...people, ...data.results]
    nextUrl = data.next
  }

  return people
}

export function paginateArray(
  data: Character[],
  page: number,
  pageSize: number,
  url: string,
) {
  const totalResultPages = Math.ceil(data.length / pageSize)
  const results: Character[] = data.slice(
    (page - 1) * pageSize,
    page * pageSize,
  )
  const nextPageNumber = page < totalResultPages ? page + 1 : null
  const previousPageNumber = page > 1 ? page - 1 : null
  const nexUrl = (url = url.replace(/(people\/)\d+/, `$1${nextPageNumber}`))
  const previousUrl = (url = url.replace(
    /(people\/)\d+/,
    `$1${previousPageNumber}`,
  ))

  const response: PeopleApiResponse = {
    count: data.length,
    next: nextPageNumber === null ? null : nexUrl,
    previous: previousPageNumber === null ? null : previousUrl,
    results: results,
  }

  return response
}
