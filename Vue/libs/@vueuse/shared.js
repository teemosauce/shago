var VueDemi=function(a,i,T){if(a.install)return a;if(!i)return console.error("[vue-demi] no Vue instance found, please be sure to import `vue` before `vue-demi`."),a;if(i.version.slice(0,4)==="2.7."){let h=function(P,A){var g,N={},U={config:i.config,use:i.use.bind(i),mixin:i.mixin.bind(i),component:i.component.bind(i),provide:function($,S){return N[$]=S,this},directive:function($,S){return S?(i.directive($,S),U):i.directive($)},mount:function($,S){return g||(g=new i(Object.assign({propsData:A},P,{provide:Object.assign(N,P.provide)})),g.$mount($,S),g)},unmount:function(){g&&(g.$destroy(),g=void 0)}};return U};var Ze=h;for(var b in i)a[b]=i[b];a.isVue2=!0,a.isVue3=!1,a.install=function(){},a.Vue=i,a.Vue2=i,a.version=i.version,a.warn=i.util.warn,a.createApp=h}else if(i.version.slice(0,2)==="2.")if(T){for(var b in T)a[b]=T[b];a.isVue2=!0,a.isVue3=!1,a.install=function(){},a.Vue=i,a.Vue2=i,a.version=i.version}else console.error("[vue-demi] no VueCompositionAPI instance found, please be sure to import `@vue/composition-api` before `vue-demi`.");else if(i.version.slice(0,2)==="3."){for(var b in i)a[b]=i[b];a.isVue2=!1,a.isVue3=!0,a.install=function(){},a.Vue=i,a.Vue2=void 0,a.version=i.version,a.set=function(h,P,A){return Array.isArray(h)?(h.length=Math.max(h.length,P),h.splice(P,1,A),A):(h[P]=A,A)},a.del=function(h,P){if(Array.isArray(h)){h.splice(P,1);return}delete h[P]}}else console.error("[vue-demi] Vue version "+i.version+" is unsupported.");return a}(this.VueDemi=this.VueDemi||(typeof VueDemi<"u"?VueDemi:{}),this.Vue||(typeof Vue<"u"?Vue:void 0),this.VueCompositionAPI||(typeof VueCompositionAPI<"u"?VueCompositionAPI:void 0));(function(a,i){"use strict";var T=Object.defineProperty,b=Object.defineProperties,Ze=Object.getOwnPropertyDescriptors,h=Object.getOwnPropertySymbols,P=Object.prototype.hasOwnProperty,A=Object.prototype.propertyIsEnumerable,g=(e,t,r)=>t in e?T(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,N=(e,t)=>{for(var r in t||(t={}))P.call(t,r)&&g(e,r,t[r]);if(h)for(var r of h(t))A.call(t,r)&&g(e,r,t[r]);return e},U=(e,t)=>b(e,Ze(t));function $(e,t){var r;const n=i.shallowRef();return i.watchEffect(()=>{n.value=e()},U(N({},t),{flush:(r=t?.flush)!=null?r:"sync"})),i.readonly(n)}function S(e,t){let r,n,o;const c=i.ref(!0),l=()=>{c.value=!0,o()};i.watch(e,l,{flush:"sync"});const u=typeof t=="function"?t:t.get,f=typeof t=="function"?void 0:t.set,y=i.customRef((d,p)=>(n=d,o=p,{get(){return c.value&&(r=u(),c.value=!1),n(),r},set(_){f?.(_)}}));return Object.isExtensible(y)&&(y.trigger=l),y}function j(e){return i.getCurrentScope()?(i.onScopeDispose(e),!0):!1}function Je(){const e=new Set,t=o=>{e.delete(o)};return{on:o=>{e.add(o);const c=()=>t(o);return j(c),{off:c}},off:t,trigger:o=>Promise.all(Array.from(e).map(c=>c(o)))}}function Xe(e){let t=!1,r;const n=i.effectScope(!0);return(...o)=>(t||(r=n.run(()=>e(...o)),t=!0),r)}function Ke(e){const t=Symbol("InjectionState");return[(...o)=>{const c=e(...o);return i.provide(t,c),c},()=>i.inject(t)]}function Qe(e){let t=0,r,n;const o=()=>{t-=1,n&&t<=0&&(n.stop(),r=void 0,n=void 0)};return(...c)=>(t+=1,r||(n=i.effectScope(!0),r=n.run(()=>e(...c))),j(o),r)}function ee(e,t,{enumerable:r=!1,unwrap:n=!0}={}){if(!i.isVue3&&!i.version.startsWith("2.7.")){if(process.env.NODE_ENV!=="production")throw new Error("[VueUse] extendRef only works in Vue 2.7 or above.");return}for(const[o,c]of Object.entries(t))o!=="value"&&(i.isRef(c)&&n?Object.defineProperty(e,o,{get(){return c.value},set(l){c.value=l},enumerable:r}):Object.defineProperty(e,o,{value:c,enumerable:r}));return e}function Ve(e,t){return t==null?i.unref(e):i.unref(e)[t]}function De(e){return i.unref(e)!=null}var xe=Object.defineProperty,te=Object.getOwnPropertySymbols,et=Object.prototype.hasOwnProperty,tt=Object.prototype.propertyIsEnumerable,re=(e,t,r)=>t in e?xe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,rt=(e,t)=>{for(var r in t||(t={}))et.call(t,r)&&re(e,r,t[r]);if(te)for(var r of te(t))tt.call(t,r)&&re(e,r,t[r]);return e};function nt(e,t){if(typeof Symbol<"u"){const r=rt({},e);return Object.defineProperty(r,Symbol.iterator,{enumerable:!1,value(){let n=0;return{next:()=>({value:t[n++],done:n>t.length})}}}),r}else return Object.assign([...t],e)}function s(e){return typeof e=="function"?e():i.unref(e)}const ot=s;function G(e,t){const r=t?.computedGetter===!1?i.unref:s;return function(...n){return i.computed(()=>e.apply(this,n.map(o=>r(o))))}}function at(e,t={}){let r=[],n;if(Array.isArray(t))r=t;else{n=t;const{includeOwnProperties:o=!0}=t;r.push(...Object.keys(e)),o&&r.push(...Object.getOwnPropertyNames(e))}return Object.fromEntries(r.map(o=>{const c=e[o];return[o,typeof c=="function"?G(c.bind(e),n):c]}))}function ne(e){if(!i.isRef(e))return i.reactive(e);const t=new Proxy({},{get(r,n,o){return i.unref(Reflect.get(e.value,n,o))},set(r,n,o){return i.isRef(e.value[n])&&!i.isRef(o)?e.value[n].value=o:e.value[n]=o,!0},deleteProperty(r,n){return Reflect.deleteProperty(e.value,n)},has(r,n){return Reflect.has(e.value,n)},ownKeys(){return Object.keys(e.value)},getOwnPropertyDescriptor(){return{enumerable:!0,configurable:!0}}});return i.reactive(t)}function q(e){return ne(i.computed(e))}function it(e,...t){const r=t.flat(),n=r[0];return q(()=>Object.fromEntries(typeof n=="function"?Object.entries(i.toRefs(e)).filter(([o,c])=>!n(s(c),o)):Object.entries(i.toRefs(e)).filter(o=>!r.includes(o[0]))))}const R=typeof window<"u",ct=e=>typeof e<"u",lt=e=>e!=null,ut=(e,...t)=>{e||console.warn(...t)},st=Object.prototype.toString,oe=e=>st.call(e)==="[object Object]",ft=()=>Date.now(),ae=()=>+Date.now(),dt=(e,t,r)=>Math.min(r,Math.max(t,e)),I=()=>{},pt=(e,t)=>(e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e),_t=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),yt=vt();function vt(){var e;return R&&((e=window?.navigator)==null?void 0:e.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent)}function M(e,t){function r(...n){return new Promise((o,c)=>{Promise.resolve(e(()=>t.apply(this,n),{fn:t,thisArg:this,args:n})).then(o).catch(c)})}return r}const W=e=>e();function z(e,t={}){let r,n,o=I;const c=u=>{clearTimeout(u),o(),o=I};return u=>{const f=s(e),y=s(t.maxWait);return r&&c(r),f<=0||y!==void 0&&y<=0?(n&&(c(n),n=null),Promise.resolve(u())):new Promise((d,p)=>{o=t.rejectOnCancel?p:d,y&&!n&&(n=setTimeout(()=>{r&&c(r),n=null,d(u())},y)),r=setTimeout(()=>{n&&c(n),n=null,d(u())},f)})}}function Z(e,t=!0,r=!0,n=!1){let o=0,c,l=!0,u=I,f;const y=()=>{c&&(clearTimeout(c),c=void 0,u(),u=I)};return p=>{const _=s(e),O=Date.now()-o,v=()=>f=p();return y(),_<=0?(o=Date.now(),v()):(O>_&&(r||!l)?(o=Date.now(),v()):t&&(f=new Promise((m,w)=>{u=n?w:m,c=setTimeout(()=>{o=Date.now(),l=!0,m(v()),y()},Math.max(0,_-O))})),!r&&!c&&(c=setTimeout(()=>l=!0,_)),l=!1,f)}}function ie(e=W){const t=i.ref(!0);function r(){t.value=!1}function n(){t.value=!0}const o=(...c)=>{t.value&&e(...c)};return{isActive:i.readonly(t),pause:r,resume:n,eventFilter:o}}const Ot={mounted:i.isVue3?"mounted":"inserted",updated:i.isVue3?"updated":"componentUpdated",unmounted:i.isVue3?"unmounted":"unbind"};function J(e,t=!1,r="Timeout"){return new Promise((n,o)=>{setTimeout(t?()=>o(r):n,e)})}function ht(e){return e}function wt(e){let t;function r(){return t||(t=e()),t}return r.reset=async()=>{const n=t;t=void 0,n&&await n},r}function mt(e){return e()}function ce(e,...t){return t.some(r=>r in e)}function Pt(e,t){var r;if(typeof e=="number")return e+t;const n=((r=e.match(/^-?[0-9]+\.?[0-9]*/))==null?void 0:r[0])||"",o=e.slice(n.length),c=parseFloat(n)+t;return Number.isNaN(c)?e:c+o}function gt(e,t,r=!1){return t.reduce((n,o)=>(o in e&&(!r||e[o]!==void 0)&&(n[o]=e[o]),n),{})}function bt(e,t,r=!1){return Object.fromEntries(Object.entries(e).filter(([n,o])=>(!r||o!==void 0)&&!t.includes(n)))}function $t(e){return Object.entries(e)}function X(...e){if(e.length!==1)return i.toRef(...e);const t=e[0];return typeof t=="function"?i.readonly(i.customRef(()=>({get:t,set:I}))):i.ref(t)}const St=X;function At(e,...t){const r=t.flat(),n=r[0];return q(()=>Object.fromEntries(typeof n=="function"?Object.entries(i.toRefs(e)).filter(([o,c])=>n(s(c),o)):r.map(o=>[o,X(e,o)])))}function le(e,t=1e4){return i.customRef((r,n)=>{let o=e,c;const l=()=>setTimeout(()=>{o=e,n()},s(t));return j(()=>{clearTimeout(c)}),{get(){return r(),o},set(u){o=u,n(),clearTimeout(c),c=l()}}})}function ue(e,t=200,r={}){return M(z(t,r),e)}function K(e,t=200,r={}){const n=i.ref(e.value),o=ue(()=>{n.value=e.value},t,r);return i.watch(e,()=>o()),n}function jt(e,t){return i.computed({get(){var r;return(r=e.value)!=null?r:t},set(r){e.value=r}})}function se(e,t=200,r=!1,n=!0,o=!1){return M(Z(t,r,n,o),e)}function Q(e,t=200,r=!0,n=!0){if(t<=0)return e;const o=i.ref(e.value),c=se(()=>{o.value=e.value},t,r,n);return i.watch(e,()=>c()),o}function fe(e,t={}){let r=e,n,o;const c=i.customRef((_,O)=>(n=_,o=O,{get(){return l()},set(v){u(v)}}));function l(_=!0){return _&&n(),r}function u(_,O=!0){var v,m;if(_===r)return;const w=r;((v=t.onBeforeChange)==null?void 0:v.call(t,_,w))!==!1&&(r=_,(m=t.onChanged)==null||m.call(t,_,w),O&&o())}return ee(c,{get:l,set:u,untrackedGet:()=>l(!1),silentSet:_=>u(_,!1),peek:()=>l(!1),lay:_=>u(_,!1)},{enumerable:!0})}const It=fe;function Et(...e){if(e.length===2){const[t,r]=e;t.value=r}if(e.length===3)if(i.isVue2)i.set(...e);else{const[t,r,n]=e;t[r]=n}}function Ft(e,t,r={}){var n,o;const{flush:c="sync",deep:l=!1,immediate:u=!0,direction:f="both",transform:y={}}=r;let d,p;const _=(n=y.ltr)!=null?n:v=>v,O=(o=y.rtl)!=null?o:v=>v;return(f==="both"||f==="ltr")&&(d=i.watch(e,v=>t.value=_(v),{flush:c,deep:l,immediate:u})),(f==="both"||f==="rtl")&&(p=i.watch(t,v=>e.value=O(v),{flush:c,deep:l,immediate:u})),()=>{d?.(),p?.()}}function Tt(e,t,r={}){const{flush:n="sync",deep:o=!1,immediate:c=!0}=r;return Array.isArray(t)||(t=[t]),i.watch(e,l=>t.forEach(u=>u.value=l),{flush:n,deep:o,immediate:c})}var Rt=Object.defineProperty,Mt=Object.defineProperties,Ct=Object.getOwnPropertyDescriptors,de=Object.getOwnPropertySymbols,Nt=Object.prototype.hasOwnProperty,Ut=Object.prototype.propertyIsEnumerable,pe=(e,t,r)=>t in e?Rt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Wt=(e,t)=>{for(var r in t||(t={}))Nt.call(t,r)&&pe(e,r,t[r]);if(de)for(var r of de(t))Ut.call(t,r)&&pe(e,r,t[r]);return e},Lt=(e,t)=>Mt(e,Ct(t));function Bt(e){if(!i.isRef(e))return i.toRefs(e);const t=Array.isArray(e.value)?new Array(e.value.length):{};for(const r in e.value)t[r]=i.customRef(()=>({get(){return e.value[r]},set(n){if(Array.isArray(e.value)){const o=[...e.value];o[r]=n,e.value=o}else{const o=Lt(Wt({},e.value),{[r]:n});Object.setPrototypeOf(o,e.value),e.value=o}}}));return t}function Ht(e,t=!0){i.getCurrentInstance()?i.onBeforeMount(e):t?e():i.nextTick(e)}function Yt(e){i.getCurrentInstance()&&i.onBeforeUnmount(e)}function kt(e,t=!0){i.getCurrentInstance()?i.onMounted(e):t?e():i.nextTick(e)}function Gt(e){i.getCurrentInstance()&&i.onUnmounted(e)}function V(e,t=!1){function r(p,{flush:_="sync",deep:O=!1,timeout:v,throwOnTimeout:m}={}){let w=null;const x=[new Promise(k=>{w=i.watch(e,F=>{p(F)!==t&&(w?.(),k(F))},{flush:_,deep:O,immediate:!0})})];return v!=null&&x.push(J(v,m).then(()=>s(e)).finally(()=>w?.())),Promise.race(x)}function n(p,_){if(!i.isRef(p))return r(F=>F===p,_);const{flush:O="sync",deep:v=!1,timeout:m,throwOnTimeout:w}=_??{};let E=null;const k=[new Promise(F=>{E=i.watch([e,p],([ze,Cn])=>{t!==(ze===Cn)&&(E?.(),F(ze))},{flush:O,deep:v,immediate:!0})})];return m!=null&&k.push(J(m,w).then(()=>s(e)).finally(()=>(E?.(),s(e)))),Promise.race(k)}function o(p){return r(_=>!!_,p)}function c(p){return n(null,p)}function l(p){return n(void 0,p)}function u(p){return r(Number.isNaN,p)}function f(p,_){return r(O=>{const v=Array.from(O);return v.includes(p)||v.includes(s(p))},_)}function y(p){return d(1,p)}function d(p=1,_){let O=-1;return r(()=>(O+=1,O>=p),_)}return Array.isArray(s(e))?{toMatch:r,toContains:f,changed:y,changedTimes:d,get not(){return V(e,!t)}}:{toMatch:r,toBe:n,toBeTruthy:o,toBeNull:c,toBeNaN:u,toBeUndefined:l,changed:y,changedTimes:d,get not(){return V(e,!t)}}}function qt(e){return V(e)}function zt(e,t){return e===t}function Zt(...e){var t;const r=e[0],n=e[1];let o=(t=e[2])!=null?t:zt;if(typeof o=="string"){const c=o;o=(l,u)=>l[c]===u[c]}return i.computed(()=>s(r).filter(c=>s(n).findIndex(l=>o(c,l))===-1))}function Jt(e,t){return i.computed(()=>s(e).every((r,n,o)=>t(s(r),n,o)))}function Xt(e,t){return i.computed(()=>s(e).map(r=>s(r)).filter(t))}function Kt(e,t){return i.computed(()=>s(s(e).find((r,n,o)=>t(s(r),n,o))))}function Qt(e,t){return i.computed(()=>s(e).findIndex((r,n,o)=>t(s(r),n,o)))}function Vt(e,t){let r=e.length;for(;r-- >0;)if(t(e[r],r,e))return e[r]}function Dt(e,t){return i.computed(()=>s(Array.prototype.findLast?s(e).findLast((r,n,o)=>t(s(r),n,o)):Vt(s(e),(r,n,o)=>t(s(r),n,o))))}function xt(e){return oe(e)&&ce(e,"formIndex","comparator")}function er(...e){var t;const r=e[0],n=e[1];let o=e[2],c=0;if(xt(o)&&(c=(t=o.fromIndex)!=null?t:0,o=o.comparator),typeof o=="string"){const l=o;o=(u,f)=>u[l]===s(f)}return o=o??((l,u)=>l===s(u)),i.computed(()=>s(r).slice(c).some((l,u,f)=>o(s(l),s(n),u,s(f))))}function tr(e,t){return i.computed(()=>s(e).map(r=>s(r)).join(s(t)))}function rr(e,t){return i.computed(()=>s(e).map(r=>s(r)).map(t))}function nr(e,t,...r){const n=(o,c,l)=>t(s(o),s(c),l);return i.computed(()=>{const o=s(e);return r.length?o.reduce(n,s(r[0])):o.reduce(n)})}function or(e,t){return i.computed(()=>s(e).some((r,n,o)=>t(s(r),n,o)))}function ar(e){return Array.from(new Set(e))}function ir(e,t){return e.reduce((r,n)=>(r.some(o=>t(n,o,e))||r.push(n),r),[])}function cr(e,t){return i.computed(()=>{const r=s(e).map(n=>s(n));return t?ir(r,t):ar(r)})}function lr(e=0,t={}){const r=i.ref(e),{max:n=1/0,min:o=-1/0}=t,c=(d=1)=>r.value=Math.min(n,r.value+d),l=(d=1)=>r.value=Math.max(o,r.value-d),u=()=>r.value,f=d=>r.value=Math.max(o,Math.min(n,d));return{count:r,inc:c,dec:l,get:u,set:f,reset:(d=e)=>(e=d,f(d))}}const ur=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,sr=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a{1,2}|A{1,2}|m{1,2}|s{1,2}|Z{1,2}|SSS/g;function fr(e,t,r,n){let o=e<12?"AM":"PM";return n&&(o=o.split("").reduce((c,l)=>c+=`${l}.`,"")),r?o.toLowerCase():o}function _e(e,t,r={}){var n;const o=e.getFullYear(),c=e.getMonth(),l=e.getDate(),u=e.getHours(),f=e.getMinutes(),y=e.getSeconds(),d=e.getMilliseconds(),p=e.getDay(),_=(n=r.customMeridiem)!=null?n:fr,O={YY:()=>String(o).slice(-2),YYYY:()=>o,M:()=>c+1,MM:()=>`${c+1}`.padStart(2,"0"),MMM:()=>e.toLocaleDateString(r.locales,{month:"short"}),MMMM:()=>e.toLocaleDateString(r.locales,{month:"long"}),D:()=>String(l),DD:()=>`${l}`.padStart(2,"0"),H:()=>String(u),HH:()=>`${u}`.padStart(2,"0"),h:()=>`${u%12||12}`.padStart(1,"0"),hh:()=>`${u%12||12}`.padStart(2,"0"),m:()=>String(f),mm:()=>`${f}`.padStart(2,"0"),s:()=>String(y),ss:()=>`${y}`.padStart(2,"0"),SSS:()=>`${d}`.padStart(3,"0"),d:()=>p,dd:()=>e.toLocaleDateString(r.locales,{weekday:"narrow"}),ddd:()=>e.toLocaleDateString(r.locales,{weekday:"short"}),dddd:()=>e.toLocaleDateString(r.locales,{weekday:"long"}),A:()=>_(u,f),AA:()=>_(u,f,!1,!0),a:()=>_(u,f,!0),aa:()=>_(u,f,!0,!0)};return t.replace(sr,(v,m)=>{var w;return m||((w=O[v])==null?void 0:w.call(O))||v})}function ye(e){if(e===null)return new Date(NaN);if(e===void 0)return new Date;if(e instanceof Date)return new Date(e);if(typeof e=="string"&&!/Z$/i.test(e)){const t=e.match(ur);if(t){const r=t[2]-1||0,n=(t[7]||"0").substring(0,3);return new Date(t[1],r,t[3]||1,t[4]||0,t[5]||0,t[6]||0,n)}}return new Date(e)}function dr(e,t="HH:mm:ss",r={}){return i.computed(()=>_e(ye(s(e)),s(t),r))}function ve(e,t=1e3,r={}){const{immediate:n=!0,immediateCallback:o=!1}=r;let c=null;const l=i.ref(!1);function u(){c&&(clearInterval(c),c=null)}function f(){l.value=!1,u()}function y(){const d=s(t);d<=0||(l.value=!0,o&&e(),u(),c=setInterval(e,d))}if(n&&R&&y(),i.isRef(t)||typeof t=="function"){const d=i.watch(t,()=>{l.value&&R&&y()});j(d)}return j(f),{isActive:l,pause:f,resume:y}}var pr=Object.defineProperty,Oe=Object.getOwnPropertySymbols,_r=Object.prototype.hasOwnProperty,yr=Object.prototype.propertyIsEnumerable,he=(e,t,r)=>t in e?pr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,vr=(e,t)=>{for(var r in t||(t={}))_r.call(t,r)&&he(e,r,t[r]);if(Oe)for(var r of Oe(t))yr.call(t,r)&&he(e,r,t[r]);return e};function Or(e=1e3,t={}){const{controls:r=!1,immediate:n=!0,callback:o}=t,c=i.ref(0),l=()=>c.value+=1,u=()=>{c.value=0},f=ve(o?()=>{l(),o(c.value)}:l,e,{immediate:n});return r?vr({counter:c,reset:u},f):c}function hr(e,t={}){var r;const n=i.ref((r=t.initialValue)!=null?r:null);return i.watch(e,()=>n.value=ae(),t),n}function we(e,t,r={}){const{immediate:n=!0}=r,o=i.ref(!1);let c=null;function l(){c&&(clearTimeout(c),c=null)}function u(){o.value=!1,l()}function f(...y){l(),o.value=!0,c=setTimeout(()=>{o.value=!1,c=null,e(...y)},s(t))}return n&&(o.value=!0,R&&f()),j(u),{isPending:i.readonly(o),start:f,stop:u}}var wr=Object.defineProperty,me=Object.getOwnPropertySymbols,mr=Object.prototype.hasOwnProperty,Pr=Object.prototype.propertyIsEnumerable,Pe=(e,t,r)=>t in e?wr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,gr=(e,t)=>{for(var r in t||(t={}))mr.call(t,r)&&Pe(e,r,t[r]);if(me)for(var r of me(t))Pr.call(t,r)&&Pe(e,r,t[r]);return e};function br(e=1e3,t={}){const{controls:r=!1,callback:n}=t,o=we(n??I,e,t),c=i.computed(()=>!o.isPending.value);return r?gr({ready:c},o):c}function $r(e,t={}){const{method:r="parseFloat",radix:n,nanToZero:o}=t;return i.computed(()=>{let c=s(e);return typeof c=="string"&&(c=Number[r](c,n)),o&&isNaN(c)&&(c=0),c})}function Sr(e){return i.computed(()=>`${s(e)}`)}function Ar(e=!1,t={}){const{truthyValue:r=!0,falsyValue:n=!1}=t,o=i.isRef(e),c=i.ref(e);function l(u){if(arguments.length)return c.value=u,c.value;{const f=s(r);return c.value=c.value===f?s(n):f,c.value}}return o?l:[c,l]}function jr(e,t,r){let n=r?.immediate?[]:[...e instanceof Function?e():Array.isArray(e)?e:s(e)];return i.watch(e,(o,c,l)=>{const u=new Array(n.length),f=[];for(const d of o){let p=!1;for(let _=0;_<n.length;_++)if(!u[_]&&d===n[_]){u[_]=!0,p=!0;break}p||f.push(d)}const y=n.filter((d,p)=>!u[p]);t(o,n,f,y,l),n=[...o]},r)}var ge=Object.getOwnPropertySymbols,Ir=Object.prototype.hasOwnProperty,Er=Object.prototype.propertyIsEnumerable,Fr=(e,t)=>{var r={};for(var n in e)Ir.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&ge)for(var n of ge(e))t.indexOf(n)<0&&Er.call(e,n)&&(r[n]=e[n]);return r};function C(e,t,r={}){const n=r,{eventFilter:o=W}=n,c=Fr(n,["eventFilter"]);return i.watch(e,M(o,t),c)}var be=Object.getOwnPropertySymbols,Tr=Object.prototype.hasOwnProperty,Rr=Object.prototype.propertyIsEnumerable,Mr=(e,t)=>{var r={};for(var n in e)Tr.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&be)for(var n of be(e))t.indexOf(n)<0&&Rr.call(e,n)&&(r[n]=e[n]);return r};function Cr(e,t,r){const n=r,{count:o}=n,c=Mr(n,["count"]),l=i.ref(0),u=C(e,(...f)=>{l.value+=1,l.value>=s(o)&&i.nextTick(()=>u()),t(...f)},c);return{count:l,stop:u}}var Nr=Object.defineProperty,Ur=Object.defineProperties,Wr=Object.getOwnPropertyDescriptors,L=Object.getOwnPropertySymbols,$e=Object.prototype.hasOwnProperty,Se=Object.prototype.propertyIsEnumerable,Ae=(e,t,r)=>t in e?Nr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Lr=(e,t)=>{for(var r in t||(t={}))$e.call(t,r)&&Ae(e,r,t[r]);if(L)for(var r of L(t))Se.call(t,r)&&Ae(e,r,t[r]);return e},Br=(e,t)=>Ur(e,Wr(t)),Hr=(e,t)=>{var r={};for(var n in e)$e.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&L)for(var n of L(e))t.indexOf(n)<0&&Se.call(e,n)&&(r[n]=e[n]);return r};function je(e,t,r={}){const n=r,{debounce:o=0,maxWait:c=void 0}=n,l=Hr(n,["debounce","maxWait"]);return C(e,t,Br(Lr({},l),{eventFilter:z(o,{maxWait:c})}))}var Yr=Object.defineProperty,kr=Object.defineProperties,Gr=Object.getOwnPropertyDescriptors,Ie=Object.getOwnPropertySymbols,qr=Object.prototype.hasOwnProperty,zr=Object.prototype.propertyIsEnumerable,Ee=(e,t,r)=>t in e?Yr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Zr=(e,t)=>{for(var r in t||(t={}))qr.call(t,r)&&Ee(e,r,t[r]);if(Ie)for(var r of Ie(t))zr.call(t,r)&&Ee(e,r,t[r]);return e},Jr=(e,t)=>kr(e,Gr(t));function Xr(e,t,r){return i.watch(e,t,Jr(Zr({},r),{deep:!0}))}var Kr=Object.defineProperty,Qr=Object.defineProperties,Vr=Object.getOwnPropertyDescriptors,B=Object.getOwnPropertySymbols,Fe=Object.prototype.hasOwnProperty,Te=Object.prototype.propertyIsEnumerable,Re=(e,t,r)=>t in e?Kr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Dr=(e,t)=>{for(var r in t||(t={}))Fe.call(t,r)&&Re(e,r,t[r]);if(B)for(var r of B(t))Te.call(t,r)&&Re(e,r,t[r]);return e},xr=(e,t)=>Qr(e,Vr(t)),en=(e,t)=>{var r={};for(var n in e)Fe.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&B)for(var n of B(e))t.indexOf(n)<0&&Te.call(e,n)&&(r[n]=e[n]);return r};function D(e,t,r={}){const n=r,{eventFilter:o=W}=n,c=en(n,["eventFilter"]),l=M(o,t);let u,f,y;if(c.flush==="sync"){const d=i.ref(!1);f=()=>{},u=p=>{d.value=!0,p(),d.value=!1},y=i.watch(e,(...p)=>{d.value||l(...p)},c)}else{const d=[],p=i.ref(0),_=i.ref(0);f=()=>{p.value=_.value},d.push(i.watch(e,()=>{_.value++},xr(Dr({},c),{flush:"sync"}))),u=O=>{const v=_.value;O(),p.value+=_.value-v},d.push(i.watch(e,(...O)=>{const v=p.value>0&&p.value===_.value;p.value=0,_.value=0,!v&&l(...O)},c)),y=()=>{d.forEach(O=>O())}}return{stop:y,ignoreUpdates:u,ignorePrevAsyncUpdates:f}}var tn=Object.defineProperty,rn=Object.defineProperties,nn=Object.getOwnPropertyDescriptors,Me=Object.getOwnPropertySymbols,on=Object.prototype.hasOwnProperty,an=Object.prototype.propertyIsEnumerable,Ce=(e,t,r)=>t in e?tn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,cn=(e,t)=>{for(var r in t||(t={}))on.call(t,r)&&Ce(e,r,t[r]);if(Me)for(var r of Me(t))an.call(t,r)&&Ce(e,r,t[r]);return e},ln=(e,t)=>rn(e,nn(t));function un(e,t,r){return i.watch(e,t,ln(cn({},r),{immediate:!0}))}function sn(e,t,r){const n=i.watch(e,(...o)=>(i.nextTick(()=>n()),t(...o)),r)}var fn=Object.defineProperty,dn=Object.defineProperties,pn=Object.getOwnPropertyDescriptors,H=Object.getOwnPropertySymbols,Ne=Object.prototype.hasOwnProperty,Ue=Object.prototype.propertyIsEnumerable,We=(e,t,r)=>t in e?fn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,_n=(e,t)=>{for(var r in t||(t={}))Ne.call(t,r)&&We(e,r,t[r]);if(H)for(var r of H(t))Ue.call(t,r)&&We(e,r,t[r]);return e},yn=(e,t)=>dn(e,pn(t)),vn=(e,t)=>{var r={};for(var n in e)Ne.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&H)for(var n of H(e))t.indexOf(n)<0&&Ue.call(e,n)&&(r[n]=e[n]);return r};function Le(e,t,r={}){const n=r,{eventFilter:o}=n,c=vn(n,["eventFilter"]),{eventFilter:l,pause:u,resume:f,isActive:y}=ie(o);return{stop:C(e,t,yn(_n({},c),{eventFilter:l})),pause:u,resume:f,isActive:y}}var On=Object.defineProperty,hn=Object.defineProperties,wn=Object.getOwnPropertyDescriptors,Y=Object.getOwnPropertySymbols,Be=Object.prototype.hasOwnProperty,He=Object.prototype.propertyIsEnumerable,Ye=(e,t,r)=>t in e?On(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,mn=(e,t)=>{for(var r in t||(t={}))Be.call(t,r)&&Ye(e,r,t[r]);if(Y)for(var r of Y(t))He.call(t,r)&&Ye(e,r,t[r]);return e},Pn=(e,t)=>hn(e,wn(t)),gn=(e,t)=>{var r={};for(var n in e)Be.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&Y)for(var n of Y(e))t.indexOf(n)<0&&He.call(e,n)&&(r[n]=e[n]);return r};function ke(e,t,r={}){const n=r,{throttle:o=0,trailing:c=!0,leading:l=!0}=n,u=gn(n,["throttle","trailing","leading"]);return C(e,t,Pn(mn({},u),{eventFilter:Z(o,c,l)}))}var bn=Object.defineProperty,$n=Object.defineProperties,Sn=Object.getOwnPropertyDescriptors,Ge=Object.getOwnPropertySymbols,An=Object.prototype.hasOwnProperty,jn=Object.prototype.propertyIsEnumerable,qe=(e,t,r)=>t in e?bn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,In=(e,t)=>{for(var r in t||(t={}))An.call(t,r)&&qe(e,r,t[r]);if(Ge)for(var r of Ge(t))jn.call(t,r)&&qe(e,r,t[r]);return e},En=(e,t)=>$n(e,Sn(t));function Fn(e,t,r={}){let n;function o(){if(!n)return;const d=n;n=void 0,d()}function c(d){n=d}const l=(d,p)=>(o(),t(d,p,c)),u=D(e,l,r),{ignoreUpdates:f}=u,y=()=>{let d;return f(()=>{d=l(Tn(e),Rn(e))}),d};return En(In({},u),{trigger:y})}function Tn(e){return i.isReactive(e)?e:Array.isArray(e)?e.map(t=>s(t)):s(e)}function Rn(e){return Array.isArray(e)?e.map(()=>{}):void 0}function Mn(e,t,r){return i.watch(e,(n,o,c)=>{n&&t(n,o,c)},r)}a.assert=ut,a.autoResetRef=le,a.bypassFilter=W,a.clamp=dt,a.computedEager=$,a.computedWithControl=S,a.containsProp=ce,a.controlledComputed=S,a.controlledRef=It,a.createEventHook=Je,a.createFilterWrapper=M,a.createGlobalState=Xe,a.createInjectionState=Ke,a.createReactiveFn=G,a.createSharedComposable=Qe,a.createSingletonPromise=wt,a.debounceFilter=z,a.debouncedRef=K,a.debouncedWatch=je,a.directiveHooks=Ot,a.eagerComputed=$,a.extendRef=ee,a.formatDate=_e,a.get=Ve,a.hasOwn=_t,a.identity=ht,a.ignorableWatch=D,a.increaseWithUnit=Pt,a.invoke=mt,a.isClient=R,a.isDef=ct,a.isDefined=De,a.isIOS=yt,a.isObject=oe,a.makeDestructurable=nt,a.noop=I,a.normalizeDate=ye,a.notNullish=lt,a.now=ft,a.objectEntries=$t,a.objectOmit=bt,a.objectPick=gt,a.pausableFilter=ie,a.pausableWatch=Le,a.promiseTimeout=J,a.rand=pt,a.reactify=G,a.reactifyObject=at,a.reactiveComputed=q,a.reactiveOmit=it,a.reactivePick=At,a.refAutoReset=le,a.refDebounced=K,a.refDefault=jt,a.refThrottled=Q,a.refWithControl=fe,a.resolveRef=St,a.resolveUnref=ot,a.set=Et,a.syncRef=Ft,a.syncRefs=Tt,a.throttleFilter=Z,a.throttledRef=Q,a.throttledWatch=ke,a.timestamp=ae,a.toReactive=ne,a.toRef=X,a.toRefs=Bt,a.toValue=s,a.tryOnBeforeMount=Ht,a.tryOnBeforeUnmount=Yt,a.tryOnMounted=kt,a.tryOnScopeDispose=j,a.tryOnUnmounted=Gt,a.until=qt,a.useArrayDifference=Zt,a.useArrayEvery=Jt,a.useArrayFilter=Xt,a.useArrayFind=Kt,a.useArrayFindIndex=Qt,a.useArrayFindLast=Dt,a.useArrayIncludes=er,a.useArrayJoin=tr,a.useArrayMap=rr,a.useArrayReduce=nr,a.useArraySome=or,a.useArrayUnique=cr,a.useCounter=lr,a.useDateFormat=dr,a.useDebounce=K,a.useDebounceFn=ue,a.useInterval=Or,a.useIntervalFn=ve,a.useLastChanged=hr,a.useThrottle=Q,a.useThrottleFn=se,a.useTimeout=br,a.useTimeoutFn=we,a.useToNumber=$r,a.useToString=Sr,a.useToggle=Ar,a.watchArray=jr,a.watchAtMost=Cr,a.watchDebounced=je,a.watchDeep=Xr,a.watchIgnorable=D,a.watchImmediate=un,a.watchOnce=sn,a.watchPausable=Le,a.watchThrottled=ke,a.watchTriggerable=Fn,a.watchWithFilter=C,a.whenever=Mn})(this.VueUse=this.VueUse||{},VueDemi);