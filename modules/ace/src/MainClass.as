// ActionScript file
	import org.alfresco.ace.application.logout.logout;
	import mx.controls.Alert;
	import mx.core.Application;
	import mx.containers.Canvas;
	import mx.containers.Panel;
	import org.alfresco.ace.application.login.login;
	import mx.core.Repeater;
	import mx.controls.SWFLoader;
	import mx.controls.CheckBox;
	import mx.rpc.events.FaultEvent;
	import org.alfresco.ace.control.swipe.Swipe;
	import flash.events.Event;
	
	import mx.containers.Box;

	import org.alfresco.framework.service.authentication.LoginCompleteEvent;
	import org.alfresco.framework.service.authentication.LogoutCompleteEvent;
	import org.alfresco.framework.service.error.ErrorRaisedEvent;
	import org.alfresco.framework.service.error.ErrorService;
	import org.alfresco.framework.service.authentication.AuthenticationService;
	import org.alfresco.framework.service.webscript.ConfigService;
	import org.alfresco.ace.service.articlesearchservice.ArticleSearchService;
	import org.alfresco.ace.service.articlesearchservice.ArticleSearchCompleteEvent;
	import mx.controls.TextInput;
	import mx.effects.Fade;



		}
		}
		
		private function doLoginComplete(event:LoginCompleteEvent):void
		{
			mainCanvas.visible = true;
		
		private function doLogoutComplete(event:LogoutCompleteEvent):void
		{
			mainCanvas.visible = false;
		/**
		}
