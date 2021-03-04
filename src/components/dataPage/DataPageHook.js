import React , { useState } from 'react'

import './DataPage.scss'
import { debugLog } from '../../lib/logs'
import { Card, Elevation, H1, HTMLSelect } from '@blueprintjs/core'
import MultiSelectHook from '../../lib/material-ui/MultiSelectHook'
import DataListHook from './dataList/DataListHook'
// @ts-ignore
import datasFile from '../../data/data.js'
import Network from './network/Network'
import { InputLabel, MenuItem, Select, TextField, makeStyles, FormControl, OutlinedInput } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    minHeight: 60
  }
}))

/**
 * DataPageHook class
 */
function DataPageHook () {
  debugLog('DatapageHook:render')
  const classes = useStyles()

  const [datas] = useState(() => {
    return datasFile.articles.map((task, index) => {
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
  })
  const [network] = useState(datasFile.network)
  const [order, setOrder] = useState('Index')
  const [tags] = useState(getTags(datas))
  const [languages] = useState(getLanguage(datas))
  const [filterLanguage, setFilterLanguage] = useState('')
  const [filterTag, setFilterTag] = useState([])
  const [searchValue, setSearchValue] = useState('')

  /**
   * Return all possible Tags
   * @param datas All Datas
   */
  function getTags (datas) {
    debugLog('DatapageHook:getTags')
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
  function getLanguage (datas) {
    debugLog('DatapageHook:getLanguage')
    const totalLanguages = []

    datas.forEach((data) => {
      if (!totalLanguages.includes(data.language))
        totalLanguages.push(data.language)
    })
    return totalLanguages
  }

  /**
   * Update Search field
   * @param {Object} e Event
   */
  function updateSearch (e) {
    debugLog('DataPage::updateSearch')
    if (e.target.value && e.target.value.length > 0 && e.target.value.length < 255)
    {
      setSearchValue(e.target.value.toLowerCase())
    }
  }

  /**
   * handle order state
   * @param e Value
   */
  function handleOrder (e) {
    debugLog('DatapageHook:handleOrder')
    setOrder(e.target.value)
  }

  /**
   * handle filter of language state
   * @param e Value
   */
  function handleFilterLanguage (e) {
    debugLog('DatapageHook:handleFilterLanguage')
    setFilterLanguage(e.target.value)
  }

  /**
   * handle filter of tag state
   * @param {Array} data Array of tags
   */
  function handleFilterTag (data) {
    debugLog('DatapageHook:handleFilterTag')
    setFilterTag(data)
  }

  return(
    <div className="Datas" >
      <div className="Datas-center">
        <Card className="Datas-card" elevation={Elevation.TWO}>
          <H1>Mes données</H1>

          <Card elevation={Elevation.TWO} className="Datas-tools" >

            <div className="Datas-tools-single">
              <TextField
                label="Recherche:"
                placeholder="Potatoes"
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={updateSearch}
              />
            </div>

            <div className="Datas-tools-single">
              <p>Ranger par:</p>
              <div className="bp3-select .modifier" >
                <HTMLSelect defaultValue={1} onChange={handleOrder}>
                  <option>Index</option>
                  <option>Alphabétique par le Titre</option>
                  <option>Alphabétique par le Contenu</option>
                </HTMLSelect>
              </div>
            </div>

            <div className="Datas-tools-single">
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel shrink>
                  Trier par langue:
                </InputLabel>
                <Select
                  input={<OutlinedInput notched label="Trier par langue:" />}
                  labelId="demo-simple-select-outlined-label"
                  variant="outlined"
                  onChange={handleFilterLanguage}
                  value={filterLanguage}
                >
                  <MenuItem value="" >Toutes</MenuItem>
                  {
                    languages.map((language, index) => {
                      return <MenuItem key={index + 1} value={language}>{language}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </div>

            <div className="Datas-tools-single">
              <FormControl variant="outlined" className={classes.formControl}>
                <MultiSelectHook datas={tags} reloadData={handleFilterTag} label="Trier par tags:"/>
              </FormControl>
            </div>

          </Card>

          <DataListHook datas={datas} order={order} filterLanguage={filterLanguage} filterTag={filterTag} filterSearch={searchValue} />
          <Network network={network}/>
        </Card>
      </div>
    </div>
  )
}

export default DataPageHook
