"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[955],{37459:function(e,s,t){t.r(s);var i=t(42524),a=t(65293),l=t(28381),n=t(95325),o=(t(19895),t(5790),t(61505)),r=t(19856),c=t(11535),d=t(2532),h=t(29343);s.default=()=>{(0,l.useEffect)((()=>{d.ZP.pageview(window.location.pathname)}),[]);const e=(0,i.s0)(),[s,t]=(0,l.useState)(!1),[m,u]=(0,l.useState)(!1),[p,x]=(0,l.useState)(!1),[j,w]=(0,l.useState)(!1),g=()=>{x(!1)},[y,b]=(0,l.useState)({email:"",channel:"consumer",preferences:!1}),[v,N]=(0,l.useState)(!1),f=e=>{b({...y,[e.target.name]:e.target.value.toLowerCase()})};(0,l.useEffect)((()=>{(0,c.isEmail)(y.email)?(N(!0),t(!1)):(0,c.isEmail)(y.email)||N(!1)}),[y.email]);const C=async e=>{t(!1),e.preventDefault(),d.ZP.event({category:"User",action:"Clicked Button",label:"Submit join waitlist"});try{const{data:e}=await a.ZP.post("/api/waitlist/",y);u(!0)}catch(s){t(!0)}};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("head",{children:[(0,h.jsx)("title",{children:"Wittle"}),(0,h.jsx)("meta",{name:"description",content:"Wittle helps you find properties based on things you care about. Tell us about your lifestyle and we'll find a property that suits."}),(0,h.jsx)("meta",{property:"og:type",content:"website"}),(0,h.jsx)("meta",{property:"og:url",content:"https://www.wittle.co/"}),(0,h.jsx)("meta",{property:"og:title",content:"Wittle"}),(0,h.jsx)("meta",{property:"og:description",content:"Wittle helps you find properties based on things you care about. Tell us about your lifestyle and we'll find a property that suits."}),(0,h.jsx)("meta",{property:"twitter:url",content:"https://www.wittle.co/"}),(0,h.jsx)("meta",{property:"twitter:title",content:"Wittle"}),(0,h.jsx)("meta",{property:"twitter:description",content:"Wittle helps you find properties based on things you care about. Tell us about your lifestyle and we'll find a property that suits."})]}),(0,h.jsx)(h.Fragment,{children:(0,h.jsx)("section",{className:"homepage-wrapper",children:(0,h.jsxs)("section",{className:"website-opening",children:[(0,h.jsx)(n.Z,{}),(0,h.jsxs)("section",{className:"content-wrapper",children:[(0,h.jsx)("div",{className:"headline-title-section",children:(0,h.jsxs)("div",{className:"headline-top",children:[(0,h.jsx)("h1",{children:"Matchmaking Homes and Lifestyles."}),(0,h.jsx)("h4",{children:"Find a home that suits your interests in an area that you love - because you can't renovate a location."}),(0,h.jsx)("h5",{children:"Wittle is revolutionising the way you search for properties. Launching soon \ud83d\ude80"}),(0,h.jsxs)("div",{className:"waitlist-consumer",children:[(0,h.jsx)("input",{className:"waitlist-email",name:"email",placeholder:"\u2709\ufe0f Join the waitlist",onChange:f}),(0,h.jsx)("button",{className:"consumer-sign-up",onClick:async e=>{e.preventDefault(),u(!1),x(!0),d.ZP.event({category:"User",action:"Clicked Button",label:"Join waitlist"});try{await a.ZP.post("/api/waitlist/check-email/",y);w(!0)}catch(s){console.error("An error occurred while making the request:",s),s.response&&w(!1)}},children:"Join"}),(0,h.jsx)(r.Z,{waitlistShow:p,handleWaitlistClose:g,validEmail:v,errors:s,handleSubmit:C,handleChange:f,complete:m,emailExists:j})]})]})}),(0,h.jsx)("div",{className:"consumer-process",children:(0,h.jsxs)("div",{className:"process-steps",children:[(0,h.jsxs)("div",{className:"process-item",children:[(0,h.jsx)("div",{className:"process-screen",id:"screen1"}),(0,h.jsx)("h5",{children:"Start by telling us what matters to you"})]}),(0,h.jsxs)("div",{className:"process-item",children:[(0,h.jsx)("div",{className:"process-screen",id:"screen2"}),(0,h.jsx)("h5",{children:"Flesh it out... what food, what vibe, how far?"})]}),(0,h.jsxs)("div",{className:"process-item",children:[(0,h.jsx)("div",{className:"process-screen",id:"screen3"}),(0,h.jsx)("h5",{children:"...and we'll Wittle it down for you, giving you unparalelled insights..."})]}),(0,h.jsxs)("div",{className:"process-item",children:[(0,h.jsx)("div",{className:"process-screen",id:"screen4"}),(0,h.jsx)("h5",{children:"...then we'll help you decide on the perfect home."})]})]})}),(0,h.jsxs)("section",{className:"blog-section-summary",children:[(0,h.jsx)("h1",{className:"blog-section-title",children:"Insights"}),(0,h.jsx)("div",{className:"blog-list",children:(0,h.jsxs)("div",{className:"blog-item",onClick:()=>e("/blogs/school-search-simplified"),children:[(0,h.jsx)("div",{className:"blog-image"}),(0,h.jsx)("h3",{className:"blog-item-summary",children:"School Search Simplified: An In-Depth Analysis of London's Primary Schools"})]})})]}),(0,h.jsx)("section",{className:"consumer-bottom",children:(0,h.jsxs)("div",{className:"waitlist-consumer",children:[(0,h.jsx)("input",{className:"waitlist-email",name:"email",placeholder:"\u2709\ufe0f Join the waitlist",onChange:f}),(0,h.jsx)("button",{className:"consumer-sign-up",onClick:e=>{t(!0),u(!1),x(!0)},children:"Join"}),(0,h.jsx)(r.Z,{waitlistShow:p,handleWaitlistClose:g,validEmail:v,errors:s,handleSubmit:C,handleChange:f,complete:m,emailExists:j})]})}),(0,h.jsx)(o.Z,{textColour:"#FFA7E5"})]})]})})})]})}},19856:function(e,s,t){t(28381);var i=t(20904),a=t(29343);s.Z=e=>{let{waitlistShow:s,handleWaitlistClose:t,validEmail:l,errors:n,handleSubmit:o,handleChange:r,complete:c,emailExists:d}=e;return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(i.Z,{show:s,onHide:t,backdrop:"static",className:"waitlist-modal",children:(0,a.jsx)(i.Z.Body,{children:(0,a.jsx)("div",{className:"body-section",children:!l||d||c?l?d?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("h3",{children:"\ud83d\ude2c This email address is already in use. Try another one!"}),(0,a.jsx)("button",{className:"waitlist-close",onClick:t,children:"Close"})]}):c?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("h3",{children:"\ud83d\udcaa Done! It won't be long until you're Wittling, we promise. Stay tuned to your emails."}),(0,a.jsx)("button",{className:"waitlist-close",onClick:t,children:"Close"})]}):null:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("h3",{children:" \ud83d\ude2c Looks like that email isn't valid."}),(0,a.jsx)("button",{className:"waitlist-close",onClick:t,children:"Close"})]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("h2",{children:"One last thing..."}),(0,a.jsxs)("div",{className:"preferences",children:[(0,a.jsx)("h3",{children:"Please check this box if you want to receive updates about Wittle"}),(0,a.jsx)("input",{type:"checkbox",name:"preferences",defaultChecked:!1,onChange:r})]}),(0,a.jsx)("button",{className:"waitlist-close",onClick:o,children:"Submit"})]})})})})})}},61505:function(e,s,t){var i=t(29343);s.Z=e=>{let{textColour:s,pageType:t}=e;return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("section",{className:"website-footer no-print",id:t,children:[(0,i.jsx)("p",{style:{color:s},children:"Wittle Technology Limited is a registered company in England and Wales with corporation number 14326945."}),(0,i.jsx)("p",{style:{color:s},children:"Copyright \xa9 Wittle Technology Limited. All rights reserved."})]})})}},95325:function(e,s,t){var i=t(42524),a=t(28381),l=(t(65293),t(63762),t(11535),t(31824)),n=t(29343);s.Z=e=>{let{navbarColour:s}=e;const t=(0,i.s0)(),[o,r]=((0,a.useRef)(null),(0,a.useState)(!1)),[c,d]=(0,a.useState)({email:"",password:"",passwordConfirmation:""}),[h,m]=(0,a.useState)("password"),[u,p]=(0,a.useState)("password"),[x,j]=(0,a.useState)(!1),[w,g]=(0,a.useState)(!1),[y,b]=(0,a.useState)({email:"",username:"",password:"",password_confirmation:"",first_name:"",last_name:""}),[v,N]=(0,a.useState)({email:"",username:"",password:"",password_confirmation:"",first_name:"",last_name:"",post:""});return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("section",{className:"nav-section",style:{backgroundColor:s},children:[(0,n.jsxs)("div",{className:"left-section",children:[(0,n.jsx)("div",{className:"logo",children:(0,n.jsx)("h2",{onClick:()=>t("/"),children:"Wittle"})}),(0,n.jsx)("h4",{onClick:()=>t("/agents"),className:"agent-button",children:"For agents"})]}),(0,n.jsx)("div",{className:"menu-container",onClick:()=>{j(!0)},children:(0,n.jsx)("div",{className:"menu-trigger",children:(0,n.jsx)("span",{children:(0,n.jsxs)("div",{className:"burger-icon",children:[(0,n.jsx)("hr",{className:"burger-icon-line"}),(0,n.jsx)("hr",{className:"burger-icon-line"}),(0,n.jsx)("hr",{className:"burger-icon-line"})]})})})})]}),(0,n.jsx)(l.Z,{menuShow:x,setMenuShow:j,handleMenuClose:()=>{j(!1)},removeItemFromStorage:e=>{localStorage.removeItem("wittle-user-token"),localStorage.removeItem("wittle-username"),window.location.reload(),r(!1)}})]})}}}]);
//# sourceMappingURL=955.0845b2c0.chunk.js.d22c61c219b2.map