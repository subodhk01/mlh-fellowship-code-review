// 'use strict';

// module.exports = {
//   distDir: '../functions/next'
// };

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: false, // process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({})