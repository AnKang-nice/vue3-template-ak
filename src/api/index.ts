import axios from 'axios';
import type {
	AxiosResponse,
	AxiosInstance,
	AxiosRequestConfig,
	InternalAxiosRequestConfig
} from 'axios';
import ApiError from './errorDeal';

// 从 AxiosRequestConfig  中 检出  withCredentials  headers  作为类型
type AxiosRequestOptions = Pick<AxiosRequestConfig, 'withCredentials' | 'headers'> & {
	isDefaultShowMsg?: boolean;
};

type SpecialAxiosRequestConfig = AxiosRequestConfig & {
	isDefaultShowMsg?: boolean;
};

// 生成请求唯一标识
function generateRequestKey(config: AxiosRequestConfig): string {
	const { url, method, params, data } = config;
	return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&');
}

class AxiosFn {
	instance: AxiosInstance = {} as AxiosInstance;
	config: AxiosRequestConfig = {} as AxiosRequestConfig;
	pendingRequests: Map<string, AbortController> = new Map(); // 用于存储请求的取消函数
	constructor(config: AxiosRequestConfig) {
		this.config = Object.assign(config, {
			// 默认配置
			baseURL: import.meta.env.VITE_APP_BASE_API,
			timeout: 10000
		});
		this.init();
	}

	// 添加请求到 pendingRequests
	addPendingRequest(config: AxiosRequestConfig) {
		const requestKey = generateRequestKey(config);
		const controller = new AbortController();
		config.signal = controller.signal;
		if (this.pendingRequests.has(requestKey)) {
			// 如果请求已经存在，则取消之前的请求
			this.pendingRequests.get(requestKey)?.abort();
			this.pendingRequests.delete(requestKey);
		}
		this.pendingRequests.set(requestKey, controller);
	}

	// 移除请求
	removePendingRequest(requestKey: string) {
		if (this.pendingRequests.has(requestKey)) {
			// 如果请求已经存在，则取消之前的请求
			this.pendingRequests.get(requestKey)?.abort();
			this.pendingRequests.delete(requestKey);
		}
	}

	// 错误提示
	showErrorMsg(config: SpecialAxiosRequestConfig, error: any) {
		// 业务错误提示
		const isShowMsg = !!config?.isDefaultShowMsg;
		if (isShowMsg) {
			ElMessage.error(error.message);
		}
	}

	init: () => void = () => {
		this.instance = axios.create(this.config);
		// 请求拦截
		this.instance.interceptors.request.use(
			(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
				console.log(config, 676);
				// 添加请求到 pendingRequests
				this.addPendingRequest(config);

				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);
		// 响应拦截
		this.instance.interceptors.response.use(
			(response: AxiosResponse): AxiosResponse['data'] => {
				// 移除请求
				this.removePendingRequest(generateRequestKey(response.config));
				const { code } = response.data;
				try {
					if (response && response.status === 200) {
						if (response.data) {
							if (code === 0) {
								// 成功
								return response.data;
							} else {
								// 根据具体业务code，自定义错误处理
								throw new ApiError(code, response.data.msg);
							}
						} else {
							throw new ApiError(200, '接口返回数据为空');
						}
					} else {
						throw new ApiError(0, '抱歉出错了');
					}
				} catch (error) {
					// 业务错误的提示控制
					this.showErrorMsg(response.config, error);
					throw error;
				}
			},
			(error) => {
				console.log(error);
				let errorInstance = null as any;
				if (error.name === 'AbortError') {
					// 请求被取消
					errorInstance = Promise.reject(new ApiError(0, '请求被取消'));
				} else {
					// 请求已发出，但服务器响应的状态码不在 2xx 范围内
					if (error.response) {
						this.removePendingRequest(generateRequestKey(error.config));
						errorInstance = ApiError.createBuiltInApiError(error.response.status);
					} else {
						// 响应错误
						let defaultErrorMsg = '请求出错了';
						if (
							error.code === 'ECONNABORTED' ||
							error.message === 'Network Error' ||
							error.message.includes('timeout')
						) {
							defaultErrorMsg = '请求超时';
						}
						errorInstance = new ApiError(
							0,
							`接口${error.config?.url}请求问题;msg: ${error.message || defaultErrorMsg}`
						);
					}
				}
				// 如果是服务器错误 / 没有返回   直接提示  不需要进行判断
				ElMessage.error(errorInstance.message);
				return Promise.reject(errorInstance);
			}
		);
	};

	get(
		url: string,
		params?: any,
		{ withCredentials = true, headers = {}, isDefaultShowMsg }: AxiosRequestOptions = {}
	) {
		return this.instance.get(url, {
			params,
			withCredentials,
			headers,
			isDefaultShowMsg
		} as AxiosRequestOptions);
	}
	post(
		url: string,
		data?: any,
		{ withCredentials = true, headers = {}, isDefaultShowMsg }: AxiosRequestOptions = {}
	) {
		return this.instance.post(url, data, {
			withCredentials,
			headers,
			isDefaultShowMsg
		} as AxiosRequestOptions);
	}

	// 取消单次请求
	cancelSingleRequest(config: AxiosRequestConfig) {
		const requestKey = generateRequestKey(config);
		this.removePendingRequest(requestKey);
	}

	// 取消全部请求
	cancelAllRequests() {
		this.pendingRequests.forEach((controller) => {
			controller.abort();
		});
		this.pendingRequests.clear();
	}
}

const axiosInstance = new AxiosFn({});
// 可多实例，甚至可以多实例加参数判断，进行内部逻辑差异化封装处理 -- 暂时不整
export default axiosInstance;
