"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[533,85],{5533:function(e,a,n){n.r(a),n.d(a,{default:function(){return j}});var s=n(2791),t=n(5294),o=n(7689),i=n(2570),r=(n(9696),n(7462)),l=n(241),c=n(8003),m=n(1413),p=n(2982),d=n(5987),u=n(2723),g=["allowCreateWhileLoading","createOptionPosition","formatCreateLabel","isValidNewOption","getNewOptionData","onCreateOption","options","onChange"],h=function(){var e=arguments.length>1?arguments[1]:void 0,a=arguments.length>2?arguments[2]:void 0,n=String(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").toLowerCase(),s=String(a.getOptionValue(e)).toLowerCase(),t=String(a.getOptionLabel(e)).toLowerCase();return s===n||t===n},f={formatCreateLabel:function(e){return'Create "'.concat(e,'"')},isValidNewOption:function(e,a,n,s){return!(!e||a.some((function(a){return h(e,a,s)}))||n.some((function(a){return h(e,a,s)})))},getNewOptionData:function(e,a){return{label:a,value:e,__isNew__:!0}}};n(4164),n(1672);var w=(0,s.forwardRef)((function(e,a){var n=function(e){var a=e.allowCreateWhileLoading,n=void 0!==a&&a,t=e.createOptionPosition,o=void 0===t?"last":t,i=e.formatCreateLabel,r=void 0===i?f.formatCreateLabel:i,c=e.isValidNewOption,h=void 0===c?f.isValidNewOption:c,w=e.getNewOptionData,x=void 0===w?f.getNewOptionData:w,v=e.onCreateOption,j=e.options,_=void 0===j?[]:j,C=e.onChange,N=(0,d.Z)(e,g),y=N.getOptionValue,b=void 0===y?l.g:y,S=N.getOptionLabel,O=void 0===S?l.b:S,L=N.inputValue,F=N.isLoading,Z=N.isMulti,k=N.value,P=N.name,A=(0,s.useMemo)((function(){return h(L,(0,u.H)(k),_,{getOptionValue:b,getOptionLabel:O})?x(L,r(L)):void 0}),[r,x,O,b,L,h,_,k]),D=(0,s.useMemo)((function(){return!n&&F||!A?_:"first"===o?[A].concat((0,p.Z)(_)):[].concat((0,p.Z)(_),[A])}),[n,o,F,A,_]),V=(0,s.useCallback)((function(e,a){if("select-option"!==a.action)return C(e,a);var n=Array.isArray(e)?e:[e];if(n[n.length-1]!==A)C(e,a);else if(v)v(L);else{var s=x(L,L),t={action:"create-option",name:P,option:s};C((0,u.D)(Z,[].concat((0,p.Z)((0,u.H)(k)),[s]),s),t)}}),[x,L,Z,P,A,v,C,k]);return(0,m.Z)((0,m.Z)({},N),{},{options:D,onChange:V})}((0,c.u)(e));return s.createElement(l.S,(0,r.Z)({ref:a},n))})),x=n(4177),v=n(184);var j=()=>{const e=(0,o.s0)(),[a,n]=(0,s.useState)(!1),[r,l]=(0,s.useState)(),[c,m]=(0,s.useState)(null),[p,d]=(0,s.useState)([]);(0,s.useEffect)((()=>{(async()=>{try{const e="/api/branch_list/",{data:a}=await t.Z.get(e);console.log("agent list ->",a),l(a);const n=a.map((e=>({value:e.id,label:e.branch_name})));d(n),console.log("company list ->",n)}catch(e){console.log(e)}})()}),[]);const[u,g]=(0,s.useState)("password"),[h,f]=(0,s.useState)("password"),[j,_]=(0,s.useState)(!1),[C,N]=(0,s.useState)(!1),[y,b]=(0,s.useState)({email:"",username:"",company_name:"",password:"",password_confirmation:"",first_name:"",last_name:""}),[S,O]=(0,s.useState)({email:"",username:"",company_name:"",password:"",password_confirmation:"",first_name:"",last_name:"",post:""}),L=e=>{const{name:a,value:n}=e.target;if(b("email"===a?{...y,[a]:n.toLowerCase()}:{...y,[a]:n}),"password"===a){const e=(e=>{const a=(0,i.matches)(e,/[A-Z]/),n=(0,i.matches)(e,/[a-z]/),s=(0,i.matches)(e,/\d/),t=(0,i.matches)(e,/[^A-Za-z0-9]/);return(0,i.isLength)(e,{min:8})?a?n?s?t?"":"Password must contain at least one special character":"Password must contain at least one digit":"Password must contain at least one lowercase letter":"Password must contain at least one uppercase letter":"Password must be at least 8 characters long"})(n);O({...S,password:e})}else if("password_confirmation"===a){const e=n!==y.password?"Passwords don't match":"";O({...S,password_confirmation:e})}};return(0,v.jsx)(v.Fragment,{children:(0,v.jsx)("section",{className:"login-page",id:"register",children:(0,v.jsx)("section",{className:"login-content",children:a?(0,v.jsx)(x.Z,{}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("div",{className:"register-title",children:(0,v.jsx)("h1",{children:"Unlock the benefits of Wittle"})}),(0,v.jsxs)("div",{className:"register-section",children:[(0,v.jsxs)("div",{className:"login-input",children:[(0,v.jsx)("h3",{children:"First name"}),(0,v.jsx)("input",{type:"text",name:"first_name",className:"input",value:y.first_name,onChange:L}),S.first_name&&(0,v.jsxs)("p",{className:"error",children:["* ",S.first_name]})]}),(0,v.jsxs)("div",{className:"login-input",children:[(0,v.jsx)("h3",{children:"Last name"}),(0,v.jsx)("input",{type:"text",name:"last_name",className:"input",value:y.last_name,onChange:L}),S.last_name&&(0,v.jsxs)("p",{className:"error",children:["* ",S.last_name]})]}),(0,v.jsxs)("div",{className:"login-input",children:[(0,v.jsx)("h3",{children:"Company"}),(0,v.jsx)(w,{isClearable:!0,onChange:(e,a)=>{m(e);const n=e?e.label:"";b({...y,company_name:n})},options:p,value:c,styles:{control:e=>({...e,fontSize:"0.8rem",fontFamily:"Poppins",color:"#FDF7F0",borderColor:"#FDF7F0",borderRadius:"10px",backgroundColor:"#1A276C",padding:"0px 0px",minHeight:"35px"}),option:(e,a)=>({...e,color:a.isSelected?"white":"#333",backgroundColor:a.isSelected?"#1A276C":"white",fontSize:"0.8rem"}),singleValue:(e,a)=>({...e,color:"#FDF7F0",fontSize:"0.8rem",fontFamily:"Poppins",padding:"0px 0px"})},placeholder:"Select or add a company...",name:"company_name"}),S.company_name&&(0,v.jsxs)("p",{className:"error",children:["* ",S.company_name]})]}),(0,v.jsxs)("div",{className:"login-input",children:[(0,v.jsx)("h3",{children:"Username"}),(0,v.jsx)("input",{type:"text",name:"username",className:"input",value:y.username,onChange:L}),S.username&&(0,v.jsxs)("p",{className:"error",children:["* ",S.username]})]}),(0,v.jsxs)("div",{className:"login-input",children:[(0,v.jsx)("h3",{children:"Email"}),(0,v.jsx)("input",{type:"email",name:"email",className:"input",value:y.email,onChange:L}),S.email&&(0,v.jsxs)("p",{className:"error",children:["* ",S.email]})]}),(0,v.jsxs)("div",{className:"login-input",children:[(0,v.jsx)("h3",{children:"Password"}),(0,v.jsx)("input",{type:h,name:"password",className:"password-input-register",value:y.password,onChange:L}),S.password&&(0,v.jsxs)("p",{className:"error",children:["* ",S.password]})]}),(0,v.jsxs)("div",{className:"login-input",children:[(0,v.jsx)("h3",{children:"Confirm password"}),(0,v.jsx)("input",{type:"password",name:"password_confirmation",className:"input",value:y.password_confirmation,onChange:L}),S.password_confirmation&&(0,v.jsxs)("p",{className:"error",children:["* ",S.password_confirmation]})]})]}),(0,v.jsx)("button",{type:"submit",onClick:async a=>{a.preventDefault(),n(!0);const s={...S,first_name:y.first_name.length<1?"Add first name":"",last_name:y.last_name.length<1?"Add last name":"",company_name:y.company_name.length<1?"Add company":"",username:y.username.length<1?"Add username":"",email:(0,i.isEmail)(y.email)?"":"Invalid email address"};O(s);var o;if(!Object.values(s).some((e=>""!==e)))try{await t.Z.post("/api/auth/register/",y);const{data:a}=await t.Z.post("/api/auth/login/",{email:y.email,password:y.password});o=a.token,window.localStorage.setItem("wittle-user-token",o),window.localStorage.setItem("wittle-username",a.username),console.log("username ->",a.username),b({}),e("/agents/profile"),n(!1)}catch(r){console.log(r),n(!1),O({...S,post:"Error registering account. Username or email may already exist."})}},children:"Register"}),S.post&&(0,v.jsxs)("p",{className:"error",children:["* ",S.post]})]})})})})}},4177:function(e,a,n){n(2791);var s=n(184);a.Z=()=>(0,s.jsx)("div",{className:"loading-gif",children:(0,s.jsx)("img",{src:n(9193),alt:"loading gif"})})},9193:function(e,a,n){e.exports=n.p+"static/media/transparent-spinner.f3eb62caffaa8568ecbe.gif"}}]);
//# sourceMappingURL=533.766abdd5.chunk.js.3c6eba5580dc.map