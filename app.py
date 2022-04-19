from flask import Flask, send_from_directory, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from log_counts import Log
from dotenv import load_dotenv
import os
import json

load_dotenv()

app = Flask(__name__, static_folder = "workout2little-app/public")
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('REACT_APP_PG_CONNECTION')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
all_logs = Log.query

# test stuff
# t_location = "Marino Center - 3rd Floor Select & Cardio"
# t_start = { "month": 4, "day": 7, "year": 2021 }
# t_end = { "month": 4, "day": 7, "year": 2022 }

# test = list(filter(lambda l : is_valid_log(t_location, t_start, t_end, l), Log.query))
# test2 = Log.query.filter_by(location = "Marino Center - 3rd Floor Select & Cardio").all()
# print(Log.query.all())
# print([t.to_dict() for t in test])
# print([t.to_dict() for t in test2])

def is_valid_log(location, start_dict, end_dict, log: Log) -> bool:
    start_tuple = (start_dict["year"], start_dict["month"], start_dict["day"])
    end_tuple = (end_dict["year"], end_dict["month"], end_dict["day"])
    log_tuple = (log.year, log.month, log.day)

    return (start_tuple <= log_tuple <= end_tuple) and log.location == location

@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, "index.html")

@app.route("/submit")
def submit():
    args = request.args.to_dict()
    # print(args)
    location = args["location"]
    start = json.loads(args["start"])
    end = json.loads(args["end"])
    # filters the query into a list of Log objects that are within 
    # the given date range and from the given location
    logs = list(filter(lambda l : is_valid_log(location, start, end, l), all_logs))
    # for log in logs:
    #     print(log.stringify())
    return {
        "logs": [log.to_dict() for log in logs]
    }