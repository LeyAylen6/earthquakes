# Eathquakes

## 📌 About this proyect

This project was created with:
- __Front End__: React, Css
- __Back End__: Ruby, Ruby on Rails
- __Database__: SQLite, ActiveRecord (ORM)

### 📌 How to start this page ?

📍 You can run:

- In Server folder:
  - `rails server` 

- In Client folder:
  - `npm install` 
  - `npm run dev` 

<!-- Open [http://localhost:5173](http://localhost:5173) to view it in your browser. -->

## 📌 Sections of this project

### ⚡️Home:
- You can see all the earthquakes, a statistic for the total number of earthquakes found and a multiple filter for the mag_type feature
- If you tap a card, you will be redirected to the earthquake details.
  - Endpoint used on this page: example: /api/features?page=1&mag_type=mb,md,ml&per_page=1
<div align="center"> 
<!--     <img align="center" src='./assets/login.gif'></img> -->
</div>

### ⚡️Detail:
- You will be able to see the details of the previously selected earthquake and the comments related to it. Additionally, you can create new comments..
  - Endpoints used on this page: 
    - POST /api/features/:id/comments
    - 💣 Endpoint extra: GET /api/features/:id/comments
<div align="center"> 
<!--     <img align="center" src='./assets/home.gif'></img> -->
</div>

### ⚡️About:
- This section will have information about me and the project technologies. Will be developed soon.
<div align="center"> 
<!--     <img align="center" src='./assets/about.gif'></img> -->
</div>
