import React from "react"

const InputButton = (props) => {
    const {name, isSelected, toggle} = props

    return (
        <button 
        className = {`input-button ${isSelected ? "selected" : ""}`}
        name = {name}
        onClick = {toggle}
        >
            {name}
        </button>
    )
}

export default InputButton