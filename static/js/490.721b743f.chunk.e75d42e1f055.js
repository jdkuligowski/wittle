"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[490],{78084:function(e,s,t){t.d(s,{Z:function(){return o}});var a=t(57689),n=t(72791);t(55294);t(55872),t(82570),t(7463);var i=t(80184);var o=e=>{let{setProfileContent:s,profileContent:t,profileDetail:o,setProfileDetail:r}=e;const c=(0,a.s0)(),[l,d]=((0,n.useRef)(null),(0,n.useState)(!1)),[g,u]=(0,n.useState)({email:"",password:"",passwordConfirmation:""}),[h,m]=(0,n.useState)("password"),[x,p]=(0,n.useState)("password"),[j,f]=(0,n.useState)(!1),[v,N]=(0,n.useState)(!1),[w,C]=(0,n.useState)({email:"",username:"",password:"",password_confirmation:"",first_name:"",last_name:""}),[k,_]=(0,n.useState)({email:"",username:"",password:"",password_confirmation:"",first_name:"",last_name:"",post:""}),[S,H]=(0,n.useState)("#1A276C"),[b,y]=(0,n.useState)("#FDF7F0"),[L,A]=(0,n.useState)("#ED6B86");return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("section",{className:"centered-nav-bar",style:{backgroundColor:S},children:[(0,i.jsx)("section",{className:"top-section",children:(0,i.jsx)("div",{className:"logo",children:(0,i.jsx)("div",{className:"wittle-logo",onClick:()=>c("/")})})}),(0,i.jsxs)("section",{className:"nav-slider",children:[(0,i.jsx)("h4",{style:{color:"Home"===t?b:L,textUnderlineOffset:"Home"===t?"5px":""},onClick:()=>{s("Home"),r("Home"),c("/agents/profile")},children:"HOME"}),(0,i.jsx)("h4",{style:{color:"Listing generator"===t?b:L,textUnderlineOffset:"Listing generator"===t?"5px":""},onClick:()=>{r("Listing generator"),s("Listing generator"),c("/agents/listing-generator")},children:"LISTING GENERATOR"}),(0,i.jsx)("h4",{style:{color:"Lead generator"===t?b:L,textUnderlineOffset:"Lead generator"===t?"5px":""},onClick:()=>{s("Lead generator test"),r("Lead generator test"),c("/agents/lead-gen")},children:"LEAD GENERATOR"}),(0,i.jsx)("h4",{style:{color:"Property search"===t?b:L,textUnderlineOffset:"Property search"===t?"5px":""},onClick:()=>{s("Property search"),r("Property search"),c("/agents/wittle-search")},children:"PROPERTY SEARCH"}),(0,i.jsx)("h4",{style:{color:"How to guide"===t?b:L,textUnderlineOffset:"How to guide"===t?"5px":""},onClick:()=>{s("How to guide"),r("How to guide"),c("/agents/guide")},children:"HOW TO GUIDE"}),(0,i.jsx)("h4",{style:{color:"Account"===t?b:L,textUnderlineOffset:"Account"===t?"5px":""},onClick:()=>{s("Account"),r("Account"),c("/agents/account")},children:"ACCOUNT"})]})]})})}},60764:function(e,s,t){var a=t(57689),n=(t(72791),t(97165)),i=(t(55872),t(7463),t(80184));s.Z=e=>{let{navbarColour:s}=e;const t=(0,a.s0)();return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("section",{className:"nav-section no-print",style:{backgroundColor:s},children:[(0,i.jsx)("div",{className:"left-section",children:(0,i.jsx)("div",{className:"logo",children:(0,i.jsx)("h2",{onClick:()=>t("/")})})}),(0,n.Hb)()?(0,i.jsx)("div",{className:"menu-container",children:(0,i.jsx)("h3",{className:"cta",onClick:e=>{localStorage.removeItem("wittle-user-token"),localStorage.removeItem("wittle-username"),window.location.reload()},children:(0,i.jsx)("a",{children:"Sign out"})})}):(0,i.jsx)("div",{className:"menu-container",children:(0,i.jsx)("h3",{className:"cta",onClick:()=>t("/login"),children:(0,i.jsx)("a",{children:"Sign in"})})})]})})}},52094:function(e,s,t){var a=t(57689),n=t(72791),i=t(97165),o=t(55294),r=t(75314),c=t(80184);s.Z=e=>{let{setProfileDetail:s,variableSide:t,setProfileContent:l,setVariableSide:d}=e;const g=(0,a.s0)(),[u,h]=(0,n.useState)(),[m,x]=(0,n.useState)(),[p,j]=(0,n.useState)(""),[f,v]=(0,n.useState)("Search"),[N,w]=(0,n.useState)(0);return(0,n.useEffect)((()=>{const e=()=>{(0,i.Hb)()?(async()=>{try{const{data:e}=await o.Z.get(`/api/auth/profile/${(0,i.Nh)()}/`,{headers:{Authorization:`Bearer ${(0,i.hP)()}`}});if(console.log("user data ->",e),h(e),e.usage_stats&&"Free"===e.usage_stats[0].package){const s=20,t=e.usage_stats[0].save_lead_gen_month_total;w(s-t)}else if(e.usage_stats&&"Boost"===e.usage_stats[0].package){const s=250,t=e.usage_stats[0].save_lead_gen_month_total;w(s-t)}}catch(e){x(!0),console.log(e)}})():(g("/access-denied"),console.log("no account"))};return r.Y.on("userDataUpdated",e),()=>{r.Y.off("userDataUpdated",e)}}),[]),(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)("section",{className:"profile-sidebar-open no-print remove-margin",children:[(0,c.jsx)("div",{className:"logo-section",children:(0,c.jsx)("div",{className:"logo",onClick:()=>g("/")})}),(0,c.jsxs)("div",{className:"profile-buttons",children:[(0,c.jsxs)("div",{className:"profile-button-title "+("Home"===p?"active":""),onClick:()=>{j("Home"),s("Home"),l("Home")},children:[(0,c.jsx)("div",{className:"icon",id:"home-icon"}),(0,c.jsx)("h2",{children:"Wittle home"})]}),(0,c.jsxs)("div",{className:"profile-button-title "+("Listing generator"===p?"active":""),onClick:()=>{j("Listing generator"),s("Listing generator"),l("Listing generator"),g("/agents/listing-generator")},children:[(0,c.jsx)("div",{className:"icon",id:"listing-icon"}),(0,c.jsx)("h2",{children:"Listing generator"})]}),(0,c.jsxs)("div",{className:"profile-button-title "+("Lead generator test"===p?"active":""),onClick:()=>{j("Lead generator test"),l("Lead generator test"),s("Lead generator test"),g("/agents/lead-gen")},children:[(0,c.jsx)("div",{className:"icon",id:"finder-icon"}),(0,c.jsx)("h2",{children:"Lead generator"})]}),(0,c.jsxs)("div",{className:"profile-button-title "+("Property search"===p?"active":""),onClick:()=>{j("Property search"),l("Property search"),s("Property search"),g("/agents/wittle-search")},children:[(0,c.jsx)("div",{className:"icon",id:"search-icon"}),(0,c.jsx)("h2",{children:"Wittle search"})]}),(0,c.jsxs)("div",{className:"profile-button-title "+("How to guide"===p?"active":""),onClick:()=>{j("How to guide"),l("How to guide"),s("How to guide"),g("/agents/guide")},children:[(0,c.jsx)("div",{className:"icon",id:"help-icon"}),(0,c.jsx)("h2",{children:"How-to guide"})]}),(0,c.jsxs)("div",{className:"profile-button-title "+("Account"===p?"active":""),onClick:()=>{j("Account"),l("Account"),s("Account"),g("/agents/account")},children:[(0,c.jsx)("div",{className:"icon",id:"account-icon"}),(0,c.jsx)("h2",{children:"Account details"})]})]}),u&&u.usage_stats&&u.usage_stats[0]&&"Free"===u.usage_stats[0].package?(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)("div",{className:"progress-section",children:[(0,c.jsx)("div",{className:"progress-container",children:(0,c.jsx)("div",{className:"progress-bar",style:{width:`${(N/20*100).toFixed(0)}%`}})}),(0,c.jsxs)("p",{className:"leads-remaining",children:[N," leads remaining"]})]})}):u&&u.usage_stats&&u.usage_stats[0]&&"Boost"===u.usage_stats[0].package?(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)("div",{className:"progress-section",children:[(0,c.jsx)("div",{className:"progress-container",children:(0,c.jsx)("div",{className:"progress-bar",style:{width:`${(N/250*100).toFixed(0)}%`}})}),(0,c.jsxs)("p",{className:"leads-remaining",children:[N," leads remaining"]})]})}):""]})})}},75314:function(e,s,t){t.d(s,{Y:function(){return a}});const a=new(t(13631).Z)}}]);
//# sourceMappingURL=490.721b743f.chunk.js.8ec6bab5b93e.map