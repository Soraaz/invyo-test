import React from 'react'

import './DataList.scss'
import { debugLog } from '../../../lib/logs';
import PropTypes from 'prop-types';
import Data from './data/Data';
import { Button, Card, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

/**
 * DataList class
 */
class DataList extends React.Component {
  /**
   * Constructor (React lifecycle)
   */
  constructor(props) {
    debugLog('DataList::constructor')
    super(props)

    this.state = {
      minIndex: 0,
      maxIndex: 4
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filterTag !== this.props.filterTag || prevProps.filterLanguage !== this.props.filterLanguage)
    {
      this.setState(state => ({
        ...state,
        minIndex: 0,
        maxIndex: 4
      }))
    }
  }

  /**
   * Load Previous page
   */
  previousPage = () => {
    if (this.state.minIndex !== 0) {
      this.setState(state => ({
        ...state,
        minIndex: state.minIndex - 4,
        maxIndex: state.maxIndex - 4
      }))
    }
  }

  /**
   * Load Next page
   */
  nextPage = () => {
    if (this.state.maxIndex + 1 <= this.dataList.length) {
      this.setState(state => ({
        ...state,
        minIndex: state.minIndex + 4,
        maxIndex: state.maxIndex + 4
      }))
    }
  }

  /**
   * Render (React lifecycle)
   */
  render() {
    debugLog('DataList:render')
    this.dataList = this.props.datas;

    if (this.props.filterTag !== '')
    {
      this.dataList = this.dataList.filter((data) => {
        const tagFound = Object.entries(data.tags).filter((tags) => {
          return (tags[1].includes(this.props.filterTag))
        });
        return tagFound.length > 0
      })
    }

    if (this.props.filterLanguage !== '')
    {
      this.dataList = this.dataList.filter((data) => {
        return (data.language.includes(this.props.filterLanguage))
      })
    }

    if (this.props.order === 'Alphabétique par le Titre')
      this.dataList = this.dataList.sort((dataA, dataB) => dataA.title > dataB.title ? 1 : -1)
    else if (this.props.order === 'Alphabétique par le Contenu')
      this.dataList = this.dataList.sort((dataA, dataB) => dataA.content > dataB.content ? 1 : -1)
    else
      this.dataList = this.dataList.sort((dataA, dataB) => dataA.baseIndex > dataB.baseIndex ? 1 : -1)

    this.dataList = this.dataList.map((data, index) => {
      if (index < this.state.maxIndex && index >= this.state.minIndex)
        return (<Data key={index} index={index} title={data.title} content={data.content} date={data.date} language={data.language} url={data.url} tags={data.tags}/>);
    })

    return(
      <div className="DataList">
        {this.dataList.length ?
          <div className="DataList-header">
            <Card className="DataList-card">
              <div className="DataList-name">Titre</div>
              <div className="DataList-name">Contenu</div>
              <div className="DataList-name">Langue</div>
              <div className="DataList-name">Tags</div>
              <div className="DataList-options">Actions</div>
            </Card>
            <div className="DataList-list">
              {this.dataList}
            </div>

            <div className="DataList-pagination">
              <Button
                intent={Intent.NONE}
                icon={IconNames.ARROW_LEFT}
                onClick={this.previousPage}
                disabled={this.state.minIndex === 0}
              />
              <Button
                intent={Intent.NONE}
                icon={IconNames.ARROW_RIGHT}
                onClick={this.nextPage}
                disabled={this.state.maxIndex + 1 > this.dataList.length}
              />
              <span className="Datas-pagination">{this.state.minIndex} - {this.state.maxIndex} of {this.dataList.length}</span>
            </div>

          </div>:
          <p>Pas de datas pour le moment !</p> }
      </div>
    )
  }
}

DataList.propTypes = {
  datas: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  filterLanguage: PropTypes.string.isRequired,
  filterTag: PropTypes.string.isRequired
}

export default DataList;
