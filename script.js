let form = document.getElementById('CarForm');

document.getElementById('AddCar').addEventListener('click', function() {
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
});

document.getElementById('Add').addEventListener('click', function(event) {
    event.preventDefault();
    const model = document.getElementById('Model').value;
    const price = document.getElementById('Price').value.join('/day');
    const shop = document.getElementById('Shop').value;
    const rentingDate = document.getElementById('RentingDate').value.format("yyyy-MM-dd");

    if (model && price && shop && rentingDate) {
        const addedCarXml = `
            <Car>
                <Model>${model}</Model>
                <Price>${price}</Price>
                <Shop>${shop}</Shop>
                <RentingDate>${rentingDate}</RentingDate>
            </Car>
        `;
        fetch('cars.xml', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/xml'
            },
            body: addedCarXml
        }).then(response => {
            if (response.ok) {
                location.reload();
            } else {
                alert('Failed to add car.');
            }
        }).catch(() => {
            alert('Error connecting to server.');
        });
        
        form.style.display = "none";
    } else {
        alert("Please fill in all fields.");
    }
});

document.getElementById('RefreshCar').addEventListener('click', function(event) {
    event.preventDefault();
    fetch('cars.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const cars = xmlDoc.getElementsByTagName("car");
            const tableBody = document.getElementById("CarTable").querySelector("tbody");
            tableBody.innerHTML = "";

            for (let car of cars) {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${car.getElementsByTagName("Model")[0].textContent}</td>
                    <td>${car.getElementsByTagName("Price")[0].textContent}</td>
                    <td>${car.getElementsByTagName("Shop")[0].textContent}</td>
                    <td>${car.getElementsByTagName("RentingDate")[0].textContent}</td>
                `;
                tableBody.appendChild(row);
            }
        });
});