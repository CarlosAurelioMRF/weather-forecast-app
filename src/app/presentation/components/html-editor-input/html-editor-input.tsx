import { memo, useCallback, useMemo } from 'react'
import { Control, Controller } from 'react-hook-form'
import { FormControl } from '@mui/material'
import HtmlEditor, { Item, MediaResizing, Toolbar } from 'devextreme-react/html-editor'
import { MDBox } from '~/app/presentation/components'
import { useTranslation } from '~/app/presentation/hooks'
import { CountText } from './html-editor-input-styles'

type Props = {
  name: string
  control?: Control<any>
  placeholder: string
  disabled?: boolean
  readOnly?: boolean
}

const HtmlEditorInput = ({ name, control, disabled, readOnly, placeholder }: Props) => {
  const { translate } = useTranslation('exceptions')

  const sizeValues = useMemo(() => ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'], [])
  const fontValues = useMemo(
    () => [
      'Arial',
      'Courier New',
      'Georgia',
      'Impact',
      'Lucida Console',
      'Tahoma',
      'Times New Roman',
      'Verdana',
    ],
    []
  )
  const headerValues = useMemo(() => [false, 1, 2, 3, 4, 5], [])

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ field }) => {
        const value = useMemo(() => field.value ?? '', [field.value])

        const { chars, words } = useMemo(() => {
          const text = value.replace(/<\/?[^>]+(>|$)/g, '').trim()

          return {
            chars: text.length,
            words: text.split(/\s+/).length,
          }
        }, [value.length])

        const handleChange = useCallback((event: any) => {
          if (typeof event.value === 'object') return

          field.onChange(event.value)
        }, [])

        return (
          <FormControl fullWidth>
            <HtmlEditor
              height='725px'
              onValueChanged={handleChange}
              placeholder={translate(placeholder)}
              {...{ name, value, disabled, readOnly }}
            >
              <MediaResizing enabled />
              <Toolbar multiline>
                <Item name='undo' />
                <Item name='redo' />
                <Item name='separator' />
                <Item name='size' acceptedValues={sizeValues} />
                <Item name='font' acceptedValues={fontValues} />
                <Item name='separator' />
                <Item name='bold' />
                <Item name='italic' />
                <Item name='strike' />
                <Item name='underline' />
                <Item name='separator' />
                <Item name='alignLeft' />
                <Item name='alignCenter' />
                <Item name='alignRight' />
                <Item name='alignJustify' />
                <Item name='separator' />
                <Item name='orderedList' />
                <Item name='bulletList' />
                <Item name='separator' />
                <Item name='header' acceptedValues={headerValues} />
                <Item name='separator' />
                <Item name='color' />
                <Item name='background' />
                <Item name='separator' />
                <Item name='link' />
                <Item name='image' />
                <Item name='separator' />
                <Item name='clear' />
                <Item name='codeBlock' />
                <Item name='blockquote' />
                <Item name='separator' />
                <Item name='insertTable' />
                <Item name='deleteTable' />
                <Item name='insertRowAbove' />
                <Item name='insertRowBelow' />
                <Item name='deleteRow' />
                <Item name='insertColumnLeft' />
                <Item name='insertColumnRight' />
                <Item name='deleteColumn' />
              </Toolbar>
            </HtmlEditor>

            <MDBox display='flex' justifyContent='flex-end'>
              <CountText>{translate('common:charsLength', { length: chars })}</CountText>

              <CountText>{translate('common:wordsLength', { length: words })}</CountText>
            </MDBox>
          </FormControl>
        )
      }}
    />
  )
}

export default memo(HtmlEditorInput)
