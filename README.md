# 🔍 Fake News Detection Web Application

 

## 📊 Overview

This interactive web application uses machine learning to classify news articles as either "Real" or "Fake" based on their text content. The application utilizes a pre-trained Random Forest model and TF-IDF vectorization to analyze and classify input text, providing users with immediate feedback on the credibility of news content.

## ✨ Features

### 📰 Text Classification
- **Credibility Analysis**: Analyzes news article text to determine if it's likely to be real or fake
- **User-Friendly Interface**: Simple, intuitive interface for inputting news text
- **Real-time Results**: Immediate classification results displayed to the user

### 🧠 Technical Capabilities
- **Natural Language Processing**: Processes text using advanced NLP techniques
- **Machine Learning Classification**: Utilizes Random Forest algorithm for prediction
- **Text Preprocessing**: Removes noise, standardizes format, and focuses on meaningful content

## 🚀 Technical Stack

- **Backend**: Python Flask
- **Machine Learning**: Random Forest classifier
- **Text Processing**: NLTK for text preprocessing, TF-IDF for feature extraction
- **Frontend**: HTML/CSS (rendered through Flask templates)

## 📁 Project Structure

```
fake-news-detector/
│
├── app.py                  # Main Flask application
├── tfidf_vectorizer.pkl    # Pre-trained TF-IDF vectorizer
├── random_forest_model.pkl # Pre-trained Random Forest model
├── templates/              # HTML templates
│   └── index.html          # Main page template
└── README.md               # This file
```

## ⚙️ How It Works

1. The application loads pre-trained TF-IDF vectorizer and Random Forest model
2. User inputs news text through the web interface
3. Text is preprocessed (lowercased, HTML removed, special characters removed, stopwords removed, stemming applied)
4. The processed text is vectorized using TF-IDF
5. The model predicts whether the text represents real or fake news
6. Results are displayed to the user

## 🖥️ Installation and Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fake-news-detector
   ```

2. **Install dependencies**
   ```bash
   pip install flask numpy pandas nltk scikit-learn
   ```

3. **Download required NLTK resources**
   ```python
   import nltk
   nltk.download('stopwords')
   ```

4. **Prepare model files**
   - Make sure you have the trained model and vectorizer files in the project root:
     - `tfidf_vectorizer.pkl`
     - `random_forest_model.pkl`

5. **Launch the application**
   ```bash
   python app.py
   ```

6. **Access the dashboard**
   - Open your web browser and navigate to `http://localhost:5000`
   - The application will load with the input form ready for use

## 🧪 Model Training

The TF-IDF vectorizer and Random Forest model were trained separately using a dataset of labeled news articles. The trained models were saved using Python's pickle module for use in this application.

 

## 🔮 Future Improvements

- Add model confidence scores
- Implement more advanced NLP techniques
- Add explanation for classification decisions
- Deploy the application to a cloud platform
- Add a database to store and analyze user inputs
- Implement user authentication

## 📜 License

MIT Licence

---

 

Developed with ❤️ by Ishan Naikele
