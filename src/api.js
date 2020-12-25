import dayjs from "dayjs";

export async function callSuccessRate(callback) {

    let data = null;
    await fetchWidgetData()
    .then((result)=>{
        data = result;
    });

    console.log(`QueueCallSummary Data for observing Camapaign`);
    console.log(data);

    if(data == null){
        callback(null);
        return null;
    }
    else {
        let totalOfferedCalls = data.campaign.callCount == undefined ? null : data.campaign.callCount;
        let totalAnsweredCalls = data.campaign.callAnsweredCount == undefined ? null : data.campaign.callAnsweredCount;
        let successRate = totalOfferedCalls ? ( totalAnsweredCalls / totalOfferedCalls ) * 100 : ( totalAnsweredCalls ? null : 100 );
        let dataFetchTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
        let dataCalculateTime = dayjs(data.campaign.statsTime).format('YYYY-MM-DD HH:mm:ss');
        // let totalConnectedCalls = data.campaign.callAnsweredCount == undefined ? null : data.campaign.callAnsweredCount;
        // let totalAbandonedAtIVR = data.campaign.callAbandonedCount == undefined ? null : data.campaign.callAbandonedCount;
        // let totalAbandonedAtACD = data.queue.callAbandonedCount == undefined ? null : data.queue.callAbandonedCount;


        let totalConnectedCalls = data.campaign.inboundAnsweredCount == undefined ? null : data.campaign.inboundAnsweredCount;
        let totalAbandonedAtIVR = data.campaign.ivrFailedCount == undefined ? null : data.campaign.ivrFailedCount;
        let totalAbandonedAtACD = data.campaign.inboundAbandonedCount == undefined ? null : data.campaign.inboundAbandonedCount;

        /* 
        campaignCallInboundAnsweredCount: conencted

        campaignCallInboundAbandonedCount: acd abandoned

        campaignIVRLT1FailedCallCount: ivr abandoned,

        campaign Call---
        */
        callback({ totalOfferedCalls, totalAnsweredCalls, successRate, totalConnectedCalls, totalAbandonedAtIVR, totalAbandonedAtACD, dataFetchTime, dataCalculateTime });
        return { totalOfferedCalls, totalAnsweredCalls, successRate, totalConnectedCalls, totalAbandonedAtIVR, totalAbandonedAtACD, dataFetchTime, dataCalculateTime }
    }

}


async function fetchWidgetData(){

        var client = window.AmeyoClient.init();
        let selectedCampaignCallDataObj = {queue:{}, campaign:{}};
        await client.globalData.get("currentManagingOrMonitoringCampaign").then( async (response) => {
            console.log("DashboardApp: Current Monitoring Campaign");
            console.log(response);
            let currentMonitoringCampaignId = response.campaignId == undefined ? 0 : response.campaignId;

            let client2 = window.AmeyoClient.init();

                let statsName = window.getStatsName().queue;

                let requestBody = JSON.stringify({
                    "statsName": statsName
                });

                let requestObject = {
                    url: "ameyorestapi/stats/getAllStats",
                    headers: {
                        "content-type": "application/json"
                    },
                    method: "POST",
                    body: requestBody
                };


                try{
                    await client2.httpRequest.invokeAmeyo(requestObject).then(function(responseData) {
                        console.log(`responseData || ${statsName} : `,responseData)
                        if(responseData.statusCode === 200){
                            let stats = JSON.parse(responseData.response);
                            console.log(stats);
                            if (stats && (stats.length) > 0) {
                                    stats = stats[stats.length - 1]['statsArr'];
                                    selectedCampaignCallDataObj.queue = getSelectedCampaign_QueueStatsData(stats, currentMonitoringCampaignId);
                            }
                            console.log('selectedCampaignCallDataObj.queue ');
                            console.log(selectedCampaignCallDataObj.queue );
                        }
                    });
                }catch(e){
                    console.log("DashboardApp: Could not fetch queueCall Stats",e)
                    return null;
                }


                statsName = window.getStatsName().campaign;

                requestBody = JSON.stringify({
                    "statsName": statsName
                });

                requestObject = {
                    url: `ameyorestapi/stats/getAllStats?ts=${dayjs().unix()}`,
                    headers: {
                        "content-type": "application/json"
                    },
                    method: "POST",
                    body: requestBody
                };


                try{
                    await client2.httpRequest.invokeAmeyo(requestObject).then(function(responseData) {
                        console.log(`responseData || ${statsName} : `,responseData)
                        if(responseData.statusCode === 200){
                            let stats = JSON.parse(responseData.response);
                            console.log(stats);
                            if (stats && (stats.length) > 0) {
                                    stats = stats[stats.length - 1]['statsArr'];
                                    selectedCampaignCallDataObj.campaign = getSelectedCampaign_CampaignStatsData(stats, currentMonitoringCampaignId);
                            }
                            console.log('selectedCampaignCallDataObj.campaign');
                            console.log(selectedCampaignCallDataObj.campaign);
                        }
                    });
                }catch(e){
                    console.log("DashboardApp: Could not fetch CampaignCallStats Stats",e)
                    return null;
                }

        }).catch( (error)=> {
            console.log(error);
            sendFailureNotification("DashboardApp: Could not get current monitoring campaign");
            return null;
        });
        return selectedCampaignCallDataObj;

}



