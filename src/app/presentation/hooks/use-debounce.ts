import { useEffect, useMemo, useState } from 'react'

export const useDebounce = (value: string, delay: number = 500): string => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return useMemo(() => debouncedValue, [debouncedValue])
}
