import{d as t,o as r,f as s,m as o,r as n,v as m}from"./entry-28712a30.mjs";const l={class:"grow bg-gray-200 dark:bg-gray-900"},c=t({__name:"BasePageContent",props:{gridSize:{type:Number,default:()=>3},gapSize:{type:Number,default:()=>6}},setup(e){return(a,i)=>(r(),s("div",l,[o("div",{class:"mx-auto max-w-screen-xl px-4",style:m({"grid-template-columns":`repeat(${e.gridSize}, minmax(0, 1fr))`,gap:`${e.gapSize*.25}rem`})},[n(a.$slots,"default")],4)]))}});export{c as _};