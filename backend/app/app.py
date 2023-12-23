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
@app.route('/question/<topic>')
def question(topic):
    prompt = f'''
    You are a bot designed to come up with Questions to test the user's knowledge about this topic: {topic}.
    You have already generated about five questions. Please come up wit another question.
    Please just state the question without any other greetings or follow ups.  
    '''
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
                  "content": "Your job is to grade the student's answers to questions. When you respond, please first reply with either 'CORRECT' or 'INCORRECT' to indicate if the student's answer is correct or incorrect, and then explain why."
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
    is_correct = 'INCORRECT' in answer
    explanation = answer.replace('INCORRECT', '').replace("CORRECT", '').lstrip('\n')
    return jsonify({'is_correct': is_correct, 'explanation': explanation})
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
