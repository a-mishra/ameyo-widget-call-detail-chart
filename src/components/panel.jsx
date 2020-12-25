import React from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid';
import InfoPopOver from './info'

const CardWrapper = styled.div`
    background: #fff;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left:0px;
    right: 0px;
`;

const Card = styled.div`
    background: #fff;
    // border: 1px solid #ccc;
    overflow: hidden;
    border-radius: 4px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
`;

const CardHeader = styled.div`
    padding: 8px 16px;
    background-color: #666666;
    color: #ffffff;
    border-radius: 4px 4px 0 0;

    p {
        display: block;
        margin: 0px;
        text-align: start;
        font-weight: 600;
        font-size: 12px;
    };

`;

const CardBody = styled.div`
    width: 100%;
    height: calc( 100% - 36px );
    display: grid;
    align-items: center;

    p {
        display: block;
        margin: 0px;
        text-align: center;
        font-weight: 800;
        // font-size: 24px;
        font-size: 18px;
    }

`;


function SupervisorDashboardPanel(props) {
    return (
        <CardWrapper>
            <Card>
                <CardHeader>
                    <Grid container direction="row" alignItems="center" justify="center" spacing={2}>
                        <Grid item xs={10} >
                            <p>{props.title}</p>
                        </Grid>
                        <Grid item xs={2} >
                            <InfoPopOver message={props.info}/>
                        </Grid>
                    </Grid>
                </CardHeader>
                <CardBody>
                    {props.data}
                </CardBody>
            </Card>
        </CardWrapper>
    )
}



export default SupervisorDashboardPanel
