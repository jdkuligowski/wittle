(self.webpackChunkclient=self.webpackChunkclient||[]).push([[382],{49382:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return v}});var r=n(72791),s=n(31243),i=n(57689),a=n(97165),o=n(52094),c=n(60764),l=n(78084),d=n(98472);const u=r.createContext({}),h=!0;function f(e){let{baseColor:t,highlightColor:n,width:r,height:s,borderRadius:i,circle:a,direction:o,duration:c,enableAnimation:l=h}=e;const d={};return"rtl"===o&&(d["--animation-direction"]="reverse"),"number"===typeof c&&(d["--animation-duration"]=`${c}s`),l||(d["--pseudo-element-display"]="none"),"string"!==typeof r&&"number"!==typeof r||(d.width=r),"string"!==typeof s&&"number"!==typeof s||(d.height=s),"string"!==typeof i&&"number"!==typeof i||(d.borderRadius=i),a&&(d.borderRadius="50%"),"undefined"!==typeof t&&(d["--base-color"]=t),"undefined"!==typeof n&&(d["--highlight-color"]=n),d}function p(e){let{count:t=1,wrapper:n,className:s,containerClassName:i,containerTestId:a,circle:o=!1,style:c,...l}=e;var d,p,m;const v=r.useContext(u),j={...l};for(const[r,u]of Object.entries(l))"undefined"===typeof u&&delete j[r];const y={...v,...j,circle:o},x={...c,...f(y)};let g="react-loading-skeleton";s&&(g+=` ${s}`);const b=null!==(d=y.inline)&&void 0!==d&&d,N=[],w=Math.ceil(t);for(let u=0;u<w;u++){let e=x;if(w>t&&u===w-1){const n=null!==(p=e.width)&&void 0!==p?p:"100%",r=t%1,s="number"===typeof n?n*r:`calc(${n} * ${r})`;e={...e,width:s}}const n=r.createElement("span",{className:g,style:e,key:u},"\u200c");b?N.push(n):N.push(r.createElement(r.Fragment,{key:u},n,r.createElement("br",null)))}return r.createElement("span",{className:i,"data-testid":a,"aria-live":"polite","aria-busy":null!==(m=y.enableAnimation)&&void 0!==m?m:h},n?N.map(((e,t)=>r.createElement(n,{key:t},e))):N)}var m=n(80184);var v=()=>{const e=(0,i.s0)(),[t,n]=((0,i.TH)(),(0,r.useState)([])),[u,h]=(0,r.useState)(),[f,v]=(0,r.useState)(),[j,y]=(0,r.useState)(),[x,g]=(0,r.useState)("My saved items"),[b,N]=(0,r.useState)("My saved items"),[w,k]=(0,r.useState)(!1),[C,_]=(0,r.useState)(""),[S,O]=(0,r.useState)(""),[P,F]=(0,r.useState)(null),[A,E]=(0,r.useState)(),[R,L]=(0,r.useState)(0),[D,U]=(0,r.useState)(),[I,T]=(0,r.useState)("Property prospects"),[B,M]=(0,r.useState)(),[$,H]=(0,r.useState)("Search"),V=()=>{if((0,a.Hb)()){(async()=>{try{const{data:e}=await s.Z.get(`/api/auth/profile/${(0,a.Nh)()}/`,{headers:{Authorization:`Bearer ${(0,a.hP)()}`}});console.log("user data ->",e),h(e);const t=e.epc_favourites.map(((e,t)=>({number:t+1,postcode:e.postcode||"",address:e.address||"",dateSaved:e.date_added?new Date(e.date_added).toLocaleDateString():""})));M(t)}catch(e){y(!0),console.log(e)}})()}else e("/access-denied"),console.log("no account")};(0,r.useEffect)((()=>{V()}),[]);const Z=t=>{console.log("postcode ->",t.postcode),window.localStorage.setItem("listing-postcode",JSON.stringify(t.postcode)),window.localStorage.setItem("listing-route",JSON.stringify("On")),e("/agents/listing-generator")};return(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)("section",{className:"agent-profile-page",children:[(0,m.jsx)("div",{className:"desktop-nav",children:(0,m.jsx)(c.Z,{navbarColour:"#FDF7F0"})}),(0,m.jsx)("div",{className:"mobile-nav",children:(0,m.jsx)(l.Z,{setProfileContent:g,profileContent:x,profileDetail:b,setProfileDetail:N})}),(0,m.jsx)(o.Z,{setProfileDetail:N,variableSide:w,setProfileContent:g,setVariableSide:k,userData:u}),(0,m.jsx)("section",{className:"main-body",children:(0,m.jsx)("section",{className:"main-body-details",children:(0,m.jsxs)("section",{className:"favourites-section",children:[(0,m.jsxs)("div",{className:"listing-options",children:[(0,m.jsxs)("div",{className:"listing-buttons",children:[(0,m.jsx)("h5",{onClick:()=>T("Listings"),style:{borderBottom:"Listings"===I?"3px solid #ED6B86":"none",textUnderlineOffset:"Listings"===I?"0.5em":"initial",fontWeight:"Listings"===I?"700":"400"},children:"Listings"}),(0,m.jsx)("h5",{onClick:()=>T("Property prospects"),style:{borderBottom:"Property prospects"===I?"3px solid #ED6B86":"none",textUnderlineOffset:"Property prospects"===I?"0.5em":"initial",fontWeight:"Property prospects"===I?"700":"400"},children:"Property prospects"})]}),(0,m.jsx)("div",{className:"logout-button",onClick:t=>{localStorage.removeItem("wittle-user-token"),localStorage.removeItem("wittle-username"),e("/login")},children:(0,m.jsx)("div",{className:"logout-icon"})})]}),(0,m.jsx)("hr",{className:"title-line"}),(0,m.jsx)("div",{className:"favourites-body",children:"Property prospects"===I&&u&&u.epc_favourites.length>0?(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("div",{className:"favourite-count",children:[(0,m.jsxs)("h3",{children:["You have ",u?u.epc_favourites.length:""," prospective properties saved"]}),u&&u.epc_favourites&&(0,m.jsx)(d.CSVLink,{data:B,className:"export",filename:"Wittle property list.csv",children:(0,m.jsx)("div",{className:"header-cta",children:(0,m.jsxs)("div",{className:"copy-button",children:[(0,m.jsx)("div",{className:"export-icon"}),(0,m.jsx)("h3",{children:"Export"})]})})})]}),(0,m.jsxs)("div",{className:"table-section",children:[(0,m.jsxs)("div",{className:"table-headers",children:[(0,m.jsx)("h5",{id:"column1",className:"column",children:"#"}),(0,m.jsx)("div",{id:"column2",className:"column",children:(0,m.jsx)("h5",{children:"Address"})}),(0,m.jsx)("div",{id:"column3",className:"column",children:(0,m.jsx)("h5",{children:"Postcode"})}),(0,m.jsx)("div",{id:"column4",className:"column",children:(0,m.jsx)("h5",{children:"Date saved"})}),(0,m.jsx)("div",{id:"column5",className:"column",children:(0,m.jsx)("h5",{children:"Search category"})}),(0,m.jsx)("div",{id:"column6",className:"column",children:(0,m.jsx)("h5",{children:"Action"})})]}),(0,m.jsx)("hr",{className:"property-divider"}),(0,m.jsx)("div",{className:"table-details",children:u?u.epc_favourites.map(((t,n)=>(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("div",{className:"results-content",children:[(0,m.jsx)("div",{className:"column",id:"column1",children:(0,m.jsx)("h5",{children:n+1})}),(0,m.jsx)("div",{className:"column",id:"column2",onClick:()=>Z(t),children:(0,m.jsx)("h5",{children:null===t.address?"N/a":t.address})}),(0,m.jsx)("div",{className:"column",id:"column3",children:(0,m.jsx)("h5",{children:t.postcode})}),(0,m.jsx)("div",{className:"column",id:"column4",children:(0,m.jsx)("h5",{children:t.date_added})}),(0,m.jsx)("div",{className:"column",id:"column5",children:(0,m.jsx)("h5",{children:t.category})}),(0,m.jsx)("div",{className:"column",id:"column6",onClick:()=>(async t=>{if((0,a.Hb)())try{const{data:e}=await s.Z.delete("/api/epc_favourite/",{data:{postcode:t.postcode,address:t.address},headers:{Authorization:`Bearer ${(0,a.hP)()}`}});V()}catch(n){console.error("Error deleting favourite:",n)}else e("/access-denied"),console.log("logged out")})(t),children:(0,m.jsx)("h5",{className:"remove",children:"\ud83d\uddd1"})})]},n),(0,m.jsx)("hr",{className:"property-divider"})]}))):""})]})]}):"Property prospects"===I&&u&&0===u.epc_favourites.length?(0,m.jsx)(m.Fragment,{children:(0,m.jsx)("div",{className:"favourite-count",children:(0,m.jsx)("h3",{children:"\ud83d\ude15 You don't have any properties saved here. Head to the property finder tab to get started!"})})}):"Listings"===I&&u&&u.listing_favourites.length>0?(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("div",{className:"favourite-count",children:(0,m.jsxs)("h3",{children:["You have ",u?u.listing_favourites.length:""," ",u&&1===u.listing_favourites.length?"listing":"listings"," saved"]})}),(0,m.jsxs)("div",{className:"table-section",children:[(0,m.jsxs)("div",{className:"table-headers",children:[(0,m.jsx)("h5",{id:"column1",className:"column",children:"#"}),(0,m.jsx)("div",{id:"column2",className:"column",children:(0,m.jsx)("h5",{children:"Address"})}),(0,m.jsx)("div",{id:"column3",className:"column",children:(0,m.jsx)("h5",{children:"Postcode"})}),(0,m.jsx)("div",{id:"column4",className:"column",children:(0,m.jsx)("h5",{children:"Channel"})}),(0,m.jsx)("div",{id:"column5",className:"column",children:(0,m.jsx)("h5",{children:"Date saved"})}),(0,m.jsx)("div",{id:"column6",className:"column",children:(0,m.jsx)("h5",{children:"Action"})})]}),(0,m.jsx)("hr",{className:"property-divider"}),(0,m.jsx)("div",{className:"table-details",children:u?u.listing_favourites.map(((t,n)=>(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("div",{className:"results-content",children:[(0,m.jsx)("div",{className:"column",id:"column1",children:(0,m.jsx)("h5",{children:n+1})}),(0,m.jsx)("div",{className:"column",id:"column2",onClick:()=>Z(t),children:(0,m.jsx)("h5",{children:""===t.address?"N/a":t.address})}),(0,m.jsx)("div",{className:"column",id:"column3",children:(0,m.jsx)("h5",{children:""===t.postcode?"N/a":t.postcode})}),(0,m.jsx)("div",{className:"column",id:"column4",children:(0,m.jsx)("h5",{children:t.channel})}),(0,m.jsx)("div",{className:"column",id:"column5",children:(0,m.jsx)("h5",{children:t.date_added})}),(0,m.jsx)("div",{className:"column",id:"column6",onClick:()=>(async t=>{if((0,a.Hb)())try{const{data:e}=await s.Z.delete(`/api/listing_favourites/${t.id}/`,{headers:{Authorization:`Bearer ${(0,a.hP)()}`}});V()}catch(n){console.error("Error deleting favourite:",n)}else e("/access-denied"),console.log("logged out")})(t),children:(0,m.jsx)("h5",{className:"remove",children:"\ud83d\uddd1"})})]},n),(0,m.jsx)("hr",{className:"property-divider"})]}))):""})]})]}):"Listings"===I&&u&&0===u.listing_favourites.length?(0,m.jsx)(m.Fragment,{children:(0,m.jsx)("div",{className:"favourite-count",children:(0,m.jsx)("h3",{children:"\ud83d\ude15 You don't have any properties saved here. Head to the listing generator tab to get started!"})})}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("div",{className:"favourite-count",children:[(0,m.jsx)("h3",{children:(0,m.jsx)(p,{style:{backgroundColor:"grey"}})}),(0,m.jsx)(p,{})]}),(0,m.jsxs)("div",{className:"table-section",children:[(0,m.jsxs)("div",{className:"table-headers",children:[(0,m.jsx)("h5",{id:"column1",className:"column",children:(0,m.jsx)(p,{width:30,height:20})}),(0,m.jsx)("div",{id:"column2",className:"column",children:(0,m.jsx)("h5",{children:(0,m.jsx)(p,{width:100,height:20})})}),(0,m.jsx)("div",{id:"column3",className:"column",children:(0,m.jsx)("h5",{children:(0,m.jsx)(p,{width:100,height:20})})}),(0,m.jsx)("div",{id:"column4",className:"column",children:(0,m.jsx)("h5",{children:(0,m.jsx)(p,{width:100,height:20})})}),(0,m.jsx)("div",{id:"column5",className:"column",children:(0,m.jsx)("h5",{children:(0,m.jsx)(p,{width:150,height:20})})}),(0,m.jsx)("div",{id:"column6",className:"column",children:(0,m.jsx)("h5",{children:(0,m.jsx)(p,{width:100,height:20})})})]}),(0,m.jsx)("hr",{className:"property-divider"}),(0,m.jsx)("div",{className:"table-details",children:[...Array(5)].map(((e,t)=>(0,m.jsxs)("div",{className:"results-content",children:[(0,m.jsx)("div",{className:"column",id:"column1",children:(0,m.jsx)("h5",{children:(0,m.jsx)(p,{width:30,height:20})})}),(0,m.jsx)("div",{className:"column",id:"column2",children:(0,m.jsx)("h5",{children:(0,m.jsx)(p,{width:150,height:20})})}),(0,m.jsx)("div",{className:"column",id:"column3",children:(0,m.jsx)("h5",{children:(0,m.jsx)(p,{width:100,height:20})})}),(0,m.jsx)("div",{className:"column",id:"column4",children:(0,m.jsx)("h5",{children:(0,m.jsx)(p,{width:100,height:20})})}),(0,m.jsx)("div",{className:"column",id:"column5",children:(0,m.jsx)("h5",{children:(0,m.jsx)(p,{width:150,height:20})})}),(0,m.jsx)("div",{className:"column",id:"column6",children:(0,m.jsx)("h5",{children:(0,m.jsx)(p,{width:40,height:20})})}),(0,m.jsx)("hr",{className:"property-divider"})]},t)))})]})]})})]})})})]})})}},98472:function(e,t,n){e.exports=n(23561)},98015:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(72791),a=(r=i)&&r.__esModule?r:{default:r},o=n(51509),c=n(58333);var l=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={},n}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),s(t,[{key:"buildURI",value:function(){return o.buildURI.apply(void 0,arguments)}},{key:"componentDidMount",value:function(){var e=this.props,t=e.data,n=e.headers,r=e.separator,s=e.enclosingCharacter,i=e.uFEFF,a=e.target,o=e.specs,c=e.replace;this.state.page=window.open(this.buildURI(t,i,n,r,s),a,o,c)}},{key:"getWindow",value:function(){return this.state.page}},{key:"render",value:function(){return null}}]),t}(a.default.Component);l.defaultProps=Object.assign(c.defaultProps,{target:"_blank"}),l.propTypes=c.propTypes,t.default=l},39088:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(72791),o=(r=a)&&r.__esModule?r:{default:r},c=n(51509),l=n(58333);var d=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.buildURI=n.buildURI.bind(n),n}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),i(t,[{key:"buildURI",value:function(){return c.buildURI.apply(void 0,arguments)}},{key:"handleLegacy",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(window.navigator.msSaveOrOpenBlob){e.preventDefault();var n=this.props,r=n.data,s=n.headers,i=n.separator,a=n.filename,o=n.enclosingCharacter,l=n.uFEFF,d=t&&"function"===typeof r?r():r,u=new Blob([l?"\ufeff":"",(0,c.toCSV)(d,s,i,o)]);return window.navigator.msSaveBlob(u,a),!1}}},{key:"handleAsyncClick",value:function(e){var t=this;this.props.onClick(e,(function(n){!1!==n?t.handleLegacy(e,!0):e.preventDefault()}))}},{key:"handleSyncClick",value:function(e){!1===this.props.onClick(e)?e.preventDefault():this.handleLegacy(e)}},{key:"handleClick",value:function(){var e=this;return function(t){if("function"===typeof e.props.onClick)return e.props.asyncOnClick?e.handleAsyncClick(t):e.handleSyncClick(t);e.handleLegacy(t)}}},{key:"render",value:function(){var e=this,t=this.props,n=t.data,r=t.headers,i=t.separator,a=t.filename,c=t.uFEFF,l=t.children,d=(t.onClick,t.asyncOnClick,t.enclosingCharacter),u=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(t,["data","headers","separator","filename","uFEFF","children","onClick","asyncOnClick","enclosingCharacter"]),h="undefined"===typeof window?"":this.buildURI(n,c,r,i,d);return o.default.createElement("a",s({download:a},u,{ref:function(t){return e.link=t},target:"_self",href:h,onClick:this.handleClick()}),l)}}]),t}(o.default.Component);d.defaultProps=l.defaultProps,d.propTypes=l.propTypes,t.default=d},51509:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var s=t.isSafari=function(){return/^((?!chrome|android).)*safari/i.test(navigator.userAgent)},i=t.isJsons=function(e){return Array.isArray(e)&&e.every((function(e){return"object"===("undefined"===typeof e?"undefined":n(e))&&!(e instanceof Array)}))},a=t.isArrays=function(e){return Array.isArray(e)&&e.every((function(e){return Array.isArray(e)}))},o=t.jsonsHeaders=function(e){return Array.from(e.map((function(e){return Object.keys(e)})).reduce((function(e,t){return new Set([].concat(r(e),r(t)))}),[]))},c=t.jsons2arrays=function(e,t){var n=t=t||o(e),s=t;i(t)&&(n=t.map((function(e){return e.label})),s=t.map((function(e){return e.key})));var a=e.map((function(e){return s.map((function(t){return l(t,e)}))}));return[n].concat(r(a))},l=t.getHeaderValue=function(e,t){var n=e.replace(/\[([^\]]+)]/g,".$1").split(".").reduce((function(e,t,n,r){var s=e[t];if(void 0!==s&&null!==s)return s;r.splice(1)}),t);return void 0===n?e in t?t[e]:"":n},d=t.elementOrEmpty=function(e){return"undefined"===typeof e||null===e?"":e},u=t.joiner=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:",",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:'"';return e.filter((function(e){return e})).map((function(e){return e.map((function(e){return d(e)})).map((function(e){return""+n+e+n})).join(t)})).join("\n")},h=t.arrays2csv=function(e,t,n,s){return u(t?[t].concat(r(e)):e,n,s)},f=t.jsons2csv=function(e,t,n,r){return u(c(e,t),n,r)},p=t.string2csv=function(e,t,n,r){return t?t.join(n)+"\n"+e:e.replace(/"/g,'""')},m=t.toCSV=function(e,t,n,r){if(i(e))return f(e,t,n,r);if(a(e))return h(e,t,n,r);if("string"===typeof e)return p(e,t,n);throw new TypeError('Data should be a "String", "Array of arrays" OR "Array of objects" ')};t.buildURI=function(e,t,n,r,i){var a=m(e,n,r,i),o=s()?"application/csv":"text/csv",c=new Blob([t?"\ufeff":"",a],{type:o}),l="data:"+o+";charset=utf-8,"+(t?"\ufeff":"")+a,d=window.URL||window.webkitURL;return"undefined"===typeof d.createObjectURL?l:d.createObjectURL(c)}},23561:function(e,t,n){"use strict";t.CSVLink=void 0;var r=i(n(98015)),s=i(n(39088));function i(e){return e&&e.__esModule?e:{default:e}}r.default,t.CSVLink=s.default},58333:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PropsNotForwarded=t.defaultProps=t.propTypes=void 0;var r,s=n(72791),i=((r=s)&&r.__esModule,n(52007));t.propTypes={data:(0,i.oneOfType)([i.string,i.array,i.func]).isRequired,headers:i.array,target:i.string,separator:i.string,filename:i.string,uFEFF:i.bool,onClick:i.func,asyncOnClick:i.bool,enclosingCharacter:i.string},t.defaultProps={separator:",",filename:"generatedBy_react-csv.csv",uFEFF:!0,asyncOnClick:!1,enclosingCharacter:'"'},t.PropsNotForwarded=["data","headers"]}}]);
//# sourceMappingURL=382.a263da7c.chunk.js.6effae751338.map