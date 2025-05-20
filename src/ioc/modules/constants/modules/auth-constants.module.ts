import { ContainerModule } from 'inversify'
import { ConstantTypes } from '~/ioc/types'

export const AuthConstantsModule = new ContainerModule((bind) => {
  bind<string>(ConstantTypes.AUTH.TOKEN_KEY).toDynamicValue(() => '@weathers/token')
})
