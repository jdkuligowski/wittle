"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[710],{15710:function(e,a,s){s.r(a);var t=s(72791),n=s(31243),r=s(57689),i=s(11087),l=s(82570),o=s(99696),m=s(80184);a.default=()=>{(0,r.s0)();const[e,a]=(0,t.useState)("password"),[s,c]=(0,t.useState)("password"),[d,p]=(0,t.useState)(!1),[u,h]=(0,t.useState)(!1),[w,g]=(0,t.useState)({email:"",username:"",password:"",password_confirmation:"",first_name:"",last_name:""}),[x,f]=(0,t.useState)({email:"",username:"",password:"",password_confirmation:"",first_name:"",last_name:"",post:""}),j=e=>{if(g({...w,[e.target.name]:e.target.value}),"first_name"===e.target.name)e.target.value.length<1?f({...x,first_name:"Add first name"}):f({...x,first_name:""});else if("last_name"===e.target.name)e.target.value.length<1?f({...x,last_name:"Add last name"}):f({...x,last_name:""});else if("email"===e.target.name)(0,l.isEmail)(w.email)?f({...x,email:""}):f({...x,email:"Invalid email address"});else if("username"===e.target.name)e.target.value.length<1?f({...x,username:"Add username"}):f({...x,username:""});else if("password"===e.target.name){const a=(e=>{const a=(0,l.matches)(e,/[A-Z]/),s=(0,l.matches)(e,/[a-z]/),t=(0,l.matches)(e,/\d/),n=(0,l.matches)(e,/[^A-Za-z0-9]/);return(0,l.isLength)(e,{min:8})?a?s?t?n?"":"Password must contain at least one special character":"Password must contain at least one digit":"Password must contain at least one lowercase letter":"Password must contain at least one uppercase letter":"Password must be at least 8 characters long"})(e.target.value);f({...x,password:a})}else"password_confirmation"===e.target.name&&(e.target.value!==w.password?f({...x,password_confirmation:"Passwords don't match"}):f({...x,password_confirmation:""}))};return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(o.Z,{navbarColour:"#051885"}),(0,m.jsx)("section",{className:"login-page",children:(0,m.jsxs)("section",{className:"wrapper",children:[(0,m.jsx)("section",{className:"register-content",children:(0,m.jsxs)("form",{className:"form-detail",onSubmit:async e=>{e.preventDefault();try{await n.Z.post("/api/auth/register/",w);const{data:e}=await n.Z.post("/api/auth/login/",w);a=e.token,window.localStorage.setItem("wittle-user-token",a),window.localStorage.setItem("wittle-username",e.username),console.log("username ->",e.username),h(!1),g()}catch(s){console.log(s),f({...x,post:"Wittle account with this email already exists"})}var a},children:[(0,m.jsx)("div",{className:"register-title",children:(0,m.jsx)("h1",{children:"Unlock the benefits of Wittle"})}),(0,m.jsx)("p",{children:"First name"}),(0,m.jsx)("input",{type:"text",name:"first_name",className:"input",value:w.first_name,onChange:j}),x.first_name&&(0,m.jsxs)("p",{className:"error",children:["* ",x.first_name]}),(0,m.jsx)("p",{children:"Last name"}),(0,m.jsx)("input",{type:"text",name:"last_name",className:"input",value:w.last_name,onChange:j}),x.last_name&&(0,m.jsxs)("p",{className:"error",children:["* ",x.last_name]}),(0,m.jsx)("p",{children:"Email"}),(0,m.jsx)("input",{type:"email",name:"email",className:"input",value:w.email,onChange:j}),x.email&&(0,m.jsxs)("p",{className:"error",children:["* ",x.email]}),(0,m.jsx)("p",{children:"Username"}),(0,m.jsx)("input",{type:"text",name:"username",className:"input",value:w.username,onChange:j}),x.username&&(0,m.jsxs)("p",{className:"error",children:["* ",x.username]}),(0,m.jsx)("p",{children:"Password"}),(0,m.jsxs)("div",{className:"login-input",children:[(0,m.jsx)("input",{type:s,name:"password",className:"password-input-register",value:w.password,onChange:j}),(0,m.jsx)("div",{className:"password-icon-container",onClick:()=>{c("password"===s?"text":"password")},children:(0,m.jsx)("div",{className:"password-icon"})})]}),x.password&&(0,m.jsxs)("p",{className:"error",children:["* ",x.password]}),(0,m.jsx)("p",{children:"Confirm password"}),(0,m.jsx)("input",{type:"password",name:"password_confirmation",className:"input",value:w.password_confirmation,onChange:j}),x.password_confirmation&&(0,m.jsxs)("p",{className:"error",children:["* ",x.password_confirmation]}),(0,m.jsx)("button",{type:"submit",children:"Register"}),x.post&&(0,m.jsxs)("p",{className:"error",children:["* ",x.post]})]})}),(0,m.jsxs)("h5",{children:["Already have an account? ",(0,m.jsx)(i.rU,{to:"/login",children:(0,m.jsx)("span",{children:"Login"})})," "]})]})})]})}}}]);
//# sourceMappingURL=710.87ee8aad.chunk.js.map