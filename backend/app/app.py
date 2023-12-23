from flask import Flask
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

# Route for 'answer' with an 'answer' parameter
@app.route('/explanation/<useranswer>')
def answer(useranswer):
    # You can use the 'answer' parameter in your function
    return {'is_correct':True , 'explanation': f'You answered {useranswer}, and that it correct for all kinds of reasons. '}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
