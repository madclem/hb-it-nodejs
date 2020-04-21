module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
    // exclude: /node_modules/,
  },
  {
    exclude: /node_modules/,
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: [
      {loader: 'babel-loader'},
      {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    }],
  },
  {
    test: /\.(png|svg|jpg|gif)$/,
    use: [
      'file-loader',
    ],
  },
  {
  test : /\.(js)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader'
  }
}
  // Put your webpack loader rules in this array.  This is where you would put
  // your ts-loader configuration for instance:
  /**
   * Typescript Example:
   *
   * {
   *   test: /\.tsx?$/,
   *   exclude: /(node_modules|.webpack)/,
   *   loaders: [{
   *     loader: 'ts-loader',
   *     options: {
   *       transpileOnly: true
   *     }
   *   }]
   * }
   */
];
