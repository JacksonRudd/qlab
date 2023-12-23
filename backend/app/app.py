from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes and origins
CORS(app)

@app.route('/')
def home():
    return 'Hello, World!'

# Route for 'question' with a 'topic' parameter
@app.route('/question/<topic>')
def question(topic):
    # You can use the 'topic' parameter in your function
    return {'content': f'Question about {topic}'}



# Route for 'answer' using POST method
@app.route('/explanation', methods=['POST'])
def answer():
    # Extract 'question' and 'useranswer' from request body
    data = request.json
    question = data.get('question')
    useranswer = data.get('useranswer')

    # You can now use 'question' and 'useranswer' in your function
    # Logic to determine if the answer is correct
    is_correct = True  # This is just an example, implement your logic here

    return {'is_correct': is_correct, 'explanation': f'You answered {useranswer}, and that is correct for all kinds of reasons to the question {question}.'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
