"use strict";(self.webpackChunkcomplianz_gdpr=self.webpackChunkcomplianz_gdpr||[]).push([[1752],{91752:function(t,i,n){n.r(i);var a=n(30270),r=n(48399);const u=(0,a.Ue)(((t,i)=>({apiRequestActive:!1,pluginAction:"status",wordPressUrl:"#",upgradeUrl:"#",rating:[],statusLoaded:!1,startPluginAction:(n,a)=>{let u={};t({apiRequestActive:!0}),u.pluginAction=void 0!==a?a:i().pluginAction,u.slug=n;let e=!1;"download"===u.pluginAction&&(e="activate"),r.doAction("plugin_actions",u).then((a=>{t({pluginAction:a.pluginAction,wordPressUrl:a.wordpress_url,upgradeUrl:a.upgrade_url});let r=Math.round(a.star_rating.rating/10,0)/2;t({rating:r,ratingCount:a.star_rating.rating_count,apiRequestActive:!1,statusLoaded:!0}),"activate"===e&&"installed"!==a.pluginAction&&i().startPluginAction(n,a.pluginAction)}))}})));i.default=u}}]);