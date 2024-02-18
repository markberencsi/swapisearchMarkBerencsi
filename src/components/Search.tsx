'use client'

import React, { useEffect, useState } from 'react'
import { Planet } from './CharacterSearchContainer'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

interface SearchProps {
  homeworlds: Planet[]
}

const Search: React.FC<SearchProps> = ({ homeworlds }) => {
  const [genderFilter, setGenderFilter] = useState('')
  const [homeworldFilter, setHomeworldFilter] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  useEffect(() => {
    handleSearch()
  }, [genderFilter, homeworldFilter, searchTerm])

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams)
    if (searchTerm !== '') {
      params.set('query', searchTerm)
      params.set('page', '1')
    } else {
      params.delete('query')
      params.set('page', '1')
    }
    if (homeworldFilter !== '') {
      params.set('homeworld', homeworldFilter)
      params.set('page', '1')
    } else {
      params.delete('homeworld')
      params.set('page', '1')
    }
    if (genderFilter !== '') {
      params.set('gender', genderFilter)
      params.set('page', '1')
    } else {
      params.delete('gender')
      params.set('page', '1')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <form className="flex flex-col md:flex-row gap-3 w-1/2">
      <div className="flex">
        <input
          type="text"
          placeholder="Search character"
          className="w-full px-3 h-10 rounded-l  text-black"
          defaultValue={searchParams.get('query')?.toString()}
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
        />
      </div>
      <select
        name="gender"
        id="genders"
        className=" rounded-lg text-black"
        defaultValue={searchParams.get('gender')?.toString()}
        onChange={(e) => {
          setGenderFilter(e.target.value)
        }}
      >
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="unknown">Unknown</option>
        <option value="n/a">n/a</option>
      </select>
      <select
        name="homeworld"
        id="homeworlds"
        className=" rounded-lg text-black"
        defaultValue={searchParams.get('homeworld')?.toString()}
        onChange={(e) => {
          setHomeworldFilter(e.target.value)
        }}
      >
        <option value="">Homeworld</option>
        {homeworlds.map((homeworld) => (
          <option key={homeworld.url} value={homeworld.url}>
            {homeworld.name}
          </option>
        ))}
      </select>
    </form>
  )
}

export default Search
