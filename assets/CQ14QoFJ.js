import{d as g,r as n,c as f,e as p,f as y,I as e,i as b,w as x,H as v,h,T as k,k as w}from"./UlC4rCNR.js";import{r as d}from"./BafX-UFh.js";import{u as _,o as C,f as N,s as S,a as $}from"./DBULJ73T.js";import{o as B}from"./CkfwhBII.js";import"./2ETV-d1z.js";const R=["tabindex"],T=g({__name:"Popover",props:{tabbable:{type:Boolean,default:!1},maxWidth:{type:String,default:"240px"},offset:{type:Number,default:4},delay:{type:Number,default:200},strategy:{type:String,default:"absolute"},placement:{type:String,default:"bottom"}},setup(a){const o=a,t=n(!1),r=n(null),s=n(null),{x:u,y:m,strategy:c,placement:V}=_(r,s,{strategy:o.strategy,middleware:[C(o.offset),N(),S({padding:4})],placement:o.placement,whileElementsMounted:$});return B(s,()=>setTimeout(()=>t.value=!1,0)),(l,i)=>(f(),p("div",null,[y("span",{tabindex:a.tabbable?0:-1,ref_key:"triggerRef",ref:r,class:"trigger",onClick:i[0]||(i[0]=W=>t.value=!e(t))},[d(l.$slots,"default",{unwrap:"p"},void 0,!0)],8,R),b(k,{name:"popover"},{default:x(()=>[e(t)?(f(),p("span",{key:0,ref_key:"floatingRef",ref:s,class:"popover-content",style:v({position:e(c),top:`${e(m)??0}px`,left:`${e(u)??0}px`,width:"max-content",maxWidth:a.maxWidth}),tabindex:"0"},[d(l.$slots,"content",{unwrap:"p"},void 0,!0)],4)):h("",!0)]),_:3})]))}}),H=w(T,[["__scopeId","data-v-c01adbbb"]]);export{H as default};