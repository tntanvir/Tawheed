const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
    // ... other webpack configurations

    plugins: [
        new SWPrecacheWebpackPlugin({
            cacheId: 'your-cache-id',
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'service-worker.js',
            minify: true,
            navigateFallback: '/index.html',
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
        }),
        // ... other plugins
    ],
};
