import{_ as a,d as s,o as n,m as o,s as _,r as p,A as c}from"./entry-f7c86cd5.mjs";const i=s({__name:"BasePageContent",props:{gridSize:{type:Number,default:()=>3},gapSize:{type:Number,default:()=>6}},setup(t,{expose:r}){r();const e={};return Object.defineProperty(e,"__isScriptSetup",{enumerable:!1,value:!0}),e}}),l={class:"flex-grow"};function m(t,r,e,d,u,f){return n(),o("div",l,[_("div",{class:"mx-auto max-w-screen-xl px-4",style:c({"grid-template-columns":`repeat(${e.gridSize}, minmax(0, 1fr))`,gap:`${e.gapSize*.25}rem`})},[p(t.$slots,"default")],4)])}var g=a(i,[["render",m]]);export{g as _};