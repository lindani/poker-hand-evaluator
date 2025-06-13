export const cardImageStyle = ({ showRemoveButton }) => `
  w-${showRemoveButton ? '24' : '16'} h-auto
  cursor-grab hover:scale-105 transition-transform
  duration-200 ease-in-out rounded-md shadow-sm
  hover:shadow-md hover:z-10
`;