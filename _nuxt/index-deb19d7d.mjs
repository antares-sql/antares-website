import{d as c,o as r,m as i,v as e,F as o,n as s,k as n,x,G as _,I as y,y as t,J as v,s as d,_ as w,K as k}from"./entry-ca36e180.mjs";import{_ as L}from"./BasePageContent-73132fd3.mjs";const A={class:"flex flex-1 flex-col justify-center space-y-5 p-12"},P=["innerHTML"],S=["innerHTML"],M=["innerHTML"],T=["src"],Q=c({__name:"BasePageContentCard",props:{card:{type:Object,required:!0}},setup(a){return(l,u)=>(r(),i("div",{class:o(["flex",{"flex-row-reverse":a.card.imagePosition==="left"}])},[e("div",A,[e("h2",{class:"text-3xl font-bold dark:text-gray-50",innerHTML:a.card.title},null,8,P),e("div",{class:"text-xl dark:text-gray-50",innerHTML:a.card.subtitle},null,8,S),e("div",{class:"text-lg dark:text-gray-50",innerHTML:a.card.content},null,8,M)]),e("div",{class:o(["gradient-animate flex flex-1 justify-center bg-gradient-to-tl from-rose-400 via-orange-500 to-purple-500 pt-16 dark:text-gray-50",[a.card.imagePosition==="right"?"rounded-r-3xl pl-16":"rounded-l-3xl  pr-16"]])},[e("img",{src:a.card.imagePath,alt:"Context menu",class:o([a.card.imagePosition==="right"?"rounded-tl-2xl rounded-br-2xl":"rounded-tr-2xl rounded-bl-2xl"])},null,10,T)],2)],2))}}),j=t("Antares SQL - Free and Open Source Client"),C={class:"flex items-center justify-center"},B={class:"pt-20 pb-10","data-aos":"fade-in","data-aos-duration":"1500"},H={class:"gradient-animate flex justify-center rounded-3xl bg-gradient-to-tl from-rose-400 via-orange-500 to-purple-500 p-16 pr-0 dark:text-gray-50"},$={class:"flex flex-1 flex-col content-center justify-center space-y-10 py-10 text-left"},F=e("h1",{class:"text-5xl font-bold dark:text-gray-50"},[t(" Open source SQL client"),e("br"),t(" made to be simple. ")],-1),q=e("div",{class:"text-2xl dark:text-gray-50"},[t(" A modern, fast and productivity driven,"),e("br"),e("strong",{class:"font-bold"},"forever 100% free"),t(" solution with a focus in UX. ")],-1),D=t(" Download Antares "),N=e("div",{class:"relative min-h-fit flex-1 overflow-hidden"},[e("img",{src:v,alt:"Antares screenshot",class:"relative rounded-l-lg object-cover"})],-1),I=e("div",{class:"space-y-20 pb-40","data-aos":"fade-in","data-aos-duration":"1500","data-aos-delay":"500"},[e("div",{class:"space-y-5 pt-24 text-center"},[e("h2",{class:"text-5xl font-bold dark:text-gray-50"}," About Antares Project "),e("div",{class:"text-2xl dark:text-gray-50"}," A new star is born, and is growing fast. "),e("div",{class:"text-lg dark:text-gray-50"},[e("a",{class:"font-bold text-orange-500",href:"https://en.wikipedia.org/wiki/Antares",target:"_blank",rel:"nofollow"},"Antares"),t(" is an SQL client that aims to become an useful and complete tool, especially for developers."),e("br"),t(" The target is to support as many databases as possible, and all major operating systems, including the ARM versions."),e("br"),t(" At the moment this application is in development state, many features will come in future updates, and actually supports "),e("b",null,"MySQL/MariaDB"),t(", "),e("b",null,"PostgreSQL"),t(" and "),e("b",null,"SQLite"),t("."),e("br"),t(" Most of its current features are enough to have a pleasant user experience with MySQL/MariaDB, PostgreSQL and SQLite, so give it a chance and "),e("a",{class:"font-bold text-orange-500",href:"https://github.com/Fabio286/antares/discussions",target:"_blank"},"send us your feedback"),t(", we would really appreciate it. ")])])],-1),U=c({__name:"index",setup(a){const l=[{title:"Simple, but complete",subtitle:`Features in the right places,<br>
      not hundreds of tiny buttons or submenu.`,content:`
      Antares SQL development is driven by the idea to create a <b>full featured</b> tool,
      <b>fast</b> and with a <b>modern and intuitive UI</b>.<br>
      All features are accessible with a few clicks, without having to search for them in dozens of drop-down
      menus; productivity comes first.`,imagePath:"/images/screen2.png",imagePosition:"right"},{title:"Autocomplete or format your queries",subtitle:`Built-in autocomplete and database suggestions<br>
      will speed up the writing of your queries.`,content:`
      Thanks to the auto-completion functions and the suggestion of database elements write queries will be a pleasure.<br>
      With the formatter function the queries you write will be even more readable.`,imagePath:"/images/screen3.png",imagePosition:"left"},{title:"All data you need",subtitle:`Fill your test tables<br>
      with a massive number fake random data.`,content:`
      Antares SQL integrates a table filling function that allows you to <b>generate a large number of fake data</b> to be chosen from different categories, such as names, addresses, dates, texts or financial data.
      This feature will help you set up your development environment, saving you valuable time.`,imagePath:"/images/screen4.png",imagePosition:"right"}];return(u,O)=>{const f=d("Title"),m=d("Head"),g=w,p=L;return r(),i("div",null,[s(m,null,{default:n(()=>[s(f,null,{default:n(()=>[j]),_:1})]),_:1}),e("main",C,[s(p,null,{default:n(()=>[e("div",B,[e("div",H,[e("div",$,[F,q,s(g,{to:"/downloads",class:"flex w-fit items-center justify-center whitespace-nowrap rounded-2xl bg-gray-50 py-3 px-5 text-2xl font-semibold text-gray-900 hover:opacity-80 focus:ring-2 focus:ring-blue-400"},{default:n(()=>[s(x(k),{class:"mr-2"}),D]),_:1})]),N])]),I,(r(),i(_,null,y(l,(h,b)=>e("div",{key:b,class:"mb-32 max-w-none rounded-3xl bg-slate-800 dark:text-gray-50","data-aos":"fade-in","data-aos-duration":"1500","data-aos-delay":"500"},[s(Q,{card:h},null,8,["card"])])),64))]),_:1})])])}}});export{U as default};
