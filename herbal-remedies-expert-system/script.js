const data = {
  symptoms: [
    "Headache",
    "Fatigue",
    "Digestive Issues",
    "Skin Irritation",
    "Cold & Flu",
    "Chest Pain",
    "Severe Headache",
    "Shortness of Breath"
  ],
  minorElements: [
    "Iron Deficiency",
    "Calcium Deficiency",
    "Magnesium Deficiency",
    "Zinc Deficiency",
    "Vitamin D Deficiency"
  ],
  remedies: [
    {
      name: "Ginger Tea",
      forSymptoms: ["Digestive Issues", "Cold & Flu"],
      forElements: ["Magnesium Deficiency"]
    },
    {
      name: "Peppermint Oil",
      forSymptoms: ["Headache", "Digestive Issues"],
      forElements: []
    },
    {
      name: "Chamomile",
      forSymptoms: ["Fatigue", "Skin Irritation"],
      forElements: []
    },
    {
      name: "Nettle Leaf",
      forSymptoms: ["Fatigue"],
      forElements: ["Iron Deficiency"]
    },
    {
      name: "Turmeric",
      forSymptoms: ["Skin Irritation", "Cold & Flu"],
      forElements: ["Zinc Deficiency"]
    },
    {
      name: "Almonds",
      forSymptoms: [],
      forElements: ["Calcium Deficiency", "Magnesium Deficiency"]
    },
    {
      name: "Sunlight Exposure",
      forSymptoms: ["Fatigue"],
      forElements: ["Vitamin D Deficiency"]
    }
  ],
  majorSymptoms: [
    "Chest Pain",
    "Severe Headache",
    "Shortness of Breath"
  ]
};

function populateSelectOptions() {
  const symptomsSelect = document.getElementById("symptoms");
  const elementsSelect = document.getElementById("minorElements");

  data.symptoms.forEach(symptom => {
    const option = document.createElement("option");
    option.value = symptom;
    option.textContent = symptom;
    if (data.majorSymptoms.includes(symptom)) {
      option.classList.add('text-red-600', 'font-semibold');
    }
    symptomsSelect.appendChild(option);
  });

  data.minorElements.forEach(element => {
    const option = document.createElement("option");
    option.value = element;
    option.textContent = element;
    elementsSelect.appendChild(option);
  });
}

function getSelectedOptions(selectElement) {
  return Array.from(selectElement.selectedOptions).map(option => option.value);
}

function findRemedies(selectedSymptoms, selectedElements) {
  return data.remedies.filter(remedy => {
    const symptomMatch = remedy.forSymptoms.some(symptom => selectedSymptoms.includes(symptom));
    const elementMatch = remedy.forElements.some(element => selectedElements.includes(element));
    return symptomMatch || elementMatch;
  });
}

function classifySymptoms(selectedSymptoms) {
  return selectedSymptoms.some(symptom => data.majorSymptoms.includes(symptom));
}

function createRemedyItem(remedy) {
  const li = document.createElement("li");
  li.className = "p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-all duration-300 animate-fade-in flex items-center";
  
  const icon = document.createElement("i");
  icon.className = "fas fa-leaf text-green-600 mr-2";
  li.appendChild(icon);
  
  const text = document.createElement("span");
  text.textContent = remedy.name;
  li.appendChild(text);
  
  return li;
}

function displayResults(isMajor, remedies) {
  const resultsSection = document.getElementById("results");
  const remedyList = document.getElementById("remedyList");
  remedyList.innerHTML = "";

  if (isMajor) {
    resultsSection.querySelector("h2").textContent = "⚠️ Major Ailment Detected";
    resultsSection.querySelector("h2").className = "text-2xl font-bold text-red-600 mb-4 flex items-center animate-pulse-once";
    
    const li = document.createElement("li");
    li.className = "p-4 bg-red-50 rounded-lg border-l-4 border-red-600 animate-slide-up flex items-center";
    
    const icon = document.createElement("i");
    icon.className = "fas fa-exclamation-triangle text-red-600 mr-2";
    li.appendChild(icon);
    
    const text = document.createElement("span");
    text.className = "text-red-600 font-semibold";
    text.textContent = "Your symptoms indicate a major ailment. Please see a doctor immediately.";
    li.appendChild(text);
    
    remedyList.appendChild(li);
  } else {
    resultsSection.querySelector("h2").textContent = "Recommended Herbal Remedies";
    resultsSection.querySelector("h2").className = "text-2xl font-bold text-green-800 mb-4 flex items-center";
    
    if (remedies.length === 0) {
      const li = document.createElement("li");
      li.className = "p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-600 animate-slide-up flex items-center";
      
      const icon = document.createElement("i");
      icon.className = "fas fa-info-circle text-yellow-600 mr-2";
      li.appendChild(icon);
      
      const text = document.createElement("span");
      text.className = "text-yellow-600";
      text.textContent = "No remedies found for the selected symptoms or elements.";
      li.appendChild(text);
      
      remedyList.appendChild(li);
    } else {
      remedies.forEach((remedy, index) => {
        const li = createRemedyItem(remedy);
        li.style.animationDelay = `${index * 0.1}s`;
        remedyList.appendChild(li);
      });
    }
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  const selectedSymptoms = getSelectedOptions(document.getElementById("symptoms"));
  const selectedElements = getSelectedOptions(document.getElementById("minorElements"));

  const isMajor = classifySymptoms(selectedSymptoms);
  if (isMajor) {
    displayResults(true, []);
  } else {
    const remedies = findRemedies(selectedSymptoms, selectedElements);
    displayResults(false, remedies);
  }
}

function init() {
  populateSelectOptions();
  document.getElementById("remedyForm").addEventListener("submit", handleFormSubmit);
}

window.addEventListener("DOMContentLoaded", init);
