"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[962],{33602:function(s,e,a){a.r(e);var t=a(28381),l=a(65293),i=a(42524),c=a(37336),n=a(8772),o=a(59693),d=a(15211),h=a(29343);e.default=()=>{const s=(0,i.s0)(),[e,a]=(0,t.useState)("My saved items"),[r,m]=(0,t.useState)("My saved items"),[u,x]=(0,t.useState)(!1),[j,N]=(0,t.useState)(),[g,_]=(0,t.useState)();return(0,t.useEffect)((()=>{(0,d.Hb)()?(async()=>{try{const{data:s}=await l.ZP.get(`/api/auth/profile/${(0,d.Nh)()}/`,{headers:{Authorization:`Bearer ${(0,d.hP)()}`}});console.log("user data ->",s),N(s)}catch(s){_(!0),console.log(s)}})():(s("/access-denied"),console.log("no account"))}),[]),(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)("section",{className:"agent-profile-page",children:[(0,h.jsx)("div",{className:"desktop-nav",children:(0,h.jsx)(n.Z,{navbarColour:"#FDF7F0"})}),(0,h.jsx)("div",{className:"mobile-nav",children:(0,h.jsx)(c.Z,{setProfileContent:a,profileContent:e,profileDetail:r,setProfileDetail:m})}),(0,h.jsx)(o.Z,{setProfileDetail:m,variableSide:u,setProfileContent:a,setVariableSide:x}),(0,h.jsxs)("section",{className:"account-section",children:[(0,h.jsx)("div",{className:"title-section",children:(0,h.jsx)("h3",{children:"\ud83d\udcbb Account details"})}),j?(0,h.jsxs)("div",{className:"details-section",children:[(0,h.jsx)("h3",{className:"sub-title",children:"Account info"}),(0,h.jsxs)("div",{className:"info-block",children:[(0,h.jsx)("h5",{className:"title",children:"Name: "}),(0,h.jsxs)("h5",{className:"detail",children:[j.first_name," ",j.last_name]})]}),(0,h.jsxs)("div",{className:"info-block",children:[(0,h.jsx)("h5",{className:"title",children:"Username: "}),(0,h.jsx)("h5",{className:"detail",children:j.username})]}),(0,h.jsxs)("div",{className:"info-block",children:[(0,h.jsx)("h5",{className:"title",children:"Email: "}),(0,h.jsx)("h5",{className:"detail",children:j.email})]}),(0,h.jsxs)("div",{className:"info-block",children:[(0,h.jsx)("h5",{className:"title",children:"Package: "}),(0,h.jsx)("h5",{className:"detail",children:j.usage_stats[0].package})]}),(0,h.jsx)("h3",{className:"sub-title second",children:"Account stats"}),(0,h.jsxs)("div",{className:"info-block",children:[(0,h.jsx)("h5",{className:"title",children:"Property finder searches this month: "}),(0,h.jsx)("h5",{className:"detail",children:j.usage_stats[0].epc_monthly_count})]}),(0,h.jsxs)("div",{className:"info-block",children:[(0,h.jsx)("h5",{className:"title",children:"Searches until next product tier: "}),(0,h.jsx)("h5",{className:"detail",children:"Unlimited"===j.usage_stats[0].package?"No limit":"Advanced Pilot"===j.usage_stats[0].package?100-j.usage_stats[0].epc_monthly_count:"Basic"===j.usage_stats[0].package?10-j.usage_stats[0].epc_monthly_count:""})]}),(0,h.jsxs)("div",{className:"info-block",children:[(0,h.jsx)("h5",{className:"title",children:"Listing related searches this month: "}),(0,h.jsx)("h5",{className:"detail",children:j.usage_stats[0].listing_monthly_count})]}),(0,h.jsxs)("div",{className:"info-block",children:[(0,h.jsx)("h5",{className:"title",children:"Searches until next product tier: "}),(0,h.jsx)("h5",{className:"detail",children:"Unlimited"===j.usage_stats[0].package?"No limit":"Advanced Pilot"===j.usage_stats[0].package?100-j.usage_stats[0].listing_monthly_count:"Basic"===j.usage_stats[0].package?10-j.usage_stats[0].listing_monthly_count:""})]})]}):""]})]})})}}}]);
//# sourceMappingURL=962.28211ee3.chunk.js.map