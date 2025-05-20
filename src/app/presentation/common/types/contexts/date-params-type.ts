export type DateParamsType = {
  initialDate: string
  finalDate: string
}

export type ProductivityParamsType = DateParamsType & {
  period: string
  departments: string[]
}
