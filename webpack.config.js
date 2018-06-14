const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // {
      //   test:  /\.scss$/,
      //   use: [
      //     {
      //       loader: "style-loader" // creates style nodes from JS strings
      //     },
      //     {
      //       loader: "css-loader" // translates CSS into CommonJS
      //     },
      //     {
      //       loader: "sass-loader" // compiles Sass to CSS
      //     }
      //   ]
      // }
    ]
  }
}
