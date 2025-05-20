import { List } from '@mui/material'

const SidenavList: React.FC = ({ children }) => (
  <List
    sx={{
      px: 2,
      my: 0.3,
    }}
  >
    {children}
  </List>
)

export default SidenavList
