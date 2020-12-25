function getIframeData() {
	var urlObj ={}
	var url = window.location.search.substring(1);
	var vars = url.split("&");
	for (var i=0;i<vars.length;i++) {
        var param = vars[i].split("=");
        urlObj[param[0]] = param[1];
    }
    return urlObj;
}


function getWidgetDataRefreshInterval() {

    let tempObject = getIframeData();
    let dataDuration = tempObject.dataDuration;

    let refreshInterval = '60000';

    // if(dataDuration == '1_day')
    // refreshInterval = '300000';
    
    // else if(dataDuration == '1_hrs')
    // refreshInterval = '60000';
    
    // else if(dataDuration == '30_mins')
    // refreshInterval = '60000';
 
    return refreshInterval;
}


function getStatsName() {

    let tempObject = getIframeData();
    let dataDuration = tempObject.dataDuration;

    let statsName = {
        queue: 'QueueCallStatsT24D24',
        campaign: 'CampaignCallStatsT24D24'
    }

    if(dataDuration == '1_day')
    statsName = {
        queue: 'QueueCallStatsT24D24',
        campaign: 'CampaignCallStatsT24D24'
    }
    
    else if(dataDuration == '1_hrs')
    statsName = {
        queue: 'QueueCallStatsT60D60',
        campaign: 'CampaignCallStatsT60D60'
    }
    
    else if(dataDuration == '30_mins')
    statsName = {
        queue: 'QueueCallStatsT30D30',
        campaign: 'CampaignCallStatsT30D30'
    }
 
    return statsName;
}