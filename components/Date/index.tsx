import { parseISO, format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import React from 'react'

export interface DateProps {
  dateString: string
}

const DateTime: React.FC<DateProps> = ({ dateString }) => {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, "EEEE，yyyy-MM-dd", { locale: zhCN })}</time>
}

export default DateTime
