"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[901],{70901:function(e,s,a){a.r(s),a.d(s,{default:function(){return u}});var n=a(88465),i=a(99696),t=a(31243),o=a(72791),r=a(82570),c=a(25994),l=a(80184);var d=e=>{let{agentShow:s,handleAgentClose:a,handleAgentShow:n,submitError:i,handleChange:t,handleSubmit:o,agentSubmitted:r}=e;return(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(c.Z,{show:s,onHide:a,backdrop:"static",className:"agent-modal",children:(0,l.jsx)(c.Z.Body,{children:(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("div",{className:"header-section",children:[(0,l.jsx)("h3",{children:"\ud83d\udcdd Share some details so we can contact you"}),(0,l.jsx)("h3",{className:"close-button",onClick:a,children:"x"})]}),(0,l.jsxs)("div",{className:"body-section",children:[(0,l.jsxs)("div",{className:"body-row",children:[(0,l.jsx)("h4",{children:"Name"}),(0,l.jsx)("input",{name:"name",onChange:t}),i.name&&(0,l.jsxs)("p",{className:"error",children:["* ",i.name]})]}),(0,l.jsxs)("div",{className:"body-row",children:[(0,l.jsx)("h4",{children:"Email"}),(0,l.jsx)("input",{name:"email",onChange:t}),i.email&&(0,l.jsxs)("p",{className:"error",children:["* ",i.email]})]}),(0,l.jsxs)("div",{className:"body-row",children:[(0,l.jsx)("h4",{children:"Company"}),(0,l.jsx)("input",{name:"company",onChange:t}),i.company&&(0,l.jsxs)("p",{className:"error",children:["* ",i.company]})]}),(0,l.jsxs)("div",{className:"body-row",children:[(0,l.jsx)("h4",{children:"Position"}),(0,l.jsx)("input",{name:"position",onChange:t}),i.position&&(0,l.jsxs)("p",{className:"error",children:["* ",i.position]})]})]}),(0,l.jsx)("button",{className:"waitlist-close",onClick:o,children:"Submit"}),i.post&&(0,l.jsxs)("p",{className:"error",id:"submit",children:["* ",i.post]})]})})})})};var m=e=>{let{handleSubmitClose:s,handleSubmitShow:a,agentSubmittedShow:n}=e;return(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(c.Z,{show:n,onHide:s,backdrop:"static",className:"agent-success-modal",children:(0,l.jsx)(c.Z.Body,{children:(0,l.jsxs)("div",{className:"agent-signed-up",children:[(0,l.jsx)("h3",{children:"\ud83e\udd1d thanks, we'll be in touch soon to discuss"}),(0,l.jsx)("button",{className:"waitlist-close",onClick:s,children:"Close"})]})})})})},h=a(16129);var u=()=>{(0,o.useEffect)((()=>{h.ZP.pageview(window.location.pathname)}),[]);const[e,s]=(0,o.useState)(!1),[a,c]=(0,o.useState)(!1),[u,x]=(0,o.useState)({email:"",name:"",company:""}),[p,j]=(0,o.useState)({email:"",name:"",company:"",position:"",post:""}),[g,y]=(0,o.useState)(!1),[v,b]=(0,o.useState)(!1),N=()=>{b(!1),j(!1),c(!1),x(!1)},w=e=>{c(!1),b(!0)},[S,f]=(0,o.useState)(!1),C=e=>{f(!0)};return(0,l.jsx)(l.Fragment,{children:(0,l.jsx)("section",{className:"homepage-wrapper",children:(0,l.jsxs)("section",{className:"agents-home",children:[(0,l.jsx)(i.Z,{}),(0,l.jsxs)("section",{className:"agent-top-section",children:[(0,l.jsx)("h3",{children:"Wittle sales companion. Loved by estate agents."}),(0,l.jsx)("h1",{children:"Impress your customers and supercharge your property sales"}),(0,l.jsx)("h5",{children:"In one click, get access to all the information you need to deliver exceptional value to your customers and increase your sales."}),(0,l.jsx)("button",{className:"agent-access",onClick:w,children:"Get early access for free"}),(0,l.jsx)(d,{agentShow:v,handleAgentClose:N,handleAgentShow:w,submitError:p,handleChange:e=>{x({...u,[e.target.name]:e.target.value}),"name"===e.target.name?e.target.value.length<1?j({...p,name:"Add name"}):j({...p,name:""}):"email"===e.target.name?(0,r.isEmail)(u.email)?j({...p,email:""}):j({...p,email:"Invalid email address"}):"company"===e.target.name?e.target.value.length<1?j({...p,company:"Add company"}):j({...p,company:""}):"position"===e.target.name&&(e.target.value.length<1?j({...p,position:"Add position"}):j({...p,position:""}))},handleSubmit:async e=>{e.preventDefault();try{const{data:e}=await t.Z.post("/api/agentsignup/",u);N(),c(!0),C(),x(!1)}catch(s){j({...p,post:"Make sure you've populated all fields before you submit"})}},agentSubmitted:a,handleSubmitShow:C}),(0,l.jsx)(m,{handleSubmitClose:()=>{f(!1),j(!1),c(!1)},agentSubmittedShow:S,handleSubmitShow:C})]}),(0,l.jsxs)("section",{className:"agent-image-section",children:[(0,l.jsx)("div",{className:"agent-portal-image",id:"agent1"}),(0,l.jsx)("div",{className:"agent-portal-image",id:"agent2"}),(0,l.jsx)("div",{className:"agent-portal-image",id:"agent3"})]}),(0,l.jsxs)("section",{className:"agent-detail-section",children:[(0,l.jsx)("div",{className:"agent-summary",children:(0,l.jsx)("h3",{children:"In seconds, get access to 40,000 data points which are converted to usable insights, giving you what you need for quality sales conversations that help you stand out from the crowd."})}),(0,l.jsxs)("div",{className:"agent-summary-stats",children:[(0,l.jsxs)("div",{className:"summary-row",id:"row1",children:[(0,l.jsxs)("div",{className:"summary-box",children:[(0,l.jsx)("div",{className:"summary-icon",id:"icon1"}),(0,l.jsx)("h3",{children:"Summarise properties"}),(0,l.jsx)("p",{children:"Get a summary of everything there is to know about a property across 20+ variables."})]}),(0,l.jsxs)("div",{className:"summary-box",children:[(0,l.jsx)("div",{className:"summary-icon",id:"icon2"}),(0,l.jsx)("h3",{children:"Get detailed insights"}),(0,l.jsx)("p",{children:"Drill down into each variable to understand more."})]})]}),(0,l.jsxs)("div",{className:"summary-row",id:"row2",children:[(0,l.jsxs)("div",{className:"summary-box",children:[(0,l.jsx)("div",{className:"summary-icon",id:"icon3"}),(0,l.jsx)("h3",{children:"Compare performance"}),(0,l.jsx)("p",{children:"See how the property or local area compares to other properties and areas in London."})]}),(0,l.jsxs)("div",{className:"summary-box",children:[(0,l.jsx)("div",{className:"summary-icon",id:"icon4"}),(0,l.jsx)("h3",{children:"Customise views"}),(0,l.jsx)("p",{children:"Create customised summaries of properties based on the things your clients care about the most."})]})]}),(0,l.jsxs)("div",{className:"summary-row",id:"row3",children:[(0,l.jsxs)("div",{className:"summary-box",children:[(0,l.jsx)("div",{className:"summary-icon",id:"icon5"}),(0,l.jsx)("h3",{children:"Enable better conversations"}),(0,l.jsx)("p",{children:"Unlock the ability for every agent to have a high quality conversation with every potential customer."})]}),(0,l.jsxs)("div",{className:"summary-box",children:[(0,l.jsx)("div",{className:"summary-icon",id:"icon6"}),(0,l.jsx)("h3",{children:"Generate efficiencies"}),(0,l.jsx)("p",{children:"Spend less time researching and more time having effective conversations."})]})]})]})]}),(0,l.jsx)("section",{className:"agent-bottom",children:(0,l.jsx)("button",{className:"agent-access",onClick:w,children:"Get early access for free"})}),(0,l.jsx)(n.Z,{textColour:"#051885"})]})})})}},88465:function(e,s,a){var n=a(80184);s.Z=e=>{let{textColour:s,pageType:a}=e;return(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("section",{className:"website-footer no-print",id:a,children:[(0,n.jsx)("p",{style:{color:s},children:"Wittle Technology Limited is a registered company in England and Wales with corporation number 14326945."}),(0,n.jsx)("p",{style:{color:s},children:"Copyright \xa9 Wittle Technology Limited. All rights reserved."})]})})}}}]);
//# sourceMappingURL=901.c91b01a9.chunk.js.map