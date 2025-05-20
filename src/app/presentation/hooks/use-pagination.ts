import { useCallback, useEffect, useMemo, useState } from 'react'
import { Paginated, PaginatedParams } from '~/app/domain/common/types'

type UseQueryParams<T = unknown> = {
  pageSize?: number
  data: Paginated<T>
  fetcher: (params: PaginatedParams) => void
}

type UsePaginatedQueryTypes = Omit<Paginated<unknown>, 'items'> & {
  onReload: () => void
  nextPage: () => void
  prevPage: () => void
  setPage: (pageIndex: number) => void
  pageIndex: number
}

export const usePagination = <T = unknown>({
  fetcher,
  data,
  pageSize: defaultPageSize = 10,
}: UseQueryParams<T>): UsePaginatedQueryTypes => {
  const [pageIndex, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    fetcher({ pageIndex, pageSize })
  }, [fetcher, pageIndex, pageSize, reload])

  useEffect(() => {
    if (data) {
      setPage(data.pageIndex)
      setPageSize(data.pageSize)
    }
  }, [data])

  const onReload = useCallback(() => {
    setPage(0)
    setPageSize(10)
    setReload((currenctValue) => !currenctValue)
  }, [])

  const isLastPage = useCallback((): boolean => !data?.hasNextPage, [data?.hasNextPage])
  const isFirstPage = useCallback((): boolean => !data?.hasPreviousPage, [data?.hasPreviousPage])

  const nextPage = useCallback((): void => {
    if (isLastPage()) {
      return null
    }
    setPage((prev) => {
      return prev + 1
    })
  }, [isLastPage])

  const prevPage = useCallback((): void => {
    if (isFirstPage()) {
      return null
    }

    setPage((prev) => {
      return prev - 1
    })
  }, [isFirstPage])

  const handlePage = useCallback((pageIndex: number) => {
    setPage(pageIndex - 1)
  }, [])

  const paginationData = useMemo(() => {
    const { ...paginationData } = data

    delete paginationData.items

    return paginationData
  }, [data])

  return {
    ...paginationData,
    nextPage,
    prevPage,
    setPage: handlePage,
    pageIndex: pageIndex + 1,
    onReload,
  }
}
