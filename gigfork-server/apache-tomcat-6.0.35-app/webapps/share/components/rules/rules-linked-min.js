(function(){var h=YAHOO.util.Dom,g=Alfresco.util.siteURL,f=Alfresco.util.encodeHTML;Alfresco.RulesLinked=function a(o){Alfresco.RulesLinked.superclass.constructor.call(this,"Alfresco.RulesLinked",o,["button"]);YAHOO.Bubbling.on("folderDetailsAvailable",this.onFolderDetailsAvailable,this);YAHOO.Bubbling.on("folderRulesetDetailsAvailable",this.onFolderRulesetDetailsAvailable,this);YAHOO.Bubbling.on("linkedToFolderDetailsAvailable",this.onLinkedToFolderDetailsAvailable,this);return this};YAHOO.extend(Alfresco.RulesLinked,Alfresco.component.Base,{options:{nodeRef:null,siteId:"",repositoryBrowsing:true},isReady:false,ruleset:null,linkedToFolder:null,onReady:function b(){this.widgets.pathEl=h.get(this.id+"-path");this.widgets.titleEl=h.get(this.id+"-title");this.widgets.viewlinkedToFolderButton=Alfresco.util.createYUIButton(this,"view-button",this.onViewLinkedToFolderButtonClick);this.widgets.changeLinkButton=Alfresco.util.createYUIButton(this,"change-button",this.onChangeLinkButtonClick,{disabled:true});this.widgets.unlinkRulesButton=Alfresco.util.createYUIButton(this,"unlink-button",this.onUnlinkRulesButtonClick,{disabled:true});this.widgets.doneButton=Alfresco.util.createYUIButton(this,"done-button",this.onDoneButtonClick);this.isReady=true;this._enableAndDisplay()},onUnlinkRulesButtonClick:function m(p,o){this.widgets.unlinkRulesButton.set("disabled",true);Alfresco.util.Ajax.jsonPost({url:Alfresco.constants.PROXY_URI_RELATIVE+"api/actionQueue",dataObj:{actionedUponNode:this.options.nodeRef.toString(),actionDefinitionName:"unlink-rules"},successCallback:{fn:function(q){if(q.json){document.location.reload()}},scope:this},failureCallback:{fn:function(q){this.widgets.unlinkRulesButton.set("disabled",false);Alfresco.util.PopupManager.displayPrompt({title:Alfresco.util.message("message.failure",this.name),text:this.msg("message.unlinkRules-failure")})},scope:this}})},onViewLinkedToFolderButtonClick:function j(p,o){window.location.href=g("folder-rules?nodeRef={nodeRef}",{site:this.linkedToFolder.site,nodeRef:this.linkedToFolder.nodeRef})},onChangeLinkButtonClick:function i(q,p){if(!this.modules.rulesPicker){this.modules.rulesPicker=new Alfresco.module.RulesPicker(this.id+"-rulesPicker")}var o=[Alfresco.module.DoclibGlobalFolder.VIEW_MODE_SITE];if(this.options.repositoryBrowsing===true){o.push(Alfresco.module.DoclibGlobalFolder.VIEW_MODE_REPOSITORY,Alfresco.module.DoclibGlobalFolder.VIEW_MODE_USERHOME)}this.modules.rulesPicker.setOptions({mode:Alfresco.module.RulesPicker.MODE_LINK_TO,siteId:this.options.siteId,allowedViewModes:o,files:{displayName:this.folderDetails,nodeRef:this.options.nodeRef.toString()}}).showDialog()},onDoneButtonClick:function d(p,o){this._navigateForward()},onFolderDetailsAvailable:function c(p,o){this.folderDetails=o[1].folderDetails;this._enableAndDisplay()},onFolderRulesetDetailsAvailable:function e(p,o){this.ruleset=o[1].folderRulesetDetails;this._enableAndDisplay()},onLinkedToFolderDetailsAvailable:function k(p,o){this.linkedToFolder=o[1].linkedToFolder;this._enableAndDisplay()},_enableAndDisplay:function n(p,o){if(this.isReady&&this.linkedToFolder&&this.ruleset&&this.folderDetails){this.widgets.changeLinkButton.set("disabled",false);this.widgets.unlinkRulesButton.set("disabled",false);this.widgets.titleEl.innerHTML=f(this.linkedToFolder.name);this.widgets.pathEl.innerHTML=f(this.linkedToFolder.path);if(this.ruleset.inheritedRules&&this.ruleset.inheritedRules.length>0){h.removeClass(this.id+"-inheritedRules","hidden")}}},_navigateForward:function l(){if(document.referrer.match(/documentlibrary([?]|$)/)||document.referrer.match(/repository([?]|$)/)){history.go(-1)}else{window.location.href=g("folder-details?nodeRef="+this.options.nodeRef.toString())}}})})();