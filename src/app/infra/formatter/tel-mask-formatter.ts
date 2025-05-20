import { injectable } from 'inversify'
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js'
import { MaskFormatter } from '~/app/presentation/common/protocols'

@injectable()
export class TelMaskFormatter implements MaskFormatter {
  format(value: string) {
    if (!value) return ''

    const phoneNumber = value.replace(/[^\d]/g, '')

    if (!isValidPhoneNumber(phoneNumber, 'BR')) return phoneNumber

    return parsePhoneNumber(phoneNumber, 'BR').formatNational()
  }
}
