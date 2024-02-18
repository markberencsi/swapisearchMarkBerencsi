'use client'
import React, { useEffect, useState } from 'react'
import CharacterCard from './CharacterCard'
import CharacterModal from './CharacterModal'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { CharacterProps, ResultContainerProps } from '@/interfaces/interfaces'

const peopleImagesUrl =
  'https://starwars-visualguide.com/assets/img/characters/'

const getImageId = (url: string): string => {
  const matches = url.match(/\/(\d+)\/$/)
  if (matches) {
    return matches[1]
  } else {
    return ''
  }
}

const ResultContainer: React.FC<ResultContainerProps> = ({
  characterResults,
  totalPages,
  films,
  resultMessage,
}) => {
  const [characters, setCharacters] = useState<CharacterProps[]>([])
  const [showModal, setShowModal] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [activeCard, setActiveCard] = useState<CharacterProps>()
  const [isLoading, setIsLoading] = useState(true)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  useEffect(() => {
    setIsLoading(true)
    const characterPropsArray: CharacterProps[] = characterResults.map(
      (character: {
        name: any
        url: string
        height: string
        mass: string
        films: string[]
      }) => ({
        name: character.name,
        imageSource: `${peopleImagesUrl}${getImageId(character.url)}.jpg`,
        height: character.height,
        mass: character.mass,
        films: character.films.map(
          (filmUrl) => films.get(filmUrl) || 'Unknown Title',
        ),
      }),
    )
    const params = new URLSearchParams(searchParams)
    const currentPage = params.get('page')
    setPageNumber(Number(currentPage))
    setCharacters(characterPropsArray)
    setIsLoading(false)
  }, [characterResults])

  useEffect(() => {
    handleNavigation()
  }, [pageNumber])

  const handleNavigation = () => {
    const params = new URLSearchParams(searchParams)
    if (pageNumber) {
      params.set('page', `${pageNumber}`)
    } else {
      params.delete('page')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  const handleCardClick = (card: CharacterProps) => {
    setActiveCard(card)
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
  }

  if (characterResults.length === 0) {
    return (
      <div className="grid grid-flow-row justify-center align-middle w-1/2 mx-auto border-2 border-white rounded-xl p-4">
        {resultMessage}
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-flow-row justify-center align-middle w-1/2 mx-auto border-2 border-white rounded-xl p-4">
        {isLoading ? (
          <div>Loading...</div> // Display this when isLoading is true
        ) : (
          <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {characters.map((character, index) => (
              <div key={index} onClick={() => handleCardClick(character)}>
                <CharacterCard
                  imageSource={character.imageSource}
                  text={character.name}
                />
              </div>
            ))}
          </div>
        )}
        <div className=" mx-auto">
          <nav aria-label="Page navigation example">
            <ul className="flex items-center -space-x-px h-8 text-sm">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => {
                    if (pageNumber > 1) {
                      setPageNumber(pageNumber - 1)
                    }
                  }}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </a>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 ${
                      pageNumber === index + 1
                        ? 'text-blue-600 bg-blue-50'
                        : 'hover:bg-gray-100 hover:text-gray-700'
                    } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${
                      pageNumber === index + 1
                        ? 'dark:text-white'
                        : 'dark:hover:bg-gray-700 dark:hover:text-white'
                    } dark:border-gray-700 rounded-s-lg`}
                    onClick={() => {
                      setPageNumber(index + 1)
                    }}
                  >
                    {index + 1}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => {
                    if (pageNumber < totalPages) {
                      setPageNumber(pageNumber + 1)
                    }
                  }}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <CharacterModal
        visible={showModal}
        onClose={handleModalClose}
        modalContent={activeCard}
      />
    </div>
  )
}

export default ResultContainer