function getSelectedCampaign_QueueStatsData(stats, campaignId) {
    var selectedCampaignQueueCallDataObj = {}
    var statsLength = stats.length;
    var queueCampaignCallCount = 0;;
    var queueCampaignCallAnsweredCount = 0;
    var queueCampaignCallAbandonedCount = 0;
    var queueCampaignCallWaitTimeLT20Count = 0;
    var queueCampaignCallWaitTimeTotal = 0;
    var queueCampaignCallConnectionTimeLT30Count = 0;
    var queueCallInboundMissedGT30Count = 0;
    var statsTime = 0;

    if (statsLength != 0) {
            for (let i = 0; i < statsLength; i++) {
                    let statsCampaignId = stats[i]['campaign_id'];
                    if (campaignId == statsCampaignId) {
                            var selectedcampaignQueueCallStatsArr = stats[i];
                            break;
                    }
            }
    }
    if (selectedcampaignQueueCallStatsArr) {
            statsTime = selectedcampaignQueueCallStatsArr['statsTime'];
            var campaignQueueCallStats = selectedcampaignQueueCallStatsArr['statsArr'];
            var queueCallStatsLength = campaignQueueCallStats.length;
            var temp_array = [];
            if (queueCallStatsLength > 0) {
                    for (let i = 0; i < queueCallStatsLength; i++) {
                            queueCampaignCallCount += campaignQueueCallStats[i]['queueCampaignCallCount'];
                            queueCampaignCallAnsweredCount += campaignQueueCallStats[i]['queueCampaignCallAnsweredCount'];
                            queueCampaignCallAbandonedCount += campaignQueueCallStats[i]['queueCampaignCallAbandonedCount'];
                            queueCampaignCallWaitTimeLT20Count += campaignQueueCallStats[i]['queueCampaignCallWaitTimeLT20Count'];
                            queueCampaignCallWaitTimeTotal += campaignQueueCallStats[i]['queueCampaignCallWaitTimeTotal'];
                            queueCampaignCallConnectionTimeLT30Count += campaignQueueCallStats[i]['queueCampaignCallConnectionTimeLT30Count'];
                            queueCallInboundMissedGT30Count += campaignQueueCallStats[i]['queueCallInboundMissedGT30Count'];
                            temp_array.push(campaignQueueCallStats[i]['queueCampaignCallWaitTimeMax']);
                            var tmp = (campaignQueueCallStats[i]['queueCampaignCallWaitTimeMax'] == null || campaignQueueCallStats[i]['queueCampaignCallWaitTimeMax'] == undefined ? 0 : campaignQueueCallStats[i]['queueCampaignCallWaitTimeMax']);
                            temp_array.push(tmp);
                    }
            }
    }
    selectedCampaignQueueCallDataObj['callCount'] = queueCampaignCallCount;
    selectedCampaignQueueCallDataObj['callAnsweredCount'] = queueCampaignCallAnsweredCount;
    selectedCampaignQueueCallDataObj['callAbandonedCount'] = queueCampaignCallAbandonedCount;
    selectedCampaignQueueCallDataObj['callWaitTimeLT20Count'] = queueCampaignCallWaitTimeLT20Count;
    selectedCampaignQueueCallDataObj['callWaitTimeTotal'] = queueCampaignCallWaitTimeTotal;
    selectedCampaignQueueCallDataObj['callWaitTimeMax'] = Math.max.apply(null, temp_array);
    selectedCampaignQueueCallDataObj['callConnectionTimeLT30Count'] = queueCampaignCallConnectionTimeLT30Count;
    selectedCampaignQueueCallDataObj['callInboundMissedGT30Count'] = queueCallInboundMissedGT30Count;
    selectedCampaignQueueCallDataObj['campaign_id'] = campaignId;
    selectedCampaignQueueCallDataObj['statsTime'] = statsTime;

    return selectedCampaignQueueCallDataObj;
}


