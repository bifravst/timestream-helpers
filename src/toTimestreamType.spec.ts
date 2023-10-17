import { toTimestreamType } from './toTimestreamType.js'
import { describe, it } from 'node:test'
import assert from 'node:assert'
void describe('toTimestreamType', () => {
	for (const [v, expected] of [
		[true, 'BOOLEAN'],
		[1.1, 'DOUBLE'],
		[1, 'DOUBLE'],
		['foo', 'VARCHAR'],
		['12345678901234567890', 'VARCHAR'],
	]) {
		void it(`should determine ${v} as ${expected}`, () => {
			assert.equal(toTimestreamType(v), expected)
		})
	}
})
