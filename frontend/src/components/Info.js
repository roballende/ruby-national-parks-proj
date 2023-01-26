import React, { useEffect, useState } from "react"
import StarIcon from "@mui/icons-material/Star"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import mountains from "./images/mountains.png"

function Info({ parkID, selectedPark, parkName, parkActivities }) {
    // SET AVG RATINGS
    const [starRating, setStarRating] = useState("")
    const [parkState, setParkState] = useState("Maine")

    // CAMPING URL
    let campName = parkName.replaceAll(" ", "%20")
    const baseURl = `https://www.recreation.gov/search?q=${campName}`

    // FETCH PARK AVG RATING & CONVERT TO STAR
    useEffect(() => {
        fetch(`http://localhost:9292/parks/${parkID}/average_rating`)
            .then((resp) => resp.json())
            .then((rating) => {
                if (rating === 1) {
                    setStarRating(
                        <div>
                            <StarIcon />
                            <StarBorderIcon />
                            <StarBorderIcon />
                            <StarBorderIcon />
                            <StarBorderIcon />
                        </div>
                    )
                } else if (rating === 2) {
                    setStarRating(
                        <div>
                            <StarIcon />
                            <StarIcon />
                            <StarBorderIcon />
                            <StarBorderIcon />
                            <StarBorderIcon />
                        </div>
                    )
                } else if (rating === 3) {
                    setStarRating(
                        <div>
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarBorderIcon />
                            <StarBorderIcon />
                        </div>
                    )
                } else if (rating === 4) {
                    setStarRating(
                        <div>
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarBorderIcon />
                        </div>
                    )
                } else if (rating === 5) {
                    setStarRating(
                        <div>
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                        </div>
                    )
                } else {
                    setStarRating(
                        <div>
                            <StarBorderIcon />
                            <StarBorderIcon />
                            <StarBorderIcon />
                            <StarBorderIcon />
                            <StarBorderIcon />
                        </div>
                    )
                }
            })
    }, [parkID])

    useEffect(() => {
        fetch(`http://localhost:9292/parks/${parkID}`)
            .then((resp) => resp.json())
            .then((park) => {
                const fullStateName = convertStateCodeToName(park.states)
                setParkState(fullStateName)
            })
    }, [parkID])

    const convertStateCodeToName = (stateCode) => {
        switch (stateCode) {
            case "AL":
                return "Alabama"
            case "AK":
                return "Alaska"
            case "AZ":
                return "Arizona"
            case "AR":
                return "Arkansas"
            case "CA":
                return "California"
            case "CO":
                return "Colorado"
            case "CT":
                return "Connecticut"
            case "DE":
                return "Delaware"
            case "FL":
                return "Florida"
            case "GA":
                return "Georgia"
            case "HI":
                return "Hawaii"
            case "ID":
                return "Idaho"
            case "IL":
                return "Illinois"
            case "IN":
                return "Indiana"
            case "IA":
                return "Iowa"
            case "KS":
                return "Kansas"
            case "KY":
                return "Kentucky"
            case "LA":
                return "Louisiana"
            case "ME":
                return "Maine"
            case "MD":
                return "Maryland"
            case "MA":
                return "Massachusetts"
            case "MI":
                return "Michigan"
            case "MN":
                return "Minnesota"
            case "MS":
                return "Mississippi"
            case "MO":
                return "Missouri"
            case "MT":
                return "Montana"
            case "NE":
                return "Nebraska"
            case "NV":
                return "Nevada"
            case "NH":
                return "New Hampshire"
            case "NJ":
                return "New Jersey"
            case "NM":
                return "New Mexico"
            case "NY":
                return "New York"
            case "NC":
                return "North Carolina"
            case "ND":
                return "North Dakota"
            case "OH":
                return "Ohio"
            case "OK":
                return "Oklahoma"
            case "OR":
                return "Oregon"
            case "PA":
                return "Pennsylvania"
            case "RI":
                return "Rhode Island"
            case "SC":
                return "South Carolina"
            case "SD":
                return "South Dakota"
            case "TN":
                return "Tennessee"
            case "TX":
                return "Texas"
            case "UT":
                return "Utah"
            case "VT":
                return "Vermont"
            case "VA":
                return "Virginia"
            case "WA":
                return "Washington"
            case "WV":
                return "West Virginia"
            case "WI":
                return "Wisconsin"
            case "WY":
                return "Wyoming"
            case "DC":
                return "District of Columbia"
            default:
                return "Invalid state shorthand"
        }
    }

    const activityList = ["Skiing", "Hiking", "Fishing", "Camping", "Hunting", "Horseback Riding", "Biking", "Canoeing", "Kayaking", "RV Camping", "Rock Climbing", "Wildlife Watching", "Bird Watching", "Stargazing", "Whitewater Rafting", "Scenic Driving", "Museum Exhibits", "Guided Tours", "Boat Tours"]

    return (
        <div>
            <div className='level-one'>
                <div className='park-intro'>
                    <h2>{parkState}</h2>
                    <br></br>
                    <h1>{selectedPark.name}</h1>
                    <br></br>
                    <h2>{selectedPark.description}</h2>
                </div>
                <div className='columns'>
                    <div className='column-one'>
                        <h1>PARK INFO</h1>
                        <div className='park-info'>
                            <h4>PARK DIRECTIONS</h4>
                            <div>{selectedPark.directions}</div>
                            <h4>
                                <a href={baseURl} target='_blank'>
                                    Click here for more information on {parkName}
                                </a>
                            </h4>
                            <h4>
                                <a href={baseURl} target='_blank'>
                                    Click here for {parkName} campsite reservations
                                </a>
                            </h4>
                            <h4>AVERAGE PARK RATING</h4>
                            <div className='star'>{starRating}</div>
                            <h4>PARK ALERTS</h4>
                            <a href={selectedPark.hazard_url} target='_blank'>
                                {selectedPark.hazard_title}
                            </a>
                            {selectedPark.hazard_desc}
                            {selectedPark.hazard_date}
                        </div>
                    </div>
                    <div className='column-two'>
                        <h1>PARK ACTIVITIES</h1>
                        <div className='park-activities'>
                            {parkActivities
                                .filter((activity) => activityList.includes(activity))
                                .map((activity) => (
                                    <li>{activity}</li>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <img className='mountains' src={mountains}></img>
        </div>
    )
}

export default Info
