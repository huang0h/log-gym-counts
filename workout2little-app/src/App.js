import './App.css';
import Graph from "./components/Graph"
import Form from "./components/Form"
import Info from "./components/Info"
import axios from 'axios'
import { DateTime } from 'luxon'

import { useState, useEffect } from "react"
import { getLocationMax, hours } from "./external"

function App() {
	// state to determine the range within which to 
	// obtain data from and for what location
	// state will be an array of two objects, both of which contain
	// a month, day, and year field - first is start, second is end
	const [searchQuery, setSearchQuery] = useState({
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
	const [loading, setLoading] = useState(false);

	const [selectedDay, setSelectedDay] = useState("")

	// state to manage the data that the graph displays
	// state is an object w/ fields for each day of the week
	// each field is an array of objects containing count and date of logging
	const [info, setInfo] = useState({
		counts: {"Monday": [],
		"Tuesday": [],
		"Wednesday": [],
		"Thursday": [],
		"Friday": [],
		"Saturday": [],
		"Sunday": [],},
		max: 100
	})

	// organizes the log JSON by their respective day
	function logsToWeekdayCounts(logList) {
		let weekdays = {
			"Monday": [],
			"Tuesday": [],
			"Wednesday": [],
			"Thursday": [],
			"Friday": [],
			"Saturday": [],
			"Sunday": [],
		}

		logList.forEach(log => {
			const day = DateTime.fromObject({month: log.month, day: log.day, year: log.year}).weekdayLong
			weekdays[day].push(log)
		})

		return weekdays
	}

	// takes a list of Logs, then returns a list of the average counts per hour
	// given they are all for the same day
	function organizeCountsByHour(logList) {
		let hourCounts = []
		hours.forEach(ele => {
			hourCounts.push([])
		})

		// for each log, add its count to the corresponding array in hourCounts
		// starts at 5 AM => 5 AM corresponds to index 0
		logList.forEach(log => {
			// at some point, log.hour is capable of being 0 - i have no idea why
			log.hour - 5  > 0 && hourCounts[log.hour - 5].push(log.count)
		})

		return hourCounts.map(countArr => {
			let sum = countArr.reduce((x, y) => x + y, 0)
			return Math.floor(sum / countArr.length || 0)
		})
	}

	useEffect(() => {
		// if searchQuery has invalid fields, do nothing
		if (searchQuery.location === ""
		|| searchQuery.start.year === -1
		|| searchQuery.start.year === -1 || loading) {
			return
		}
		// else fetch data
		setLoading(true);
		axios.get(
			// for development testing
			// `http://localhost:5000/submit`,

			// for live deployment
			'https://log-gym-counts.herokuapp.com/submit',
			{
			params: {
				location: searchQuery.location,
				start: searchQuery.start,
				end: searchQuery.end
			}
		})
		.then(data => {
			const logList = data.data.logs
			const logsByWeekdays = logsToWeekdayCounts(logList)
			let avgCountsByDay = {}
			Object.keys(info.counts).forEach(key => {
				avgCountsByDay[key] = organizeCountsByHour(logsByWeekdays[key])
				return
				}
			)
			setInfo({counts: avgCountsByDay, max: getLocationMax(searchQuery.location)})
			setLoading(false)
		})
	}, [searchQuery])

	return (
		<div className="App">
			<nav style={{width: "100%", height: "50px", position: "absolute", textAlign: "center", 
			color: "blue", fontWeight: "bold", fontSize: "1.3em", backgroundColor: "rgba(255, 0, 255, 0.5)"}}>
				NOTE: As of 6/16/2022, this page no longer displays accurate information (see more info)
			</nav>
			<div className="content">
				{loading && <p className='loader'>loading...</p>}
				<Graph info = {
						{...info, 
						counts: selectedDay ? info.counts[selectedDay] : []}
					} 
				passSelectedDay = {setSelectedDay}
				/>
				<Form 
					// give Form the ability to manipulate the App's search query
					passSearchQuery={setSearchQuery} />
			</div>
			<Info />
		</div>
	);
}

export default App;