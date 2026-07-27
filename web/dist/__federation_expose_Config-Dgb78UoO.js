import { j as o, A as a, __tla as __tla_0 } from "./App-DPBYA79G.js";
let n, f;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  let i, s, c;
  i = ({ size: t = 40 }) => o.jsxs("svg", {
    width: t,
    height: t,
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      o.jsx("path", {
        d: "M7 21.5 24 8l17 13.5V40a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V21.5Z",
        fill: "#171717",
        stroke: "#ff6b00",
        strokeWidth: "3"
      }),
      o.jsx("path", {
        d: "M13 24h22v18H13V24Z",
        fill: "#232323",
        stroke: "#ff6b00",
        strokeWidth: "2"
      }),
      o.jsx("path", {
        d: "M16 35.5h16l-1.7-6.1a2 2 0 0 0-1.9-1.4h-8.8a2 2 0 0 0-1.9 1.4L16 35.5Z",
        fill: "#ff6b00"
      }),
      o.jsx("circle", {
        cx: "19",
        cy: "36",
        r: "2",
        fill: "white"
      }),
      o.jsx("circle", {
        cx: "29",
        cy: "36",
        r: "2",
        fill: "white"
      })
    ]
  });
  s = () => o.jsx(i, {});
  c = () => o.jsx(i, {
    size: 32
  });
  f = "/npwd-forge-garage";
  n = () => ({
    id: "npwd_forge_garage",
    nameLocale: "Forge Garage",
    color: "#ffffff",
    backgroundColor: "#171717",
    path: f,
    icon: s,
    app: a,
    notificationIcon: c
  });
});
export {
  __tla,
  n as default,
  f as path
};
