"use strict";(self.webpackChunkcomplianz_gdpr=self.webpackChunkcomplianz_gdpr||[]).push([[3086,8857,5671,849],{38857:function(e,t,a){a.r(t),a.d(t,{default:function(){return w}});var n=a(69307),l=a(99196),r=a(87462),s=a(36206),c=a(28771),i=a(25360),o=a(77342),d=a(57898),u=a(7546),p=a(75320);const h="Switch",[m,g]=(0,i.b)(h),[f,b]=m(h),_=(0,l.forwardRef)(((e,t)=>{const{__scopeSwitch:a,name:n,checked:i,defaultChecked:d,required:u,disabled:h,value:m="on",onCheckedChange:g,...b}=e,[_,E]=(0,l.useState)(null),k=(0,c.e)(t,(e=>E(e))),w=(0,l.useRef)(!1),S=!_||Boolean(_.closest("form")),[z=!1,C]=(0,o.T)({prop:i,defaultProp:d,onChange:g});return(0,l.createElement)(f,{scope:a,checked:z,disabled:h},(0,l.createElement)(p.WV.button,(0,r.Z)({type:"button",role:"switch","aria-checked":z,"aria-required":u,"data-state":y(z),"data-disabled":h?"":void 0,disabled:h,value:m},b,{ref:k,onClick:(0,s.M)(e.onClick,(e=>{C((e=>!e)),S&&(w.current=e.isPropagationStopped(),w.current||e.stopPropagation())}))})),S&&(0,l.createElement)(v,{control:_,bubbles:!w.current,name:n,value:m,checked:z,required:u,disabled:h,style:{transform:"translateX(-100%)"}}))})),v=e=>{const{control:t,checked:a,bubbles:n=!0,...s}=e,c=(0,l.useRef)(null),i=(0,d.D)(a),o=(0,u.t)(t);return(0,l.useEffect)((()=>{const e=c.current,t=window.HTMLInputElement.prototype,l=Object.getOwnPropertyDescriptor(t,"checked").set;if(i!==a&&l){const t=new Event("click",{bubbles:n});l.call(e,a),e.dispatchEvent(t)}}),[i,a,n]),(0,l.createElement)("input",(0,r.Z)({type:"checkbox","aria-hidden":!0,defaultChecked:a},s,{tabIndex:-1,ref:c,style:{...e.style,...o,position:"absolute",pointerEvents:"none",opacity:0,margin:0}}))};function y(e){return e?"checked":"unchecked"}const E=_,k=(0,l.forwardRef)(((e,t)=>{const{__scopeSwitch:a,...n}=e,s=b("SwitchThumb",a);return(0,l.createElement)(p.WV.span,(0,r.Z)({"data-state":y(s.checked),"data-disabled":s.disabled?"":void 0},n,{ref:t}))}));var w=(0,l.memo)((e=>{let{value:t,onChange:a,required:l,disabled:r,className:s,label:c}=e,i=t;return"0"!==t&&"1"!==t||(i="1"===t),(0,n.createElement)("div",{className:"cmplz-input-group cmplz-switch-group"},(0,n.createElement)(E,{className:"cmplz-switch-root "+s,checked:i,onCheckedChange:a,disabled:r,required:l},(0,n.createElement)(k,{className:"cmplz-switch-thumb"})))}))},85671:function(e,t,a){a.r(t);var n=a(30270),l=a(12902),r=a(48399);const s=(0,n.Ue)(((e,t)=>({integrationsLoaded:!1,fetching:!1,services:[],plugins:[],scripts:[],placeholders:[],blockedScripts:[],setScript:(t,a)=>{e((0,l.ZP)((e=>{if("block_script"===a){let a=e.blockedScripts;if(t.urls){for(const[e,n]of Object.entries(t.urls)){if(!n||0===n.length)continue;let e=!1;for(const[t,l]of Object.entries(a))n===t&&(e=!0);e||(a[n]=n)}e.blockedScripts=a}}const n=e.scripts[a].findIndex((e=>e.id===t.id));-1!==n&&(e.scripts[a][n]=t)})))},fetchIntegrationsData:async()=>{if(t().fetching)return;e({fetching:!0});const{services:a,plugins:n,scripts:l,placeholders:r,blocked_scripts:s}=await c();let i=l;i.block_script&&i.block_script.length>0&&i.block_script.forEach(((e,t)=>{e.id=t})),i.add_script&&i.add_script.length>0&&i.add_script.forEach(((e,t)=>{e.id=t})),i.whitelist_script&&i.whitelist_script.length>0&&i.whitelist_script.forEach(((e,t)=>{e.id=t})),e((()=>({integrationsLoaded:!0,services:a,plugins:n,scripts:i,fetching:!1,placeholders:r,blockedScripts:s})))},addScript:a=>{e({fetching:!0}),e((0,l.ZP)((e=>{e.scripts[a].push({name:"general",id:e.scripts[a].length,enable:!0})})));let n=t().scripts;return r.doAction("update_scripts",{scripts:n}).then((t=>(e({fetching:!1}),t))).catch((e=>{console.error(e)}))},saveScript:(a,n)=>{e({fetching:!0}),e((0,l.ZP)((e=>{const t=e.scripts[n].findIndex((e=>e.id===a.id));-1!==t&&(e.scripts[n][t]=a)})));let s=t().scripts;return r.doAction("update_scripts",{scripts:s}).then((t=>(e({fetching:!1}),t))).catch((e=>{console.error(e)}))},deleteScript:(a,n)=>{e({fetching:!0}),e((0,l.ZP)((e=>{const t=e.scripts[n].findIndex((e=>e.id===a.id));-1!==t&&e.scripts[n].splice(t,1)})));let s=t().scripts;return r.doAction("update_scripts",{scripts:s}).then((t=>(e({fetching:!1}),t))).catch((e=>{console.error(e)}))},updatePluginStatus:async(t,a)=>{e({fetching:!0}),e((0,l.ZP)((e=>{const n=e.plugins.findIndex((e=>e.id===t));-1!==n&&(e.plugins[n].enabled=a)})));const n=await r.doAction("update_plugin_status",{plugin:t,enabled:a}).then((e=>e)).catch((e=>{console.error(e)}));return e({fetching:!1}),n},updatePlaceholderStatus:async(t,a,n)=>{e({fetching:!0}),n&&e((0,l.ZP)((e=>{const n=e.plugins.findIndex((e=>e.id===t));-1!==n&&(e.plugins[n].placeholder=a?"enabled":"disabled")})));const s=await r.doAction("update_placeholder_status",{id:t,enabled:a}).then((e=>e)).catch((e=>{console.error(e)}));return e({fetching:!1}),s}})));t.default=s;const c=()=>r.doAction("get_integrations_data",{}).then((e=>e)).catch((e=>{console.error(e)}))},73086:function(e,t,a){a.r(t);var n=a(69307),l=a(85671),r=a(65736),s=a(56293),c=a(60849),i=a(82485),o=a(99196),d=a(38857);t.default=(0,o.memo)((()=>{const{updatePlaceholderStatus:e,integrationsLoaded:t,services:o,fetchIntegrationsData:u}=(0,l.default)(),[p,h]=(0,n.useState)([]),[m,g]=(0,n.useState)(""),[f,b]=(0,n.useState)(!1),[_,v]=(0,n.useState)(!1),[y,E]=(0,n.useState)(""),[k,w]=(0,n.useState)(""),{updateField:S,getField:z,getFieldValue:C,saveFields:F,setChangedField:P,addHelpNotice:A}=(0,s.default)(),{selectedSubMenuItem:N}=(0,i.default)(),[x,I]=(0,n.useState)(null);(0,n.useEffect)((()=>{a.e(44).then(a.bind(a,90044)).then((e=>{let{default:t}=e;I((()=>t))}))}),[]),(0,n.useEffect)((()=>{t||u(),t&&(1==C("safe_mode")?(E((0,r.__)("Safe Mode enabled. To manage integrations, disable Safe Mode under Tools - Support.","complianz-gdpr")),b(!0)):"yes"!==C("uses_thirdparty_services")&&"yes"!==C("uses_social_media")&&"yes"!==C("uses_ad_cookies")&&(E((0,r.__)("Third-party services and social media are marked as not being used on your website in the wizard.","complianz-gdpr")),w("#wizard/services"),b(!0)))}),[t]),(0,n.useEffect)((()=>{Z()}),[o]);const Z=()=>{let e=[...o];e.forEach((function(t,a){let n={...t},l=z(t.source);if("multicheckbox"===l.type){let e=l.value;Array.isArray(e)||(e=[]),n.enabled=e.includes(t.id)}else n.enabled="yes"===l.value;e[a]=n})),h(e);let t="yes"===C("block_recaptcha_service"),a=o.filter((e=>"google-recaptcha"===e.id))[0];t&&a&&a.enabled&&A("integrations-services","warning",(0,r.__)("reCaptcha is connected and will be blocked before consent. To change your settings, disable reCaptcha in the list.","complianz-gdpr"),(0,r.__)("reCaptcha blocking enabled","complianz-gdpr"),"#wizard/services")};(0,n.useEffect)((()=>{if(0===p.length)return;let e="yes";0===p.filter((e=>!0===e.enabled&&"thirdparty_services_on_site"===e.source)).length&&(e="no"),C("uses_thirdparty_services")!==e&&(S("uses_thirdparty_services",e),P("uses_thirdparty_services",e));let t="yes";0===p.filter((e=>!0===e.enabled&&"socialmedia_on_site"===e.source)).length&&(t="no"),C("uses_social_media")!==t&&(S("uses_social_media",t),P("uses_social_media",t))}),[p]);const L=[{name:(0,r.__)("Service","complianz-gdpr"),selector:e=>e.label,sortable:!0,grow:5},{name:(0,r.__)("Placeholder","complianz-gdpr"),selector:e=>e.placeholderControl,sortable:!0,sortFunction:(e,t)=>{const a=e.placeholder,n=t.placeholder;return a>n?1:n>a?-1:0},grow:2},{name:(0,r.__)("Status","complianz-gdpr"),selector:e=>e.enabledControl,sortable:!0,sortFunction:(e,t)=>{const a=e.enabled,n=t.enabled;return a>n?1:n>a?-1:0},grow:1,right:!0}];let T=p.filter((e=>e.label.toLowerCase().includes(m.toLowerCase())));return T.sort(((e,t)=>e.label<t.label?-1:e.label>t.label?1:0)),T.forEach((t=>{let a=C(t.source);Array.isArray(a)?t.enabled=a.includes(t.id):t.enabled="yes"===a,t.enabledControl=(0,n.createElement)(d.default,{disabled:_,value:t.enabled,onChange:e=>(async(e,t)=>{v(!0);let a,n=z(e.source);if("multicheckbox"===n.type){let l=n.value;Array.isArray(l)||(l=[]),a=[...l],Array.isArray(a)||(a=[]),t?a.push(e.id):a=a.filter((t=>t!==e.id))}else a=t?"yes":"no";S(e.source,a),P(e.source,a),await F(N,!1),await u(),v(!1)})(t,e),className:"cmplz-switch-input-tiny"}),t.placeholderControl=(0,n.createElement)(n.Fragment,null," ","none"!==t.placeholder&&t.enabled&&(0,n.createElement)(n.Fragment,null,(0,n.createElement)(d.default,{disabled:_,value:"enabled"===t.placeholder,onChange:a=>(async(t,a)=>{v(!0);let n=[...p],l=n.findIndex((e=>e.id===t.id));n[l].placeholder=a?"enabled":"disabled",h(n),await e(t.id,a),v(!1)})(t,a),className:"cmplz-switch-input-tiny"})))})),(0,n.createElement)(n.Fragment,null,(0,n.createElement)("p",null,(0,r.__)("Enabled services will be blocked on the front-end of your website until the user has given consent (opt-in), or after the user has revoked consent (opt-out). When possible a placeholder is activated. You can also disable or configure the placeholder to your liking.","complianz-gdpr"),(0,c.default)("https://complianz.io/blocking-recaptcha-manually/")),(0,n.createElement)("div",{className:"cmplz-table-header"},(0,n.createElement)("div",{className:"cmplz-table-header-controls"},(0,n.createElement)("input",{type:"text",placeholder:(0,r.__)("Search","complianz-gdpr"),value:m,onChange:e=>g(e.target.value)}))),(f||0===T.length)&&(0,n.createElement)(n.Fragment,null,(0,n.createElement)("div",{className:"cmplz-settings-overlay"},(0,n.createElement)("div",{className:"cmplz-settings-overlay-message"},y,k&&(0,n.createElement)(n.Fragment,null," ",(0,n.createElement)("a",{href:k},(0,r.__)("View services.","complianz-gdpr")))))),0===T.length&&(0,n.createElement)(n.Fragment,null,(0,n.createElement)("div",{className:"cmplz-integrations-placeholder"},(0,n.createElement)("div",null),(0,n.createElement)("div",null),(0,n.createElement)("div",null),(0,n.createElement)("div",null),(0,n.createElement)("div",null),(0,n.createElement)("div",null))),!f&&T.length>0&&x&&(0,n.createElement)(n.Fragment,null,(0,n.createElement)(x,{columns:L,data:T,dense:!0,pagination:!0,paginationPerPage:5,noDataComponent:(0,n.createElement)("div",{className:"cmplz-no-documents"},(0,r.__)("No services","really-simple-ssl")),persistTableHead:!0,theme:"really-simple-plugins",customStyles:{headCells:{style:{paddingLeft:"0",paddingRight:"0"}},cells:{style:{paddingLeft:"0",paddingRight:"0"}}}})))}))},60849:function(e,t,a){a.r(t);var n=a(69307),l=a(65736),r=a(99950);t.default=e=>(0,n.createElement)(n.Fragment,null," ",(0,n.createElement)(r.default,{url:e,text:(0,l.__)("For more information, please read this %sarticle%s.","complianz-gdpr")})," ")},57898:function(e,t,a){a.d(t,{D:function(){return l}});var n=a(99196);function l(e){const t=(0,n.useRef)({value:e,previous:e});return(0,n.useMemo)((()=>(t.current.value!==e&&(t.current.previous=t.current.value,t.current.value=e),t.current.previous)),[e])}}}]);