#  Plant Care Tracker

A full-stack application to track and manage the care of plants. Users can create accounts, add plants with images, log watering events, and view all related information through a simple and interactive UI. Built using Flask for the backend and React for the frontend.

---

## Contributed by:
- [Faith Wanjiku](https://github.com/wanjiku8): Frontend and Styling 
- [Habiba Guyo](https://github.com/Ladyhabz1): Frontend and README.md
- [Amanda Odawa](https://github.com/amanda-odawa): Backend and Testing

##  Features

-  Create, Read, Update, Delete (CRUD) functionality for plants
-  Create and view users
-  Add and view watering logs for each plant
-  Upload and display images for plants
-  Like/unlike plants to manage a personalized collection
-  View plant details and watering history

---

##  Tech Stack

- **Backend**: Python, Flask, Flask-RESTful, SQLAlchemy, SQLite
- **Frontend**: React, Vite, Axios, React Router, Formik, Yup
- **Other**: Flask-CORS, UUID for image names

---

## Installation
1. Fork and clone the repository, then navigate to it:
   ```sh
   git clone https://github.com/amanda-odawa/plant-tracker
   cd project-name
   ```
2. Backend Setup:
   ```sh
   cd Backend
    python -m venv venv
    source venv/bin/activate      # (On Windows: venv\Scripts\activate)
    pip install -r requirements.txt
    ```
3. Run the App:
   ```sh
   python app.py
   ```
The backend will be live at http://localhost:5000
4. Frontend Setup
    ```sh
    cd ../Frontend
    npm install
    npm run dev
    ```
The frontend will be live at http://localhost:5173


## API Endpoints
| Method    | Endpoint                | Description                 |
|-----------|-------------------------|-----------------------------|
| GET       | `/users`                | Get all users               |
| POST      | `/users`                | Create a new user           |  
| GET       | `/plants`               | Get all plants              |
| POST      | `/plants`               | Create a new plant          |
| GET       | `/plants/<id>`          | Get a specific plant        |
| PUT       | `/plants/<id>`          | Update plant info           |
| DELETE    | `/plants/<id>`          | Delete a plant              |
| GET       | `/wateringlogs`         | Get all watering logs       |
| POST      | `/wateringlogs`         | Create new watering log     |

## Website Navigation
- **Home Dashboard**: View all plants in the system
- **Add Plant**: Create new plant
- **Add User Page**: Create new user
- **Watering Log Page**: Create nw log and view logs

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.
1. Fork the repository
2. Create a new branch 
    ```sh
    git checkout -b Your-Feature-Name
    ```
3. Make your changes
4. Commit changes 
    ```sh
    git commit -m 'Added new feature'
    ```
5. Push to GitHub 
    ```sh
    git push origin Your-Feature-Name
    ```
6. Submit a pull request

## License
This project is licensed under the MIT License.#  Plant Care Tracker

A full-stack application to track and manage the care of plants. Users can create accounts, add plants with images, log watering events, and view all related information through a simple and interactive UI. Built using Flask for the backend and React for the frontend.

---

##  Features

-  Create, Read, Update, Delete (CRUD) functionality for plants
-  Create and view users
-  Add and view watering logs for each plant
-  Upload and display images for plants
-  Like/unlike plants to manage a personalized collection
-  View plant details and watering history

---

##  Tech Stack

- **Backend**: Python, Flask, Flask-RESTful, SQLAlchemy, SQLite
- **Frontend**: React, Vite, Axios, React Router, Formik, Yup
- **Other**: Flask-CORS, UUID for image names

---

## Installation
1. Fork and clone the repository, then navigate to it:
   ```sh
   git clone https://github.com/Ladyhabz1/plant-care-tracker/blob/main/README.md
   cd project-name
   ```
2. Backend Setup:
   ```sh
   cd Backend
    python -m venv env
    source env/bin/activate      # (On Windows: env\Scripts\activate)
    pip install -r requirements.txt
    ```
3. Run the App:
   ```sh
   python app.py
   ```
The backend will be live at http://localhost:5000
4. Frontend Setup
    ```sh
    cd ../Frontend
    npm install
    npm run dev
    ```
The frontend will be live at http://localhost:5173


## API Endpoints
| Method    | Endpoint                | Description                 |
|-----------|-------------------------|-----------------------------|
| GET       | `/users`                | Get all users               |
| POST      | `/users`                | Create a new user           |  
| GET       | `/plants`               | Get all plants              |
| POST      | `/plants`               | Create a new plant          |
| GET       | `/plants/<id>`          | Get a specific plant        |
| PUT       | `/plants/<id>`          | Update plant info           |
| DELETE    | `/plants/<id>`          | Delete a plant              |
| GET       | `/wateringlogs`         | Get all watering logs       |
| POST      | `/wateringlogs`         | Create new watering log     |

## Website Navigation
- **Home Dashboard (/plants)**: View all plants in the system
- **Add Plant**: RCreate new plant
- **Add User Page**: Create new user

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.
1. Fork the repository
2. Create a new branch 
    ```sh
    git checkout -b Your-Feature-Name
    ```
3. Make your changes
4. Commit changes 
    ```sh
    git commit -m 'Added new feature'
    ```
5. Push to GitHub 
    ```sh
    git push origin Your-Feature-Name
    ```
6. Submit a pull request

## License
This project is licensed under the MIT License.
