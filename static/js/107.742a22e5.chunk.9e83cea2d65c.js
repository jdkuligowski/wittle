"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[107],{88465:function(e,s,l){var i=l(80184);s.Z=e=>{let{textColour:s,pageType:l}=e;return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("section",{className:"website-footer no-print",id:l,children:[(0,i.jsx)("p",{style:{color:s},children:"Wittle Technology Limited is a registered company in England and Wales with corporation number 14326945."}),(0,i.jsx)("p",{style:{color:s},children:"Copyright \xa9 Wittle Technology Limited. All rights reserved."})]})})}},37107:function(e,s,l){l.r(s);var i=l(72791),c=l(31243),n=l(57689),r=(l(99696),l(88465),l(52094)),a=l(60764),t=l(78084),o=l(80184);s.default=()=>{const[e,s]=(0,i.useState)(),[l,d]=((0,n.s0)(),(0,i.useState)()),{id:h}=(0,n.UO)(),[m,u]=(0,i.useState)("My properties"),[j,x]=(0,i.useState)("My properties"),[g,p]=(0,i.useState)(!1);return(0,i.useEffect)((()=>{(async()=>{try{const{data:e}=await c.Z.get(`/api/secondaries/${h}`);console.log("secondaries data ->",e),d(e)}catch(e){s(!0),console.log(e)}})()}),[]),(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("section",{className:"agent-specific-property",children:[(0,o.jsx)("div",{className:"desktop-nav",children:(0,o.jsx)(a.Z,{navbarColour:"#FDF7F0"})}),(0,o.jsx)("div",{className:"mobile-nav",children:(0,o.jsx)(t.Z,{setProfileContent:u,profileContent:m,profileDetail:j,setProfileDetail:x})}),(0,o.jsx)("div",{className:"go-back-button"}),(0,o.jsx)(r.Z,{setProfileDetail:x,variableSide:g,setProfileContent:u,setVariableSide:p}),l?(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("section",{className:"single-school-profile",children:[(0,o.jsxs)("div",{className:"school-core-info",children:[(0,o.jsxs)("div",{className:"info-left",children:[(0,o.jsx)("h1",{children:l[0].school_name}),(0,o.jsxs)("h3",{className:"normal",children:["\ud83d\udcc8 Ofsted: ",l[0].ofsted_results]}),(0,o.jsxs)("h3",{className:"normal",children:["\ud83c\udf93 ",l[0].students," students per year"]}),(0,o.jsxs)("h3",{className:"normal",children:["\ud83d\udc68\u200d\ud83d\udc67 Gender: ",l[0].gender]}),(0,o.jsxs)("h3",{className:"normal",children:["\ud83d\ude4f Faith: ",null===l[0].religion?"All":l[0].religion]}),(0,o.jsxs)("a",{href:l[0].school_url,target:"_blank",className:"website",rel:"noreferrer",children:["\ud83d\udcbb ",l[0].school_url]})]}),(0,o.jsx)("div",{className:"info-right",children:(0,o.jsx)("div",{className:"school-image",id:"secondary",style:{backgroundImage:null===l[0].image_url?void 0:`url(${l[0].image_url})`}})})]}),(0,o.jsxs)("div",{className:"school-academic-highlights",children:[(0,o.jsx)("h1",{children:"Academic highlights"}),(0,o.jsxs)("div",{className:"row",children:[(0,o.jsxs)("div",{className:"item",children:[(0,o.jsx)("div",{className:"circle",children:(0,o.jsxs)("h1",{children:[Math.round(100*(1-l[0].percentile))+1,"%"]})}),(0,o.jsxs)("p",{children:["In the top ",Math.round(100*(1-l[0].percentile))+1,"% of schools in London"]})]}),(0,o.jsxs)("div",{className:"item",children:[(0,o.jsx)("div",{className:"circle",children:(0,o.jsxs)("h1",{children:[Math.round(100*(1-l[0].borough_percentile))+1,"%"]})}),(0,o.jsxs)("p",{children:["In the top ",Math.round(100*(1-l[0].borough_percentile))+1,"% of schools in ",l[0].local_authority]})]}),(0,o.jsxs)("div",{className:"item",children:[(0,o.jsx)("div",{className:"circle",children:(0,o.jsx)("h1",{children:l[0].results.length})}),(0,o.jsxs)("p",{children:["Good curriculum with ",l[0].results.length," subjects"]})]})]})]}),(0,o.jsxs)("div",{className:"school-results",children:[(0,o.jsx)("h1",{children:"GCSE Results"}),(0,o.jsxs)("div",{className:"school-table-headers",children:[(0,o.jsx)("h5",{id:"column1",children:"#"}),(0,o.jsx)("h5",{id:"column2",children:"Subject"}),(0,o.jsx)("h5",{id:"column3",children:"Pass rate (%)"}),(0,o.jsx)("h5",{id:"column4",children:"A/ A* (%)"})]}),(0,o.jsx)("div",{className:"school-table-details",children:l[0].results.map(((e,s)=>(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("div",{className:"school-content",children:[(0,o.jsx)("div",{className:"column",id:"column1",children:(0,o.jsx)("h5",{children:s+1})}),(0,o.jsx)("div",{className:"column",id:"column2",children:(0,o.jsx)("h5",{children:e.subject})}),(0,o.jsx)("div",{className:"column",id:"column3",children:(0,o.jsx)("h5",{children:Math.round(e.pass_rate)})}),(0,o.jsx)("div",{className:"column",id:"column4",children:(0,o.jsx)("h5",{children:Math.round(e.top_rate)})})]}),(0,o.jsx)("hr",{className:"dividing-line"})]})))})]})]})}):""]})})}}}]);
//# sourceMappingURL=107.742a22e5.chunk.js.3d0404a0fcd9.map