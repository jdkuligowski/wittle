"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[490],{8084:function(e,t,s){s.d(t,{Z:function(){return a}});var i=s(7689),n=s(2791);s(5294);s(5872),s(2570),s(7463);var o=s(184);var a=e=>{let{setProfileContent:t,profileContent:s,profileDetail:a,setProfileDetail:r}=e;const c=(0,i.s0)(),[l,d]=((0,n.useRef)(null),(0,n.useState)(!1)),[g,u]=(0,n.useState)({email:"",password:"",passwordConfirmation:""}),[h,m]=(0,n.useState)("password"),[x,j]=(0,n.useState)("password"),[f,p]=(0,n.useState)(!1),[v,N]=(0,n.useState)(!1),[C,w]=(0,n.useState)({email:"",username:"",password:"",password_confirmation:"",first_name:"",last_name:""}),[S,k]=(0,n.useState)({email:"",username:"",password:"",password_confirmation:"",first_name:"",last_name:"",post:""}),[H,L]=(0,n.useState)("#1A276C"),[b,y]=(0,n.useState)("#FDF7F0"),[A,P]=(0,n.useState)("#ED6B86");return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("section",{className:"centered-nav-bar",style:{backgroundColor:H},children:[(0,o.jsx)("section",{className:"top-section",children:(0,o.jsx)("div",{className:"logo",children:(0,o.jsx)("div",{className:"wittle-logo",onClick:()=>c("/")})})}),(0,o.jsxs)("section",{className:"nav-slider",children:[(0,o.jsx)("h4",{style:{color:"Home"===s?b:A,textUnderlineOffset:"Home"===s?"5px":""},onClick:()=>{t("Home"),r("Home"),c("/agents/profile")},children:"HOME"}),(0,o.jsx)("h4",{style:{color:"Listing generator"===s?b:A,textUnderlineOffset:"Listing generator"===s?"5px":""},onClick:()=>{r("Listing generator"),t("Listing generator"),c("/agents/listing-generator")},children:"LISTING GENERATOR"}),(0,o.jsx)("h4",{style:{color:"Lead generator"===s?b:A,textUnderlineOffset:"Lead generator"===s?"5px":""},onClick:()=>{t("Lead generator test"),r("Lead generator test"),c("/agents/lead-gen")},children:"LEAD GENERATOR"}),(0,o.jsx)("h4",{style:{color:"Property search"===s?b:A,textUnderlineOffset:"Property search"===s?"5px":""},onClick:()=>{t("Property search"),r("Property search"),c("/agents/wittle-search")},children:"PROPERTY SEARCH"}),(0,o.jsx)("h4",{style:{color:"How to guide"===s?b:A,textUnderlineOffset:"How to guide"===s?"5px":""},onClick:()=>{t("How to guide"),r("How to guide"),c("/agents/guide")},children:"HOW TO GUIDE"}),(0,o.jsx)("h4",{style:{color:"Account"===s?b:A,textUnderlineOffset:"Account"===s?"5px":""},onClick:()=>{t("Account"),r("Account"),c("/agents/account")},children:"ACCOUNT"})]})]})})}},764:function(e,t,s){var i=s(7689),n=(s(2791),s(7165)),o=(s(5872),s(7463),s(184));t.Z=e=>{let{navbarColour:t}=e;const s=(0,i.s0)();return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("section",{className:"nav-section no-print",style:{backgroundColor:t},children:[(0,o.jsx)("div",{className:"left-section",children:(0,o.jsx)("div",{className:"logo",children:(0,o.jsx)("h2",{onClick:()=>s("/")})})}),(0,n.Hb)()?(0,o.jsx)("div",{className:"menu-container",children:(0,o.jsx)("h3",{className:"cta",onClick:e=>{localStorage.removeItem("wittle-user-token"),localStorage.removeItem("wittle-username"),window.location.reload()},children:(0,o.jsx)("a",{children:"Sign out"})})}):(0,o.jsx)("div",{className:"menu-container",children:(0,o.jsx)("h3",{className:"cta",onClick:()=>s("/login"),children:(0,o.jsx)("a",{children:"Sign in"})})})]})})}},2094:function(e,t,s){var i=s(7689),n=s(2791),o=(s(7165),s(5294),s(184));t.Z=e=>{let{setProfileDetail:t,variableSide:s,setProfileContent:a,setVariableSide:r}=e;const c=(0,i.s0)(),[l,d]=(0,n.useState)(),[g,u]=(0,n.useState)(),[h,m]=(0,n.useState)(""),[x,j]=(0,n.useState)("Search");return(0,n.useEffect)((()=>{setTimeout((()=>{"Home"===h?c("/agents/profile"):"Saved items"===h&&c("/agents/favourites")}),100)}),[h]),(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("section",{className:"profile-sidebar-open no-print remove-margin",children:[(0,o.jsx)("div",{className:"logo-section",children:(0,o.jsx)("div",{className:"logo",onClick:()=>c("/")})}),(0,o.jsxs)("div",{className:"profile-buttons",children:[(0,o.jsxs)("div",{className:"profile-button-title "+("Home"===h?"active":""),onClick:()=>{m("Home"),setTimeout((()=>{t("Home"),a("Home")}),0)},children:[(0,o.jsx)("div",{className:"icon",id:"home-icon"}),(0,o.jsx)("h2",{children:"Wittle home"})]}),(0,o.jsxs)("div",{className:"profile-button-title "+("Listing generator"===h?"active":""),onClick:()=>{m("Listing generator"),t("Listing generator"),a("Listing generator"),c("/agents/listing-generator")},children:[(0,o.jsx)("div",{className:"icon",id:"listing-icon"}),(0,o.jsx)("h2",{children:"Listing generator"})]}),(0,o.jsxs)("div",{className:"profile-button-title "+("Lead generator test"===h?"active":""),onClick:()=>{m("Lead generator test"),a("Lead generator test"),t("Lead generator test"),c("/agents/lead-gen")},children:[(0,o.jsx)("div",{className:"icon",id:"finder-icon"}),(0,o.jsx)("h2",{children:"Lead generator"})]}),(0,o.jsxs)("div",{className:"profile-button-title "+("Property search"===h?"active":""),onClick:()=>{m("Property search"),a("Property search"),t("Property search"),c("/agents/wittle-search")},children:[(0,o.jsx)("div",{className:"icon",id:"search-icon"}),(0,o.jsx)("h2",{children:"Wittle search"})]}),(0,o.jsxs)("div",{className:"profile-button-title "+("How to guide"===h?"active":""),onClick:()=>{m("How to guide"),a("How to guide"),t("How to guide"),c("/agents/guide")},children:[(0,o.jsx)("div",{className:"icon",id:"help-icon"}),(0,o.jsx)("h2",{children:"How-to guide"})]}),(0,o.jsxs)("div",{className:"profile-button-title "+("Account"===h?"active":""),onClick:()=>{m("Account"),a("Account"),t("Account"),c("/agents/account")},children:[(0,o.jsx)("div",{className:"icon",id:"account-icon"}),(0,o.jsx)("h2",{children:"Account details"})]})]})]})})}}}]);
//# sourceMappingURL=490.b19d03e0.chunk.js.map