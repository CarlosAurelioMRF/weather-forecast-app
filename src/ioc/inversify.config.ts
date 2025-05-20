import 'reflect-metadata'
import { Container } from 'inversify'
import { ApiModule, ApplicationModule, ConstantsModule, InfraModule } from './modules'

const container = new Container()

container.load(...ApiModule, ...InfraModule, ...ApplicationModule, ...ConstantsModule)

export { container }
