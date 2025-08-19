import{r as n,l as g}from"./chunk-KNED5TY2-DtGqyQJO.js";import{c as h,a as b}from"./utils-x4VewiwF.js";/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),w=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,r,o)=>o?o.toUpperCase():r.toLowerCase()),i=e=>{const t=w(e);return t.charAt(0).toUpperCase()+t.slice(1)},c=(...e)=>e.filter((t,r,o)=>!!t&&t.trim()!==""&&o.indexOf(t)===r).join(" ").trim();/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var v={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=n.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:r=2,absoluteStrokeWidth:o,className:s="",children:a,iconNode:l,...u},d)=>n.createElement("svg",{ref:d,...v,width:t,height:t,stroke:e,strokeWidth:o?Number(r)*24/Number(t):r,className:c("lucide",s),...u},[...l.map(([f,m])=>n.createElement(f,m)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=(e,t)=>{const r=n.forwardRef(({className:o,...s},a)=>n.createElement(x,{ref:a,iconNode:t,className:c(`lucide-${p(i(e))}`,`lucide-${e}`,o),...s}));return r.displayName=i(e),r},y=b("inline-flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",glass:"bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white"},size:{sm:"h-8 w-8",default:"h-10 w-10",lg:"h-12 w-12",xl:"h-14 w-14"}},defaultVariants:{variant:"default",size:"default"}}),C=n.forwardRef(({className:e,variant:t,size:r,icon:o,...s},a)=>g.jsx("button",{className:h(y({variant:t,size:r,className:e})),ref:a,...s,children:o}));C.displayName="IconButton";export{C as I,j as c};
