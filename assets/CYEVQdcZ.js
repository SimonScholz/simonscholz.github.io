import{d as w,Q as t,r as N,V as x,c as i,e as S,f as a,B as D,G as c,h as I,i as z,H as E,I as P,n as W,D as G,k as H}from"./DQk9bIKt.js";import{r as p}from"./BdSPz4Di.js";import"./2ETV-d1z.js";const O=["aria-expanded"],Q={class:"summary-content"},R={class:"chevron-wrapper"},Y={class:"content"},j=w({__name:"Disclosure",props:{open:{type:Boolean,default:!1},type:{type:String,default:"primary",validator(s){return["info","success","warning","danger","neutral","primary","secondary"].includes(s)}},icon:{type:[String,Boolean],default:!1}},emits:["update:open"],setup(s,{emit:d}){const u=t(()=>((e=o)=>`{elements.state.${e.type}.borderColor.primary}`)()),m=t(()=>((e=o)=>`{elements.state.${e.type}.backgroundColor.primary}`)()),_=t(()=>((e=o)=>`{elements.state.${e.type}.color.primary}`)()),y=t(()=>((e=o)=>`{elements.state.${e.type}.color.tertiary}`)()),f=t(()=>((e=o)=>`{elements.state.${e.type}.backgroundColor.tertiary}`)()),C=t(()=>((e=o)=>`{elements.state.${e.type}.backgroundColor.secondary}`)()),b=t(()=>((e=o)=>`{elements.state.${e.type}.backgroundColor.secondary}`)()),g=t(()=>((e=o)=>`{elements.state.${e.type}.borderColor.primary}`)()),k=t(()=>((e=o)=>`{elements.state.${e.type}.backgroundColor.primary}`)()),$=t(()=>((e=o)=>`{elements.state.${e.type}.color.tertiary}`)()),r=s,v=d,n=N(r.open),h=()=>{n.value=!n.value,v("update:open",n.value)},V=t(()=>r.icon===!1?"":r.icon===!0?`type:${r.type}`:r.icon),o=r,{$pinceau:B}=x(o,void 0,{_yV0_borderColor:u,_m5N_backgroundColor:m,_Y56_color:_,_Nt6_color:y,_ViE_backgroundColor:f,_6mW_backgroundColor:C,_x5W_backgroundColor:b,_SyV_borderColor:g,_B7z_backgroundColor:k,_sVV_color:$});return(e,q)=>{const l=G;return i(),S("div",{class:W(["disclosure",[s.type,c(B)]])},[a("button",{"aria-expanded":c(n),type:"button",class:"summary",onClick:h},[s.icon?(i(),D(l,{key:0,name:c(V),class:"disclosure-icon"},null,8,["name"])):I("",!0),a("span",Q,[p(e.$slots,"summary",{unwrap:"p"},void 0,!0)]),a("span",R,[z(l,{name:"tabler:chevron-down"})])],8,O),E(a("div",Y,[p(e.$slots,"content",{},void 0,!0)],512),[[P,c(n)]])],2)}}}),K=H(j,[["__scopeId","data-v-08af3513"]]);export{K as default};
