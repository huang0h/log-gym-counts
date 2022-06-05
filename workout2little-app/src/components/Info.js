import {useState} from "react"
import gitLogo from "../../src/github_logo.png"

export default function Info(props) {
    const [expand, setExpand] = useState(false);

    return (
        <div>
            <p className="show-more-info" onClick={() => setExpand(!expand)}>more info</p>
            {expand && 
            <div className="more-info">
                made by avery huang &#169; 2022 
                <br /><br />
                <a href = "https://github.com/huang0h" target = "_blank">
                    <img id = "gh-logo" src = {gitLogo}/>
                </a>
                <h2></h2>
            </div>
            }
        </div>
    )
}