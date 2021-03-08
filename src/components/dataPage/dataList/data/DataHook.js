import React from 'react'

import './Data.scss'
import { debugLog } from '../../../../lib/logs'
import PropTypes from 'prop-types'
import { Chip, IconButton, TableCell, TableRow } from '@material-ui/core'

import InsertLinkIcon from '@material-ui/icons/InsertLink'

/**
 * DataHook class
 */
function DataHook (props) {
  debugLog('Data::constructor')

  let indexTag = -1

  const dataTags = Object.entries(props.tags).map(function (tags) {
    if (tags[1].length > 0)
    {
      return tags[1].map(function(tag) {
        indexTag++
        return <Chip label={tag} className="DataItem-tag" color="primary" size="small" key={indexTag}/>
      })
    }
  })

  return(

    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell align="left" className="DataItem-name"> {props.title} </TableCell>
      <TableCell align="left" className="DataItem-name"> {props.content} </TableCell>
      <TableCell align="center" className="DataItem-name"> {props.language} </TableCell>
      <TableCell align="center"> {dataTags} </TableCell>
      <TableCell align="center" >
        <IconButton onClick={() => window.open(props.url, '_blank')}><InsertLinkIcon color="primary" /></IconButton>
      </TableCell>
    </TableRow>

  )
}

DataHook.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}

export default DataHook
