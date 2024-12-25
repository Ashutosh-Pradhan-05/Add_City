var cities = ["Delhi", "Hyderabad", "Bhubaneswar", "Bangalore", "Mumbai", "Kolkata", "Lucknow", "Ahmedabad", "Prayagraj", "Indore", "Chandigarh", "Chennai"];
window.onload = LoadCities;
function LoadCities() {
    document.getElementById("lstCities").innerHTML = "";
    cities.map(function (city) {
        var option = document.createElement("option");
        option.text = city;
        option.value = city;
        document.getElementById("lstCities").appendChild(option);
    });
    document.getElementById("cityList").innerHTML = `List of Cities`;
    document.getElementById("lblCount").innerHTML = `Total Number of Cities: ${cities.length}`;
}

function AddClick() {
    var cityName = document.getElementById("txtName").value.trim();

    if (cityName === "") {
        alert(`Value can't be empty!\nEnter the city name before you add.`);
    } else if (cityName.length <= 2) {
        alert(`Oops!!\nThis city doesn't exist.`);
    } else {
        var formattedCityName = formatCityName(cityName);

        var cityExists = cities.some(function (city) {
            return city.toLowerCase() === formattedCityName.toLowerCase();
        });

        if (!cityExists) {
            var flag = confirm(`${formattedCityName}\nWould you want to add this city?`);
            if (flag === true) {
                cities.push(formattedCityName);
                LoadCities();
                document.getElementById("txtName").value = "";
            }
        } else {
            alert(`${formattedCityName}\nThis city name already exists.`);
        }
    }
}

function formatCityName(name) {
    return name
        .toLowerCase()
        .split(' ')
        .map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}

function SortAsc() {
    cities.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    LoadCities();
}

function SortDsc() {
    cities.sort(function (a, b) {
        return b.toLowerCase().localeCompare(a.toLowerCase());
    });
    LoadCities();
}


function DeleteClick() {
    var selectedCity = document.getElementById("lstCities").value;
    var selectedIndex = cities.indexOf(selectedCity);

    if (selectedCity === "") {
        alert(`Select a city before you delete.`);
    } else {
        var flag = confirm(`Are you sure?\nWant to delete ${selectedCity} city?`);
        if (flag === true) {
            cities.splice(selectedIndex, 1);
            alert(`${selectedCity} city Deleted.`);
            LoadCities();
        }
    }
}

function EditClick() {
    var selectedCity = document.getElementById("lstCities").value;

    if (selectedCity === "") {
        alert(`Select a city before you edit.`);
    } else {
        document.getElementById("txtEditName").value = selectedCity;
        var editModal = new bootstrap.Modal(document.getElementById('edit'));
        editModal.show();
    }
}

function SaveClick() {
    var newCityName = document.getElementById("txtEditName").value.trim();
    var selectedCity = document.getElementById("lstCities").value;

    if (newCityName === "") {
        alert(`City name cannot be empty.`);
    } else if (newCityName.length <= 2) {
        alert(`Oops!!\nThis city doesn't exist.`);
    } else {
        var formattedCityName = formatCityName(newCityName);
        var cityExists = cities.some(function (city) {
            return city.toLowerCase() === formattedCityName.toLowerCase() && city !== selectedCity;
        });

        if (!cityExists) {
            var selectedIndex = cities.indexOf(selectedCity);
            cities[selectedIndex] = formattedCityName;
            LoadCities();
        } else {
            alert(`${formattedCityName}\nThis city name already exists.`);
        }
    }
}

function ClearClick() {
    var flag = confirm(`Are you sure want to delete all the cities.`);
    if (flag === true) {
        cities.length = 0;
        LoadCities();
    }
}