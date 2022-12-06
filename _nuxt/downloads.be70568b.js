import{z as $,u as k,l as A,A as L,B as R,a as E,C as P,D as B,o as f,f as _,m as c,w as m,q as t,H as W,E as S,x as g,F as D,G as C,I,T,b as H,t as y}from"./entry.ae9db748.js";import{_ as N}from"./BasePageContent.vue_vue_type_script_setup_true_lang.a5d5eeb1.js";function q(u,n,w){const[s={},d]=typeof n=="string"?[{},n]:[n,w],a=s.key||$([d,k(s.baseURL),typeof u=="string"?u:"",k(s.params)]);if(!a||typeof a!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+a);if(!u)throw new Error("[nuxt] [useFetch] request is missing.");const b=a===d?"$f"+a:a,F=A(()=>{let h=u;return typeof h=="function"&&(h=h()),k(h)}),{server:l,lazy:r,default:o,transform:i,pick:v,watch:x,immediate:M,...j}=s,e=L({...j,cache:typeof s.cache=="boolean"?void 0:s.cache}),O={server:l,lazy:r,default:o,transform:i,pick:v,immediate:M,watch:[e,F,...x||[]]};let p;return R(b,()=>{var h;return(h=p==null?void 0:p.abort)==null||h.call(p),p=typeof AbortController<"u"?new AbortController:{},$fetch(F.value,{signal:p.signal,...e})},O)}function z(){var b;const u=navigator.userAgent,n=((b=navigator==null?void 0:navigator.userAgentData)==null?void 0:b.platform)||(navigator==null?void 0:navigator.platform)||"unknown",w=["Macintosh","MacIntel","MacPPC","Mac68K"],s=["Win32","Win64","Windows","WinCE"],d=["iPhone","iPad","iPod"];let a=null;return w.includes(n)?a="MacOS":d.includes(n)?a="iOS":s.includes(n)?a="Windows":/Android/.test(u)?a="Android":!a&&/Linux/.test(n)&&(a="Linux"),a}const G={class:"flex items-center justify-center"},V=t("div",{class:"pb-5 dark:text-slate-50"},[t("div",{class:"space-y-10 py-16 px-5"},[t("h1",{class:"text-5xl font-bold leading-relaxed"},[g(" One application,"),t("br"),g(" different platforms. ")]),t("div",{class:"text-2xl dark:text-gray-50"}," Download Antares SQL for your favorite OS and in the distribution that fits your needs. ")])],-1),K={class:"mb-16 grid gap-6 lg:grid-cols-3"},U=t("svg",{class:"m-auto",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",height:"64",width:"64"},[t("rect",{width:"256",height:"256",fill:"none"}),t("polygon",{points:"216 216 136 201.5 136 201.5 136 144 216 144 216 216",fill:"none",stroke:"#FFF","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"12"}),t("polygon",{points:"104 195.6 40 184 40 144 104 144 104 195.6",fill:"none",stroke:"#FFF","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"12"}),t("polygon",{points:"216 40 136 54.5 136 54.5 136 112 216 112 216 40",fill:"none",stroke:"#FFF","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"12"}),t("polygon",{points:"104 60.4 40 72 40 112 104 112 104 60.4",fill:"none",stroke:"#FFF","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"12"})],-1),J=t("h4",{class:"text-4xl font-bold"}," Windows ",-1),Q={class:"w-full table-auto text-left"},X=t("thead",null,[t("tr",{class:"uppercase"},[t("th",null," Arch "),t("th",null," Format "),t("th")])],-1),Z={class:"py-2"},Y={class:"py-2"},tt={class:"py-2"},et=t("a",{class:"m-auto block",href:"//www.microsoft.com/store/apps/9nhtb9sq51r1?cid=storebadge&ocid=badge",target:"_blank"},[t("img",{class:"m-auto block",src:"https://developer.microsoft.com/store/badges/images/English_get-it-from-MS.png",alt:"English badge",style:{height:"56px"}})],-1),ot=t("svg",{class:"m-auto",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",height:"64",width:"64"},[t("rect",{width:"256",height:"256",fill:"none"}),t("path",{d:"M32,216S64,160,64,96a64,64,0,0,1,128,0c0,64,32,120,32,120",fill:"none",stroke:"#FFF","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"12"}),t("circle",{cx:"100",cy:"108",r:"8",fill:"#FFF"}),t("circle",{cx:"156",cy:"108",r:"8",fill:"#FFF"}),t("polyline",{points:"160 144 128 160 96 144",fill:"none",stroke:"#FFF","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"12"}),t("path",{d:"M86.4,216a48.1,48.1,0,0,1,83.2,0",fill:"none",stroke:"#FFF","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"12"})],-1),st=t("h4",{class:"text-4xl font-bold"}," Linux ",-1),at={class:"w-full table-auto text-left"},nt=t("thead",null,[t("tr",{class:"uppercase"},[t("th",null," Arch "),t("th",null," Format "),t("th")])],-1),lt=t("td",{class:"py-2"}," 64-bit, ARMv8, ARMv7 ",-1),rt=t("td",{class:"py-2"}," deb ",-1),it={class:"py-2"},ct={class:"py-2"},dt={class:"py-2"},ut={class:"py-2"},pt=t("div",{class:"flex space-x-3"},[t("a",{href:"https://snapcraft.io/antares",target:"_blank"},[t("img",{alt:"Get it from the Snap Store",src:"https://snapcraft.io/static/images/badges/en/snap-store-black.svg"})]),t("a",{href:"https://aur.archlinux.org/packages/antares-sql/",target:"_blank"},[t("img",{alt:"Get it from AUR",src:"https://raw.githubusercontent.com/Fabio286/antares/3e00c4bae6e036300c752c1a40c5a038fea9c169/docs/aur-badge.svg"})])],-1),ht=t("svg",{class:"m-auto",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",height:"64",width:"64"},[t("rect",{width:"256",height:"256",fill:"none"}),t("path",{d:"M138.1,32.5A32,32,0,0,1,168,12",fill:"none",stroke:"#FFF","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"12"}),t("path",{d:"M218.5,162.9C205.9,193.7,183.1,216,164,216H92c-28,0-64-48-64-100A60,60,0,0,1,128,71.3h0a60,60,0,0,1,87.2,7.6h0a48,48,0,0,0,3.3,84Z",fill:"none",stroke:"#FFF","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"12"})],-1),ft=t("h4",{class:"text-4xl font-bold"}," MacOS ",-1),_t={class:"w-full table-auto text-left"},mt=t("thead",null,[t("tr",{class:"uppercase"},[t("th",null," Arch "),t("th",null," Format "),t("th")])],-1),gt={class:"py-2"},wt={class:"py-2"},bt={class:"py-2"},vt=E({__name:"downloads",async setup(u){let n,w;const{data:s}=([n,w]=P(()=>q("https://api.github.com/repos/fabio286/antares/releases/latest","$JihkriXfsj")),n=await n,w(),n),d=B(z()),a=A(()=>{var l,r,o;return[{code:"amd64",data:(l=s.value)==null?void 0:l.assets.find(i=>/^(.*)x86_64.AppImage$/.test(i.browser_download_url)),arch:"64-bit",format:"AppImage"},{code:"arm64",data:(r=s.value)==null?void 0:r.assets.find(i=>/^(.*)arm64.AppImage$/.test(i.browser_download_url)),arch:"ARMv8",format:"AppImage"},{code:"arm32",data:(o=s.value)==null?void 0:o.assets.find(i=>/^(.*)armv7l.AppImage$/.test(i.browser_download_url)),arch:"ARMv7",format:"AppImage"}].filter(i=>i.data)}),b=A(()=>{var l,r;return[{code:"amd64",data:(l=s.value)==null?void 0:l.assets.find(o=>/^(.*)win_x64.exe$/.test(o.browser_download_url)),arch:"64-bit",format:"exe"},{code:"portable",data:(r=s.value)==null?void 0:r.assets.find(o=>/^(.*)portable.exe$/.test(o.browser_download_url)),arch:"64-bit",format:"portable, exe"}].filter(o=>o.data)}),F=A(()=>{var l,r;return[{code:"amd64",data:(l=s.value)==null?void 0:l.assets.find(o=>/^(.*)mac_x64.dmg$/.test(o.browser_download_url)),arch:"64-bit",format:"dmg"},{code:"arm64",data:(r=s.value)==null?void 0:r.assets.find(o=>/^(.*)arm64.dmg$/.test(o.browser_download_url)),arch:"ARMv8",format:"dmg"}].filter(o=>o.data)});return(l,r)=>{const o=T,i=W,v=S("DownloadIcon"),x=H,M=S("ExternalLinkIcon"),j=N;return f(),_("div",null,[c(i,null,{default:m(()=>[c(o,null,{default:m(()=>[g("Downloads | Free and Open Source Client")]),_:1})]),_:1}),t("main",G,[c(j,null,{default:m(()=>[V,t("div",K,[t("div",{class:D(["space-y-6 rounded-3xl p-6 text-center dark:text-gray-50 lg:col-span-1",[d.value==="Windows"?"bg-slate-600 -m-4":"bg-slate-800"]])},[U,J,t("table",Q,[X,t("tbody",null,[(f(!0),_(C,null,I(k(b),e=>(f(),_("tr",{key:e.code},[t("td",Z,y(e.arch),1),t("td",Y,y(e.format),1),t("td",tt,[c(x,{to:e.data.browser_download_url,title:e.data.name,class:"ml-auto flex w-fit items-center justify-center whitespace-nowrap rounded-2xl bg-orange-600 py-1 px-2 text-sm font-semibold hover:opacity-80 focus:ring-2 focus:ring-blue-400"},{default:m(()=>[g(" Download "),c(v,{class:"ml-1"})]),_:2},1032,["to","title"])])]))),128))])]),et],2),t("div",{class:D(["space-y-6 rounded-3xl p-6 text-center dark:text-gray-50 lg:col-span-1",[d.value==="Linux"?"bg-slate-600 -m-4":"bg-slate-800"]])},[ot,st,t("table",at,[nt,t("tbody",null,[t("tr",null,[lt,rt,t("td",it,[c(x,{to:"https://github.com/antares-sql/antares-ppa",target:"_blank",class:"ml-auto flex w-fit items-center justify-center whitespace-nowrap rounded-2xl bg-orange-600 py-1 px-2 text-sm font-semibold hover:opacity-80 focus:ring-2 focus:ring-blue-400"},{default:m(()=>[g(" Instructions "),c(M,{class:"ml-1"})]),_:1})])]),(f(!0),_(C,null,I(k(a),e=>(f(),_("tr",{key:e.code},[t("td",ct,y(e.arch),1),t("td",dt,y(e.format),1),t("td",ut,[c(x,{to:e.data.browser_download_url,title:e.data.name,class:"ml-auto flex w-fit items-center justify-center whitespace-nowrap rounded-2xl bg-orange-600 py-1 px-2 text-sm font-semibold hover:opacity-80 focus:ring-2 focus:ring-blue-400"},{default:m(()=>[g(" Download "),c(v,{class:"ml-1"})]),_:2},1032,["to","title"])])]))),128))])]),pt],2),t("div",{class:D(["space-y-6 rounded-3xl p-6 text-center dark:text-gray-50 lg:col-span-1",[d.value==="MacOS"?"bg-slate-600 -m-4":"bg-slate-800"]])},[ht,ft,t("table",_t,[mt,t("tbody",null,[(f(!0),_(C,null,I(k(F),e=>(f(),_("tr",{key:e.code},[t("td",gt,y(e.arch),1),t("td",wt,y(e.format),1),t("td",bt,[c(x,{to:e.data.browser_download_url,title:e.data.name,class:"ml-auto flex w-fit items-center justify-center whitespace-nowrap rounded-2xl bg-orange-600 py-1 px-2 text-sm font-semibold hover:opacity-80 focus:ring-2 focus:ring-blue-400"},{default:m(()=>[g(" Download "),c(v,{class:"ml-1"})]),_:2},1032,["to","title"])])]))),128))])])],2)])]),_:1})])])}}});export{vt as default};
