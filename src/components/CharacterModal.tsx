'use client'
import { CharacterModalProps } from '@/interfaces/interfaces'

const CharacterModal: React.FC<CharacterModalProps> = ({
  visible,
  onClose,
  modalContent,
}) => {
  const handleClose = () => {
    onClose()
  }

  const handleModalClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    // Prevent the click event from reaching the outer div so the modal does not close when it is not intended
    e.stopPropagation()
  }

  if (!visible) {
    return null
  }

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 flex justify-center items-start pt-12 bg-black bg-opacity-30 backdrop-blur-sm"
    >
      <div
        onClick={handleModalClick}
        className="grid text-black w-1/2 bg-white rounded-xl p-4"
      >
        <div className="grid h-full grid-rows-6">
          <div className="grid row-span-1 grid-cols-2">
            <div className=" col-span-1">
              <h1>{modalContent?.name}</h1>
            </div>
            <div className=" col-span-1">{`[${modalContent?.height}cm] (${modalContent?.mass}kg)`}</div>
          </div>
          <div className="row-span-5 overflow-hidden">
            Films where this character appeared:
            <div className="whitespace-normal break-all border-2 rounded-lg border-black p-1">
              {modalContent?.films.map((filmTitle, index) => (
                <p key={index} className="whitespace-normal break-all ">
                  {filmTitle}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterModal
