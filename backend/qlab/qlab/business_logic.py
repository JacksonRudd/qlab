def answer(useranswer, question, client):
    
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
    return chat_completion.choices[0].message.content