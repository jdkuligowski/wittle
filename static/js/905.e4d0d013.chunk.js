"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[905,177],{74177:function(t,e,i){i(72791);var o=i(80184);e.Z=()=>(0,o.jsx)("div",{className:"loading-gif",children:(0,o.jsx)("img",{src:i(57837),alt:"loading gif"})})},76289:function(t,e,i){i.r(e);var o=i(72791),s=i(31243),n=i(57689),a=i(97165),r=i(78084),l=i(60764),c=i(52094),h=i(3573),d=i(80184);e.default=()=>{const t=(0,n.s0)(),[e,i]=(0,o.useState)("Comparison"),[u,p]=(0,o.useState)("Comparison"),[f,m]=(0,o.useState)(""),[v,b]=(0,o.useState)("Home"),[g,y]=(0,o.useState)("Properties"),[x,w]=(0,o.useState)(!1),[k,j]=(0,o.useState)(),[S,C]=(0,o.useState)(),N=()=>{if((0,a.Hb)()){(async()=>{try{const{data:t}=await s.Z.get(`/api/auth/profile/${(0,a.Nh)()}/`,{headers:{Authorization:`Bearer ${(0,a.hP)()}`}});console.log("user data ->",t),j(t)}catch(t){C(!0),console.log(t)}})()}else t("/access-denied"),console.log("no account")};(0,o.useEffect)((()=>{N()}),[]);const D=e=>{localStorage.removeItem("wittle-user-token"),localStorage.removeItem("wittle-username"),t("/login")};return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)("section",{className:"agent-profile-page",children:[(0,d.jsx)("div",{className:"desktop-nav",children:(0,d.jsx)(l.Z,{navbarColour:"#FDF7F0"})}),(0,d.jsx)("div",{className:"mobile-nav",children:(0,d.jsx)(r.Z,{setProfileContent:i,profileContent:e,profileDetail:u,setProfileDetail:p})}),(0,d.jsx)(c.Z,{setProfileDetail:p,variableSide:x,setProfileContent:i,setVariableSide:w,userData:k}),k&&"Trial expired"===k.usage_stats[0].package?(0,d.jsx)("section",{className:"main-body remove-margin",children:(0,d.jsx)("section",{className:"main-body-details",children:(0,d.jsxs)("section",{className:"listing-generator",children:[(0,d.jsxs)("div",{className:"listing-options",children:[(0,d.jsx)("div",{className:"listing-buttons"}),(0,d.jsx)("div",{className:"logout-button",onClick:D,children:(0,d.jsx)("div",{className:"logout-icon"})})]}),(0,d.jsxs)("div",{className:"no-access-body",children:[(0,d.jsx)("div",{className:"no-access-image"}),(0,d.jsx)("h1",{className:"no-access-title",children:"Oops! Dead end"}),(0,d.jsx)("h3",{className:"no-access-message",children:"You no longer have access to this content. Get in touch to upgrade your account and access the Wittle magic."})]})]})})}):(0,d.jsx)("section",{className:"main-body",children:(0,d.jsx)("section",{className:"main-body-details",children:(0,d.jsxs)("section",{className:"property-search",children:[(0,d.jsxs)("div",{className:"listing-options",children:[(0,d.jsxs)("div",{className:"listing-buttons",children:[(0,d.jsx)("h5",{className:"no-print",onClick:()=>b("Home"),style:{borderBottom:"Home"===v?"3px solid #ED6B86":"none",textUnderlineOffset:"Home"===v?"0.5em":"initial",fontWeight:"Home"===v?"700":"400"},children:"Home"}),(0,d.jsx)("h5",{className:"no-print",onClick:()=>b("Client view"),style:{borderBottom:"Client view"===v?"3px solid #ED6B86":"none",textUnderlineOffset:"Client view"===v?"0.5em":"initial",fontWeight:"Client view"===v?"700":"400"},children:"Client view"}),(0,d.jsx)("h5",{className:"no-print",onClick:()=>b("Personal view"),style:{borderBottom:"Personal view"===v?"3px solid #ED6B86":"none",textUnderlineOffset:"Personal view"===v?"0.5em":"initial",fontWeight:"Personal view"===v?"700":"400"},children:"Personal view"})]}),(0,d.jsx)("div",{className:"logout-button",onClick:D,children:(0,d.jsx)("div",{className:"logout-icon"})})]}),(0,d.jsx)("hr",{className:"title-line"}),"Home"===v||"Client view"===v?"":"Personal view"===v?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"section-selectors",children:[(0,d.jsx)("h3",{className:"selector-button "+("Properties"===g?"active":"inactive"),id:"left",onClick:()=>y("Properties"),children:"Properties"}),(0,d.jsx)("h3",{className:"selector-button "+("Saved properties"===g?"active":"inactive"),id:"middle",onClick:()=>y("Saved properties"),children:"Saved properties"}),(0,d.jsx)("h3",{className:"selector-button "+("Saved searches"===g?"active":"inactive"),id:"right",onClick:()=>y("Saved searches"),children:"Saved searches"})]}),"Properties"===g?(0,d.jsx)(h.Z,{userData:k,loadUserData:N,setListingSelection:m}):"Saved properties"===g||"Saved searches"===g?(0,d.jsx)(d.Fragment,{}):""]}):""]})})})]})})}},57837:function(t,e,i){t.exports=i.p+"static/media/new-loading.a788dadda3b120785a81.gif"},67842:function(t,e,i){i.d(e,{Z:function(){return c}});var o=i(72791);function s(){return s=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o])}return t},s.apply(this,arguments)}var n=o.createElement("svg",{viewBox:"-2 -5 14 20",height:"100%",width:"100%",style:{position:"absolute",top:0}},o.createElement("path",{d:"M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",fill:"#fff",fillRule:"evenodd"})),a=o.createElement("svg",{height:"100%",width:"100%",viewBox:"-2 -5 17 21",style:{position:"absolute",top:0}},o.createElement("path",{d:"M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",fill:"#fff",fillRule:"evenodd"}));function r(t){if(7===t.length)return t;for(var e="#",i=1;i<4;i+=1)e+=t[i]+t[i];return e}function l(t,e,i,o,s){return function(t,e,i,o,s){var n=(t-i)/(e-i);if(0===n)return o;if(1===n)return s;for(var a="#",r=1;r<6;r+=2){var l=parseInt(o.substr(r,2),16),c=parseInt(s.substr(r,2),16),h=Math.round((1-n)*l+n*c).toString(16);1===h.length&&(h="0"+h),a+=h}return a}(t,e,i,r(o),r(s))}var c=function(t){function e(e){t.call(this,e);var i=e.height,o=e.width,s=e.checked;this.t=e.handleDiameter||i-2,this.i=Math.max(o-i,o-(i+this.t)/2),this.o=Math.max(0,(i-this.t)/2),this.state={h:s?this.i:this.o},this.l=0,this.u=0,this.p=this.p.bind(this),this.v=this.v.bind(this),this.g=this.g.bind(this),this.k=this.k.bind(this),this.m=this.m.bind(this),this.M=this.M.bind(this),this.T=this.T.bind(this),this.$=this.$.bind(this),this.C=this.C.bind(this),this.D=this.D.bind(this),this.O=this.O.bind(this),this.S=this.S.bind(this)}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.componentDidMount=function(){this.W=!0},e.prototype.componentDidUpdate=function(t){t.checked!==this.props.checked&&this.setState({h:this.props.checked?this.i:this.o})},e.prototype.componentWillUnmount=function(){this.W=!1},e.prototype.I=function(t){this.H.focus(),this.setState({R:t,j:!0,B:Date.now()})},e.prototype.L=function(t){var e=this.state,i=e.R,o=e.h,s=(this.props.checked?this.i:this.o)+t-i;e.N||t===i||this.setState({N:!0});var n=Math.min(this.i,Math.max(this.o,s));n!==o&&this.setState({h:n})},e.prototype.U=function(t){var e=this.state,i=e.h,o=e.N,s=e.B,n=this.props.checked,a=(this.i+this.o)/2;this.setState({h:this.props.checked?this.i:this.o});var r=Date.now()-s;(!o||r<250||n&&i<=a||!n&&i>=a)&&this.A(t),this.W&&this.setState({N:!1,j:!1}),this.l=Date.now()},e.prototype.p=function(t){t.preventDefault(),"number"==typeof t.button&&0!==t.button||(this.I(t.clientX),window.addEventListener("mousemove",this.v),window.addEventListener("mouseup",this.g))},e.prototype.v=function(t){t.preventDefault(),this.L(t.clientX)},e.prototype.g=function(t){this.U(t),window.removeEventListener("mousemove",this.v),window.removeEventListener("mouseup",this.g)},e.prototype.k=function(t){this.X=null,this.I(t.touches[0].clientX)},e.prototype.m=function(t){this.L(t.touches[0].clientX)},e.prototype.M=function(t){t.preventDefault(),this.U(t)},e.prototype.$=function(t){Date.now()-this.l>50&&(this.A(t),Date.now()-this.u>50&&this.W&&this.setState({j:!1}))},e.prototype.C=function(){this.u=Date.now()},e.prototype.D=function(){this.setState({j:!0})},e.prototype.O=function(){this.setState({j:!1})},e.prototype.S=function(t){this.H=t},e.prototype.T=function(t){t.preventDefault(),this.H.focus(),this.A(t),this.W&&this.setState({j:!1})},e.prototype.A=function(t){var e=this.props;(0,e.onChange)(!e.checked,t,e.id)},e.prototype.render=function(){var t=this.props,e=t.checked,i=t.disabled,n=t.className,a=t.offColor,r=t.onColor,c=t.offHandleColor,h=t.onHandleColor,d=t.checkedIcon,u=t.uncheckedIcon,p=t.checkedHandleIcon,f=t.uncheckedHandleIcon,m=t.boxShadow,v=t.activeBoxShadow,b=t.height,g=t.width,y=t.borderRadius,x=function(t,e){var i={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&-1===e.indexOf(o)&&(i[o]=t[o]);return i}(t,["checked","disabled","className","offColor","onColor","offHandleColor","onHandleColor","checkedIcon","uncheckedIcon","checkedHandleIcon","uncheckedHandleIcon","boxShadow","activeBoxShadow","height","width","borderRadius","handleDiameter"]),w=this.state,k=w.h,j=w.N,S=w.j,C={position:"relative",display:"inline-block",textAlign:"left",opacity:i?.5:1,direction:"ltr",borderRadius:b/2,WebkitTransition:"opacity 0.25s",MozTransition:"opacity 0.25s",transition:"opacity 0.25s",touchAction:"none",WebkitTapHighlightColor:"rgba(0, 0, 0, 0)",WebkitUserSelect:"none",MozUserSelect:"none",msUserSelect:"none",userSelect:"none"},N={height:b,width:g,margin:Math.max(0,(this.t-b)/2),position:"relative",background:l(k,this.i,this.o,a,r),borderRadius:"number"==typeof y?y:b/2,cursor:i?"default":"pointer",WebkitTransition:j?null:"background 0.25s",MozTransition:j?null:"background 0.25s",transition:j?null:"background 0.25s"},D={height:b,width:Math.min(1.5*b,g-(this.t+b)/2+1),position:"relative",opacity:(k-this.o)/(this.i-this.o),pointerEvents:"none",WebkitTransition:j?null:"opacity 0.25s",MozTransition:j?null:"opacity 0.25s",transition:j?null:"opacity 0.25s"},M={height:b,width:Math.min(1.5*b,g-(this.t+b)/2+1),position:"absolute",opacity:1-(k-this.o)/(this.i-this.o),right:0,top:0,pointerEvents:"none",WebkitTransition:j?null:"opacity 0.25s",MozTransition:j?null:"opacity 0.25s",transition:j?null:"opacity 0.25s"},E={height:this.t,width:this.t,background:l(k,this.i,this.o,c,h),display:"inline-block",cursor:i?"default":"pointer",borderRadius:"number"==typeof y?y-1:"50%",position:"absolute",transform:"translateX("+k+"px)",top:Math.max(0,(b-this.t)/2),outline:0,boxShadow:S?v:m,border:0,WebkitTransition:j?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s",MozTransition:j?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s",transition:j?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s"},T={height:this.t,width:this.t,opacity:Math.max(2*(1-(k-this.o)/(this.i-this.o)-.5),0),position:"absolute",left:0,top:0,pointerEvents:"none",WebkitTransition:j?null:"opacity 0.25s",MozTransition:j?null:"opacity 0.25s",transition:j?null:"opacity 0.25s"},H={height:this.t,width:this.t,opacity:Math.max(2*((k-this.o)/(this.i-this.o)-.5),0),position:"absolute",left:0,top:0,pointerEvents:"none",WebkitTransition:j?null:"opacity 0.25s",MozTransition:j?null:"opacity 0.25s",transition:j?null:"opacity 0.25s"};return o.createElement("div",{className:n,style:C},o.createElement("div",{className:"react-switch-bg",style:N,onClick:i?null:this.T,onMouseDown:function(t){return t.preventDefault()}},d&&o.createElement("div",{style:D},d),u&&o.createElement("div",{style:M},u)),o.createElement("div",{className:"react-switch-handle",style:E,onClick:function(t){return t.preventDefault()},onMouseDown:i?null:this.p,onTouchStart:i?null:this.k,onTouchMove:i?null:this.m,onTouchEnd:i?null:this.M,onTouchCancel:i?null:this.O},f&&o.createElement("div",{style:T},f),p&&o.createElement("div",{style:H},p)),o.createElement("input",s({},{type:"checkbox",role:"switch","aria-checked":e,checked:e,disabled:i,style:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",width:1}},x,{ref:this.S,onFocus:this.D,onBlur:this.O,onKeyUp:this.C,onChange:this.$})))},e}(o.Component);c.defaultProps={disabled:!1,offColor:"#888",onColor:"#080",offHandleColor:"#fff",onHandleColor:"#fff",uncheckedIcon:n,checkedIcon:a,boxShadow:null,activeBoxShadow:"0 0 2px 3px #3bf",height:28,width:56}}}]);
//# sourceMappingURL=905.e4d0d013.chunk.js.map