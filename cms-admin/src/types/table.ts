export interface ColumnModel {
  key: string
  label: string
  render?: (data: unknown) => React.ReactNode
  sortable?: boolean
  columnWidth?: string
  sortType?: 'text' | 'number' | 'date'
}
