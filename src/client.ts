import {
	DescribeEndpointsCommand as DescribeWriteEndpointsCommand,
	TimestreamWriteClient,
	type TimestreamWriteClientConfig,
} from '@aws-sdk/client-timestream-write'

import {
	DescribeEndpointsCommand as DescribeQueryEndpointsCommand,
	TimestreamQueryClient,
} from '@aws-sdk/client-timestream-query'

/**
 * Discover the endpoint for writing to Timestream and return a client
 */
export const writeClient = async (
	args: Partial<TimestreamWriteClientConfig> = {},
	{ defaultRegion }: { defaultRegion: string } = {
		defaultRegion: 'us-east-1',
	},
): Promise<TimestreamWriteClient> =>
	new TimestreamWriteClient(args)
		.send(new DescribeWriteEndpointsCommand({}))
		.then(
			({ Endpoints }) =>
				new TimestreamWriteClient({
					endpoint: `https://${
						Endpoints?.[0]?.Address ??
						`ingest-cell1.timestream.${
							(args.region ?? defaultRegion) as string
						}.amazonaws.com`
					}`,
					...args,
				}),
		)

/**
 * Discover the endpoint for querying Timestream and return a client
 */
export const queryClient = async (
	args: Partial<TimestreamWriteClientConfig> = {},
	{ defaultRegion }: { defaultRegion: string } = {
		defaultRegion: 'us-east-1',
	},
): Promise<TimestreamQueryClient> =>
	new TimestreamQueryClient(args)
		.send(new DescribeQueryEndpointsCommand({}))
		.then(
			({ Endpoints }) =>
				new TimestreamQueryClient({
					endpoint: `https://${
						Endpoints?.[0]?.Address ??
						`query-cell1.timestream.${
							(args.region ?? defaultRegion) as string
						}.amazonaws.com`
					}`,
					...args,
				}),
		)
