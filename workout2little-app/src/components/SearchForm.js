// old component used to manually enter a date range to obtain data from

// import DateSearch from "./DateSearch"
// import { useState } from "react"
// import { validDate } from "../external"

// const SearchForm = (props) => {
//     const {onSubmit, handleChange, data, selected, toggle} = props
//     // state to manage which fields of the query are invalid
//     const [badQueries, setBad] = useState([])

//     function submitRange(event) {
//         event.preventDefault()

//         // check if the searched query is valid; if it is, tell form to send it as a query
//         // else, alert the user of any invalid inputs
//         const badEntries = []
//         console.log(data)
//         Object.keys(data).forEach(key => {
//             let time = data[key]
//             Object.keys(time).forEach(field => {
//                 if (!validDate(time[field], field)) {
//                     badEntries.push({endpoint: key, field: field, entry: time[field]})
//                 }
//             })
//         })
//         console.log(badEntries)
//         badEntries.length === 0 && onSubmit(event) 
//         setBad(badEntries)
//     }

//     function makeReport(badEntries) {
//         let report = ""
//         badEntries.forEach((query) => {
//             report += `value [${query.entry}] at point ${query.endpoint}
//             is invalid for field ${query.field}\n`
//         })
//         return report
//     }

//     return (
//         <form className="range-search" onSubmit={submitRange}>
//             <h4>
//                 or range search:
//             </h4>
//             from
//             <DateSearch value={data.start} name="range-search-start"
//                 handleChange={handleChange} purpose="start" />
//             {/* <input id = {0} className = "range-search-input" name = "range-search-start" 
//                             placeholder = "mm/dd/yyyy" value = {selfFormData[0]} onChange = {handleChange}/> */}
//             to
//             <DateSearch value={data.end} name="range-search-end"
//                 handleChange={handleChange} purpose="end" />
//             {/* <input id = {1} className = "range-search-input" name = "range-search-end" 
//                             placeholder = "mm/dd/yyyy" value = {selfFormData[1]} onChange = {handleChange} /> */}
//             <br />
//             <button className="input-button" onClick={toggle}>
//                 Search range
//             </button>
//             {/* only render if there exist some bad queries */}
//             {badQueries.length > 0 && selected && 
//             <div className = "query-alert">
//                 Invalid query: <br />
//                 {badQueries.map(query => (
//                 <p>
//                     value [{query.entry}] at point {query.endpoint} is invalid for field {query.field} 
//                 </p>))}
//             </div>}
//         </form>)
// }

// export default SearchForm