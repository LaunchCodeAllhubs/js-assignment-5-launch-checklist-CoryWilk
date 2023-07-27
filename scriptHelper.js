// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   let missionTarget = document.getElementById("missionTarget");
   missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
                `
   
}

function validateInput(testInput) {
   if(testInput === ""){
    return "Empty";
   }else if(isNaN(testInput) === true){
    return "Not a Number";
   }else if(isNaN(testInput) === false){
    return "Is a Number";
   };
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let faultyItems = document.getElementById("fautlyItems");
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let launchStatus = document.getElementById("launchStatus");
    let cargoStatus = document.getElementById("cargoStatus");

    if (validateInput(pilot) == "Empty" || validateInput(copilot) == "Empty" || validateInput(fuelLevel) == "Empty" || validateInput(cargoLevel) == "Empty") {
        window.alert("All fields are required");
    }else if(validateInput(fuelLevel) == "Not a Number" || validateInput(cargoLevel) == "Not a Number"){
        window.alert("Enter A Number For Fuel Level and Cargo Mass");
    }else if (validateInput(pilot) == "Is a Number" || validateInput(copilot) == "Is a Number"){
        window.alert("Do Not Enter Numbers For Pilot Or Copilot Names");
    }else {
        pilotStatus.innerHTML = `Pilot ${pilot} Is Ready`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} Is Ready`;
        list.style.visibility = 'hidden';
    }

    if (fuelLevel < 10000) {
        fuelStatus.innerHTML = `Fuel level too low for launch`;
        list.style.visibility = 'visible';
        launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
        launchStatus.style.color = 'red';
    }else if (cargoLevel > 10000) {
        cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
        list.style.visibility = 'visible';
        launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
        launchStatus.style.color = 'red';
    }else if(cargoLevel < 10000 && fuelLevel > 10000) {
        list.style.visibility = 'visible';
        fuelStatus.innerHTML = `Fuel level high enough for launch`;
        cargoStatus.innerHTML = `Cargo mass low enough for launch`;
        launchStatus.innerHTML = `Shuttle Ready For Launch`;
        launchStatus.style.color = 'green';
    }



}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();

        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let idx = Math.floor(Math.random() * planets.length);
    return planets[idx];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
