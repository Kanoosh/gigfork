
/*
 * 
 */

package org.alfresco.repo.lotus.ws;

import java.net.MalformedURLException;
import java.net.URL;
import javax.xml.namespace.QName;
import javax.xml.ws.WebEndpoint;
import javax.xml.ws.WebServiceClient;
import javax.xml.ws.WebServiceFeature;
import javax.xml.ws.Service;

/**
 * This class was generated by Apache CXF 2.2.2
 * Tue Feb 16 19:13:38 EET 2010
 * Generated source version: 2.2.2
 * 
 */


@WebServiceClient(name = "LibraryService", 
                  wsdlLocation = "file:/D:/workspaceAlfresco/Lotus_Quickr_integration_8.5/source/web/wsdl/LotusWS-Service.wsdl",
                  targetNamespace = "http://webservices.clb.content.ibm.com") 
public class LibraryService_Service extends Service {

    public final static URL WSDL_LOCATION;
    public final static QName SERVICE = new QName("http://webservices.clb.content.ibm.com", "LibraryService");
    public final static QName LibraryService = new QName("http://webservices.clb.content.ibm.com", "LibraryService");
    static {
        URL url = null;
        try {
            url = new URL("file:/D:/workspaceAlfresco/Lotus_Quickr_integration_8.5/source/web/wsdl/LotusWS-Service.wsdl");
        } catch (MalformedURLException e) {
            System.err.println("Can not initialize the default wsdl from file:/D:/workspaceAlfresco/Lotus_Quickr_integration_8.5/source/web/wsdl/LotusWS-Service.wsdl");
            // e.printStackTrace();
        }
        WSDL_LOCATION = url;
    }

    public LibraryService_Service(URL wsdlLocation) {
        super(wsdlLocation, SERVICE);
    }

    public LibraryService_Service(URL wsdlLocation, QName serviceName) {
        super(wsdlLocation, serviceName);
    }

    public LibraryService_Service() {
        super(WSDL_LOCATION, SERVICE);
    }

    /**
     * 
     * @return
     *     returns LibraryService
     */
    @WebEndpoint(name = "LibraryService")
    public LibraryService getLibraryService() {
        return super.getPort(LibraryService, LibraryService.class);
    }

    /**
     * 
     * @param features
     *     A list of {@link javax.xml.ws.WebServiceFeature} to configure on the proxy.  Supported features not in the <code>features</code> parameter will have their default values.
     * @return
     *     returns LibraryService
     */
    @WebEndpoint(name = "LibraryService")
    public LibraryService getLibraryService(WebServiceFeature... features) {
        return super.getPort(LibraryService, LibraryService.class, features);
    }

}
