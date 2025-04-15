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

function displayResults(isMajor, remedies) {
  const resultsSection = document.getElementById("results");
  const remedyList = document.getElementById("remedyList");
  remedyList.innerHTML = "";

  if (isMajor) {
    resultsSection.querySelector("h2").textContent = "Major Ailment Detected";
    remedyList.innerHTML = "<li class='text-red-600 font-semibold'>Your symptoms indicate a major ailment. Please see a doctor immediately.</li>";
  } else {
    resultsSection.querySelector("h2").textContent = "Recommended Herbal Remedies";
    if (remedies.length === 0) {
      remedyList.innerHTML = "<li>No remedies found for the selected symptoms or elements.</li>";
    } else {
      remedies.forEach(remedy => {
        const li = document.createElement("li");
        li.textContent = remedy.name;
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
