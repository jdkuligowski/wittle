"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[717,667],{61505:function(e,s,i){var l=i(29343);s.Z=e=>{let{textColour:s,pageType:i}=e;return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("section",{className:"website-footer no-print",id:i,children:[(0,l.jsx)("p",{style:{color:s},children:"Wittle Technology Limited is a registered company in England and Wales with corporation number 14326945."}),(0,l.jsx)("p",{style:{color:s},children:"Copyright \xa9 Wittle Technology Limited. All rights reserved."})]})})}},37336:function(e,s,i){i.d(s,{Z:function(){return t}});var l=i(42524),n=i(28381);i(65293);i(63762),i(11535),i(31824);var r=i(29343);var t=e=>{let{setProfileContent:s,profileContent:i,profileDetail:t,setProfileDetail:a}=e;const o=(0,l.s0)(),[c,d]=((0,n.useRef)(null),(0,n.useState)(!1)),[h,m]=(0,n.useState)({email:"",password:"",passwordConfirmation:""}),[x,u]=(0,n.useState)("password"),[j,p]=(0,n.useState)("password"),[g,f]=(0,n.useState)(!1),[v,N]=(0,n.useState)(!1),[b,C]=(0,n.useState)({email:"",username:"",password:"",password_confirmation:"",first_name:"",last_name:""}),[y,S]=(0,n.useState)({email:"",username:"",password:"",password_confirmation:"",first_name:"",last_name:"",post:""}),[k,w]=(0,n.useState)("#051885"),[_,M]=(0,n.useState)("#FFA7E5"),[P,F]=(0,n.useState)("#FFA7E5");return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("section",{className:"centered-nav-bar",style:{backgroundColor:k},children:[(0,r.jsx)("section",{className:"top-section",children:(0,r.jsx)("div",{className:"logo",children:(0,r.jsx)("h2",{style:{color:_},onClick:()=>o("/"),children:"Wittle"})})}),(0,r.jsxs)("section",{className:"nav-slider",children:[(0,r.jsx)("h4",{style:{color:P,textDecoration:"My properties"===i?`underline 3px ${P}`:"",textUnderlineOffset:"My properties"===i?"5px":""},onClick:()=>{s("My properties"),a("My properties"),o("/agents/profile")},children:"MY PROPERTIES"}),(0,r.jsx)("h4",{style:{color:P,textDecoration:"Variables"===i?`underline 3px ${P}`:"",textUnderlineOffset:"Variables"===i?"5px":""},onClick:()=>{s("Variables"),a("Variables"),o("/agents/explore")},children:"EXPLORE"}),(0,r.jsx)("h4",{style:{color:P,textDecoration:"Comparison"===i?`underline 3px ${P}`:"",textUnderlineOffset:"Comparison"===i?"5px":""},onClick:()=>{s("Comparison"),a("Comparison"),o("/agents/compare")},children:"COMPARISON"}),(0,r.jsx)("h4",{style:{color:P,textDecoration:"Account"===i?`underline 3px ${P}`:"",textUnderlineOffset:"Account"===i?"5px":""},onClick:()=>{s("Account"),a("Account")},children:"ACCOUNT"})]})]})})}},8772:function(e,s,i){var l=i(42524),n=(i(28381),i(65293),i(15211)),r=(i(63762),i(31824),i(29343));s.Z=e=>{let{navbarColour:s}=e;const i=(0,l.s0)();return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("section",{className:"nav-section no-print",style:{backgroundColor:s},children:[(0,r.jsx)("div",{className:"left-section",children:(0,r.jsx)("div",{className:"logo",children:(0,r.jsx)("h2",{onClick:()=>i("/"),children:"Wittle"})})}),(0,n.Hb)()?(0,r.jsx)("div",{className:"menu-container",children:(0,r.jsx)("h3",{className:"cta",onClick:e=>{localStorage.removeItem("wittle-user-token"),localStorage.removeItem("wittle-username"),window.location.reload()},children:(0,r.jsx)("a",{children:"Sign out"})})}):(0,r.jsx)("div",{className:"menu-container",children:(0,r.jsx)("h3",{className:"cta",onClick:()=>i("/login"),children:(0,r.jsx)("a",{children:"Sign in"})})})]})})}},59693:function(e,s,i){var l=i(42524),n=(i(28381),i(29343));s.Z=e=>{let{setProfileDetail:s,variableSide:i,setProfileContent:r,setVariableSide:t,userData:a}=e;const o=(0,l.s0)();return(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("section",{className:"profile-sidebar-open no-print remove-margin",children:[(0,n.jsx)("div",{className:"logo",children:(0,n.jsx)("h2",{onClick:()=>o("/"),children:"Wittle"})}),(0,n.jsxs)("div",{className:"profile-buttons",children:[(0,n.jsx)("div",{className:"profile-button-title",children:(0,n.jsx)("h2",{onClick:()=>{s("Home"),r("Home"),o("/agents/profile")},children:"\ud83e\uddd8\u200d\u2642\ufe0f Wittle home"})}),(0,n.jsx)("div",{className:"profile-button-title",id:"second-title",children:(0,n.jsx)("h2",{onClick:()=>{s("My properties"),r("My properties"),o("/agents/properties")},children:"\ud83c\udfe1 My property list"})}),(0,n.jsx)("div",{className:"profile-button-title",id:"second-title",children:(0,n.jsx)("h2",{onClick:()=>{s("Listing generator"),r("Listing generator"),o("/agents/listing-generator")},children:"\ud83e\udde0 Listing generator"})}),(0,n.jsx)("div",{className:"profile-button-title",id:"second-title",children:(0,n.jsx)("h2",{onClick:()=>{r("Property finder"),s("Property finder"),o("/agents/finder")},children:"\ud83d\udd0e Property finder"})})]})]})})}},18717:function(e,s,i){i.r(s);var l=i(28381),n=i(65293),r=i(42524),t=(i(95325),i(47142),i(61505),i(59693)),a=i(8772),o=i(37336),c=i(29343);s.default=()=>{const[e,s]=(0,l.useState)(),i=(0,r.s0)(),[d,h]=(0,l.useState)(),{id:m}=(0,r.UO)(),[x,u]=(0,l.useState)("My properties"),[j,p]=(0,l.useState)("My properties"),[g,f]=(0,l.useState)(!1);return(0,l.useEffect)((()=>{(async()=>{try{const{data:e}=await n.ZP.get(`/api/secondaries/${m}`);console.log("secondaries data ->",e),h(e)}catch(e){s(!0),console.log(e)}})()}),[]),(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)("section",{className:"agent-specific-property",children:[(0,c.jsx)("div",{className:"desktop-nav",children:(0,c.jsx)(a.Z,{navbarColour:"#FDF7F0"})}),(0,c.jsx)("div",{className:"mobile-nav",children:(0,c.jsx)(o.Z,{setProfileContent:u,profileContent:x,profileDetail:j,setProfileDetail:p})}),(0,c.jsx)("div",{className:"go-back-button",children:(0,c.jsx)("h5",{onClick:()=>i("/agents/profile"),children:"<- back to profile"})}),(0,c.jsx)(t.Z,{setProfileDetail:p,variableSide:g,setProfileContent:u,setVariableSide:f}),d?(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)("section",{className:"single-school-profile",children:[(0,c.jsxs)("div",{className:"school-core-info",children:[(0,c.jsxs)("div",{className:"info-left",children:[(0,c.jsx)("h1",{children:d[0].school_name}),(0,c.jsxs)("h3",{className:"normal",children:["\ud83d\udcc8 Ofsted: ",d[0].ofsted_results]}),(0,c.jsxs)("h3",{className:"normal",children:["\ud83c\udf93 ",d[0].students," students per year"]}),(0,c.jsxs)("h3",{className:"normal",children:["\ud83d\udc68\u200d\ud83d\udc67 Gender: ",d[0].gender]}),(0,c.jsxs)("h3",{className:"normal",children:["\ud83d\ude4f Faith: ",null===d[0].religion?"All":d[0].religion]}),(0,c.jsxs)("a",{href:d[0].school_url,target:"_blank",className:"website",rel:"noreferrer",children:["\ud83d\udcbb ",d[0].school_url]})]}),(0,c.jsx)("div",{className:"info-right",children:(0,c.jsx)("div",{className:"school-image",id:"secondary",style:{backgroundImage:null===d[0].image_url?void 0:`url(${d[0].image_url})`}})})]}),(0,c.jsxs)("div",{className:"school-academic-highlights",children:[(0,c.jsx)("h1",{children:"Academic highlights"}),(0,c.jsxs)("div",{className:"row",children:[(0,c.jsxs)("div",{className:"item",children:[(0,c.jsx)("div",{className:"circle",children:(0,c.jsxs)("h1",{children:[Math.round(100*(1-d[0].percentile))+1,"%"]})}),(0,c.jsxs)("p",{children:["In the top ",Math.round(100*(1-d[0].percentile))+1,"% of schools in London"]})]}),(0,c.jsxs)("div",{className:"item",children:[(0,c.jsx)("div",{className:"circle",children:(0,c.jsxs)("h1",{children:[Math.round(100*(1-d[0].borough_percentile))+1,"%"]})}),(0,c.jsxs)("p",{children:["In the top ",Math.round(100*(1-d[0].borough_percentile))+1,"% of schools in ",d[0].local_authority]})]}),(0,c.jsxs)("div",{className:"item",children:[(0,c.jsx)("div",{className:"circle",children:(0,c.jsx)("h1",{children:d[0].results.length})}),(0,c.jsxs)("p",{children:["Good curriculum with ",d[0].results.length," subjects"]})]})]})]}),(0,c.jsxs)("div",{className:"school-results",children:[(0,c.jsx)("h1",{children:"GCSE Results"}),(0,c.jsxs)("div",{className:"school-table-headers",children:[(0,c.jsx)("h5",{id:"column1",children:"#"}),(0,c.jsx)("h5",{id:"column2",children:"Subject"}),(0,c.jsx)("h5",{id:"column3",children:"Pass rate (%)"}),(0,c.jsx)("h5",{id:"column4",children:"A/ A* (%)"})]}),(0,c.jsx)("div",{className:"school-table-details",children:d[0].results.map(((e,s)=>(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{className:"school-content",children:[(0,c.jsx)("div",{className:"column",id:"column1",children:(0,c.jsx)("h5",{children:s+1})}),(0,c.jsx)("div",{className:"column",id:"column2",children:(0,c.jsx)("h5",{children:e.subject})}),(0,c.jsx)("div",{className:"column",id:"column3",children:(0,c.jsx)("h5",{children:Math.round(e.pass_rate)})}),(0,c.jsx)("div",{className:"column",id:"column4",children:(0,c.jsx)("h5",{children:Math.round(e.top_rate)})})]}),(0,c.jsx)("hr",{className:"dividing-line"})]})))})]})]})}):""]})})}}}]);
//# sourceMappingURL=717.85e63001.chunk.js.map