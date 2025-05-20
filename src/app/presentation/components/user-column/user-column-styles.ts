import { Theme } from '@mui/material/styles'

function avatar() {
  return {
    border: ({ borders: { borderWidth }, palette: { white } }: Theme) =>
      `${borderWidth[2]} solid ${white.main}`,
    cursor: 'pointer',
    position: 'relative',
    ml: 0.5,
    mr: 1,

    '&:hover, &:focus': {
      zIndex: '10',
    },
  }
}

export { avatar }
