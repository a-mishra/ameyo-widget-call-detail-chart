import React from "react";
import Highcharts from "highcharts";

class Donut extends React.Component {
  constructor(props) {
    var donutAttribute = props.donutAttribute;
    var totalAvailableUsers = donutAttribute.totalAvailableUsers;
    var totalLoggedInUser = donutAttribute.totalLoggedInUser;
    var totalUserOnBreak = donutAttribute.totalUserOnBreak;
    var userOnCall = donutAttribute.userOnCall;
    var useronWrap = donutAttribute.useronWrap;
    var totalUserOnBreak = donutAttribute.totalUserOnBreak;
    var totalLoggedInUser = donutAttribute.totalLoggedInUser;

    super(props);
    this.state = {
      series: [
        {
          name: "Agent Status",
          data: [
            {
              name: "Logged In",
              y: totalLoggedInUser,
              color: "#f1c40f"
            },
            {
              name: "Idle",
              y: totalAvailableUsers,
              color: "#3498db"
            },
            {
              name: "On Call",
              y: userOnCall,
              color: "#9b59b6"
            },
            {
              name: "On Break",
              y: totalUserOnBreak,
              color: "#2ecc71"
            },
            {
              name: "On Wrap",
              y: useronWrap,
              color: "#fa2839"
            }
          ]
        }
      ]
    };
  }

  componentDidUpdate(prevProps) {
    this.highChartsRender();
  }

  highChartsRender() {
    var donutAttribute = this.props.donutAttribute;
    var totalAvailableUsers = donutAttribute.totalAvailableUsers ? ( donutAttribute.totalAvailableUsers == 0 ? null : donutAttribute.totalAvailableUsers ): null;
    var userOnCall = donutAttribute.userOnCall ? ( donutAttribute.userOnCall == 0 ? null : donutAttribute.userOnCall ): null;
    var useronWrap = donutAttribute.useronWrap ? ( donutAttribute.useronWrap == 0 ? null : donutAttribute.useronWrap ): null;
    var totalUserOnBreak = donutAttribute.totalUserOnBreak ? ( donutAttribute.totalUserOnBreak == 0 ? null : donutAttribute.totalUserOnBreak ): null;
    var totalLoggedInUser = donutAttribute.totalLoggedInUser ? ( donutAttribute.totalLoggedInUser == 0 ? null : donutAttribute.totalLoggedInUser ): null;
    this.state = {
      series: [
        {
          name: "Agent Status",
          data: [
            {
              name: "Logged In",
              y: totalLoggedInUser,
              color: "#f1c40f"
            },
            {
              name: "Idle",
              y: totalAvailableUsers,
              color: "#3498db"
            },
            {
              name: "On Call",
              y: userOnCall,
              color: "#9b59b6"
            },
            {
              name: "On Break",
              y: totalUserOnBreak,
              color: "#2ecc71"
            },
            {
              name: "On Wrap",
              y: useronWrap,
              color: "#fa2839"
            }
          ]
        }
      ]
    };

    Highcharts.chart({
      chart: {
        type: "pie",
        backgroundColor: "#242C31",
        renderTo: "donutChart",
        width:420
      },
      title: {
        text: this.props.donutAttribute.totalLoggedInUser,
        align: "center",
        verticalAlign: "middle",
        style: {
          color: "white",
          fontSize: "25px"
        },
        y: 15,
        x:-55
      },
      plotOptions: {
        pie: {
          dataLabels: {
            // format: "{point.percentage:.0f}",
            formatter: function() {
              return this.y;
            },
            style: {
              color: "white",
              fontSize: "24px"
            },
            connectorWidth: 3,
            distance: 10,
            connectorShape: "crookedLine",
            defer:true,
          },
          showInLegend: true,
          innerSize: "85%",

        }
      },
      legend: {
        align: 'right',
        verticalAlign: 'top',
        layout: 'vertical',
        x: 0,
        y: 30,
        itemStyle: {
          color: "#fff",
          fontSize: "13px",
          margin:"12px",

        },
        itemHoverStyle: {
          color: "#f2f2f2"
        },
        textOverflow: "ellipsis",
        itemMarginBottom:10
      },
      series: this.state.series
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.donutAttribute.totalAvailableUsers ===
        nextProps.donutAttribute.totalAvailableUsers &&
      this.props.donutAttribute.userOnCall ===
        nextProps.donutAttribute.userOnCall &&
      this.props.donutAttribute.totalUserOnBreak ===
        nextProps.donutAttribute.totalUserOnBreak &&
      this.props.donutAttribute.totalLoggedInUser ===
        nextProps.donutAttribute.totalLoggedInUser &&
        this.props.donutAttribute.useronWrap ===
        nextProps.donutAttribute.useronWrap
    ) {
      return false;
    } else {
      return true;
    }
  }

  componentDidMount() {
    this.highChartsRender();
  }

  render() {
    return <div id="donutChart" style={{ height: 252 }}></div>;
  }
}

export default Donut;
