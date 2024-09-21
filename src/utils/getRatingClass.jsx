const getRatingClass = (rating) => {
  if (rating <= 3) return 'rating-low'
  if (rating <= 5) return 'rating-medium'
  if (rating <= 7) return 'rating-high'
  return 'rating-excellent'
}

export default getRatingClass
