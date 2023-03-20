import csv
import requests

from flask import Flask, render_template, request, jsonify
from flask_session import Sessionsubmit


app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
#db = SQL("sqlite:///weather.db")

# Make sure API key is set
#if not os.environ.get("API_KEY"):
#    raise RuntimeError("API_KEY not set")

@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response




@app.route("/")
def home():
    return render_template("index.html")


@app.route("/search")
def search():
    q = (request.args.get("q")).lower()
    cities = {}
    jsonfile = []

    if len(q)>2:
        with open("./worldcitiesnew.csv", "r") as file:
            reader = csv.DictReader(file)
            for row in reader:
                #if q in row["city"]:
                if row["citycountry"].startswith(q) or row["country"].startswith(q):
                    cities["city"]=row["city"].capitalize()
                    cities["country"]=row["country"].capitalize()
                    jsonfile.append(cities)
                    cities = {}
                    if len(jsonfile)>9:
                        return jsonify(jsonfile)
    else:
        cities = {}

    return jsonify(jsonfile)


@app.route("/weather")
def weather():
    q = request.args.get("location")
    apiurl = "http://api.openweathermap.org/data/2.5/weather?q={location}&APPID=0a6c0c3a789f0420150ff8c189058127".format(location=q)
    response = requests.get(apiurl)
    datadict = response.json()

    lon = datadict["coord"]["lon"]
    lat = datadict["coord"]["lat"]
    main = datadict["weather"][0]["main"]
    description = datadict["weather"][0]["description"]
    icon = datadict["weather"][0]["icon"]
    temp = datadict["main"]["temp"]
    pressure = datadict["main"]["pressure"]
    humidity = datadict["main"]["humidity"]
    speed = datadict["wind"]["speed"]
    deg = datadict["wind"]["deg"]
    country = datadict["sys"]["country"]
    name = datadict["name"]

    countrylower = str(country).lower()
    countryupper = str(country).upper()
    c = temp-273.15
    f = (c*(9/5))+32

    celcius = "{:.2f}".format(c)
    fahrenheit = "{:.2f}".format(f)

    if (deg>=348.76 and deg<=360) or (deg<=11.25 and deg>=0):
        direction = "N"
    elif deg>=11.26 and deg<=33.75:
        direction = "NNE"
    elif deg>=33.76 and deg<=56.25:
        direction = "NE"
    elif deg>=56.26 and deg<=78.75:
        direction = "ENE"
    elif deg>=78.76 and deg<=101.25:
        direction = "E"
    elif deg>=101.26 and deg<=123.75:
        direction = "ESE"
    elif deg>=123.76 and deg<=146.25:
        direction = "SE"
    elif deg>=146.25 and deg<=168.75:
        direction = "SSE"
    elif deg>=168.76 and deg<=191.25:
        direction = "S"
    elif deg>=191.26 and deg<=213.75:
        direction = "SSW"
    elif deg>=213.76 and deg<=236.25:
        direction = "SW"
    elif deg>=236.26 and deg<=258.75:
        direction = "WSW"
    elif deg>=258.76 and deg<=281.25:
        direction = "W"
    elif deg>=281.26 and deg<=303.75:
        direction = "WNW"
    elif deg>=303.76 and deg<=326.25:
        direction = "NW"
    elif deg>=326.26 and deg<=348.75:
        direction = "NNW"

    #deghtml = '<i style="transform: rotate({degree}deg);" class="fa-solid fa-location-arrow rotation"></i>'.format(degree=deg)

    return render_template("weather.html", lon=lon, lat=lat, main=main, description=description, icon=icon, kelvin=temp, celcius=celcius, fahrenheit=fahrenheit,
     pressure=pressure, humidity=humidity, speed=speed, deg=deg, countrylower=countrylower, countryupper=countryupper, name=name, direction=direction)



@app.route("/adddiv")
def adddiv():
    q = request.args.get("q")
    #qq = str(q).replace('%20', '')
    apiurl = "http://api.openweathermap.org/data/2.5/weather?q={q}&APPID=0a6c0c3a789f0420150ff8c189058127".format(q=q)
    response = requests.get(apiurl)
    datadict = response.json()
    return jsonify(datadict)
