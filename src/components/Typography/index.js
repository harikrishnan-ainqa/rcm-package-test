import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import colors from '../../utils/colors/colors';
import './Typography.css';


const CustomTypography = (props) => {
  const { type, text, customClass, colorType, customStyle, requiredField } =props;
  const getFontType = () => {
    switch (type) {
      case 'heading':
        return 'h6';
      case 'title':
        return 'subtitle1';
      case 'caption':
        return 'subtitle2';
      case 'link':
        return 'caption';
      case 'error':
        return 'caption';
      default:
        return 'title';
    }
  };
  const getColorType = () => {
    switch (colorType) {
      case 'primary':
        return colors.blue.quaternary;
      case 'secondary':
        return colors.gray.tertiary;
      case 'tertiary':
        return colors.gray.primary;
      case 'quaternary':
        return colors.white.primary;
      case 'quinary':
        return colors.blue.secondary;
      case 'senary':
        return colors.gray.secondary;
      case 'active':
        return colors.green.primary;
      case 'inActive':
        return colors.orange.primary;
      case 'dark':
        return colors.black.secondary;
      case 'background':
        return colors.background.secondary;
      case 'error':
        return colors.red.primary;
      default:
        return colors.blue.quaternary;
    }
  };
  return (
    <Typography>
      {text}
      {requiredField && <sup className="required">*</sup>}
    </Typography>
  );
};

export default CustomTypography;
CustomTypography.propTypes = {
  type: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  colorType: PropTypes.string,
  customClass: PropTypes.string,
  customStyle: PropTypes.shape(),
  requiredField: PropTypes.bool
};
CustomTypography.defaultProps = {
  type: '',
  colorType: '',
  customClass: '',
  customStyle: {},
  requiredField: false
};
