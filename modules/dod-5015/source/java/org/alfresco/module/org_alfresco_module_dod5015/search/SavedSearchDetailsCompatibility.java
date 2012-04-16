/*
 * Copyright (C) 2005-2011 Alfresco Software Limited.
 *
 * This file is part of Alfresco
 *
 * Alfresco is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Alfresco is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */
package org.alfresco.module.org_alfresco_module_dod5015.search;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.alfresco.module.org_alfresco_module_dod5015.model.DOD5015Model;
import org.alfresco.service.namespace.NamespaceService;
import org.alfresco.service.namespace.QName;

/**
 * Compatibility class.
 * 
 * Used to bridge between the old style of saved search passed and required by the UI and the new actual saved search details.
 * Eventually will be factored out as web scripts are brought up to date.
 */
public class SavedSearchDetailsCompatibility
{
    /** Saved search details */
    private final SavedSearchDetails savedSearchDetails;
    
    /** Namespace service */
    private final NamespaceService namespaceService;
    
    /** Records management search service implementation */
    private final RecordsManagementSearchServiceImpl searchService;

    /**
     * Retrieve the search from the parameter string
     * @param params    parameter string
     * @return String   search term
     */
    public static String getSearchFromParams(String params)
    {
        String search = null;        
        String[] values = params.split("&");
        for (String value : values)
        {
            if (value.startsWith("terms") == true)
            {
                String[] terms = value.trim().split("=");
                try
                {
                    search = URLDecoder.decode(terms[1], "UTF-8");
                }
                catch (UnsupportedEncodingException e)
                {
                    // Do nothing just return null
                    search = null;
                }
                break;
            }
        }
        
        return search;
    }
    
    public static RecordsManagementSearchParameters createSearchParameters(String params, String sort, NamespaceService namespaceService)
    {
        return createSearchParameters(params, new String[]{"&", "="}, sort, namespaceService);
    }
    
    /**
     * 
     * @param params
     * @param sort
     * @param namespaceService
     * @return
     */
    public static RecordsManagementSearchParameters createSearchParameters(String params, String[] paramsDelim, String sort, NamespaceService namespaceService)
    {
        RecordsManagementSearchParameters result = new RecordsManagementSearchParameters();
        List<QName> includedContainerTypes = new ArrayList<QName>(2);
        
        // Map the param values into the search parameter object
        String[] values = params.split(paramsDelim[0]);
        for (String value : values)
        {
            String[] paramValues = value.split(paramsDelim[1]);
            String paramName = paramValues[0].trim();
            String paramValue = paramValues[1].trim();
            if ("records".equals(paramName) == true)
            {
                result.setIncludeRecords(Boolean.parseBoolean(paramValue));
            }
            else if ("undeclared".equals(paramName) == true)
            {
                result.setIncludeUndeclaredRecords(Boolean.parseBoolean(paramValue));
            }
            else if ("vital".equals(paramName) == true)
            {
                result.setIncludeVitalRecords(Boolean.parseBoolean(paramValue));
            }
            else if ("folders".equals(paramName) == true)
            {
                result.setIncludeRecordFolders(Boolean.parseBoolean(paramValue));
            }
            else if ("frozen".equals(paramName) == true)
            {
                result.setIncludeFrozen(Boolean.parseBoolean(paramValue));
            }
            else if ("cutoff".equals(paramName) == true)
            {
                result.setIncludeCutoff(Boolean.parseBoolean(paramValue));
            }
            else if ("categories".equals(paramName) == true && Boolean.parseBoolean(paramValue) == true)
            {
                includedContainerTypes.add(DOD5015Model.TYPE_RECORD_CATEGORY);
            }
            else if ("series".equals(paramName) == true && Boolean.parseBoolean(paramValue) == true)
            {
                includedContainerTypes.add(DOD5015Model.TYPE_RECORD_SERIES);
            }
        }
        result.setIncludedContainerTypes(includedContainerTypes);
        
        if (sort != null)
        {
            // Map the sort string into the search details
            String[] sortPairs = sort.split(",");
            Map<QName, Boolean> sortOrder = new HashMap<QName, Boolean>(sortPairs.length);
            for (String sortPairString : sortPairs)
            {
                String[] sortPair = sortPairString.split("/");
                QName field = QName.createQName(sortPair[0], namespaceService);
                Boolean isAcsending = Boolean.FALSE;
                if ("asc".equals(sortPair[1]) == true)
                {
                    isAcsending = Boolean.TRUE;
                }
                sortOrder.put(field, isAcsending);
            }
            result.setSortOrder(sortOrder);
        }
        
        return result;
    }
    
    /**
     * Constructor
     * @param savedSearchDetails
     */
    public SavedSearchDetailsCompatibility(SavedSearchDetails savedSearchDetails, 
                                           NamespaceService namespaceService,
                                           RecordsManagementSearchServiceImpl searchService)
    {
        this.savedSearchDetails = savedSearchDetails;
        this.namespaceService = namespaceService;
        this.searchService = searchService;
    }
    
    /**
     * Get the sort string from the saved search details
     * @return
     */
    public String getSort()
    {
        StringBuilder builder = new StringBuilder(64);
        
        for (Map.Entry<QName, Boolean> entry : this.savedSearchDetails.getSearchParameters().getSortOrder().entrySet())
        {
            if (builder.length() !=0)
            {
                builder.append(",");
            }
            
            String order = "desc";
            if (Boolean.TRUE.equals(entry.getValue()) == true)
            {
                order = "asc";
            }
            builder.append(entry.getKey().toPrefixString(this.namespaceService))
                   .append("/")
                   .append(order);
        }
        	        
        return builder.toString();
    }
    
    /**
     * Get the parameter string from the saved search details
     * @return
     */
    public String getParams()
    {
        List<QName> includeContainerTypes = this.savedSearchDetails.getSearchParameters().getIncludedContainerTypes();            
        StringBuilder builder = new StringBuilder(128);	        	       
        builder.append("terms=").append(this.savedSearchDetails.getSearch()).append("&")
               .append("records=").append(this.savedSearchDetails.getSearchParameters().isIncludeRecords()).append("&")
               .append("undeclared=").append(this.savedSearchDetails.getSearchParameters().isIncludeUndeclaredRecords()).append("&")
               .append("vital=").append(this.savedSearchDetails.getSearchParameters().isIncludeVitalRecords()).append("&")
               .append("folders=").append(this.savedSearchDetails.getSearchParameters().isIncludeRecordFolders()).append("&")
               .append("frozen=").append(this.savedSearchDetails.getSearchParameters().isIncludeFrozen()).append("&")
               .append("cutoff=").append(this.savedSearchDetails.getSearchParameters().isIncludeCutoff()).append("&")
               .append("categories=").append(includeContainerTypes.contains(DOD5015Model.TYPE_RECORD_CATEGORY)).append("&")
               .append("series=").append(includeContainerTypes.contains(DOD5015Model.TYPE_RECORD_SERIES));	        
        return builder.toString();
    }
    
    /**
     * Build the full query string
     * @return
     */
    public String getQuery()
    {
        return searchService.buildQueryString(this.savedSearchDetails.getSearch(), this.savedSearchDetails.getSearchParameters());
    }
}