import{_ as m,u as y,a as f,P as S,V as b,b as k,d as V}from"./VTable-DM5gnjW-.js";import{r as v,o as x,w as B,a as l,c as I,b as i,d as e,e as u,u as p,f as h,g as w,F as D,t as d,p as H,h as M}from"./index--lt5zE7q.js";const _=c=>(H("data-v-ecfa7055"),c=c(),M(),c),P={class:"settings_page"},T=_(()=>e("h2",{class:"pb-2"},"Settings",-1)),W={class:"settings_page-currency"},Y={class:"settings_page-table"},F=_(()=>e("thead",null,[e("tr",null,[e("th",{class:"text-left"},"ID"),e("th",{class:"text-left"},"Changes"),e("th",{class:"text-left"},"Time")])],-1)),j={__name:"SettingsPage",setup(c){const t=y(),s=f(),n=v("BTCUSDT");x(async()=>{Object.keys(s.bids).length===0&&(await s.fetchSnapshot(t.currency),s.setWebSocket(t.currency))});const g=o=>{const r={id:t.history.length+1,changes:t.currency+" -> "+o,timestamp:V(Date.now()).format("DD.MM.YYYY HH:mm")};t.addHistoryItem(r)};return B(n,async o=>{g(o),t.currency=o,s.closeWebSocket(),s.isFirstMessage=!0,await s.fetchSnapshot(t.currency),s.setWebSocket(t.currency)}),(o,r)=>(l(),I(S,null,{default:i(()=>[e("div",P,[T,e("div",W,[u(b,{items:p(t).currencyItems,modelValue:n.value,"onUpdate:modelValue":r[0]||(r[0]=a=>n.value=a)},null,8,["items","modelValue"])]),e("div",Y,[u(k,{theme:"dark"},{default:i(()=>[F,e("tbody",null,[(l(!0),h(D,null,w(p(t).history,a=>(l(),h("tr",{key:a.id},[e("td",null,d(a.id),1),e("td",null,d(a.changes),1),e("td",null,d(a.timestamp),1)]))),128))])]),_:1})])])]),_:1}))}},O=m(j,[["__scopeId","data-v-ecfa7055"]]);export{O as default};