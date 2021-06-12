(()=>{"use strict";var e={686:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.PromisedResource=void 0;const u=i(r(297)),c=r(86);t.PromisedResource=function(e){const{resource:t,component:r,errorComponent:n=c.EmptyComponent,fallback:o=c.EmptyComponent}=e,i=r;if(a=t,Array.isArray(a)){const e=t.find((e=>e.error))?.error;if(e)return u.createElement(n,{error:e});if(t.every((e=>e.isReady))){const e=t.map((e=>e.data));return u.createElement(i,{resource:e})}}else{const e=t;if(e.error)return u.createElement(n,{error:e.error});if(e.isReady)return u.createElement(i,{resource:e.data})}var a;return u.createElement(o,null)}},225:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},364:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(225),t),o(r(686),t)},735:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.withPromisedResource=void 0;const u=i(r(297)),c=r(364);t.withPromisedResource=function(e){return function(t){return u.createElement(c.PromisedResource,{resource:t.resource,component:t.component,fallback:t.fallback??e.fallback,errorComponent:t.errorComponent??e.errorComponent})}}},585:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},156:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(585),t),o(r(735),t)},448:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},833:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.usePromisedState=void 0;const u=i(r(297)),c=r(86),a=r(677);t.usePromisedState=function(e){const t=u.useRef(),[r,n]=u.useState(c.Resource.init()),{readerRef:o,updatePromiseResource:i}=a.useSuspensePromise(),s=u.useCallback(((e,t)=>{n(e),i(e,t)}),[]),f=u.useCallback((async e=>{s(c.Resource.init(),e),t.current=e;const r=await c.unpackPromise(e);e===t.current&&s("error"in r?c.Resource.failure(r.error):c.Resource.success(r.data),e)}),[]);return u.useEffect((()=>{e&&f(e)}),[]),[u.useMemo((()=>Object.freeze({...r,read:o.current.read})),[r]),f]}},589:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(448),t),o(r(833),t)},476:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useSuspensePromise=void 0;const n=r(297);t.useSuspensePromise=function(){const e=n.useRef(),t=n.useRef(new Promise((()=>{})));return{readerRef:n.useRef({read(){if(e.current?.isReady)return e.current.data;if(e.current?.error)throw e.current.error;throw t.current}}),updatePromiseResource:(r,n)=>{e.current=r,t.current=n}}}},677:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(476),t)},607:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(364),t),o(r(156),t),o(r(589),t)},670:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.EmptyComponent=void 0;const u=i(r(297));t.EmptyComponent=function(){return u.createElement(u.Fragment,null)}},889:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(670),t)},501:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Resource=void 0,t.Resource={init:()=>({data:null,error:null,isReady:!1}),success:e=>({data:e,error:null,isReady:!0}),failure:e=>({data:null,error:e,isReady:!1})}},218:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},927:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(218),t),o(r(501),t)},882:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.unpackPromise=void 0,t.unpackPromise=async function(e){try{return{data:await e}}catch(e){return e instanceof Error?{error:e}:"string"==typeof e?{error:new Error(e)}:{error:new Error("An error occured during resolving a promise.")}}}},361:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},409:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(361),t),o(r(882),t)},86:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(927),t),o(r(409),t),o(r(889),t)},297:e=>{e.exports=require("react")}},t={},r=function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,r),i.exports}(607),n=exports;for(var o in r)n[o]=r[o];r.__esModule&&Object.defineProperty(n,"__esModule",{value:!0})})();