"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[993],{3993:function(e,s,a){a.r(s);var t=a(2791),n=a(5294),l=a(7689),o=(a(9696),a(184));s.default=()=>{const[e,s]=(0,t.useState)(""),[a,r]=(0,t.useState)(""),[i,c]=(0,t.useState)(""),d=(0,l.TH)(),u=(0,l.s0)(),[p,h]=(0,t.useState)(null),[g,w]=(0,t.useState)(null);(0,t.useEffect)((()=>{const e=new URLSearchParams(d.search),s=e.get("uid"),a=e.get("token");h(s),w(a),s&&a||u("/")}),[d]);return(0,o.jsx)(o.Fragment,{children:(0,o.jsx)("div",{className:"login-page",children:(0,o.jsxs)("div",{className:"login-content",children:[(0,o.jsx)("div",{className:"logo-section",children:(0,o.jsx)("div",{className:"wittle-logo",onClick:()=>u("/")})}),(0,o.jsx)("h1",{children:"Reset Password"}),(0,o.jsxs)("div",{className:"input-section",children:[(0,o.jsxs)("div",{className:"login-input",children:[(0,o.jsx)("p",{children:"New Password"}),(0,o.jsx)("input",{type:"password",name:"password",value:e,onChange:e=>{s(e.target.value),console.log(e.target.value)},required:!0})]}),(0,o.jsxs)("div",{className:"login-input",children:[(0,o.jsx)("p",{children:"Confirm New Password"}),(0,o.jsx)("input",{type:"password",name:"confirmPassword",value:a,onChange:e=>{r(e.target.value),console.log(e.target.value)},required:!0})]}),i&&(0,o.jsxs)("p",{className:"error1",children:["*",i]})]}),(0,o.jsx)("button",{className:"sign-up",type:"submit",onClick:async s=>{if(s.preventDefault(),e===a)try{console.log({uid:p,token:g,passwordValue:e});const s=await n.Z.post("api/auth/password-reset/",{uid:p,token:g,password:e});c(s.data.message),u("/login")}catch(t){console.error(t)}else c("Passwords do not match.")},children:"Set New Password"})]})})})}}}]);
//# sourceMappingURL=993.6eadc4b2.chunk.js.80c30d4fcdb6.map