import urllib.request as ul
from bs4 import BeautifulSoup as soup
#import pandas as pd

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

load_dotenv()

names = []
dates = []
counts = []
logs = []

# config the sql database, connection etc.
ENV = 'dev'
app = Flask(__name__)

if ENV == 'dev':
    app.debug = True
    #app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{os.environ["PG_LOGIN"]}@localhost/marino-counts'
    #app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL').replace("://", "ql://", 1)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('REACT_APP_PG_CONNECTION')
else:
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = ''

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# class for a database table
class Log(db.Model):
    __tablename__ = 'logs'
    id = db.Column(db.Integer, primary_key = True)
    location = db.Column(db.String(100))
    month = db.Column(db.Integer)
    day = db.Column(db.Integer)
    year = db.Column(db.Integer)
    hour = db.Column(db.Integer)
    minute = db.Column(db.Integer)
    count = db.Column(db.Integer)
    hash = db.Column(db.String(300))

    def __init__(self, date_dict, location, count):
        self.location = location
        self.month = date_dict["month"]
        self.day = date_dict["day"]
        self.year = date_dict["year"]
        self.hour = date_dict["hour"]
        self.minute = date_dict["minute"]
        self.count = count
        self.hash = f"{date_dict}|{location}|{count}"

    def to_dict(self):
        return {
            "location": self.location,
            "month": self.month,
            "day": self.day,
            "year": self.year,
            "hour": self.hour,
            "minute": self.minute,
            "count": self.count,
        }

    def stringify(self):
        return f"------Count #{self.id}------\nLocation: {self.location}\nMonth: {self.month}\nDay: {self.day}\nHour: {self.hour}\nCount: {self.count}"

def hour_to_military(hour, meridiem):
    if meridiem.upper() == "PM":
        return 12 if hour == 12 else hour + 12
    else: # in the AM
        return 0 if hour == 12 else hour

# returns a dictionary of the date broken into its components
def parse_dates(date):
    date_arr = date.split()
    calendars = date_arr[1].split("/")
    month, day, year = map(int, calendars)
    hour, minute = map(int, date_arr[2].split(":"))
    hour = hour_to_military(hour, date_arr[-1])
    return {
        "month": month,
        "day": day,
        "year": year,
        "hour": hour,
        "minute": minute
    }

# scrape data from tracker website, parse into arrays
def read_counts():
    url = "https://connect2concepts.com/connect2/?type=circle&key=2A2BE0D8-DF10-4A48-BEDD-B3BC0CD628E7"
    req = ul.Request(url, headers={"User-Agent": "Mozilla/94.0.1"})
    client = ul.urlopen(req)
    htmldata = client.read()
    client.close()

    pagesoup = soup(htmldata, "html.parser")
    items = pagesoup.findAll('div', {'style': "text-align:center;"})

    names = [loc.contents[0] for loc in items]

    dates = [parse_dates(loc.contents[-1]) for loc in items]

    countstrings = [loc.contents[4] for loc in items]
    counts = [str.split()[2] for str in countstrings]
    #logs = [f"logs/{loc}.csv" for loc in names]

    #log_counts(dates, counts)

    return names, dates, counts

    # print(names)
    # print(dates)
    # print(counts)
    # print(logs)

def log_one_count(date_dict, location, count):
    print(f"Adding count {count} at {location} on {date_dict}")
    # check if the database does not already contain an entry for the same exact date
    if not db.session.query(db.exists().where(Log.hash == f"{date_dict}|{location}|{count}")).scalar():
        data = Log(date_dict, location, count)
        db.session.add(data)
        db.session.commit()
        print("  ...added!")
    else: 
        print("  ...count already exists!")



if __name__ == '__main__':
    names, dates, counts = read_counts()
    #print(names, dates, counts)
    for (date, name, count) in zip(dates, names, counts):
        log_one_count(date, name, count)
    app.debug = True
    # prevent the script from running an app and never actually termination
    # this way scheduler can run this periodically
    app.run()


'''
# -------- DEPRECATED -------- write the counts 
def write_counts(logs):
    for i in range(len(logs)):
        log = logs[i]
        date = dates[i][9:]
        f = open(log, "a", encoding="utf-8")
        sheet = pd.read_csv(log).to_numpy()
        if not date == sheet[-1][0]:
            f.write(f"{date}, {counts[i]}\n")
        #f.write(header)
        f.close()
'''