// plotly.js-basic-dist-min ships no type definitions of its own, and the
// DefinitelyTyped package for it (@types/plotly.js-basic-dist-min) is pinned to
// plotly 2.x while this project is on 3.7, so it is not usable here.
//
// The prebuilt basic bundle exposes the same runtime API as plotly.js; it just
// registers fewer trace types (bar, pie, scatter and calendars). The plotly.js
// types therefore describe it accurately for everything this app does, which is
// bar traces only. The one inaccuracy is that these types also describe traces
// the basic bundle does not register — using one would typecheck but fail at
// runtime, so stick to bar/pie/scatter.
declare module "plotly.js-basic-dist-min" {
  const Plotly: typeof import("plotly.js");
  export default Plotly;
}
