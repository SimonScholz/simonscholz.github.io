import{k as A,c as g,e as v,f as t,J as C,K as q,L as G,F as S,C as w,B as M,w as m,i as s,g as i,t as j,I,A as T,d as b,r as x,o as J,b as $,z as N,M as k,N as P,D as B}from"./UlC4rCNR.js";import{q as O}from"./DKuk0loI.js";import{m as D}from"./D1zBclk9.js";import"./BNcK8EAb.js";const E={},F={class:"min-w-60 flex flex-col items-center justify-center border border-gray-200 rounded-lg bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"},K={class:"mt-5 text-xl font-normal text-gray-700 dark:text-gray-400"};function R(u,n){return g(),v("div",F,[t("p",K,[C(u.$slots,"default")])])}const V=A(E,[["render",R]]),H={class:"grid grid-cols-1 md:grid-cols-3 place-content-around justify-center gap-6 align-middle"},Q={__name:"Top3Tutorials",async setup(u){let n,o;const{data:l}=([n,o]=q(()=>G("top3TutorialsQueryContent",()=>O("tutorials").only(["path","title"]).sort({updated:-1}).limit(3).find())),n=await n,o(),n);return(c,r)=>{const h=V,y=T;return g(),v("main",H,[(g(!0),v(S,null,w(I(l),({path:p,title:e})=>(g(),M(y,{to:p},{default:m(()=>[s(h,{class:"h-full"},{default:m(()=>[i(j(e),1)]),_:2},1024)]),_:2},1032,["to"]))),256))])}}},U={class:"w-40 h-40 md:w-50 md:h-50 flex flex-col items-center justify-center border border-gray-200 rounded-lg bg-white shadow dark:border-gray-700 dark:bg-gray-700"},X=["src","alt","title"],Y={class:"mt-5 text-xl font-normal text-gray-700 dark:text-gray-400"},L=b({__name:"SkillCard",props:{imgSrc:{},imgAlt:{}},setup(u){const n=u;return(o,l)=>(g(),v("div",U,[t("img",{src:n.imgSrc,alt:n.imgAlt,title:n.imgAlt,width:"24",height:"24",loading:"lazy",class:"h-16 w-16 md:h-24 md:w-24"},null,8,X),t("p",Y,[C(o.$slots,"default")])]))}}),W={class:"grid gap-4 max-[400px]:grid-cols-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6"},Z=b({__name:"Languages",setup(u){const n=[{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",name:"Kotlin"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",name:"Java"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/groovy/groovy-original.svg",name:"Groovy"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",name:"Dart"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg",name:"TypeScript"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg",name:"JavaScript"}];return(o,l)=>{const c=L;return g(),v("main",W,[(g(),v(S,null,w(n,(r,h)=>s(c,{key:h,"img-src":r.imgSrc,"img-alt":r.imgAlt||r.name},{default:m(()=>[i(j(r.name),1)]),_:2},1032,["img-src","img-alt"])),64))])}}}),ee={class:"grid gap-4 max-[400px]:grid-cols-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6"},te=b({__name:"Tools",setup(u){const n=[{imgSrc:"https://raw.githubusercontent.com/SimonScholz/simonscholz/c826feb58203a6eb3be9247f38d48d55c63a7c7e/img/quarkus.svg",name:"Quarkus"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",name:"Spring"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ktor/ktor-original.svg",name:"Ktor"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",name:"Git"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",name:"Linux"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg",name:"Ubuntu"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg",name:"IntelliJ"},{imgSrc:"https://cdn.icon-icons.com/icons2/1381/PNG/512/eclipse_94656.png",name:"Eclipse RCP"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",name:"VS Code"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",name:"GitHub"},{imgSrc:"https://gradle.com/wp-content/themes/fuel/assets/img/branding/gradle-elephant-icon-gradient.svg",name:"Gradle"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maven/maven-original.svg",name:"Maven"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gatling/gatling-original.svg",name:"Gatling"},{imgSrc:"https://api.iconify.design/material-symbols/terminal-rounded.svg",name:"Bash"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openapi/openapi-original.svg",name:"Openapi"},{imgSrc:"https://github.com/SimonScholz/simonscholz/raw/master/img/postman.svg",name:"Postman"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",name:"MongoDB"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",name:"Redis"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg",name:"Postgresql"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/liquibase/liquibase-original-wordmark.svg",name:"Liquibase"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",name:"Docker"},{imgSrc:"https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg",name:"Kubernetes"},{imgSrc:"https://www.vectorlogo.zone/logos/fluxcdio/fluxcdio-icon.svg",name:"GitOps"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",name:"Terraform"},{imgSrc:"https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg",name:"GCP"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg",name:"Cloudflare"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg",name:"Prometheus"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg",name:"Grafana"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opentelemetry/opentelemetry-original.svg",name:"Opentelemetry"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jaegertracing/jaegertracing-original.svg",name:"Jaeger"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",name:"Flutter"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",name:"VueJS"},{imgSrc:"https://nuxt.com/assets/design-kit/icon-green.svg",name:"Nuxt"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",name:"React"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",name:"GraphQl"},{imgSrc:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",name:"Tailwind CSS"}];return(o,l)=>{const c=L;return g(),v("main",ee,[(g(),v(S,null,w(n,(r,h)=>s(c,{key:h,"img-src":r.imgSrc,"img-alt":r.imgAlt||r.name},{default:m(()=>[i(j(r.name),1)]),_:2},1032,["img-src","img-alt"])),64))])}}});function ne(u){const n={root:null,threshold:.1,rootMargin:"0px 0px -50px 0px"},o=x(null);J(()=>{const l=new IntersectionObserver(c=>{c.forEach(r=>{r.isIntersecting&&(r.target.classList.add("show"),l.unobserve(r.target))})},n);o.value={disconnect:l.disconnect},u().forEach(c=>{l.observe(c)})}),$(()=>{var l;(l=o==null?void 0:o.value)==null||l.disconnect()})}const se={class:"flex flex-col snap-y snap-mandatory"},oe={class:"snap-center snap-always"},ie={class:"mt-24 flex flex-col select-none justify-center md:flex-row md:mt-32"},re={class:"text-2xl m-3 md:w-1/3 md:mt-10 md:text-left fadeSection"},ae={class:"m-auto"},le={class:"flex p-4 justify-end mt-16 md:hidden"},ce={class:"flex flex-col items-center mt-32 md:ml-20 md:mt-0"},de=["src"],me={class:"mt-10 flex flex-col items-center justify-center text-3xl md:mt-40"},ge={class:"grow grid grid-cols-4 mt-10 gap-y-32 justify-items-center space-x-4"},ue={class:"mb-10 flex flex-row"},ve={class:"md:w-2/3"},pe={class:"mt-8"},he={class:"flex flex-row text-3xl"},fe={class:"mt-6 flex flex-col items-center justify-center text-center"},_e={class:"aboutme flex-row border-2 border-opacity-50 rounded-lg bg-opacity-50 p-2 text-xl md:w-2/3"},xe={class:"mt-20 md:mt-32 flex flex-col snap-center snap-always items-center justify-center text-3xl fadeSection md:mx-10 mb-10"},be={class:"mb-6 flex flex-row"},ye={class:"container mx-auto p-4 md:w-2/3"},Se={class:"mt-10 md:mt-16 flex flex-col snap-center snap-always items-center justify-center text-3xl fadeSection md:mx-10 mb-10"},we={class:"mb-6 flex flex-row"},je={class:"container mx-auto p-4 md:w-2/3"},ke=b({__name:"index",setup(u){N({title:null,meta:[{name:"description",content:"Profile of Simon Scholz including quotes, about me, tutorials and tech stack"},{name:"google-site-verification",content:"5yp0dYpg1Ju9MGSKzgARXou20J1q0iKY1dapJyR8daI"}]});const n=x(null),o=x(null),l=x(null),c=x(null);function r(p){var e;return p.preventDefault(),(e=c==null?void 0:c.value)==null||e.scrollIntoView({behavior:"smooth",block:"center",inline:"nearest"}),!1}const h=k(n,p=>{var e,d,a,f;p.some(_=>_.isIntersecting)?(d=(e=n==null?void 0:n.value)==null?void 0:e.classList)==null||d.add("show"):(f=(a=n==null?void 0:n.value)==null?void 0:a.classList)==null||f.remove("show")}),y=k(o,p=>{var e,d,a,f;p.some(_=>_.isIntersecting)?(d=(e=o==null?void 0:o.value)==null?void 0:e.classList)==null||d.add("show"):(f=(a=o==null?void 0:o.value)==null?void 0:a.classList)==null||f.remove("show")});return $(()=>{h.stop(),y.stop()}),ne(()=>Array.from(document.getElementsByClassName("fadeSection"))),(p,e)=>{const d=T,a=B,f=Q,_=Z,z=te;return g(),v("div",se,[t("section",oe,[t("section",ie,[t("span",re,[t("div",ae,[e[1]||(e[1]=t("p",null,[i(" If you're "),t("b",null,"passionate"),i(" about something you're usually also good at doing it. ")],-1)),e[2]||(e[2]=t("br",null,null,-1)),e[3]||(e[3]=t("p",null,[i(" And one of the best things of being a developer is that you can craft code to automate things you're "),t("b",null,"not passionate"),i(" about. ")],-1)),e[4]||(e[4]=t("br",null,null,-1)),e[5]||(e[5]=t("p",null,[i(" Automatization over manual work is kind of my credo "),t("span",{class:"align-middle font-mono italic text-fuchsia-700 mx-2"},"&&"),i(" I've already pushed a lot of customers in that direction for the better. ")],-1)),t("div",le,[s(d,{to:"/contact",class:"border-0 p-2 rounded-md bg-cyan-600 transition duration-500 hover:duration-500 hover:bg-cyan-700"},{default:m(()=>e[0]||(e[0]=[i(" Contact me 👋 ")])),_:1})])])]),t("div",ce,[t("img",{class:"h-80 w-80 self-center border-4 border-black dark:border-white rounded-full",src:I(D),alt:"me",title:"me",height:"80",width:"80"},null,8,de),e[6]||(e[6]=t("span",{class:"mt-2 text-lg"}," Principal Software Engineer ",-1)),e[7]||(e[7]=t("span",null," 14+ years of experience ",-1))])]),t("div",me,[t("h1",{ref_key:"findMe",ref:n,class:"flex flex-row select-none text-3xl findMeHidden"},[e[8]||(e[8]=i(" Find me here ")),s(a,{name:"carbon:location-heart",class:"ml-2"})],512),t("div",{ref_key:"findMeContent",ref:o,class:"flex flex-row findMeContentsHidden"},[t("div",ge,[s(d,{class:"icon-btn px-10",rel:"noreferrer",href:"https://github.com/simonscholz",target:"_blank",title:"GitHub"},{default:m(()=>[s(a,{name:"uil:github-alt"})]),_:1}),s(d,{class:"icon-btn",rel:"noreferrer",href:"https://www.linkedin.com/in/opensource-simon",target:"_blank",title:"LinkedIn"},{default:m(()=>[s(a,{name:"uil:linkedin-alt"})]),_:1}),s(d,{class:"icon-btn",rel:"noreferrer",href:"https://x.com/simonscholz",target:"_blank",title:"X"},{default:m(()=>[s(a,{name:"hugeicons:new-twitter"})]),_:1}),s(d,{class:"icon-btn hover:hand",title:"About Me",onClick:P(r,["prevent"])},{default:m(()=>[s(a,{name:"carbon:id-management"})]),_:1})])],512)])]),t("section",{id:"tutorials",ref_key:"tutorialsSection",ref:l,class:"mt-32 md:mt-40 flex flex-col snap-center snap-always items-center justify-center text-3xl fadeSection md:mx-10"},[t("h1",ue,[e[9]||(e[9]=i(" Latest Tutorials ")),s(a,{name:"carbon:education",class:"ml-2"})]),t("div",ve,[s(f)]),t("div",pe,[s(d,{to:"/tutorials",title:"All Tutorials",class:"text-xl border-0 p-2 px-4 transition duration-500 hover:duration-500 bg-cyan-600 hover:bg-cyan-700 rounded-md"},{default:m(()=>e[10]||(e[10]=[i(" Show all tutorials")])),_:1})])],512),t("section",{id:"about",ref_key:"aboutMeSection",ref:c,class:"fadeSection mt-20 md:mt-32 flex flex-col snap-center snap-always items-center justify-center"},[t("h1",he,[e[11]||(e[11]=i(" About Me ")),s(a,{name:"carbon:id-management",class:"ml-2"})]),t("div",fe,[t("div",_e,[e[13]||(e[13]=t("p",null,[i(" I am a passionate advocate for "),t("b",null,"open source"),i(" and sharing knowledge. With a deep-rooted love for computers and technology from an early age, I embarked on my coding journey, developing my first website at the age of twelve. Since then, my fascination with the endless possibilities of technology has only grown stronger. ")],-1)),e[14]||(e[14]=t("p",null," Currently serving as the Principal Engineer for the Apps & Store Touchpoints domain of MediamarktSaturn Technology... ",-1)),s(d,{to:"/about",title:"About Me",class:"mr-2 mt-4 flex flex-row justify-end text-2xl icon-btn"},{default:m(()=>[e[12]||(e[12]=i(" ... Read more ")),s(a,{name:"uil:book-reader",class:"ml-2"})]),_:1})])])],512),t("section",xe,[t("h1",be,[e[15]||(e[15]=i(" Languages ")),s(a,{name:"carbon:language",class:"ml-2"})]),t("div",ye,[s(_)])]),t("section",Se,[t("h1",we,[e[16]||(e[16]=i(" Frameworks & Tools ")),s(a,{name:"carbon:tool-kit",class:"ml-2"})]),t("div",je,[s(z)])])])}}}),$e=A(ke,[["__scopeId","data-v-688d541a"]]);export{$e as default};