import { memo } from 'react'
import { MDAvatar, MDBox, MDTypography } from '~/app/presentation/components'
import { useStringHelper } from '~/app/presentation/hooks'
import { avatar } from './user-column-styles'

type Props = {
  userId: string
  userAvatarPath: string
  userFullName: string
}

const UserColumn: React.FC<Props> = ({ userId, userAvatarPath, userFullName }) => {
  const { compactName, getAvatar } = useStringHelper()

  return (
    <MDBox display='flex' alignItems='center'>
      <MDAvatar src={getAvatar(userAvatarPath)} alt={userId} size='xs' sx={avatar} />

      <MDTypography variant='caption' color='text' fontWeight='medium'>
        {compactName(userFullName)}
      </MDTypography>
    </MDBox>
  )
}

export default memo(UserColumn)
