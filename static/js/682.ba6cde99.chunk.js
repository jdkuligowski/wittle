"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[682],{8682:function(s,e,a){a.r(e);var t=a(2791),l=a(5294),i=a(7689),c=a(8084),n=a(764),o=a(2094),d=a(7165),r=a(184);e.default=()=>{const s=(0,i.s0)(),[e,a]=(0,t.useState)("My saved items"),[h,m]=(0,t.useState)("My saved items"),[u,x]=(0,t.useState)(!1),[j,N]=(0,t.useState)(),[g,_]=(0,t.useState)();(0,t.useEffect)((()=>{(0,d.Hb)()?(async()=>{try{const{data:s}=await l.Z.get(`/api/auth/profile/${(0,d.Nh)()}/`,{headers:{Authorization:`Bearer ${(0,d.hP)()}`}});console.log("user data ->",s),N(s)}catch(s){_(!0),console.log(s)}})():(s("/access-denied"),console.log("no account"))}),[]);return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("section",{className:"agent-profile-page",children:[(0,r.jsx)("div",{className:"desktop-nav",children:(0,r.jsx)(n.Z,{navbarColour:"#FDF7F0"})}),(0,r.jsx)("div",{className:"mobile-nav",children:(0,r.jsx)(c.Z,{setProfileContent:a,profileContent:e,profileDetail:h,setProfileDetail:m})}),(0,r.jsx)(o.Z,{setProfileDetail:m,variableSide:u,setProfileContent:a,setVariableSide:x}),(0,r.jsx)("section",{className:"main-body",children:(0,r.jsx)("section",{className:"main-body-details",children:(0,r.jsxs)("section",{className:"account-section",children:[(0,r.jsxs)("div",{className:"listing-options",children:[(0,r.jsx)("div",{className:"listing-buttons"}),(0,r.jsx)("div",{className:"logout-button",onClick:e=>{localStorage.removeItem("wittle-user-token"),localStorage.removeItem("wittle-username"),s("/login")},children:(0,r.jsx)("div",{className:"logout-icon"})})]}),(0,r.jsx)("hr",{className:"title-line"}),j?(0,r.jsxs)("div",{className:"details-section",children:[(0,r.jsx)("h3",{className:"sub-title",children:"Account info"}),(0,r.jsxs)("div",{className:"info-block",children:[(0,r.jsx)("h5",{className:"title",children:"Name: "}),(0,r.jsxs)("h5",{className:"detail",children:[j.first_name," ",j.last_name]})]}),(0,r.jsxs)("div",{className:"info-block",children:[(0,r.jsx)("h5",{className:"title",children:"Username: "}),(0,r.jsx)("h5",{className:"detail",children:j.username})]}),(0,r.jsxs)("div",{className:"info-block",children:[(0,r.jsx)("h5",{className:"title",children:"Email: "}),(0,r.jsx)("h5",{className:"detail",children:j.email})]}),(0,r.jsxs)("div",{className:"info-block",children:[(0,r.jsx)("h5",{className:"title",children:"Package: "}),(0,r.jsx)("h5",{className:"detail",children:j.usage_stats[0].package})]}),(0,r.jsx)("h3",{className:"sub-title second",children:"Account stats"}),(0,r.jsxs)("div",{className:"info-block",children:[(0,r.jsx)("h5",{className:"title",children:"Property finder searches this month: "}),(0,r.jsx)("h5",{className:"detail",children:j.usage_stats[0].epc_monthly_count})]}),(0,r.jsxs)("div",{className:"info-block",children:[(0,r.jsx)("h5",{className:"title",children:"Searches until next product tier: "}),(0,r.jsx)("h5",{className:"detail",children:"Unlimited"===j.usage_stats[0].package?"No limit":"Advanced Pilot"===j.usage_stats[0].package?100-j.usage_stats[0].epc_monthly_count:"Basic"===j.usage_stats[0].package?10-j.usage_stats[0].epc_monthly_count:""})]}),(0,r.jsxs)("div",{className:"info-block",children:[(0,r.jsx)("h5",{className:"title",children:"Listing related searches this month: "}),(0,r.jsx)("h5",{className:"detail",children:j.usage_stats[0].listing_monthly_count})]}),(0,r.jsxs)("div",{className:"info-block",children:[(0,r.jsx)("h5",{className:"title",children:"Searches until next product tier: "}),(0,r.jsx)("h5",{className:"detail",children:"Unlimited"===j.usage_stats[0].package?"No limit":"Advanced Pilot"===j.usage_stats[0].package?100-j.usage_stats[0].listing_monthly_count:"Basic"===j.usage_stats[0].package?10-j.usage_stats[0].listing_monthly_count:""})]})]}):""]})})})]})})}}}]);
//# sourceMappingURL=682.ba6cde99.chunk.js.map