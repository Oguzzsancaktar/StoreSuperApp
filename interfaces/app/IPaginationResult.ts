interface IPaginationResult<T> {
  boostedItems: T[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  items: T[]
  pageNumber: number
  paginationToken: string
  totalCount: number
  totalPages: number
}

export default IPaginationResult
