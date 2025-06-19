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
          border-radius: 10px;
          padding: 20px;
          max-width: 400px;
          background: #ffffff;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          font-family: Arial, sans-serif;
        ">
          <h3 style="color:#007bff; margin-top:0;">✨ Intention AI</h3>

          <label style="display:block; margin:10px 0;">
            💰 <b>Price:</b><br/>
            <input type="number" id="intention-price" value="100" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:5px;"/>
          </label>

          <label style="display:block; margin:10px 0;">
            ⏱️ <b>Session Duration (sec):</b><br/>
            <input type="number" id="intention-session" value="120" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:5px;"/>
          </label>

          <label style="display:block; margin:10px 0;">
            📄 <b>Pages Viewed:</b><br/>
            <input type="number" id="intention-pages" value="3" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:5px;"/>
          </label>

          <label style="display:block; margin:10px 0;">
            🔄 <b>Returning User:</b><br/>
            <select id="intention-returning" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:5px;">
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>

          <label style="display:block; margin:10px 0;">
            🏷️ <b>Discount Shown:</b><br/>
            <select id="intention-discount" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:5px;">
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>

          <button id="intention-predict-btn" style="
            width: 100%;
            background: #007bff;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 5px;
            margin-top: 20px;
            font-size: 16px;
            cursor: pointer;
          ">🔍 Predict</button>

          <div id="intention-result" style="
            margin-top: 15px;
            font-weight: bold;
            min-height: 24px;
            text-align: center;
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
