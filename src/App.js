import React, { useState, useEffect } from "react";
import "./styles.css";
import styled from "styled-components";

import SupervisorDashboardPanel from "./components/panel";
import { callSuccessRate } from "./api-test";
import Chart from "./components/chart";

const ChartOverlay = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 150px;
  height: 50px;
  z-index: 999999;
  background: #fff;
`;

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    function handleDataChange(newData) {
      setData(newData);
    }

    callSuccessRate(handleDataChange);
    const dataFetchTimer = setInterval(() => {
      callSuccessRate(handleDataChange);
    }, window.getWidgetDataRefreshInterval());

    return function cleanup() {
      clearInterval(dataFetchTimer);
    };
  }, []);

  if (data == null) {
    return (
      <div className="App">
        <SupervisorDashboardPanel
          title={`Inbound Call Summary`}
          info={
            <>
              <div>
                {`Distribution of the calls recieved in campaign ie abandoned at IVR, abandoned at ACD or connected to Agent.`}
              </div>
              <div>
                <b>Data Calculate Time</b>: Loading...
              </div>
              <div>
                <b>Data Fetch Time</b>: Loading...
              </div>
            </>
          }
          data={<p>Loading...</p>}
        />
      </div>
    );
  } else {
    return (
      <div className="App">
        <SupervisorDashboardPanel
          title={`Inbound Call Summary`}
          info={
            <>
              <div>
                {`Distribution of the calls recieved in campaign ie abandoned at IVR, abandoned at ACD or connected to Agent.`}
              </div>
              <div>
                <b>Data Calculate Time</b>: {data.dataCalculateTime}
              </div>
              <div>
                <b>Data Fetch Time</b>: {data.dataFetchTime}
              </div>
            </>
          }
          data={
            <>
              <Chart
                offered={data.totalOfferedCalls}
                connected={data.totalConnectedCalls}
                abandonedIVR={data.totalAbandonedAtIVR}
                abandonedACD={data.totalAbandonedAtACD}
              />
              <ChartOverlay />
            </>
          }
        />
      </div>
    );
  }
}
