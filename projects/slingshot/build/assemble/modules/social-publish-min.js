(function(){var b=YAHOO.util.Dom,w=YAHOO.util.Event,t=YAHOO.util.Selector,p=YAHOO.util.KeyListener;Alfresco.module.socialPublishing=function(z){this.name="Alfresco.module.socialPublishing";this.id=z;var y=Alfresco.util.ComponentManager.get(this.id);if(y!==null){throw new Error("An instance of Alfresco.module.socialPublishing already exists.")}Alfresco.util.ComponentManager.register(this);Alfresco.util.YUILoaderHelper.require(["button","container"],this.onComponentsLoaded,this);return this};Alfresco.module.socialPublishing.prototype={defaultShowConfig:{nodeRef:null,filename:null},showConfig:{},widgets:{},updateLimits:{},onComponentsLoaded:function e(){if(this.id===null){return}},setUpdateLimits:function m(y){this.updateLimits=y;return this},show:function v(y){this.showConfig=YAHOO.lang.merge(this.defaultShowConfig,y);if(this.showConfig.nodeRef===undefined||this.showConfig.filename===undefined){throw new Error("A nodeRef & filename must be provided")}if(this.widgets.panel){this.widgets.panel.destroy}Alfresco.util.Ajax.request({url:Alfresco.constants.URL_SERVICECONTEXT+"modules/social-publishing?nodeRef="+this.showConfig.nodeRef+"&htmlid="+this.id,successCallback:{fn:this.onTemplateLoaded,scope:this},failureMessage:Alfresco.util.message("socialPublish.template.error",this.name),execScripts:true});this.widgets.escapeListener=new p(document,{keys:p.KEY.ESCAPE},{fn:this.onCancelButtonClick,scope:this,correctScope:true})},onTemplateLoaded:function d(y){if(y.serverResponse.responseText.indexOf(this.id)===-1){Alfresco.util.PopupManager.displayMessage({text:Alfresco.util.message("socialPublish.noChannels")});return}var A=document.createElement("div");A.innerHTML=y.serverResponse.responseText;var z=YAHOO.util.Dom.getFirstChild(A);this.widgets.panel=Alfresco.util.createYUIPanel(z);this.widgets.panel.nodeRef=this.showConfig.nodeRef;this.widgets.selectChannelButton=new YAHOO.widget.Button(this.id+"-channel-select-button",{type:"menu",menu:this.id+"-publishChannel-menu",lazyloadmenu:false});this.widgets.selectStatusUpdateChannels=new YAHOO.widget.Button(this.id+"-statusSelect-button",{type:"menu",menu:this.id+"-statusSelect-menu",lazyloadmenu:false});this.widgets.headerText=b.get(this.id+"-header-span");this.widgets.cancelButton=Alfresco.util.createYUIButton(this,"cancel-button",this.onCancelButtonClick);this.widgets.publishButton=Alfresco.util.createYUIButton(this,"publish-button",this.onPublishButtonClick);this.widgets.formContainer=b.get(this.id+"-publish-form");this.widgets.statusUpdateText=b.get(this.id+"-statusUpdate-text");this.widgets.statusUpdateCount=b.get(this.id+"-statusUpdate-count");this.widgets.statusUpdateCountMsg=b.get(this.id+"-statusUpdate-countMessage");this.widgets.statusUpdateChannelCount=b.get(this.id+"-statusUpdate-channel-count");this.widgets.statusUpdateCountURL=b.get(this.id+"-statusUpdate-count-urlMessage");this.widgets.statusUpdateCheckboxes=b.getElementsByClassName("statusUpdate-checkboxes","input",this.widgets.formContainer);this.widgets.statusUpdateUrlCheckbox=b.get(this.id+"-statusUpdate-checkbox-url");w.addListener(this.widgets.statusUpdateText,"keydown",this.onStatusUpdateKeypress,{},this);w.addListener(this.widgets.statusUpdateText,"keyup",this.onStatusUpdateKeypress,{},this);w.addListener(this.widgets.statusUpdateCheckboxes,"click",this.onStatusCheckboxToggle,{},this);w.addListener(b.get(this.id+"-publishChannel-menu"),"click",this.onSelectPublishChannel,{},this);w.addListener(b.get(this.id+"-statusSelectActionAll"),"click",this.onSelectAllStatusChannels,{},this);w.addListener(b.get(this.id+"-statusSelectActionNone"),"click",this.onSelectNoStatusChannels,{},this);w.addListener(this.widgets.statusUpdateUrlCheckbox,"click",this.onStatusURLToggle,{},this);this._showPanel()},onCancelButtonClick:function k(){this.closeDialogue()},onPublishButtonClick:function l(){var y=this.widgets.selectChannelButton.get("value"),C={channelId:y,publishNodes:[this.showConfig.nodeRef],statusUpdate:{}},B=this,A=[];includeStatus=false;for(var z=0;z<this.widgets.statusUpdateCheckboxes.length;z++){if(this.widgets.statusUpdateCheckboxes[z].checked){A.push(this.widgets.statusUpdateCheckboxes[z].value);includeStatus=true}}if(includeStatus){C.statusUpdate={message:this.widgets.statusUpdateText.value,channelIds:A};if(this.widgets.statusUpdateUrlCheckbox.checked){C.statusUpdate.nodeRef=this.showConfig.nodeRef}}var E=function D(G){var H=Alfresco.util.ComponentManager.findFirst("Alfresco.DocumentPublishing");if(H!==null){H.doRefresh()}var J=B.showConfig.filename,F=this.widgets.selectChannelButton.getAttributeConfig("label").value,I=Alfresco.constants.URL_PAGECONTEXT+"site/"+Alfresco.constants.SITE+"/document-details?nodeRef="+B.showConfig.nodeRef;linkText=Alfresco.util.message("socialPublish.confirm.link",B.name,{"0":J}),linkHTML="<a href='"+I+"'>"+linkText+"</a>",channelHTML="<span class='channel'>"+F+"</span>",trackingText=Alfresco.util.message("socialPublish.confirm.track",B.name,{"0":linkHTML}),successText=Alfresco.util.message("socialPublish.confirm.success",B.name,{"0":J,"1":channelHTML}),balloonHTML="<div class='publishConfirm'><div class='success'>"+successText+"</div>",doclib=Alfresco.util.ComponentManager.findFirst("Alfresco.DocumentList");if(doclib){balloonElement=t.query("input[value="+this.showConfig.nodeRef+"]",document.getElementById(doclib.id),true);balloonHTML+="<div class='tracking'>"+trackingText+"</div>"}else{balloonElement=b.getElementsByClassName("node-thumbnail")[0]}balloonHTML+="</div>";if(balloonElement){balloon=Alfresco.util.createBalloon(balloonElement,{html:balloonHTML,width:"48em"});balloon.show();YAHOO.lang.later(10000,this,function(){balloon.hide()})}};Alfresco.util.Ajax.request({url:Alfresco.constants.PROXY_URI+"api/publishing/queue",method:Alfresco.util.Ajax.POST,requestContentType:"application/json",responseContentType:"application/json",dataObj:C,successCallback:{fn:E,scope:this},failureMessage:Alfresco.util.message("socialPublish.confirm.failure",this.name)});this.closeDialogue()},closeDialogue:function x(){this.resetTruncationMsg();this.widgets.panel.hide();this.widgets.escapeListener.disable()},onStatusUpdateKeypress:function q(){this.checkUpdateLength()},onStatusCheckboxToggle:function s(y){Alfresco.util.toggleClass(b.getAncestorByClassName(w.getTarget(y),"status-channel"),"selected");this.onSelectedStatusChannelChange()},onSelectAllStatusChannels:function f(A){for(var y in this.widgets.statusUpdateCheckboxes){var z=this.widgets.statusUpdateCheckboxes[y];z.checked=true;b.addClass(b.getAncestorByClassName(z,"status-channel"),"selected")}this.onSelectedStatusChannelChange();w.preventDefault(A)},onSelectNoStatusChannels:function n(A){for(var y in this.widgets.statusUpdateCheckboxes){var z=this.widgets.statusUpdateCheckboxes[y];z.checked=false;b.removeClass(b.getAncestorByClassName(z,"status-channel"),"selected")}this.onSelectedStatusChannelChange();w.preventDefault(A)},onSelectedStatusChannelChange:function a(){this.resetTruncationMsg();this.checkUpdateLength();var y=t.filter(this.widgets.statusUpdateCheckboxes,":checked").length;this.widgets.statusUpdateChannelCount.innerHTML=Alfresco.util.message("socialPublish.dialogue.statusUpdate.select.count",this.name,{"0":y,"1":this.widgets.statusUpdateCheckboxes.length});if(y>0){this.widgets.statusUpdateText.removeAttribute("disabled");this.widgets.statusUpdateUrlCheckbox.removeAttribute("disabled")}else{b.setAttribute(this.widgets.statusUpdateText,"disabled","disabled");b.setAttribute(this.widgets.statusUpdateUrlCheckbox,"disabled","disabled")}},onStatusURLToggle:function o(){this.checkUpdateLength()},onSelectPublishChannel:function i(z,A){var y=w.getTarget(z);if(!t.test(y,"a.publishChannel")){y=b.getAncestorByClassName(y,"publishChannel")}this.widgets.selectChannelButton.set("label",y.innerHTML);this.widgets.selectChannelButton.set("value",y.rel);w.preventDefault(z)},checkUpdateLength:function h(){var A=null,E=0,z=0,G=t.filter(this.widgets.statusUpdateCheckboxes,":checked"),D={};if(G.length>0){for(var B=0;B<G.length;B++){var y=parseInt(b.getAttribute(G[B],"rel"),10),C=b.getAttribute(G[B],"name");if(y>0&&(y<A||A===null)){A=y}if(D[C]===undefined&&y!==0){D[C]=y}}if(A!==null){if(this.widgets.statusUpdateUrlCheckbox.checked){var H=parseInt(b.getAttribute(this.widgets.statusUpdateUrlCheckbox,"rel"),10);E=E+H;this.widgets.statusUpdateCountURL.innerHTML=Alfresco.util.message("socialPublish.dialogue.statusUpdate.urlChars",this.name,{"0":H})}else{this.widgets.statusUpdateCountURL.innerHTML=""}E=E+this.widgets.statusUpdateText.value.length;z=A-E;this.widgets.statusUpdateCount.innerHTML=Alfresco.util.message("socialPublish.dialogue.statusUpdate.charsRemaining",this.name,{"0":z});this.widgets.statusUpdateCountMsg.innerHTML=Alfresco.util.message("socialPublish.dialogue.statusUpdate.countMessage",this.name);if(z<0){b.addClass(b.getAncestorByClassName(this.widgets.statusUpdateCount,"statusUpdate-count-container","div"),"warning");var F=[];for(var B in D){if(parseInt(D[B],10)<E){F.push(B)}}this.showTruncationMsg(F)}else{this.resetTruncationMsg();b.removeClass(b.getAncestorByClassName(this.widgets.statusUpdateCount,"statusUpdate-count-container","div"),"warning")}}else{this.hideStatusUpdateCount()}}else{this.hideStatusUpdateCount()}},hideStatusUpdateCount:function r(){this.widgets.statusUpdateCount.innerHTML=this.widgets.statusUpdateCountURL.innerHTML=this.widgets.statusUpdateCountMsg.innerHTML=""},showTruncationMsg:function j(z){if(this.widgets.truncationNotification===null||this.widgets.truncationNotification.truncationChannels.length!==z.length){this.resetTruncationMsg();var y=(z.length>1)?"plural":"singular";this.widgets.truncationNotification=Alfresco.util.createBalloon(this.widgets.statusUpdateText,{text:Alfresco.util.message("socialPublish.dialogue.statusUpdate.truncationMessage."+y,this.name,{"0":z.join(", ")}),width:"24em"});this.widgets.truncationNotification.truncationChannels=z;this.widgets.truncationNotification.show()}},resetTruncationMsg:function u(){if(this.widgets.truncationNotification){this.widgets.truncationNotification.hide()}this.widgets.truncationNotification=null},_applyConfig:function c(){var y=Alfresco.util.message("socialPublish.dialogue.header",this.name,{"0":"<strong>"+this.showConfig.filename+"</strong>"});this.widgets.headerText.innerHTML=y;this.widgets.cancelButton.set("disabled",false)},_showPanel:function g(){this._applyConfig();this.widgets.escapeListener.enable();this.widgets.panel.show()}}})();Alfresco.module.getSocialPublishingInstance=function(){var a="alfresco-socialPublishing-instance";return Alfresco.util.ComponentManager.get(a)||new Alfresco.module.socialPublishing(a)};