import { useMemo } from 'react'
import { InfraTypes } from '~/ioc/types'
import { MaskFormatter } from '~/app/presentation/common/protocols'
import { useService } from './use-service'

export const useMaskFormatter = (mask: 'tel' | 'document' | undefined) => {
  if (!mask) {
    return null
  }

  const formatters = {
    tel: useService<MaskFormatter>(InfraTypes.FORMATTERS.TEL_MASK_FORMATTER),
    document: useService<MaskFormatter>(InfraTypes.FORMATTERS.DOCUMENT_MASK_FORMATTER),
  }

  return useMemo(() => formatters[mask], [mask])
}
