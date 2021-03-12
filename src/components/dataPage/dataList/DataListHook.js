import React, { useEffect, useState } from 'react'

import './DataList.scss'
import { debugLog } from '../../../lib/logs'
import PropTypes from 'prop-types'
import DataHook from './data/DataHook'
import { FilterOrder } from '../DataPageHook'
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: '100%',
    backdropFilter: 'blur(10px)',
    boxShadow: '20px 20px 40px -6px rgba(0,0,0,0.2)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '20px'
  },
  container: {
    maxHeight: '60vh'
  },
  border: {
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '20px'
  }
})

/**
 * DataListHook class
 */
function DataListHook (props) {
  debugLog('DataList:render')

  const classes = useStyles()

  let dataList = props.datas

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    setPage(0)
  }, [props.filterLanguage, props.filterTag, props.filterSearch])

  /**
   * Handle page change pagination
   * @param {Object} event Event
   * @param {Number} newPage new Page number
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  /**
   * Handle numbers of items per page
   * @param {Object} event Event
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Tag Filter
  if (props.filterTag.length !== 0)
  {
    props.filterTag.forEach((tag) => {
      dataList = dataList.filter((data) => {
        const tagFound = Object.entries(data.tags).filter((tags) => {
          return (tags[1].includes(tag))
        })
        return tagFound.length > 0
      })
    })
  }

  // Language Filter
  if (props.filterLanguage !== '')
  {
    dataList = dataList.filter((data) => {
      return (data.language.includes(props.filterLanguage))
    })
  }

  // Search Filter
  dataList = dataList.filter((data) => {
    const title = data.title.toLowerCase()
    const content = data.content.toLowerCase()
    return (title.includes(props.filterSearch) || content.includes(props.filterSearch))
  })

  // Order
  switch(props.order){
  case FilterOrder.TitleAsc:
    dataList = dataList.sort((dataA, dataB) => dataA.title > dataB.title ? 1 : -1)
    break
  case FilterOrder.TitleDesc:
    dataList = dataList.sort((dataA, dataB) => dataA.title <= dataB.title ? 1 : -1)
    break
  case FilterOrder.ContentAsc:
    dataList = dataList.sort((dataA, dataB) => dataA.content > dataB.content ? 1 : -1)
    break
  case FilterOrder.ContentDesc:
    dataList = dataList.sort((dataA, dataB) => dataA.content <= dataB.content ? 1 : -1)
    break
  case FilterOrder.IndexDesc:
    dataList = dataList.sort((dataA, dataB) => dataA.baseIndex <= dataB.baseIndex ? 1 : -1)
    break
  default:
    dataList = dataList.sort((dataA, dataB) => dataA.baseIndex > dataB.baseIndex ? 1 : -1)
    break
  }

  // Creating map
  dataList = dataList.map((data, index) => {
    if (index >= (page * rowsPerPage) && index < (page * rowsPerPage) + rowsPerPage)
      return (<DataHook key={index} index={index} title={data.title} content={data.content} date={data.date} language={data.language} url={data.url} tags={data.tags}/>)
  })

  // Render
  return(
    <div className="DataList">
      <div className="DataList-block">
        {dataList.length ?
          <div className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader >
                <TableHead >
                  <TableRow >
                    <TableCell className="DataList-name" align="left" style={{ minWidth: 170, border: '1px solid rgba(255,255,255,0.1)', borderTopLeftRadius: '20px' }}>Titre</TableCell>
                    <TableCell className="DataList-name" align="left" style={{ minWidth: 170 }}>Contenu</TableCell>
                    <TableCell className="DataList-name" align="center" style={{ minWidth: 170 }}>Langue</TableCell>
                    <TableCell className="DataList-name" align="center" style={{ minWidth: 170 }}>Tags</TableCell>
                    <TableCell className="DataList-name" align="center" style={{ minWidth: 170 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody aria-label="sticky table">
                  {dataList}
                </TableBody>

              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              rowsPerPageOptions={[4, 10, 25, 50, 100]}
              count={dataList.length}
              page={page}
              onChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>
          :
          <Paper className={classes.root}>
            <Typography variant="h6">Pas de datas trouvées avec ces options !</Typography>
          </Paper>}
      </div>
    </div>
  )
}

DataListHook.propTypes = {
  datas: PropTypes.array.isRequired,
  order: PropTypes.number.isRequired,
  filterLanguage: PropTypes.string.isRequired,
  filterTag: PropTypes.array.isRequired,
  filterSearch: PropTypes.string.isRequired
}

export default DataListHook
