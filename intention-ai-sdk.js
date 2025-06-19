(function(global) {
  const IntentionAI = {
    config: {
      apiUrl: '',
      target: '',
    },

    init(userConfig) {
      this.config = { ...this.config, ...userConfig };
      this.renderWidget();
    },

    renderWidget() {
      const container = document.querySelector(this.config.target);
      if (!container) {
        console.error('intention-ai: Target container not found');
        return;
      }

      container.innerHTML = `
        <div style="border:1px solid #ccc; padding:10px; max-width:320px; font-family:sans-serif;">
          <h4>Intention AI Prediction</h4>
          <label>Price: <input type="number" id="intention-price" value="100" /></label><br/>
          <label>Session Duration (sec): <input type="number" id="intention-session" value="120" /></label><br/>
          <label>Pages Viewed: <input type="number" id="intention-pages" value="3" /></label><br/>
          <label>Returning User: 
            <select id="intention-returning">
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label><br/>
          <label>Discount Shown: 
            <select id="intention-discount">
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label><br/>
          <button id="intention-predict-btn" style="margin-top:10px;">Predict</button>
          <div id="intention-result" style="margin-top:10px; font-weight:bold;"></div>
        </div>
      `;

      const btn = container.querySelector('#intention-predict-btn');
      btn.addEventListener('click', () => this.makePrediction());
    },

    async makePrediction() {
      const data = {
        price: Number(document.querySelector('#intention-price').value),
        session_duration: Number(document.querySelector('#intention-session').value),
        pages_viewed: Number(document.querySelector('#intention-pages').value),
        returning_user: Number(document.querySelector('#intention-returning').value),
        discount_shown: Number(document.querySelector('#intention-discount').value),
      };

      const resultDiv = document.querySelector('#intention-result');
      resultDiv.textContent = 'Predicting...';

      try {
        const response = await fetch(this.config.apiUrl + '/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const json = await response.json();
        resultDiv.textContent = `Purchase Probability: ${(json.purchase_probability * 100).toFixed(2)}%`;
      } catch (err) {
        resultDiv.textContent = 'Error: ' + err.message;
      }
    }
  };

  global.IntentionAI = IntentionAI;
})(window);
