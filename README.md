# 🚔 Crime Watch: Real-Time Crime Reporting System

Welcome to *Crime Watch*, a full-stack web application designed for real-time crime reporting and visualization. This platform enables users to report crimes, view reports on an interactive map, and stay informed about crime patterns in their area.

![Crime Watch](3599743.jpg)

## 📋 Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Features

- *User Authentication and Authorization* 🔒
  - Secure user registration and login
  - OAuth integration (Google, Facebook)
  - Different access levels: citizens, police, admin

- *Real-Time Crime Reporting* 🕵‍♀
  - Report submission with details and optional media
  - Geolocation for accurate reporting
  - Anonymous reporting option

- *Interactive Map* 🗺
  - Real-time, interactive map showing crime reports
  - Clustering of nearby crime reports
  - Heatmaps showing crime intensity

- *Search and Filter* 🔍
  - Search by location, type of crime, date, etc.
  - Filter reports based on categories

## 🚀 Installation

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running

### Backend Setup

1. *Clone the repository*:
   ```sh
   git clone https://github.com/yourusername/odooCrimeMap.git
   cd crime-watch
