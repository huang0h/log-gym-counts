import { useState } from "react"

const DateSearch = (props) => {
    
    const [rangeDate, setRangeDate] = useState({
        month: "",
        day: "",
        year: ""
    })

    function handleDSChange(event) {
        const newRange = {
            ...rangeDate,
            [event.target.name]: event.target.value
        }
        console.log(newRange)
        setRangeDate(newRange)
    }

    return (
        <div className = "datesearch">
            <input className = "datesearch-inp" onChange = {handleDSChange} value = {rangeDate.month}
            type = "text" name = "month" placeholder = "mm" />
            <input className = "datesearch-inp" onChange = {handleDSChange} value = {rangeDate.day}
            type = "text" name = "day" placeholder = "dd" />
            <input className = "datesearch-inp" onChange = {handleDSChange} value = {rangeDate.year}
            type = "text" name = "year" placeholder = "yyy" />
        </div>
    )
}

export default DateSearch