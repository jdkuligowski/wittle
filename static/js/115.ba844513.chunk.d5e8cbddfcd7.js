"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[115,490],{78084:function(e,s,t){t.d(s,{Z:function(){return a}});var n=t(57689),i=t(72791);t(31243);t(55872),t(82570),t(7463);var o=t(80184);var a=e=>{let{setProfileContent:s,profileContent:t,profileDetail:a,setProfileDetail:r}=e;const c=(0,n.s0)(),[l,d]=((0,i.useRef)(null),(0,i.useState)(!1)),[u,h]=(0,i.useState)({email:"",password:"",passwordConfirmation:""}),[m,g]=(0,i.useState)("password"),[x,j]=(0,i.useState)("password"),[p,f]=(0,i.useState)(!1),[v,N]=(0,i.useState)(!1),[y,C]=(0,i.useState)({email:"",username:"",password:"",password_confirmation:"",first_name:"",last_name:""}),[k,w]=(0,i.useState)({email:"",username:"",password:"",password_confirmation:"",first_name:"",last_name:"",post:""}),[S,b]=(0,i.useState)("#1A276C"),[H,L]=(0,i.useState)("#FDF7F0"),[A,F]=(0,i.useState)("#ED6B86");return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("section",{className:"centered-nav-bar",style:{backgroundColor:S},children:[(0,o.jsx)("section",{className:"top-section",children:(0,o.jsx)("div",{className:"logo",children:(0,o.jsx)("div",{className:"wittle-logo",onClick:()=>c("/")})})}),(0,o.jsxs)("section",{className:"nav-slider",children:[(0,o.jsx)("h4",{style:{color:"Home"===t?H:A,textUnderlineOffset:"Home"===t?"5px":""},onClick:()=>{s("Home"),r("Home"),c("/agents/profile")},children:"HOME"}),(0,o.jsx)("h4",{style:{color:"Listing generator"===t?H:A,textUnderlineOffset:"Listing generator"===t?"5px":""},onClick:()=>{r("Listing generator"),s("Listing generator"),c("/agents/listing-generator")},children:"LISTING GENERATOR"}),(0,o.jsx)("h4",{style:{color:"Lead generator"===t?H:A,textUnderlineOffset:"Lead generator"===t?"5px":""},onClick:()=>{s("Lead generator test"),r("Lead generator test"),c("/agents/lead-gen")},children:"LEAD GENERATOR"}),(0,o.jsx)("h4",{style:{color:"How to guide"===t?H:A,textUnderlineOffset:"How to guide"===t?"5px":""},onClick:()=>{s("How to guide"),r("How to guide"),c("/agents/guide")},children:"HOW TO GUIDE"}),(0,o.jsx)("h4",{style:{color:"Account"===t?H:A,textUnderlineOffset:"Account"===t?"5px":""},onClick:()=>{s("Account"),r("Account"),c("/agents/account")},children:"ACCOUNT"})]})]})})}},60764:function(e,s,t){var n=t(57689),i=(t(72791),t(97165)),o=(t(55872),t(7463),t(80184));s.Z=e=>{let{navbarColour:s}=e;const t=(0,n.s0)();return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("section",{className:"nav-section no-print",style:{backgroundColor:s},children:[(0,o.jsx)("div",{className:"left-section",children:(0,o.jsx)("div",{className:"logo",children:(0,o.jsx)("h2",{onClick:()=>t("/")})})}),(0,i.Hb)()?(0,o.jsx)("div",{className:"menu-container",children:(0,o.jsx)("h3",{className:"cta",onClick:e=>{localStorage.removeItem("wittle-user-token"),localStorage.removeItem("wittle-username"),window.location.reload()},children:(0,o.jsx)("a",{children:"Sign out"})})}):(0,o.jsx)("div",{className:"menu-container",children:(0,o.jsx)("h3",{className:"cta",onClick:()=>t("/login"),children:(0,o.jsx)("a",{children:"Sign in"})})})]})})}},36115:function(e,s,t){t.r(s);var n=t(72791),i=t(31243),o=t(57689),a=t(97165),r=t(78084),c=t(60764),l=t(52094),d=t(80184);s.default=()=>{const e=(0,o.s0)(),[s,t]=(0,n.useState)("My properties"),[u,h]=(0,n.useState)("My properties"),[m,g]=(0,n.useState)(),[x,j]=(0,n.useState)(),[p,f]=(0,n.useState)();return(0,n.useEffect)((()=>{(0,a.Hb)()?(async()=>{try{const{data:e}=await i.Z.get(`/api/auth/profile/${(0,a.Nh)()}/`,{headers:{Authorization:`Bearer ${(0,a.hP)()}`}});console.log("user data ->",e),g(e),j(e.company),console.log("company ->",e.company)}catch(e){f(!0),console.log(e)}})():(e("/access-denied"),console.log("no account"))}),[]),(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)("section",{className:"agent-profile-page",children:[(0,d.jsx)("div",{className:"desktop-nav",children:(0,d.jsx)(c.Z,{navbarColour:"#FDF7F0"})}),(0,d.jsx)("div",{className:"mobile-nav",children:(0,d.jsx)(r.Z,{setProfileContent:t,profileContent:s,profileDetail:u,setProfileDetail:h})}),(0,d.jsx)(l.Z,{setProfileDetail:h,setProfileContent:t}),(0,d.jsx)(d.Fragment,{children:(0,d.jsx)("section",{className:"main-body",children:(0,d.jsxs)("section",{className:"main-body-details",children:[(0,d.jsx)("section",{className:"profile-summary",children:(0,d.jsx)("div",{className:"welcome",children:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("h1",{children:["Welcome back ",(0,d.jsxs)("span",{children:[m?m.first_name:"","!"]})]}),(0,d.jsx)("h3",{children:"Thanks for being part of the Wittle pilot! Please keep us in the loop with how you're enjoying our products."})]})})}),(0,d.jsx)("section",{className:"product-section",children:(0,d.jsxs)("div",{className:"product-suite",children:[(0,d.jsxs)("div",{className:"product-card",onClick:()=>e("/agents/listing-generator"),children:[(0,d.jsx)("div",{className:"summary-icon",id:"icon1"}),(0,d.jsx)("h1",{children:"Property listing generator"}),(0,d.jsx)("h3",{children:"Build a property listing in less than 2 minutes. Save hours of time curating your listings and get access to the data you need to attract buyers."})]}),(0,d.jsxs)("div",{className:"product-card",onClick:()=>e("/agents/finder"),children:[(0,d.jsx)("div",{className:"summary-icon",id:"icon2"}),(0,d.jsx)("h1",{children:"Lead generator"}),(0,d.jsx)("h3",{children:"Find the full details about properties on the market in seconds. Everything you need to know about the properties you want on your books, helping you optimise your lead gen."})]}),(0,d.jsxs)("div",{className:"product-card",id:"coming-soon",children:[(0,d.jsx)("div",{className:"coming-soon-banner",children:(0,d.jsx)("h3",{children:"Coming soon"})}),(0,d.jsx)("div",{className:"summary-icon",id:"icon3"}),(0,d.jsx)("h1",{children:"Valuation guide"}),(0,d.jsx)("h3",{children:"Get property valuation in seconds and see insights into what is driving the valuation."})]})]})})]})})})]})})}},52094:function(e,s,t){var n=t(57689),i=t(72791),o=(t(97165),t(31243),t(80184));s.Z=e=>{let{setProfileDetail:s,variableSide:t,setProfileContent:a,setVariableSide:r}=e;const c=(0,n.s0)(),[l,d]=(0,i.useState)(),[u,h]=(0,i.useState)(),[m,g]=(0,i.useState)(""),[x,j]=(0,i.useState)("Search");return(0,i.useEffect)((()=>{setTimeout((()=>{"Home"===m?c("/agents/profile"):"Saved items"===m&&c("/agents/favourites")}),100)}),[m]),(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("section",{className:"profile-sidebar-open no-print remove-margin",children:[(0,o.jsx)("div",{className:"logo-section",children:(0,o.jsx)("div",{className:"logo",onClick:()=>c("/")})}),(0,o.jsxs)("div",{className:"profile-buttons",children:[(0,o.jsxs)("div",{className:"profile-button-title "+("Home"===m?"active":""),onClick:()=>{g("Home"),setTimeout((()=>{s("Home"),a("Home")}),0)},children:[(0,o.jsx)("div",{className:"icon",id:"home-icon"}),(0,o.jsx)("h2",{children:"Wittle home"})]}),(0,o.jsxs)("div",{className:"profile-button-title "+("Listing generator"===m?"active":""),onClick:()=>{g("Listing generator"),s("Listing generator"),a("Listing generator"),c("/agents/listing-generator")},children:[(0,o.jsx)("div",{className:"icon",id:"listing-icon"}),(0,o.jsx)("h2",{children:"Listing generator"})]}),(0,o.jsxs)("div",{className:"profile-button-title "+("Lead generator test"===m?"active":""),onClick:()=>{g("Lead generator test"),a("Lead generator test"),s("Lead generator test"),c("/agents/lead-gen")},children:[(0,o.jsx)("div",{className:"icon",id:"finder-icon"}),(0,o.jsx)("h2",{children:"Lead generator"})]}),(0,o.jsxs)("div",{className:"profile-button-title "+("How to guide"===m?"active":""),onClick:()=>{g("How to guide"),a("How to guide"),s("How to guide"),c("/agents/guide")},children:[(0,o.jsx)("div",{className:"icon",id:"help-icon"}),(0,o.jsx)("h2",{children:"How-to guide"})]}),(0,o.jsxs)("div",{className:"profile-button-title "+("Account"===m?"active":""),onClick:()=>{g("Account"),a("Account"),s("Account"),c("/agents/account")},children:[(0,o.jsx)("div",{className:"icon",id:"account-icon"}),(0,o.jsx)("h2",{children:"Account details"})]})]})]})})}}}]);
//# sourceMappingURL=115.ba844513.chunk.js.b5de5bddcf67.map