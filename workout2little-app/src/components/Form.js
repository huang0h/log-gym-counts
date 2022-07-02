import { useState, useEffect } from "react"
import InputButton from "./InputButton"
// import SearchForm from "./SearchForm"
import {locationsArr, timesArr} from "../external"
import { DateTime } from "luxon"
import "../Form.css"

/*
    the Form manages its own internal state in the form of locations and timeRanges
    when the user submits the form data, Form will set the App search query
    using the passSearchQuery method from the props
*/

const Form = (props) => {
    const { passSearchQuery } = props

    // states to manage the location, time range BUTTONS
	// determine which are on/off
	const [locations, setLocations] = useState(locationsArr)
	const [timeRanges, setTimeRanges] = useState(timesArr)
    // const [rangeSelected, setRangeSelected] = useState(false)
    const [query, setQuery] = useState({
		location: "",
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
	})

    // form data for the range search field
    // const [selfFormData, setSelfFormData] = useState({
    //     start: {
    //         month: "",
    //         day: "",
    //         year: "",
    //     }, 
    //     end: {
    //         month: "",
    //         day: "",
    //         year: "",
    //     }
    // })

    function luxonToObj(lux) {
        return {
            month: lux.month,
            day: lux.day,
            year: lux.year
        }
    }

    /* -------- BUTTON STUFF -------- */
    
    // on rerender, set the App search query using input from the form
    useEffect(() => {
        // console.log(query)
        passSearchQuery(query)}, [query])

    function toggleLocationButton(event) {
        let newLoc = ""
        setLocations(locations.map(loc => {
            if (event.target.name === loc.value) {
                newLoc = loc.value
                return  {
                    ...loc,
                    isSelected: true
                }
            } else {
                return {
                    ...loc,
                    isSelected: false
                }
            }
        }))
        setQuery({
            ...query,
            location: newLoc
        })
    }

    function toggleTimeRangeButton(event) {
        // setRangeSelected(false)
        // helper to convert button label into JSON
        // let now = DateTime.now()
        // locking the app at 6/16/2022, 11:00 PM EST - around the time i shut off the logging script    
        let now = DateTime.fromObject({"year": 2022, "month": 6, "day": 16, hour: 23});
        function strToRange(str) {
            switch(str) {
                case "Last week":
                    return luxonToObj(now.minus({days: 7}))
                case "Last month":
                    return luxonToObj(now.minus({months: 1}))
                case "Last year":
                    return luxonToObj(now.minus({years: 1}))
                case "All time":
                    // if this runs for more than a thousand years
                    // idk what i'll do i'll probably be dead
                    return luxonToObj(now.minus({years: 1000}))
                default:
                    return {}
            }
        }

        let newStart = {}
        setTimeRanges(timeRanges.map(range => {
            if (event.target.name === range.value) {
                newStart = strToRange(range.value)
                return {
                    ...range,
                    isSelected: true
                }
            } else {
                return {
                    ...range,
                    isSelected: false
                }
            }
        }))
        setQuery({
            ...query,
            start: newStart,
            end: luxonToObj(now)
        })
    }

    /* -------- DATE FORM STUFF -------- */

    // function handleChange(event) {
    //     setSelfFormData({
    //         ...selfFormData,
    //         [event.target.id]: {
    //             ...selfFormData[event.target.id],
    //             [event.target.name]: event.target.value
    //         }})
    // }
    
    // function submitRange(event) {
    //     function parseObj(obj) {
    //         let ans = {}
    //         Object.keys(obj).forEach(key => {
    //             ans = {
    //                 ...ans,
    //                 [key]: parseInt(obj[key])
    //             }
    //         })
    //         return ans
    //     }

    //     event.preventDefault()
       
    //     // turn off all other time range buttons
    //     setTimeRanges(timeRanges.map(range => ({...range, isSelected: false})))
    //     setQuery({...query, start: parseObj(selfFormData.start), end: parseObj(selfFormData.end)}) 
    //     // console.log(selfFormData)
    //     // console.log(isValid)
    // }
    
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
                            onClick={toggleLocationButton}
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
                            onClick={toggleTimeRangeButton}
                            purpose="timerange"
                        />
                )})}
            </div>
            {/* <SearchForm onSubmit = {submitRange} handleChange = {handleChange} data = {selfFormData} 
            selected = {rangeSelected} toggle = {toggleTimeRangeButton} /> */}
            {/* <form className = "range-search" onSubmit = {submitRange}>
                <h4>
                    or range search:
                </h4>
                from
                <DateSearch value = {selfFormData.start} name = "range-search-start" 
                handleChange = {handleChange} purpose = "start" />
                to
                <DateSearch value = {selfFormData.end} name = "range-search-end"
                handleChange = {handleChange} purpose = "end" />
                <br />
                <button className = "input-button">
                    Search range
                </button>
            </form> */}
        </div>
    )
}

export default Form;

// function determineOn(objList, boolProp) {
    //     let ans = ""
    //     objList.forEach(obj => {
    //         ans = obj[boolProp] ? obj.value : ans
    //     })
    //     return ans
    // }

    // function buttonEnterData() {
    //     let now = DateTime.now()
    //     let newSearchQuery = {
    //         location: determineOn(locations, "isSelected"),
    //         // placeholder values
    //         start: {
    //             month: -1,
    //             day: -1,
    //             year: -1
    //         },
    //         end: luxonToObj(now)
    //     }

    //     let timeQuery = determineOn(timeRanges, "isSelected")
        
    //     switch(timeQuery) {
    //         case "Last week":
    //             newSearchQuery.start = luxonToObj(now.minus({days: 7}))
    //             break
    //         case "Last month":
    //             newSearchQuery.start = luxonToObj(now.minus({months: 1}))
    //             break
    //         case "Last year":
    //             newSearchQuery.start = luxonToObj(now.minus({years: 1}))
    //             break
    //         case "All time":
    //             // if this runs for more than a thousand years
    //             // idk what i'll do i'll probably be dead
    //             newSearchQuery.start = luxonToObj(now.minus({years: 1000}))
    //             break
    //         default:
    //             break
    //     }
    //     // console.log(newSearchQuery)
    //     passSearchQuery(newSearchQuery)
    // }

    // // toggle a button state when it is clicked - only one button in each group can
    // // be selected at a time
    // function toggleButton(event) {
    //     const newValues = []
    //     const prev = event.target.id === "location" ? locations : timeRanges
    //     prev.forEach(element => {
    //         newValues.push({
    //             ...element,
    //             isSelected: event.target.name === element.value
    //         })
    //     })
    //     if (event.target.id === "location") {
    //         setLocations(newValues)
    //     } else {
    //         setTimeRanges(newValues)
    //     }
    // }