# 🌎 Eathquakes

## 📌 About this proyect

This project was created with:
- __Front End__: React, Css
- __Back End__: Ruby, Ruby on Rails
- __Database__: SQLite, ActiveRecord (ORM)

### 📌 How to start this page ?

📍 You can run:

- Back End: 
  - This project runs a "Task" to extract all the earthquakes from the API [earthquake.usgs.gov](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson)
  To obtain all the earthquakes in our API, the command `rake bulk_insert:features` must be executed in api folder
  If the result is successful, the console will say "Bulk executed successfully."
  - Then run `rails server` to initialize the server.

Front End
In Client folder execute the commands: 
  - `npm install` 
  - `npm run dev`

When the project is initialized, you can view it at
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 📌 Sections of this project

### ⚡️Home:
- You can see all the earthquakes, a statistic for the total number of earthquakes found and a multiple filter for the mag_type feature
- If you tap a card, you will be redirected to the earthquake details.
  - Endpoint used on this page:
    - GET /api/features?page=1&mag_type=mb,md,ml&per_page=1
<div align="center"> 
    <img align="center" src='./client/src./assets/projectsViews/home.jpeg'></img>
</div>

### ⚡️Detail:
- You will be able to see the details of the previously selected earthquake and the comments related to it. Additionally, you can create new comments..
  - Endpoints used on this page: 
    - POST /api/features/:id/comments
    - 💣 Endpoint extra: GET /api/features/:id/comments
<div align="center"> 
    <img align="center" src='./client/src/assets/projectsViews/detail.jpeg'></img>
</div>

### ⚡️About:
- This section will have information about me and the project technologies. Will be developed soon.
<div align="center"> 
    <img align="center" src='./client/src/assets/projectsViews/about.jpeg'></img>
</div>
