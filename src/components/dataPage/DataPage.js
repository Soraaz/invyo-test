import React from 'react'

import './DataPage.scss'
import { debugLog } from '../../lib/logs'
import { Card, Elevation, H1, HTMLSelect } from '@blueprintjs/core'
// import { isMobile } from 'react-device-detect';
import DataList from './dataList/DataList'
// @ts-ignore
import datas from '../../data/data.js'
import Network from './network/Network'

/**
 * DataPage class
 */
class DataPage extends React.Component {
  /**
   * Constructor (React lifecycle)
   */
  constructor(props) {
    super(props)
    debugLog('DataPage::constructor')

    const datasParse = datas.articles.map((task, index) => {
      return ({
        content: task.Content,
        title: task.Title,
        date: task.Date,
        url: task.url,
        language: task.Language,
        tags: task.Tags,
        baseIndex: index
      })
    })

    this.state = {
      seeEndTask: false,
      datas: datasParse,
      network: datas.network,
      order: 'Index',
      tags: this.getTags(datasParse),
      languages: this.getLanguage(datasParse),
      filterLanguage: '',
      filterTag: ''
    }
  }

  /**
   * Return all possible Tags
   * @param datas All Datas
   */
  getTags = (datas) => {
    const totalTags = []

    datas.forEach((data) => {
      Object.entries(data.tags).map(function (tags) {
        if (tags[1].length > 0)
        {
          return tags[1].map(function(tag) {
            if (!totalTags.includes(tag))
              totalTags.push(tag)
          })
        }
      })
    })
    return totalTags
  }

  /**
   * Return all possible Languages
   * @param datas All Datas
   */
  getLanguage = (datas) => {
    const totalLanguages = []

    datas.forEach((data) => {
      if (!totalLanguages.includes(data.language))
        totalLanguages.push(data.language)
    })
    return totalLanguages
  }

  /**
   * handle order state
   * @param e Value
   */
  handleOrder = (e) => {
    this.setState(state => ({
      ...state,
      order: e.target.value
    }))
  }

  /**
   * handle filter of language state
   * @param e Value
   */
  handleFilterLanguage = (e) => {
    this.setState(state => ({
      ...state,
      filterLanguage: e.target.value
    }))
  }

  /**
   * handle filter of tag state
   * @param e Value
   */
  handleFilterTag = (e) => {
    this.setState(state => ({
      ...state,
      filterTag: e.target.value
    }))
  }

  /**
   * Render (React lifecycle)
   */
  render() {
    debugLog('DataPage:render')

    return(
      <div className="Datas" >
        <div className="Datas-center">
          <Card className="Datas-card" elevation={Elevation.TWO}>
            <H1>Mes données</H1>

            <Card elevation={Elevation.TWO} className="Datas-tools" >
              <div className="Datas-tools-single">
                <p>Ranger par:</p>
                <div className="bp3-select .modifier" >
                  <HTMLSelect defaultValue={1} onChange={this.handleOrder}>
                    <option>Index</option>
                    <option>Alphabétique par le Titre</option>
                    <option>Alphabétique par le Contenu</option>
                  </HTMLSelect>
                </div>
              </div>
              <div className="Datas-tools-single">
                <p>Trier par langue:</p>
                <div className="bp3-select .modifier" >
                  <HTMLSelect defaultValue={1} onChange={this.handleFilterLanguage}>
                    <option/>
                    {
                      this.state.languages.map((language, index) => {
                        return <option key={index}>{language}</option>
                      })
                    }
                  </HTMLSelect>
                </div>
              </div>
              <div className="Datas-tools-single">
                <p>Trier par tag:</p>
                <div className="bp3-select .modifier" >
                  <HTMLSelect defaultValue={1} onChange={this.handleFilterTag}>
                    <option/>
                    {
                      this.state.tags.map((tag, index) => {
                        return <option key={index}>{tag}</option>
                      })
                    }
                  </HTMLSelect>
                </div>
              </div>
            </Card>

            <DataList datas={this.state.datas} order={this.state.order} filterLanguage={this.state.filterLanguage} filterTag={this.state.filterTag}/>
            <Network network={this.state.network}/>
          </Card>
        </div>
      </div>
    )
  }
}

export default DataPage
