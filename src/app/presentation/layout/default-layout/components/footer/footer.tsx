import React from 'react'
import { MDBox } from '~/app/presentation/components'
import { useTranslation } from '~/app/presentation/hooks'
import typography from '~/app/presentation/styles/theme/base/typography'

const Footer: React.FC = () => {
  const { translate } = useTranslation()
  const { size } = typography

  return (
    <MDBox
      width='100%'
      display='flex'
      flexDirection={{ xs: 'column', lg: 'row' }}
      justifyContent='space-between'
      alignItems='center'
      px={1.5}
    >
      <MDBox
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexWrap='wrap'
        color='text'
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()} {translate('common:developerName')}
      </MDBox>
    </MDBox>
  )
}

export default Footer
