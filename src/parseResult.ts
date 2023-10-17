import {
	type ColumnInfo,
	type Datum,
	type QueryResponse,
	ScalarType,
	type TimeSeriesDataPoint,
} from '@aws-sdk/client-timestream-query'

type ScalarTypes = boolean | Date | number | string | undefined

type TimeSeriesDatum = { time: Date; value: ScalarTypes }

const parseValue = (value: string, type: ScalarType): ScalarTypes => {
	switch (type) {
		case 'BOOLEAN':
			return value === 'true'
		case 'DOUBLE':
			return parseFloat(value)
		case 'TIMESTAMP':
			return new Date(`${value.replace(' ', 'T')}Z`)
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
	datum: Datum,
	columnInfo: ColumnInfo,
): ScalarTypes | ScalarTypes[] | TimeSeriesDatum[] => {
	if (datum.NullValue === true) return undefined
	if (datum.ScalarValue !== undefined)
		return parseValue(
			datum.ScalarValue,
			columnInfo.Type?.ScalarType as ScalarType,
		)
	if (datum.ArrayValue !== undefined) {
		return datum.ArrayValue.map((d: Datum) => {
			if (d.NullValue === true) return undefined
			return parseValue(
				d.ScalarValue as string,
				columnInfo.Type?.ArrayColumnInfo?.Type?.ScalarType as ScalarType,
			)
		})
	}
	if (datum.TimeSeriesValue !== undefined) {
		return datum.TimeSeriesValue.reduce(
			(
				result: { time: Date; value: ScalarTypes }[],
				timeSeriesDataPoint: TimeSeriesDataPoint,
			) => {
				if (
					timeSeriesDataPoint.Time !== undefined &&
					timeSeriesDataPoint.Value !== undefined
				) {
					const time = parseValue(
						timeSeriesDataPoint.Time,
						ScalarType.TIMESTAMP,
					) as Date

					if (columnInfo.Type?.TimeSeriesMeasureValueColumnInfo != undefined) {
						result.push({
							time,
							value: parseDatum(
								timeSeriesDataPoint.Value,
								columnInfo.Type.TimeSeriesMeasureValueColumnInfo,
							) as ScalarType,
						})
					} else {
						if (timeSeriesDataPoint.Value.ScalarValue !== undefined) {
							const value = parseValue(
								timeSeriesDataPoint.Value.ScalarValue,
								ScalarType.DOUBLE,
							)
							result.push({ time, value })
						}
					}
				}
				return result
			},
			[],
		)
	}
	throw new Error(
		`[@nordicsemiconductor/timestream-helper:parseDatum] Unexpected datum: ${JSON.stringify(
			datum,
		)}`,
	)
}

const parseData =
	<T extends Record<string, unknown>>(ColumnInfo: ColumnInfo[]) =>
	(Data: Datum[]): T =>
		Data.reduce(
			(record, datum, k) => ({
				...record,
				[ColumnInfo[k]?.Name as string]: parseDatum(
					datum,
					ColumnInfo[k] as ColumnInfo,
				),
			}),
			{} as T,
		)

export const parseResult = <T extends Record<string, unknown>>({
	Rows,
	ColumnInfo,
}: QueryResponse): T[] => {
	const parse = parseData<T>(ColumnInfo ?? [])
	return Rows?.map(({ Data }) => parse(Data ?? [])) ?? []
}
