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
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    padding: 32px;
    max-width: 420px;
    font-family: 'Inter', 'Segoe UI', sans-serif;
    border: 1px solid rgba(255, 255, 255, 0.3);
  ">
    <h2 style="
      margin-top: 0;
      font-size: 24px;
      background: linear-gradient(90deg, #2563eb, #3b82f6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 700;
      margin-bottom: 24px;
    ">
      ✨ Predicting Intention AI
    </h2>

    <div style="margin-bottom: 20px;">
      <label style="display: block; font-weight: 600; margin-bottom: 6px;">💰 Price</label>
      <input type="number" id="intention-price" value="100" style="
        width: 100%; padding: 14px 16px; border-radius: 10px;
        border: 1px solid #d1d5db; font-size: 15px;
        transition: border 0.2s ease;
      " onfocus="this.style.borderColor='#3b82f6';"/>
    </div>

    <div style="margin-bottom: 20px;">
      <label style="display: block; font-weight: 600; margin-bottom: 6px;">⏱️ Session Duration (sec)</label>
      <input type="number" id="intention-session" value="120" style="
        width: 100%; padding: 14px 16px; border-radius: 10px;
        border: 1px solid #d1d5db; font-size: 15px;
        transition: border 0.2s ease;
      " onfocus="this.style.borderColor='#3b82f6';"/>
    </div>

    <div style="margin-bottom: 20px;">
      <label style="display: block; font-weight: 600; margin-bottom: 6px;">📄 Pages Viewed</label>
      <input type="number" id="intention-pages" value="3" style="
        width: 100%; padding: 14px 16px; border-radius: 10px;
        border: 1px solid #d1d5db; font-size: 15px;
        transition: border 0.2s ease;
      " onfocus="this.style.borderColor='#3b82f6';"/>
    </div>

    <div style="margin-bottom: 20px;">
      <label style="display: block; font-weight: 600; margin-bottom: 6px;">🔄 Returning User</label>
      <select id="intention-returning" style="
        width: 100%; padding: 14px 16px; border-radius: 10px;
        border: 1px solid #d1d5db; font-size: 15px;
        transition: border 0.2s ease;
      " onfocus="this.style.borderColor='#3b82f6';">
        <option value="1">Yes</option>
        <option value="0">No</option>
      </select>
    </div>

    <div style="margin-bottom: 24px;">
      <label style="display: block; font-weight: 600; margin-bottom: 6px;">🏷️ Discount Shown</label>
      <select id="intention-discount" style="
        width: 100%; padding: 14px 16px; border-radius: 10px;
        border: 1px solid #d1d5db; font-size: 15px;
        transition: border 0.2s ease;
      " onfocus="this.style.borderColor='#3b82f6';">
        <option value="1">Yes</option>
        <option value="0">No</option>
      </select>
    </div>

    <button id="intention-predict-btn" style="
      width: 100%;
      background: linear-gradient(90deg, #3b82f6, #2563eb);
      color: #ffffff;
      border: none;
      padding: 16px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    "
    onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 15px rgba(59, 130, 246, 0.4)';"
    onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none';"
    >
      🔍 Predict
    </button>

    <div id="intention-result" style="
      margin-top: 24px;
      font-weight: 700;
      font-size: 18px;
      text-align: center;
      color: #111827;
      min-height: 24px;
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
