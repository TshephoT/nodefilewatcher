// const text = "This is a test text";
// var text2 = "This";
// var text3 = "is";
// var fillerZeros = "  "
// console.log(text2+fillerZeros+text3)

// var spacesNotFilled = 5;
// var counter = 1
// var zeros = "0"
// while (counter >= spacesNotFilled){
//     text + zeros;
//     zeros = zeros + 0;
//     counter = counter + 1;
// }

// console.log(text);

// var originalUserReferenceArray = [];
// originalUserReferenceArray.length = 30;
// // console.log(originalUserReferenceArray);


// // for (var i = 0; i <= text.length; i++) {
// //     var newV = text.charAt(i);
// //     // console.log(newV);
// // }

// // Combined 
// for (var i = 0; i <= text.length; i++) {
//     var newV = text.charAt(i);
//     // console.log(newV);
//     originalUserReferenceArray.push(newV);
// }

// console.log(originalUserReferenceArray);

// C:\Users\CT303517\source\repos\nodefilewatcher\testText.txt

const fs = require('fs');

// Replace 'your_file.txt' with the path to your text file
const filePath = 'ACB_EXAMPLE_TEST0270.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Split the file content by line breaks and count the number of lines
  const lines = data.split('\n');
  const numOfRows = lines.length;
  console.log(lines[1].toString());
//   console.log(`Number of rows in the file: ${numOfRows}`);
    
  // Loopm through rows 
  for (let i = 2; i < numOfRows - 3; i++){
    var positionName = lines[i].toString();
    // console.log(positionName);

    // originalUserReference
   const ourStartColumn = 64; // Starting position of the desired column
   const ourEndColumn = 66; // Ending position of the desired column
   const originalUserReference = positionName.substring(ourStartColumn, ourEndColumn); // Extracting the data within the specified columns
//    console.log(originalUserReference);

//    if (originalUserReference === "32"){
//     console.log("Test Passed");
//    }else {
//     console.log("Continue")
//    }
  }

//    // originalUserReference
//    const ourStartColumn = 70; // Starting position of the desired column
//    const ourEndColumn = 100; // Ending position of the desired column
//    const originalUserReference = fileString.substring(ourStartColumn, ourEndColumn); // Extracting the data within the specified columns

const currentDate = new Date();

const year = currentDate.getFullYear().toString().slice(-2); // Extract last 2 digits of the year
let month = (currentDate.getMonth() + 1).toString(); // Get month (adding 1 as months are zero-based)
let day = currentDate.getDate().toString(); // Get day

// Add leading zeros if month/day is a single digit
if (month.length === 1) {
  month = '0' + month;
}
if (day.length === 1) {
  day = '0' + day;
}

const formattedDate = year + month + day;
console.log(`Current Date in YYMMDD format: ${formattedDate}`);

});



// const currentDate = new Date();

// const year = currentDate.getFullYear().toString().slice(-2); // Extract last 2 digits of the year
// let month = (currentDate.getMonth() + 1).toString(); // Get month (adding 1 as months are zero-based)
// let day = currentDate.getDate().toString(); // Get day

// // Add leading zeros if month/day is a single digit
// if (month.length === 1) {
//   month = '0' + month;
// }
// if (day.length === 1) {
//   day = '0' + day;
// }

// const formattedDate = year + month + day;
// console.log(`Current Date in YYMMDD format: ${formattedDate}`);


// const getSpecificColumnAndRead = (lineNumber, startColumn, endColumn ) => {
//     // Split the file content by line breaks and get the third line (index 2)
//     const lines = data.split('\n');
//     if (lines.length >= 3) {
//         const thirdRowData = lines[2]; // Index 2 represents the third line (zero-based index)
//         console.log(`Third row data: ${thirdRowData}`);
//     } else {
//         console.log('The file does not have enough rows.');
//     }
// }

// settlementDate
var settlementDate;
const sdateStartColumn = 41; // Starting position of the desired column
const sdateEndColumn = 48; // Ending position of the desired column

// Split the file content by line breaks and get the third line (index 2)
// const lines = data.split('\n');
