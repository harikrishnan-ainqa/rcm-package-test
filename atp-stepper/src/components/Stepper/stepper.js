import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { StylesProvider, createGenerateClassName } from '@material-ui/core'
import { Box } from '@material-ui/core'
import TestComp from '../testcomp/comptest'
import Grid from '@material-ui/core/Grid'
import { Divider } from '@material-ui/core'
import { postData } from 'atp-stepper-binders'
import withTheme from '../../themeProvider'
import withStyleFix from '../../stylefix'

const useStyles = (props) =>
  makeStyles((theme) => ({
    root: {
      padding: 0,
      width: '100%',
      '& .MuiStepIcon-root.MuiStepIcon-active': {
        color: props.stepperActiveColor ?? 'red',
      },
      '& .MuiStepIcon-root.MuiStepIcon-completed': {
        color: 'rgba(0, 0, 0, 0.38)',
      },
      '& .MuiStepLabel-label.MuiStepLabel-active': {
        color: props.stepperActiveTextColor ?? 'red',
      },
      '& .MuiButton-containedPrimary:hover': {
        backgroundColor: props.nextButtonBackground ?? 'primary',
        color: props.nextButtonTextColor ?? 'white',
      },
    },

    backButton: {
      marginRight: theme.spacing(1),
      backgroundColor: props.previousButtonBackground ?? '',
      color: props.previousButtonTextColor ?? '',
    },
    nextbutton: {
      backgroundColor: props.nextButtonBackground ?? 'primary',
      color: props.nextButtonTextColor ?? 'white',
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    header: {
      cursor: 'pointer',
    },
  }))

function ComponentPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

ComponentPanel.propTypes = {
  children: PropTypes.any.isRequired,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

const PositionBelowStepper = (props) => {
  const classes = useStyles({ ...props })

  const {
    steperTitle,
    stepsHeader,
    value,
    nextLabel,
    alternativeLabel,
    isControlleRequired,
    bodyRequired,
  } = props
  const [activeStep, setActiveStep] = React.useState(value)

  React.useEffect(() => {
    if (!value) {
      setActiveStep(0)
    } else {
      setActiveStep(value)
    }
  }, [value])

  const [inputvalue, setinputvalue] = useState({
    carbs: 0,
    name: '',
    calories: 0,
    fat: 0,
    protein: 0,
  })

  const onTextChange = (e) => {
    setinputvalue({ ...inputvalue, [e.target.name]: e.target.value })
  }
  //to get the Chidren

  const getStepContent = (stepIndex) => {
    return stepsHeader?.map((v, i) => {
      return (
        <ComponentPanel key={i} {...v} value={stepIndex} index={i}>
          <TestComp
            inputValue={inputvalue}
            onTextChange={onTextChange}
            index={stepIndex}
          />
          {v?.body?.componentName ? v.body.componentName + ' Mapped' : v?.body}
        </ComponentPanel>
      )
    })
  }

  //for handling next

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  // for handleCancel

  const handleCancel = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  //for handling previous

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  //for handling Reset
  const onTextClick = (index) => {
    if (props?.onhandleTextClick) {
      props?.onhandleTextClick(index)
      setActiveStep(index)
    }
  }

  const handleSubmit = async () => {
    var URl = 'http://164.52.210.54:8080'
    var db_name = 'Ainqa2'
    var entity = 'TableData'
    const datasss = {
      carbs: inputvalue.carbs,
      name: inputvalue.name,
      calories: inputvalue.calories,
      fat: inputvalue.fat,
      protein: inputvalue.protein,
    }
    let data = await postData(URl, db_name, entity, datasss)
    if (data.status === 200) {
      setActiveStep(0)
      setinputvalue({
        carbs: 0,
        name: '',
        calories: 0,
        fat: 0,
        protein: 0,
      })
    }
  }

  return (
    <div {...props}>
      <div className={classes.root}>
        <Grid
          container
          justifyContent="center"
          style={{ backgroundColor: '#fff' }}
        >
          <Grid item md={2} xs={12}>
            {(() => {
              if (activeStep !== undefined) {
                if (stepsHeader.length > 0) {
                  if (stepsHeader[activeStep].title !== undefined || null) {
                    return (
                      <Typography
                        style={{
                          marginTop: 20,
                          fontWeight: 'bold',
                          fontSize: 18,
                        }}
                      >
                        {stepsHeader[activeStep].title}
                      </Typography>
                    )
                  }
                } else {
                  null
                }
              } else {
                null
              }
            })()}
          </Grid>

          {stepsHeader.length > 0 ? (
            <Divider orientation="vertical" flexItem />
          ) : null}

          <Grid item md={6} xs={12}>
            <Stepper
              activeStep={activeStep}
              alternativeLabel={alternativeLabel}
            >
              {stepsHeader?.map((label, i) => (
                <Step onClick={() => onTextClick(i)} key={label?.header}>
                  <StepLabel className={classes.header}>
                    {label?.header}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>

          <Grid item md={3} xs={12}>
            {isControlleRequired && (
              <div style={{ marginTop: 20, float: 'right' }}>
                <Button
                  disabled={activeStep !== 0}
                  onClick={handleCancel}
                  className={classes.backButton}
                >
                  {props.cancelLabel ?? 'Cancel'}
                </Button>
                {activeStep !== 0 ? (
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    {props.previousLabel ?? 'Previous'}
                  </Button>
                ) : null}
                {activeStep === stepsHeader.length - 1 ||
                activeStep === stepsHeader.length ? (
                  <Button
                    className={classes.nextbutton}
                    variant="contained"
                    color={
                      activeStep === stepsHeader.length - 1
                        ? 'secondary'
                        : 'primary'
                    }
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    className={classes.nextbutton}
                    variant="contained"
                    color={
                      activeStep === stepsHeader.length - 1
                        ? 'secondary'
                        : 'primary'
                    }
                    onClick={handleNext}
                  >
                    Save and Proceed
                  </Button>
                )}
              </div>
            )}
          </Grid>
        </Grid>

        <Grid item md={12}>
          <Grid container justifyContent="center">
            <Grid item md={12}>
              {bodyRequired && (
                <div className={classes.instructions}>
                  {getStepContent(activeStep)}
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

PositionBelowStepper.defaultProps = {
  stepsHeader: [
    {
      title: 'Add new Charge Code',
      header: 'Charge Definition',
      fullWidth: true,
      body: {
        component: true,
        componentName: 'stepperbody',
        componentId: 'NArPT',
      },
    },
    {
      title: 'Add new  Code',
      header: 'Base Price and cost price',
      fullWidth: true,
      body: {
        component: true,
        componentName: 'stepperbody',
        componentId: 'NArPT',
      },
    },
  ],
  //steperTitle:"Add New Charge Code",
  isControlleRequired: true,
  bodyRequired: true,
}

export default withStyleFix(withTheme(PositionBelowStepper))
