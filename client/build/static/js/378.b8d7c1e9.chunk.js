(self.webpackChunkclient=self.webpackChunkclient||[]).push([[378,490],{78084:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(57689),o=n(72791);n(31243);n(55872),n(82570),n(7463);var i=n(80184);var a=e=>{let{setProfileContent:t,profileContent:n,profileDetail:a,setProfileDetail:s}=e;const c=(0,r.s0)(),[l,u]=((0,o.useRef)(null),(0,o.useState)(!1)),[f,d]=(0,o.useState)({email:"",password:"",passwordConfirmation:""}),[p,y]=(0,o.useState)("password"),[h,v]=(0,o.useState)("password"),[m,b]=(0,o.useState)(!1),[g,j]=(0,o.useState)(!1),[x,C]=(0,o.useState)({email:"",username:"",password:"",password_confirmation:"",first_name:"",last_name:""}),[k,w]=(0,o.useState)({email:"",username:"",password:"",password_confirmation:"",first_name:"",last_name:"",post:""}),[O,S]=(0,o.useState)("#051885"),[_,A]=(0,o.useState)("#FFA7E5"),[P,N]=(0,o.useState)("#FFA7E5");return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("section",{className:"centered-nav-bar",style:{backgroundColor:O},children:[(0,i.jsx)("section",{className:"top-section",children:(0,i.jsx)("div",{className:"logo",children:(0,i.jsx)("h2",{style:{color:_},onClick:()=>c("/"),children:"Wittle"})})}),(0,i.jsxs)("section",{className:"nav-slider",children:[(0,i.jsx)("h4",{style:{color:P,textDecoration:"My properties"===n?`underline 3px ${P}`:"",textUnderlineOffset:"My properties"===n?"5px":""},onClick:()=>{t("My properties"),s("My properties"),c("/agents/profile")},children:"MY PROPERTIES"}),(0,i.jsx)("h4",{style:{color:P,textDecoration:"Variables"===n?`underline 3px ${P}`:"",textUnderlineOffset:"Variables"===n?"5px":""},onClick:()=>{t("Variables"),s("Variables"),c("/agents/explore")},children:"EXPLORE"}),(0,i.jsx)("h4",{style:{color:P,textDecoration:"Comparison"===n?`underline 3px ${P}`:"",textUnderlineOffset:"Comparison"===n?"5px":""},onClick:()=>{t("Comparison"),s("Comparison"),c("/agents/compare")},children:"COMPARISON"}),(0,i.jsx)("h4",{style:{color:P,textDecoration:"Account"===n?`underline 3px ${P}`:"",textUnderlineOffset:"Account"===n?"5px":""},onClick:()=>{t("Account"),s("Account")},children:"ACCOUNT"})]})]})})}},60764:function(e,t,n){"use strict";var r=n(57689),o=(n(72791),n(97165)),i=(n(55872),n(7463),n(80184));t.Z=e=>{let{navbarColour:t}=e;const n=(0,r.s0)();return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("section",{className:"nav-section no-print",style:{backgroundColor:t},children:[(0,i.jsx)("div",{className:"left-section",children:(0,i.jsx)("div",{className:"logo",children:(0,i.jsx)("h2",{onClick:()=>n("/"),children:"Wittle"})})}),(0,o.Hb)()?(0,i.jsx)("div",{className:"menu-container",children:(0,i.jsx)("h3",{className:"cta",onClick:e=>{localStorage.removeItem("wittle-user-token"),localStorage.removeItem("wittle-username"),window.location.reload()},children:(0,i.jsx)("a",{children:"Sign out"})})}):(0,i.jsx)("div",{className:"menu-container",children:(0,i.jsx)("h3",{className:"cta",onClick:()=>n("/login"),children:(0,i.jsx)("a",{children:"Sign in"})})})]})})}},52094:function(e,t,n){"use strict";var r=n(57689),o=n(72791),i=(n(97165),n(31243),n(80184));t.Z=e=>{let{setProfileDetail:t,variableSide:n,setProfileContent:a,setVariableSide:s}=e;const c=(0,r.s0)(),[l,u]=(0,o.useState)(),[f,d]=(0,o.useState)(),[p,y]=(0,o.useState)(""),[h,v]=(0,o.useState)("Search");return(0,o.useEffect)((()=>{setTimeout((()=>{"Home"===p?c("/agents/profile"):"Saved items"===p&&c("/agents/favourites")}),100)}),[p]),(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("section",{className:"profile-sidebar-open no-print remove-margin",children:[(0,i.jsx)("div",{className:"logo-section",children:(0,i.jsx)("div",{className:"logo",onClick:()=>c("/")})}),(0,i.jsxs)("div",{className:"profile-buttons",children:[(0,i.jsxs)("div",{className:"profile-button-title "+("Home"===p?"active":""),onClick:()=>{y("Home"),setTimeout((()=>{t("Home"),a("Home")}),0)},children:[(0,i.jsx)("div",{className:"icon",id:"home-icon"}),(0,i.jsx)("h2",{children:"Wittle home"})]}),(0,i.jsxs)("div",{className:"profile-button-title "+("Listing generator"===p?"active":""),onClick:()=>{y("Listing generator"),t("Listing generator"),a("Listing generator"),c("/agents/listing-generator")},children:[(0,i.jsx)("div",{className:"icon",id:"listing-icon"}),(0,i.jsx)("h2",{children:"Listing generator"})]}),(0,i.jsxs)("div",{className:"profile-button-title "+("Lead generator test"===p?"active":""),onClick:()=>{y("Lead generator test"),a("Lead generator test"),t("Lead generator test"),c("/agents/lead-gen")},children:[(0,i.jsx)("div",{className:"icon",id:"finder-icon"}),(0,i.jsx)("h2",{children:"Lead generator"})]}),(0,i.jsxs)("div",{className:"profile-button-title "+("Saved items"===p?"active":""),onClick:()=>{y("Saved items"),setTimeout((()=>{t("Saved items"),a("Saved items")}),0)},children:[(0,i.jsx)("div",{className:"icon",id:"saved-icon"}),(0,i.jsx)("h2",{children:"My saved items"})]}),(0,i.jsxs)("div",{className:"profile-button-title "+("Account"===p?"active":""),onClick:()=>{y("Account"),a("Account"),t("Account"),c("/agents/account")},children:[(0,i.jsx)("div",{className:"icon",id:"account-icon"}),(0,i.jsx)("h2",{children:"Account details"})]})]})]})})}},98472:function(e,t,n){e.exports=n(23561)},98015:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(72791),a=(r=i)&&r.__esModule?r:{default:r},s=n(51509),c=n(58333);var l=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={},n}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"buildURI",value:function(){return s.buildURI.apply(void 0,arguments)}},{key:"componentDidMount",value:function(){var e=this.props,t=e.data,n=e.headers,r=e.separator,o=e.enclosingCharacter,i=e.uFEFF,a=e.target,s=e.specs,c=e.replace;this.state.page=window.open(this.buildURI(t,i,n,r,o),a,s,c)}},{key:"getWindow",value:function(){return this.state.page}},{key:"render",value:function(){return null}}]),t}(a.default.Component);l.defaultProps=Object.assign(c.defaultProps,{target:"_blank"}),l.propTypes=c.propTypes,t.default=l},39088:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(72791),s=(r=a)&&r.__esModule?r:{default:r},c=n(51509),l=n(58333);var u=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.buildURI=n.buildURI.bind(n),n}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),i(t,[{key:"buildURI",value:function(){return c.buildURI.apply(void 0,arguments)}},{key:"handleLegacy",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(window.navigator.msSaveOrOpenBlob){e.preventDefault();var n=this.props,r=n.data,o=n.headers,i=n.separator,a=n.filename,s=n.enclosingCharacter,l=n.uFEFF,u=t&&"function"===typeof r?r():r,f=new Blob([l?"\ufeff":"",(0,c.toCSV)(u,o,i,s)]);return window.navigator.msSaveBlob(f,a),!1}}},{key:"handleAsyncClick",value:function(e){var t=this;this.props.onClick(e,(function(n){!1!==n?t.handleLegacy(e,!0):e.preventDefault()}))}},{key:"handleSyncClick",value:function(e){!1===this.props.onClick(e)?e.preventDefault():this.handleLegacy(e)}},{key:"handleClick",value:function(){var e=this;return function(t){if("function"===typeof e.props.onClick)return e.props.asyncOnClick?e.handleAsyncClick(t):e.handleSyncClick(t);e.handleLegacy(t)}}},{key:"render",value:function(){var e=this,t=this.props,n=t.data,r=t.headers,i=t.separator,a=t.filename,c=t.uFEFF,l=t.children,u=(t.onClick,t.asyncOnClick,t.enclosingCharacter),f=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(t,["data","headers","separator","filename","uFEFF","children","onClick","asyncOnClick","enclosingCharacter"]),d="undefined"===typeof window?"":this.buildURI(n,c,r,i,u);return s.default.createElement("a",o({download:a},f,{ref:function(t){return e.link=t},target:"_self",href:d,onClick:this.handleClick()}),l)}}]),t}(s.default.Component);u.defaultProps=l.defaultProps,u.propTypes=l.propTypes,t.default=u},51509:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var o=t.isSafari=function(){return/^((?!chrome|android).)*safari/i.test(navigator.userAgent)},i=t.isJsons=function(e){return Array.isArray(e)&&e.every((function(e){return"object"===("undefined"===typeof e?"undefined":n(e))&&!(e instanceof Array)}))},a=t.isArrays=function(e){return Array.isArray(e)&&e.every((function(e){return Array.isArray(e)}))},s=t.jsonsHeaders=function(e){return Array.from(e.map((function(e){return Object.keys(e)})).reduce((function(e,t){return new Set([].concat(r(e),r(t)))}),[]))},c=t.jsons2arrays=function(e,t){var n=t=t||s(e),o=t;i(t)&&(n=t.map((function(e){return e.label})),o=t.map((function(e){return e.key})));var a=e.map((function(e){return o.map((function(t){return l(t,e)}))}));return[n].concat(r(a))},l=t.getHeaderValue=function(e,t){var n=e.replace(/\[([^\]]+)]/g,".$1").split(".").reduce((function(e,t,n,r){var o=e[t];if(void 0!==o&&null!==o)return o;r.splice(1)}),t);return void 0===n?e in t?t[e]:"":n},u=t.elementOrEmpty=function(e){return"undefined"===typeof e||null===e?"":e},f=t.joiner=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:",",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:'"';return e.filter((function(e){return e})).map((function(e){return e.map((function(e){return u(e)})).map((function(e){return""+n+e+n})).join(t)})).join("\n")},d=t.arrays2csv=function(e,t,n,o){return f(t?[t].concat(r(e)):e,n,o)},p=t.jsons2csv=function(e,t,n,r){return f(c(e,t),n,r)},y=t.string2csv=function(e,t,n,r){return t?t.join(n)+"\n"+e:e.replace(/"/g,'""')},h=t.toCSV=function(e,t,n,r){if(i(e))return p(e,t,n,r);if(a(e))return d(e,t,n,r);if("string"===typeof e)return y(e,t,n);throw new TypeError('Data should be a "String", "Array of arrays" OR "Array of objects" ')};t.buildURI=function(e,t,n,r,i){var a=h(e,n,r,i),s=o()?"application/csv":"text/csv",c=new Blob([t?"\ufeff":"",a],{type:s}),l="data:"+s+";charset=utf-8,"+(t?"\ufeff":"")+a,u=window.URL||window.webkitURL;return"undefined"===typeof u.createObjectURL?l:u.createObjectURL(c)}},23561:function(e,t,n){"use strict";t.CSVLink=void 0;var r=i(n(98015)),o=i(n(39088));function i(e){return e&&e.__esModule?e:{default:e}}r.default,t.CSVLink=o.default},58333:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PropsNotForwarded=t.defaultProps=t.propTypes=void 0;var r,o=n(72791),i=((r=o)&&r.__esModule,n(52007));t.propTypes={data:(0,i.oneOfType)([i.string,i.array,i.func]).isRequired,headers:i.array,target:i.string,separator:i.string,filename:i.string,uFEFF:i.bool,onClick:i.func,asyncOnClick:i.bool,enclosingCharacter:i.string},t.defaultProps={separator:",",filename:"generatedBy_react-csv.csv",uFEFF:!0,asyncOnClick:!1,enclosingCharacter:'"'},t.PropsNotForwarded=["data","headers"]}}]);
//# sourceMappingURL=378.b8d7c1e9.chunk.js.map