import { useState, useEffect } from "react"
import InputButton from "./InputButton"
import DateSearch from "./DateSearch"
import {processDates, locationsArr, timesArr} from "../external"
import { DateTime } from "luxon"

/*
    the Form manages its own internal state in the form of locations and timeRanges
    when the user submits the form data, Form will set the App search query
    using the passSearchQuery method from the props
*/


// const pg = require('pg')
// const PG_CONNECTION = "postgresql://hgpxdzgiautybn:c4974e71f7edf09fe9e370ecc94596e733eb2a5b75b9ef5ea189bb4a2b100382@ec2-34-231-183-74.compute-1.amazonaws.com:5432/d7cemctiq8rnjo"
// const PG_CONNECTION = "postgresql://postgres:agb49t78@localhost/marino-counts"
// const pgClient = new pg.Client(PG_CONNECTION)
// pgClient.connect()

const Form = (props) => {
    const { passSearchQuery } = props


    // states to manage the location, time range BUTTONS
	// determine which are on/off
	const [locations, setLocations] = useState(locationsArr)
	const [timeRanges, setTimeRanges] = useState(timesArr)

    // form data for the range search field
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

    /* -------- BUTTON STUFF -------- */
    
    // on rerender, set the App search query using input from the form
    useEffect(buttonEnterData, [locations, timeRanges])

    function buttonEnterData() {
        let locationQuery = ""
        locations.forEach(location => {
            locationQuery = location.isSelected ? location.value : locationQuery
        })

        let timeQuery = ""
        timeRanges.forEach(range => {
            timeQuery = range.isSelected ? range.value : timeQuery
        })
        
        let now = DateTime.now()
        let newSearchQuery = {
            location: locationQuery,
            // placeholder values
            start: {
                month: -1,
                day: -1,
                year: -1
            }, end: {
                month: -1,
                day: -1,
                year: -1
            }
        }

        function luxonToObj(lux) {
            return {
                month: lux.month,
                day: lux.day,
                year: lux.year
            }
        }
        
        switch(timeQuery) {
            case "Last week":
                newSearchQuery.start = luxonToObj(now.minus({days: 7}).c)
                break
            case "Last month":
                newSearchQuery.start = luxonToObj(now.minus({months: 1}))
                break
            case "Last year":
                newSearchQuery.start = luxonToObj(now.minus({years: 1}))
                break
            case "All time":
                // if this runs for more than a thousand years
                // idk what i'll do i'll probably be dead
                newSearchQuery.start = luxonToObj(now.minus({years: 1000}))
                break
        }
        newSearchQuery.end = luxonToObj(now)
        // console.log(newSearchQuery)
    }

    // toggle a button state when it is clicked - only one button in each group can
    // be selected at a time
    function toggleButton(event) {
        const newValues = []
        const prev = event.target.id === "location" ? locations : timeRanges
        prev.forEach(element => {
            newValues.push({
                ...element,
                isSelected: event.target.name === element.value
            })
        })
        if (event.target.id === "location") {
            setLocations(newValues)
        } else {
            setTimeRanges(newValues)
        }
    }

    /* -------- DATE FORM STUFF -------- */

    function handleChange(event) {
        console.log(selfFormData)
        let index = event.target.id === "start" ? 0 : 1
        let newFormData = [...selfFormData]
        newFormData[index] = {...newFormData[index], [event.target.name]: event.target.value}
        setSelfFormData(newFormData)
    }
    
    // this will have to clear up the time buttons
    // can just loop thru the ranges, set them all to false
    function submitRange(event) {
        event.preventDefault()
        // turn the time range buttons off
        const offTimeRanges = []
        timeRanges.forEach(range => {
            offTimeRanges.push({...range, isSelected: false})
        })
        setTimeRanges(offTimeRanges)

        console.log(selfFormData)
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
                            name={location.value}
                            isSelected={location.isSelected}
                            onClick={toggleButton}
                            purpose="location"
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
                            name={range.value}
                            isSelected={range.isSelected}
                            onClick={toggleButton}
                            purpose="timerange"
                        />
                )})}
            </div>
            <form className = "range-search" onSubmit = {submitRange}>
                <h4>
                    or range search:
                </h4>
                from
                <DateSearch value = {selfFormData[0]} name = "range-search-start" 
                handleChange = {handleChange} purpose = "start" />
                {/* <input id = {0} className = "range-search-input" name = "range-search-start" 
                    placeholder = "mm/dd/yyyy" value = {selfFormData[0]} onChange = {handleChange}/> */}
                to
                <DateSearch value = {selfFormData[1]} name = "range-search-end"
                handleChange = {handleChange} purpose = "end" />
                {/* <input id = {1} className = "range-search-input" name = "range-search-end" 
                    placeholder = "mm/dd/yyyy" value = {selfFormData[1]} onChange = {handleChange} /> */}
                <br />
                {/* this will attempt to  */}
                <button className = "input-button">
                    Search range
                </button>
            </form>
        </div>
    )
}

export default Form;