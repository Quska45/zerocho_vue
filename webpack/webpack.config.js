// 웹팩을 쓰는 이유는 스크립트가 너무 많아졌을 때 하나로 합치기 위함이라고 보면 된다.
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')


// webpack은 4가지 설정이 중요하다.
// entry, module, plugins, output이 중요함
module.exports = {
    mode: 'development',
    // production 레벨에 따라서 다른 옵션을 주는게 좋다.
    devtool: 'eval',
    // 확장자를 미리 정의해 놓고서 실제 소스 import 때는 확장자를 안써도 된다.
    resolve: {
        extensions: ['.js', '.vue']
    },
    entry: {
        app: path.join(__dirname, 'main.js')
    },
    // 모듈이 웹팩의 핵심이다.
    // 스크립트 파일들을 합칠 때 어떻게 합칠지를 정하는거라고 볼 수 있다.
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }]
    },
    // 아웃풋이 나오기 전에 후처리를 해주는 기능 정도로 생각하면 쉽다.
    plugins: [
        new VueLoaderPlugin()
    ],
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist')
    }
}