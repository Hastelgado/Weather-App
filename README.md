# Weather Forecase Project
## Video Demo:  <URL https://youtu.be/ydJCdN_DmCo>
## Description:
**The project's main feature/goal is to use an Autocomplete search bar to go over 42,000+ city locations by searching the city name or country and then, call an API to display its weather forecast.**

## Files/Languages used:

I decided to use Python's flask framework as the app is relatively small, and I only used HTML/CSS and **pure JS** for the front end to challenge myself in JS, rather than use a DB like SQL. SQL queries may be the way forward for any functional website, especially in flask, but I just wanted to challenge myself in JS.

The files are straight forward.The project folder contains the app.py **python file** and the **CSV file** containing the city locations. The **static** folder contains the images/video used, pure JS script, and CSS sheet. The **templates** folder contains the main **Jinja** layout.html which has 2 pages layered onto it, index.html and weather.html. Along with other folders like the virtual environment etc.

## Features explanation:

I decided to keep the app's features few and precise, as I didn't want any users visiting the page to find a cluster of small features that they probably didn't look for. The page opens up, straight to the point, with a search bar in the middle to start immediately. I chose an autocomplete script to try and **minimalize the amount of steps the user takes** to reach his/her goal.

After choosing the desired location, the user is greeted with a card with the weather information, along with the option to **add up to 5 weather cards**. They may choose to change the temperature between celcius and fahrenheit to their liking with a **toggle** in the upper right corner.

In the weather card, I added the name of the location, the temperature, a description at end, but right before the description, I implemented a small compass arrow that points toward the direction of where the winds are blowing in the selected country, while showing the wind speed as well. Even though it took more time than it was worth to implement such a small feature, I found it valuable as it kept to the simplicity of the page without adding extra unnecessary numbers.

I didn't focus a lot on the front-end of the website as much as the back-end. There were a lot of JS patterns that I had to re-do from scratch if I wanted certain animations to work. It was a good learning experience nonetheless. Trial and error was the essence of learning on this project and I valued that most. Hopefully, my next project's front end will look better and utilize better frameworks, even though I'm mostly aspiring to be a back-end developer first and foremost.

**Overall, the idea was to keep it as straight forward as possible while practicing the features I was most interested in.**