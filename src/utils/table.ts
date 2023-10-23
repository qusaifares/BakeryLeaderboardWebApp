import { RowData } from "@/components/Table/Table";

export const transformDataToTableRow = <T extends Record<string, any>>(row: T): RowData<T> => {
  let transformed: RowData<T> = {} as RowData<T>;
  for (let key in row) {
      transformed[key] = { value: row[key] };
  }
  return transformed;
}