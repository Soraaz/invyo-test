import React, { useState } from 'react'

import './DataList.scss'
import { debugLog } from '../../../lib/logs'
import PropTypes from 'prop-types'
import Data from './data/Data'
import { Card } from '@blueprintjs/core'
import { FilterOrder } from '../DataPageHook'
import { TableFooter, TablePagination, TableRow } from '@material-ui/core'

/**
 * DataListHook class
 */
function DataListHook (props) {
  debugLog('DataList:render')

  let dataList = props.datas

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(4)

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
    const content = data.title.toLowerCase()
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
      return (<Data key={index} index={index} title={data.title} content={data.content} date={data.date} language={data.language} url={data.url} tags={data.tags}/>)
  })

  // Render
  return(
    <div className="DataList">
      {dataList.length ?
        <div className="DataList-block">
          <Card className="DataList-header">
            <div className="DataList-name">Titre</div>
            <div className="DataList-name">Contenu</div>
            <div className="DataList-name">Langue</div>
            <div className="DataList-name">Tags</div>
            <div className="DataList-options">Actions</div>
          </Card>
          <div className="DataList-list">
            {dataList}
          </div>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[4, 10, 25, 50, 100]}
                component="div"
                count={dataList.length}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>

        </div>:
        <p>Pas de datas pour le moment !</p> }
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
