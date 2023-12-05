  const StandardTransactionRecord = () => {
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
    originalSequenceNumber = fileString.substring(osnStartColumn, osnEndColumn).trim(); // Extracting the data within the specified columns


    //  originalHomingBranch
    const ohbStartColumn = 29; // Starting position of the desired column
    const ohbEndColumn = 35; // Ending position of the desired column
    originalHomingBranch = fileString.substring(ohbStartColumn, ohbEndColumn).trim(); // Extracting the data within the specified columns


    //  originalHomingAccountNumber
    const ohanStartColumn = 35; // Starting position of the desired column
    const ohanEndColumn = 46; // Ending position of the desired column
    originalHomingAccountNumber = fileString.substring(ohanStartColumn, ohanEndColumn).trim(); // Extracting the data within the specified columns


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


  }