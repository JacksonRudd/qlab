from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from openai import OpenAI
import os
import json

from qlab.business_logic import answer, generate_question

app = Flask(__name__)
# Get the current directory of the script
current_directory = os.path.dirname(os.path.abspath(__file__))

# Construct the path to the config.json file
config_file_path = os.path.join(current_directory, 'secret.json')

# Read the API key from the config.json file
with open(config_file_path, 'r') as config_file:
    config = json.load(config_file)
    client = OpenAI(api_key=config['openai_api_key'])


# Enable CORS for all routes and origins
CORS(app)

@app.route('/')
def home():
    return 'Hello, World!'

# Route for 'question' with a 'topic' parameter

@app.route('/question', methods=['POST'])
def question():
    # Extract data from POST request
    data = request.get_json()
    topic = data.get('topic')
    mode = data.get('mode', 'party')
    previous_questions = data.get('previous_questions')
    question = generate_question(topic, mode, previous_questions, client )
    return {'content' :question}

# Route for 'answer' using POST method
@app.route('/explanation', methods=['POST'])
def explanation():
    # Extract 'question' and 'useranswer' from request body
    data = request.json
    question = data.get('question')
    useranswer = data.get('useranswer')
    ai_answer = ""
    # It should either say 'CORRECT' or 'INCORRECT'
    while "CORRECT" not in ai_answer:
        ai_answer = answer( useranswer, question, client)
    is_correct = not ('INCORRECT' in ai_answer)
    explanation = ai_answer.replace('INCORRECT', '').replace("CORRECT", '').lstrip('\n')
    return jsonify({'is_correct': is_correct, 'explanation': explanation})
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)



