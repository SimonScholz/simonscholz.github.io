import f from"./D9EPAMv5.js";import{d as x,a1 as h,r as n,o as g,c as r,e as l,B as S,I as c,h as k,k as y}from"./UlC4rCNR.js";const $={class:"sandbox"},w=["src"],B={key:2},C=x({__name:"Sandbox",props:{src:{type:String,default:""},repo:{type:String,default:""},branch:{type:String,default:""},dir:{type:String,default:""},file:{type:String,default:"app.vue"}},setup(i){const e=i,p=h(),a={CodeSandBox:()=>`https://codesandbox.io/embed/github/${e.repo}/tree/${e.branch}/${e.dir}?hidenavigation=1&theme=${p.value}`,StackBlitz:()=>`https://stackblitz.com/github/${e.repo}/tree/${e.branch}/${e.dir}?embed=1&file=${e.file}&theme=${p.value}`},u=Object.keys(a).map(t=>({label:t})),d=n(-1),b=n(),s=n(""),o=n(""),m=t=>{o.value=t,s.value=e.src||a[o.value](),localStorage.setItem("docus_sandbox",t)},_=t=>{d.value=t,m(u[t].label)};return g(()=>{o.value=window.localStorage.getItem("docus_sandbox")||"CodeSandBox",s.value=e.src||a[o.value](),d.value=Object.keys(a).indexOf(o.value)}),(t,I)=>{const v=f;return r(),l("div",$,[i.src?k("",!0):(r(),S(v,{key:0,ref_key:"tabs",ref:b,"active-tab-index":c(d),tabs:c(u),"onUpdate:activeTabIndex":_},null,8,["active-tab-index","tabs"])),c(s)?(r(),l("iframe",{key:1,src:c(s),title:"Sandbox editor",sandbox:"allow-modals allow-forms allow-popups allow-scripts allow-same-origin"},null,8,w)):(r(),l("span",B,"Loading Sandbox..."))])}}}),O=y(C,[["__scopeId","data-v-4cb79159"]]);export{O as default};