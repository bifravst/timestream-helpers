import { MeasureValueType, TimeUnit } from '@aws-sdk/client-timestream-write'
import assert from 'node:assert'
import { describe, it } from 'node:test'
import { toRecord } from './toRecord.js'

void describe('toRecord()', () => {
	void it('should convert sensor data to a timestream record', () => {
		const ts = Date.now()
		assert.deepEqual(
			toRecord({
				name: 'bat',
				v: 3.3,
				ts,
				dimensions: { measureGroup: 'someGroup' },
			}),
			{
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
				TimeUnit: TimeUnit.MILLISECONDS,
			},
		)
	})
	void it('should ignore sensor data if the value is not defined', () => {
		assert.deepEqual(
			toRecord({
				name: 'bat',
				ts: Date.now(),
				dimensions: { measureGroup: 'someGroup' },
			}),
			undefined,
		)
	})
})
