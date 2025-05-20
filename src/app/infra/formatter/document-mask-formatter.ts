import { injectable } from 'inversify'
import { MaskFormatter } from '~/app/presentation/common/protocols'

@injectable()
export class DocumentMaskFormatter implements MaskFormatter {
  format(value: string) {
    if (!value) return ''

    const document = value.replace(/[^\d]/g, '')

    if (document.length <= 11)
      return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')

    return document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5')
  }
}
