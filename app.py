from flask import Flask, render_template, request, jsonify
import requests
import os
import logging
from dotenv import load_dotenv
import random

load_dotenv()

app = Flask(__name__)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

OMDB_API_URL = "http://www.omdbapi.com/"
REQUEST_TIMEOUT_SECONDS = 10
SUGGESTION_TIMEOUT_SECONDS = 5

api_keys = []
i = 1
while True:
    key = os.getenv(f"OMDB_API_KEY_{i}")
    if key:
        api_keys.append(key)
        i += 1
    else:
        break

if not api_keys:
    logging.error("CRITICAL: No OMDB API keys (OMDB_API_KEY_n) found in environment variables.")


TRENDING_IMDB_IDS = [
        "tt0111161",
        "tt0068646",
        "tt0468569",
        "tt0071562",
        "tt0050083",
        "tt0108052",
        "tt0167260",
        "tt0060196",
        "tt0120737",
        "tt0109830",
        "tt1375666",
        "tt0167261",
        "tt0080684",
        "tt0133093",
        "tt0099685",
        "tt0073486",
        "tt0047478",
        "tt0038650",
        "tt0102926",
        "tt0076759",
        "tt0118799",
        "tt0120815",
        "tt0816692",
        "tt0245429",
        "tt0120689",
        "tt6751668",
        "tt0103064",
        "tt0253474",
        "tt0110413",
        "tt0110357",
        "tt0172495",
        "tt0407887",
        "tt0482571",
        "tt2582802",
        "tt0034583",
        "tt1675434",
        "tt0095765",
        "tt0910970",
        "tt0088763",
        "tt0209144",
        "tt0032553",
        "tt0405094",
        "tt4154756",
        "tt7286456",
        "tt4633694",
        "tt0114709",
        "tt4154796",
        "tt1345836",
        "tt0082971",
        "tt0081505",
        "tt0892769",
        "tt8267604",
        "tt0903747",
        "tt1475582",
        "tt0386676",
        "tt0417299",
        "tt2861424",
        "tt0086190",
        "tt2380307",
        "tt5311514",
        "tt10872600",
        "tt15398776",
        "tt1517268",
        "tt10648342",
        "tt0107290",
        "tt0266543",
        "tt0145487",
        "tt2096673",
        "tt2278388",
        "tt0372784",
        "tt0054215",
        "tt0053125",
        "tt0208092",
        "tt0120735",
        "tt0112573",
        "tt0090605",
        "tt0162222",
        "tt0093058",
        "tt1877830",
        "tt0119488",
        "tt1954470",
        "tt0043014",
        "tt0363163",
        "tt1049413"

]

def fetch_from_omdb_api(params_without_apikey, timeout_seconds):
    if not api_keys:
        return None, "No OMDB API keys are configured in the application."

    last_operational_error = "All API key attempts failed or keys reached their limit/were invalid."
    shuffled_keys = random.sample(api_keys, len(api_keys))

    for api_key in shuffled_keys:
        params = {**params_without_apikey, "apikey": api_key}
        try:
            response = requests.get(OMDB_API_URL, params=params, timeout=timeout_seconds)
            response.raise_for_status()
            data = response.json()

            if data.get("Response") == "True":
                return data, None

            omdb_error_msg = data.get("Error", "Unknown error from OMDB API.")
            if "request limit reached" in omdb_error_msg.lower() or "invalid api key" in omdb_error_msg.lower():
                logging.warning(f"API key failed: {omdb_error_msg}. Trying next key.")
                last_operational_error = omdb_error_msg
                continue
            else:
                return None, omdb_error_msg

        except requests.exceptions.RequestException as e:
            logging.warning(f"Request failed: {e}. Trying next key.")
            last_operational_error = f"Network request to OMDB API failed: {e}."
            continue
        except ValueError:
            logging.warning("Invalid JSON response from OMDB API. Trying next key.")
            last_operational_error = "Invalid response format from OMDB API."
            continue

    return None, last_operational_error


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        title_query = request.form.get("title", "").strip()
        if not title_query:
            return jsonify({"Response": "False", "Error": "Please enter a movie or series title."}), 400

        search_params = {"t": title_query, "plot": "full"}
        api_response, conn_error = fetch_from_omdb_api(search_params, REQUEST_TIMEOUT_SECONDS)

        if conn_error:
            return jsonify({"Response": "False", "Error": conn_error}), 500
        
        return jsonify(api_response)

    return render_template("index.html")

@app.route("/movie/<imdb_id>", methods=["GET"])
def get_movie_details(imdb_id):
    if not imdb_id:
        return jsonify({"Response": "False", "Error": "IMDb ID is required."}), 400

    params = {"i": imdb_id, "plot": "full"}
    api_response, conn_error = fetch_from_omdb_api(params, REQUEST_TIMEOUT_SECONDS)

    if conn_error:
        return jsonify({"Response": "False", "Error": conn_error}), 500
    
    return jsonify(api_response)

@app.route("/trending", methods=["GET"])
def trending():
    selected_ids = random.sample(TRENDING_IMDB_IDS, min(10, len(TRENDING_IMDB_IDS)))
    trending_movies_data = []

    for imdb_id in selected_ids:
        params = {"i": imdb_id, "plot": "short"}
        data, error = fetch_from_omdb_api(params, REQUEST_TIMEOUT_SECONDS)
        if data and not error:
            trending_movies_data.append(data)
        else:
            logging.warning(f"Could not fetch trending movie {imdb_id}: {error}")
    
    return jsonify(trending_movies_data)

@app.route("/suggest", methods=["GET"])
def suggest():
    query = request.args.get("query", "").strip()
    if not query or len(query) < 2:
        return jsonify({"suggestions": []})

    search_params = {"s": query}
    api_response, conn_error = fetch_from_omdb_api(search_params, SUGGESTION_TIMEOUT_SECONDS)

    suggestions_list = []
    if not conn_error and api_response.get("Response") == "True" and "Search" in api_response:
        for item in api_response["Search"][:5]:
            suggestions_list.append({"title": item.get("Title"), "year": item.get("Year")})
    
    return jsonify({"suggestions": suggestions_list})

if __name__ == "__main__":
    app.run(debug=True)