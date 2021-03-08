import React , { useState } from 'react'

import './DataPage.scss'
import { debugLog } from '../../lib/logs'
import MultiSelectHook from '../../lib/material-ui/MultiSelectHook'
import DataListHook from './dataList/DataListHook'
// @ts-ignore
import datasFile from '../../data/data.js'
import { InputLabel, MenuItem, Select, TextField, makeStyles, FormControl, OutlinedInput, Typography, Paper } from '@material-ui/core'

// Order enum
export const FilterOrder = {
  Index : 0,
  TitleAsc : 1,
  TitleDesc : 2,
  ContentAsc : 3,
  ContentDesc : 4,
  IndexDesc : 5
}

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120,
    minHeight: 60
  },
  orderBy: {
    width: '120px'
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
  const [order, setOrder] = useState(FilterOrder.Index)
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
    if (e.target && e.target.value.length >= 0 && e.target.value.length < 255)
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

        <Paper className="Datas-tools" >

          <div>
            <Typography variant="h4" style={{ marginBottom: '20px' }}>Mes données</Typography>

            <div className="Datas-tools-single">
              <TextField
                label="Recherche:"
                placeholder="Potatoes"
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={updateSearch}
              />
            </div>

            <div className="Datas-tools-single">
              <FormControl variant="outlined" className={classes.orderBy}>
                <InputLabel shrink>
                 Ordonner par:
                </InputLabel>
                <Select
                  input={<OutlinedInput notched label="Ordonner par :" />}
                  labelId="demo-simple-select-outlined-label"
                  variant="outlined"
                  onChange={handleOrder}
                  value={order}
                >
                  <MenuItem value={FilterOrder.Index}>Index</MenuItem>
                  <MenuItem value={FilterOrder.IndexDesc}>Index inversé</MenuItem>
                  <MenuItem value={FilterOrder.TitleAsc} >Alphabétique par le Titre</MenuItem>
                  <MenuItem value={FilterOrder.TitleDesc} >Alphabétique inversé par le Titre</MenuItem>
                  <MenuItem value={FilterOrder.ContentAsc} >Alphabétique par le Contenu</MenuItem>
                  <MenuItem value={FilterOrder.ContentDesc} >Alphabétique inversé par le Contenu</MenuItem>
                </Select>
              </FormControl>
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
          </div>
        </Paper>

        <DataListHook datas={datas} order={order} filterLanguage={filterLanguage} filterTag={filterTag} filterSearch={searchValue} />
      </div>
    </div>
  )
}

export default DataPageHook
