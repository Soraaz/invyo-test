import React, { useEffect, useState } from 'react'
import NoSsr from '@material-ui/core/NoSsr'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { makeStyles, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

const useStyles = makeStyles(() => ({
  disableFlex: {
    display: 'block'
  }
}))

const Tag = styled(({ label, onDelete, ...props }) => (
  <div {...props}>
    <span>{label}</span>
    <CloseIcon onClick={onDelete} />
  </div>
))`
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`

const Listbox = styled('ul')`
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: #fafafa;
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus='true'] {
    background-color: #e6f7ff;
    cursor: pointer;

    & svg {
      color: #000;
    }
  }
`

/**
 * MultiSelectHook
 */
function MultiSelectHook(props) {
  const classes = useStyles()
  const [value, setValue] = useState([])

  useEffect(() => {
    props.reloadData(value)
  }, [value])

  return (
    <NoSsr>
      <div>
        <div style={{ width: '300px' }}>
          <Autocomplete
            multiple
            id="tags-filled"
            disableCloseOnSelect={true}
            classes={{
              option: classes.disableFlex
            }}
            options={props.datas.map((option) => option)}
            defaultValue={[]}
            freeSolo
            onChange={
              (event ,value) => {
                setValue(value)
              }
            }
            renderTags={(value, getTagProps) =>
            {
              return value.map((data, index) => (
                <Tag key={index} label={data} {...getTagProps({ index })}/>
              ))
            }
            }
            renderInput={(params) => (
              <TextField
                label={props.label}
                variant="outlined"
                {...params}
                InputLabelProps={{
                  shrink: true
                }}
              />
            )}
            ListboxComponent={Listbox}
            renderOption={(option) => {
              return (
                <div style={{ display: 'flex' }}>
                  <span >{option}</span>
                  <CheckIcon fontSize="small" style={{ alignSelf: 'right' }}/>
                </div>
              )
            }}
          />
        </div>
      </div>
    </NoSsr>
  )
}

MultiSelectHook.propTypes = {
  datas: PropTypes.array.isRequired,
  reloadData: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default MultiSelectHook