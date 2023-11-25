const fs = require('fs');

// Replace 'your_file.txt' with the path to your text file
const filePath = 'ACB_EXAMPLE_TEST0270.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Split the file content by line breaks and count the number of lines
    var processingDate;
    const lines = data.split('\n');
    const processingDateRow = lines[1].toString();
    const sdateStartColumn = 40; // Starting position of the desired column
    const sdateEndColumn = 48; // Ending position of the desired column
    const settlementDateDesciription = processingDateRow.substring(sdateStartColumn, sdateEndColumn).trim(); // Extracting the data within the specified columns
    console.log(settlementDateDesciription);

    if (settlementDateDesciription === "SAME DAY"){
        processingDate = formattedDate;
    }else if (settlementDateDesciription === "ONE DAY"){
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 1);

      const year = currentDate.getFullYear().toString(); // Extract century and first 2 digits of the year
      const month = ((currentDate.getMonth() + 1)); // Get month (adding 1 as months are zero-based)
      const day = (currentDate.getDate()); // Get day

      processingDate = year + year.slice(-2) + month + day;
      console.log(`Current Date in CCYYMMDD format: ${processingDate}`);
        // processingDate = setDate(formattedDate+1);
    }else if (settlementDateDesciription === "TWO DAY") {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 2);

      const year = currentDate.getFullYear().toString(); // Extract century and first 2 digits of the year
      const month = ((currentDate.getMonth() + 1)); // Get month (adding 1 as months are zero-based)
      const day = (currentDate.getDate()); // Get day

      processingDate = year + month + day;
      console.log(`Current Date in CCYYMMDD format: ${processingDate}`);
        // processingDate = ;
    }

    console.log(processingDate);

    const userProcessingDateRow = lines[1].toString();
    const userStartColumn = 2; // Starting position of the desired column
    const userEndColumn = 6; // Ending position of the desired column
    const userCode = userProcessingDateRow.substring(userStartColumn, userEndColumn).trim(); // Extracting the data within the specified columns
    console.log(userCode);

  }
  
);


