"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[716],{33716:function(e,s,a){a.r(s);var t=a(28381),r=a(65293),l=a(42524),c=(a(95325),a(15211)),i=(a(61505),a(47142)),n=a(59693),o=a(8772),d=(a(9663),a(9738),a(37336)),h=a(29343);s.default=()=>{const e=(0,l.s0)(),[s,a]=((0,l.TH)(),(0,t.useState)([])),[p,m]=(0,t.useState)(),[u,x]=(0,t.useState)(),[j,v]=(0,t.useState)(),[y,N]=(0,t.useState)("My properties"),[g,f]=(0,t.useState)("My properties"),[S,b]=(0,t.useState)(!1),[C,w]=(0,t.useState)(""),[k,P]=(0,t.useState)(""),[D,F]=(0,t.useState)(null),[$,A]=(0,t.useState)(),[Z,L]=(0,t.useState)(0),[T,z]=(0,t.useState)();(0,t.useEffect)((()=>{(0,c.Hb)()?(async()=>{try{const{data:e}=await r.ZP.get(`/api/auth/profile/${(0,c.Nh)()}/`,{headers:{Authorization:`Bearer ${(0,c.hP)()}`}});console.log("user data ->",e),m(e),x(e.company),console.log("company ->",e.company)}catch(e){v(!0),console.log(e)}})():(e("/access-denied"),console.log("no account"))}),[]);(0,t.useEffect)((()=>{p&&(async()=>{try{const{data:e}=await r.ZP.get(`/api/white_properties/${u}`,{headers:{Authorization:`Bearer ${(0,c.hP)()}`}});if(console.log("agent property data ->",e),e&&Array.isArray(e)&&e.length>0){A(e);const s=e.reduce(((e,s)=>e+(s.price||0)),0);L(s.toFixed(1)),z("Let"===e[0].status?"Rent":"Sale")}else console.log("No property data available")}catch(e){v(!0),console.log(e)}})()}),[p]);const B=e=>{F(e)};return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)("section",{className:"agent-profile-page",children:[(0,h.jsx)("div",{className:"desktop-nav",children:(0,h.jsx)(o.Z,{navbarColour:"#FDF7F0"})}),(0,h.jsx)("div",{className:"mobile-nav",children:(0,h.jsx)(d.Z,{setProfileContent:N,profileContent:y,profileDetail:g,setProfileDetail:f})}),(0,h.jsx)(n.Z,{setProfileDetail:f,variableSide:S,setProfileContent:N,setVariableSide:b,userData:p}),$?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("section",{className:"profile-summary",children:(0,h.jsx)("div",{className:"welcome",children:(0,h.jsxs)("h1",{children:["You have ",$?$.length:""," properties saved"]})})}),(0,h.jsxs)("section",{className:"profile-property-list",children:[(0,h.jsx)("div",{className:"search-section",children:(0,h.jsxs)("div",{className:"search-section-left",children:[(0,h.jsx)("h3",{children:"Search"}),(0,h.jsx)("input",{value:C,onChange:e=>w(e.target.value),placeholder:"Type property name"})]})}),(0,h.jsx)("div",{className:"agent-property-list",children:(0,h.jsxs)("div",{className:"property-block",children:[(0,h.jsxs)("div",{className:"property-table-headers",children:[(0,h.jsx)("h5",{id:"column1",children:"Property"}),(0,h.jsxs)("div",{id:"column2",className:"sort-section",children:[(0,h.jsx)("h5",{children:"Street name"}),(0,h.jsx)("h5",{className:"sort",onClick:()=>B("name"),children:"\u2195\ufe0f"})]}),(0,h.jsxs)("div",{id:"column3",className:"sort-section",children:[(0,h.jsx)("h5",{children:"Price"}),(0,h.jsx)("h5",{className:"sort",onClick:()=>B("price"),children:"\u2195\ufe0f"})]}),(0,h.jsx)("h5",{id:"column5",children:"Action"})]}),(0,h.jsx)("div",{className:"property-table-details",children:$?$.filter((e=>e.name.toLowerCase().includes(C.toLowerCase()))).sort(((e,s)=>"name"===D?e.name.localeCompare(s.name):"price"===D?e.price-s.price:"date"===D?new Date(e.date)-new Date(s.date):0)).map(((s,a)=>(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{className:"property-content",children:[(0,h.jsx)("div",{className:"column",id:"column1",children:(0,h.jsx)("div",{className:"property-image",style:{backgroundImage:`url(${s.image})`}})}),(0,h.jsx)("div",{className:"column",id:"column2",children:(0,h.jsx)("h5",{children:s.name})}),(0,h.jsx)("div",{className:"column",id:"column3",children:(0,h.jsx)("h5",{children:(0,h.jsx)(i.h3,{value:s.price,displayType:"text",thousandSeparator:!0,prefix:"\xa3"})})}),(0,h.jsx)("div",{className:"column",id:"column6",children:(0,h.jsx)("button",{onClick:()=>e(`/agents/property/${s.postcode}`),children:"View"})})]},a),(0,h.jsx)("hr",{className:"property-divider"})]}))):""})]})})]})]}):(0,h.jsx)("section",{className:"profile-summary",children:(0,h.jsx)("div",{className:"welcome",children:(0,h.jsx)("h1",{children:"You don't have any properties saved yet"})})})]})})}}}]);
//# sourceMappingURL=716.0c58313f.chunk.js.537af06c0ed4.map