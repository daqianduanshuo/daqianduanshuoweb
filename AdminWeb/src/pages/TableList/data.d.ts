export type TableListItem = {
  title: string;
  create_at: Date;
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  pageIndex: number;
};

export type TableListData = {
  lists: TableListItem[];
  pagination: Partial<TableListPagination>;
};


export type TableListParams = {
  title?: string;
  pageSize?: number;
  pageIndex?: number;
};
