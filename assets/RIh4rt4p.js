import b from"./CiJniWy9.js";import{d as v,Y as n,k as u}from"./DQk9bIKt.js";const c=(a,d)=>a.type&&a.type.tag&&a.type.tag===d,x=v({data(){return{activeTabIndex:0,counter:0}},render(){var t,i;const a=((i=(t=this.$slots)==null?void 0:t.default)==null?void 0:i.call(t))||[],d=a.map((e,r)=>{var p,o,s;return{label:((p=e==null?void 0:e.props)==null?void 0:p.filename)||((o=e==null?void 0:e.props)==null?void 0:o.label)||`${r}`,active:((s=e==null?void 0:e.props)==null?void 0:s.active)||!1,component:e}});return n("div",{class:{"code-group":!0,"first-tab":this.activeTabIndex===0}},[n(b,{ref:"code-group-tabs",activeTabIndex:this.activeTabIndex,tabs:d,"onUpdate:activeTabIndex":e=>this.activeTabIndex=e}),n("div",{class:"code-group-content",text:this.activeTabIndex},a.map((e,r)=>n("div",{style:{display:r===this.activeTabIndex?"block":"none"},class:{"":!c(e,"code")&&!c(e,"pre")}},[c(e,"code")||c(e,"pre")?e:n(e)])))])}}),_=u(x,[["__scopeId","data-v-2424ded0"]]);export{_ as default};
