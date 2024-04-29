"use strict";(globalThis.webpackChunkcomplianz_gdpr=globalThis.webpackChunkcomplianz_gdpr||[]).push([[4521],{9957:(e,n,t)=>{function r(e,n,{checkForDefaultPrevented:t=!0}={}){return function(r){if(null==e||e(r),!1===t||!r.defaultPrevented)return null==n?void 0:n(r)}}t.d(n,{m:()=>r})},91071:(e,n,t)=>{t.d(n,{s:()=>i,t:()=>o});var r=t(51609);function o(...e){return n=>e.forEach((e=>function(e,n){"function"==typeof e?e(n):null!=e&&(e.current=n)}(e,n)))}function i(...e){return(0,r.useCallback)(o(...e),e)}},62133:(e,n,t)=>{t.d(n,{A:()=>o});var r=t(51609);function o(e,n=[]){let t=[];const o=()=>{const n=t.map((e=>(0,r.createContext)(e)));return function(t){const o=(null==t?void 0:t[e])||n;return(0,r.useMemo)((()=>({[`__scope${e}`]:{...t,[e]:o}})),[t,o])}};return o.scopeName=e,[function(n,o){const i=(0,r.createContext)(o),c=t.length;function l(n){const{scope:t,children:o,...l}=n,u=(null==t?void 0:t[e][c])||i,s=(0,r.useMemo)((()=>l),Object.values(l));return(0,r.createElement)(u.Provider,{value:s},o)}return t=[...t,o],l.displayName=n+"Provider",[l,function(t,l){const u=(null==l?void 0:l[e][c])||i,s=(0,r.useContext)(u);if(s)return s;if(void 0!==o)return o;throw new Error(`\`${t}\` must be used within \`${n}\``)}]},i(o,...n)]}function i(...e){const n=e[0];if(1===e.length)return n;const t=()=>{const t=e.map((e=>({useScope:e(),scopeName:e.scopeName})));return function(e){const o=t.reduce(((n,{useScope:t,scopeName:r})=>({...n,...t(e)[`__scope${r}`]})),{});return(0,r.useMemo)((()=>({[`__scope${n.scopeName}`]:o})),[o])}};return t.scopeName=n.scopeName,t}},12579:(e,n,t)=>{t.d(n,{hO:()=>u,sG:()=>l});var r=t(58168),o=t(51609),i=t(75795),c=t(33362);const l=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce(((e,n)=>{const t=(0,o.forwardRef)(((e,t)=>{const{asChild:i,...l}=e,u=i?c.DX:n;return(0,o.useEffect)((()=>{window[Symbol.for("radix-ui")]=!0}),[]),(0,o.createElement)(u,(0,r.A)({},l,{ref:t}))}));return t.displayName=`Primitive.${n}`,{...e,[n]:t}}),{});function u(e,n){e&&(0,i.flushSync)((()=>e.dispatchEvent(n)))}},33362:(e,n,t)=>{t.d(n,{DX:()=>c});var r=t(58168),o=t(51609),i=t(91071);const c=(0,o.forwardRef)(((e,n)=>{const{children:t,...i}=e,c=o.Children.toArray(t),u=c.find(s);if(u){const e=u.props.children,t=c.map((n=>n===u?o.Children.count(e)>1?o.Children.only(null):(0,o.isValidElement)(e)?e.props.children:null:n));return(0,o.createElement)(l,(0,r.A)({},i,{ref:n}),(0,o.isValidElement)(e)?(0,o.cloneElement)(e,void 0,t):null)}return(0,o.createElement)(l,(0,r.A)({},i,{ref:n}),t)}));c.displayName="Slot";const l=(0,o.forwardRef)(((e,n)=>{const{children:t,...r}=e;return(0,o.isValidElement)(t)?(0,o.cloneElement)(t,{...a(r,t.props),ref:n?(0,i.t)(n,t.ref):t.ref}):o.Children.count(t)>1?o.Children.only(null):null}));l.displayName="SlotClone";const u=({children:e})=>(0,o.createElement)(o.Fragment,null,e);function s(e){return(0,o.isValidElement)(e)&&e.type===u}function a(e,n){const t={...n};for(const r in n){const o=e[r],i=n[r];/^on[A-Z]/.test(r)?o&&i?t[r]=(...e)=>{i(...e),o(...e)}:o&&(t[r]=o):"style"===r?t[r]={...o,...i}:"className"===r&&(t[r]=[o,i].filter(Boolean).join(" "))}return{...e,...t}}},10263:(e,n,t)=>{t.d(n,{c:()=>o});var r=t(51609);function o(e){const n=(0,r.useRef)(e);return(0,r.useEffect)((()=>{n.current=e})),(0,r.useMemo)((()=>(...e)=>{var t;return null===(t=n.current)||void 0===t?void 0:t.call(n,...e)}),[])}},81351:(e,n,t)=>{t.d(n,{i:()=>i});var r=t(51609),o=t(10263);function i({prop:e,defaultProp:n,onChange:t=(()=>{})}){const[i,c]=function({defaultProp:e,onChange:n}){const t=(0,r.useState)(e),[i]=t,c=(0,r.useRef)(i),l=(0,o.c)(n);return(0,r.useEffect)((()=>{c.current!==i&&(l(i),c.current=i)}),[i,c,l]),t}({defaultProp:n,onChange:t}),l=void 0!==e,u=l?e:i,s=(0,o.c)(t);return[u,(0,r.useCallback)((n=>{if(l){const t="function"==typeof n?n(e):n;t!==e&&s(t)}else c(n)}),[l,e,c,s])]}},88200:(e,n,t)=>{t.d(n,{N:()=>o});var r=t(51609);const o=Boolean(null===globalThis||void 0===globalThis?void 0:globalThis.document)?r.useLayoutEffect:()=>{}},31769:(e,n,t)=>{t.d(n,{X:()=>i});var r=t(51609),o=t(88200);function i(e){const[n,t]=(0,r.useState)(void 0);return(0,o.N)((()=>{if(e){t({width:e.offsetWidth,height:e.offsetHeight});const n=new ResizeObserver((n=>{if(!Array.isArray(n))return;if(!n.length)return;const r=n[0];let o,i;if("borderBoxSize"in r){const e=r.borderBoxSize,n=Array.isArray(e)?e[0]:e;o=n.inlineSize,i=n.blockSize}else o=e.offsetWidth,i=e.offsetHeight;t({width:o,height:i})}));return n.observe(e,{box:"border-box"}),()=>n.unobserve(e)}t(void 0)}),[e]),n}}}]);