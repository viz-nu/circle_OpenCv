from flask import Flask, request
import requests
from circleDetector import detect_Circles
from pymongo import MongoClient
import json

app = Flask(__name__)

client = MongoClient('mongodb+srv://viz:viz1@cluster0.05ocl42.mongodb.net/')
db = client.get_database('Ashar')
collection = db.get_collection('CircleParams')


@app.route("/img", methods=['POST'])
def members():
    data = request.json
    image_url = data["source"]
    response = requests.get(image_url)
    with open('image.jpg', 'wb') as f:
        f.write(response.content)
    details = detect_Circles()
    document = {"details":details[0].tolist() }
    result = collection.insert_one(document)
    return {
        "details": str(details),
        "msg": str(result.inserted_id)
        }

if __name__ == "__main__":
    app.run(debug=True)
