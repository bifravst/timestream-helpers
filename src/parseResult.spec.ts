import { parseResult } from './parseResult'

describe('parseResult', () => {
	it('parses a Timestream result into an array of values', () => {
		expect(
			parseResult({
				QueryId:
					'AEDQCAMYRSDE6KAZR7H7T5DB2WRTNJTO7S2S33ROHNVB3UIQ35QCWEFO52EWWOA',
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
			}),
		).toEqual([
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
	it('parses a Timestream result with array values into an array of values', () => {
		expect(
			parseResult({
				QueryId:
					'AEDQCAMYTX3JJZJFMU5ZTAVMZU4U7JWRY2NJSFPC4FKM7SFOLUREP7WTUTBO2RI',
				Rows: [
					{
						Data: [
							{
								ArrayValue: [
									{
										ScalarValue: '10.445680618286135',
									},
									{
										ScalarValue: '0.0',
									},
									{
										ScalarValue: '0.0',
									},
									{
										ScalarValue: '63.42264354721504',
									},
									{
										ScalarValue: '0.0',
									},
									{
										NullValue: true,
									},
								],
							},
							{
								ArrayValue: [
									{
										ScalarValue: 'gps.lng',
									},
									{
										ScalarValue: 'gps.spd',
									},
									{
										ScalarValue: 'gps.hdg',
									},
									{
										ScalarValue: 'gps.lat',
									},
									{
										ScalarValue: 'gps.alt',
									},
									{
										ScalarValue: 'gps.acc',
									},
								],
							},
							{
								ScalarValue: '2020-11-30 14:31:12.494000000',
							},
						],
					},
					{
						Data: [
							{
								ArrayValue: [
									{
										ScalarValue: '0.0',
									},
									{
										ScalarValue: '0.0',
									},
									{
										ScalarValue: '0.0',
									},
									{
										ScalarValue: '10.432462692260744',
									},
									{
										ScalarValue: '63.41834229712906',
									},
									{
										ScalarValue: '0.0',
									},
								],
							},
							{
								ArrayValue: [
									{
										ScalarValue: 'gps.alt',
									},
									{
										ScalarValue: 'gps.spd',
									},
									{
										ScalarValue: 'gps.acc',
									},
									{
										ScalarValue: 'gps.lng',
									},
									{
										ScalarValue: 'gps.lat',
									},
									{
										ScalarValue: 'gps.hdg',
									},
								],
							},
							{
								ScalarValue: '2020-11-30 14:31:10.863000000',
							},
						],
					},
					{
						Data: [
							{
								ArrayValue: [
									{
										ScalarValue: '0.0',
									},
									{
										ScalarValue: '10.430212100000002',
									},
									{
										ScalarValue: '63.4249408',
									},
									{
										ScalarValue: '0.0',
									},
									{
										ScalarValue: '0.0',
									},
									{
										ScalarValue: '0.0',
									},
								],
							},
							{
								ArrayValue: [
									{
										ScalarValue: 'gps.hdg',
									},
									{
										ScalarValue: 'gps.lng',
									},
									{
										ScalarValue: 'gps.lat',
									},
									{
										ScalarValue: 'gps.alt',
									},
									{
										ScalarValue: 'gps.spd',
									},
									{
										ScalarValue: 'gps.acc',
									},
								],
							},
							{
								ScalarValue: '2020-11-30 14:31:10.582000000',
							},
						],
					},
					{
						Data: [
							{
								ArrayValue: [
									{
										ScalarValue: '0.0',
									},
									{
										ScalarValue: '63.42003215091831',
									},
									{
										ScalarValue: '0.0',
									},
									{
										ScalarValue: '0.0',
									},
									{
										ScalarValue: '0.0',
									},
									{
										ScalarValue: '10.434179306030275',
									},
								],
							},
							{
								ArrayValue: [
									{
										ScalarValue: 'gps.spd',
									},
									{
										ScalarValue: 'gps.lat',
									},
									{
										ScalarValue: 'gps.hdg',
									},
									{
										ScalarValue: 'gps.acc',
									},
									{
										ScalarValue: 'gps.alt',
									},
									{
										ScalarValue: 'gps.lng',
									},
								],
							},
							{
								ScalarValue: '2020-11-30 14:31:10.129000000',
							},
						],
					},
					{
						Data: [
							{
								ArrayValue: [
									{
										ScalarValue: '63.4249408',
									},
									{
										ScalarValue: '0.0',
									},
									{
										ScalarValue: '0.0',
									},
									{
										ScalarValue: '0.0',
									},
									{
										ScalarValue: '10.430212100000002',
									},
									{
										ScalarValue: '0.0',
									},
								],
							},
							{
								ArrayValue: [
									{
										ScalarValue: 'gps.lat',
									},
									{
										ScalarValue: 'gps.alt',
									},
									{
										ScalarValue: 'gps.acc',
									},
									{
										ScalarValue: 'gps.spd',
									},
									{
										ScalarValue: 'gps.lng',
									},
									{
										ScalarValue: 'gps.hdg',
									},
								],
							},
							{
								ScalarValue: '2020-11-30 14:31:08.617000000',
							},
						],
					},
				],
				ColumnInfo: [
					{
						Name: 'value',
						Type: {
							ArrayColumnInfo: {
								Type: {
									ScalarType: 'DOUBLE',
								},
							},
						},
					},
					{
						Name: 'keys',
						Type: {
							ArrayColumnInfo: {
								Type: {
									ScalarType: 'VARCHAR',
								},
							},
						},
					},
					{
						Name: 'time',
						Type: {
							ScalarType: 'TIMESTAMP',
						},
					},
				],
				QueryStatus: {
					ProgressPercentage: 100,
					CumulativeBytesScanned: 18870,
					CumulativeBytesMetered: 10000000,
				},
			}),
		).toEqual([
			{
				value: [
					10.445680618286135,
					0.0,
					0.0,
					63.42264354721504,
					0.0,
					undefined,
				],
				keys: [
					'gps.lng',
					'gps.spd',
					'gps.hdg',
					'gps.lat',
					'gps.alt',
					'gps.acc',
				],
				time: new Date('2020-11-30 14:31:12.494000000'),
			},
			{
				value: [0.0, 0.0, 0.0, 10.432462692260744, 63.41834229712906, 0.0],
				keys: [
					'gps.alt',
					'gps.spd',
					'gps.acc',
					'gps.lng',
					'gps.lat',
					'gps.hdg',
				],
				time: new Date('2020-11-30 14:31:10.863000000'),
			},
			{
				value: [0.0, 10.430212100000002, 63.4249408, 0.0, 0.0, 0.0],
				keys: [
					'gps.hdg',
					'gps.lng',
					'gps.lat',
					'gps.alt',
					'gps.spd',
					'gps.acc',
				],
				time: new Date('2020-11-30 14:31:10.582000000'),
			},
			{
				value: [0.0, 63.42003215091831, 0.0, 0.0, 0.0, 10.434179306030275],
				keys: [
					'gps.spd',
					'gps.lat',
					'gps.hdg',
					'gps.acc',
					'gps.alt',
					'gps.lng',
				],
				time: new Date('2020-11-30 14:31:10.129000000'),
			},
			{
				value: [63.4249408, 0.0, 0.0, 0.0, 10.430212100000002, 0.0],
				keys: [
					'gps.lat',
					'gps.alt',
					'gps.acc',
					'gps.spd',
					'gps.lng',
					'gps.hdg',
				],
				time: new Date('2020-11-30 14:31:08.617000000'),
			},
		])
	})
})
