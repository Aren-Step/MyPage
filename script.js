// Form to add a car
var form = document.getElementById('CarForm');

// Create an XML document
var xmlData = (() => {
    var xmlDoc = document.implementation.createDocument(null, 'Cars');
    
    var serializer = new XMLSerializer();
    var xmlString = serializer.serializeToString(xmlDoc.documentElement);

    var blob = new Blob([xmlString], { type: 'application/xml' });
    var link = URL.createObjectURL(blob);

    return {
        url: link,
        toString: xmlString,
        element: xmlDoc.documentElement,
        name: 'cars.xml',
    };
})();

// Open / close form
function toggleForm() {
    if (form.style.display === "none") {
        form.style.display = "block";
        document.getElementById('AddCar').innerText = "Cancel";
    } else {
        form.style.display = "none";
        document.getElementById('AddCar').innerText = "Add Car";
    }
}

// Add button behavior
document.getElementById('AddCar').addEventListener('click', function() {
    toggleForm();
});

// Reset form
function resetForm() {
    let formInputs = form.querySelectorAll("input[type='text'], input[type='date'], input[type='number']");
    formInputs.forEach(input => {
        input.value = "";
    });
}

// Submit form
document.getElementById('Add').addEventListener('click', function(event) {
    event.preventDefault();
    const model = document.getElementById("Model").value;
    const price = document.getElementById("Price").value;
    const shop = document.getElementById("Shop").value;
    const rentingDate = document.getElementById("RentingDate").value;

    if (model && price && shop && rentingDate) {
        try {
            const addedCarXml = `
                <Model>${model}</Model>
                <Price>$${price}/day</Price>
                <Shop>${shop}</Shop>
                <RentingDate>${rentingDate}</RentingDate>
            `;
            xmlData.element.appendChild(document.createElement('Car'));
            xmlData.element.lastChild.innerHTML = addedCarXml;
            alert("Car added successfully!");
        } catch {
            alert("Error adding car. See console for details.");
        }
        
        toggleForm();
    } else {
        alert("Please fill in all fields.");
    }

    resetForm();
});

// Reset button behavior
document.getElementById('Reset').addEventListener('click', function(event) {
    event.preventDefault();
    resetForm();
});

// Refresh button behavior
document.getElementById('RefreshCar').addEventListener('click', function(event) {
    event.preventDefault();
    readXml(xmlData.url);
});

// Load XML file
function readXml(url) {
    var tableBody = document.getElementById("CarTable").querySelector("tbody");
    fetch(url)
        .then(response => response.text())
        .then((data) => {
            let parser = new DOMParser();
            xml = parser.parseFromString(data, "application/xml");
            var cars = xml.getElementsByTagName("Car");
            var model, price, shop, rentingDate;
            tableBody.innerHTML = "";
            for (let car of cars) {
                model = car.getElementsByTagName("Model")[0].innerHTML;
                price = car.getElementsByTagName("Price")[0].innerHTML;
                shop = car.getElementsByTagName("Shop")[0].innerHTML;
                rentingDate = car.getElementsByTagName("RentingDate")[0].innerHTML;

                var row = document.createElement("tr");
                row.innerHTML = `
                    <td>${model}</td>
                    <td>${price}</td>
                    <td>${shop}</td>
                    <td>${rentingDate}</td>
                `;
                tableBody.appendChild(row);
            }
        })
        .catch(() => {
            alert("Error loading XML file. See console for details.");
        });

    // return tableBody;
}