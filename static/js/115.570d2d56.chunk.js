"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[115],{36115:function(e,s,i){i.r(s);var n=i(72791),a=i(31243),t=i(57689),o=i(97165),r=i(78084),c=i(60764),l=i(52094),d=i(80184);s.default=()=>{const e=(0,t.s0)(),[s,i]=(0,n.useState)("My properties"),[h,u]=(0,n.useState)("My properties"),[m,p]=(0,n.useState)(),[j,g]=(0,n.useState)(),[x,y]=(0,n.useState)();return(0,n.useEffect)((()=>{(0,o.Hb)()?(async()=>{try{const{data:e}=await a.Z.get(`/api/auth/profile/${(0,o.Nh)()}/`,{headers:{Authorization:`Bearer ${(0,o.hP)()}`}});console.log("user data ->",e),p(e),g(e.company),console.log("company ->",e.company)}catch(e){y(!0),console.log(e)}})():(e("/access-denied"),console.log("no account"))}),[]),(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)("section",{className:"agent-profile-page",children:[(0,d.jsx)("div",{className:"desktop-nav",children:(0,d.jsx)(c.Z,{navbarColour:"#FDF7F0"})}),(0,d.jsx)("div",{className:"mobile-nav",children:(0,d.jsx)(r.Z,{setProfileContent:i,profileContent:s,profileDetail:h,setProfileDetail:u})}),(0,d.jsx)(l.Z,{setProfileDetail:u,setProfileContent:i}),(0,d.jsx)(d.Fragment,{children:(0,d.jsx)("section",{className:"main-body",children:(0,d.jsxs)("section",{className:"main-body-details",children:[(0,d.jsx)("section",{className:"profile-summary",children:(0,d.jsx)("div",{className:"welcome",children:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("h1",{children:["Welcome back ",(0,d.jsxs)("span",{children:[m?m.first_name:"","!"]})]}),(0,d.jsx)("h3",{children:"Thanks for being part of the Wittle pilot! Please keep us in the loop with how you're enjoying our products."})]})})}),(0,d.jsx)("section",{className:"product-section",children:(0,d.jsxs)("div",{className:"product-suite",children:[(0,d.jsxs)("div",{className:"product-card",onClick:()=>e("/agents/listing-generator"),children:[(0,d.jsx)("div",{className:"summary-icon",id:"icon1"}),(0,d.jsx)("h1",{children:"Property listing generator"}),(0,d.jsx)("h3",{children:"Build a property listing in less than 2 minutes. Save hours of time curating your listings and get access to the data you need to attract buyers."})]}),(0,d.jsxs)("div",{className:"product-card",onClick:()=>e("/agents/finder"),children:[(0,d.jsx)("div",{className:"summary-icon",id:"icon2"}),(0,d.jsx)("h1",{children:"Lead generator"}),(0,d.jsx)("h3",{children:"Find the full details about properties on the market in seconds. Everything you need to know about the properties you want on your books, helping you optimise your lead gen."})]}),(0,d.jsxs)("div",{className:"product-card",id:"coming-soon",children:[(0,d.jsx)("div",{className:"coming-soon-banner",children:(0,d.jsx)("h3",{children:"Coming soon"})}),(0,d.jsx)("div",{className:"summary-icon",id:"icon3"}),(0,d.jsx)("h1",{children:"Valuation guide"}),(0,d.jsx)("h3",{children:"Get property valuation in seconds and see insights into what is driving the valuation."})]})]})})]})})})]})})}}}]);
//# sourceMappingURL=115.570d2d56.chunk.js.map