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
package org.alfresco.repo.domain.solr;

import java.util.Date;
import java.util.List;

/**
 * Holds parameters for SOLR DAO calls against <b>alf_transaction</b> and <b>alf_change_set</b>.
 * 
 * @since 4.0
 */
public class SOLRTrackingParameters
{
    private Long fromIdInclusive;
    private Long fromCommitTimeInclusive;
    private List<Long> ids;
    private Long toIdExclusive;
    private Long toCommitTimeExclusive;
    
    private boolean trueOrFalse;

    public Long getFromIdInclusive()
    {
        return fromIdInclusive;
    }

    public void setFromIdInclusive(Long fromIdInclusive)
    {
        this.fromIdInclusive = fromIdInclusive;
    }

    public Long getFromCommitTimeInclusive()
    {
        return fromCommitTimeInclusive;
    }

    public void setFromCommitTimeInclusive(Long fromCommitTimeInclusive)
    {
        this.fromCommitTimeInclusive = fromCommitTimeInclusive;
    }

    public List<Long> getIds()
    {
        return ids;
    }

    public void setIds(List<Long> ids)
    {
        this.ids = ids;
    }

    /**
	 * Helper for cross-DB boolean support
	 * 
	 * @return             <tt>true</tt> always
	 */
	public boolean getTrue()
	{
	    return true;
	}
	
    /**
     * Helper for cross-DB boolean support
     * 
     * @return             <tt>false</tt> always
     */
	public boolean getFalse()
	{
	    return false;
	}

	/**
	 * Simple mutalbe cross-DB boolean value
	 */
	public boolean isTrueOrFalse()
    {
        return trueOrFalse;
    }

	/**
     * Simple mutalbe cross-DB boolean value
	 */
    public void setTrueOrFalse(boolean trueOrFalse)
    {
        this.trueOrFalse = trueOrFalse;
    }

    public Long getToIdExclusive()
    {
        return toIdExclusive;
    }

    public void setToIdExclusive(Long toIdExclusive)
    {
        this.toIdExclusive = toIdExclusive;
    }

    public Long getToCommitTimeExclusive()
    {
        return toCommitTimeExclusive;
    }

    public void setToCommitTimeExclusive(Long toCommitTimeExclusive)
    {
        this.toCommitTimeExclusive = toCommitTimeExclusive;
    }

    @Override
    public int hashCode()
    {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((fromCommitTimeInclusive == null) ? 0 : fromCommitTimeInclusive.hashCode());
        result = prime * result + ((fromIdInclusive == null) ? 0 : fromIdInclusive.hashCode());
        result = prime * result + ((ids == null) ? 0 : ids.hashCode());
        result = prime * result + ((toCommitTimeExclusive == null) ? 0 : toCommitTimeExclusive.hashCode());
        result = prime * result + ((toIdExclusive == null) ? 0 : toIdExclusive.hashCode());
        result = prime * result + (trueOrFalse ? 1231 : 1237);
        return result;
    }

    @Override
    public boolean equals(Object obj)
    {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        SOLRTrackingParameters other = (SOLRTrackingParameters) obj;
        if (fromCommitTimeInclusive == null)
        {
            if (other.fromCommitTimeInclusive != null)
                return false;
        }
        else if (!fromCommitTimeInclusive.equals(other.fromCommitTimeInclusive))
            return false;
        if (fromIdInclusive == null)
        {
            if (other.fromIdInclusive != null)
                return false;
        }
        else if (!fromIdInclusive.equals(other.fromIdInclusive))
            return false;
        if (ids == null)
        {
            if (other.ids != null)
                return false;
        }
        else if (!ids.equals(other.ids))
            return false;
        if (toCommitTimeExclusive == null)
        {
            if (other.toCommitTimeExclusive != null)
                return false;
        }
        else if (!toCommitTimeExclusive.equals(other.toCommitTimeExclusive))
            return false;
        if (toIdExclusive == null)
        {
            if (other.toIdExclusive != null)
                return false;
        }
        else if (!toIdExclusive.equals(other.toIdExclusive))
            return false;
        if (trueOrFalse != other.trueOrFalse)
            return false;
        return true;
    }

    @Override
    public String toString()
    {
        return "SOLRTrackingParameters [fromIdInclusive="
                + fromIdInclusive + ", fromCommitTimeInclusive=" + fromCommitTimeInclusive + ", ids=" + ids + ", toIdExclusive=" + toIdExclusive + ", toCommitTimeExclusive="
                + toCommitTimeExclusive + ", trueOrFalse=" + trueOrFalse + "]";
    }

    
}
