import React from "react"

const InputButton = (props) => {
    const {name, isSelected, onClick, purpose} = props

    return (
        <button 
        className = {`input-button ${isSelected ? "selected" : ""} `}
        id = {purpose}
        name = {name}
        onClick = {onClick}
        >
            {name}
        </button>
    )
}

export default InputButton