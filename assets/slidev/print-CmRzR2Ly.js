import{d as p,$ as u,z as h,b as s,e as t,x as a,B as c,F as v,_ as f,o as n,a0 as g,l as x,g as b}from"../modules/vue-C0bilhvh.js";import{e as N,h as y,c as m,b as k}from"../index-DrzGfO3q.js";import{N as w}from"./NoteDisplay-SIOgbWyP.js";import"../modules/shiki-Dpjb3WyS.js";const B={id:"page-root"},L={class:"m-4"},T={class:"mb-10"},V={class:"text-4xl font-bold mt-2"},D={class:"opacity-50"},H={class:"text-lg"},S={class:"font-bold flex gap-2"},z={class:"opacity-50"},C=t("div",{class:"flex-auto"},null,-1),F={key:0,class:"border-main mb-8"},M=p({__name:"print",setup($){const{slides:d,total:_}=N();u(`
@page {
  size: A4;
  margin-top: 1.5cm;
  margin-bottom: 1cm;
}
* {
  -webkit-print-color-adjust: exact;
}
html,
html body,
html #app,
html #page-root {
  height: auto;
  overflow: auto !important;
}
`),y({title:`Notes - ${m.title}`});const r=h(()=>d.value.map(o=>{var l;return(l=o.meta)==null?void 0:l.slide}).filter(o=>o!==void 0&&o.noteHTML!==""));return(o,l)=>(n(),s("div",B,[t("div",L,[t("div",T,[t("h1",V,a(c(m).title),1),t("div",D,a(new Date().toLocaleString()),1)]),(n(!0),s(v,null,f(r.value,(e,i)=>(n(),s("div",{key:i,class:"flex flex-col gap-4 break-inside-avoid-page"},[t("div",null,[t("h2",H,[t("div",S,[t("div",z,a(e==null?void 0:e.no)+"/"+a(c(_)),1),g(" "+a(e==null?void 0:e.title)+" ",1),C])]),x(w,{"note-html":e.noteHTML,class:"max-w-full"},null,8,["note-html"])]),i<r.value.length-1?(n(),s("hr",F)):b("v-if",!0)]))),128))])]))}}),q=k(M,[["__file","/home/runner/work/maven-to-gradle/maven-to-gradle/node_modules/@slidev/client/pages/presenter/print.vue"]]);export{q as default};
