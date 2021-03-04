import React, { useState, useEffect } from 'react'

import './DataList.scss'
import { debugLog } from '../../../lib/logs'
import PropTypes from 'prop-types'
import Data from './data/Data'
import { Button, Card, Intent } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

/**
 * DataListHook class
 */
function DataListHook (props) {
  debugLog('DataList:render')

  let dataList = props.datas

  const [minIndex, setMinIndex] = useState(0)
  const [maxIndex, setMaxIndex] = useState(4)

  useEffect(() => {
    setMinIndex(0)
    setMaxIndex(4)
  }, [props.filterTag, props.filterLanguage])

  /**
   * Load Previous page
   */
  function previousPage () {
    if (minIndex !== 0) {
      setMinIndex(minIndex - 4)
      setMaxIndex(maxIndex - 4)
    }
  }

  /**
   * Load Next page
   */
  function nextPage () {
    if (maxIndex + 1 <= dataList.length) {
      setMinIndex(minIndex + 4)
      setMaxIndex(maxIndex +4)
    }
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
  if (props.order === 'Alphabétique par le Titre')
    dataList = dataList.sort((dataA, dataB) => dataA.title > dataB.title ? 1 : -1)
  else if (props.order === 'Alphabétique par le Contenu')
    dataList = dataList.sort((dataA, dataB) => dataA.content > dataB.content ? 1 : -1)
  else
    dataList = dataList.sort((dataA, dataB) => dataA.baseIndex > dataB.baseIndex ? 1 : -1)

  // Creating map
  dataList = dataList.map((data, index) => {
    if (index < maxIndex && index >= minIndex)
      return (<Data key={index} index={index} title={data.title} content={data.content} date={data.date} language={data.language} url={data.url} tags={data.tags}/>)
  })

  // Render
  return(
    <div className="DataList">
      {dataList.length ?
        <div className="DataList-header">
          <Card className="DataList-card">
            <div className="DataList-name">Titre</div>
            <div className="DataList-name">Contenu</div>
            <div className="DataList-name">Langue</div>
            <div className="DataList-name">Tags</div>
            <div className="DataList-options">Actions</div>
          </Card>
          <div className="DataList-list">
            {dataList}
          </div>

          <div className="DataList-pagination">
            <Button
              intent={Intent.NONE}
              icon={IconNames.ARROW_LEFT}
              onClick={previousPage}
              disabled={minIndex === 0}
            />
            <Button
              intent={Intent.NONE}
              icon={IconNames.ARROW_RIGHT}
              onClick={nextPage}
              disabled={maxIndex + 1 > dataList.length}
            />
            <span className="Datas-pagination">{minIndex} - {maxIndex} of {dataList.length}</span>
          </div>

        </div>:
        <p>Pas de datas pour le moment !</p> }
    </div>
  )
}

DataListHook.propTypes = {
  datas: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  filterLanguage: PropTypes.string.isRequired,
  filterTag: PropTypes.array.isRequired,
  filterSearch: PropTypes.string.isRequired
}

export default DataListHook
