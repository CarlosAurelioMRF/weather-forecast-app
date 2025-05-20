export type Paginated<T> = {
  pageIndex: number
  pageSize: number
  totalCount: number
  totalPages: number
  indexFrom: number
  items: T
  hasPreviousPage: false
  hasNextPage: false
}

export type PaginatedParams = {
  pageIndex: number
  pageSize: number
}
