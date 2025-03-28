import pickle
from flask import Flask, render_template, request
import numpy as np

app = Flask(__name__)

# Load the TF-IDF Vectorizer and Random Forest Model
with open('tfidf_vectorizer.pkl', 'rb') as vectorizer_file:
    tfidf_vectorizer = pickle.load(vectorizer_file)

with open('random_forest_model.pkl', 'rb') as model_file:
    random_forest_model = pickle.load(model_file)

@app.route('/', methods=['GET', 'POST'])
def home():
    prediction = None
    input_text = ''
    
    if request.method == 'POST':
        input_text = request.form['news_text']
        
        # Vectorize the input text
        vectorized_input = tfidf_vectorizer.transform([input_text])
        
        # Make prediction
        prediction = random_forest_model.predict(vectorized_input)[0]
        
        # Convert prediction to human-readable format
        prediction_text = "Real News" if prediction == 1 else "Fake News"
        
        return render_template('index.html', 
                               prediction=prediction_text, 
                               input_text=input_text)
    
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)