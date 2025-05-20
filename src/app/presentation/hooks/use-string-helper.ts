import {
  countBy as countByLodash,
  Dictionary,
  groupBy as groupByLodash,
  isNil, // eslint-disable-line
  List,
  ListIteratee,
  Many,
  mapKeys as mapKeysLodash,
  ObjectIteratee,
  omitBy,
  orderBy as orderByLodash,
  reduce,
  startCase,
  sumBy as sumByLodash,
  uniqBy as uniqByLodash,
} from 'lodash'

export const useStringHelper = () => {
  const compactName = (name: string) => {
    if (!name) return ''

    return startCase(
      name
        .trim()
        .toLowerCase()
        .split(/(\s).+\s/)
        .join('')
    ).trim()
  }

  const formatDocumentNumber = (value: string) => {
    if (!value) return ''

    const documentNumber = value.replace(/[^\d]/g, '')

    if (documentNumber.length <= 11)
      return documentNumber.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')

    return documentNumber.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5')
  }

  const formatMoney = (value: number) => {
    return (value ?? 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  const formatPercent = (value: number) => {
    return (value ?? 0).toLocaleString('pt-BR', {
      style: 'percent',
      maximumFractionDigits: 0,
    })
  }

  const orderBy = <T>(
    collection: List<T> | null | undefined,
    iteratees?: Many<ListIteratee<T>>,
    orders?: Many<boolean | 'asc' | 'desc'>
  ) => orderByLodash(collection, iteratees, orders)

  const uniq = (arr: string[]) => [...new Set(arr)]

  const keys = (obj: any) => Object.keys(obj)

  const countBy = <T>(arr: T[], property: string) => countByLodash(arr, property)

  const mapKeys = <T extends object>(
    object: T | null | undefined,
    iteratee?: ObjectIteratee<T>
  ): Dictionary<T[keyof T]> => mapKeysLodash(object, iteratee)

  const cleanObject = <T>(obj: T) => omitBy(obj, isNil) as T

  const isUuid = (value: string) =>
    value?.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
      ?.length > 0

  const getAvatar = (avatarPath?: string) =>
    avatarPath
      ? `${(process.env.NEXT_PUBLIC_API_URL as string).substring(
          0,
          (process.env.NEXT_PUBLIC_API_URL as string).length - 3
        )}${avatarPath}`
      : '/images/default-avatar.png'

  const getFilePath = (folder: string, filename: string) =>
    `${(process.env.NEXT_PUBLIC_API_URL as string).substring(
      0,
      (process.env.NEXT_PUBLIC_API_URL as string).length - 3
    )}/${folder}/${filename}`

  return {
    compactName,
    countBy,
    groupBy: groupByLodash,
    formatDocumentNumber,
    orderBy,
    uniq,
    keys,
    cleanObject,
    isUuid,
    mapKeys,
    sumBy: sumByLodash,
    formatMoney,
    getAvatar,
    getFilePath,
    uniqBy: uniqByLodash,
    reduce,
    formatPercent,
  }
}
