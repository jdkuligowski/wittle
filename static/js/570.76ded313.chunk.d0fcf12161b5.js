"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[570,631],{88465:function(e,n,s){var l=s(80184);n.Z=e=>{let{textColour:n,pageType:s}=e;return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("section",{className:"website-footer no-print",id:s,children:[(0,l.jsx)("p",{style:{color:n},children:"Wittle Technology Limited is a registered company in England and Wales with corporation number 14326945."}),(0,l.jsx)("p",{style:{color:n},children:"Copyright \xa9 Wittle Technology Limited. All rights reserved."})]})})}},35176:function(e,n,s){s.r(n);var l=s(72791),t=s(55294),i=s(57689),c=(s(99696),s(88465),s(52094),s(60764),s(78084),s(80184));n.default=()=>{const[e,n]=(0,l.useState)(),[s,r]=((0,i.s0)(),(0,l.useState)());return(0,l.useEffect)((()=>{(async()=>{try{const e=JSON.parse(localStorage.getItem("school-id")),{data:n}=await t.Z.get(`/api/primaries/${e}`);console.log("single primary data ->",n),r(n)}catch(e){n(!0),console.log(e)}})()}),[]),(0,c.jsx)(c.Fragment,{children:s?(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)("section",{className:"single-school-profile",children:[(0,c.jsxs)("div",{className:"school-core-info",children:[(0,c.jsxs)("div",{className:"info-left",children:[(0,c.jsx)("h1",{children:s[0].school_name}),(0,c.jsxs)("h3",{className:"normal",children:["\ud83d\udcc8 Ofsted: ",null===s[0].ofsted_results?"N/a":s[0].ofsted_results]}),(0,c.jsxs)("h3",{className:"normal",children:["\ud83c\udf93 ",s[0].students," students per year"]}),(0,c.jsxs)("h3",{className:"normal",children:["\ud83d\udc68\u200d\ud83d\udc67 Gender: ",s[0].gender]}),(0,c.jsxs)("h3",{className:"normal",children:["\ud83d\ude4f Faith: ",null===s[0].religion?"All":s[0].religion]}),(0,c.jsxs)("a",{href:s[0].school_url,target:"_blank",className:"website",rel:"noreferrer",children:["\ud83d\udcbb ",s[0].school_url]})]}),(0,c.jsx)("div",{className:"info-right",children:(0,c.jsx)("div",{className:"school-image",id:"primary",style:{backgroundImage:null===s[0].image_url?void 0:`url(${s[0].image_url})`}})})]}),(0,c.jsxs)("div",{className:"school-academic-highlights",children:[(0,c.jsx)("h1",{children:"Academic highlights"}),(0,c.jsxs)("div",{className:"row",children:[(0,c.jsxs)("div",{className:"item",children:[(0,c.jsx)("div",{className:"circle",children:(0,c.jsxs)("h1",{children:[null===s[0].percentile?"N/a":Math.round(100*s[0].percentile)+1,"%"]})}),null!==s[0].percentile?(0,c.jsxs)("p",{children:["In the top ",Math.round(100*s[0].percentile)+1,"% of primary schools in London"]}):(0,c.jsx)("p",{children:"No performance data available for this school"})]}),(0,c.jsxs)("div",{className:"item",children:[(0,c.jsx)("div",{className:"circle",children:(0,c.jsxs)("h1",{children:[null===s[0].borough_percentile?"N/a":Math.round(100*s[0].borough_percentile)+1,"%"]})}),null!==s[0].borough_percentile?(0,c.jsxs)("p",{children:["In the top ",Math.round(100*s[0].borough_percentile)+1,"% of primary schools in ",s[0].local_authority]}):(0,c.jsx)("p",{children:"No performance data available for this school"})]})]})]}),(0,c.jsxs)("div",{className:"school-results",children:[(0,c.jsx)("h1",{children:"KS2 Results"}),s&&"Independent school"===s[0].school_type?(0,c.jsx)("h5",{className:"no-results",children:"No KS2 results for Independent schools"}):s?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{className:"school-table-headers",children:[(0,c.jsx)("h5",{id:"column1",children:"#"}),(0,c.jsx)("h5",{id:"column2",children:"Subject"}),(0,c.jsx)("h5",{id:"column3",children:"At standard (%)"}),(0,c.jsx)("h5",{id:"column4",children:"Exceeding standard (%)"})]}),(0,c.jsxs)("div",{className:"school-table-details",children:[(0,c.jsxs)("div",{className:"school-content",children:[(0,c.jsx)("div",{className:"column",id:"column1",children:(0,c.jsx)("h5",{children:1})}),(0,c.jsx)("div",{className:"column",id:"column2",children:(0,c.jsx)("h5",{children:"Reading"})}),(0,c.jsx)("div",{className:"column",id:"column3",children:null!==s[0].at_standard_reading?(0,c.jsx)("h5",{children:s[0].at_standard_reading}):(0,c.jsx)("h5",{children:"No reading data avilable for this school"})}),(0,c.jsx)("div",{className:"column",id:"column4",children:null!==s[0].exceeding_standard_reading?(0,c.jsx)("h5",{children:s[0].exceeding_standard_reading}):""})]}),(0,c.jsx)("hr",{className:"dividing-line"})]}),(0,c.jsxs)("div",{className:"school-table-details",children:[(0,c.jsxs)("div",{className:"school-content",children:[(0,c.jsx)("div",{className:"column",id:"column1",children:(0,c.jsx)("h5",{children:2})}),(0,c.jsx)("div",{className:"column",id:"column2",children:(0,c.jsx)("h5",{children:"Writing"})}),(0,c.jsx)("div",{className:"column",id:"column3",children:null!==s[0].at_standard_writing?(0,c.jsx)("h5",{children:s[0].at_standard_writing}):(0,c.jsx)("h5",{children:"No writing data avilable for this school"})}),(0,c.jsx)("div",{className:"column",id:"column4",children:null!==s[0].exceeding_standard_writing?(0,c.jsx)("h5",{children:s[0].exceeding_standard_writing}):""})]}),(0,c.jsx)("hr",{className:"dividing-line"})]}),(0,c.jsxs)("div",{className:"school-table-details",children:[(0,c.jsxs)("div",{className:"school-content",children:[(0,c.jsx)("div",{className:"column",id:"column1",children:(0,c.jsx)("h5",{children:3})}),(0,c.jsx)("div",{className:"column",id:"column2",children:(0,c.jsx)("h5",{children:"Maths"})}),(0,c.jsx)("div",{className:"column",id:"column3",children:null!==s[0].at_standard_maths?(0,c.jsx)("h5",{children:s[0].at_standard_maths}):(0,c.jsx)("h5",{children:"No maths data avilable for this school"})}),(0,c.jsx)("div",{className:"column",id:"column4",children:null!==s[0].at_standard_maths?(0,c.jsx)("h5",{children:s[0].at_standard_maths}):""})]}),(0,c.jsx)("hr",{className:"dividing-line"})]}),(0,c.jsxs)("div",{className:"school-table-details",children:[(0,c.jsxs)("div",{className:"school-content",children:[(0,c.jsx)("div",{className:"column",id:"column1",children:(0,c.jsx)("h5",{children:4})}),(0,c.jsx)("div",{className:"column",id:"column2",children:(0,c.jsx)("h5",{children:"Grammar, punctuation and spelling"})}),(0,c.jsx)("div",{className:"column",id:"column3",children:null!==s[0].at_standard_gps?(0,c.jsx)("h5",{children:s[0].at_standard_gps}):(0,c.jsx)("h5",{children:"No GPS data avilable for this school"})}),(0,c.jsx)("div",{className:"column",id:"column4",children:null!==s[0].at_standard_gps?(0,c.jsx)("h5",{children:s[0].at_standard_gps}):""})]}),(0,c.jsx)("hr",{className:"dividing-line"})]}),(0,c.jsxs)("div",{className:"school-table-details",children:[(0,c.jsxs)("div",{className:"school-content",children:[(0,c.jsx)("div",{className:"column",id:"column1",children:(0,c.jsx)("h5",{children:5})}),(0,c.jsx)("div",{className:"column",id:"column2",children:(0,c.jsx)("h5",{children:"Science"})}),(0,c.jsx)("div",{className:"column",id:"column3",children:null!==s[0].at_standard_science?(0,c.jsx)("h5",{children:s[0].at_standard_science}):(0,c.jsx)("h5",{children:"No science data avilable for this school"})}),(0,c.jsx)("div",{className:"column",id:"column4",children:null!==s[0].at_standard_science?(0,c.jsx)("h5",{children:s[0].at_standard_science}):""})]}),(0,c.jsx)("hr",{className:"dividing-line"})]})]}):""]})]})}):""})}},97143:function(e){var n=Object.prototype.hasOwnProperty,s="~";function l(){}function t(e,n,s){this.fn=e,this.context=n,this.once=s||!1}function i(e,n,l,i,c){if("function"!==typeof l)throw new TypeError("The listener must be a function");var r=new t(l,i||e,c),a=s?s+n:n;return e._events[a]?e._events[a].fn?e._events[a]=[e._events[a],r]:e._events[a].push(r):(e._events[a]=r,e._eventsCount++),e}function c(e,n){0===--e._eventsCount?e._events=new l:delete e._events[n]}function r(){this._events=new l,this._eventsCount=0}Object.create&&(l.prototype=Object.create(null),(new l).__proto__||(s=!1)),r.prototype.eventNames=function(){var e,l,t=[];if(0===this._eventsCount)return t;for(l in e=this._events)n.call(e,l)&&t.push(s?l.slice(1):l);return Object.getOwnPropertySymbols?t.concat(Object.getOwnPropertySymbols(e)):t},r.prototype.listeners=function(e){var n=s?s+e:e,l=this._events[n];if(!l)return[];if(l.fn)return[l.fn];for(var t=0,i=l.length,c=new Array(i);t<i;t++)c[t]=l[t].fn;return c},r.prototype.listenerCount=function(e){var n=s?s+e:e,l=this._events[n];return l?l.fn?1:l.length:0},r.prototype.emit=function(e,n,l,t,i,c){var r=s?s+e:e;if(!this._events[r])return!1;var a,o,d=this._events[r],h=arguments.length;if(d.fn){switch(d.once&&this.removeListener(e,d.fn,void 0,!0),h){case 1:return d.fn.call(d.context),!0;case 2:return d.fn.call(d.context,n),!0;case 3:return d.fn.call(d.context,n,l),!0;case 4:return d.fn.call(d.context,n,l,t),!0;case 5:return d.fn.call(d.context,n,l,t,i),!0;case 6:return d.fn.call(d.context,n,l,t,i,c),!0}for(o=1,a=new Array(h-1);o<h;o++)a[o-1]=arguments[o];d.fn.apply(d.context,a)}else{var u,m=d.length;for(o=0;o<m;o++)switch(d[o].once&&this.removeListener(e,d[o].fn,void 0,!0),h){case 1:d[o].fn.call(d[o].context);break;case 2:d[o].fn.call(d[o].context,n);break;case 3:d[o].fn.call(d[o].context,n,l);break;case 4:d[o].fn.call(d[o].context,n,l,t);break;default:if(!a)for(u=1,a=new Array(h-1);u<h;u++)a[u-1]=arguments[u];d[o].fn.apply(d[o].context,a)}}return!0},r.prototype.on=function(e,n,s){return i(this,e,n,s,!1)},r.prototype.once=function(e,n,s){return i(this,e,n,s,!0)},r.prototype.removeListener=function(e,n,l,t){var i=s?s+e:e;if(!this._events[i])return this;if(!n)return c(this,i),this;var r=this._events[i];if(r.fn)r.fn!==n||t&&!r.once||l&&r.context!==l||c(this,i);else{for(var a=0,o=[],d=r.length;a<d;a++)(r[a].fn!==n||t&&!r[a].once||l&&r[a].context!==l)&&o.push(r[a]);o.length?this._events[i]=1===o.length?o[0]:o:c(this,i)}return this},r.prototype.removeAllListeners=function(e){var n;return e?(n=s?s+e:e,this._events[n]&&c(this,n)):(this._events=new l,this._eventsCount=0),this},r.prototype.off=r.prototype.removeListener,r.prototype.addListener=r.prototype.on,r.prefixed=s,r.EventEmitter=r,e.exports=r},13631:function(e,n,s){var l=s(97143);n.Z=l}}]);
//# sourceMappingURL=570.76ded313.chunk.js.c5a16b3d8e15.map