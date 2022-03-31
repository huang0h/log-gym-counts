import { useState, useEffect } from "react"
import InputButton from "./InputButton"
import DateSearch from "./DateSearch"
import {processDates} from "../external"

const Form = (props) => {

    const {
        toggleSelectedLocation, 
        toggleSelectedRange, 
        locations,
        timeRanges,
        passSearchRange
    } = props

    const [selfFormData, setSelfFormData] = useState([
        {
            month: "",
            day: "",
            year: "",
        }, 
        {
            month: "",
            day: "",
            year: "",
        }
    ])

    function submitRange(event) {
        event.preventDefault()
        console.log(selfFormData)
    }

    function handleChange(event) {
        const newFormData = [...selfFormData]
        newFormData[event.target.id] = event.target.value
        console.log(newFormData)
        setSelfFormData(newFormData)
    }
    
    return (
        <div className="form">
            <h2>
                Displaying data for:
            </h2>
            <div className="input-grid input-buttons">
                {locations.map((location) => {
                    return (
                        <InputButton key={location.id}
                            name={location.location}
                            isSelected={location.isSelected}
                            toggle={toggleSelectedLocation}
                        />
                )})}
            </div>
            <h2>
                From:
            </h2>
            <div className="input-grid input-buttons">
                {timeRanges.map((range) => {
                    return (
                        <InputButton key={range.id}
                            name={range.range}
                            isSelected={range.isSelected}
                            toggle={toggleSelectedRange}
                        />
                )})}
            </div>
            <form className = "range-search" onSubmit = {submitRange}>
                <h4>
                    or range search:
                </h4>
                <DateSearch value = {selfFormData[0]} name = "range-search-start"/>
                {/* <input id = {0} className = "range-search-input" name = "range-search-start" 
                    placeholder = "mm/dd/yyyy" value = {selfFormData[0]} onChange = {handleChange}/> */}
                to
                <DateSearch value = {selfFormData[1]} name = "range-search-end"/>
                {/* <input id = {1} className = "range-search-input" name = "range-search-end" 
                    placeholder = "mm/dd/yyyy" value = {selfFormData[1]} onChange = {handleChange} /> */}
                <br />
                <button className = "input-button">
                    Go!
                </button>
            </form>
        </div>
    )
}

export default Form;