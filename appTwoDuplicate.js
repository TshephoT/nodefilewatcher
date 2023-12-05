const fs = require("fs/promises");
// ============= Import Files =============== //
// import { appendToFile, writeTostandard } from "./Methods/writeToFileMethod";

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

  
async function processData() {
    let fileString = (await fs.readFile("ACB_EXAMPLE_TEST0270.txt")).toString();
    fileString.split("");
    const path = "C:\Users\CT303517\source\repos\nodefilewatcher\output.txt"

    // White Listed Accounts
    const accountNumberNotProvidedFor = "04048186101"; // ABSA
    const debitsCreditsNotAllowedToAccount = "14048186101"; //FNB
    const clientDidNotAuthoriseDebitCredit = "00080627021"; //SBSA
    const nonFICACompliant = "34048186101"; //Investec

    const absaContraAccountNumber = "05640613966"; // ABSA
    const sbsaContraAccountNumber = "00071463453"; //FNB
    // const fnbContraAccountNumber = "00080627021"; //SBSA ?????
    // const nedbankContraAccountNumber = "34048186101"; //Investec ?????
//================================
let standardTransactionRecordDataArray = new Array();
//standardTransactionRecordData
//========================
    // Branch codes
    const absaCode = "632005";
    const sbsaCode = "050217";
    const fnbCode = "250655";
    const InvestecCode = "580105";

    //Branch totals
    var absaTotal = 0;
    var sbsaTotal = 0;
    var fnbTotal = 0;
    var InvestecTotal = 0;
    // const absaTotal = "00000000000";
    // const sbsaTotal = "00000000000";
    // const fnbTotal = "00000000000";
    // const InvestecTotal = "00000000000";

    // Global Variables
    // Get current date in YYMMDD format
    var originalHomingBranch;
    var originalHomingAccountNumber;
    var originalSequenceNumber;
    var twelveFiller;
    var recordIdentifier;
    var serviceType;
    var subServiceType;
    var userDestination;
    var hashTotal;
    var unpaidNumber = 0;
    var numberOfDebits = 0;
    var valueOfCredits = 0;
    var totalValueOfDebits = 0;
    var numberOfCredits = 0;
    var hashHomingTotal = 0;
    var totalHashRecord;
    var sequenceNumber = 0;
    var originalSequenceNumber;
    var osNumber = 0;
    const currentDate = new Date();
    var controlRecordData;
    var standardTransactionRecordData;
    var endOfFileRecordData;

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
    const formattedYYDate = year.slice(-2) + month + day;
    // console.log(`Current Date in YYMMDD format: ${formattedDate}`);












    // settlementDate
    var processingDate;
    var cutProcessingDate;
    const lines = fileString.split('\n');
    const processingDateRow = lines[1].toString();
    const sdateStartColumn = 40; // Starting position of the desired column
    const sdateEndColumn = 48; // Ending position of the desired column
    const settlementDateDesciription = processingDateRow.substring(sdateStartColumn, sdateEndColumn).trim(); // Extracting the data within the specified columns
    // console.log(settlementDateDesciription);

    if (settlementDateDesciription === "SAME DAY"){
        processingDate = formattedDate;
        cutProcessingDate = formattedYYDate;
        console.log(processingDate);
    }else if (settlementDateDesciription === "ONE DAY"){
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 1);
      
      const year = currentDate.getFullYear().toString(); // Extract century and first 2 digits of the year
      const month = ((currentDate.getMonth() + 1)); // Get month (adding 1 as months are zero-based)
      const day = (currentDate.getDate()); // Get day

      processingDate = year + month + day;
      cutProcessingDate = year.slice(-2) + month + day;
      console.log(processingDate);
    //   console.log(`Current Date in CCYYMMDD format: ${processingDate}`);
        // processingDate = setDate(formattedDate+1);
    }else if (settlementDateDesciription === "TWO DAY") {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 2);
  
        const year = currentDate.getFullYear().toString(); // Extract century and first 2 digits of the year
        var getMonth = ((currentDate.getMonth() + 1)); // Get month (adding 1 as months are zero-based)
        var getDay = (currentDate.getDate()); // Get day
        console.log("month: "+ getMonth);
        console.log("Day: "+ getDay);
        console.log("Day length: " + getDay.toString().length);
  

        if (getMonth.toString().length === 1) {
            getMonth = '0' + getMonth;
        };
        if (getDay.toString().length === 1) {
            getDay = '0' + getDay;
        }
          
          console.log("Day2: "+getDay);

        processingDate = year + getMonth + getDay;
        cutProcessingDate = year.slice(-2) + getMonth + getDay;
        console.log(processingDate);
        console.log("cut: "+cutProcessingDate);
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
    

    const controlRecord = () => {
        // //   recordIdentifier
        const crRecordIdentifier = "01";

        // processingDate
        // const processingDate = formattedDate;

        // serviceType
        serviceType = "EFT ";
        
        // subServiceType
        subServiceType = "UNPAIDS   ";

        // userDestination
        userDestination = "4209";

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





    //=================================================================
        // StandardTransactionRecord();
    //    console.log(originalUserReference);
    //=====================================================================
    const StandardTransactionRecord = async () => {
        const numOfRows = lines.length;
        for (let i = 2; i < numOfRows - 3; i++){
            var positionName = lines[i].toString();
            const srStartColumn = 35; // Starting position of the desired column
            const srEndColumn = 46; // Ending position of the desired column
            const srAccountNumber = positionName.substring(srStartColumn, srEndColumn);
            // console.log(srAccountNumber);

            // Loop through each record if acc matches
            if (srAccountNumber === accountNumberNotProvidedFor || srAccountNumber === debitsCreditsNotAllowedToAccount || srAccountNumber === clientDidNotAuthoriseDebitCredit || srAccountNumber === nonFICACompliant )
            {
                const riStartColumn = 0; // Starting position of the desired column
                const riEndColumn = 2; // Ending position of the desired column
                recordIdentifier = lines[i].substring(riStartColumn, riEndColumn).trim(); // Extracting the data within the specified columns
                if (recordIdentifier === "50"){
                recordIdentifier = "61";
            }

            //  numberOfUnpaidTransactions
            unpaidNumber = unpaidNumber + 1;
            // console.log(unpaidNumber);

            //  numberOfCredits
            numberOfDebits = numberOfDebits + 1;
            // console.log("debits: "+numberOfDebits);


            //   originalUserBranch
            const oubStartColumn = 2; // Starting position of the desired column
            const oubEndColumn = 8; // Ending position of the desired column
            const originalUserBranch = lines[i].substring(oubStartColumn, oubEndColumn).trim(); // Extracting the data within the specified columns
        

            // originalNominatedAccountNumber
            const onanStartColumn = 8; // Starting position of the desired column
            const onanEndColumn = 19; // Ending position of the desired column
            const originalNominatedAccountNumber = lines[i].substring(onanStartColumn, onanEndColumn).trim(); // Extracting the data within the specified columns
        

            // userCode
            const ucStartColumn = 19; // Starting position of the desired column
            const ucEndColumn = 23; // Ending position of the desired column
            const userCode = lines[i].substring(ucStartColumn, ucEndColumn).trim(); // Extracting the data within the specified columns
        

            //  originalSequenceNumber
            const osnStartColumn = 23; // Starting position of the desired column
            const osnEndColumn = 29; // Ending position of the desired column
            // originalSequenceNumber = fileString.substring(osnStartColumn, osnEndColumn).trim(); // Extracting the data within the specified columns
            // originalSequenceNumber = "000001";
            var sequenceSize = 6;
            sequenceNumber = sequenceNumber + 1;
            var sequenceZerosToAdd = sequenceSize - sequenceNumber.toString().length;
            const emptySequenceArray = new Array(sequenceZerosToAdd).fill(0);
            var sequenceValue1 = emptySequenceArray.join('');
            var sequenceValue2 = sequenceValue1 + sequenceNumber;
            originalSequenceNumber = sequenceValue2.toString();


            //  originalHomingBranch
            const ohbStartColumn = 29; // Starting position of the desired column
            const ohbEndColumn = 35; // Ending position of the desired column
            originalHomingBranch = lines[i].substring(ohbStartColumn, ohbEndColumn).trim(); // Extracting the data within the specified columns
    

            //  originalHomingAccountNumber
            const ohanStartColumn = 35; // Starting position of the desired column
            const ohanEndColumn = 46; // Ending position of the desired column
            originalHomingAccountNumber = lines[i].substring(ohanStartColumn, ohanEndColumn).trim(); // Extracting the data within the specified columns
            hashHomingTotal = hashHomingTotal + parseInt(originalHomingAccountNumber);
            // console.log(hashHomingTotal);
    

            // originalAccountType
            const originalAccountType = "1";

            //  originalAmount
            const oaStartColumn = 47; // Starting position of the desired column
            const oanEndColumn = 58; // Ending position of the desired column
            const originalAmount = lines[i].substring(oaStartColumn, oanEndColumn).trim(); // Extracting the data within the specified columns

            if(originalHomingBranch === absaCode){
                absaTotal = absaTotal + parseInt(originalAmount);
                totalValueOfDebits = totalValueOfDebits + absaTotal;
            //    console.log(absaTotal);

            }else if(originalHomingBranch === fnbCode){
                fnbTotal = fnbTotal + parseInt(originalAmount);
                totalValueOfDebits = totalValueOfDebits + fnbTotal;
                // console.log(fnbTotal);

            }else if(originalHomingBranch === fnbCode){
                InvestecTotal = InvestecTotal + parseInt(originalAmount);
                totalValueOfDebits = totalValueOfDebits + InvestecTotal;
                // console.log(InvestecTotal);

            }else if(originalHomingBranch === sbsaCode){
                sbsaTotal = sbsaTotal + parseInt(originalAmount);
                totalValueOfDebits = totalValueOfDebits + sbsaTotal;
                // console.log(sbsaTotal);

            }

            // console.log("total debits in stnd: " + totalValueOfDebits)
    

            //  originalActionDate
            const oadStartColumn = 58; // Starting position of the desired column
            const oadEndColumn = 64; // Ending position of the desired column
            const originalActionDate = lines[i].substring(oadStartColumn, oadEndColumn).trim(); // Extracting the data within the specified columns
    

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
            if (srAccountNumber === accountNumberNotProvidedFor){
                reasonForUnpaid = "02";
            }else if(srAccountNumber === debitsCreditsNotAllowedToAccount){
                reasonForUnpaid = "03";
            }else if(srAccountNumber === clientDidNotAuthoriseDebitCredit){
                reasonForUnpaid = "30";
            }else if(srAccountNumber === nonFICACompliant){
                reasonForUnpaid = "56";
            }

            // originalUserReference
            const ourStartColumn = 70; // Starting position of the desired column
            const ourEndColumn = 100; // Ending position of the desired column
            const originalUserReference = lines[i].substring(ourStartColumn, ourEndColumn); // Extracting the data within the specified columns


            //  originalHomingAccountName
            const ohannameStartColumn = 100; // Starting position of the desired column
            const ohanameEndColumn = 130; // Ending position of the desired column
            const originalHomingAccountName = lines[i].substring(ohannameStartColumn, ohanameEndColumn); // Extracting the data within the specified columns


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

            //  newActionDate
            const newActionDate = cutProcessingDate; //############################################################

            //  originalHomingInstitution
            const originalHomingInstitution = "89";

            // fourSpaceFiller
            const fourSpaceFiller = "    ";

            //  twelveFiller
            twelveFiller = "            ";



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
                standardTransactionRecordDataArray[i]=standardTransactionRecordData;
                //appendToFile("output.txt", standardTransactionRecordData);
                
            }
        }
    };



    //  Consolidation Record
    const consolidatedRecord = async () => {
        // consolidatedRecordIdentifier
        // if (recordIdentifier === 61 || recordIdentifier === 60){
        //     var consolidatedRecordIdentifier = 20;
        // };
        // console.log(consolidatedRecordIdentifier);
        const consolidatedRecordIdentifier = "20";

        //  bankSuspenseAccountBranch
        var bankSuspenseAccountBranch = originalHomingBranch;
        
        //  bankSuspenseAccountNumber
        var bankSuspenseAccountNumber = originalHomingAccountNumber;
        if (bankSuspenseAccountBranch === sbsaCode){
            bankSuspenseAccountNumber = sbsaContraAccountNumber;
        }else if (bankSuspenseAccountBranch === absaCode){
            bankSuspenseAccountNumber = absaContraAccountNumber
        }else if (bankSuspenseAccountBranch === fnbCode){
            bankSuspenseAccountNumber = sbsaContraAccountNumber;
        }else {
            bankSuspenseAccountNumber = sbsaContraAccountNumber;
        };

        //  consolidatedSequenceNumber
        // const consolidatedSequenceNumber = parseInt(originalSequenceNumber) + 1;
        // console.log("csSN: " + consolidatedSequenceNumber);
        var consolidatedSequenceSize = 6;
        osNumber = osNumber + 1;
        var consolidatedValueZerosToAdd = consolidatedSequenceSize - osNumber.toString().length;
        const emptyOSArray = new Array(consolidatedValueZerosToAdd).fill(0);
        var osValue1 = emptyOSArray.join('');
        var osValue2 = osValue1 + osNumber;
        consolidatedSequenceNumber =  osValue2;
        

        //  accountType
        const accountType = "1";

        //  consolidated amount
        const consolidatedAmount = sbsaTotal;

        // consolodatedActionDate
        const consolidatedActionDate = processingDate;

        // consolidatedEntryClass
        const consolidatedEntryClass = "11";

        //filler
        const consolidatedFourFiller = "0000";
        
        // consolidatedTargetBranch
        const consolidatedTargetBranch = "JHB";

        //  submittingBankMemerNumber
        const submittingBankMemerNumber = "01";

        // originalTapGenerationNumber
        const originalTapGenerationNumber = "0601";

        // NumberOfUnpaidTransactions
        var unpaidValueSize = 6; // Specify the desired size of the array
        var unpaidValueZerosToAdd = unpaidValueSize - unpaidNumber.toString().length;
        // console.log(unpaidValueZerosToAdd)

        const emptyUnpaidArray = new Array(unpaidValueZerosToAdd).fill(0);
        // console.log(unpaidValueZerosToAdd);
        var unpaidValue1 = emptyUnpaidArray.join('');
        var unpaidValue2 = unpaidValue1 + unpaidNumber;
        // console.log(unpaidValue2);
        const NumberOfUnpaidTransactions = unpaidValue2;

        // nineWhiteSpaces
        const nineWhiteSpaces = "         ";

        // userNominatedAccountName
        const userNominatedAccountName = "CAPITEC PAYMENT SERVICES      ";

        //  thirtySixZeroAndWhiteSpaces
        const thirtySixZeroAndWhiteSpaces = "00000000000000000000                ";

        // homingInstitution
        const homingInstitution = "21";

        consolidatedRecordData = consolidatedRecordIdentifier + sbsaCode + bankSuspenseAccountNumber+
            userCode + consolidatedSequenceNumber + originalHomingBranch + originalHomingAccountNumber + accountType+
            consolidatedAmount + consolidatedActionDate + consolidatedEntryClass + consolidatedFourFiller+
            consolidatedTargetBranch + submittingBankMemerNumber + originalTapGenerationNumber + consolidatedActionDate+
            NumberOfUnpaidTransactions + nineWhiteSpaces + userNominatedAccountName + thirtySixZeroAndWhiteSpaces + homingInstitution + twelveFiller;

    };

    const trailerControlRecord = async () => {
        // tcRecordIdentifier 
        const tcRecordIdentifiir = "98";

        // outputDate
        const outputDate =  formattedYYDate;

        // numberOfOutputFiles
        const numberOfOutputFiles = "0001";

        // numberOfCreditRecords
        // numberOfDebitRecords
        var debitSize = 8; // Specify the desired size of the array
        var debitZerosToAdd = debitSize - numberOfDebits.toString().length;
        // console.log(unpaidValueZerosToAdd)

        const emptyDebitdArray = new Array(debitZerosToAdd).fill(0);
        // console.log(unpaidValueZerosToAdd);
        var debitValue1 = emptyDebitdArray.join('');
        var debitValue2 = debitValue1 + numberOfDebits;
        // console.log(unpaidValue2);
        const numberOfDebitRecords = debitValue2;
        // console.log(numberOfDebitRecords);

        // valueOfCReditRecords
        if (absaTotal > 0){
            numberOfCredits = numberOfCredits + 1;
        }else if(sbsaTotal > 0){
            numberOfCredits = numberOfCredits + 1;
        }else if (fnbTotal > 0){
            numberOfCredits = numberOfCredits + 1;
        }else if (InvestecTotal > 0) {
            numberOfCredits = numberOfCredits + 1;
        }
        var creditZerosToAdd = debitSize - numberOfCredits.toString().length;
        // console.log(unpaidValueZerosToAdd)

        const emptyCreditdArray = new Array(creditZerosToAdd).fill(0);
        // console.log(unpaidValueZerosToAdd);
        var creditValue1 = emptyCreditdArray.join('');
        var debitValue2 = creditValue1 + numberOfDebits;
        // console.log(unpaidValue2);
        const numberOfCreditRecords = debitValue2;
        // console.log(numberOfCreditRecords);



        // Values
        // valueOfCDebitRecords
        // console.log("total debits: " + totalValueOfDebits);
        var debitValueSize = 16; // Specify the desired size of the array
        var debitValueZerosToAdd = debitValueSize - totalValueOfDebits.toString().length;
        // console.log(unpaidValueZerosToAdd)

        const emptyDebitValuedArray = new Array(debitValueZerosToAdd).fill(0);
        // console.log(unpaidValueZerosToAdd);
        var debitValueValue1 = emptyDebitValuedArray.join('');
        var debitValueValue2 = debitValueValue1 + totalValueOfDebits;
        // console.log(unpaidValue2);
        const valueOfCDebitRecords = debitValueValue2;
        // console.log(valueOfCDebitRecords);

        const valueOfCReditRecords = valueOfCDebitRecords;


        // hashTotal
        hashTotal = hashHomingTotal;
        var hashSize = 12; // Specify the desired size of the array
        var hashZerosToAdd = hashSize - hashHomingTotal.toString().length;
        // console.log(unpaidValueZerosToAdd)

        const emptyHashdArray = new Array(hashZerosToAdd).fill(0);
        // console.log(unpaidValueZerosToAdd);
        var hashValue1 = emptyHashdArray.join('');
        var hashValue2 = hashValue1 + hashHomingTotal;
        // console.log(unpaidValue2);
        totalHashRecord = hashValue2;
        // console.log(totalHashRecord);


        // nintyFilelr
        const nintyFilelr = "                                                                                          ";

        
        trailerControlRecordData = tcRecordIdentifiir + formattedYYDate + serviceType + subServiceType + userDestination + numberOfOutputFiles+
        numberOfCreditRecords + numberOfDebitRecords + valueOfCReditRecords + valueOfCDebitRecords + totalHashRecord + nintyFilelr;
    };

    
    const endOfFileRecord = () => {
        // efrRecordIdentifier
        const efRrecordIdentifier = "99";

        // efrNUmberOfRecords
        const efrNUmberOfRecords = "000009";

        // sourceIdentifier
        const sourceIdentifier = "00000000";

        // thirtyTwoSpaces
        const thirtyTwoSpaces = "                                ";


        endOfFileRecordData = efRrecordIdentifier + formattedDate + serviceType + subServiceType + userDestination + efrNUmberOfRecords + sourceIdentifier + thirtyTwoSpaces + totalHashRecord;

    }


    controlRecord();
    StandardTransactionRecord();
    consolidatedRecord();
    trailerControlRecord();
    endOfFileRecord();
    

    

    async function appendToFile(output, content) {
        // Use 'a' flag to append content to the file
        try {
            await fs.writeFile("output.txt", content + '\n', { flag: 'a' }, (err) => {
                if (err) {
                  console.error('Error appending to file:', err);
                  return;
                }
                console.log('Content appended to file successfully.');
            });
        }catch(error) {
            console.log(error);
        };
    }


    // async function processData (){
    //     try {
    //         await fs.writeFile('output.txt', controlRecordData);
    //         await fs.writeFile('output.txt', consolidatedRecordData);
    //         await fs.writeFile('output.txt', trailerControlRecordData);
    //         await fs.writeFile('output.txt', endOfFileRecordData);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // processData();

    // appendToFile("output.txt", standardTransactionRecordData );
    // appendToFile("output.txt", controlRecordData );
    // // // appendToFile("output.txt", standardTransactionRecordData );
    // appendToFile("output.txt", consolidatedRecordData );
    // appendToFile("output.txt", trailerControlRecordData );
    // appendToFile("output.txt", endOfFileRecordData );


    async function writeTostandard (){
        let filteredArray = standardTransactionRecordDataArray.filter(Boolean);
        
            for (let i = 0; i < filteredArray.length; i++)
            {
                //console.log(filteredArray[i]);
                //appendToFile("output.txt", standardTransactionRecordDataArray[i] );
                await appendToFile("output.txt", filteredArray[i].toString() );
            }
            //console.log(standardTransactionRecordDataArray);
            
        }



    async function runMethodsInSequence() {
        try {
            
          await appendToFile("output.txt", controlRecordData );
          //StandardTransactionRecord();standardTransactionRecordDataArray
          await writeTostandard();
          await appendToFile("output.txt", consolidatedRecordData );
          await appendToFile("output.txt", trailerControlRecordData );
          await appendToFile("output.txt", endOfFileRecordData );
          // Continue with other methods sequentially as needed
        } catch (error) {
          console.error('Error:', error);
        }
      }

      runMethodsInSequence();


};

processData();


