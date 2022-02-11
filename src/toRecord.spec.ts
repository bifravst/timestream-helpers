import { MeasureValueType } from '@aws-sdk/client-timestream-write'
import { toRecord } from '.'

describe('toRecord()', () => {
	it('should convert sensor data to a timestream record', () => {
		const ts = Date.now()
		expect(
			toRecord({
				name: 'bat',
				v: 3.3,
				ts,
				dimensions: { measureGroup: 'someGroup' },
			}),
		).toEqual({
			Dimensions: [
				{
					Name: 'measureGroup',
					Value: 'someGroup',
				},
			],
			MeasureName: 'bat',
			MeasureValue: `3.3`,
			MeasureValueType: MeasureValueType.DOUBLE,
			Time: ts.toString(),
		})
	})
	it('should ignore sensor data if the value is not defined', () => {
		expect(
			toRecord({
				name: 'bat',
				v: undefined,
				ts: Date.now(),
				dimensions: { measureGroup: 'someGroup' },
			}),
		).toEqual(undefined)
	})
})
