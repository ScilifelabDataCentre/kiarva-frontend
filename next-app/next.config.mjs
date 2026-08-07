// The `dev` and `build` scripts pass `--webpack` to opt out of Turbopack,
// which is the default bundler from Next 16 onwards.
//
// Turbopack cannot build this project because plotly.js pulls in glslify:
//
//   plotly.js/lib/index.js
//   -> plotly.js/src/traces/scattergl/index.js
//   -> regl-scatter2d/bundle.js
//   -> glslify/transform.js
//
// glslify/transform.js is a build-time browserify transform that has no
// business in a browser bundle, and line 241 does `require(target)` on a
// runtime variable. Webpack degrades this to a "Critical dependency: the
// request of a dependency is an expression" warning; Turbopack treats the
// unresolvable dynamic require as a fatal error and the build fails.
//
// Removing the flag requires stopping glslify from being reachable at all —
// e.g. swapping plotly.js for a prebuilt dist bundle, or a custom plotly
// bundle that excludes the WebGL scattergl trace. Until then, webpack stays.

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    async redirects() {
        return [
          {
            source: '/plot/:slug',
            destination: '/plot',
            permanent: true,
          },
        ]
    },
};

export default nextConfig;
