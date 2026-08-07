// This project builds with Turbopack, the default bundler from Next 16
// onwards. That only works because the app imports plotly.js-basic-dist-min
// rather than plotly.js — do not change that import back.
//
// plotly.js is a source distribution, and importing it reaches glslify:
//
//   plotly.js/lib/index.js
//   -> plotly.js/src/traces/scattergl/index.js
//   -> regl-scatter2d/bundle.js
//   -> glslify/transform.js
//
// glslify/transform.js is a build-time browserify transform that has no
// business in a browser bundle, and line 241 does `require(target)` on a
// runtime variable. Webpack degrades that to a "Critical dependency: the
// request of a dependency is an expression" warning; Turbopack treats the
// unresolvable dynamic require as fatal and the build fails outright.
//
// plotly.js-basic-dist-min is prebuilt, so glslify is never reachable. It
// registers bar, pie, scatter and calendars, and FrequencyPlotComponent only
// emits bar traces. Using a trace type outside that set would typecheck but
// fail at runtime — see src/types/plotly-basic-dist-min.d.ts.

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
