import{a as d,o as a,f as r,r as u,q as t,I as o,J as m,G as s,t as l,S as g}from"./entry.5836f581.js";const x={class:"mx-4 p-4 pt-12 pb-40","data-aos":"fade-in","data-aos-duration":"1500"},f={class:"flex flex-col items-center lg:flex-row"},p=["innerHTML"],_={class:"top-0 flex h-16 w-32 items-center pl-2 text-center text-xl font-medium text-gray-300 lg:absolute lg:-ml-6 lg:mt-20 lg:justify-center lg:pl-0"},b={class:"top-6 w-32 text-center font-medium text-gray-300 lg:absolute lg:-ml-6 lg:mt-28"},v=d({__name:"BaseStepper",props:{steps:{type:Object,required:!0}},setup(n){return(i,y)=>(a(),r("div",x,[u(i.$slots,"header"),t("div",f,[(a(!0),r(o,null,m(n.steps,(e,c)=>(a(),r(o,{key:c},[t("div",{class:s(["relative flex items-center",[{"text-gray-500":e.status==="incomplete"},{"text-orange-600":e.status==="partial"},{"text-white":e.status==="complete"}]])},[t("div",{class:s(["flex h-20 w-20 items-center justify-center rounded-full border-4",[{"border-gray-300":e.status==="incomplete"},{"border-gray-900":e.status==="complete"},{"border-orange-600":e.status==="partial"},{"bg-orange-600":e.status==="complete"}]]),innerHTML:e.icon},null,10,p),t("div",_,l(e.title),1),t("div",b,l(e.subtitle),1)],2),e.nextStatus?(a(),r("div",{key:0,class:s(["flex-auto border-t-4",[{"border-gray-300":e.nextStatus==="incomplete"},{"border-orange-600":e.nextStatus==="complete"}]])},null,2)):g("",!0)],64))),128))])]))}});export{v as _};