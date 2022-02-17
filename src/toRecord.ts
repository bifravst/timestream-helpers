import { TimeUnit, _Record } from '@aws-sdk/client-timestream-write'
import { toTimestreamType } from './toTimestreamType'

export type RecordWithTime = _Record & {
	Time: Required<_Record['Time']>
	TimeUnit: Required<_Record['TimeUnit']>
}

export const toRecord = ({
	name,
	ts,
	v,
	dimensions,
}: {
	name: string
	ts: number
	v?: { toString: () => string }
	dimensions?: Record<string, string>
}): RecordWithTime | undefined => {
	if (v === undefined) return
	return {
		Dimensions: Object.entries(dimensions ?? {}).map(([Name, Value]) => ({
			Name,
			Value,
		})),
		MeasureName: name,
		MeasureValue: v.toString(),
		MeasureValueType: toTimestreamType(v),
		Time: ts.toString(),
		TimeUnit: TimeUnit.MILLISECONDS,
	}
}
