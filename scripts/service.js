// Services functionality
function showDeliveryZones() {
    const section = document.getElementById('delivery-section');
    if (section) {
        section.style.display = 'block';
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function bookConsultation() {
    localStorage.setItem('serviceType', 'consultation');
    window.location.href = 'contact.html?service=consultation';
}

function calculateFleetSavings() {
    const vehicles = parseInt(document.getElementById('fleet-vehicles')?.value || 0);
    const frequency = parseInt(document.getElementById('fleet-frequency')?.value || 0);
    const consumption = parseInt(document.getElementById('fleet-consumption')?.value || 0);
    const currentPrice = parseInt(document.getElementById('fleet-current-price')?.value || 0);
    
    if (!vehicles || !frequency || !consumption || !currentPrice) {
        alert('Please fill in all fields');
        return;
    }
    
    const changesPerYear = 12 / frequency;
    const totalConsumption = vehicles * consumption * changesPerYear;
    const currentCost = totalConsumption * currentPrice;
    const fleetPrice = currentPrice * 0.85;
    const fleetCost = totalConsumption * fleetPrice;
    const savings = currentCost - fleetCost;
    const savingsPercent = Math.round((savings / currentCost) * 100);
    
    document.getElementById('current-cost').textContent = `ETB ${currentCost.toLocaleString()}`;
    document.getElementById('fleet-cost').textContent = `ETB ${fleetCost.toLocaleString()}`;
    document.getElementById('annual-savings').textContent = `ETB ${savings.toLocaleString()}`;
    document.getElementById('savings-percentage').textContent = `${savingsPercent}%`;
    document.getElementById('fleet-results').classList.remove('hidden');
}

function requestFleetQuote() {
    const vehicles = document.getElementById('fleet-vehicles')?.value;
    const frequency = document.getElementById('fleet-frequency')?.value;
    
    if (vehicles && frequency) {
        localStorage.setItem('fleetData', JSON.stringify({ vehicles, frequency, timestamp: Date.now() }));
        window.location.href = 'contact.html?fleet=true';
    }
}

function callEmergency() {
    window.location.href = 'tel:+251911123456';
}

function requestOilAnalysis() {
    localStorage.setItem('serviceType', 'oil-analysis');
    window.location.href = 'contact.html?service=oil-analysis';
}

function inquireTraining() {
    localStorage.setItem('serviceType', 'training');
    window.location.href = 'contact.html?service=training';
}

function requestDelivery() {
    const selectedZone = document.querySelector('.delivery-zone.selected');
    if (selectedZone) {
        localStorage.setItem('deliveryZone', selectedZone.dataset.zone);
        window.location.href = 'contact.html?delivery=true';
    } else {
        alert('Please select a delivery zone');
    }
}