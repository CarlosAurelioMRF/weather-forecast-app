import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import '~/app/main/config/i18next-setup'
import { loadMessages, locale } from 'devextreme/localization'
import ptMessages from 'devextreme/localization/messages/pt.json'
import Router from './router/router'

loadMessages(ptMessages)
locale(navigator.language)

ReactDOM.render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>,
  document.getElementById('root')
)
