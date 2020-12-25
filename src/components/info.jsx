import React from 'react'
import styled from 'styled-components'

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
    maxWidth: '75%'
  },
}));

const InfoContainer = styled.div`
    float:right;
    height:24px;
    width:24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const PopOverMessageContainer = styled.span`
    font-size: 10px;
    font-weignt: 100;
    text-align: left;
    font-style: italic;
    padding: 8px auto;
    margin: 0px 0px;
    line-height: 12px;
    color: #666666;
`;

export default function InfoPopOver(props) {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    
    return (
        <div>
            <InfoContainer
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                <InfoOutlinedIcon style={{height:'16px', width:'16px'}} />
            </InfoContainer>

            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <PopOverMessageContainer>
                    {props.message}
                </PopOverMessageContainer>
            </Popover>
        </div>
    )
}
