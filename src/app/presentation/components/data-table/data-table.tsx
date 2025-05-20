import { forwardRef, memo, useCallback } from 'react'
import { CircularProgress } from '@mui/material'
import DataGrid, {
  ColumnChooser,
  Export,
  FilterPanel,
  Grouping,
  GroupPanel,
  HeaderFilter,
  IDataGridOptions,
  Pager,
  Paging,
  SearchPanel,
} from 'devextreme-react/data-grid'
import { exportDataGrid } from 'devextreme/excel_exporter'
import { Workbook } from 'exceljs'
import { saveAs } from 'file-saver-es'
import { MDBox } from '~/app/presentation/components'
import { useTranslation } from '~/app/presentation/hooks'

type Props = IDataGridOptions & {
  data: any
  exporFileName?: string
  children: React.ReactNode | React.ReactNode[]
  hasMultipleSelection?: boolean
  disableFilters?: boolean
  disablePages?: boolean
  disableSearch?: boolean
  disableGroup?: boolean
  loading?: boolean
  displayAll?: boolean
}

const DataTable = forwardRef<DataGrid, Props>(
  (
    {
      data,
      exporFileName,
      keyExpr,
      children,
      hasMultipleSelection,
      disableFilters,
      disablePages,
      disableSearch,
      disableGroup,
      loading,
      displayAll,
      ...props
    },
    ref
  ) => {
    const { translate } = useTranslation()

    const onExporting = useCallback((e) => {
      const workbook = new Workbook()
      const worksheet = workbook.addWorksheet(exporFileName)

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${exporFileName}.xlsx`)
        })
      })
      e.cancel = true
    }, [])

    if (loading) {
      return (
        <MDBox p={2} height='100%' display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress />
        </MDBox>
      )
    }

    return (
      <MDBox p={hasMultipleSelection ? 0 : 3}>
        <DataGrid
          ref={ref}
          id='gridContainer'
          dataSource={data}
          keyExpr={keyExpr}
          showBorders
          showColumnLines
          showRowLines
          rowAlternationEnabled
          columnAutoWidth
          allowColumnReordering
          columnHidingEnabled={false}
          onExporting={onExporting}
          {...props}
        >
          <HeaderFilter visible search={{ enabled: true }} />
          {!disablePages && <Paging defaultPageSize={displayAll ? data?.length : 10} />}
          {!disablePages && !displayAll && (
            <Pager
              visible
              showPageSizeSelector
              showInfo
              showNavigationButtons
              allowedPageSizes={[5, 10, 20]}
            />
          )}

          {!hasMultipleSelection && !disableFilters && <FilterPanel visible />}
          {!hasMultipleSelection && <Export enabled />}
          {!hasMultipleSelection && !disableGroup && <GroupPanel visible />}
          {!hasMultipleSelection && !disableGroup && (
            <Grouping contextMenuEnabled expandMode='rowClick' />
          )}
          {!hasMultipleSelection && <ColumnChooser enabled mode='select' />}
          {!hasMultipleSelection && !disableSearch && (
            <SearchPanel visible width={240} placeholder={translate('common:dataTable:search')} />
          )}

          {children}
        </DataGrid>
      </MDBox>
    )
  }
)

DataTable.displayName = 'DataTable'

export default memo(DataTable)
