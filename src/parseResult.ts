import { TimestreamQuery } from 'aws-sdk'

type ScalarTypes = boolean | Date | number | string | undefined

const parseValue = (
	value: string,
	type: TimestreamQuery.ScalarType,
): ScalarTypes => {
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

const parseDatum = (
	datum: TimestreamQuery.Datum,
	columnInfo: TimestreamQuery.ColumnInfo,
): ScalarTypes | ScalarTypes[] => {
	if (datum.NullValue === true) return undefined
	if (datum.ScalarValue !== undefined)
		return parseValue(
			datum.ScalarValue,
			columnInfo.Type.ScalarType as TimestreamQuery.ScalarType,
		)
	if (datum.ArrayValue !== undefined) {
		const a = datum.ArrayValue.map((d) => {
			if (d.NullValue === true) return undefined
			return parseValue(
				d.ScalarValue as string,
				columnInfo.Type.ArrayColumnInfo?.Type
					.ScalarType as TimestreamQuery.ScalarType,
			)
		})
		return a
	}
	throw new Error(
		`[@bifravst/timestream-helper:parseDatum] Unexpected datum: ${JSON.stringify(
			datum,
		)}`,
	)
}

const parseData = <T extends Record<string, unknown>>(
	ColumnInfo: TimestreamQuery.ColumnInfoList,
) => (Data: TimestreamQuery.DatumList): T =>
	Data.reduce(
		(record, datum, k) => ({
			...record,
			[ColumnInfo[k].Name as string]: parseDatum(datum, ColumnInfo[k]),
		}),
		{} as T,
	)

export const parseResult = <T extends Record<string, unknown>>({
	Rows,
	ColumnInfo,
}: TimestreamQuery.QueryResponse): T[] => {
	const parse = parseData<T>(ColumnInfo)
	return Rows.map(({ Data }) => parse(Data))
}
