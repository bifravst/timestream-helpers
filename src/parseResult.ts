import { TimestreamQuery } from 'aws-sdk'

const parseValue = (value: string, type: TimestreamQuery.ScalarType) => {
	switch (type) {
		case 'BOOLEAN':
			return value === 'true'
		case 'DOUBLE':
			return parseFloat(value)
		case 'TIMESTAMP':
			return new Date(value.replace(' ', 'T'))
		case 'INTEGER':
			return parseInt(value, 10)
		case 'UNKNOWN':
		case 'VARCHAR':
		case 'BIGINT':
		case 'DATE':
		case 'TIME':
		case 'INTERVAL_DAY_TO_SECOND':
		case 'INTERVAL_YEAR_TO_MONTH':
		default:
			return value
	}
}

const parseData = (ColumnInfo: TimestreamQuery.ColumnInfoList) => (
	Data: TimestreamQuery.DatumList,
) =>
	Data.reduce(
		(record, { ScalarValue }, k) => ({
			...record,
			[ColumnInfo[k].Name as string]: parseValue(
				ScalarValue as string,
				ColumnInfo[k].Type.ScalarType as TimestreamQuery.ScalarType,
			),
		}),
		{} as Record<string, any>,
	)

export const parseResult = ({
	Rows,
	ColumnInfo,
}: TimestreamQuery.QueryResponse): Record<
	string,
	boolean | Date | number | string
>[] => {
	const parse = parseData(ColumnInfo)
	return Rows.map(({ Data }) => parse(Data))
}
