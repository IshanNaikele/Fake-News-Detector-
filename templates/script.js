document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const newsForm = document.getElementById('news-form');
    const newsTextarea = document.getElementById('news-text');
    const detectButton = document.getElementById('detect-button');
    const resultContainer = document.getElementById('result-container');
    const predictionDisplay = document.getElementById('prediction-display');
    const explanationText = document.getElementById('explanation-text');
    const currentYearElement = document.getElementById('current-year');

    // Set current year in footer
    currentYearElement.textContent = new Date().getFullYear();

    // Form submission handler
    newsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        analyzeText();
    });

    // Function to analyze the news text
    function analyzeText() {
        const newsText = newsTextarea.value.trim();
        
        // Validate input
        if (!newsText) {
            showToast('Please enter some text to analyze', 'error');
            newsTextarea.focus();
            return;
        }
        
        // Show loading state
        setLoadingState(true);
        
        // Prepare form data
        const formData = new FormData(newsForm);
        
        // Send to Flask backend
        fetch('/', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            // Create a temporary DOM to parse the response
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Extract prediction from the response
            const newPrediction = doc.querySelector('#prediction-display');
            const newExplanation = doc.querySelector('#explanation-text');
            
            if (newPrediction && newExplanation) {
                predictionDisplay.innerHTML = newPrediction.innerHTML;
                explanationText.textContent = newExplanation.textContent;
                
                // Apply appropriate class based on prediction
                const predictionText = newPrediction.textContent.toLowerCase();
                if (predictionText.includes('real')) {
                    predictionDisplay.className = 'prediction-real';
                } else if (predictionText.includes('fake')) {
                    predictionDisplay.className = 'prediction-fake';
                } else {
                    predictionDisplay.className = 'prediction-uncertain';
                }
                
                // Show results with animation
                showResults();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('An error occurred during analysis', 'error');
            // Fallback to mock result if API fails
            mockAnalysisResult(newsText);
        })
        .finally(() => {
            setLoadingState(false);
        });
    }

    // Function to display results with animation
    function showResults() {
        resultContainer.classList.remove('hidden');
        setTimeout(() => {
            resultContainer.classList.add('visible');
            // Scroll to results if they're not fully visible
            resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 10);
    }

    // Mock analysis function (fallback)
    function mockAnalysisResult(text) {
        // Simple mock analysis for demonstration
        const isLikelyReal = text.length > 300 && 
                            (text.includes('according to') || 
                             text.includes('research') || 
                             text.includes('study'));
        
        const prediction = isLikelyReal ? "Real News" : "Fake News";
        const explanation = isLikelyReal 
            ? "This content appears credible based on length and terminology." 
            : "This content shows characteristics of potentially unreliable information.";
        
        predictionDisplay.innerHTML = `
            <div class="prediction-title">${prediction}</div>
            <div class="prediction-score">${isLikelyReal ? 'High' : 'Low'} Confidence</div>
        `;
        explanationText.textContent = explanation;
        predictionDisplay.className = isLikelyReal ? 'prediction-real' : 'prediction-fake';
        
        showResults();
        showToast('Using mock analysis (backend not responding)', 'warning');
    }

    // Loading state management
    function setLoadingState(isLoading) {
        if (isLoading) {
            detectButton.classList.add('loading');
            detectButton.disabled = true;
            newsTextarea.disabled = true;
        } else {
            detectButton.classList.remove('loading');
            detectButton.disabled = false;
            newsTextarea.disabled = false;
        }
    }

    // Toast notification system
    function showToast(message, type = 'info') {
        // Create toast container if it doesn't exist
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Add toast to container
        toastContainer.appendChild(toast);
        
        // Show toast with animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Remove toast after delay
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // Auto-resize textarea as user types
    newsTextarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
});