function getSelectedCampaign_CampaignStatsData(stats, campaignId) {
    var selectedCampaignCallDataObj = {}
    var statsLength = stats.length;
    var campaignCallCount = 0;;
    var campaignCallAnsweredCount = 0;
    var campaignCallAbandonedCount = 0;
    var campaignCallWaitTimeLT20Count = 0;
    var campaignCallWaitTimeTotal = 0;
    var campaignCallConnectionTimeLT30Count = 0;
    var campaignCallInboundAnsweredCount = 0;
    var campaignCallInboundAbandonedCount = 0;
    var campaignIVRLT1FailedCallCount = 0;
    var statsTime = 0;

    if (statsLength != 0) {
        for (let i = 0; i < statsLength; i++) {
                let statsCampaignId = stats[i]['campaign_id'];
                if (campaignId == statsCampaignId) {
                        var selectedCampaignCallStats = stats[i];
                        break;
                }
        }
    }

    if (selectedCampaignCallStats) {
        campaignCallCount = selectedCampaignCallStats['campaignCallCount'];
        campaignCallAnsweredCount = selectedCampaignCallStats['campaignCallAnsweredCount'];
        campaignCallAbandonedCount = selectedCampaignCallStats['campaignCallAbandonedCount'];
        campaignCallWaitTimeLT20Count = selectedCampaignCallStats['campaignCallWaitTimeLT20Count'];
        campaignCallWaitTimeTotal = selectedCampaignCallStats['campaignCallWaitTimeTotal'];
        campaignCallConnectionTimeLT30Count = selectedCampaignCallStats['campaignCallConnectionTimeLT30Count'];
        campaignCallInboundAnsweredCount = selectedCampaignCallStats['campaignCallInboundAnsweredCount'];
        campaignCallInboundAbandonedCount = selectedCampaignCallStats['campaignCallInboundAbandonedCount'];
        campaignIVRLT1FailedCallCount = selectedCampaignCallStats['campaignIVRLT1FailedCallCount'];
        statsTime = selectedCampaignCallStats['statsTime'];
    }

    selectedCampaignCallDataObj['callCount'] = campaignCallCount;
    selectedCampaignCallDataObj['callAnsweredCount'] = campaignCallAnsweredCount;
    selectedCampaignCallDataObj['callAbandonedCount'] = campaignCallAbandonedCount;
    selectedCampaignCallDataObj['callWaitTimeLT20Count'] = campaignCallWaitTimeLT20Count;
    selectedCampaignCallDataObj['callWaitTimeTotal'] = campaignCallWaitTimeTotal;
    selectedCampaignCallDataObj['callConnectionTimeLT30Count'] = campaignCallConnectionTimeLT30Count;
    selectedCampaignCallDataObj['inboundAnsweredCount'] = campaignCallInboundAnsweredCount;
    selectedCampaignCallDataObj['inboundAbandonedCount'] = campaignCallInboundAbandonedCount;
    selectedCampaignCallDataObj['ivrFailedCount'] = campaignIVRLT1FailedCallCount;
    selectedCampaignCallDataObj['campaign_id'] = campaignId;
    selectedCampaignCallDataObj['statsTime'] = statsTime;

    console.log(selectedCampaignCallDataObj);
    return selectedCampaignCallDataObj;
}


export function sendSuccessNotification (message) {
    var client = window.AmeyoClient.init();

    var toastNotificationData = {
        type: "success",
        content: message
    }
    client.interface.trigger("toastNotification", toastNotificationData);
}

export function sendFailureNotification (message) {
    var client = window.AmeyoClient.init();

    var toastNotificationData = {
        type: "error",
        content: message
    }
    client.interface.trigger("toastNotification", toastNotificationData);
}