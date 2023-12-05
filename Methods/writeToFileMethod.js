async function writeTostandard (){
    let filteredArray = standardTransactionRecordDataArray.filter(Boolean);
    
        for (let i = 0; i < filteredArray.length; i++)
        {
            //console.log(filteredArray[i]);
            //appendToFile("output.txt", standardTransactionRecordDataArray[i] );
            await appendToFile("output.txt", filteredArray[i].toString() );
        }
        //console.log(standardTransactionRecordDataArray);
        
    };

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

export {writeTostandard, appendToFile};