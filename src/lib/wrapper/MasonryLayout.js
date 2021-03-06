import React from 'react'
import PropTypes from 'prop-types'

/**
 * MasonryLayout
 */
const MasonryLayout = (props) => {
  const columnWrapper = {}
  const result = []

  // create column
  for (let i = 0; i < props.columns; i++){
    columnWrapper[`columns${i}`] = []
  }

  // divide children into columns
  for (let i = 0; i < props.children.length; i++) {
    const columnIndex = i % props.columns

    columnWrapper[`columns${columnIndex}`].push(
      <div key={i} style={{ marginBottom: `${props.gap}px` }}>{props.children[i]}</div>
    )
  }

  // wrap children in each column with a div
  for (let i = 0; i< props.columns; i++){
    result.push (
      <div
        key={i}
        style={{ marginLeft: `${i > 0 ? props.gap : 0}px` }}>
        {columnWrapper[`columns${i}`]}
      </div>
    )
  }

  return <div style={{ display: 'flex' }}>{result}</div>
}

MasonryLayout.propTypes = {
  columns: PropTypes.number.isRequired,
  gap: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.element)
}

MasonryLayout.defaultProps = {
  columns: 2,
  gap: 20
}

export default MasonryLayout