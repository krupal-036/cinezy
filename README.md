# Cinezy 🎬

Cinezy is a sleek, modern web application for discovering movies and TV series. It provides comprehensive details like plot summaries, cast, ratings, and more, all wrapped in a dynamic and interactive user interface. Powered by a Flask backend and the OMDB API, Cinezy offers an immersive experience with its animated starfield background and asynchronous search.

---
## ↗️ View the Live Demo: [cinezy.vercel.app](https://cinezy.vercel.app/)

<table align="center" cellspacing="0" cellpadding="0" style="border: none; border-collapse: collapse;">
  <tr>
    <td style="border: none; padding: 0;">
      <img src="https://github.com/user-attachments/assets/bd66c979-f9af-460d-aafc-d5615d945f8c" alt="Screenshot 1" style="width: 100%; display: block; margin: 0; padding: 0; border: none;">
    </td>
  </tr>
  <tr>
    <td style="border: none; padding: 0;">
      <img src="https://github.com/user-attachments/assets/facf47cd-1c14-4a76-95be-9fecdd18ba0d" alt="Screenshot 2" style="width: 100%; display: block; margin: 0; padding: 0; border: none;">
    </td>
  </tr>
  <tr>
    <td style="border: none; padding: 0;">
      <img src="https://github.com/user-attachments/assets/49f9e7b6-13ea-4a4f-ae78-01afe25f169d" alt="Screenshot 3" style="width: 100%; display: block; margin: 0; padding: 0; border: none;">
    </td>
  </tr>
  <tr>
    <td style="border: none; padding: 0;">
      <img src="https://github.com/user-attachments/assets/4d87d988-ecf4-456b-8caf-4876412932b5" alt="Screenshot 4" style="width: 100%; display: block; margin: 0; padding: 0; border: none;">
    </td>
  </tr>
  <tr>
    <td style="border: none; padding: 0;">
      <img src="https://github.com/user-attachments/assets/852c0db4-4df1-482b-8532-f01bbeddaa55" alt="Screenshot 5" style="width: 100%; display: block; margin: 0; padding: 0; border: none;">
    </td>
  </tr>
</table>

## ✨ Features

- **Interactive Starfield Background:** A beautiful, animated starfield created with p5.js that reacts to mouse movement and syncs with the current theme.
- **AJAX-Powered Search in a Modal:** Search results are fetched and displayed in a clean modal overlay, providing a seamless single-page-app feel.
- **Curated Trending Section:** Discover new films with a "Trending Picks" section on the homepage, complete with a refresh button for a new set of movies.
- **Debounced Live Search Suggestions:** Get instant and relevant movie suggestions as you type (after 2 characters) to speed up your search.
- **Comprehensive Movie Details:** Access plot, cast, director, ratings (IMDb, Metacritic, etc.), awards, box office, and more.
- **Dark/Light Theme:** Toggle between themes for comfortable viewing. Your preference is saved in local storage.
- **Fully Responsive Design:** A polished and consistent experience across desktops, tablets, and mobile devices.
- **Robust Backend:**
  - Built with Python and Flask.
  - Features smart API key rotation to handle request limits gracefully.
  - Optimized for deployment on platforms like Vercel.

## 🛠️ Technologies Used

- **Backend:** Python, Flask
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Animation:** p5.js
- **API:** [OMDB API](http://www.omdbapi.com/)
- **Styling:** Font Awesome (for icons)
- **Deployment:** Vercel

## 📁 Folder Structure

```

cinezy/
├── app.py                  # Flask backend logic (main entry point)
├── static/
│ ├── css/
│ │     └── style.css       # All styles for the application
│ └── js/
│       ├── app.js          # Main application logic (API calls, DOM manipulation)
│       └── p5-sketch.js    # p5.js animation script
├── templates/
│       └── index.html      # Main HTML file rendered by Flask
├── build.sh                # Build script for Vercel
├── .gitignore              # Git Ignore file
├── requirements.txt        # Python dependencies
├── vercel.json             # Vercel deployment configuration
├── LICENCE                 # MIT LICENCE
└── README.md               # Project documentation (this file)

```

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Python 3.7+
- pip (Python package installer)
- Git

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/krupal-036/cinezy.git
    cd cinezy
    ```

2.  **Create and activate a virtual environment:**

    - On macOS and Linux:
      ```bash
      python3 -m venv venv
      source venv/bin/activate
      ```
    - On Windows:
      ```bash
      python -m venv venv
      .\venv\Scripts\activate
      ```

3.  **Install the dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up Environment Variables (API Keys):**

    - You'll need at least one API key from the [OMDB API](http://www.omdbapi.com/apikey.aspx). The free key provides 1,000 daily requests.
    - Create a file named `.env` in the root directory.
    - Add your OMDB API key(s) to the `.env` file. You can add multiple keys, and the app will rotate them.
      ```env
      OMDB_API_KEY_1=YOUR_FIRST_API_KEY
      OMDB_API_KEY_2=YOUR_SECOND_API_KEY
      # Add more keys if you have them (OMDB_API_KEY_3, etc.)
      ```

5.  **Run the Flask application:**
    ```bash
    flask run
    ```
    Or, if `flask run` doesn't work or you want more control (like enabling debug mode via code):
    ```bash
    python app.py
    ```
    The application will typically be available at `http://127.0.0.1:5000/`.

## 📜 License

This project is licensed under the **MIT License** — feel free to use and modify it.

## 👨‍💻 Author

Developed with ❤️ by [Krupal Fataniya](https://github.com/krupal-036).

Feel free to contribute or fork the project!

For any issues or questions, feel free to ask [Krupal](mailto:krupalfataniya007@gmail.com). 😊
