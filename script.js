fetch('cars.xml')
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const cars = xmlDoc.getElementsByTagName("car");
        const tableBody = document.querySelector("tbody");

        for (let i = 0; i < cars.length; i++) {
            const car = cars[i];
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
    const price = document.getElementById('Price').value;
    const shop = document.getElementById('Shop').value;
    const rentingDate = document.getElementById('RentingDate').value;

    if (model && price && shop && rentingDate) {
        const tableBody = document.querySelector("tbody");
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${model}</td>
            <td>${price}</td>
            <td>${shop}</td>
            <td>${rentingDate}</td>
        `;
        tableBody.appendChild(row);

        const addedCarXml = `
            <Car>
                <Model>${model}</Model>
                <Price>${price}</Price>
                <Shop>${shop}</Shop>
                <RentingDate>${rentingDate}</RentingDate>
            </Car>
        `;
        


        form.style.display = "none";
    } else {
        alert("Please fill in all fields.");
    }
});
document.getElementById('RefreshCar').addEventListener('click', function() {
    location.reload();
});