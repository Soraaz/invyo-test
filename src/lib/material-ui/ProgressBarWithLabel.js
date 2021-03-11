import React from 'react'
import PropTypes from 'prop-types'
import LinearProgress from '@material-ui/core/LinearProgress'
import Box from '@material-ui/core/Box'

import CheckIcon from '@material-ui/icons/Check'
import { green } from '@material-ui/core/colors'
import { useMediaQuery, useTheme, withStyles, makeStyles, Typography } from '@material-ui/core'
import stringToDate from 'lib/tools/StringToDate'
import { differenceInDays, formatDistanceStrict, differenceInSeconds, differenceInHours } from 'date-fns'

const useStyles = makeStyles(() => ({
  box: {
    display: 'flex',
    alignItems: 'baseline',
    marginTop: '20px',
    marginBottom: '20px',
    flexDirection: 'column'
  },
  description: {
    marginTop: '10px'
  },
  descriptionText: {
    fontSize: 12,
    fontWeight: 20
  }
}))

const GreenProgressBar = withStyles((theme) => ({
  root: {
    boxShadow: '-1px -4px 50px 3px ' + theme.palette.success.light
  },
  colorPrimary: {
    backgroundColor: theme.palette.success.light // green[500]
  },
  barColorPrimary: {
    backgroundColor: theme.palette.success.dark // green[500]
  }
}))(LinearProgress)

const RedProgressBar = withStyles((theme) => ({
  root: {
    boxShadow: '-1px -4px 50px 3px ' + theme.palette.error.light
  },
  colorPrimary: {
    backgroundColor: theme.palette.error.light // red[500]
  },
  barColorPrimary: {
    backgroundColor: theme.palette.error.dark // red[900]
  }
}))(LinearProgress)

const GreyProgressBar = withStyles((theme) => ({
  root: {
    boxShadow: '-1px -4px 50px 3px ' + theme.palette.warning.light
  },
  colorPrimary: {
    backgroundColor: theme.palette.warning.light // grey[500]
  },
  barColorPrimary: {
    backgroundColor: theme.palette.warning.dark // grey[900]
  }
}))(LinearProgress)

const BlueProgressBar = withStyles((theme) => ({
  root: {
    boxShadow: '-1px -4px 50px 3px ' + theme.palette.primary.light
  }
}))(LinearProgress)

/**
* Progress bar with label
*/
function ProgressBarWithLabel(props) {
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const days = differenceInDays(stringToDate(props.date), new Date())
  const view = formatDistanceStrict(stringToDate(props.date), new Date())
  const seconds = differenceInSeconds(stringToDate(props.date), new Date())
  const hour = differenceInHours(stringToDate(props.date), new Date()) - days * 24

  return (
    <Box justifyContent={isMobile ? 'center' : 'stretch'} className={classes.box}>
      <Box width="100%" mr={1}>
        {seconds <= 0 && <GreenProgressBar variant="determinate" {...props} value={0} color="primary" />}
        {seconds > 0 && days <= 0 && <RedProgressBar variant="determinate" {...props} value={(24 - hour) * 4} color="primary" />}
        {days < 30 && days > 0 && <BlueProgressBar variant="determinate" {...props} value={(30 - days) * 3} color="primary" />}
        {days >= 30 && <GreyProgressBar variant="determinate" {...props} value={(365 - days) / 4} color="primary" />}
      </Box>
      <Box minWidth={35} className={classes.description}>
        {seconds <= 0
          ? <CheckIcon style={{ color: green[500] }} />
          : <Typography className={classes.descriptionText}>
            <b>{view}</b>
            {' left'}
          </Typography>
        }
      </Box>
    </Box>
  )
}

ProgressBarWithLabel.propTypes = {
  date: PropTypes.string.isRequired
}

export default ProgressBarWithLabel