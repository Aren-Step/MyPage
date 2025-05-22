let form = document.getElementById('CarForm');

document.getElementById('AddCar').addEventListener('click', function() {
    if (form.style.display === "none") {
        form.style.display = "block";
        document.getElementById('AddCar').innerText = "Cancel";
    } else {
        form.style.display = "none";
        document.getElementById('AddCar').innerText = "Add Car";
    }
});

document.getElementById('Add').addEventListener('click', function(event) {
    event.preventDefault();
    const model = document.getElementById("Model").value;
    const price = document.getElementById("Price").value;
    const shop = document.getElementById("Shop").value;
    const rentingDate = document.getElementById("RentingDate").value;

    if (model && price && shop && rentingDate) {
        const addedCarXml = `
            <Car>
                <Model>${model}</Model>
                <Price>$${price}/day</Price>
                <Shop>${shop}</Shop>
                <RentingDate>${rentingDate}</RentingDate>
            </Car>
        `;
        fetch("cars.xml", {
            method: "POST",
            headers: {
                "Content-Type": "application/xml"
            },
            body: addedCarXml
        });
        // .then(response => {
        //     if (response.ok) {
        //         location.reload();
        //     } else {
        //         alert("Failed to add car.");
        //     }
        // }).catch(() => {
        //     alert("Error connecting to server.");
        // });
        
        form.style.display = "none";
    } else {
        alert("Please fill in all fields.");
    }

    let formInputs = form.querySelectorAll("input[type='text'], input[type='date'], input[type='number']");
    formInputs.forEach(input => {
        input.value = "";
    });

});

document.getElementById('Reset').addEventListener('click', function(event) {
    event.preventDefault();
    let formInputs = form.querySelectorAll("input[type='text'], input[type='date'], input[type='number']");
    formInputs.forEach(input => {
        input.value = "";
    });
});

document.getElementById('RefreshCar').addEventListener('click', function(event) {
    event.preventDefault();
    readXml("cars.xml");
});

function readXml(url) {
    var tableBody = document.getElementById("CarTable").querySelector("tbody");
    fetch(url)
        .then(response => response.text())
        .then((data) => {
            let parser = new DOMParser();
            xml = parser.parseFromString(data, "text/xml");
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

    return tableBody;
}