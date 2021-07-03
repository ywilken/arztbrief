/*=== Form ===*/
const formGeneral = document.querySelector('[data-form="form--general"]');
const formPsycho = document.querySelector('[data-form="form--psycho"]');
const formNeuroSens = document.querySelector('[data-form="form--neuro-sens"]');
const formPsychoMMST = document.querySelector('[data-form="form--mmst"]');
const formNeuro = document.querySelector('[data-form="form--neuro"]');

/*=== General Parameters ===*/
const inputBirthdate = document.querySelector('[data-input="input--birthdate"]');
const inputWeight = document.querySelector('[data-input="input--weight"]');
const inputHeight = document.querySelector('[data-input="input--height"]');
const inputGender = document.querySelector('[data-input="input--gender"]');
const inputGeneralState = document.querySelector('[data-input="input--generalstate"]');
let genderObj;

/*=== Input Fields ===*/
const inputFieldContainer = [
    {name: inputBirthdate, identifier: '[data-input="input--birthdate"]'},
    {name: inputWeight, identifier: '[data-input="input--weight"]'},
    {name: inputHeight, identifier: '[data-input="input--height"]'},
    {name: inputGender, identifier: '[data-input="input--gender"]'},
    {name: inputGeneralState, identifier: '[data-input="input--generalstate"]'}
];

/*=== Images Overlay ===*/
const imgDermatomesOverlayRad = document.querySelector('[data-img="img--dermatomes-overlay-rad"]');
const imgDermL3R = document.querySelector('[data-img="img--derm-l3-r"]');

/*=== Action Buttons ===*/
const btnSubmitGeneral = document.querySelector('[data-btn="btn--create-document"]');
const btnSubmitPsycho = document.querySelector('[data-btn="btn--create-psycho-section"]');

/*=== Toggle Buttons ===*/
const btnGeneralToggle = document.querySelector('.btn-general-toggle');
const btnPsychoToggle = document.querySelector('.btn-psycho-toggle');
const btnNeuroToggle = document.querySelector('.btn-neuro-toggle');
const btnNeuroSens = document.querySelector('[data-btn="btn--neuro-sens-toggle"]');
const btnPsychoMMST = document.querySelector('[data-btn="btn--mmst-toggle"]');
const btnPsychoMMSTOn = document.querySelector('[data-btn="btn--mmst-on"]');

/*=== Overlay Buttons ===*/
const btnDermatomesOverlayRad = document.querySelector('[data-btn="btn--dermatomes-overlay-rad"]');

/*=== Area Fields ===*/
const areaDermL3R = document.querySelector('[data-area="area--derm-l3-r"]');

/*=== Classification Variables ===*/
let finalMMST;

/*=== Classification ===*/
const classificationMMST = [
    {title: 'Zeitliche Orientierung', instruction: 'Welcher Tag ist heute?', 
    items: [['Datum', 1], ['Jahreszeit', 1], ['Jahr', 1], ['Monat', 1], ['Wochentag', 1]]},
    {title: 'Räumliche Orientierung', instruction: 'Wo sind wir gerade?', 
    items: [['Aktueller Ort', 1], ['Name der Einrichtung', 1], ['Stockwerk/Station', 1], ['Stadt', 1], ['Stadtteil/Bundesland', 1]]},
    {title: 'Merkfähigkeit', instruction: 'Folgende Begriffe nennen und zur Wiederholung auffordern.', 
    items: [['Apfel', 1], ['Cent', 1], ['Tisch', 1]]},
    {title: 'Aufmerksamkeit und Rechnen', instruction: 'Jeweils 7 von 100 abziehen. Alternativ "STUHL" rückwärts buchstabieren.', 
    items: [[`93 / "L"`, 1], [`86 / "H"`, 1], [`79 / "U"`, 1], [`72 / "T"`, 1], [`65 / "S"`, 1]]},
    {title: 'Erinnern', instruction: 'Was waren die Dinge, die Sie sich vorhin gemerkt haben?', 
    items: [['Apfel', 1], ['Cent', 1], ['Tisch', 1]]},
    {title: 'Benennen', instruction: 'Folgende Gegenstände zeigen. Was ist das?', 
    items: [['Uhr', 1], ['Bleistift/Kugelschreiber', 1]]},
    {title: 'Wiederholen', instruction: 'Folgenden Satz nachsprechen lassen. (Nur 1 Versuch erlaubt)', 
    items: [['Kein wenn und oder aber', 1]]},
    {title: 'Dreiteiliger Befehl', instruction: 'Nehmen Sie das Blatt Papier, falten es in der Mitte und lassen es auf den Boden fallen.', 
    items: [['Nehmen Sie das Blatt Papier,', 1], ['falten es in der Mitte', 1], ['und lassen es auf den Boden fallen.', 1]]},
    {title: 'Reagieren', instruction: 'Die Testperson soll den Satz: „Schließen Sie die Augen“ lesen und befolgen.', 
    items: [['Die Testperson schließt die Augen', 1]]},
    {title: 'Schreiben', instruction: 'Die Testperson soll einen beliebigen Satz mit Subjekt und Prädikat aufschreiben.', 
    items: [['Sinnhafter Satz', 1]]},
    {title: 'Abzeichnen', instruction: 'Die Testperson soll die folgende Zeichnung abzeichnen.', 
    items: [['Zwei sich an einer Ecke überlappende Fünfecke', 1]]},
];

