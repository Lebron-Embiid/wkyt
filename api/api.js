import config from 'config';
import Fly from 'flyio/dist/npm/wx'

//https://github.com/wendux/fly
let api = new Fly
//定义公共headers
api.config.headers = {
    'content-type': 'application/x-www-form-urlencoded'
}
//设置超时
api.config.timeout = 10000
//设置请求基地址
api.config.baseURL = config.baseUrl + "/mobile/"
api.config.wapUrl = config.wapUrl + "app/"
//设置公共的Get参数（app模式下此变量不更新）
// api.config.params = {"key": uni.getStorageSync("access_token")}


//错误处理
const errorPrompt = (err) => {
    //未登录
    if (err.data.login === "0") {
        uni.showToast({
            title: '登录失效',
            icon: 'none'
        })
        uni.navigateTo({
            url: '/pages/login/login',
        })
    } else {
        //其他报错
        uni.showToast({
            title: err.data.datas.error || '网络错误',
            icon: 'none'
        })
    }
}

//添加请求拦截器
api.interceptors.request.use((request) => {
    // uni.showLoading({
    //     title: '加载中'
    // });
    //用户登录凭证
    request.params.key=uni.getStorageSync("access_token")
    console.log(request)
    return request
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
api.interceptors.response.use((response, promise) => {
    console.log(response)
    // uni.hideLoading();
    // if (!(response && response.data && response.data.res === 0)) {
    //   errorPrompt(response)
    // }
    //登录跳转
    if (response && response.data && response.data.datas.error) {
        errorPrompt(response)
        // return promise.reject(response)
    }
    return promise.resolve(response.data.datas)
}, (err, promise) => {
    // wx.hideNavigationBarLoading()
    uni.hideLoading();

    errorPrompt(err)
    return promise.reject(err)
})

export default api;
