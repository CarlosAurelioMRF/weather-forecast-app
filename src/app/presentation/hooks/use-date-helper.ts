import {
  addDays,
  addHours,
  addMinutes,
  differenceInMinutes,
  eachDayOfInterval,
  endOfMonth as endOfMonthDateFns,
  endOfWeek,
  endOfYear as endOfYearDateFns,
  format as formatDateFns,
  formatDistance as formatDistanceDateFns,
  formatISO as formatISODateFns,
  intervalToDuration,
  isValid,
  lastDayOfQuarter,
  parse,
  parseISO,
  setQuarter,
  startOfDay,
  startOfHour,
  startOfMonth as startOfMonthDateFns,
  startOfQuarter as startOfQuarterDateFns,
  startOfWeek,
  startOfYear as startOfYearDateFns,
  startOfYesterday,
  subDays as subDaysDateFns,
  subMonths,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const useDateHelper = () => {
  const formatDate = (value: string | Date, pattern: string = 'dd/MM/yyyy HH:mm') => {
    const date = new Date(value)

    if (!isValid(date) || date.getFullYear() === 1) return ''

    return formatDateFns(date, pattern, { locale: ptBR })
  }

  const stringToDate = (value: string): Date => {
    if (!value) return null

    const date = new Date(value)

    if (isValid(date) && date.getFullYear() !== 1) return date

    if (date.getFullYear() === 1) return null

    return parseISO(value)
  }

  const parseDate = (value: string, pattern: string = 'P'): Date =>
    parse(value, pattern, new Date(), { locale: ptBR })

  const formatISO = (
    date: Date | number,
    representation: 'date' | 'complete' | 'time' = 'date'
  ): string => formatISODateFns(date, { representation })

  const countDown = (minutes: number): string => {
    const duration = intervalToDuration({ start: 0, end: minutes * 60 * 1000 })
    let time = ''

    if (duration.years) time += `${duration.years} anos,`
    if (duration.months) time += ` ${duration.months} meses,`
    if (duration.days) time += ` ${duration.days} dias,`
    if (duration.hours) time += ` ${duration.hours} horas,`
    if (duration.minutes) time += ` ${duration.minutes} minutos`

    if (time.endsWith(',')) time = time.substring(0, time.length - 1).trim()

    time = time.replace(/,(?=[^,]*$)/, ' e').trim()

    if (time.endsWith(' e')) time = time.substring(0, time.length - 1).trim()

    return time
  }

  const formatTimeToFinish = (days: number, hours: number, minutes: number): string => {
    let time = ''

    if (days > 0) time += ` ${days} dias,`
    if (hours > 0) time += ` ${hours} horas,`
    if (minutes > 0) time += ` ${minutes} minutos,`

    if (time.endsWith(',')) time = time.substring(0, time.length - 1).trim()

    time = time.replace(/,(?=[^,]*$)/, ' e').trim()

    if (time.endsWith(' e')) time = time.substring(0, time.length - 1).trim()

    return time
  }

  const startOfMonth = (date: Date | number) => startOfMonthDateFns(date)

  const endOfMonth = (date: Date | number) => endOfMonthDateFns(date)

  const getYesterday = () => startOfYesterday()

  const subDays = (date: Date | number, amount: number) => subDaysDateFns(date, amount)

  const formatDuration = (minutes: number): string =>
    `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(
      Math.round(minutes % 60)
    ).padStart(2, '0')}`

  const getTime = (minutes: number) =>
    formatDate(addMinutes(startOfDay(new Date()), minutes) as unknown as string, 'HH:mm')

  const startOfQuarter = (date: Date, quarter: number): Date =>
    startOfQuarterDateFns(setQuarter(date, quarter))

  const endOfQuarter = (date: Date): Date => lastDayOfQuarter(date)

  const formatDistance = (value: Date) => {
    const date = new Date(value)

    if (!isValid(date) || date.getFullYear() === 1) return ''

    return formatDistanceDateFns(date, new Date(), { addSuffix: true, locale: ptBR })
  }

  const getWeekDays = () => {
    const daysOfWeek = eachDayOfInterval({
      start: startOfWeek(new Date()),
      end: endOfWeek(new Date()),
    })

    return daysOfWeek.map((day) => ({
      id: Number(formatDate(day, 'i')),
      label: formatDate(day, 'E'),
    }))
  }

  const getDayByWeekDayName = (weekDay: string) => {
    const daysOfWeek = eachDayOfInterval({
      start: startOfWeek(new Date()),
      end: endOfWeek(new Date()),
    })

    for (const day of daysOfWeek) {
      if (formatDate(day, 'EEEE') === weekDay) {
        return day
      }
    }

    return new Date()
  }

  return {
    countDown,
    formatDate,
    stringToDate,
    parseDate,
    formatISO,
    startOfMonth,
    endOfMonth,
    getYesterday,
    subDays,
    formatDuration,
    formatTimeToFinish,
    addMinutes,
    startOfDay,
    getTime,
    startOfYear: startOfYearDateFns,
    endOfYear: endOfYearDateFns,
    startOfQuarter,
    endOfQuarter,
    formatDistance,
    subMonths,
    addDays,
    addHours,
    startOfHour,
    differenceInMinutes,
    startOfWeek,
    endOfWeek,
    getWeekDays,
    getDayByWeekDayName,
  }
}