const arrayClassifications = [
    {name: 'MMST', array: classificationMMST, direction: formPsychoMMST, grading: [
        {max: 30, min: 28, definition: 'Gemäß MMST-Testkriterien handelt es sich um einen Normalbefund (keine Demenz).'},
        {max: 27, min: 25, definition: 'Gemäß MMST-Testkriterien handelt es sich um eine leichte kognitive Beeinträchtigung.'},
        {max: 24, min: 18, definition: 'Gemäß MMST-Testkriterien handelt es sich um eine leichte Demenz.'},
        {max: 17, min: 10, definition: 'Gemäß MMST-Testkriterien handelt es sich um eine mittelschwere Demenz.'},
        {max: 9, min: 0, definition: 'Gemäß MMST-Testkriterien handelt es sich um eine schwere Demenz.'}
    ]}
];

btnPsychoMMSTOn.addEventListener('click', decideOnClassification);

function decideOnClassification(e) {
    let selectedClassification;
    let selectedDirection;
    let classificationName;

    if(e.target.checked){
        arrayClassifications.forEach(item => {
            if(e.target.value === item.name) {
                selectedClassification = item.array;
                selectedDirection = item.direction;
                classificationName = item.name;
            }
        });

        createClassification(selectedClassification, selectedDirection, classificationName);
    } else {
        arrayClassifications.forEach(item => {
            if(e.target.value === item.name) {
                selectedDirection = item.direction;
            }
        });

        deleteClassification(selectedDirection)
    }
}

function createClassification(dataArray, direction, name) {
    let classificationItemCount = 1;
    dataArray.forEach( item => {
        /* Create the title for the segment*/
        if(item.title !== '' || item.instruction !== '') {
            const pageElementContainer_Title = document.createElement('div');
            const pageElement_Title = document.createElement('p');
            pageElement_Title.classList.add('form__selection');
            pageElement_Title.classList.add('form__selection--add-elements');
            pageElement_Title.innerHTML = `${item.title ? '<b>' + item.title + ':</b> ' : ''}${item.instruction}`;
            pageElementContainer_Title.appendChild(pageElement_Title);
            direction.appendChild(pageElementContainer_Title);
        }
        /* Create the options*/
        pageElementContainer_Options = document.createElement('div');
        pageElementContainer_Options.classList.add('item-container-5');
        /* Create the single options*/
        item.items.forEach( item => {
            const pageElementSubcontainer_Option = document.createElement('div');
            pageElementSubcontainer_Option.classList.add('item-subcontainer');
            pageElementSubcontainer_Option.innerHTML = `<p class="item-label">${classificationItemCount}.)</p><label><input data-input="input--${name}-${classificationItemCount}" type="checkbox" name="cl-${name}" value="${item[1]}" checked>${item[0]}</label>`;
            pageElementContainer_Options.appendChild(pageElementSubcontainer_Option);
            classificationItemCount++;
        })
        direction.appendChild(pageElementContainer_Options);
    })
}

