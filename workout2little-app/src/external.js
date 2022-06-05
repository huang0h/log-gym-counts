import React from "react"

// is the given entry numeric and is a valid date (e.g. no months of 100)?
export function validDate(date, field) {
    // check if date is a number
    if (!(!isNaN(date) && !isNaN(parseFloat(date)))) {
        return false
    } else {
        switch (field) {
            case "month":
                return 1 <= date && date <= 12
            case "day":
                return 1 <= date && date <= 31
            case "year":
                return 0 < date
        }
    }
}

export function getLocationMax(loc) {
    switch (loc) {
        case "Marino Center - 2nd Floor":
            return 105
        case "Marino Center - Gymnasium":
            return 60
        case "Marino Center - 3rd Floor Weight Room":
            return 65
        case "Marino Center - 3rd Floor Select & Cardio":
            return 90
        case "Marino Center - Track":
            return 20
        case "SquashBusters - 4th Floor":
            return 60
        default:
            return 100
    }
}

export const locationsArr = [
    {
        id: 0,
        value: "Marino Center - 2nd Floor",
        isSelected: false
    },
    {
        id: 1,
        value: "Marino Center - Gymnasium",
        isSelected: false
    },
    {
        id: 2,
        value: "Marino Center - 3rd Floor Weight Room",
        isSelected: false
    },
    {
        id: 3,
        value: "Marino Center - 3rd Floor Select & Cardio",
        isSelected: false
    },
    {
        id: 4,
        value: "Marino Center - Track",
        isSelected: false
    },
    {
        id: 5,
        value: "SquashBusters - 4th Floor",
        isSelected: false
    }
]

export const timesArr = [
    {
        id: 0,
        value: "Last week",
        isSelected: false
    },
    {
        id: 1,
        value: "Last month",
        isSelected: false
    },
    {
        id: 2,
        value: "Last year",
        isSelected: false
    },
    {
        id: 3,
        value: "All time",
        isSelected: false
    }
]

export const hours = [
    // 19 total
    "5 AM",
    "6 AM",
    "7 AM",
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 AM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
    "10 PM",
    "11 PM",
]

export const daysArr = [
    {
        // default day
        id: 0,
        value: "Monday",
        isSelected: false
    },
    {
        id: 1,
        value: "Tuesday",
        isSelected: false
    },
    {
        id: 2,
        value: "Wednesday",
        isSelected: false
    },
    {
        id: 3,
        value: "Thursday",
        isSelected: false
    },
    {
        id: 4,
        value: "Friday",
        isSelected: false
    },
    {
        id: 5,
        value: "Saturday",
        isSelected: false
    },
    {
        id: 6,
        value: "Sunday",
        isSelected: false
    },
]