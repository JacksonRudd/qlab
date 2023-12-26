


def to_bullet_points(some_list):
    return '\n'.join(['  - ' + item for item in some_list])



def generate_question(topic, mode, previous_questions, client):
    scholar_mode = (mode == 'scholar')
    
    prompt_start= f'''As a {'knowledge-testing bot' if scholar_mode else 'party quiz bot'}, your task is to formulate questions related to a specified topic: {topic}.''' 
    
    if len(previous_questions) > 0:
        prompt_start = prompt_start + f''' You have a list of previously generated questions: \n{to_bullet_points(previous_questions)}\n'''
    
    prompt_start = prompt_start + f''' Your goal is to create an additional question that {"expands the user's understanding of the topic" if scholar_mode else f'entertain the group while testing thier knowledge of {topic}' }. '''
    
    things_to_remember = [
        'Remember, focus solely on the question without any additional greetings or follow-up comments.',
        'Ensure that the question does not pertain to recent events or timely information, such as the latest coach of a sports team, to avoid issues with outdated data.',
        'Try to be creative and cover a large range of content.'
    ]

    if mode == 'party':
        things_to_remember.append('Generate questions that require short answers since this is a party! The questions should all be answerable in a sentance. :)')
    
    prompt = prompt_start + f'\nPlease remember:\n{to_bullet_points(things_to_remember)}'
    print('-'*30)
    print(prompt)

    chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="gpt-4-1106-preview",
        )
    return chat_completion.choices[0].message.content



def answer(useranswer, question, client):
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
              }
    ]
    chat_completion = client.chat.completions.create(
          messages= messages,
            model="gpt-4-1106-preview",
        )
    
    return chat_completion.choices[0].message.content