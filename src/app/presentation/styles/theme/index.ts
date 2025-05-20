/**
=========================================================
* Material Dashboard 2 PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { createTheme } from '@mui/material'
import borders from '~/app/presentation/styles/theme/base/borders'
import boxShadows from '~/app/presentation/styles/theme/base/boxShadows'
import breakpoints from '~/app/presentation/styles/theme/base/breakpoints'
// Material Dashboard 2 PRO React TS Base Styles
import colors from '~/app/presentation/styles/theme/base/colors'
import globals from '~/app/presentation/styles/theme/base/globals'
import typography from '~/app/presentation/styles/theme/base/typography'
import appBar from '~/app/presentation/styles/theme/components/appBar'
import avatar from '~/app/presentation/styles/theme/components/avatar'
import breadcrumbs from '~/app/presentation/styles/theme/components/breadcrumbs'
import button from '~/app/presentation/styles/theme/components/button'
import buttonBase from '~/app/presentation/styles/theme/components/buttonBase'
import card from '~/app/presentation/styles/theme/components/card'
import cardContent from '~/app/presentation/styles/theme/components/card/cardContent'
import cardMedia from '~/app/presentation/styles/theme/components/card/cardMedia'
import container from '~/app/presentation/styles/theme/components/container'
import dialog from '~/app/presentation/styles/theme/components/dialog'
import dialogActions from '~/app/presentation/styles/theme/components/dialog/dialogActions'
import dialogContent from '~/app/presentation/styles/theme/components/dialog/dialogContent'
import dialogContentText from '~/app/presentation/styles/theme/components/dialog/dialogContentText'
import dialogTitle from '~/app/presentation/styles/theme/components/dialog/dialogTitle'
import divider from '~/app/presentation/styles/theme/components/divider'
import flatpickr from '~/app/presentation/styles/theme/components/flatpickr'
import autocomplete from '~/app/presentation/styles/theme/components/form/autocomplete'
import checkbox from '~/app/presentation/styles/theme/components/form/checkbox'
import formControlLabel from '~/app/presentation/styles/theme/components/form/formControlLabel'
import formLabel from '~/app/presentation/styles/theme/components/form/formLabel'
import input from '~/app/presentation/styles/theme/components/form/input'
import inputLabel from '~/app/presentation/styles/theme/components/form/inputLabel'
import inputOutlined from '~/app/presentation/styles/theme/components/form/inputOutlined'
import radio from '~/app/presentation/styles/theme/components/form/radio'
import select from '~/app/presentation/styles/theme/components/form/select'
import switchButton from '~/app/presentation/styles/theme/components/form/switchButton'
import textField from '~/app/presentation/styles/theme/components/form/textField'
import icon from '~/app/presentation/styles/theme/components/icon'
import iconButton from '~/app/presentation/styles/theme/components/iconButton'
import linearProgress from '~/app/presentation/styles/theme/components/linearProgress'
import link from '~/app/presentation/styles/theme/components/link'
import list from '~/app/presentation/styles/theme/components/list'
import listItem from '~/app/presentation/styles/theme/components/list/listItem'
import listItemText from '~/app/presentation/styles/theme/components/list/listItemText'
import menu from '~/app/presentation/styles/theme/components/menu'
import menuItem from '~/app/presentation/styles/theme/components/menu/menuItem'
import popover from '~/app/presentation/styles/theme/components/popover'
// Material Dashboard 2 PRO React TS components base styles for @mui material components
import sidenav from '~/app/presentation/styles/theme/components/sidenav'
import slider from '~/app/presentation/styles/theme/components/slider'
import stepper from '~/app/presentation/styles/theme/components/stepper'
import step from '~/app/presentation/styles/theme/components/stepper/step'
import stepConnector from '~/app/presentation/styles/theme/components/stepper/stepConnector'
import stepIcon from '~/app/presentation/styles/theme/components/stepper/stepIcon'
import stepLabel from '~/app/presentation/styles/theme/components/stepper/stepLabel'
import svgIcon from '~/app/presentation/styles/theme/components/svgIcon'
import tableCell from '~/app/presentation/styles/theme/components/table/tableCell'
import tableContainer from '~/app/presentation/styles/theme/components/table/tableContainer'
import tableHead from '~/app/presentation/styles/theme/components/table/tableHead'
import tabs from '~/app/presentation/styles/theme/components/tabs'
import tab from '~/app/presentation/styles/theme/components/tabs/tab'
import tooltip from '~/app/presentation/styles/theme/components/tooltip'
// Material Dashboard 2 PRO React TS Helper Functions
import boxShadow from '~/app/presentation/styles/theme/functions/boxShadow'
import hexToRgb from '~/app/presentation/styles/theme/functions/hexToRgb'
import linearGradient from '~/app/presentation/styles/theme/functions/linearGradient'
import pxToRem from '~/app/presentation/styles/theme/functions/pxToRem'
import rgba from '~/app/presentation/styles/theme/functions/rgba'

export const makeLightTheme = () =>
  createTheme({
    breakpoints: { ...breakpoints },
    palette: { ...colors },
    typography: { ...typography },
    boxShadows: { ...boxShadows },
    borders: { ...borders },
    functions: {
      boxShadow,
      hexToRgb,
      linearGradient,
      pxToRem,
      rgba,
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ...globals,
          ...flatpickr,
          ...container,
        },
      },
      MuiDrawer: { ...sidenav },
      MuiList: { ...list },
      MuiListItem: { ...listItem },
      MuiListItemText: { ...listItemText },
      MuiCard: { ...card },
      MuiCardMedia: { ...cardMedia },
      MuiCardContent: { ...cardContent },
      MuiButton: { ...button },
      MuiIconButton: { ...iconButton },
      MuiInput: { ...input },
      MuiInputLabel: { ...inputLabel },
      MuiOutlinedInput: { ...inputOutlined },
      MuiTextField: { ...textField },
      MuiMenu: { ...menu },
      MuiMenuItem: { ...menuItem },
      MuiSwitch: { ...switchButton },
      MuiDivider: { ...divider },
      MuiTableContainer: { ...tableContainer },
      MuiTableHead: { ...tableHead },
      MuiTableCell: { ...tableCell },
      MuiLinearProgress: { ...linearProgress },
      MuiBreadcrumbs: { ...breadcrumbs },
      MuiSlider: { ...slider },
      MuiAvatar: { ...avatar },
      MuiTooltip: { ...tooltip },
      MuiAppBar: { ...appBar },
      MuiTabs: { ...tabs },
      MuiTab: { ...tab },
      MuiStepper: { ...stepper },
      MuiStep: { ...step },
      MuiStepConnector: { ...stepConnector },
      MuiStepLabel: { ...stepLabel },
      MuiStepIcon: { ...stepIcon },
      MuiSelect: { ...select },
      MuiFormControlLabel: { ...formControlLabel },
      MuiFormLabel: { ...formLabel },
      MuiCheckbox: { ...checkbox },
      MuiRadio: { ...radio },
      MuiAutocomplete: { ...autocomplete },
      MuiPopover: { ...popover },
      MuiButtonBase: { ...buttonBase },
      MuiIcon: { ...icon },
      MuiSvgIcon: { ...svgIcon },
      MuiLink: { ...link },
      MuiDialog: { ...dialog },
      MuiDialogTitle: { ...dialogTitle },
      MuiDialogContent: { ...dialogContent },
      MuiDialogContentText: { ...dialogContentText },
      MuiDialogActions: { ...dialogActions },
    },
  })
