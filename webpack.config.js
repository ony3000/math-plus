const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'math-plus.js',
    library: {
      name: 'MathPlus',
      type: 'umd',
    },
  },
};
