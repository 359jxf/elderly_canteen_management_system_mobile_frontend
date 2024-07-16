module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75 // 因为vant框架是以375px的稿子为基础的，所以需要适配一下
      },
      propList: ['*'] // 需要转换的css属性，默认*全部
    }
  }
}
