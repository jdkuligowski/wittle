"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[738],{9738:function(e,s,r){r.r(s);var a=r(28381),t=r(65293),l=r(42524),n=r(15211),i=r(47142),c=(r(95325),r(48925),r(8772)),p=r(59693),o=r(37336),d=r(29343);s.default=()=>{const e=(0,l.s0)(),[s,r]=(0,a.useState)(),[m,h]=(0,a.useState)(),[u,x]=(0,a.useState)(),[j,v]=(0,a.useState)(),[_,b]=(0,a.useState)([]),[y,N]=(0,a.useState)([]),[k,g]=(0,a.useState)(),[f,I]=(0,a.useState)("Comparison"),[A,F]=(0,a.useState)("Comparison"),[C,w]=(0,a.useState)(!1),[B,E]=(0,a.useState)({property1_total:"",property2_total:"",property1_restaurant:"",property2_reestaurant:"",property1_pub:"",property2_pub:"",property1_cafe:"",property2_cafe:"",property1_takeaway:"",property2_takeaway:"",property1_tube:"",property2_tube:"",property1_train:"",property2_train:"",property1_supermarket:"",property2_supermarket:"",property1_gym:"",property2_gym:"",property1_park:"",property2_park:"",property1_primary:"",property2_primary:"",property1_secondary:"",property2_secondary:""});(0,a.useEffect)((()=>{(()=>{if((0,n.Hb)())try{(async()=>{const{data:e}=await t.ZP.get(`/api/auth/profile/${(0,n.Nh)()}/`,{headers:{Authorization:`Bearer ${(0,n.hP)()}`}});console.log("user data ->",e),x(e),v(e.white_properties)})()}catch(s){g(!0),console.log(s)}else e("/access-denied"),console.log("no account")})(),console.log("carrying out userData load")}),[]);(0,a.useEffect)((()=>{s&&(()=>{try{(async()=>{const{data:e}=await t.ZP.get(`/api/postcodes/${s}`);console.log("property 1 ->",e[0]),b(e[0])})()}catch(e){g(!0),console.log(e)}})()}),[s]);return(0,a.useEffect)((()=>{m&&(()=>{try{(async()=>{const{data:e}=await t.ZP.get(`/api/postcodes/${m}`);console.log("property 2 ->",e[0]),N(e[0])})()}catch(e){g(!0),console.log(e)}})()}),[m]),(0,d.jsx)(d.Fragment,{children:u?(0,d.jsxs)("section",{className:"agent-profile-page",children:[(0,d.jsx)("div",{className:"desktop-nav",children:(0,d.jsx)(c.Z,{navbarColour:"#FDF7F0"})}),(0,d.jsx)("div",{className:"mobile-nav",children:(0,d.jsx)(o.Z,{setProfileContent:I,profileContent:f,profileDetail:A,setProfileDetail:F})}),(0,d.jsx)(p.Z,{setProfileDetail:F,variableSide:C,setProfileContent:I,setVariableSide:w}),(0,d.jsxs)("div",{className:"comparison-grid",children:[(0,d.jsxs)("div",{className:"comparison-title",children:[(0,d.jsx)("h1",{children:"Property 1"}),(0,d.jsx)("h1",{className:"desktop-results",children:"Results"}),(0,d.jsx)("h1",{children:"Property 2"})]}),(0,d.jsxs)("div",{className:"comparison-subtitle",children:[(0,d.jsxs)("select",{className:"comparison-dropdown",onChange:e=>{r(e.target.value),console.log("property 1 value ->",e.target.value)},children:[(0,d.jsx)("option",{children:"Select property"}),j.map(((e,s)=>(0,d.jsx)("option",{value:e.postcode,children:e.name},s)))]}),(0,d.jsxs)("select",{className:"comparison-dropdown",onChange:e=>{h(e.target.value),console.log("property 2 value ->",e.target.value)},children:[(0,d.jsx)("option",{children:"Select property"}),j.map(((e,s)=>(0,d.jsx)("option",{value:e.postcode,children:e.name},s)))]})]}),(0,d.jsxs)("div",{className:"comparison-properties-mobile",children:[u?u.white_properties.filter((e=>e.postcode===s)).map(((s,r)=>(0,d.jsx)("div",{className:"comparison-property",onClick:()=>e(`/agents/property/${s.postcode}`),children:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("div",{className:"comparison-image",style:{backgroundImage:`url('${s.image}')`}}),(0,d.jsxs)("div",{className:"comparison-content",children:[(0,d.jsx)("h4",{children:s.name}),(0,d.jsxs)("h5",{children:[(0,d.jsx)(i.h3,{value:s.price,displayType:"text",thousandSeparator:!0,prefix:"\xa3"})," offers over"]}),(0,d.jsxs)("h5",{children:["Bedrooms: ",s.bedrooms]}),(0,d.jsxs)("h5",{children:["Type: ",s.type]})]})]})},r))):"",u?u.white_properties.filter((e=>e.postcode===m)).map(((s,r)=>(0,d.jsx)("div",{className:"comparison-property",onClick:()=>e(`/agents/property/${s.postcode}`),children:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("div",{className:"comparison-image",style:{backgroundImage:`url('${s.image}')`}}),(0,d.jsxs)("div",{className:"comparison-content",children:[(0,d.jsx)("h4",{children:s.name}),(0,d.jsxs)("h5",{children:[(0,d.jsx)(i.h3,{value:s.price,displayType:"text",thousandSeparator:!0,prefix:"\xa3"})," offers over"]}),(0,d.jsxs)("h5",{children:["Bedrooms: ",s.bedrooms]}),(0,d.jsxs)("h5",{children:["Type: ",s.type]})]})]})},r))):""]}),(0,d.jsxs)("div",{className:"comparison-body",style:{justifyContent:s?"inherit":"center"},children:[u?u.white_properties.filter((e=>e.postcode===s)).map(((s,r)=>(0,d.jsx)("div",{className:"comparison-property",onClick:()=>e(`/agents/property/${s.postcode}`),children:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("div",{className:"comparison-image",style:{backgroundImage:`url('${s.image}')`}}),(0,d.jsxs)("div",{className:"comparison-content",children:[(0,d.jsx)("h4",{children:s.name}),(0,d.jsxs)("h5",{children:[(0,d.jsx)(i.h3,{value:s.price,displayType:"text",thousandSeparator:!0,prefix:"\xa3"})," offers over"]}),(0,d.jsxs)("h5",{children:["Bedrooms: ",s.bedrooms]}),(0,d.jsxs)("h5",{children:["Type: ",s.type]})]})]})},r))):"",(0,d.jsxs)("div",{className:"comparison-results",children:[(0,d.jsx)("div",{className:"result-title",children:(0,d.jsx)("h5",{children:"Secondary schools"})}),(0,d.jsxs)("div",{className:"results-rows",children:[(0,d.jsxs)("div",{className:"results-left",children:[_&&_.secondaries&&_.secondaries.total_score_percentile&&[...Array(100-Math.round(100*_.secondaries.total_score_percentile))].map(((e,s)=>(0,d.jsx)("div",{className:"blank-bars",children:(0,d.jsx)("div",{children:"."})},s))),(0,d.jsxs)("h5",{className:"left-score",children:[_&&_.secondaries&&_.secondaries.total_score_percentile?parseInt(100*_.secondaries.total_score_percentile):"","%"]}),_&&_.secondaries&&_.secondaries.total_score_percentile&&[...Array(parseInt(100*_.secondaries.total_score_percentile))].map(((e,s)=>(0,d.jsx)("div",{className:"bars",style:{backgroundColor:(_&&_.secondaries&&_.secondaries.total_score_percentile?parseInt(100*_.secondaries.total_score_percentile):0)<(y&&y.secondaries&&y.secondaries.total_score_percentile?parseInt(100*y.secondaries.total_score_percentile):0)?"#152BA4":"#FFA7E5"},children:(0,d.jsx)("div",{children:"."})},s)))]}),(0,d.jsxs)("div",{className:"results-right",children:[y&&y.secondaries&&_.secondaries.total_score_percentile&&[...Array(parseInt(100*y.secondaries.total_score_percentile))].map(((e,s)=>(0,d.jsx)("div",{className:"bars",style:{backgroundColor:(_&&_.secondaries&&_.secondaries.total_score_percentile?parseInt(100*_.secondaries.total_score_percentile):0)>(y&&y.secondaries&&y.secondaries.total_score_percentile?parseInt(100*y.secondaries.total_score_percentile):0)?"#152BA4":"#FFA7E5"},children:(0,d.jsx)("div",{children:"."})},s))),(0,d.jsxs)("h5",{className:"right-score",children:[y&&y.secondaries&&y.secondaries.total_score_percentile?Math.round(100*y.secondaries.total_score_percentile):"","%"]})]})]}),(0,d.jsx)("div",{className:"result-title",children:(0,d.jsx)("h5",{children:"Green space"})}),(0,d.jsxs)("div",{className:"results-rows",children:[(0,d.jsxs)("div",{className:"results-left",children:[_&&_.parks_lsoa&&_.parks_lsoa[0]&&[...Array(100-_.parks_lsoa[0].london_percentile)].map(((e,s)=>(0,d.jsx)("div",{className:"blank-bars",children:(0,d.jsx)("div",{children:"."})},s))),(0,d.jsxs)("h5",{className:"left-score",children:[_&&_.parks_lsoa&&_.parks_lsoa[0]?_.parks_lsoa[0].london_percentile:"","%"]}),y&&y.parks_lsoa&&y.parks_lsoa[0]&&[...Array(_.parks_lsoa[0].london_percentile)].map(((e,s)=>(0,d.jsx)("div",{className:"bars",style:{backgroundColor:(_&&_.parks_lsoa&&_.parks_lsoa[0]?parseInt(_.parks_lsoa[0].london_percentile):0)<(y&&y.parks_lsoa&&y.parks_lsoa[0]?parseInt(y.parks_lsoa[0].london_percentile):0)?"#152BA4":"#FFA7E5"},children:(0,d.jsx)("div",{children:"."})},s)))]}),(0,d.jsxs)("div",{className:"results-right",children:[y&&y.parks_lsoa&&y.parks_lsoa[0]&&[...Array(y.parks_lsoa[0].london_percentile)].map(((e,s)=>(0,d.jsx)("div",{className:"bars",style:{backgroundColor:(_?parseInt(_.parks_lsoa[0].london_percentile):0)>(y?parseInt(y.parks_lsoa[0].london_percentile):0)?"#152BA4":"#FFA7E5"},children:(0,d.jsx)("div",{children:"."})},s))),(0,d.jsxs)("h5",{className:"right-score",children:[y&&y.parks_lsoa&&y.parks_lsoa[0]?Math.round(y.parks_lsoa[0].london_percentile):"","%"]})]})]}),(0,d.jsx)("div",{className:"result-title",children:(0,d.jsx)("h5",{children:"Restaurants"})}),(0,d.jsxs)("div",{className:"results-rows",children:[(0,d.jsxs)("div",{className:"results-left",children:[_&&_.restaurants&&_.restaurants.normal_percentile&&[...Array(parseInt(100-Math.round(100*_.restaurants.normal_percentile)))].map(((e,s)=>(0,d.jsx)("div",{className:"blank-bars",children:(0,d.jsx)("div",{children:"."})},s))),(0,d.jsxs)("h5",{className:"left-score",children:[_&&_.restaurants&&_.restaurants.normal_percentile?parseInt(100*_.restaurants.normal_percentile):"","%"]}),_&&_.restaurants&&_.restaurants.normal_percentile&&[...Array(parseInt(100*_.restaurants.normal_percentile))].map(((e,s)=>(0,d.jsx)("div",{className:"bars",style:{backgroundColor:(_&&_.restaurants&&_.restaurants.normal_percentile?parseInt(100*_.restaurants.normal_percentile):0)<(y&&y.restaurants&&y.restaurants.normal_percentile?parseInt(100*y.restaurants.normal_percentile):0)?"#152BA4":"#FFA7E5"},children:(0,d.jsx)("div",{children:"."})},s)))]}),(0,d.jsxs)("div",{className:"results-right",children:[y&&y.restaurants&&_.restaurants.normal_percentile&&[...Array(parseInt(100*y.restaurants.normal_percentile))].map(((e,s)=>(0,d.jsx)("div",{className:"bars",style:{backgroundColor:(_&&_.restaurants&&_.restaurants.normal_percentile?parseInt(100*_.restaurants.normal_percentile):0)>(y&&y.restaurants&&y.restaurants.normal_percentile?parseInt(100*y.restaurants.normal_percentile):0)?"#152BA4":"#FFA7E5"},children:(0,d.jsx)("div",{children:"."})},s))),(0,d.jsxs)("h5",{className:"right-score",children:[y&&y.restaurants&&y.restaurants.normal_percentile?Math.round(100*y.restaurants.normal_percentile):"","%"]})]})]}),(0,d.jsx)("div",{className:"result-title",children:(0,d.jsx)("h5",{children:"Pubs"})}),(0,d.jsxs)("div",{className:"results-rows",children:[(0,d.jsxs)("div",{className:"results-left",children:[_&&_.pubs&&_.pubs.normal_percentile&&[...Array(parseInt(100-Math.round(100*_.pubs.normal_percentile)))].map(((e,s)=>(0,d.jsx)("div",{className:"blank-bars",children:(0,d.jsx)("div",{children:"."})},s))),(0,d.jsxs)("h5",{className:"left-score",children:[_&&_.pubs&&_.pubs.normal_percentile?parseInt(100*_.pubs.normal_percentile):"","%"]}),_&&_.pubs&&_.pubs.normal_percentile&&[...Array(parseInt(100*_.pubs.normal_percentile))].map(((e,s)=>(0,d.jsx)("div",{className:"bars",style:{backgroundColor:(_&&_.pubs&&_.pubs.normal_percentile?parseInt(100*_.pubs.normal_percentile):0)<(y&&y.pubs&&y.pubs.normal_percentile?parseInt(100*y.pubs.normal_percentile):0)?"#152BA4":"#FFA7E5"},children:(0,d.jsx)("div",{children:"."})},s)))]}),(0,d.jsxs)("div",{className:"results-right",children:[y&&y.pubs&&_.pubs.normal_percentile&&[...Array(parseInt(100*y.pubs.normal_percentile))].map(((e,s)=>(0,d.jsx)("div",{className:"bars",style:{backgroundColor:(_&&_.pubs&&_.pubs.normal_percentile?parseInt(100*_.pubs.normal_percentile):0)>(y&&y.pubs&&y.pubs.normal_percentile?parseInt(100*y.pubs.normal_percentile):0)?"#152BA4":"#FFA7E5"},children:(0,d.jsx)("div",{children:"."})},s))),(0,d.jsxs)("h5",{className:"right-score",children:[y&&y.pubs&&y.pubs.normal_percentile?Math.round(100*y.pubs.normal_percentile):"","%"]})]})]}),(0,d.jsx)("div",{className:"result-title",children:(0,d.jsx)("h5",{children:"Fitness"})}),(0,d.jsxs)("div",{className:"results-rows",children:[(0,d.jsxs)("div",{className:"results-left",children:[_&&_.fitness&&_.fitness.percentile&&[...Array(100-Math.round(100*_.fitness.percentile))].map(((e,s)=>(0,d.jsx)("div",{className:"blank-bars",children:(0,d.jsx)("div",{children:"."})},s))),(0,d.jsxs)("h5",{className:"left-score",children:[_&&_.fitness&&_.fitness.percentile?parseInt(100*_.fitness.percentile):"","%"]}),_&&_.fitness&&_.fitness.percentile&&[...Array(parseInt(100*_.fitness.percentile))].map(((e,s)=>(0,d.jsx)("div",{className:"bars",style:{backgroundColor:(_&&_.fitness&&_.fitness.percentile?parseInt(100*_.fitness.percentile):0)<(y&&y.fitness&&y.fitness.percentile?parseInt(100*y.fitness.percentile):0)?"#152BA4":"#FFA7E5"},children:(0,d.jsx)("div",{children:"."})},s)))]}),(0,d.jsxs)("div",{className:"results-right",children:[y&&y.fitness&&_.fitness.percentile&&[...Array(parseInt(100*y.fitness.percentile))].map(((e,s)=>(0,d.jsx)("div",{className:"bars",style:{backgroundColor:(_&&_.fitness&&_.fitness.percentile?parseInt(100*_.fitness.percentile):0)>(y&&y.fitness&&y.fitness.percentile?parseInt(100*y.fitness.percentile):0)?"#152BA4":"#FFA7E5"},children:(0,d.jsx)("div",{children:"."})},s))),(0,d.jsxs)("h5",{className:"right-score",children:[y&&y.fitness&&y.fitness.percentile?Math.round(100*y.fitness.percentile):"","%"]})]})]}),(0,d.jsx)("div",{className:"result-title",children:(0,d.jsx)("h5",{children:"EV"})}),(0,d.jsxs)("div",{className:"results-rows",children:[(0,d.jsxs)("div",{className:"results-left",children:[_&&_.ev&&_.ev.percentile&&[...Array(100-Math.round(100*_.ev.percentile))].map(((e,s)=>(0,d.jsx)("div",{className:"blank-bars",children:(0,d.jsx)("div",{children:"."})},s))),(0,d.jsxs)("h5",{className:"left-score",children:[_&&_.ev&&_.ev.percentile?parseInt(100*_.ev.percentile):"","%"]}),_&&_.ev&&_.ev.percentile&&[...Array(parseInt(100*_.ev.percentile))].map(((e,s)=>(0,d.jsx)("div",{className:"bars",style:{backgroundColor:(_&&_.ev&&_.ev.percentile?parseInt(100*_.ev.percentile):0)<(y&&y.ev&&y.ev.percentile?parseInt(100*y.ev.percentile):0)?"#152BA4":"#FFA7E5"},children:(0,d.jsx)("div",{children:"."})},s)))]}),(0,d.jsxs)("div",{className:"results-right",children:[y&&y.ev&&_.ev.percentile&&[...Array(parseInt(100*y.ev.percentile))].map(((e,s)=>(0,d.jsx)("div",{className:"bars",style:{backgroundColor:(_&&_.ev&&_.ev.percentile?parseInt(100*_.ev.percentile):0)>(y&&y.ev&&y.ev.percentile?parseInt(100*y.ev.percentile):0)?"#152BA4":"#FFA7E5"},children:(0,d.jsx)("div",{children:"."})},s))),(0,d.jsxs)("h5",{className:"right-score",children:[y&&y.ev&&y.ev.percentile?Math.round(100*y.ev.percentile):"","%"]})]})]}),(0,d.jsx)("div",{className:"result-title",children:(0,d.jsx)("h5",{children:"Tubes"})}),(0,d.jsxs)("div",{className:"results-rows",children:[(0,d.jsxs)("div",{className:"results-left",children:[_&&_.tubes&&_.tubes.percentile&&[...Array(100-Math.round(100*_.tubes.percentile))].map(((e,s)=>(0,d.jsx)("div",{className:"blank-bars",children:(0,d.jsx)("div",{children:"."})},s))),(0,d.jsxs)("h5",{className:"left-score",children:[_&&_.tubes&&_.tubes.percentile?parseInt(100*_.tubes.percentile):"","%"]}),_&&_.tubes&&_.tubes.percentile&&[...Array(parseInt(100*_.tubes.percentile))].map(((e,s)=>(0,d.jsx)("div",{className:"bars",style:{backgroundColor:(_&&_.tubes&&_.tubes.percentile?parseInt(100*_.tubes.percentile):0)<(y&&y.tubes&&y.tubes.percentile?parseInt(100*y.tubes.percentile):0)?"#152BA4":"#FFA7E5"},children:(0,d.jsx)("div",{children:"."})},s)))]}),(0,d.jsxs)("div",{className:"results-right",children:[y&&y.tubes&&_.tubes.percentile&&[...Array(parseInt(100*y.tubes.percentile))].map(((e,s)=>(0,d.jsx)("div",{className:"bars",style:{backgroundColor:(_&&_.tubes&&_.tubes.percentile?parseInt(100*_.tubes.percentile):0)>(y&&y.tubes&&y.tubes.percentile?parseInt(100*y.tubes.percentile):0)?"#152BA4":"#FFA7E5"},children:(0,d.jsx)("div",{children:"."})},s))),(0,d.jsxs)("h5",{className:"right-score",children:[y&&y.tubes&&y.tubes.percentile?Math.round(100*y.tubes.percentile):"","%"]})]})]}),(0,d.jsx)("div",{className:"result-title",children:(0,d.jsx)("h5",{children:"Crime"})}),(0,d.jsxs)("div",{className:"results-rows",children:[(0,d.jsxs)("div",{className:"results-left",children:[_&&_.crime&&_.crime[0]&&[...Array(parseInt(100*_.crime[0].percentile))].map(((e,s)=>(0,d.jsx)("div",{className:"blank-bars",children:(0,d.jsx)("div",{children:"."})},s))),(0,d.jsxs)("h5",{className:"left-score",children:[_&&_.crime&&_.crime[0]?100-parseInt(100*_.crime[0].percentile):"","%"]}),y&&y.crime&&y.crime[0]&&[...Array(100-parseInt(100*_.crime[0].percentile))].map(((e,s)=>(0,d.jsx)("div",{className:"bars",style:{backgroundColor:(_&&_.crime&&_.crime[0]?100-parseInt(100*_.crime[0].percentile):0)<(y&&y.crime&&y.crime[0]?100-parseInt(100*y.crime[0].percentile):0)?"#152BA4":"#FFA7E5"},children:(0,d.jsx)("div",{children:"."})},s)))]}),(0,d.jsxs)("div",{className:"results-right",children:[y&&y.crime&&y.crime[0]&&[...Array(100-parseInt(100*y.crime[0].percentile))].map(((e,s)=>(0,d.jsx)("div",{className:"bars",style:{backgroundColor:(_?100-parseInt(100*_.crime[0].percentile):0)>(y?100-parseInt(100*y.crime[0].percentile):0)?"#152BA4":"#FFA7E5"},children:(0,d.jsx)("div",{children:"."})},s))),(0,d.jsxs)("h5",{className:"right-score",children:[y&&y.crime&&y.crime[0]?100-parseInt(100*y.crime[0].percentile):"","%"]})]})]}),(0,d.jsx)("div",{className:"result-title",children:(0,d.jsx)("h5",{children:"Supermarkets"})}),(0,d.jsxs)("div",{className:"results-rows",children:[(0,d.jsxs)("div",{className:"results-left",children:[_&&_.supermarkets&&_.supermarkets.percentile&&[...Array(100-Math.round(100*_.supermarkets.percentile))].map(((e,s)=>(0,d.jsx)("div",{className:"blank-bars",children:(0,d.jsx)("div",{children:"."})},s))),(0,d.jsxs)("h5",{className:"left-score",children:[_&&_.supermarkets&&_.supermarkets.percentile?parseInt(100*_.supermarkets.percentile):"","%"]}),_&&_.supermarkets&&_.supermarkets.percentile&&[...Array(parseInt(100*_.supermarkets.percentile))].map(((e,s)=>(0,d.jsx)("div",{className:"bars",style:{backgroundColor:(_&&_.supermarkets&&_.supermarkets.percentile?parseInt(100*_.supermarkets.percentile):0)<(y&&y.supermarkets&&y.supermarkets.percentile?parseInt(100*y.supermarkets.percentile):0)?"#152BA4":"#FFA7E5"},children:(0,d.jsx)("div",{children:"."})},s)))]}),(0,d.jsxs)("div",{className:"results-right",children:[y&&y.supermarkets&&_.supermarkets.percentile&&[...Array(parseInt(100*y.supermarkets.percentile))].map(((e,s)=>(0,d.jsx)("div",{className:"bars",style:{backgroundColor:(_&&_.supermarkets&&_.supermarkets.percentile?parseInt(100*_.supermarkets.percentile):0)>(y&&y.supermarkets&&y.supermarkets.percentile?parseInt(100*y.supermarkets.percentile):0)?"#152BA4":"#FFA7E5"},children:(0,d.jsx)("div",{children:"."})},s))),(0,d.jsxs)("h5",{className:"right-score",children:[y&&y.supermarkets&&y.supermarkets.percentile?Math.round(100*y.supermarkets.percentile):"","%"]})]})]})]}),u?u.white_properties.filter((e=>e.postcode===m)).map(((s,r)=>(0,d.jsx)("div",{className:"comparison-property",onClick:()=>e(`/agents/property/${s.postcode}`),children:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("div",{className:"comparison-image",style:{backgroundImage:`url('${s.image}')`}}),(0,d.jsxs)("div",{className:"comparison-content",children:[(0,d.jsx)("h4",{children:s.name}),(0,d.jsxs)("h5",{children:[(0,d.jsx)(i.h3,{value:s.price,displayType:"text",thousandSeparator:!0,prefix:"\xa3"})," offers over"]}),(0,d.jsxs)("h5",{children:["Bedrooms: ",s.bedrooms]}),(0,d.jsxs)("h5",{children:["Type: ",s.type]})]})]})},r))):""]})]})]}):""})}}}]);
//# sourceMappingURL=738.11b6f238.chunk.js.eb4873acbb40.map