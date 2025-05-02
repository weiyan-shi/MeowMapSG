# 🐾 MeowMapSG: Mapping Singapore's Stray Cats
Live Demo: https://weiyan-shi.github.io/MeowMapSG/

## Overview
Singapore is home to around 50,000 stray cats. This project creates a lovely and interactive map to visualise the distribution and profiles of these cats, aiming to foster appreciation and care for the small lives that share our environment.

## ✨ Features
📍 Interactive Map focused on Singapore’s five planning regions

🐱 Cat Profiles with photos, names, genders, traits, likes and dislikes

🗂 Hierarchical Navigation from regional overview to individual cats

🌙 Dark Theme reflecting the nocturnal nature of cats

🎯 Custom Cat Icons using real cat photos for visual clarity and emotional engagement

## 🧶 Data Collection
### 📦 Cat Dataset
We scraped data from https://catsofsg.com/map using browser inspection and automated scripts. The dataset includes:

- Cat images

- Metadata (name, sex, personality, region, description, etc.)
All entries are mapped using a unique ID.

### 🗺 Map Dataset
Map boundaries sourced from: https://chi-loong.github.io/IDV/assignments/sgmap.json
Filtered and cleaned to retain valid Singapore regions: Central, North, Northeast, East, West

## 🛠 Tech Stack
- Leaflet.js – Interactive maps

- HTML + CSS + JS – Frontend

- Python – Web scraping (for data preparation)

## 📸 Screenshot
![Map Screenshot](https://weiyan-shi.github.io/MeowMapSG/assets/demo.png)

🙌 Authors
- Weiyan Shi – https://github.com/weiyan-shi

- Shuyi Jiang - https://github.com/Jiangshuyi0V0