function deleteClassification(direction) {
    direction.innerHTML = '';
}

/* Add Highlight Effects to Input Fields */
addHighlightEffect();

function addHighlightEffect() {
    inputFieldContainer.forEach(item => {
        addHighlightEventListener(item.name);
    })
}

function addHighlightEventListener(inputField){
    inputField.addEventListener('change', highlightInputField);
}

function highlightInputField(e) {
    if (e.target.value !=="") {
        e.target.classList.add('html-gen-input-filled');
    } else {
        e.target.classList.remove('html-gen-input-filled');
    }
};

/*=== Toggle Edit Window ===*/
createToggleEvents();

function createToggleEvents() {
    addToogleEvent(btnGeneralToggle, formGeneral);
    addToogleEvent(btnPsychoToggle, formPsycho);
    addToogleEvent(btnNeuroSens, formNeuroSens);
    addToogleEvent(btnPsychoMMST, formPsychoMMST);
    addToogleEvent(btnNeuroToggle, formNeuro);
    addToggleOverlay(btnDermatomesOverlayRad, imgDermatomesOverlayRad);
    addToggleOverlay(areaDermL3R, imgDermL3R);
};

function addToogleEvent(btnToggle, formToggle){
    btnToggle.addEventListener('click', (e) => {
        e.preventDefault();
        formToggle.classList.toggle('hidden-html-gen');
    });
};

/* Add Overlay to Images */
function addToggleOverlay(btnToggle, imgOverlay){
    btnToggle.addEventListener('click', (e) => {
        e.preventDefault();
        imgOverlay.classList.toggle('hidden-html-gen');
    });
};

/*=== HTML Code ===*/
const letterGeneral = document.querySelector('.letter-general');

/*==================
EVENT LISTENERS
==================*/
btnSubmitGeneral.addEventListener('click', prepareGeneralSection);
btnSubmitPsycho.addEventListener('click', preparePsychoSection);


/*=== PREPARATION ===*/
function startGeneralSection(e){
    e.preventDefault();
    prepareGeneralSection();
}

function prepareGeneralSection(e){
    e.preventDefault();
    prepareGender();
    const patBMI = calculateBMI();
    const patAge = calculateAge();
    const patGender = inputGender.value;
    const patAZ = deriveGeneralState();
    const patEZ = deriveNutritionalState(patBMI);
    createGeneralSection(patAge, patBMI, patGender, patAZ, patEZ);
}

function preparePsychoSection(e){
    e.preventDefault();
    prepareGender();
    createPsychoSection();
}

function prepareGender(){
    if(inputGender.value === 'male') {
        genderObj = {blankTermNom: 'Patient', termNom: 'der Patient', termDat: 'dem Patienten', termAkk: 'den Patienten', adjAgeNom: '-jähriger '}
    } else if(inputGender.value === 'female') {
        genderObj = {blankTermNom: 'Patientin', termNom: 'die Patientin', termDat: 'der Patientin', termAkk: 'die Patientin', adjAgeNom: '-jährige '}
    }
}

function capitalizeName(name){
    return (name.charAt(0).toUpperCase() + name.slice(1));
}


/*=== Create Element ===*/
function calculateBMI(){
    const heightToMeters = inputHeight.value / 100;
    const heightExponent = Math.pow (heightToMeters, 2)
    const calculateBMI = inputWeight.value / heightExponent;
    const roundBMI = Math.round(calculateBMI * 10) / 10;
    return roundBMI;
}

function calculateAge(){
    const today = new Date(); // Date of today
    const birthDate = inputBirthdate.value; // Patient birthdate as string
    const birthYear = birthDate.substr(0,4); // Patient birthyear from string
    const birthMonth = birthDate.substr(5,2); // Patient birthmonth from string
    const birthDay = birthDate.substr(8,2); // Patient birthday from string
    let difYears = today.getFullYear() - parseInt(birthYear, 10); // Year difference
    const difMonths = (today.getMonth() + 1) - parseInt(birthMonth, 10); // Month difference
    const difDays = today.getUTCDate() - parseInt(birthDay, 10); // Day difference
    if (difMonths < 0 || (difMonths === 0 && difDays > 0)) {
        difYears--;
    };
    return difYears;
}

