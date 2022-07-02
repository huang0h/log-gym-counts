import {useState} from "react"
import gitLogo from "../../src/github_logo.png"

export default function Info(props) {
    const [expand, setExpand] = useState(false);

    return (
        <div className="info">
            <a id="info-link"  onClick={() => setExpand(!expand)} href="#info-link">
                {expand ? "less info" : "more info"}
            </a>
            {expand && 
            <div className="expanded-info">
                <div className="more-info">
                    made by avery huang &#169; 2022 
                    <br /><br />
                    <a href = "https://github.com/huang0h/log-gym-counts">
                        <img id="gh-logo" src = {gitLogo} alt="GitHub's Octocat logo"/>
                    </a>
                    <div style={{color: "red"}}>
                        <br />
                        <h2>
                            THIS PAGE IS NO LONGER ACCURATE!
                        </h2>
                        <br />
                        <p>
                            This app relies on Heroku's Postgres add-on to log counts. On 6/16/2022, it reached
                            the 10,000 entry limit that comes with the add-on's free tier. Because I built this app as
                            a way to learn about web development and not as a tool I or anyone else would use often, I decided
                            to pull the plug on the logging script rather than pay a monthly fee. To keep the app functional,
                            I've basically frozen it in time at 6/16/2022. So, selecting "last week" searches from 
                            6/9/2022 - 6/16/2022, and so on. 
                        </p>
                    </div>
                    <hr />
                </div>
                <h2>Why?</h2>
                <br />
                <p>
                    Northeastern shows the live (well, almost live) counts at their gyms on&nbsp;
                    <a href="https://www.northeastern.edu/campusrec/">the campus recreation page</a>.
                    However, these counts are instantaneous and update sporadically, making it hard to accurately predict
                    how full their facilities will be at any given moment. For busy students with not much free time like me,
                    it really helps to be able to plan when to go and how long it may take 
                    <br />(full gym -> lots of waiting -> lots of wasted time).
                </p>
                <br />
                <h2>How do I use this?</h2>
                <br />
                <p>
                    On the right, you can select where to show data from and from when to show. For example, selecting
                    "Marino Center - Gymnasium" and "Last month" will show the average number of people in Marino's gym
                    over the last month. On the left is the graph of average counts over one day, and you can select
                    from which day to show data from.
                </p>
                <br />
            </div>
            }
        </div>
    )
}