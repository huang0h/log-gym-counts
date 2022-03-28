import React from "react"

const LocationButton = (props) => {
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

export default LocationButton