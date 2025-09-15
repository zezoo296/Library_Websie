import React from 'react'
import classes from './PrimaryButton.module.css'

const PrimaryButton = ({ children, extraClasses = '', onClick }) => {
  return (
    <button className={`${classes.button} ${extraClasses}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default PrimaryButton
