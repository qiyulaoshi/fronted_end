/*
 * @Author: lijiahao@youlai.cn lijiahao@youlai.cn
 * @Date: 2022-08-08 14:04:11
 * @LastEditors: 李家豪 1206185316@qq.com
 * @LastEditTime: 2023-04-22 18:06:25
 * @FilePath: /fronted_end/config/proxy.ts
 * @Description:
 */
/**
 * @name 代理的配置
 * @see 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 *
 * @doc https://umijs.org/docs/guides/proxy
 */

console.log(process.env.NODE_ENV);

const TARGET =
  // process.env.NODE_ENV === 'development' ? 'http://81.70.17.220:3000/' : 'http://127.0.0.1:3000/';
  process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:9530/' : 'http://192.168.1.9:9530/';
export default {
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/qiushui/': {
      // 要代理的地址
      target: TARGET,
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
    },
  },
  /**
   * @name 详细的代理配置
   * @doc https://github.com/chimurai/http-proxy-middleware
   */
  test: {
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
