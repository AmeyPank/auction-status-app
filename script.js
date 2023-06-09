console.log("Helloworld");

// function getData() {
//   document.getElementById("loader").style.display = "block";

//   fetch("https://gauravgitacc.github.io/postAppData/auctionData.json")
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("Data", data);
//       let innerHtml = "";
//       data.forEach((item) => {
//         innerHtml += `
//         <div class='myDiv'>
//             <h1>${item.status}</h1>
//             <h3>${item.caseNumber}</h3>
//         </div>
//         `;
//       });
//       document.getElementById("loader").style.display = "none";
//       document.getElementById("container").innerHTML = innerHtml;
//     }).catch((err) => {});
// }
var arr = [];
async function getData() {
  document.getElementById("loader").style.display = "block";
  console.log("Fetching Data...");

  try {
    const response = await fetch(
      "https://gauravgitacc.github.io/postAppData/auctionData.json"
    );
    arr = await response.json();
    if (arr) {
      console.log("data", arr);
      showData(arr);
      document.getElementById("loader").style.display = "none";
    }
  } catch (e) {
    console.log("Error--", e);
  }
}

getData();

document.getElementById("search").addEventListener("input", () => {
  var newArr = arr.filter((item) =>
    item.toLocation
      .toLowerCase()
      .includes(document.getElementById("search").value.trim().toLowerCase())
  );
  showData(newArr);
});

function showData(myArr) {
  document.getElementById("container").innerHTML = "";
  let innerHtml = "";
  myArr.forEach((item) => {
    innerHtml += `
                <div class='myDiv'>
                    <div class='flex-info'>
                        <div>
                            <div class='chip ${
                              item.status == "PENDING"
                                ? "yellow"
                                : item.status == "CANCELLED"
                                ? "red"
                                : ""
                            }' >${item.status}</div>
                            <p>${item.caseNumber}</p>
                        </div>
                        <p>${item.date}</p>
                    </div>
                    <hr/>
                    <div>
                            <strong>${item.toLocation}</strong>
                            <p>${
                              item.fromLocation
                            } <span style='float:right;'>${item.fare}</span></p>
                    </div>
                </div>
                `;
  });
  document.getElementById("container").innerHTML = innerHtml;
}

// document.getElementById("btn").addEventListener("click", getData);

// if (condition1) {
//   // dothis1
// } else {
//   if (condition2) {
//     // dothis2
//   } else {
//     // dothis3
//   }
// }

// condition1 ? "dothis1" : condition2 ? "dothis2" : "dothis3";
