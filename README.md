"Dad jokes" are the best. This sample app helps you tell lots of them.

What you'll need to do (instructions for Mac only):

- Clone this repo
- Create GCP project and enable the Google sign-in method
- Create Cloud SQL database instance (PostgreSQL)
- Install Cloud SQL Proxy
- Install psql (PostgreSQL command line tool)
- Run cloud_sql_proxy pointing at your DB instance
    - `cloud_sql_proxy -dir=/cloudsql -instances=project:location:instance`
- Connect to database
    - `psql -h /cloudsql/project:location:instance -U <username>`
- Run createDatabase.sql and insertJokes.sql scripts
- In the api directory:
    - Run `python3 -m venv venv`
    - Run `source venv/bin/activate`
    - Run `pip install -r requirements.txt`
    - Run `export FLASK_APP=main`
    - Recommended: run `export FLASK_DEBUG=1`
- In the ui directory:
    - Run `npm install`
- Search the code for `TODO`. There are five things you need to change once you have your GCP project set up:
    - In config-prod.py, update DB_PASSWORD
    - In config/__init__.py, update your database instance
    - In Firebase.jsx, add your Firebase config
    - In List.jsx, update the URL with your project
    - In Post.jsx, update the URL with your project
