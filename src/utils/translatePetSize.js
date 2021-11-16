export default function translatePetSize(size) {
  if (size.toLowerCase() === 'large') return 'Grande'
  else if (size.toLowerCase() === 'medium') return 'Médio'
  else if (size.toLowerCase() === 'small') return 'Pequeno'
}