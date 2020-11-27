import { parseResult } from './parseResult'

const Result = {
	QueryId: 'AEDQCAMYRSDE6KAZR7H7T5DB2WRTNJTO7S2S33ROHNVB3UIQ35QCWEFO52EWWOA',
	Rows: [
		{
			Data: [
				{
					ScalarValue: '1.0',
				},
				{
					ScalarValue: '2020-11-27 11:48:25.875000000',
				},
			],
		},
		{
			Data: [
				{
					ScalarValue: '0.0',
				},
				{
					ScalarValue: '2020-11-27 11:48:26.390000000',
				},
			],
		},
	],
	ColumnInfo: [
		{
			Name: 'value',
			Type: {
				ScalarType: 'DOUBLE',
			},
		},
		{
			Name: 'date',
			Type: {
				ScalarType: 'TIMESTAMP',
			},
		},
	],
	QueryStatus: {
		ProgressPercentage: 100,
		CumulativeBytesScanned: 106,
		CumulativeBytesMetered: 10000000,
	},
}

describe('parseResult', () => {
	it('parses an Timestream result into an array of values', () => {
		expect(parseResult(Result)).toEqual([
			{
				date: new Date('2020-11-27T11:48:25.875000000'),
				value: 1,
			},
			{
				date: new Date('2020-11-27T11:48:26.390000000'),
				value: 0,
			},
		])
	})
})
