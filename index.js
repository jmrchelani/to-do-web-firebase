var list = document.getElementById("myUL");
var span = document.createElement("SPAN");
var txt = document.createTextNode("\u00D7");
span.className = "close";
span.appendChild(txt);

var total = 0;

function getAllTasks() {
    var ref = firebase.database().ref("data").orderByValue();
    var str = ''
    ref.once("value").then(
        function (snapshot) {
            snapshot.forEach(
                function (childSnapshot) {
                    var num = childSnapshot.key;
                    var data = childSnapshot.val();
                    var task = data.task;
                    var status = (!data.status) ? "checked" : "";
                    if (status != '') str = '<li id="' + num + '" class="' + status + '">' + task + '</li>';
                    else str = '<li id="' + num + '">' + task + '</li>'
                    console.log(num + " " + task + " " + status)
                    list.innerHTML += str;
                    total++;
                    console.log(total)
                }
            ).then(addX())
        }
    )

}

var myNodelist = document.getElementsByTagName("LI");
function addX() {
    var i;
    for (i = 0; i < myNodelist.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
        console.log(span);
    }
    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            console.log(this.parentElement)
            var id = div.id;
            firebase.database().ref("data").child(id).remove();
            div.style.display = "none";

        }
    }
    addIt();
}



// Add a "checked" symbol when clicking on a list item
function addIt() {
    var list = document.querySelector('ul');
    list.addEventListener('click', function (ev) {
        if (ev.target.tagName === 'LI') {
            var status = ev.target.className;
            var id = ev.target.id;
            var ans = (status == "checked") ? 1 : 0;
            firebase.database().ref("data").child(id.toString()).child("status").set(ans);
            ev.target.classList.toggle('checked');

        }
    }, false);
}

// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    li.id = total + 1;
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
        firebase.database().ref("data").child(++total).set({ 'status': 1, 'task': inputValue })
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    span.onclick = function () {
        var div = this.parentElement;
        var id = div.id;
        firebase.database().ref("data").child(id).remove();
        div.style.display = "none";
    }
    li.appendChild(span);


}