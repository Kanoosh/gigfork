(function(){var C=Alfresco.util.encodeHTML,y=Alfresco.util.combinePaths,x=Alfresco.util.siteURL,G=Alfresco.util.isValueSet;Alfresco.doclib.Actions={};Alfresco.doclib.Actions.prototype={actionsView:null,onRegisterAction:function t(M,L){var N=L[1];if(N&&G(N.actionName)&&G(N.fn)){this.registerAction(N.actionName,N.fn)}else{Alfresco.logger.error("DL_onRegisterAction: Custom action registion invalid: "+N)}},registerAction:function b(L,M){if(G(L)&&G(M)){this.constructor.prototype[L]=M;return true}return false},renderAction:function F(M,P){var L=Alfresco.constants.URL_RESCONTEXT+"components/documentlibrary/actions/",R='style="background-image:url('+L+'{icon}-16.png)" ',O={link:'<div class="{id}"><a title="{label}" class="simple-link" href="{href}" '+R+"{target}><span>{label}</span></a></div>",pagelink:'<div class="{id}"><a title="{label}" class="simple-link" href="{pageUrl}" '+R+"><span>{label}</span></a></div>",javascript:'<div class="{id}" title="{jsfunction}"><a title="{label}" class="action-link" href="#"'+R+"><span>{label}</span></a></div>"};P.actionParams[M.id]=M.params;var N={id:M.id,icon:M.icon,label:C(Alfresco.util.substituteDotNotation(this.msg(M.label),P))};if(M.type==="link"){if(M.params.href){N.href=Alfresco.util.substituteDotNotation(M.params.href,P);N.target=M.params.target?'target="'+M.params.target+'"':""}else{Alfresco.logger.warn("Action configuration error: Missing 'href' parameter for actionId: ",M.id)}}else{if(M.type==="pagelink"){if(M.params.page){N.pageUrl=Alfresco.util.substituteDotNotation(M.params.page,P);if(M.params.page.charAt(0)!=="{"){var Q=G(P.location.site)?P.location.site.name:null;N.pageUrl=x(N.pageUrl,{site:Q})}}else{Alfresco.logger.warn("Action configuration error: Missing 'page' parameter for actionId: ",M.id)}}else{if(M.type==="javascript"){if(M.params["function"]){N.jsfunction=M.params["function"]}else{Alfresco.logger.warn("Action configuration error: Missing 'function' parameter for actionId: ",M.id)}}}}return YAHOO.lang.substitute(O[M.type],N)},getActionUrls:function q(R,M){var O=R.jsNode,U=O.isLink?O.linkedNode.nodeRef:O.nodeRef,S=U.toString(),L=U.uri,Q=O.contentURL,V=R.workingCopy||{},N=G(R.location.site)?R.location.site.name:null,T=Alfresco.util.bind(function(W){return Alfresco.util.siteURL(W,{site:YAHOO.lang.isString(M)?M:N})},this),P={downloadUrl:y(Alfresco.constants.PROXY_URI,Q)+"?a=true",viewUrl:y(Alfresco.constants.PROXY_URI,Q)+'" target="_blank',documentDetailsUrl:T("document-details?nodeRef="+S),folderDetailsUrl:T("folder-details?nodeRef="+S),editMetadataUrl:T("edit-metadata?nodeRef="+S),inlineEditUrl:T("inline-edit?nodeRef="+S),managePermissionsUrl:T("manage-permissions?nodeRef="+S),manageTranslationsUrl:T("manage-translations?nodeRef="+S),workingCopyUrl:T("document-details?nodeRef="+(V.workingCopyNodeRef||S)),workingCopySourceUrl:T("document-details?nodeRef="+(V.sourceNodeRef||S)),viewGoogleDocUrl:V.googleDocUrl+'" target="_blank',explorerViewUrl:y(this.options.repositoryUrl,"/n/showSpaceDetails/",L)+'" target="_blank'};P.sourceRepositoryUrl=this.viewInSourceRepositoryURL(R,P)+'" target="_blank';return P},getAction:function K(M,L,Q){var S=L.className,P=Alfresco.util.findInArray(M.actions,S,"id")||{};if(Q===false){return P}else{P=Alfresco.util.deepCopy(P);var R=P.params||{};for(var N in R){R[N]=YAHOO.lang.substitute(R[N],M,function O(U,V,T){return Alfresco.util.findValueByDotNotation(M,U)})}return P}},getParentNodeRef:function J(M){var P=null;if(YAHOO.lang.isArray(M)){try{P=this.doclistMetadata.parent.nodeRef}catch(Q){P=null}if(P===null){for(var O=1,N=M.length,L=true;O<N&&L;O++){L=(M[O].parent.nodeRef==M[O-1].parent.nodeRef)}P=L?M[0].parent.nodeRef:this.doclistMetadata.container}}else{P=M.parent.nodeRef}return P},onActionDetails:function z(O){var U=this,Q=O.nodeRef,N=O.jsNode;var S=function L(W,X){var V='<span class="light">'+C(O.displayName)+"</span>";Alfresco.util.populateHTML([X.id+"-dialogTitle",U.msg("edit-details.title",V)]);this.widgets.editMetadata=Alfresco.util.createYUIButton(X,"editMetadata",null,{type:"link",label:U.msg("edit-details.label.edit-metadata"),href:x("edit-metadata?nodeRef="+Q)})};var M=YAHOO.lang.substitute(Alfresco.constants.URL_SERVICECONTEXT+"components/form?itemKind={itemKind}&itemId={itemId}&destination={destination}&mode={mode}&submitType={submitType}&formId={formId}&showCancelButton=true",{itemKind:"node",itemId:Q,mode:"edit",submitType:"json",formId:"doclib-simple-metadata"});var T=new Alfresco.module.SimpleDialog(this.id+"-editDetails-"+Alfresco.util.generateDomId());T.setOptions({width:"40em",templateUrl:M,actionUrl:null,destroyOnHide:true,doBeforeDialogShow:{fn:S,scope:this},onSuccess:{fn:function P(W){Alfresco.util.Ajax.request({url:y(Alfresco.constants.URL_SERVICECONTEXT,"components/documentlibrary/data/node/",N.nodeRef.uri)+"?view="+this.actionsView,successCallback:{fn:function X(Z){var Y=Z.json.item;Y.jsNode=new Alfresco.util.Node(Z.json.item.node);YAHOO.Bubbling.fire(Y.node.isContainer?"folderRenamed":"fileRenamed",{file:Y});YAHOO.Bubbling.fire("tagRefresh");Alfresco.util.PopupManager.displayMessage({text:this.msg("message.details.success")})},scope:this},failureCallback:{fn:function V(Y){Alfresco.util.PopupManager.displayMessage({text:this.msg("message.details.failure")})},scope:this}})},scope:this},onFailure:{fn:function R(V){Alfresco.util.PopupManager.displayMessage({text:this.msg("message.details.failure")})},scope:this}}).show()},onActionLocate:function I(L){var N=L.jsNode,P=L.location.path,M=N.isLink?N.linkedNode.properties.name:L.displayName,O=G(L.location.site)?L.location.site.name:null;if(G(this.options.siteId)&&O!==this.options.siteId){window.location=x((O===null?"repository":"documentlibrary")+"?file="+encodeURIComponent(M)+"&path="+encodeURIComponent(P),{site:O})}else{this.options.highlightFile=M;YAHOO.Bubbling.fire("changeFilter",{filterId:"path",filterData:P})}},onActionDelete:function E(M){var P=this,O=M.jsNode;Alfresco.util.PopupManager.displayPrompt({title:this.msg("actions."+(O.isContainer?"folder":"document")+".delete"),text:this.msg("message.confirm.delete",M.displayName),buttons:[{text:this.msg("button.delete"),handler:function N(){this.destroy();P._onActionDeleteConfirm.call(P,M)}},{text:this.msg("button.cancel"),handler:function L(){this.destroy()},isDefault:true}]})},_onActionDeleteConfirm:function H(M){var P=M.jsNode,Q=M.location.path,R=M.location.file,N=y(Q,R),L=M.displayName,O=P.nodeRef;this.modules.actions.genericAction({success:{activity:{siteId:this.options.siteId,activityType:"file-deleted",page:"documentlibrary",activityData:{fileName:R,path:Q,nodeRef:O.toString()}},event:{name:P.isContainer?"folderDeleted":"fileDeleted",obj:{path:N}},message:this.msg("message.delete.success",L)},failure:{message:this.msg("message.delete.failure",L)},webscript:{method:Alfresco.util.Ajax.DELETE,name:"file/node/{nodeRef}",params:{nodeRef:O.uri}}})},onActionEditOffline:function a(L){Alfresco.logger.error("onActionEditOffline","Abstract implementation not overridden")},onlineEditMimetypes:{"application/vnd.ms-excel":"Excel.Sheet","application/vnd.ms-powerpoint":"PowerPoint.Slide","application/msword":"Word.Document","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"Excel.Sheet","application/vnd.openxmlformats-officedocument.presentationml.presentation":"PowerPoint.Slide","application/vnd.openxmlformats-officedocument.wordprocessingml.document":"Word.Document"},onActionEditOnline:function l(L){if(this._launchOnlineEditor(L)){YAHOO.Bubbling.fire("metadataRefresh")}},_launchOnlineEditor:function v(P){var T="SharePoint.OpenDocuments",M=P.jsNode,Q=P.location,U=M.mimetype,N=null,O=null,L={xls:"application/vnd.ms-excel",ppt:"application/vnd.ms-powerpoint",doc:"application/msword",xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",pptx:"application/vnd.openxmlformats-officedocument.presentationml.presentation",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"};if(this.onlineEditMimetypes.hasOwnProperty(U)){N=this.onlineEditMimetypes[U]}else{var S=Alfresco.util.getFileExtension(P.location.file);if(S!==null){S=S.toLowerCase();if(L.hasOwnProperty(S)){U=L[S];if(this.onlineEditMimetypes.hasOwnProperty(U)){N=this.onlineEditMimetypes[U]}}}}if(N!==null){if(!G(P.onlineEditUrl)){var R=this.doclistMetadata.custom.vtiServer.host+":"+this.doclistMetadata.custom.vtiServer.port+"/"+y("alfresco",Q.site.name,Q.container.name,Q.path,Q.file);if(!(/^(http|https):\/\//).test(R)){var V=this.doclistMetadata.custom.vtiServer.protocol;if(V==null){V=window.location.protocol;V=V.substring(0,V.length-1)}R=V+"://"+R}P.onlineEditUrl=R}if(YAHOO.env.ua.ie>0){return this._launchOnlineEditorIE(T,P,N)}if(Alfresco.util.isSharePointPluginInstalled()){return this._launchOnlineEditorPlugin(P,N)}else{Alfresco.util.PopupManager.displayPrompt({text:this.msg("actions.editOnline.failure",Q.file)});return false}}return window.open(P.onlineEditUrl,"_blank")},_launchOnlineEditorIE:function A(N,L,M){try{activeXControl=new ActiveXObject(N+".3");return activeXControl.EditDocument3(window,L.onlineEditUrl,true,M)}catch(P){try{activeXControl=new ActiveXObject(N+".2");return activeXControl.EditDocument2(window,L.onlineEditUrl,M)}catch(Q){try{activeXControl=new ActiveXObject(N+".1");return activeXControl.EditDocument(L.onlineEditUrl,M)}catch(O){}}}return false},_launchOnlineEditorPlugin:function f(M,N){var O=document.getElementById("SharePointPlugin");if(O==null&&Alfresco.util.isSharePointPluginInstalled()){var L=null;if(YAHOO.env.ua.webkit&&Alfresco.util.isBrowserPluginInstalled("application/x-sharepoint-webkit")){L="application/x-sharepoint-webkit"}else{L="application/x-sharepoint"}var S=document.createElement("object");S.id="SharePointPlugin";S.type=L;S.width=0;S.height=0;S.style.setProperty("visibility","hidden","");document.body.appendChild(S);O=document.getElementById("SharePointPlugin");if(!O){return false}}try{return O.EditDocument3(window,M.onlineEditUrl,true,N)}catch(Q){try{return O.EditDocument2(window,M.onlineEditUrl,N)}catch(R){try{return O.EditDocument(M.onlineEditUrl,N)}catch(P){return false}}}},onActionCheckoutToGoogleDocs:function e(L){Alfresco.logger.error("onActionCheckoutToGoogleDocs","Abstract implementation not overridden")},onActionCheckinFromGoogleDocs:function s(L){Alfresco.logger.error("onActionCheckinFromGoogleDocs","Abstract implementation not overridden")},onActionSimpleRepoAction:function d(N,L){var P=this.getAction(N,L).params,M=N.displayName;var O={success:{event:{name:"metadataRefresh",obj:N}},failure:{message:this.msg(P.failureMessage,M)},webscript:{method:Alfresco.util.Ajax.POST,stem:Alfresco.constants.PROXY_URI+"api/",name:"actionQueue"},config:{requestContentType:Alfresco.util.Ajax.JSON,dataObj:{actionedUponNode:N.nodeRef,actionDefinitionName:P.action}}};if(YAHOO.lang.isFunction(this[P.success])){O.success.callback={fn:this[P.success],obj:N,scope:this}}if(P.successMessage){O.success.message=this.msg(P.successMessage,M)}if(YAHOO.lang.isFunction(this[P.failure])){O.failure.callback={fn:this[P.failure],obj:N,scope:this}}if(P.failureMessage){O.failure.message=this.msg(P.failureMessage,M)}this.modules.actions.genericAction(O)},onActionFormDialog:function m(N,L){var P=this.getAction(N,L),R=P.params,O={title:this.msg(P.label)},M=N.displayName;delete R["function"];var Q=R.success;delete R.success;O.success={fn:function(S,T){if(YAHOO.lang.isFunction(this[Q])){this[Q].call(this,S,T)}YAHOO.Bubbling.fire("metadataRefresh",T)},obj:N,scope:this};if(R.successMessage){O.successMessage=this.msg(R.successMessage,M);delete R.successMessage}if(YAHOO.lang.isFunction(this[R.failure])){O.failure={fn:this[R.failure],obj:N,scope:this};delete R.failure}if(R.failureMessage){O.failureMessage=this.msg(R.failureMessage,M);delete R.failureMessage}O.properties=R;Alfresco.util.PopupManager.displayForm(O)},onActionUploadNewVersion:function k(N){var S=N.jsNode,M=N.displayName,P=S.nodeRef,L=N.version;if(!this.fileUpload){this.fileUpload=Alfresco.getFileUploadInstance()}var R=this.msg("label.filter-description",M),O="*";if(M&&new RegExp(/[^\.]+\.[^\.]+/).exec(M)){O="*"+M.substring(M.lastIndexOf("."))}if(N.workingCopy&&N.workingCopy.workingCopyVersion){L=N.workingCopy.workingCopyVersion}var Q={updateNodeRef:P.toString(),updateFilename:M,updateVersion:L,overwrite:true,filter:[{description:R,extensions:O}],mode:this.fileUpload.MODE_SINGLE_UPDATE,onFileUploadComplete:{fn:this.onNewVersionUploadComplete,scope:this}};if(G(this.options.siteId)){Q.siteId=this.options.siteId;Q.containerId=this.options.containerId}this.fileUpload.show(Q)},_uploadComplete:function D(L,P){var Q=L.successful.length,M,O;if(Q>0){if(Q<(this.options.groupActivitiesAt||5)){for(var N=0;N<Q;N++){O=L.successful[N];M={fileName:O.fileName,nodeRef:O.nodeRef};this.modules.actions.postActivity(this.options.siteId,"file-"+P,"document-details",M)}}else{M={fileCount:Q,path:this.currentPath,parentNodeRef:this.doclistMetadata.parent.nodeRef};this.modules.actions.postActivity(this.options.siteId,"files-"+P,"documentlibrary",M)}}},onFileUploadComplete:function o(L){this._uploadComplete(L,"added")},onNewVersionUploadComplete:function u(L){this._uploadComplete(L,"updated")},onActionCancelEditing:function i(M){var L=M.displayName;this.modules.actions.genericAction({success:{event:{name:"metadataRefresh"},message:this.msg("message.edit-cancel.success",L)},failure:{message:this.msg("message.edit-cancel.failure",L)},webscript:{method:Alfresco.util.Ajax.POST,name:"cancel-checkout/node/{nodeRef}",params:{nodeRef:M.jsNode.nodeRef.uri}}})},onActionCopyTo:function h(L){this._copyMoveTo("copy",L)},onActionMoveTo:function g(L){this._copyMoveTo("move",L)},_copyMoveTo:function w(N,M){if(!N in {copy:true,move:true}){throw new Error("'"+N+"' is not a valid Copy/Move to mode.")}if(!this.modules.copyMoveTo){this.modules.copyMoveTo=new Alfresco.module.DoclibCopyMoveTo(this.id+"-copyMoveTo")}var L=[Alfresco.module.DoclibGlobalFolder.VIEW_MODE_SITE];if(this.options.repositoryBrowsing===true){L.push(Alfresco.module.DoclibGlobalFolder.VIEW_MODE_REPOSITORY,Alfresco.module.DoclibGlobalFolder.VIEW_MODE_USERHOME)}this.modules.copyMoveTo.setOptions({allowedViewModes:L,mode:N,siteId:this.options.siteId,containerId:this.options.containerId,path:this.currentPath,files:M,rootNode:this.options.rootNode,parentId:this.getParentNodeRef(M)}).showDialog()},onActionAssignWorkflow:function c(M){var Q="",L=this.getParentNodeRef(M);if(YAHOO.lang.isArray(M)){for(var O=0,N=M.length;O<N;O++){Q+=(O===0?"":",")+M[O].nodeRef}}else{Q=M.nodeRef}var P={selectedItems:Q};if(L){P.destination=L}Alfresco.util.navigateTo(x("start-workflow"),"POST",P)},onActionManagePermissions:function B(L){if(!this.modules.permissions){this.modules.permissions=new Alfresco.module.DoclibPermissions(this.id+"-permissions")}this.modules.permissions.setOptions({siteId:this.options.siteId,containerId:this.options.containerId,path:this.currentPath,files:L}).showDialog()},onActionManageAspects:function r(L){if(!this.modules.aspects){this.modules.aspects=new Alfresco.module.DoclibAspects(this.id+"-aspects")}this.modules.aspects.setOptions({file:L}).show()},onActionChangeType:function p(P){var L=P.jsNode,Q=L.type,S=P.displayName,M=Alfresco.constants.PROXY_URI+y("slingshot/doclib/type/node",L.nodeRef.uri);var T=function O(V){V.addValidation(this.id+"-changeType-type",function U(ab,X,aa,Z,W,Y){return ab.options[ab.selectedIndex].value!=="-"},null,"change");V.setShowSubmitStateDynamically(true,false)};this.modules.changeType=new Alfresco.module.SimpleDialog(this.id+"-changeType").setOptions({width:"30em",templateUrl:Alfresco.constants.URL_SERVICECONTEXT+"modules/documentlibrary/change-type?currentType="+encodeURIComponent(Q),actionUrl:M,doSetupFormsValidation:{fn:T,scope:this},firstFocus:this.id+"-changeType-type",onSuccess:{fn:function R(U){YAHOO.Bubbling.fire("metadataRefresh",{highlightFile:S});Alfresco.util.PopupManager.displayMessage({text:this.msg("message.change-type.success",S)})},scope:this},onFailure:{fn:function N(U){Alfresco.util.PopupManager.displayMessage({text:this.msg("message.change-type.failure",S)})},scope:this}});this.modules.changeType.show()},viewInSourceRepositoryURL:function n(N,P){var O=N.node,M=N.location.repositoryId,L=this.options.replicationUrlMapping,Q;if(!M||!L||!L[M]){return"#"}Q=O.isContainer?P.folderDetailsUrl:P.documentDetailsUrl;Q=Q.substring(Alfresco.constants.URL_CONTEXT.length);return y(L[M],"/",Q)},onActionPublish:function j(L){Alfresco.module.getSocialPublishingInstance().show({nodeRef:L.nodeRef,filename:L.fileName})}}})();