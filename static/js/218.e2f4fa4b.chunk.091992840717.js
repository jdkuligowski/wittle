"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[218,667],{37336:function(e,s,t){t.d(s,{Z:function(){return o}});var n=t(42524),i=t(28381);t(65293);t(63762),t(11535),t(31824);var r=t(29343);var o=e=>{let{setProfileContent:s,profileContent:t,profileDetail:o,setProfileDetail:a}=e;const l=(0,n.s0)(),[c,d]=((0,i.useRef)(null),(0,i.useState)(!1)),[h,p]=(0,i.useState)({email:"",password:"",passwordConfirmation:""}),[m,u]=(0,i.useState)("password"),[x,j]=(0,i.useState)("password"),[f,g]=(0,i.useState)(!1),[v,y]=(0,i.useState)(!1),[C,N]=(0,i.useState)({email:"",username:"",password:"",password_confirmation:"",first_name:"",last_name:""}),[b,k]=(0,i.useState)({email:"",username:"",password:"",password_confirmation:"",first_name:"",last_name:"",post:""}),[S,P]=(0,i.useState)("#051885"),[w,F]=(0,i.useState)("#FFA7E5"),[D,M]=(0,i.useState)("#FFA7E5");return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("section",{className:"centered-nav-bar",style:{backgroundColor:S},children:[(0,r.jsx)("section",{className:"top-section",children:(0,r.jsx)("div",{className:"logo",children:(0,r.jsx)("h2",{style:{color:w},onClick:()=>l("/"),children:"Wittle"})})}),(0,r.jsxs)("section",{className:"nav-slider",children:[(0,r.jsx)("h4",{style:{color:D,textDecoration:"My properties"===t?`underline 3px ${D}`:"",textUnderlineOffset:"My properties"===t?"5px":""},onClick:()=>{s("My properties"),a("My properties"),l("/agents/profile")},children:"MY PROPERTIES"}),(0,r.jsx)("h4",{style:{color:D,textDecoration:"Variables"===t?`underline 3px ${D}`:"",textUnderlineOffset:"Variables"===t?"5px":""},onClick:()=>{s("Variables"),a("Variables"),l("/agents/explore")},children:"EXPLORE"}),(0,r.jsx)("h4",{style:{color:D,textDecoration:"Comparison"===t?`underline 3px ${D}`:"",textUnderlineOffset:"Comparison"===t?"5px":""},onClick:()=>{s("Comparison"),a("Comparison"),l("/agents/compare")},children:"COMPARISON"}),(0,r.jsx)("h4",{style:{color:D,textDecoration:"Account"===t?`underline 3px ${D}`:"",textUnderlineOffset:"Account"===t?"5px":""},onClick:()=>{s("Account"),a("Account")},children:"ACCOUNT"})]})]})})}},8772:function(e,s,t){var n=t(42524),i=(t(28381),t(65293),t(15211)),r=(t(63762),t(31824),t(29343));s.Z=e=>{let{navbarColour:s}=e;const t=(0,n.s0)();return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("section",{className:"nav-section no-print",style:{backgroundColor:s},children:[(0,r.jsx)("div",{className:"left-section",children:(0,r.jsx)("div",{className:"logo",children:(0,r.jsx)("h2",{onClick:()=>t("/"),children:"Wittle"})})}),(0,i.Hb)()?(0,r.jsx)("div",{className:"menu-container",children:(0,r.jsx)("h3",{className:"cta",onClick:e=>{localStorage.removeItem("wittle-user-token"),localStorage.removeItem("wittle-username"),window.location.reload()},children:(0,r.jsx)("a",{children:"Sign out"})})}):(0,r.jsx)("div",{className:"menu-container",children:(0,r.jsx)("h3",{className:"cta",onClick:()=>t("/login"),children:(0,r.jsx)("a",{children:"Sign in"})})})]})})}},71218:function(e,s,t){t.r(s);var n=t(28381),i=t(65293),r=t(42524),o=t(15211),a=t(37336),l=t(8772),c=t(59693),d=t(29343);s.default=()=>{const e=(0,r.s0)(),[s,t]=(0,n.useState)("My properties"),[h,p]=(0,n.useState)("My properties"),[m,u]=(0,n.useState)(),[x,j]=(0,n.useState)(),[f,g]=(0,n.useState)();return(0,n.useEffect)((()=>{(0,o.Hb)()?(async()=>{try{const{data:e}=await i.ZP.get(`/api/auth/profile/${(0,o.Nh)()}/`,{headers:{Authorization:`Bearer ${(0,o.hP)()}`}});console.log("user data ->",e),u(e),j(e.company),console.log("company ->",e.company)}catch(e){g(!0),console.log(e)}})():(e("/access-denied"),console.log("no account"))}),[]),(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)("section",{className:"agent-profile-page",children:[(0,d.jsx)("div",{className:"desktop-nav",children:(0,d.jsx)(l.Z,{navbarColour:"#FDF7F0"})}),(0,d.jsx)("div",{className:"mobile-nav",children:(0,d.jsx)(a.Z,{setProfileContent:t,profileContent:s,profileDetail:h,setProfileDetail:p})}),(0,d.jsx)(c.Z,{setProfileDetail:p,setProfileContent:t}),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("section",{className:"profile-summary",children:(0,d.jsx)("div",{className:"welcome",children:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("h1",{children:["\ud83d\udc4b Welcome back ",m?m.first_name:""]}),(0,d.jsx)("h3",{children:"Thanks for being part of the Wittle pilot! Please keep us in the loop with how you're enjoying our products."})]})})}),(0,d.jsx)("section",{className:"product-section",children:(0,d.jsxs)("div",{className:"product-suite",children:[(0,d.jsxs)("div",{className:"product-card",onClick:()=>e("/agents/properties"),children:[(0,d.jsx)("h1",{children:"Property insights"}),(0,d.jsx)("div",{className:"summary-icon",id:"icon1"}),(0,d.jsx)("h3",{children:"Extract insights about any location in London to help populate your listings and enable great conversations with customers"})]}),(0,d.jsxs)("div",{className:"product-card",onClick:()=>e("/agents/finder"),children:[(0,d.jsx)("h1",{children:"Property address finder"}),(0,d.jsx)("div",{className:"summary-icon",id:"icon2"}),(0,d.jsx)("h3",{children:"Find the full address of properties on the market"})]}),(0,d.jsxs)("div",{className:"product-card",id:"coming-soon",children:[(0,d.jsx)("h1",{children:"Property listing generator"}),(0,d.jsx)("div",{className:"summary-icon",id:"icon3"}),(0,d.jsx)("h3",{children:"Generate a listing based on property features and our lifestyle insights library"}),(0,d.jsx)("p",{children:"Coming soon!"})]})]})})]})]})})}},59693:function(e,s,t){var n=t(42524),i=(t(28381),t(29343));s.Z=e=>{let{setProfileDetail:s,variableSide:t,setProfileContent:r,setVariableSide:o,userData:a}=e;const l=(0,n.s0)();return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("section",{className:"profile-sidebar-open no-print remove-margin",children:[(0,i.jsx)("div",{className:"logo",children:(0,i.jsx)("h2",{onClick:()=>l("/"),children:"Wittle"})}),(0,i.jsxs)("div",{className:"profile-buttons",children:[(0,i.jsx)("div",{className:"profile-button-title",children:(0,i.jsx)("h2",{onClick:()=>{s("Home"),r("Home"),l("/agents/profile")},children:"\ud83e\uddd8\u200d\u2642\ufe0f Wittle home"})}),(0,i.jsx)("div",{className:"profile-button-title",id:"second-title",children:(0,i.jsx)("h2",{onClick:()=>{s("My properties"),r("My properties"),l("/agents/properties")},children:"\ud83c\udfe1 My property list"})}),(0,i.jsx)("div",{className:"profile-button-title",id:"second-title",children:(0,i.jsx)("h2",{onClick:()=>{s("Listing generator"),r("Listing generator"),l("/agents/listing-generator")},children:"\ud83e\udde0 Listing generator"})}),(0,i.jsx)("div",{className:"profile-button-title",id:"second-title",children:(0,i.jsx)("h2",{onClick:()=>{r("Property finder"),s("Property finder"),l("/agents/finder")},children:"\ud83d\udd0e Property finder"})})]})]})})}}}]);
//# sourceMappingURL=218.e2f4fa4b.chunk.js.5486dea048f2.map