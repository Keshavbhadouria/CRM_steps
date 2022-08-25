/*
 * The ColumnSettings interface consists of a primaryKey property which holds the * cell value,
 a header property which is used as the column header, and a format * of enum type PipeFormat to specify formatting.
  The PipeFormat could be
 * DEFAULT, CURRENCY OR DATE, other formats can be added in the future.
 */

export enum PipeFormat {
  DEFAULT, // 0
  CURRENCY, // 1
  DATE, // 2
  PERCENTAGE, // 3
  Time, //4
}

export interface ColumnSetting {
  primaryKey: string;
  header?: string;
  format?: PipeFormat;
  type?: string;
  // alternativeKeys?: string[];
}

export interface ButtonSettings {
  title: string;
  func: any;
  class?: string[];
  params?: Object;
  icon?: string;
}

export class PaginationSettings {
  pageSize: number = 10;
  pageIndex: number = 0;
  noOfPages: number = 0;
  totalCount: number = 0;
  getRecords: () => void;

  setPageIndexNgb: (index: any) => void = (index: any) => {
      this.pageIndex = index;
      this.getRecords();
  };


  setPageIndex: (index: any) => void = (index: any) => {
    if (index != this.pageIndex) {
      this.pageIndex = index;
      this.getRecords();
    }
  };
  gotoNextPage: () => void = () => {
    if (this.pageIndex >= 0 && this.pageIndex < this.noOfPages - 1) {
      this.pageIndex = this.pageIndex + 1;
      this.getRecords();
    }
  };
  gotoPreviousPage: () => void = () => {
    if (this.pageIndex > 0) {
      this.pageIndex = this.pageIndex - 1;
      this.getRecords();
    }
  };
  setPaginationData: (res: any) => void = (res) => {
    this.totalCount = res.result.totalCount;
    this.noOfPages = Math.ceil(this.totalCount / this.pageSize);
  }
}

