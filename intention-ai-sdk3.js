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
    border-radius: 12px;
    padding: 24px;
    max-width: 400px;
    background: #ffffff;
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    font-family: 'Roboto', Arial, sans-serif;
    border: 1px solid #e0e0e0;
  ">
    <h3 style="
      color: #111827;
      margin-top: 0;
      font-weight: 600;
      font-size: 20px;
    ">
      ✨ Intention AI Predictor
    </h3>

    <div style="margin: 16px 0;">
      <label style="font-weight: 500; display: block; margin-bottom: 4px;">💰 Price</label>
      <input type="number" id="intention-price" value="100" style="
        width: 100%; padding: 10px; border: 1px solid #ccc;
        border-radius: 8px; font-size: 14px;
      "/>
    </div>

    <div style="margin: 16px 0;">
      <label style="font-weight: 500; display: block; margin-bottom: 4px;">⏱️ Session Duration (sec)</label>
      <input type="number" id="intention-session" value="120" style="
        width: 100%; padding: 10px; border: 1px solid #ccc;
        border-radius: 8px; font-size: 14px;
      "/>
    </div>

    <div style="margin: 16px 0;">
      <label style="font-weight: 500; display: block; margin-bottom: 4px;">📄 Pages Viewed</label>
      <input type="number" id="intention-pages" value="3" style="
        width: 100%; padding: 10px; border: 1px solid #ccc;
        border-radius: 8px; font-size: 14px;
      "/>
    </div>

    <div style="margin: 16px 0;">
      <label style="font-weight: 500; display: block; margin-bottom: 4px;">🔄 Returning User</label>
      <select id="intention-returning" style="
        width: 100%; padding: 10px; border: 1px solid #ccc;
        border-radius: 8px; font-size: 14px;
      ">
        <option value="1">Yes</option>
        <option value="0">No</option>
      </select>
    </div>

    <div style="margin: 16px 0;">
      <label style="font-weight: 500; display: block; margin-bottom: 4px;">🏷️ Discount Shown</label>
      <select id="intention-discount" style="
        width: 100%; padding: 10px; border: 1px solid #ccc;
        border-radius: 8px; font-size: 14px;
      ">
        <option value="1">Yes</option>
        <option value="0">No</option>
      </select>
    </div>

    <button id="intention-predict-btn" style="
      width: 100%;
      background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
      color: white;
      border: none;
      padding: 14px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
    ">
      🔍 Predict
    </button>

    <div id="intention-result" style="
      margin-top: 20px;
      font-weight: 600;
      min-height: 24px;
      text-align: center;
      color: #111827;
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
