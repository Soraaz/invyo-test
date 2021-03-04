import React from 'react'
import PropTypes from 'prop-types'
import LinearProgress from '@material-ui/core/LinearProgress'
import Box from '@material-ui/core/Box'

import CheckIcon from '@material-ui/icons/Check'
import { green, red, grey } from '@material-ui/core/colors'
import { useMediaQuery, useTheme, withStyles } from '@material-ui/core'
import stringToDate from 'lib/tools/StringToDate'
import { differenceInDays, formatDistance, differenceInSeconds, differenceInHours } from 'date-fns'

const GreenProgressBar = withStyles(() => ({
  root: {
    backgroundColor: green[500]
  }
}))(LinearProgress)

const RedProgressBar = withStyles(() => ({
  colorPrimary: {
    backgroundColor: red[500]
  },
  barColorPrimary: {
    backgroundColor: red[900]
  }
}))(LinearProgress)

const GreyProgressBar = withStyles(() => ({
  colorPrimary: {
    backgroundColor: grey[500]
  },
  barColorPrimary: {
    backgroundColor: grey[900]
  }
}))(LinearProgress)

/**
* Progress bar with label
*/
function ProgressBarWithLabel(props) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const days = differenceInDays(stringToDate(props.date), new Date())
  const view = formatDistance(stringToDate(props.date), new Date())
  const seconds = differenceInSeconds(stringToDate(props.date), new Date())
  const hour = differenceInHours(stringToDate(props.date), new Date()) - days * 24

  return (
    <Box justifyContent={isMobile ? 'center' : 'stretch'} display="flex" alignItems="center">
      <Box width="30%" mr={1}>
        {seconds <= 0 && <GreenProgressBar variant="determinate" {...props} value={0} color="primary" />}
        {seconds > 0 && days <= 0 && <RedProgressBar variant="determinate" {...props} value={(24 - hour) * 4} color="primary" />}
        {days < 30 && days > 0 && <LinearProgress variant="determinate" {...props} value={(30 - days) * 3} color="primary" />}
        {days >= 30 && <GreyProgressBar variant="determinate" {...props} value={(365 - days) / 4} color="primary" />}
      </Box>
      <Box minWidth={35}>
        {seconds <= 0 ? <CheckIcon style={{ color: green[500] }} /> : view}
      </Box>
    </Box>
  )
}

ProgressBarWithLabel.propTypes = {
  date: PropTypes.string.isRequired
}

export default ProgressBarWithLabel