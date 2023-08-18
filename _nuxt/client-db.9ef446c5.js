import{X as z,Y as K,Z as E,$ as T,a0 as P,a1 as B,a2 as U,a3 as J,a4 as W,h as R,a5 as b,a6 as F,a7 as H,a8 as q}from"./entry.aab06d94.js";const G="memory",Z=()=>{const e=new Map;return{name:G,options:{},hasItem(t){return e.has(t)},getItem(t){return e.get(t)||null},getItemRaw(t){return e.get(t)||null},setItem(t,r){e.set(t,r)},setItemRaw(t,r){e.set(t,r)},removeItem(t){e.delete(t)},getKeys(){return Array.from(e.keys())},clear(){e.clear()},dispose(){e.clear()}}},k=/"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,V=/"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,X=/^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;function Q(e,t){if(e==="__proto__"||e==="constructor"&&t&&typeof t=="object"&&"prototype"in t){ee(e);return}return t}function ee(e){console.warn(`[destr] Dropping "${e}" key to prevent prototype pollution.`)}function $(e,t={}){if(typeof e!="string")return e;const r=e.trim();if(e[0]==='"'&&e[e.length-1]==='"')return r.slice(1,-1);if(r.length<=9){const i=r.toLowerCase();if(i==="true")return!0;if(i==="false")return!1;if(i==="undefined")return;if(i==="null")return null;if(i==="nan")return Number.NaN;if(i==="infinity")return Number.POSITIVE_INFINITY;if(i==="-infinity")return Number.NEGATIVE_INFINITY}if(!X.test(e)){if(t.strict)throw new SyntaxError("[destr] Invalid JSON");return e}try{if(k.test(e)||V.test(e)){if(t.strict)throw new Error("[destr] Possible prototype pollution");return JSON.parse(e,Q)}return JSON.parse(e)}catch(i){if(t.strict)throw i;return e}}function te(e){return!e||typeof e.then!="function"?Promise.resolve(e):e}function g(e,...t){try{return te(e(...t))}catch(r){return Promise.reject(r)}}function re(e){const t=typeof e;return e===null||t!=="object"&&t!=="function"}function ne(e){const t=Object.getPrototypeOf(e);return!t||t.isPrototypeOf(Object)}function S(e){if(re(e))return String(e);if(ne(e)||Array.isArray(e))return JSON.stringify(e);if(typeof e.toJSON=="function")return S(e.toJSON());throw new Error("[unstorage] Cannot stringify value!")}function D(){if(typeof Buffer===void 0)throw new TypeError("[unstorage] Buffer is not supported!")}const j="base64:";function ie(e){if(typeof e=="string")return e;D();const t=Buffer.from(e).toString("base64");return j+t}function ae(e){return typeof e!="string"||!e.startsWith(j)?e:(D(),Buffer.from(e.slice(j.length),"base64"))}const se=["hasItem","getItem","getItemRaw","setItem","setItemRaw","removeItem","getMeta","setMeta","removeMeta","getKeys","clear","mount","unmount"];function oe(e,t){if(t=A(t),!t)return e;const r={...e};for(const i of se)r[i]=(o="",...u)=>e[i](t+o,...u);return r.getKeys=(i="",...o)=>e.getKeys(t+i,...o).then(u=>u.map(l=>l.slice(t.length))),r}function y(e){return e?e.split("?")[0].replace(/[/\\]/g,":").replace(/:+/g,":").replace(/^:|:$/g,""):""}function ue(...e){return y(e.join(":"))}function A(e){return e=y(e),e?e+":":""}const ce="memory",fe=()=>{const e=new Map;return{name:ce,options:{},hasItem(t){return e.has(t)},getItem(t){return e.get(t)||null},getItemRaw(t){return e.get(t)||null},setItem(t,r){e.set(t,r)},setItemRaw(t,r){e.set(t,r)},removeItem(t){e.delete(t)},getKeys(){return Array.from(e.keys())},clear(){e.clear()},dispose(){e.clear()}}};function le(e={}){const t={mounts:{"":e.driver||fe()},mountpoints:[""],watching:!1,watchListeners:[],unwatch:{}},r=n=>{for(const a of t.mountpoints)if(n.startsWith(a))return{base:a,relativeKey:n.slice(a.length),driver:t.mounts[a]};return{base:"",relativeKey:n,driver:t.mounts[""]}},i=(n,a)=>t.mountpoints.filter(s=>s.startsWith(n)||a&&n.startsWith(s)).map(s=>({relativeBase:n.length>s.length?n.slice(s.length):void 0,mountpoint:s,driver:t.mounts[s]})),o=(n,a)=>{if(!!t.watching){a=y(a);for(const s of t.watchListeners)s(n,a)}},u=async()=>{if(!t.watching){t.watching=!0;for(const n in t.mounts)t.unwatch[n]=await x(t.mounts[n],o,n)}},l=async()=>{if(!!t.watching){for(const n in t.unwatch)await t.unwatch[n]();t.unwatch={},t.watching=!1}},p=(n,a,s)=>{const c=new Map,f=m=>{let d=c.get(m.base);return d||(d={driver:m.driver,base:m.base,items:[]},c.set(m.base,d)),d};for(const m of n){const d=typeof m=="string",v=y(d?m:m.key),w=d?void 0:m.value,I=d||!m.options?a:{...a,...m.options},O=r(v);f(O).items.push({key:v,value:w,relativeKey:O.relativeKey,options:I})}return Promise.all([...c.values()].map(m=>s(m))).then(m=>m.flat())},h={hasItem(n,a={}){n=y(n);const{relativeKey:s,driver:c}=r(n);return g(c.hasItem,s,a)},getItem(n,a={}){n=y(n);const{relativeKey:s,driver:c}=r(n);return g(c.getItem,s,a).then(f=>$(f))},getItems(n,a){return p(n,a,s=>s.driver.getItems?g(s.driver.getItems,s.items.map(c=>({key:c.relativeKey,options:c.options})),a).then(c=>c.map(f=>({key:ue(s.base,f.key),value:$(f.value)}))):Promise.all(s.items.map(c=>g(s.driver.getItem,c.relativeKey,c.options).then(f=>({key:c.key,value:$(f)})))))},getItemRaw(n,a={}){n=y(n);const{relativeKey:s,driver:c}=r(n);return c.getItemRaw?g(c.getItemRaw,s,a):g(c.getItem,s,a).then(f=>ae(f))},async setItem(n,a,s={}){if(a===void 0)return h.removeItem(n);n=y(n);const{relativeKey:c,driver:f}=r(n);!f.setItem||(await g(f.setItem,c,S(a),s),f.watch||o("update",n))},async setItems(n,a){await p(n,a,async s=>{s.driver.setItems&&await g(s.driver.setItems,s.items.map(c=>({key:c.relativeKey,value:S(c.value),options:c.options})),a),s.driver.setItem&&await Promise.all(s.items.map(c=>g(s.driver.setItem,c.relativeKey,S(c.value),c.options)))})},async setItemRaw(n,a,s={}){if(a===void 0)return h.removeItem(n,s);n=y(n);const{relativeKey:c,driver:f}=r(n);if(f.setItemRaw)await g(f.setItemRaw,c,a,s);else if(f.setItem)await g(f.setItem,c,ie(a),s);else return;f.watch||o("update",n)},async removeItem(n,a={}){typeof a=="boolean"&&(a={removeMeta:a}),n=y(n);const{relativeKey:s,driver:c}=r(n);!c.removeItem||(await g(c.removeItem,s,a),(a.removeMeta||a.removeMata)&&await g(c.removeItem,s+"$",a),c.watch||o("remove",n))},async getMeta(n,a={}){typeof a=="boolean"&&(a={nativeOnly:a}),n=y(n);const{relativeKey:s,driver:c}=r(n),f=Object.create(null);if(c.getMeta&&Object.assign(f,await g(c.getMeta,s,a)),!a.nativeOnly){const m=await g(c.getItem,s+"$",a).then(d=>$(d));m&&typeof m=="object"&&(typeof m.atime=="string"&&(m.atime=new Date(m.atime)),typeof m.mtime=="string"&&(m.mtime=new Date(m.mtime)),Object.assign(f,m))}return f},setMeta(n,a,s={}){return this.setItem(n+"$",a,s)},removeMeta(n,a={}){return this.removeItem(n+"$",a)},async getKeys(n,a={}){n=A(n);const s=i(n,!0);let c=[];const f=[];for(const m of s){const v=(await g(m.driver.getKeys,m.relativeBase,a)).map(w=>m.mountpoint+y(w)).filter(w=>!c.some(I=>w.startsWith(I)));f.push(...v),c=[m.mountpoint,...c.filter(w=>!w.startsWith(m.mountpoint))]}return n?f.filter(m=>m.startsWith(n)&&!m.endsWith("$")):f.filter(m=>!m.endsWith("$"))},async clear(n,a={}){n=A(n),await Promise.all(i(n,!1).map(async s=>{if(s.driver.clear)return g(s.driver.clear,s.relativeBase,a);if(s.driver.removeItem){const c=await s.driver.getKeys(s.relativeBase||"",a);return Promise.all(c.map(f=>s.driver.removeItem(f,a)))}}))},async dispose(){await Promise.all(Object.values(t.mounts).map(n=>C(n)))},async watch(n){return await u(),t.watchListeners.push(n),async()=>{t.watchListeners=t.watchListeners.filter(a=>a!==n),t.watchListeners.length===0&&await l()}},async unwatch(){t.watchListeners=[],await l()},mount(n,a){if(n=A(n),n&&t.mounts[n])throw new Error(`already mounted at ${n}`);return n&&(t.mountpoints.push(n),t.mountpoints.sort((s,c)=>c.length-s.length)),t.mounts[n]=a,t.watching&&Promise.resolve(x(a,o,n)).then(s=>{t.unwatch[n]=s}).catch(console.error),h},async unmount(n,a=!0){n=A(n),!(!n||!t.mounts[n])&&(t.watching&&n in t.unwatch&&(t.unwatch[n](),delete t.unwatch[n]),a&&await C(t.mounts[n]),t.mountpoints=t.mountpoints.filter(s=>s!==n),delete t.mounts[n])},getMount(n=""){n=y(n)+":";const a=r(n);return{driver:a.driver,base:a.base}},getMounts(n="",a={}){return n=y(n),i(n,a.parents).map(c=>({driver:c.driver,base:c.mountpoint}))}};return h}function x(e,t,r){return e.watch?e.watch((i,o)=>t(i,r+o)):()=>{}}async function C(e){typeof e.dispose=="function"&&await g(e.dispose)}function me(e={}){const t=pe(r,e.operators);function r(i,o){return typeof o!="object"||o instanceof RegExp?t.$eq(i,o):Object.keys(o||{}).every(u=>{const l=o[u];if(u.startsWith("$")&&t[u]){const p=t[u];return typeof p=="function"?p(i,l):!1}return r(z(i,u),l)})}return r}function pe(e,t={}){return{$match:(r,i)=>e(r,i),$eq:(r,i)=>i instanceof RegExp?i.test(r):r===i,$ne:(r,i)=>i instanceof RegExp?!i.test(r):r!==i,$not:(r,i)=>!e(r,i),$and:(r,i)=>(K(i,"$and requires an array as condition"),i.every(o=>e(r,o))),$or:(r,i)=>(K(i,"$or requires an array as condition"),i.some(o=>e(r,o))),$in:(r,i)=>E(i).some(o=>Array.isArray(r)?e(r,{$contains:o}):e(r,o)),$contains:(r,i)=>(r=Array.isArray(r)?r:String(r),E(i).every(o=>r.includes(o))),$icontains:(r,i)=>{if(typeof i!="string")throw new TypeError("$icontains requires a string, use $contains instead");return r=String(r).toLocaleLowerCase(),E(i).every(o=>r.includes(o.toLocaleLowerCase()))},$containsAny:(r,i)=>(K(i,"$containsAny requires an array as condition"),r=Array.isArray(r)?r:String(r),i.some(o=>r.includes(o))),$exists:(r,i)=>i?typeof r<"u":typeof r>"u",$type:(r,i)=>typeof r===String(i),$regex:(r,i)=>{if(!(i instanceof RegExp)){const o=String(i).match(/\/(.*)\/([dgimsuy]*)$/);i=o?new RegExp(o[1],o[2]||""):new RegExp(i)}return i.test(String(r||""))},$lt:(r,i)=>r<i,$lte:(r,i)=>r<=i,$gt:(r,i)=>r>i,$gte:(r,i)=>r>=i,...t||{}}}function M(e){const t=me(),r=(o,{query:u,before:l,after:p})=>{const h=typeof u=="string"?{_path:u}:u,n=o.findIndex(s=>t(s,h));l=l||1,p=p||1;const a=new Array(l+p).fill(null,0);return n===-1?a:a.map((s,c)=>o[n-l+c+Number(c>=l)]||null)},i=[(o,u)=>o.filter(l=>E(u.where).every(p=>t(l,p))),(o,u)=>E(u.sort).forEach(l=>T(o,l)),(o,u)=>u.surround?r(o,u.surround):o,(o,u)=>u.skip?o.slice(u.skip):o,(o,u)=>u.limit?o.slice(0,u.limit):o,(o,u)=>P(B(u.without))(o),(o,u)=>P(U(u.only))(o)];return async o=>{const u=await e(),l=o.params(),p=i.reduce((h,n)=>n(h,l)||h,u);return l.first?p[0]:p}}var he={exports:{}};(function(e,t){(function(r,i,o){e.exports=o(),e.exports.default=o()})("slugify",J,function(){var r=JSON.parse(`{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","\xA2":"cent","\xA3":"pound","\xA4":"currency","\xA5":"yen","\xA9":"(c)","\xAA":"a","\xAE":"(r)","\xBA":"o","\xC0":"A","\xC1":"A","\xC2":"A","\xC3":"A","\xC4":"A","\xC5":"A","\xC6":"AE","\xC7":"C","\xC8":"E","\xC9":"E","\xCA":"E","\xCB":"E","\xCC":"I","\xCD":"I","\xCE":"I","\xCF":"I","\xD0":"D","\xD1":"N","\xD2":"O","\xD3":"O","\xD4":"O","\xD5":"O","\xD6":"O","\xD8":"O","\xD9":"U","\xDA":"U","\xDB":"U","\xDC":"U","\xDD":"Y","\xDE":"TH","\xDF":"ss","\xE0":"a","\xE1":"a","\xE2":"a","\xE3":"a","\xE4":"a","\xE5":"a","\xE6":"ae","\xE7":"c","\xE8":"e","\xE9":"e","\xEA":"e","\xEB":"e","\xEC":"i","\xED":"i","\xEE":"i","\xEF":"i","\xF0":"d","\xF1":"n","\xF2":"o","\xF3":"o","\xF4":"o","\xF5":"o","\xF6":"o","\xF8":"o","\xF9":"u","\xFA":"u","\xFB":"u","\xFC":"u","\xFD":"y","\xFE":"th","\xFF":"y","\u0100":"A","\u0101":"a","\u0102":"A","\u0103":"a","\u0104":"A","\u0105":"a","\u0106":"C","\u0107":"c","\u010C":"C","\u010D":"c","\u010E":"D","\u010F":"d","\u0110":"DJ","\u0111":"dj","\u0112":"E","\u0113":"e","\u0116":"E","\u0117":"e","\u0118":"e","\u0119":"e","\u011A":"E","\u011B":"e","\u011E":"G","\u011F":"g","\u0122":"G","\u0123":"g","\u0128":"I","\u0129":"i","\u012A":"i","\u012B":"i","\u012E":"I","\u012F":"i","\u0130":"I","\u0131":"i","\u0136":"k","\u0137":"k","\u013B":"L","\u013C":"l","\u013D":"L","\u013E":"l","\u0141":"L","\u0142":"l","\u0143":"N","\u0144":"n","\u0145":"N","\u0146":"n","\u0147":"N","\u0148":"n","\u014C":"O","\u014D":"o","\u0150":"O","\u0151":"o","\u0152":"OE","\u0153":"oe","\u0154":"R","\u0155":"r","\u0158":"R","\u0159":"r","\u015A":"S","\u015B":"s","\u015E":"S","\u015F":"s","\u0160":"S","\u0161":"s","\u0162":"T","\u0163":"t","\u0164":"T","\u0165":"t","\u0168":"U","\u0169":"u","\u016A":"u","\u016B":"u","\u016E":"U","\u016F":"u","\u0170":"U","\u0171":"u","\u0172":"U","\u0173":"u","\u0174":"W","\u0175":"w","\u0176":"Y","\u0177":"y","\u0178":"Y","\u0179":"Z","\u017A":"z","\u017B":"Z","\u017C":"z","\u017D":"Z","\u017E":"z","\u018F":"E","\u0192":"f","\u01A0":"O","\u01A1":"o","\u01AF":"U","\u01B0":"u","\u01C8":"LJ","\u01C9":"lj","\u01CB":"NJ","\u01CC":"nj","\u0218":"S","\u0219":"s","\u021A":"T","\u021B":"t","\u0259":"e","\u02DA":"o","\u0386":"A","\u0388":"E","\u0389":"H","\u038A":"I","\u038C":"O","\u038E":"Y","\u038F":"W","\u0390":"i","\u0391":"A","\u0392":"B","\u0393":"G","\u0394":"D","\u0395":"E","\u0396":"Z","\u0397":"H","\u0398":"8","\u0399":"I","\u039A":"K","\u039B":"L","\u039C":"M","\u039D":"N","\u039E":"3","\u039F":"O","\u03A0":"P","\u03A1":"R","\u03A3":"S","\u03A4":"T","\u03A5":"Y","\u03A6":"F","\u03A7":"X","\u03A8":"PS","\u03A9":"W","\u03AA":"I","\u03AB":"Y","\u03AC":"a","\u03AD":"e","\u03AE":"h","\u03AF":"i","\u03B0":"y","\u03B1":"a","\u03B2":"b","\u03B3":"g","\u03B4":"d","\u03B5":"e","\u03B6":"z","\u03B7":"h","\u03B8":"8","\u03B9":"i","\u03BA":"k","\u03BB":"l","\u03BC":"m","\u03BD":"n","\u03BE":"3","\u03BF":"o","\u03C0":"p","\u03C1":"r","\u03C2":"s","\u03C3":"s","\u03C4":"t","\u03C5":"y","\u03C6":"f","\u03C7":"x","\u03C8":"ps","\u03C9":"w","\u03CA":"i","\u03CB":"y","\u03CC":"o","\u03CD":"y","\u03CE":"w","\u0401":"Yo","\u0402":"DJ","\u0404":"Ye","\u0406":"I","\u0407":"Yi","\u0408":"J","\u0409":"LJ","\u040A":"NJ","\u040B":"C","\u040F":"DZ","\u0410":"A","\u0411":"B","\u0412":"V","\u0413":"G","\u0414":"D","\u0415":"E","\u0416":"Zh","\u0417":"Z","\u0418":"I","\u0419":"J","\u041A":"K","\u041B":"L","\u041C":"M","\u041D":"N","\u041E":"O","\u041F":"P","\u0420":"R","\u0421":"S","\u0422":"T","\u0423":"U","\u0424":"F","\u0425":"H","\u0426":"C","\u0427":"Ch","\u0428":"Sh","\u0429":"Sh","\u042A":"U","\u042B":"Y","\u042C":"","\u042D":"E","\u042E":"Yu","\u042F":"Ya","\u0430":"a","\u0431":"b","\u0432":"v","\u0433":"g","\u0434":"d","\u0435":"e","\u0436":"zh","\u0437":"z","\u0438":"i","\u0439":"j","\u043A":"k","\u043B":"l","\u043C":"m","\u043D":"n","\u043E":"o","\u043F":"p","\u0440":"r","\u0441":"s","\u0442":"t","\u0443":"u","\u0444":"f","\u0445":"h","\u0446":"c","\u0447":"ch","\u0448":"sh","\u0449":"sh","\u044A":"u","\u044B":"y","\u044C":"","\u044D":"e","\u044E":"yu","\u044F":"ya","\u0451":"yo","\u0452":"dj","\u0454":"ye","\u0456":"i","\u0457":"yi","\u0458":"j","\u0459":"lj","\u045A":"nj","\u045B":"c","\u045D":"u","\u045F":"dz","\u0490":"G","\u0491":"g","\u0492":"GH","\u0493":"gh","\u049A":"KH","\u049B":"kh","\u04A2":"NG","\u04A3":"ng","\u04AE":"UE","\u04AF":"ue","\u04B0":"U","\u04B1":"u","\u04BA":"H","\u04BB":"h","\u04D8":"AE","\u04D9":"ae","\u04E8":"OE","\u04E9":"oe","\u0531":"A","\u0532":"B","\u0533":"G","\u0534":"D","\u0535":"E","\u0536":"Z","\u0537":"E'","\u0538":"Y'","\u0539":"T'","\u053A":"JH","\u053B":"I","\u053C":"L","\u053D":"X","\u053E":"C'","\u053F":"K","\u0540":"H","\u0541":"D'","\u0542":"GH","\u0543":"TW","\u0544":"M","\u0545":"Y","\u0546":"N","\u0547":"SH","\u0549":"CH","\u054A":"P","\u054B":"J","\u054C":"R'","\u054D":"S","\u054E":"V","\u054F":"T","\u0550":"R","\u0551":"C","\u0553":"P'","\u0554":"Q'","\u0555":"O''","\u0556":"F","\u0587":"EV","\u0621":"a","\u0622":"aa","\u0623":"a","\u0624":"u","\u0625":"i","\u0626":"e","\u0627":"a","\u0628":"b","\u0629":"h","\u062A":"t","\u062B":"th","\u062C":"j","\u062D":"h","\u062E":"kh","\u062F":"d","\u0630":"th","\u0631":"r","\u0632":"z","\u0633":"s","\u0634":"sh","\u0635":"s","\u0636":"dh","\u0637":"t","\u0638":"z","\u0639":"a","\u063A":"gh","\u0641":"f","\u0642":"q","\u0643":"k","\u0644":"l","\u0645":"m","\u0646":"n","\u0647":"h","\u0648":"w","\u0649":"a","\u064A":"y","\u064B":"an","\u064C":"on","\u064D":"en","\u064E":"a","\u064F":"u","\u0650":"e","\u0652":"","\u0660":"0","\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u067E":"p","\u0686":"ch","\u0698":"zh","\u06A9":"k","\u06AF":"g","\u06CC":"y","\u06F0":"0","\u06F1":"1","\u06F2":"2","\u06F3":"3","\u06F4":"4","\u06F5":"5","\u06F6":"6","\u06F7":"7","\u06F8":"8","\u06F9":"9","\u0E3F":"baht","\u10D0":"a","\u10D1":"b","\u10D2":"g","\u10D3":"d","\u10D4":"e","\u10D5":"v","\u10D6":"z","\u10D7":"t","\u10D8":"i","\u10D9":"k","\u10DA":"l","\u10DB":"m","\u10DC":"n","\u10DD":"o","\u10DE":"p","\u10DF":"zh","\u10E0":"r","\u10E1":"s","\u10E2":"t","\u10E3":"u","\u10E4":"f","\u10E5":"k","\u10E6":"gh","\u10E7":"q","\u10E8":"sh","\u10E9":"ch","\u10EA":"ts","\u10EB":"dz","\u10EC":"ts","\u10ED":"ch","\u10EE":"kh","\u10EF":"j","\u10F0":"h","\u1E62":"S","\u1E63":"s","\u1E80":"W","\u1E81":"w","\u1E82":"W","\u1E83":"w","\u1E84":"W","\u1E85":"w","\u1E9E":"SS","\u1EA0":"A","\u1EA1":"a","\u1EA2":"A","\u1EA3":"a","\u1EA4":"A","\u1EA5":"a","\u1EA6":"A","\u1EA7":"a","\u1EA8":"A","\u1EA9":"a","\u1EAA":"A","\u1EAB":"a","\u1EAC":"A","\u1EAD":"a","\u1EAE":"A","\u1EAF":"a","\u1EB0":"A","\u1EB1":"a","\u1EB2":"A","\u1EB3":"a","\u1EB4":"A","\u1EB5":"a","\u1EB6":"A","\u1EB7":"a","\u1EB8":"E","\u1EB9":"e","\u1EBA":"E","\u1EBB":"e","\u1EBC":"E","\u1EBD":"e","\u1EBE":"E","\u1EBF":"e","\u1EC0":"E","\u1EC1":"e","\u1EC2":"E","\u1EC3":"e","\u1EC4":"E","\u1EC5":"e","\u1EC6":"E","\u1EC7":"e","\u1EC8":"I","\u1EC9":"i","\u1ECA":"I","\u1ECB":"i","\u1ECC":"O","\u1ECD":"o","\u1ECE":"O","\u1ECF":"o","\u1ED0":"O","\u1ED1":"o","\u1ED2":"O","\u1ED3":"o","\u1ED4":"O","\u1ED5":"o","\u1ED6":"O","\u1ED7":"o","\u1ED8":"O","\u1ED9":"o","\u1EDA":"O","\u1EDB":"o","\u1EDC":"O","\u1EDD":"o","\u1EDE":"O","\u1EDF":"o","\u1EE0":"O","\u1EE1":"o","\u1EE2":"O","\u1EE3":"o","\u1EE4":"U","\u1EE5":"u","\u1EE6":"U","\u1EE7":"u","\u1EE8":"U","\u1EE9":"u","\u1EEA":"U","\u1EEB":"u","\u1EEC":"U","\u1EED":"u","\u1EEE":"U","\u1EEF":"u","\u1EF0":"U","\u1EF1":"u","\u1EF2":"Y","\u1EF3":"y","\u1EF4":"Y","\u1EF5":"y","\u1EF6":"Y","\u1EF7":"y","\u1EF8":"Y","\u1EF9":"y","\u2013":"-","\u2018":"'","\u2019":"'","\u201C":"\\"","\u201D":"\\"","\u201E":"\\"","\u2020":"+","\u2022":"*","\u2026":"...","\u20A0":"ecu","\u20A2":"cruzeiro","\u20A3":"french franc","\u20A4":"lira","\u20A5":"mill","\u20A6":"naira","\u20A7":"peseta","\u20A8":"rupee","\u20A9":"won","\u20AA":"new shequel","\u20AB":"dong","\u20AC":"euro","\u20AD":"kip","\u20AE":"tugrik","\u20AF":"drachma","\u20B0":"penny","\u20B1":"peso","\u20B2":"guarani","\u20B3":"austral","\u20B4":"hryvnia","\u20B5":"cedi","\u20B8":"kazakhstani tenge","\u20B9":"indian rupee","\u20BA":"turkish lira","\u20BD":"russian ruble","\u20BF":"bitcoin","\u2120":"sm","\u2122":"tm","\u2202":"d","\u2206":"delta","\u2211":"sum","\u221E":"infinity","\u2665":"love","\u5143":"yuan","\u5186":"yen","\uFDFC":"rial","\uFEF5":"laa","\uFEF7":"laa","\uFEF9":"lai","\uFEFB":"la"}`),i=JSON.parse('{"bg":{"\u0419":"Y","\u0426":"Ts","\u0429":"Sht","\u042A":"A","\u042C":"Y","\u0439":"y","\u0446":"ts","\u0449":"sht","\u044A":"a","\u044C":"y"},"de":{"\xC4":"AE","\xE4":"ae","\xD6":"OE","\xF6":"oe","\xDC":"UE","\xFC":"ue","\xDF":"ss","%":"prozent","&":"und","|":"oder","\u2211":"summe","\u221E":"unendlich","\u2665":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","\xA2":"centavos","\xA3":"libras","\xA4":"moneda","\u20A3":"francos","\u2211":"suma","\u221E":"infinito","\u2665":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","\xA2":"centime","\xA3":"livre","\xA4":"devise","\u20A3":"franc","\u2211":"somme","\u221E":"infini","\u2665":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","\xA2":"centavo","\u2211":"soma","\xA3":"libra","\u221E":"infinito","\u2665":"amor"},"uk":{"\u0418":"Y","\u0438":"y","\u0419":"Y","\u0439":"y","\u0426":"Ts","\u0446":"ts","\u0425":"Kh","\u0445":"kh","\u0429":"Shch","\u0449":"shch","\u0413":"H","\u0433":"h"},"vi":{"\u0110":"D","\u0111":"d"},"da":{"\xD8":"OE","\xF8":"oe","\xC5":"AA","\xE5":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"st\xF8rre end"},"nb":{"&":"og","\xC5":"AA","\xC6":"AE","\xD8":"OE","\xE5":"aa","\xE6":"ae","\xF8":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","\xC5":"AA","\xC4":"AE","\xD6":"OE","\xE5":"aa","\xE4":"ae","\xF6":"oe"}}');function o(u,l){if(typeof u!="string")throw new Error("slugify: string argument expected");l=typeof l=="string"?{replacement:l}:l||{};var p=i[l.locale]||{},h=l.replacement===void 0?"-":l.replacement,n=l.trim===void 0?!0:l.trim,a=u.normalize().split("").reduce(function(s,c){var f=p[c];return f===void 0&&(f=r[c]),f===void 0&&(f=c),f===h&&(f=" "),s+f.replace(l.remove||/[^\w\s$*_+~.()'"!\-:@]+/g,"")},"");return l.strict&&(a=a.replace(/[^A-Za-z0-9\s]/g,"")),n&&(a=a.trim()),a=a.replace(/\s+/g,h),l.lower&&(a=a.toLowerCase()),a}return o.extend=function(u){Object.assign(r,u)},o})})(he);const ge=e=>e.split(/[\s-]/g).map(W).join(" ");function ye(e,t){const{navigation:r}=R().content,i=u=>({...we(["title",...r.fields])(u),...ve(u==null?void 0:u.navigation)?u.navigation:{}}),o=e.sort((u,l)=>u._path.localeCompare(l._path)).reduce((u,l)=>{const p=l._path.substring(1).split("/"),h=l._id.split(":").slice(1),n=!!h[h.length-1].match(/([1-9][0-9]*\.)?index.md/g),a=f=>({title:f.title,_path:f._path,_file:f._file,children:[],...i(f),...f._draft?{_draft:!0}:{}}),s=a(l);if(n){const f=t[s._path];if(typeof(f==null?void 0:f.navigation)<"u"&&!(f!=null&&f.navigation))return u;if(l._path!=="/"){const m=a(l);s.children.push(m)}Object.assign(s,i(f))}return p.length===1?(u.push(s),u):(p.slice(0,-1).reduce((f,m,d)=>{const v="/"+p.slice(0,d+1).join("/"),w=t[v];if(typeof(w==null?void 0:w.navigation)<"u"&&!w.navigation)return[];let I=f.find(O=>O._path===v);return I||(I={title:ge(m),_path:v,_file:l._file,children:[],...i(w)},f.push(I)),I.children},u).push(s),u)},[]);return Y(o)}const de=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"});function Y(e){const t=e.sort((r,i)=>de.compare(r._file,i._file));for(const r of t)r.children.length?Y(r.children):delete r.children,delete r._file;return e}function we(e){return t=>(t=t||{},e&&e.length?e.filter(r=>typeof t[r]<"u").reduce((r,i)=>Object.assign(r,{[i]:t[i]}),{}):t)}function ve(e){return Object.prototype.toString.call(e)==="[object Object]"}const Ie=e=>q(e,"/api/"+R().public.content.base),Ae=oe(le({driver:Z()}),"@content"),L=()=>b("previewToken").value;function Ee(e){async function t(){const r=new Set(await e.getKeys("cache:")),i=L();if(i){(await e.getItem(`${i}$`).then(h=>h||{})).ignoreBuiltContents&&r.clear();const l=await e.getKeys(`${i}:`),p=await Promise.all(l.map(h=>e.getItem(h)));for(const h of p)r.delete(`cache:${h._id}`),h.__deleted||r.add(`${i}:${h._id}`)}return await Promise.all(Array.from(r).map(u=>e.getItem(u)))}return{storage:e,fetch:M(t),query:r=>F(M(t),r)}}let N,_;async function Oe(){return _?await _:N||(_=$e(),N=await _),N}async function $e(){const e=H(),{clientDB:t}=R().public.content,r=Ee(Ae),i=await r.storage.getItem("integrity");if(t.integrity!==+i){const{contents:o,navigation:u}=await $fetch(Ie("cache.json"));await Promise.all(o.map(l=>r.storage.setItem(`cache:${l._id}`,l))),await r.storage.setItem("navigation",u),await r.storage.setItem("integrity",t.integrity)}return await e.callHook("content:storage",r.storage),r}async function Se(e){const t=await Oe();if(!L()&&Object.keys(e||{}).length===0)return t.storage.getItem("navigation");const r=await t.query(e).where({_partial:!1,navigation:{$ne:!1}}).find(),o=(await t.query().where({_path:/\/_dir$/i,_partial:!0}).find()).reduce((u,l)=>{l.title.toLowerCase()==="dir"&&(l.title=void 0);const p=l._path.split("/").slice(0,-1).join("/")||"/";return u[p]={...l,...l.body},u},{});return ye(r,o)}export{Ae as contentStorage,Ee as createDB,Se as generateNavigation,L as getPreview,Oe as useContentDatabase};