function deriveGeneralState(){
    switch(inputGeneralState.value){
        case 'good':
            return 'in gutem AZ';
        case 'reduced':
            return 'in leicht reduziertem AZ';
        case 'poor':
            return 'in stark reduziertem AZ';
    }
}

function deriveNutritionalState(BMI){
    console.log(BMI);
    if(BMI === Infinity){
        return '';
    }
    switch(true){
        case BMI<=18.4 && BMI!==0:
            return 'und reduziertem EZ';
        case BMI>=18.5 && BMI<=24.9:
            return 'und normosomem EZ';
        case BMI>=25 && BMI<=29.9:
            return 'und präadipösem EZ';
        case BMI>=30 && BMI!==Infinity:
            return 'und adipösem EZ';
        case BMI===0 || BMI===Infinity:
            return '';
        default:
            return '';
    }
}

function createGeneralSection(Age, BMI, gender, AZ, EZ){
    /* Calculations & Data */
     const patGenderAndAge = (inputBirthdate.value !== '') ? Age+genderObj.adjAgeNom : '';
    const patGeneralData = (EZ !== '') ? `(BMI: ${BMI}kg/m<sup>2</sup>, ${inputHeight.value}cm, ${inputWeight.value}kg)` : '';
    /*Final content*/
    const innerElement = "Allgemeinbefund: ";
    const pageElementContent = `${innerElement.bold()} ${patGenderAndAge} ${genderObj.blankTermNom} ${AZ} ${EZ} ${patGeneralData}.`;
    createLetterElement(letterGeneral, pageElementContent);
}

function createPsychoSection() {
    /* MMST */
    let resultMMST;
    if (btnPsychoMMSTOn.checked === true) {
        const allCheckboxes = document.getElementsByName('cl-MMST');

        let resultArray;
        resultArray = getClassificationScore(allCheckboxes); // This function returns two variables: The current score & the total score.
        let resultScore = resultArray[0];
        let resultTotal = resultArray[1];

        let resultExplanation;
        resultExplanation = getClassificationResult('MMST', resultScore);

        resultMMST = `${capitalizeName(genderObj.termNom)} hat einen MMST-Score von ${resultScore}/${resultTotal}. ${resultExplanation}`
    } else {
        resultMMST = '';
    }
    
    /*Final content*/
    const innerElement = "Psychischer Befund: ";
    const innerElement_Content = `${resultMMST}`
    if(innerElement_Content === '') {
        console.log ('EMPTY')
    }
    const pageElementContent = `${innerElement.bold()} ${innerElement_Content}`;
    createLetterElement(letterGeneral, pageElementContent);
}

function getClassificationScore(allCheckboxes) {
    let result = 0;
    let count = 0;
    allCheckboxes.forEach(item => {
        count++;
        if(item.checked === true) {
            result = result + parseInt(item.value);
        }       
    })
    
    return [result, count];
}

function getClassificationResult(name, result) {
    let classificationGrading;
    let classificationDefinition;

    arrayClassifications.forEach(item => {
        if(name === item.name) {
            classificationGrading = item.grading;
        }
    });

    classificationGrading.forEach(item => {
        if(result <= item.max && result >= item.min) {
            classificationDefinition = item.definition;
        }
    })

    return classificationDefinition;
}


function createLetterElement(blockDirection, pageElementContent) {
    pageSection = document.createElement('section'); // This creates an html tag
    blockDirection.appendChild(pageSection); // This adds the section to our page
    const pageElement = document.createElement('p'); // This creates a paragraph
    pageElement.classList.add('text'); // This adds styling to the paragraph
    pageElement.innerHTML = pageElementContent; // This fills our paragraph with content
    pageSection.appendChild(pageElement); // This adds the paragraph to the section we created above
}
