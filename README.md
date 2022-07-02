# log-gym-counts

<b>UPDATE: THIS PAGE IS NO LONGER ACCURATE</b>

This app relies on Heroku's Postgres add-on to log counts. On 6/16/2022, it reached the 10,000 entry limit that comes with the add-on's free tier. Because I built this app as a way to learn about web development and not as a tool I or anyone else would use often, I decided to pull the plug on the logging script rather than pay a monthly fee. To keep the app functional, I've basically frozen it in time at 6/16/2022. So, selecting "last week" searches from 6/9/2022 - 6/16/2022, and so on.

This project will most likely no longer be maintained, but I may rebuild it
from scratch in the future. I've learned a lot about web dev since I first built this app, and now I see a lot of things I should have done differently.
<hr />
This is a simple web app using React and Flask to keep track of how many people are in Northeastern's gyms over time.
Data is pulled from https://connect2concepts.com/connect2/?type=circle&key=2A2BE0D8-DF10-4A48-BEDD-B3BC0CD628E7 (available from Northeastern's campus recreation site).
<br /><br />
App is available at https://log-gym-counts.herokuapp.com/
