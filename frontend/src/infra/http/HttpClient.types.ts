export enum HttpMethod {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	DELETE = 'delete',
}

export type HttpRequest = {
	endpoint: string
	method: HttpMethod
	body?: any
	headers?: any
}

export interface HttpClient {
	request: <R = unknown>(request: HttpRequest) => Promise<R>
}
