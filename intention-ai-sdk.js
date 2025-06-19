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
        <div style="
          border: 2px solid #007bff;
          border-radius: 8px;
          padding: 20px;
          max-width: 350px;
          font-family: Arial, sans-serif;
          background: #f9f9f9;
        ">
          <h3 style="color:#007bff;">🧠 Intention AI</h3>
          <label style="display:block; margin-top:10px;">💰 Price:
            <input type="number" id="intention-price" value="100" style="width:100%; padding:5px;"/>
          </label>
          <label style="display:block; margin-top:10px;">⏱️ Session Duration (sec):
            <input type="number" id="intention-session" value="120" style="width:100%; padding:5px;"/>
          </label>
          <label style="display:block; margin-top:10px;">📄 Pages Viewed:
            <input type="number" id="intention-pages" value="3" style="width:100%; padding:5px;"/>
          </label>
          <label style="display:block; margin-top:10px;">🔄 Returning User:
            <select id="intention-returning" style="width:100%; padding:5px;">
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>
          <label style="display:block; margin-top:10px;">🏷️ Discount Shown:
            <select id="intention-discount" style="width:100%; padding:5px;">
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>
          <button id="intention-predict-btn" style="
            margin-top: 20px;
            width: 100%;
            background: #007bff;
            color: #fff;
            border: none;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
          ">🔍 Predict</button>
          <div id="intention-result" style="
            margin-top: 15px;
            font-weight: bold;
            min-height: 24px;
            color: #333;
          "></div>
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
      resultDiv.textContent = '⏳ Predicting...';

      try {
        const response = await fetch(this.config.apiUrl + '/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const json = await response.json();
        resultDiv.textContent = `✅ Purchase Probability: ${(json.purchase_probability * 100).toFixed(2)}%`;
      } catch (err) {
        resultDiv.textContent = '❌ Error: ' + err.message;
      }
    }
  };

  global.IntentionAI = IntentionAI;
})(window);
