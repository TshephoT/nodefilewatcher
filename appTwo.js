const fs = require("fs/promises");

// // Function to filter lines that start with 'Specific Data'
// function filterData(data) {
//     const lines = data.split('\n');
//     const filteredLines = lines.filter(line => line.startsWith('Specific Data'));
//     return filteredLines.join('\n');
//   }

// fs.readFile("./ACB_EXAMPLE_TEST0270.txt", "utf8").then( data => {
//     const filteredData = filterData(data);
//     return fs.writeFile('output_file.txt', filteredData, 'utf8');

// }).then(() => {
//     console.log('Data written to output_file.txt');
// }).catch(err => {
//     console.error("Error", err);
// });

  
(async () => {
    let fileString = (await fs.readFile("ACB_EXAMPLE_TEST0270.txt")).toString();
    fileString.split("");
    const path = "C:\Users\CT303517\source\repos\nodefilewatcher\output.txt"

    // White Listed Accounts
    const accountNumberNotProvidedFor = "04048186101"; // ABSA
    const debitsCreditsNotAllowedToAccount = "14048186101"; //FNB
    const clientDidNotAuthoriseDebitCredit = "00080627021"; //SBSA
    const nonFICACompliant = "34048186101"; //Investec

    // Branch codes
    const absaCode = "632005";
    const sbsaCode = "050217";
    const fnbCode = "250655";
    const InvestecCode = "580105";

    // Global Variables
    // Get current date in YYMMDD format
    const currentDate = new Date();
    var controlRecordData;
    var standardTransactionRecordData;

    const year = currentDate.getFullYear().toString(); 
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
    // console.log(`Current Date in YYMMDD format: ${formattedDate}`);












    // settlementDate
    var processingDate;
    const lines = fileString.split('\n');
    const processingDateRow = lines[1].toString();
    const sdateStartColumn = 40; // Starting position of the desired column
    const sdateEndColumn = 48; // Ending position of the desired column
    const settlementDateDesciription = processingDateRow.substring(sdateStartColumn, sdateEndColumn).trim(); // Extracting the data within the specified columns
    // console.log(settlementDateDesciription);

    if (settlementDateDesciription === "SAME DAY"){
        processingDate = formattedDate;
    }else if (settlementDateDesciription === "ONE DAY"){
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 1);

      const year = currentDate.getFullYear().toString(); // Extract century and first 2 digits of the year
      const month = ((currentDate.getMonth() + 1)); // Get month (adding 1 as months are zero-based)
      const day = (currentDate.getDate()); // Get day

      processingDate = year + year.slice(-2) + month + day;
    //   console.log(`Current Date in CCYYMMDD format: ${processingDate}`);
        // processingDate = setDate(formattedDate+1);
    }else if (settlementDateDesciription === "TWO DAY") {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 2);

      const year = currentDate.getFullYear().toString(); // Extract century and first 2 digits of the year
      const month = ((currentDate.getMonth() + 1)); // Get month (adding 1 as months are zero-based)
      const day = (currentDate.getDate()); // Get day

      processingDate = year + month + day;
    //   console.log(`Current Date in CCYYMMDD format: ${processingDate}`);
        // processingDate = ;
    }

    // console.log(processingDate);

    // userCode
    const userProcessingDateRow = lines[1].toString();
    const userStartColumn = 2; // Starting position of the desired column
    const userEndColumn = 6; // Ending position of the desired column
    const userCode = userProcessingDateRow.substring(userStartColumn, userEndColumn).trim(); // Extracting the data within the specified columns
    // console.log(userCode);
    

    const controlRecord = async () => {
        // //   recordIdentifier
        const crRecordIdentifier = "01";

        // processingDate
        // const processingDate = formattedDate;

        // serviceType
        const serviceType = "EFT ";
        
        // subServiceType
        const subServiceType = "UNPAIDS   ";

        // userDestination
        const userDestination = "4209";

        // bankServeCenter
        const bankServeCenter = "ACBJ";

        // fileName
        const fileName = "EGV6001D";

        // fileNumber
        const fileNumber = "0001";

        // dataType
        const dataType = "DATA";

        // dataDirection
        const dataDirection = "OUT";

        // settlementDate
        const settlementDateType = processingDate;

        // testIndicator
        const testIndicator = "TEST";

        // recordSize
        const recordSize = "0180";

        controlRecordData = crRecordIdentifier+formattedDate+serviceType+subServiceType+userDestination+bankServeCenter+fileName+
        fileNumber+dataType+dataDirection+settlementDateType+testIndicator+recordSize+userCode;

    
    }


    const StandardTransactionRecord = async () => {
        const riStartColumn = 0; // Starting position of the desired column
        const riEndColumn = 2; // Ending position of the desired column
        recordIdentifier = fileString.substring(riStartColumn, riEndColumn).trim(); // Extracting the data within the specified columns
        if (recordIdentifier === "50"){
            recordIdentifier = "61";
        }


        //   originalUserBranch
        const oubStartColumn = 2; // Starting position of the desired column
        const oubEndColumn = 8; // Ending position of the desired column
        const originalUserBranch = fileString.substring(oubStartColumn, oubEndColumn).trim(); // Extracting the data within the specified columns
       

        // originalNominatedAccountNumber
        const onanStartColumn = 8; // Starting position of the desired column
        const onanEndColumn = 19; // Ending position of the desired column
        const originalNominatedAccountNumber = fileString.substring(onanStartColumn, onanEndColumn).trim(); // Extracting the data within the specified columns
    

        // userCode
        const ucStartColumn = 19; // Starting position of the desired column
        const ucEndColumn = 23; // Ending position of the desired column
        const userCode = fileString.substring(ucStartColumn, ucEndColumn).trim(); // Extracting the data within the specified columns
     

        //  originalSequenceNumber
        const osnStartColumn = 23; // Starting position of the desired column
        const osnEndColumn = 29; // Ending position of the desired column
        const originalSequenceNumber = fileString.substring(osnStartColumn, osnEndColumn).trim(); // Extracting the data within the specified columns


        //  originalHomingBranch
        const ohbStartColumn = 29; // Starting position of the desired column
        const ohbEndColumn = 35; // Ending position of the desired column
        const originalHomingBranch = fileString.substring(ohbStartColumn, ohbEndColumn).trim(); // Extracting the data within the specified columns
   

        //  originalHomingAccountNumber
        const ohanStartColumn = 35; // Starting position of the desired column
        const ohanEndColumn = 46; // Ending position of the desired column
        const originalHomingAccountNumber = fileString.substring(ohanStartColumn, ohanEndColumn).trim(); // Extracting the data within the specified columns
   

        // originalAccountType
        const originalAccountType = "1";

        //  originalAmount
        const oaStartColumn = 47; // Starting position of the desired column
        const oanEndColumn = 58; // Ending position of the desired column
        const originalAmount = fileString.substring(oaStartColumn, oanEndColumn).trim(); // Extracting the data within the specified columns
   

        //  originalActionDate
        const oadStartColumn = 58; // Starting position of the desired column
        const oadEndColumn = 64; // Ending position of the desired column
        const originalActionDate = fileString.substring(oadStartColumn, oadEndColumn).trim(); // Extracting the data within the specified columns
  

        //  orignalClassEntry
        const orignalClassEntry = "32";
        // if (fileString.substring(processingTimeStart, processingTimeEnd).trim() === "TWO DAY"){
        //     const orignalClassEntry = "32";
        // }else if (fileString.substring(processingTimeStart, processingTimeEnd).trim() === "SAME DAY"){
        //     const orignalClassEntry = "44";
        // }else {
        //     const orignalClassEntry = "21";
        // }


        //  originalTaxCode
        const originalTaxCode = "0";

        // oneFiller 
        const oneFiller = "0";

        // whiteSpaceFiller
        const whiteSpaceFiller = " ";

        // twoFiller
        const twoFiller = "00";

        // reasonForUnpaid
        const reasonForUnpaid = "30";

        // originalUserReference
        const ourStartColumn = 70; // Starting position of the desired column
        const ourEndColumn = 100; // Ending position of the desired column
        const originalUserReference = fileString.substring(ourStartColumn, ourEndColumn); // Extracting the data within the specified columns


        //  originalHomingAccountName
        const ohannameStartColumn = 100; // Starting position of the desired column
        const ohanameEndColumn = 130; // Ending position of the desired column
        const originalHomingAccountName = fileString.substring(ohannameStartColumn, ohanameEndColumn); // Extracting the data within the specified columns


        //  newBrunchNumber
        const newBrunchNumber = "000000";

        //   newAccountNumber
        const newAccountNumber = "0000000000000";

        //  newAccountType
        const newAccountType = "0";

        //  newSequenceNumber 
        const newSequenceNumber = "000000";

        //  numberOfTimeRedirected
        const numberOfTimeRedirected = "  ";

        //  originalHomingInstitution
        const newActionDate = "231019"; //############################################################

        //  originalHomingInstitution
        const originalHomingInstitution = "89";

        // fourSpaceFiller
        const fourSpaceFiller = "    ";

        //  twelveFiller
        const twelveFiller = "            ";


        standardTransactionRecordData = recordIdentifier+originalUserBranch+originalNominatedAccountNumber+userCode+
            originalSequenceNumber+
            originalHomingBranch+
            originalHomingAccountNumber+
            originalAccountType+
            originalAmount+
            originalActionDate+
            orignalClassEntry+
            originalTaxCode+
            reasonForUnpaid+
            whiteSpaceFiller+
            originalUserReference+
            originalHomingAccountName+
            oneFiller+
            newBrunchNumber+
            newAccountNumber+
            newAccountType+
            newSequenceNumber+
            numberOfTimeRedirected+
            newActionDate+
            whiteSpaceFiller+
            originalHomingInstitution+
            fourSpaceFiller+
            newActionDate+
            twelveFiller;

    
    }


    controlRecord();
    StandardTransactionRecord();
    

    

    function appendToFile(output, content) {
        // Use 'a' flag to append content to the file
        fs.writeFile("output.txt", content + '\n', { flag: 'a' }, (err) => {
          if (err) {
            console.error('Error appending to file:', err);
            return;
          }
          console.log('Content appended to file successfully.');
        });
    }

    // appendToFile("output.txt", standardTransactionRecordData );
    appendToFile("output.txt", controlRecordData );
    appendToFile("output.txt", standardTransactionRecordData );




    // //  Consolidation Record
    // const consolidatedRecord = async () => {
    //     // consolidatedRecordIdentifier
    //     if (recordIdentifier === 61 || recordIdentifier === 60){
    //         var consolidatedRecordIdentifier = 20;
    //     };
    //     console.log(consolidatedRecordIdentifier);

    //     //  bankSuspenseAccountBranch
    //     const bankSuspenseAccountBranch = originalHomingBranch;
        
    //     //  bankSuspenseAccountNumber
    //     const bankSuspenseAccountNumber = originalHomingAccountNumber;

    //     //  consolidatedSequenceNumber
    //     const consolidatedSequenceNumber = originalSequenceNumber + 1;

    //     //  accountType
    //     const accountType = "1";

    //     //  consolidated amount
        



    //     let arr2 = [
    //         consolidatedRecordIdentifier,
    //         bankSuspenseAccountBranch,
    //         bankSuspenseAccountNumber,
    //         userCode,
    //         originalUserBranch, 
    //         originalNominatedAccountNumber,
    //         accountType,

    //     ]



    // }

    // try {
    //     // let outPut = await fs.writeFile("output.txt", fileString);

    //     //  Standard Transaction Record - File specification data
    //     //  recordIdentifier
    //     StandardTransactionRecord();
    //     // consolidatedRecord();
        
    // } catch (error) {
    //     console.log(error);
    // }
})();