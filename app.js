const fs = require("fs/promises");

(async () => {
    const length = 0;

    const createFile = async (path) => {
        try {
            const existingFileHandle = await fs.open(path, "r");
            existingFileHandle.close();
            return console.log(`The file ${path} already exists...`);
        } catch (error) {
            const newFileHandle = await fs.open(path, "w");
            console.log("A new file was created successfuly...");
            newFileHandle.close();
        }
    }

    const renameFile = async (oldPath, newPath) => {
        try {
            await fs.rename(oldPath, newPath);
            console.log("File renamed successfuly...");
        } catch (error) {
            console.log(error);
        }
    }

    let addedContent;
    const addToFile = async (path, content) => {
        if (addedContent === content) {
            return;
        }
        try {
            const fileHandle = await fs.open(path, "a");
            fileHandle.write(content);
            addedContent = content;
        } catch (error) {
            console.log(error)
        }
    }


    // Test
    const copyText = async (path, ) => {
        try {
            const copyTheText = await fs.open(path, "a");
            copyTheText.write()
        } catch (err) {
            
        }
    }


    const deleteFile = async (path) => {
        try {
            await fs.unlink(path);
        } catch (error) {
            if (error.code === "ENOENT") {
                console.log("No file at this location to remove.");
            } else {
                console.log(error);
            }
        }
    }

    // commands
    const READ_FILE = "read a file"
    const CREATE_FILE = "create a file";
    const RENAME_FILE = "rename the file"
    const ADD_TO_FILE = "add to the file"
    const DELETE_FILE = "delete the file"

    //  Standard Transaction Record - File specification data
    const recordIdentifier = "";




    const originalUserBranch = "";
    const originalNominatedAccountNumber = "";
    const userCode = "";
    const originalSequenceNumber = "";
    const originalHomingBranch = "";
    const originalHomingAccountNumber = "";
    const originalAccountType = "";
    const originalAmount = "";
    const originalActionDate = "";
    const orignalClassEntry = "";
    const originalTaxCode = "";
    const reasonForUnpaid = "";
    const filler = "";
    const originalUserReference = "";
    const originalHomingAccountName = "";
    const newBrunchNumber = "";
    const newAccountNumber = "";
    const newAccountType = "";
    const newSequenceNumber = "";
    const numberOfTimeRedirected = "";
    const originalHomingInstitution = "";
    const twelveFiller = "";

    //  Consolidation Record - File specification data
    const consolidatedRecordIdentifier = "";
    const bankSuspenseAccountBranch = "";
    const bankSuspenseAccountNumber = "";
    const consolidatedSequenceNumber = userCode + 1
    const fourFiller = "";
    const batchReferenceInputCenter = "";
    const submittedBankMemberNumber = "";
    const originalTapeGenerationNumber = "";
    const numberOfUnpaidTransactions = "";
    const nineFiller = "";
    const usersNominatedAccountName = "";
    const thirtySixFiller = "";
    const homingInstitution = "";
    
    //  Control Record - File specification data
    const controlIdentifier = "";
    const outPutDate = "";
    const serviceType = "";
    const subServiceType = "";
    const memberNumber = "";
    const numberOfTransactionFiles = "";
    const numberOfCreditTransactions = "";
    const numberOfDebitTransactions = "";
    const valueOfCreditRecords = "";
    const valueOfDebitRecords = "";
    const hashTotal = "";
    const nintyFiler = ""; 

    //  End of File Record - File specifications
    const endOfRecordIdentifier = "";
    const processingDate = "";
    const userDestinataion = "";
    const numberOfRecords = "";
    const sourceIdentifier = "";
    const encryptedWorkingKey = "";
    nintyFourFiller = 


    const commandFileHandler = await fs.open("./command.txt", "r");
    const watcher = fs.watch("./ACB_EXAMPLE_TEST0270.txt");

    commandFileHandler.on("change", async () => {
        // get the file size 
        const size = (await commandFileHandler.stat()).size;
        // allocate the buffer with the size of the file
        const buff = Buffer.alloc(size);
        // the location at which we want to start filling our buffer
        const offset = 0;
        // how many bytes we want to read
        const length = size;
        // the position that we want to start reading from
        const position = 0;

        // We then want to read the contents of the file fro position 0 to the end
        await commandFileHandler.read(buff, offset, length, position);

        const command = buff.toString("utf-8"); 

        // create a file
        // create a file <absolute/relative path>
        if (command.includes(CREATE_FILE)) {
            const filePath = command.substring(CREATE_FILE.length + 1);
            createFile(filePath);
        }

        // add to the file
        // update to the file <apth> this content: <contnent>
        if (command.includes(ADD_TO_FILE)) {
            const _idx = command.indexOf(" this content: ");
            const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
            const fileContent = command.substring(_idx, 15);
            addToFile(filePath, fileContent);
        }

        if (command.includes("copy text")) {
            const startColumn = 7; // Starting position of the desired column
            const endColumn = 14; // Ending position of the desired column
            const extractedData = row.substring(startColumn, endColumn).trim(); // Extracting the data within the specified columns
            console.log(extractedData);
            copyText(path)
        }

        // rename the file
        // rename the file <apth> to <path>
        if (command.includes(RENAME_FILE)) {
            const _idx = command.indexOf(" to ");
            const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx);
            const newFilePath = command.substring(_idx + 4);
            renameFile(oldFilePath, newFilePath);
        }

        // delete a file
        // delete the file <path>
        if (command.includes(DELETE_FILE)) {
            const filePath = command.substring(DELETE_FILE.length + 1);
            deleteFile(filePath);
        }
    })

    // watcher...
    for await (const event of watcher) {
        if (event.eventType === "change" && event.filename === "command.txt") {
            commandFileHandler.emit("change");
        }
    }
})();