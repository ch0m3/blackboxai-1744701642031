// Dataset of symptoms, minor elements, and corresponding herbal remedies
const data = {
  symptoms: [
    "Headache",
    "Fatigue",
    "Digestive Issues",
    "Skin Irritation",
    "Cold & Flu"
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
  ]
};

// Populate select options
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

// Get selected options from a multi-select
function getSelectedOptions(selectElement) {
  return Array.from(selectElement.selectedOptions).map(option => option.value);
}

// Find remedies matching selected symptoms or elements
function findRemedies(selectedSymptoms, selectedElements) {
  return data.remedies.filter(remedy => {
    const symptomMatch = remedy.forSymptoms.some(symptom => selectedSymptoms.includes(symptom));
    const elementMatch = remedy.forElements.some(element => selectedElements.includes(element));
    return symptomMatch || elementMatch;
  });
}

// Display remedies in the UI
function displayRemedies(remedies) {
  const remedyList = document.getElementById("remedyList");
  remedyList.innerHTML = "";

  if (remedies.length === 0) {
    remedyList.innerHTML = "<li>No remedies found for the selected symptoms or elements.</li>";
    return;
  }

  remedies.forEach(remedy => {
    const li = document.createElement("li");
    li.textContent = remedy.name;
    remedyList.appendChild(li);
  });
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const selectedSymptoms = getSelectedOptions(document.getElementById("symptoms"));
  const selectedElements = getSelectedOptions(document.getElementById("minorElements"));

  const remedies = findRemedies(selectedSymptoms, selectedElements);
  displayRemedies(remedies);
}

// Initialize app
function init() {
  populateSelectOptions();
  document.getElementById("remedyForm").addEventListener("submit", handleFormSubmit);
}

window.addEventListener("DOMContentLoaded", init);
