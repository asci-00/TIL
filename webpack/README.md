# webpack configuration

> webpack 에서 사용되는 설정 항목들을 정리
>
> webpack은 Node.js **CommonJS** 모듈
>
> So, require를 통해 다른 모듈 가져오기 가능
> .

![](https://joshua1988.github.io/webpack-guide/assets/img/webpack-bundling.e79747a1.png)

- command line으로 bundling 하기 위해서는 webpack.config.js 작업영역에서 `webpack`을 치면 됨
- 파일 수정 시, 자동으로 bundling하기 위해서 `webpack`에 `--watch` 옵션을 통해 감시할 수 있음
- webpack --config config.filename.js 형식을 통해 어떤 webpack config를 적용할지 명시할 수 있음

## Source Map

> Bundling 후, 압축화/난독화 Uglify/Minify 된 Javascript 파일을 디버깅하기 위해 사용

```javascript
module.exports = {
  devtool: 'inline-source-map',
};
```

## Mode

- `development` `production` `none` 의 값을 설정할 수 있음
- 각 설정에 따라 내장된 환경별 최적화를 활성화 가능 (default: production)

## entry

> web resource을 변환하기 위해 필요한 최초의 진입점 _entry point_
>
> `Javascript 파일`

- entry에서 지정한 파일을 기준으로 번들링 _Bundling_ 이 수행됨
- 일반적으로 entry point는 1개이지만, 여러개가 존재할 수 있음

```javascript
module.exports = {
  entry: './src/index.js',
}; // 축약 구문
module.exports = {
  entry: {
    main: './src/index.js',
  },
};
// single entry point

module.exports = {
  entry: ['./src/index1.js', './src/index2.js'],
}; // 축약 구문
module.exports = {
  entry: {
    point1: './src/index1.js',
    point2: './src/index2.js',
  },
}; // multi entry point
```

- 각 entry point는 `dependOn` `runtime` `import` 등의 속성을 가질 수 있음

## output

> web resource을 번들링한 결과를 출력할 파일
>
> `Javascript 파일`

- 번들링 결과를 출력할 대상 파일 ( filename, path로 구분할 수 있음 )
- output 파일은 오직 하나의 파일만 존재할 수 있음
  - `filename` 필수적으로 존재 (path가 생략되면 dist 디렉토리에 출력됨)
  - `path` 번들 파일을 출력할 경로를 명시적으로 지정 (절대 경로)
    - _어디에 결과가 저장되냐_
  - `publicPath` 배포 & 빌드 할 때 사용되는 서버 루트의 상대적 위치
    - _코드 내부 URL들을 업데이트 해주기 위함 prefix 개념_

```javascript
// 결과

module.exports = {
  //...
  output: {
    publicPath: 'https://someCDN/',
  },
};
```

```css
// Development: Both Server and the image are on localhost
.image {
  background-image: url('./test.png');
}

// Production: Server is on Heroku but the image is on a CDN
.image {
  background-image: url('https://someCDN/test.png');
}
```

---

```javascript
module.exports = {
  output: {
    filename: 'bundle.js',
  },
};

module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
};
```

## module

> 이 옵션은 프로젝트 내에서 다른 유형의 모듈을 처리하는 방법을 결정
>
> _css-loader, babel-loader 등의 외부 모듈들을 처리_

모듈 내부적으로 설정할 수 있는 기능이 매우 광범위 하므로,<br/>
다른 장에서 다루도록 함<br/>
일반적으로 아래와 같은 형태로 사용함

```javascript
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist')
  },
  module: { ... },
  }
}
```

## `Loader`

> webpack에서는 기본적으로 json / javascript만 인식이 가능
>
> 로더 *Loader*는 웹팩이 이 외의 resource를 require / import 할 때,
>
> Javascript 파일이 아닌 다른 resource (HTML, CSS, Images, 폰트 등) 들을
>
> 변환할 수 있도록 지원
>
> _require() / import 구문에서 rules **정규식**에 해당하는 파일이 있을 경우,_
>
> _해당 loader를 사용해서 변환_

- `babel-loader` `sass-loader` `file-loader` `vue-loader` `ts-loader` 가 주로 사용됨

```javascript
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' },
      // ...
    ],
  },
};
```

- 위와같이 loader를 여러개 사용하는 경우 module.rules list 의 item으로 삽입됨
  - `test` 속성은 규칙을 적용할 파일의 형식
  - `use` 속성은 해당 규칙의 파일에 적용할 모듈
- 하나의 규칙에 여러 loader를 사용하는 경우 use에 list로 나열

  - 오른쪽에서 왼족 순서로 적용됨

- `css-loader`는 css를 javascript로 변환해주며, `style-loader`는 css를 style을 주입해주는 역할
  - head태그의 style태그에 삽입됨..

```javascript
module: {
  rules: [
    {
      test: /\.scss$/,
      use: ['css-loader', 'sass-loader'],
    },
  ];
}
```

- 먼저 sass-loader를 적용한 후, css-loader를 적용하여 번들링하게 됨<br/>
  scss -> css -> js

- css가 inline style tag로 추가되는 것을 원한다면 아래와 같이 추가로 나열 가능

```javascript
module: {
  rules: [
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
  ];
}
```

- 또한 추가적으로 options을 지정할 수 있음

```javascript
use: [
    'style-loader',
    {
        loader: 'css-loader',
        options: {
            importLoaders: 1,
        },
    },
    {
        loader: 'less-loader',
        options: {
            noIeCompat: true,
        },
    },
],
```

- 위 규칙은 inline 상에서 아래와 같이 사용 가능

```javascript
import Styles from 'style-loader!css-loader?modules!less-loader!./styles.css';
```

```html
webpack의 loader는 압축, 패키징, 언어 번역 뿐만 아니라 더 많은 세밀한 로직을 유연하게 추가할 수 있음
```

## plugins

> 로더 *Loader*는 resource를 변환하는 과정에 관여하는 반면
>
> *Plugin*은 해당 결과물의 형태를 바꾸는 역할을 수행
>
> 번들을 최적화하거나, 애셋을 관리하고, 또 환경 변수 주입등과 같은 광범위한 작업
>
> `apply` 메서드를 가진 객체 (webpack compiler에 의해 호출됨)

```javascript
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log('The webpack build process is starting!');
    });
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;
// Plugin의 내부 소스의 예
```

```javascript
module.exports = {
  plugins: [],
};
```

- 기본적으로 위와같은 형태로 나열하며, <br/>배열 내부는 생성자 함수로 생성한 객체 인스턴스를 추가함

```javascript
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [new HtmlWebpackPlugin(), new webpack.ProgressPlugin()],
};
```

- `HtmlWebpackPlugin` 웹팩으로 빌드한 결과물을 삽입한 HTML 파일을 생성해주는 플러그인
- `ProgressPlugin` 웹팩의 빌드 진행율을 표시해주는 플러그인

- `split-chunks-plugin` `clean-webpack-plugin` <br/>
  `image-webpack-loader` `webpack-bundle-analyzer-plugin`이 주로 사용됨

## `reslove` `optimization` `devServer` `cache` `devtool`

## `target` `watch` `externals` `performance` `node`

## `stats` `experiments`

## `amd` `bail` `dependencies` `ignoreWarnings` `etc..`

```javascript
// 다른 방식으로 plugin을 적용할 수 있음
const webpack = require('webpack'); //webpack 런타임에 접근하기 위함
const configuration = require('./webpack.config.js');

let compiler = webpack(configuration);

new webpack.ProgressPlugin().apply(compiler);

compiler.run(function (err, stats) {
  // ...
});
```

![image](https://user-images.githubusercontent.com/22098393/151949822-9c3ac784-ccc2-480e-bf4e-f85cce4ad046.png)
