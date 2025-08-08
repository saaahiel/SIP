// script.js — shared helpers & chart creation
// SIP math: monthly contribution P, n months, monthly rate r = annual/12
function sipFutureValue(P, years, annualReturn){
  const r = annualReturn/100/12;
  const months = Math.max(0, Math.round(years*12));
  if(months === 0) return 0;
  // FV = P * [ ( (1+r)^n - 1 ) / r ] * (1 + r)^0  (monthly deposit at period end)
  // we will compute exact series monthly
  let bal = 0;
  for(let i=0;i<months;i++){
    bal = (bal + P) * (1 + r);
  }
  return bal;
}

function sipSeries(P, years, annualReturn){
  const r = annualReturn/100/12;
  const months = Math.round(years*12);
  const arr = [];
  let bal = 0;
  for(let m=0;m<=months;m++){
    if(m>0) bal = (bal + P) * (1 + r);
    // push yearly points only (every 12 months) including 0
    if(m % 12 === 0) arr.push(Math.round(bal));
  }
  return arr;
}

function fmtINR(n){
  if(!isFinite(n)) return '—';
  if(n >= 10000000) return '₹' + (n/10000000).toFixed(2) + ' Cr';
  if(n >= 100000) return '₹' + (n/100000).toFixed(2) + ' Lakh';
  if(n >= 1000) return '₹' + (n/1000).toFixed(0) + 'k';
  return '₹' + n;
}

function numberWithCommas(x){
  if(!isFinite(x)) return x;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Chart pixel ratio friendly
function makeChart(ctx, cfg){
  // destroy existing if present
  if(ctx.__chart) ctx.__chart.destroy();
  ctx.__chart = new Chart(ctx, cfg);
  return ctx.__chart;
}

// Bind WA button with config in config.js
function bindWhatsApp(buttonEl){
  try{
    const link = `https://wa.me/${window.KAP_CONFIG.WA_PHONE}?text=${encodeURIComponent(window.KAP_CONFIG.WA_MESSAGE)}`;
    buttonEl.href = link;
  }catch(e){
    // fallback
    buttonEl.href = "https://wa.me/";
  }
}
