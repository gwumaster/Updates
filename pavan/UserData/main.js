function storeUserData(name,age) {
    const userData = {
        Name:  name,
        Age: age
    };
    localStorage.setItem('user', JSON.stringify(userData));
}

function displayUserData() {
    const userData = localStorage.getItem('user');
    if(userData){
        const user = JSON.parse(userData);
        document.getElementById("userData").textContent = `Name: ${user.Name} Age: ${user.Age}`
    }
}
document.getElementById('userForm').addEventListener("submit", function (event){
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();

    if(name && age) {
        storeUserData(name,age);
        displayUserData();
        document.getElementById('userForm').reset();
    }
});


window.addEventListener('load',displayUserData);
