import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import Typography from '../Typography';
import './card.css';


const Card = (props) => {
  const { children, cardTitleType, cardTitle, optionalHeader, toolTip } = props;
  return (
    <div className={`${toolTip && 'tooltipHold'} mainLayout`}>
      <Grid container>
        <Grid container item justifyContent="space-between">
          <Grid item>
            <Typography
              type={cardTitleType}
              text={cardTitle}
              colorType="primary"
              customClass={`${toolTip && 'tooltipHead'} cardTitle`}
            />
          </Grid>
          <Grid className="optionalhead" item>
            {optionalHeader}
          </Grid>
        </Grid>

        {children}
      </Grid>
    </div>
  );
};

export default Card;

Card.propTypes = {
  children: PropTypes.node,
  optionalHeader: PropTypes.node,
  cardTitleType: PropTypes.string,
  cardTitle: PropTypes.string,
  toolTip: PropTypes.bool
};
Card.defaultProps = {
  children: <> </>,
  optionalHeader: <> </>,
  cardTitleType: '',
  cardTitle: '',
  toolTip: false
};
