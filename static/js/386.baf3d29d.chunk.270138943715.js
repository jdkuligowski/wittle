"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[386],{25605:function(e,s,t){t.r(s),t.d(s,{default:function(){return E}});var a=t(28381),n=t(65293),i=t(42524),l=(t(95325),t(15211)),o=t(47142),r=(t(61505),t(29343));var c=e=>{let{restaurants1:s,cuisines:t,topRestaurants:n,gyms1:i,mainGyms:l,supermarkets1:o,mainSupermarkets:c,pubs1:h,topPubs:d}=e;const[u,p]=(0,a.useState)();return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("section",{className:"box-highlights",children:[(0,r.jsxs)("div",{className:"row",children:[(0,r.jsxs)("div",{className:"column",children:[(0,r.jsx)("h5",{className:"block-title",children:"Restaurants"}),s?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("h5",{children:["\ud83c\udf7d ",s.length," restaurants within 15 mins walk"]}),(0,r.jsxs)("h5",{children:["\ud83c\udf7d more than ",t," cuisines available"]}),(0,r.jsxs)("h5",{children:["\ud83c\udf7d ",n[0],", ",n[1]," & ",n[2]," are well rated"]})]}):""]}),(0,r.jsxs)("div",{className:"column",children:[(0,r.jsx)("h5",{className:"block-title",children:"Pubs"}),h?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("h5",{children:["\ud83c\udf7a ",h.length," pubs within 15 mins walk"]}),(0,r.jsxs)("h5",{children:["\ud83c\udf7a ",d[0],", ",d[1]," & ",d[2]," are well rated"]})]}):""]})]}),(0,r.jsxs)("div",{className:"row",children:[(0,r.jsxs)("div",{className:"column",children:[(0,r.jsx)("h5",{className:"block-title",children:"Fitness"}),i?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("h5",{children:["\ud83c\udfcb\ufe0f\u200d\u2642\ufe0f ",i.length," gyms within 15 mins walk"]}),3===l.length?(0,r.jsxs)("h5",{children:["\ud83c\udfcb\ufe0f\u200d\u2642\ufe0f includes ",l[0],", ",l[1]," & ",l[2]]}):2===l.length?(0,r.jsxs)("h5",{children:["\ud83c\udfcb\ufe0f\u200d\u2642\ufe0f includes ",l[0]," & ",l[1]," "]}):1===l.length?(0,r.jsxs)("h5",{children:["\ud83c\udfcb\ufe0f\u200d\u2642\ufe0f includes ",l[0]]}):""]}):""]}),(0,r.jsxs)("div",{className:"column",children:[(0,r.jsx)("h5",{className:"block-title",children:"Supermarkets"}),o?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("h5",{children:["\ud83d\uded2 ",o.length," supermarkets within 15 mins walk"]}),3===c.length?(0,r.jsxs)("h5",{children:["\ud83d\uded2 includes ",c[0],", ",c[1]," & ",c[2]]}):2===c.length?(0,r.jsxs)("h5",{children:["\ud83d\uded2 includes ",c[0]," & ",c[1]," "]}):1===c.length?(0,r.jsxs)("h5",{children:["\ud83d\uded2 includes ",c[0]]}):""]}):""]})]})]})})};var h=e=>{let{topPrimaries:s,topSecondaries:t}=e;const n=(0,i.s0)(),[l,o]=(0,a.useState)();return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("section",{className:"school-highlights",children:[(0,r.jsxs)("div",{className:"school-block",children:[(0,r.jsx)("h5",{className:"block-title",children:"Primary schools"}),(0,r.jsxs)("div",{className:"school-table-headers",children:[(0,r.jsx)("h5",{id:"column1",children:"#"}),(0,r.jsx)("h5",{id:"column2",children:"School name"}),(0,r.jsx)("h5",{id:"column3",children:"Ofsted"}),(0,r.jsx)("h5",{id:"column4",children:"Catchment"}),(0,r.jsx)("h5",{id:"column5",children:"Distance"})]}),(0,r.jsx)("div",{className:"school-table-details",children:s?s.map(((e,s)=>(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"school-content",children:[(0,r.jsx)("div",{className:"column",id:"column1",children:(0,r.jsx)("h5",{children:s+1})}),(0,r.jsx)("div",{className:"column",id:"column2",children:(0,r.jsx)("h5",{onClick:()=>n(`/agents/primary-schools/${e.id}`),children:e.school_name})}),(0,r.jsx)("div",{className:"column",id:"column3",children:null!==e.ofsted_results?(0,r.jsx)("h5",{children:e.ofsted_results}):(0,r.jsx)("h5",{children:"N/a"})}),(0,r.jsx)("div",{className:"column",id:"column4",children:(0,r.jsx)("h5",{children:e.within_catchment})}),(0,r.jsx)("div",{className:"column",id:"column5",children:(0,r.jsxs)("h5",{children:[e.walkTimeMin," mins"]})})]})}))):""})]}),(0,r.jsxs)("div",{className:"school-block",children:[(0,r.jsx)("h5",{className:"block-title",children:"Secondary schools"}),(0,r.jsxs)("div",{className:"school-table-headers",children:[(0,r.jsx)("h5",{id:"column1",children:"#"}),(0,r.jsx)("h5",{id:"column2",children:"School name"}),(0,r.jsx)("h5",{id:"column3",children:"Ofsted"}),(0,r.jsx)("h5",{id:"column4",children:"Catchment"}),(0,r.jsx)("h5",{id:"column5",children:"Distance"})]}),(0,r.jsx)("div",{className:"school-table-details",children:t?t.map(((e,s)=>(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"school-content",children:[(0,r.jsx)("div",{className:"column",id:"column1",children:(0,r.jsx)("h5",{children:s+1})}),(0,r.jsx)("div",{className:"column",id:"column2",children:(0,r.jsx)("h5",{onClick:()=>n(`/agents/secondary-schools/${e.id}`),children:e.school_name})}),(0,r.jsx)("div",{className:"column",id:"column3",children:null!==e.ofsted_results?(0,r.jsx)("h5",{children:e.ofsted_results}):(0,r.jsx)("h5",{children:"N/a"})}),(0,r.jsx)("div",{className:"column",id:"column4",children:(0,r.jsx)("h5",{children:e.within_catchment})}),(0,r.jsx)("div",{className:"column",id:"column5",children:(0,r.jsxs)("h5",{children:[e.walkTimeMin," mins"]})})]})}))):""})]})]})})};var d=e=>{let{postcodeData:s,tubes1:t}=e;return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("section",{className:"box-highlights",children:[(0,r.jsxs)("div",{className:"row",children:[(0,r.jsxs)("div",{className:"column",children:[(0,r.jsx)("h5",{className:"block-title",children:"Tubes"}),t&&t.length>0?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("h5",{children:["\ud83d\ude87 ",t.length," tube stations within 20 mins walk"]}),(0,r.jsxs)("h5",{children:["\ud83d\ude87 ",t[0].station_name," is ",t[0].walkTimeMin," mins away"]}),t.length>2?(0,r.jsxs)("h5",{children:["\ud83d\ude87 ",t[1].station_name," and ",t[2].station_name," are also nearby"]}):1===t.length?(0,r.jsxs)("h5",{children:["\ud83d\ude87 ",t[1].station_name," is also nearby"]}):""]}):(0,r.jsx)("h5",{children:"\ud83d\ude87 No tube stations within 20 min walk of this property"})]}),(0,r.jsxs)("div",{className:"column",children:[(0,r.jsx)("h5",{className:"block-title",children:"Electric vehicles"}),s?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("h5",{children:["\ud83d\ude87 ",s[0].ev.ev_10_mins," charging points within 10 mins walk"]}),(0,r.jsxs)("h5",{children:["\ud83d\ude87 in the top ",Math.round(100*(1-s[0].ev.percentile)),"% of areas in London for ev charging access"]})]}):""]})]}),(0,r.jsx)("div",{className:"row",children:(0,r.jsxs)("div",{className:"column",children:[(0,r.jsx)("h5",{className:"block-title",children:"Trains"}),(0,r.jsx)("h5",{children:"\ud83d\ude8a 2 train stations within 20 mins walk"}),(0,r.jsx)("h5",{children:"\ud83d\ude8a North Dulwich is 18 mins away"})]})})]})})};var u=e=>{let{postcodeData:s}=e;return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("section",{className:"box-highlights",children:(0,r.jsxs)("div",{className:"row",children:[(0,r.jsxs)("div",{className:"column",children:[(0,r.jsx)("h5",{className:"block-title",children:"Green space"}),s?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("h5",{children:["\ud83c\udf33 within top ",100-s[0].parks_lsoa[0].london_percentile,"% of areas in london for access to greenspace"]}),(0,r.jsxs)("h5",{children:["\ud83c\udf33 ",s[0].parks_postcode.park_name0," within ",Math.ceil(s[0].parks_postcode.distance0/1e3/5*60)," mins walk"]})]}):""]}),(0,r.jsxs)("div",{className:"column",children:[(0,r.jsx)("h5",{className:"block-title",children:"Crime"}),s?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("h5",{children:["\ud83d\ude93 in the lowest ",Math.round(100*s[0].crime[0].percentile),"% of areas in London for reported crimes"]}),(0,r.jsxs)("h5",{children:["\ud83d\ude93 in the lowest ",Math.round(100*s[0].crime[0].area_specific_percentile),"% of areas in ",s[0].crime[0].borough," for reported crimes"]})]}):""]})]})})})},p=t(15828),m=t(97463),x=t(17077),g=t(35019);var j=e=>{let{neighbourhoodScore:s,postcodeData:t}=e;const a=[{name:"Score",value:s},{name:"Remainder",value:100-s}],n=["#051885","#FFA7E5"],i=[{name:"Score",value:t[0].parks_lsoa[0].london_percentile},{name:"Remainder",value:100-t[0].parks_lsoa[0].london_percentile}],l=[{name:"Score",value:Math.ceil(100*t[0].restaurants.normal_percentile)},{name:"Remainder",value:Math.ceil(100*(1-t[0].restaurants.normal_percentile))}],o=[{name:"Score",value:Math.round(100*t[0].crime[0].percentile)},{name:"Remainder",value:Math.round(100*(1-t[0].crime[0].percentile))}],c=[{name:"Score",value:Math.ceil(100*t[0].tubes.percentile)},{name:"Remainder",value:Math.ceil(100*(1-t[0].tubes.percentile))}],h=[{name:"Score",value:Math.ceil(100*t[0].secondaries.total_score_percentile)},{name:"Remainder",value:Math.ceil(100*(1-t[0].secondaries.total_score_percentile))}];return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("section",{className:"summary-section",children:(0,r.jsxs)("div",{className:"row",children:[(0,r.jsxs)("div",{className:"individual-box",children:[(0,r.jsx)("div",{className:"pie-chart",children:(0,r.jsx)(p.u,{width:100,height:100,children:(0,r.jsxs)(m.b,{data:a,cx:40,cy:50,innerRadius:25,outerRadius:45,fill:"#8884d8",paddingAngle:1,dataKey:"value",startAngle:0,children:[a.map(((e,s)=>(0,r.jsx)(x.b,{fill:n[s%n.length],startAngle:0===s?0:360*a[s-1].value/100,endAngle:360*e.value/100},`cell-${s}`))),(0,r.jsx)(g._,{value:`${s}%`,position:"center",fontSize:15,fontWeight:"bold",fill:"#FFA7E5"})]})})}),(0,r.jsx)("div",{className:"content",children:(0,r.jsx)("h1",{children:"Neighbourhood score"})})]}),(0,r.jsxs)("div",{className:"individual-box",children:[(0,r.jsx)("div",{className:"pie-chart",children:(0,r.jsx)(p.u,{width:100,height:100,children:(0,r.jsxs)(m.b,{data:i,cx:40,cy:50,innerRadius:25,outerRadius:45,fill:"#8884d8",paddingAngle:1,dataKey:"value",startAngle:0,children:[i.map(((e,s)=>(0,r.jsx)(x.b,{fill:n[s%n.length],startAngle:0===s?0:360*a[s-1].value/100,endAngle:360*e.value/100},`cell-${s}`))),(0,r.jsx)(g._,{value:`${i[0].value>50?i[1].value:i[0].value}%`,position:"center",fontSize:15,fontWeight:"bold",fill:"#FFA7E5"})]})})}),(0,r.jsx)("div",{className:"content",children:i[0].value>50?(0,r.jsxs)("h1",{children:["within top ",i[1].value,"% of areas of London for access to greenspace"]}):(0,r.jsxs)("h1",{children:["within bottom ",i[0].value,"% of areas of London for access to greenspace"]})})]}),(0,r.jsxs)("div",{className:"individual-box",children:[(0,r.jsx)("div",{className:"pie-chart",children:(0,r.jsx)(p.u,{width:100,height:100,children:(0,r.jsxs)(m.b,{data:h,cx:40,cy:50,innerRadius:25,outerRadius:45,fill:"#8884d8",paddingAngle:1,dataKey:"value",startAngle:0,children:[h.map(((e,s)=>(0,r.jsx)(x.b,{fill:n[s%n.length],startAngle:0===s?0:360*a[s-1].value/100,endAngle:360*e.value/100},`cell-${s}`))),(0,r.jsx)(g._,{value:100-h[0].value+"%",position:"center",fontSize:15,fontWeight:"bold",fill:"#FFA7E5"})]})})}),(0,r.jsx)("div",{className:"content",children:(0,r.jsxs)("h1",{children:["within top ",100-h[0].value,"% of areas of London for secondary schools"]})})]}),(0,r.jsxs)("div",{className:"individual-box",children:[(0,r.jsx)("div",{className:"pie-chart",children:(0,r.jsx)(p.u,{width:100,height:100,children:(0,r.jsxs)(m.b,{data:l,cx:40,cy:50,innerRadius:25,outerRadius:45,fill:"#8884d8",paddingAngle:1,dataKey:"value",startAngle:0,children:[l.map(((e,s)=>(0,r.jsx)(x.b,{fill:n[s%n.length],startAngle:0===s?0:360*a[s-1].value/100,endAngle:360*e.value/100},`cell-${s}`))),(0,r.jsx)(g._,{value:100-l[0].value+"%",position:"center",fontSize:15,fontWeight:"bold",fill:"#FFA7E5"})]})})}),(0,r.jsx)("div",{className:"content",children:(0,r.jsxs)("h1",{children:["within best ",100-l[0].value,"% of areas of London for number of quality restaurants"]})})]}),(0,r.jsxs)("div",{className:"individual-box",children:[(0,r.jsx)("div",{className:"pie-chart",children:(0,r.jsx)(p.u,{width:100,height:100,children:(0,r.jsxs)(m.b,{data:o.reverse(),cx:40,cy:50,innerRadius:25,outerRadius:45,fill:"#8884d8",paddingAngle:1,dataKey:"value",startAngle:0,children:[o.map(((e,s)=>(0,r.jsx)(x.b,{fill:n[s%n.length],startAngle:0===s?0:360*a[s-1].value/100,endAngle:360*e.value/100},`cell-${s}`))),(0,r.jsx)(g._,{value:`${o[1].value>50?o[0].value:o[1].value}%`,position:"center",fontSize:15,fontWeight:"bold",fill:"#FFA7E5"})]})})}),(0,r.jsx)("div",{className:"content",children:o[1].value>50?(0,r.jsxs)("h1",{children:["In the highest ",o[0].value,"% of areas in London for reported crimes"]}):(0,r.jsxs)("h1",{children:["In the lowest ",o[1].value,"% of areas in London for reported crimes"]})})]}),(0,r.jsxs)("div",{className:"individual-box",children:[(0,r.jsx)("div",{className:"pie-chart",children:(0,r.jsx)(p.u,{width:100,height:100,children:(0,r.jsxs)(m.b,{data:c,cx:40,cy:50,innerRadius:25,outerRadius:45,fill:"#8884d8",paddingAngle:1,dataKey:"value",startAngle:0,children:[c.map(((e,s)=>(0,r.jsx)(x.b,{fill:n[s%n.length],startAngle:0===s?0:360*a[s-1].value/100,endAngle:360*e.value/100},`cell-${s}`))),(0,r.jsx)(g._,{value:100-c[0].value+"%",position:"center",fontSize:15,fontWeight:"bold",fill:"#FFA7E5"})]})})}),(0,r.jsx)("div",{className:"content",children:(0,r.jsxs)("h1",{children:["within top ",100-c[0].value,"% of areas of London for access to tubes"]})})]})]})})})};var f=e=>{let{sliderSelection:s,setSliderSelection:t}=e;return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"detail-slider",children:[(0,r.jsx)("h5",{onClick:()=>t("Primary schools"),style:{backgroundColor:"Primary schools"===s?"rgba(255, 167, 229, 1)":"initial",fontWeight:"Primary schools"===s?"bold":"initial"},children:"Primary schools"}),(0,r.jsx)("h5",{onClick:()=>t("Secondary schools"),style:{backgroundColor:"Secondary schools"===s?"rgba(255, 167, 229, 1)":"initial",fontWeight:"Secondary schools"===s?"bold":"initial"},children:"Secondary schools"}),(0,r.jsx)("h5",{onClick:()=>t("Restaurants"),style:{backgroundColor:"Restaurants"===s?"rgba(255, 167, 229, 1)":"initial",fontWeight:"Restaurants"===s?"bold":"initial"},children:"Restaurants"}),(0,r.jsx)("h5",{onClick:()=>t("Pubs"),style:{backgroundColor:"Pubs"===s?"rgba(255, 167, 229, 1)":"initial",fontWeight:"Pubs"===s?"bold":"initial"},children:"Pubs"}),(0,r.jsx)("h5",{onClick:()=>t("Supermarkets"),style:{backgroundColor:"Supermarkets"===s?"rgba(255, 167, 229, 1)":"initial",fontWeight:"Supermarkets"===s?"bold":"initial"},children:"Supermarkets"}),(0,r.jsx)("h5",{onClick:()=>t("Fitness"),style:{backgroundColor:"Fitness"===s?"rgba(255, 167, 229, 1)":"initial",fontWeight:"Fitness"===s?"bold":"initial"},children:"Fitness"}),(0,r.jsx)("h5",{onClick:()=>t("EVs"),style:{backgroundColor:"EVs"===s?"rgba(255, 167, 229, 1)":"initial",fontWeight:"EVs"===s?"bold":"initial"},children:"EVs"})]})})},v=t(36051),y=t(54738),b=t(59693),w=t(8772),N=t(65554),M=t(79877),k=t(24377),S=t(9663),F=t(9738),_=t(37336),P=t(12779),D=t(49354);var E=()=>{const{postcode:e}=(0,i.UO)(),s=(0,i.s0)(),t=(0,i.TH)(),[p,m]=(0,a.useState)([]),[x,g]=(0,a.useState)("My properties"),[E,C]=(0,a.useState)("My properties"),[A,T]=(0,a.useState)(!1),[R,W]=(0,a.useState)(),[U,Z]=(0,a.useState)(),[L,q]=(0,a.useState)(),[$,I]=(0,a.useState)(),[z,V]=(0,a.useState)("Property overview"),[B,H]=(0,a.useState)(!1),[K,O]=(0,a.useState)(!1),[G,Y]=(0,a.useState)(!1),[J,Q]=(0,a.useState)(!1),[X,ee]=(0,a.useState)(!1),[se,te]=(0,a.useState)(),[ae,ne]=(0,a.useState)(),[ie,le]=(0,a.useState)(),[oe,re]=(0,a.useState)(),[ce,he]=(0,a.useState)(),[de,ue]=(0,a.useState)(),[pe,me]=(0,a.useState)(),[xe,ge]=(0,a.useState)(),[je,fe]=(0,a.useState)(),[ve,ye]=(0,a.useState)(),[be,we]=(0,a.useState)(),[Ne,Me]=(0,a.useState)(),[ke,Se]=(0,a.useState)(),[Fe,_e]=(0,a.useState)(),[Pe,De]=(0,a.useState)(),[Ee,Ce]=(0,a.useState)(),[Ae,Te]=(0,a.useState)(),[Re,We]=(0,a.useState)([]),[Ue,Ze]=(0,a.useState)([]),[Le,qe]=(0,a.useState)([]),[$e,Ie]=(0,a.useState)([]),[ze,Ve]=(0,a.useState)(),[Be,He]=(0,a.useState)(),[Ke,Oe]=(0,a.useState)(),[Ge,Ye]=(0,a.useState)("Primary schools"),[Je,Qe]=(0,a.useState)();(0,a.useEffect)((()=>{(()=>{try{(async()=>{const{data:s}=await n.ZP.get(`/api/postcodes/${e}`);console.log("postcode data ->",s),W(s)})()}catch(s){I(!0),console.log(s)}})()}),[]);(0,a.useEffect)((()=>{(()=>{if((0,l.Hb)())try{(async()=>{const{data:e}=await n.ZP.get(`/api/auth/profile/${(0,l.Nh)()}/`,{headers:{Authorization:`Bearer ${(0,l.hP)()}`}});let s=0;e.white_properties.forEach((e=>{s+=e.price}));const t={...e,total_value:s};Z(t),Qe(e.white_properties),console.log("user data ->",t)})()}catch(e){I(!0),console.log(e)}else s("/access-denied"),console.log("no account")})()}),[]);(0,a.useEffect)((()=>{R&&U&&(()=>{const s=U.white_properties.find((s=>s.postcode===e));q(s),console.log("current-property ->",s)})()}),[R,U]);(0,a.useEffect)((()=>{R&&(()=>{try{(async()=>{const{data:e}=await n.ZP.get("/api/primaries/");te(e)})()}catch(e){I(!0),console.log(e)}})()}),[R]);const Xe=20/60*5,es=6371,ss=e=>e*Math.PI/180,ts=5/60;(0,a.useEffect)((()=>{se&&(()=>{const e=se.filter((e=>{const s=ss(parseFloat(e.latitude)-parseFloat(R[0].longitude)),t=ss(parseFloat(e.longitude)-parseFloat(R[0].latitude)),a=Math.sin(s/2)*Math.sin(s/2)+Math.cos(ss(parseFloat(R[0].longitude)))*Math.cos(ss(parseFloat(e.latitude)))*Math.sin(t/2)*Math.sin(t/2),n=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)),i=es*n;e.distance_between=i,e.walkTimeMin=Math.round(i/ts);const l=i/e.max_distance;return"Independent school"===e.school_type?e.within_catchment="N/a":"Check"===e.max_distance||"Religion"===e.max_distance||null===e.max_distance?e.within_catchment="Check":"Does not apply"===e.max_distance?e.within_catchment="Yes":e.within_catchment=l<=.6?"Yes":l<=.8?"Very likely":l<=1?"Probably":l<=1.2?"Probably not":"No",i<=Xe})).sort(((e,s)=>e.walkTimeMin-s.walkTimeMin)),s=e.slice(0,8);he(s),ne(e),console.log("nearby primaries ->",e)})()}),[se]);(0,a.useEffect)((()=>{R&&(()=>{try{(async()=>{const{data:e}=await n.ZP.get("/api/secondaries/");le(e)})()}catch(e){I(!0),console.log(e)}})()}),[R]);(0,a.useEffect)((()=>{ie&&(()=>{const e=ie.filter((e=>{const s=ss(parseFloat(e.latitude)-parseFloat(R[0].longitude)),t=ss(parseFloat(e.longitude)-parseFloat(R[0].latitude)),a=Math.sin(s/2)*Math.sin(s/2)+Math.cos(ss(parseFloat(R[0].longitude)))*Math.cos(ss(parseFloat(e.latitude)))*Math.sin(t/2)*Math.sin(t/2),n=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)),i=es*n;e.distance_between=i,e.walkTimeMin=Math.round(i/ts);const l=i/e.max_distance;return"Independent school"===e.school_type?e.within_catchment="N/a":"Check"===e.max_distance||"Religion"===e.max_distance||null===e.max_distance?e.within_catchment="Check":"Does not apply"===e.max_distance?e.within_catchment="Yes":e.within_catchment=l<=.6?"Yes":l<=.8?"Very likely":l<=1?"Probably":l<=1.2?"Probably not":"No",i<=2.5})).sort(((e,s)=>e.walkTimeMin-s.walkTimeMin)),s=e.slice(0,8);ue(s),re(e),console.log("nearby secondaries ->",e)})()}),[ie]);(0,a.useEffect)((()=>{R&&(()=>{try{(async()=>{const{data:e}=await n.ZP.get("/api/restaurants/");me(e)})()}catch(e){I(!0),console.log(e)}})()}),[R]);const as=1.25;(0,a.useEffect)((()=>{pe&&(()=>{const e=pe.filter((e=>{const s=ss(parseFloat(e.latitude)-parseFloat(R[0].longitude)),t=ss(parseFloat(e.longitude)-parseFloat(R[0].latitude)),a=Math.sin(s/2)*Math.sin(s/2)+Math.cos(ss(parseFloat(R[0].longitude)))*Math.cos(ss(parseFloat(e.latitude)))*Math.sin(t/2)*Math.sin(t/2),n=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)),i=es*n;return e.distance_between=i,e.walkTimeMin=Math.round(i/ts),i<=as})).sort(((e,s)=>s.rating-e.rating)),s=e.filter((e=>"No Cuisine Data"!==e.cuisine)).slice(0,3).map((e=>e.restaurant_name));Te((e=>new Set(e.map((e=>e.cuisine))).size)(e)),Me(e),We(s),console.log("Nearby restaurants ->",e)})()}),[pe]);(0,a.useEffect)((()=>{R&&(()=>{try{(async()=>{const{data:e}=await n.ZP.get("/api/gyms/");console.log("gyms data ->",e),ge(e)})()}catch(e){I(!0),console.log(e)}})()}),[R]);(0,a.useEffect)((()=>{xe&&(()=>{const e=["third space","pure gym","1 rebel","virgin","barry's","the gym group"],s=new Set,t=xe.filter((e=>{const s=ss(parseFloat(e.Lat)-parseFloat(R[0].longitude)),t=ss(parseFloat(e.long)-parseFloat(R[0].latitude)),a=Math.sin(s/2)*Math.sin(s/2)+Math.cos(ss(parseFloat(R[0].longitude)))*Math.cos(ss(parseFloat(e.Lat)))*Math.sin(t/2)*Math.sin(t/2),n=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)),i=es*n;return e.distance_between=i,e.walkTimeMin=Math.round(i/ts),i<=as})).sort(((e,s)=>e.walkTimeMin-s.walkTimeMin)),a=[];for(let n=0;n<t.length;n++){const i=t[n];if(i.gym_group&&e.includes(i.gym_group.toLowerCase())&&!s.has(i.gym_group)&&(a.push(i.gym_group),s.add(i.gym_group),3===a.length))break}Se(t),qe(a)})()}),[xe]);(0,a.useEffect)((()=>{R&&(()=>{try{(async()=>{const{data:e}=await n.ZP.get("/api/supermarkets/");ye(e)})()}catch(e){I(!0),console.log(e)}})()}),[R]);(0,a.useEffect)((()=>{ve&&(()=>{const e=["m&s food","waitrose","aldi","lidl","sainsbury's","tesco","asda"],s=new Set,t=ve.map((e=>{const s=ss(parseFloat(e.Lat)-parseFloat(R[0].longitude)),t=ss(parseFloat(e.long)-parseFloat(R[0].latitude)),a=Math.sin(s/2)*Math.sin(s/2)+Math.cos(ss(parseFloat(R[0].longitude)))*Math.cos(ss(parseFloat(e.Lat)))*Math.sin(t/2)*Math.sin(t/2),n=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)),i=es*n;return e.distance_between=i,e.walkTimeMin=Math.round(i/ts),{...e,distance:i}})).filter((e=>e.distance<=as)),a=[];for(let n=0;n<t.length;n++){const i=t[n];if(e.includes(i.cleansed_name.toLowerCase())&&!s.has(i.cleansed_name)&&(a.push(i.cleansed_name),s.add(i.cleansed_name),3===a.length))break}De(t),Ie(a),console.log("Nearby supermarkets ->",t)})()}),[ve]);(0,a.useEffect)((()=>{R&&(()=>{try{(async()=>{const{data:e}=await n.ZP.get("/api/tubes/");Ve(e)})()}catch(e){I(!0),console.log(e)}})()}),[R]);(0,a.useEffect)((()=>{ze&&(()=>{const e=ze.filter((e=>{const s=ss(parseFloat(e.lat)-parseFloat(R[0].longitude)),t=ss(parseFloat(e.long)-parseFloat(R[0].latitude)),a=Math.sin(s/2)*Math.sin(s/2)+Math.cos(ss(parseFloat(R[0].longitude)))*Math.cos(ss(parseFloat(e.lat)))*Math.sin(t/2)*Math.sin(t/2),n=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)),i=es*n;return e.distance_between=i,e.walkTimeMin=Math.round(i/ts),i<=Xe})).sort(((e,s)=>e.walkTimeMin-s.walkTimeMin));He(e),console.log("Nearby tubes ->",e)})()}),[ze]);(0,a.useEffect)((()=>{R&&(()=>{try{(async()=>{const{data:e}=await n.ZP.get("/api/evs/");console.log("ev data ->",e),we(e)})()}catch(e){I(!0),console.log(e)}})()}),[R]);(0,a.useEffect)((()=>{be&&(()=>{const e=be.filter((e=>{const s=ss(parseFloat(e.latitude)-parseFloat(R[0].longitude)),t=ss(parseFloat(e.longitude)-parseFloat(R[0].latitude)),a=Math.sin(s/2)*Math.sin(s/2)+Math.cos(ss(parseFloat(R[0].longitude)))*Math.cos(ss(parseFloat(e.latitude)))*Math.sin(t/2)*Math.sin(t/2),n=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)),i=es*n;return e.distance_between=i,e.walkTimeMin=Math.round(i/ts),i<=.8333333333333333})).sort(((e,s)=>e.walkTimeMin-s.walkTimeMin));Ce(e)})()}),[be]);(0,a.useEffect)((()=>{R&&(()=>{try{(async()=>{const{data:e}=await n.ZP.get("/api/pubs/");console.log("pub data ->",e),fe(e)})()}catch(e){I(!0),console.log(e)}})()}),[R]);(0,a.useEffect)((()=>{je&&(()=>{const e=je.filter((e=>{const s=ss(parseFloat(e.latitude)-parseFloat(R[0].longitude)),t=ss(parseFloat(e.longitude)-parseFloat(R[0].latitude)),a=Math.sin(s/2)*Math.sin(s/2)+Math.cos(ss(parseFloat(R[0].longitude)))*Math.cos(ss(parseFloat(e.latitude)))*Math.sin(t/2)*Math.sin(t/2),n=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)),i=es*n;return e.distance_between=i,e.walkTimeMin=Math.round(i/ts),i<=as})).sort(((e,s)=>e.walkTimeMin-s.walkTimeMin)),s=e.slice(0,3).map((e=>e.name));_e(e),Ze(s),console.log("Nearby pubs ->",e)})()}),[je]);(0,a.useEffect)((()=>{R&&(()=>{const e=Math.ceil((1-R[0].crime[0].percentile+R[0].ev.percentile+R[0].fitness.percentile+(1-R[0].parks_lsoa[0].london_percentile/100)+R[0].restaurants.normal_percentile+R[0].supermarkets.percentile+R[0].tubes.percentile)/7*100);Oe(e)})()})),(0,a.useEffect)((()=>{m((e=>[...e,t.pathname]))}),[t]);return(0,a.useEffect)((()=>{console.log(`profileContent updated to: ${x}`)}),[x]),(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("section",{className:"agent-specific-property print-container",children:[(0,r.jsx)("div",{className:"desktop-nav",children:(0,r.jsx)(w.Z,{navbarColour:"#FDF7F0"})}),(0,r.jsx)("div",{className:"mobile-nav",children:(0,r.jsx)(_.Z,{setProfileContent:g,profileContent:x,profileDetail:E,setProfileDetail:C})}),(0,r.jsx)(b.Z,{setProfileDetail:C,variableSide:A,setProfileContent:g,setVariableSide:T}),(0,r.jsx)("div",{className:"go-back-button no-print remove-margin",children:(0,r.jsx)("h5",{onClick:()=>s("/agents/profile"),children:"<- back to profile"})}),(0,r.jsxs)("div",{className:"property-options no-print",children:[(0,r.jsxs)("div",{className:"left-section",children:[(0,r.jsx)("h5",{className:"no-print",onClick:()=>V("Property overview"),style:{textDecoration:"Property overview"===z?"underline 2px #FFA7E5":"none",textUnderlineOffset:"Property overview"===z?"0.5em":"initial",fontWeight:"Property overview"===z?"700":"400"},children:"Property overview"}),(0,r.jsx)("h5",{className:"no-print",onClick:()=>V("Property details"),style:{textDecoration:"Property details"===z?"underline 2px #FFA7E5":"none",textUnderlineOffset:"Property details"===z?"0.5em":"initial",fontWeight:"Property details"===z?"700":"400"},children:"Property details"})]}),(0,r.jsx)("h1",{className:"print-button no-print",onClick:()=>window.print(),children:"\ud83d\udda8"})]}),"Property overview"===z?(0,r.jsxs)("section",{className:"property-wrapper",children:[L?(0,r.jsxs)("section",{className:"property-details remove-margin",children:[(0,r.jsx)("img",{className:"property-image",src:L.image,alt:"property-image"}),(0,r.jsx)("div",{className:"property-content",children:(0,r.jsxs)("div",{className:"content-blocks",children:[(0,r.jsxs)("div",{className:"content-summary",children:[(0,r.jsxs)("div",{className:"content-top-line",children:[(0,r.jsx)("h1",{children:L.name}),(0,r.jsx)("h1",{children:(0,r.jsx)(o.h3,{value:L.price,displayType:"text",thousandSeparator:!0,prefix:"\xa3"})})]}),(0,r.jsx)("h3",{children:L.address})]}),(0,r.jsxs)("div",{className:"content-details",children:[(0,r.jsxs)("div",{className:"content-details-top",children:[(0,r.jsxs)("h4",{children:["\ud83c\udfe0 ",L.type]}),(0,r.jsxs)("h4",{children:["\ud83d\udce6 ",L.size]})]}),(0,r.jsxs)("div",{className:"content-details-bottom",children:[(0,r.jsxs)("h4",{children:["\ud83d\udecc x ",L.bedrooms]}),(0,r.jsxs)("h4",{children:["\ud83d\udec1 x ",L.bathrooms]}),(0,r.jsxs)("h4",{children:["\ud83d\udecb x ",L.living_rooms]})]})]})]})})]}):"",(0,r.jsxs)("section",{className:"property-summary-sections remove-margin",children:[(0,r.jsxs)("div",{className:"property-highlight",onClick:()=>H(!B),children:[(0,r.jsx)("h3",{children:"Property Summary"}),(0,r.jsx)("div",{className:"click-downs",children:B?(0,r.jsx)("h4",{children:"^"}):(0,r.jsx)("h4",{children:"v"})})]}),R&&B?(0,r.jsx)(j,{neighbourhoodScore:Ke,postcodeData:R}):"",(0,r.jsx)("hr",{className:"highlight-separator"}),(0,r.jsxs)("div",{className:"property-highlight",onClick:()=>O(!K),children:[(0,r.jsx)("h3",{children:"School Highlights"}),(0,r.jsx)("div",{className:"click-downs",children:K?(0,r.jsx)("h4",{children:"^"}):(0,r.jsx)("h4",{children:"v"})})]}),K?(0,r.jsx)(h,{topPrimaries:ce,topSecondaries:de}):"",(0,r.jsx)("hr",{className:"highlight-separator"}),(0,r.jsxs)("div",{className:"property-highlight",onClick:()=>Y(!G),children:[(0,r.jsx)("h3",{children:"Lifestyle Highlights"}),(0,r.jsx)("div",{className:"click-downs",children:G?(0,r.jsx)("h4",{children:"^"}):(0,r.jsx)("h4",{children:"v"})})]}),G?(0,r.jsx)(c,{restaurants1:Ne,cuisines:Ae,topRestaurants:Re,gyms1:ke,mainGyms:Le,supermarkets1:Pe,mainSupermarkets:$e,pubs1:Fe,topPubs:Ue}):"",(0,r.jsx)("hr",{className:"highlight-separator"}),(0,r.jsxs)("div",{className:"property-highlight",onClick:()=>Q(!J),children:[(0,r.jsx)("h3",{children:"Transport Highlights"}),(0,r.jsx)("div",{className:"click-downs",children:J?(0,r.jsx)("h4",{children:"^"}):(0,r.jsx)("h4",{children:"v"})})]}),J?(0,r.jsx)(d,{postcodeData:R,tubes1:Be}):"",(0,r.jsx)("hr",{className:"highlight-separator"}),(0,r.jsxs)("div",{className:"property-highlight",onClick:()=>ee(!X),children:[(0,r.jsx)("h3",{children:"Neighbourhood Highlights"}),(0,r.jsx)("div",{className:"click-downs",children:X?(0,r.jsx)("h4",{children:"^"}):(0,r.jsx)("h4",{children:"v"})})]}),X?(0,r.jsx)(u,{postcodeData:R}):""]})]}):"Property details"===z?(0,r.jsxs)("section",{className:"property-wrapper",children:[(0,r.jsx)(f,{sliderSelection:Ge,setSliderSelection:Ye}),"Primary schools"===Ge?(0,r.jsx)(v.Z,{primaryData1:ae,setPrimaryData1:ne,propertyData:L,listType:"short list",postcodeData:R}):"Secondary schools"===Ge?(0,r.jsx)(y.Z,{secondaryData1:oe,setSecondaryData1:re,propertyData:L,listType:"short list",postcodeData:R}):"Restaurants"===Ge?(0,r.jsx)(N.Z,{restaurants1:Ne,setRestaurants1:Me,propertyData:L,listType:"short list",postcodeData:R}):"Fitness"===Ge?(0,r.jsx)(M.Z,{gyms1:ke,setGyms1:Se,propertyData:L,listType:"short list",postcodeData:R}):"Supermarkets"===Ge?(0,r.jsx)(k.Z,{supermarkets1:Pe,setSupermarkets1:De,propertyData:L,listType:"short list",postcodeData:R}):"EVs"===Ge?(0,r.jsx)(P.Z,{ev1:Ee,setEv1:Ce,propertyData:L,listType:"short list",postcodeData:R}):"Pubs"===Ge?(0,r.jsx)(D.Z,{pubs1:Fe,setPubs1:_e,propertyData:L,listType:"short list",postcodeData:R}):""]}):"Variables"===z?(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(S.default,{profileDetail:E,setProfileDetail:C,profileContent:x})}):"Comparison"===x?(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(F.default,{userData:U,propertyList:Je})}):""]})})}},54038:function(e,s,t){function a(){var e=this.constructor.getDerivedStateFromProps(this.props,this.state);null!==e&&void 0!==e&&this.setState(e)}function n(e){this.setState(function(s){var t=this.constructor.getDerivedStateFromProps(e,s);return null!==t&&void 0!==t?t:null}.bind(this))}function i(e,s){try{var t=this.props,a=this.state;this.props=e,this.state=s,this.__reactInternalSnapshotFlag=!0,this.__reactInternalSnapshot=this.getSnapshotBeforeUpdate(t,a)}finally{this.props=t,this.state=a}}function l(e){var s=e.prototype;if(!s||!s.isReactComponent)throw new Error("Can only polyfill class components");if("function"!==typeof e.getDerivedStateFromProps&&"function"!==typeof s.getSnapshotBeforeUpdate)return e;var t=null,l=null,o=null;if("function"===typeof s.componentWillMount?t="componentWillMount":"function"===typeof s.UNSAFE_componentWillMount&&(t="UNSAFE_componentWillMount"),"function"===typeof s.componentWillReceiveProps?l="componentWillReceiveProps":"function"===typeof s.UNSAFE_componentWillReceiveProps&&(l="UNSAFE_componentWillReceiveProps"),"function"===typeof s.componentWillUpdate?o="componentWillUpdate":"function"===typeof s.UNSAFE_componentWillUpdate&&(o="UNSAFE_componentWillUpdate"),null!==t||null!==l||null!==o){var r=e.displayName||e.name,c="function"===typeof e.getDerivedStateFromProps?"getDerivedStateFromProps()":"getSnapshotBeforeUpdate()";throw Error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n"+r+" uses "+c+" but also contains the following legacy lifecycles:"+(null!==t?"\n  "+t:"")+(null!==l?"\n  "+l:"")+(null!==o?"\n  "+o:"")+"\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks")}if("function"===typeof e.getDerivedStateFromProps&&(s.componentWillMount=a,s.componentWillReceiveProps=n),"function"===typeof s.getSnapshotBeforeUpdate){if("function"!==typeof s.componentDidUpdate)throw new Error("Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype");s.componentWillUpdate=i;var h=s.componentDidUpdate;s.componentDidUpdate=function(e,s,t){var a=this.__reactInternalSnapshotFlag?this.__reactInternalSnapshot:t;h.call(this,e,s,a)}}return e}t.r(s),t.d(s,{polyfill:function(){return l}}),a.__suppressDeprecationWarning=!0,n.__suppressDeprecationWarning=!0,i.__suppressDeprecationWarning=!0}}]);
//# sourceMappingURL=386.baf3d29d.chunk.js.1f3b97ae0c59.map