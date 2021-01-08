import {
	TimestreamWriteClient,
	DescribeEndpointsCommand as DescribeWriteEndpointsCommand,
} from '@aws-sdk/client-timestream-write'

import {
	TimestreamQueryClient,
	DescribeEndpointsCommand as DescribeQueryEndpointsCommand,
} from '@aws-sdk/client-timestream-query'

/**
 * Discover the endpoint for writing to Timestream and return a client
 */
export const writeClient = async (
	{ defaultRegion }: { defaultRegion: string } = { defaultRegion: 'us-east-1' },
): Promise<TimestreamWriteClient> =>
	new TimestreamWriteClient({})
		.send(new DescribeWriteEndpointsCommand({}))
		.then(
			({ Endpoints }) =>
				new TimestreamWriteClient({
					endpoint: `https://${
						Endpoints?.[0].Address ??
						`ingest-cell1.timestream.${defaultRegion}.amazonaws.com`
					}`,
				}),
		)

/**
 * Discover the endpoint for querying Timestream and return a client
 */
export const queryClient = async (
	{ defaultRegion }: { defaultRegion: string } = { defaultRegion: 'us-east-1' },
): Promise<TimestreamQueryClient> =>
	new TimestreamQueryClient({})
		.send(new DescribeQueryEndpointsCommand({}))
		.then(
			({ Endpoints }) =>
				new TimestreamQueryClient({
					endpoint: `https://${
						Endpoints?.[0].Address ??
						`query-cell1.timestream.${defaultRegion}.amazonaws.com`
					}`,
				}),
		)
