# Tafsiri

Tafsiri (Transformational AI For SQL Inferences and Reporting Integration) is a web application that simplifies database queries using natural language processing. It allows users to transform their questions into precise SQL queries and run them on Apache Superset.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Natural Language Processing**: Convert questions into SQL queries effortlessly with advanced NLP integration.
- **Data Dictionary Powered**: Leverage data dictionaries for contextual accuracy when querying large databases.
- **Query Transparency**: Get both the SQL query and results, ensuring full transparency for users.
- **Superset Integration**: Run and visualize queries on Apache Superset.

## Installation

### Prerequisites

- Node.js (v14 or later)
- Docker and Docker Compose

### Steps

1. Clone the repository:
    ```sh
    git clone https://github.com/NewtonMutugi/tafsiri.git
    cd tafsiri
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Build and run the application using Docker Compose:
    ```sh
    docker-compose up --build -d
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. Start the application:
    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

3. Follow the on-screen instructions to add database configurations and run queries.

## Configuration

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_SUPERSET_URL=http://localhost:8088
REACT_APP_SUPERSET_USERNAME=your_superset_username
REACT_APP_SUPERSET_PASSWORD=your_superset_password
