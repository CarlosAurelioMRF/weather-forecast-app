import { memo, useCallback } from 'react'
import { TagBox } from 'devextreme-react'

const nameLabel = { 'aria-label': 'name' }

const TagColumn = ({ data }: any) => {
  const onValueChanged = useCallback(
    (e: any) => {
      data.setValue(e.value)
    },
    [data]
  )

  const onSelectionChanged = useCallback(() => {
    data.component.updateDimensions()
  }, [data])

  return (
    <TagBox
      dataSource={data.column.lookup.dataSource}
      defaultValue={data.value}
      valueExpr='id'
      displayExpr='name'
      showSelectionControls={true}
      maxDisplayedTags={3}
      inputAttr={nameLabel}
      showMultiTagOnly={false}
      applyValueMode='useButtons'
      searchEnabled={true}
      onValueChanged={onValueChanged}
      onSelectionChanged={onSelectionChanged}
    />
  )
}

export default memo(TagColumn)
