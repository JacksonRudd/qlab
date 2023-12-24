from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from openai import OpenAI
import os
import json

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
    previous_questions = data.get('previous_questions')

    questions = '\n'.join(['-' + question for question in previous_questions])

    prompt= f'''As a knowledge-testing bot, your task is to formulate questions related to a specified topic: {topic}. You have a list of previously generated questions: \n{questions}\nYour goal is to create an additional question that expands the user's understanding of the topic. Remember, focus solely on the question without any additional greetings or follow-up comments. Also, ensure that the question does not pertain to recent events or timely information, such as the latest coach of a sports team, to avoid issues with outdated data.'''

    print(prompt)
    chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="gpt-3.5-turbo",
        )
    return {'content' :chat_completion.choices[0].message.content}

# Route for 'answer' using POST method
@app.route('/explanation', methods=['POST'])
def answer():
    # Extract 'question' and 'useranswer' from request body
    data = request.json
    question = data.get('question')
    useranswer = data.get('useranswer')

    chat_completion = client.chat.completions.create(
            messages = [
              {
                  "role": "system",
                  "content": """Your job is to grade the student's answers to questions. When you respond, please first reply with either 'CORRECT' or 'INCORRECT' to indicate if the student's answer is correct or incorrect, and then explain why. You should go easy on spelling mistakes and instead test for underlying comprehension. """
              },
              {
                  "role": "user",
                  "content": "QUESTION:\nWho won the World Series in 2020?\nANSWER:\nThe Los Angeles Dodgers"
              },
              {
                  "role": "assistant",
                  "content": "CORRECT\nThe Los Angeles Dodgers won the World Series in 2020. They defeated the Tampa Bay Rays in a six-game series to capture their first World Series championship since 1988."
              },
              {
                  "role": "user",
                  "content": "QUESTION:\nWhat is the capital of France?\nANSWER:\nThe capital of France is Paris."
              },
              {
                  "role": "assistant",
                  "content": "CORRECT\nThe capital of France is indeed Paris. It is known for its iconic landmarks such as the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral."
              },

              {
                  "role": "user",
                  "content": f"QUESTION:\n{question}\nANSWER:{useranswer}"
              },
          ],
            model="gpt-3.5-turbo",
        )
    answer = chat_completion.choices[0].message.content
    is_correct = not ('INCORRECT' in answer)
    explanation = answer.replace('INCORRECT', '').replace("CORRECT", '').lstrip('\n')
    return jsonify({'is_correct': is_correct, 'explanation': explanation})
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
