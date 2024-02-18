'use client'
import { CardProps } from '@/interfaces/interfaces'

const CharacterCard: React.FC<CardProps> = ({ text, imageSource }) => {
  return (
    <div className=" m-auto p-1 ">
      <div className="rounded-xl hover:border-opacity-100 hover:border-white hover:cursor-pointer hover:border-2">
        <div className="rounded-xl h-4/6">
          <img
            src={imageSource}
            alt="Card"
            className="rounded-xl h-full w-full object-cover"
          />
        </div>
        <div className=" h-2/6">
          <p className="text-white text-center">{text}</p>
        </div>
      </div>
    </div>
  )
}

export default CharacterCard
