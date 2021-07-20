export interface IDBQueryConfig {
    readonly text: string,
    readonly rowMode?: string,
    values?: Array<number | string | boolean | null>,
    types?: {
        getTypeParser: () => any,
    }
}

export interface IDataModel {
    rows: any,
    command?: string,
    rowCount?: number,
    oid?: null | number,
    fields?: any[],
    rowAsArray?: boolean,
    RowCtor?: null | number,
    _types?: any,
    _parsers?: any[]
}

export interface IModel {
    status: number,
    data: IDataModel
}