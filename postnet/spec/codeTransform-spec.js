let {checkBarcode, barcodeString,Check, transformToPoscode, postcodeString, chunkFormattedBarcode, getFormalBarcode,  getFormalPostCode, buildPostCodeArray, getCheckDight, transForm} = require('../src/codeTransform');
let {loadAllBarcodes} = require('../src/allBarcodes');
describe('transform test', ()=> {
    it('#2should getFormalPostCode test', ()=> {
        let postCodes = '45056-1234';
        let formattedPostCodes = getFormalPostCode(postCodes);
        let expected = '450561234';
        expect(formattedPostCodes).toEqual(expected);

    });
    it('#3should buildPostCodeArray test', ()=> {
        let formattedPostCodes = '450561234';
        let postCodesArray = buildPostCodeArray(formattedPostCodes);
        let expected = [4, 5, 0, 5, 6, 1, 2, 3, 4];
        expect(postCodesArray).toEqual(expected);
    });
    it('#4should getCheckDight test', ()=> {
        let postCodesArray = [4, 5, 0, 5, 6, 1, 2, 3, 4];
        let completePostCodes = getCheckDight(postCodesArray);
        let expected = [4, 5, 0, 5, 6, 1, 2, 3, 4, 0];
        expect(completePostCodes).toEqual(expected);
    });
    it('#5should transForm test', ()=> {
        let completePosCodes = [4, 5, 0, 5, 6, 1, 2, 3, 4, 0];
        let allBarcodes = loadAllBarcodes();
        let barcodes = transForm(completePosCodes, allBarcodes);
        let expected = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        expect(barcodes).toEqual(expected);
    });
    xit('#1.1shuould check test ', ()=> {
        let input = '45056-#**4';
        let a=new Check;
        let b = a. ca(input);
        let expected = false;
        expect(b).toEqual(expected);
    });
    xit('1.2shuould check test ', ()=> {
        let input = '123456789';
        let a = check(input);
        let expected = true;
        expect(a).toEqual(expected);
    });
    xit('1.3shuould check test ', ()=> {
        let input = '12345-6789';
        let a = check(input);
        let expected = true;
        expect(a).toEqual(expected);
    });
    it('#######1 shuould postcodeString test', ()=> {
        "use strict";
        let inputs = '45056-1234';
        let barcode = postcodeString(inputs);
        let expected = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        expect(barcode).toEqual(expected);
    });
    it('#######2 shuould postcodeString test', ()=> {
        "use strict";
        let inputs = '450-561234';
        let barcode = postcodeString(inputs);
        let expected = 'error!';
        expect(barcode).toEqual(expected);
    });

    it('#######3 shuould postcodeString test', ()=> {
        "use strict";
        let inputs = '12345';
        let barcode = postcodeString(inputs);
        let expected = '|:::||::|:|::||::|::|:|:|::|:|:|';
        expect(barcode).toEqual(expected);
    });

    it('#######5 shuould postcodeString test', ()=> {
        "use strict";
        let inputs = '45056--234';
        let barcode = postcodeString(inputs);
        let expected = 'error!';
        expect(barcode).toEqual(expected);
    });
    it('#######6 shuould postcodeString test', ()=> {
        "use strict";
        let inputs = '12345678910';
        let barcode = postcodeString(inputs);
        let expected = 'error!';
        expect(barcode).toEqual(expected);
    });
    it('#######7 shuould postcodeString test', ()=> {
        "use strict";
        let inputs = '***';
        let barcode = postcodeString(inputs);
        let expected = 'error!';
        expect(barcode).toEqual(expected);
    });
    it('#######8 shuould postcodeString test', ()=> {
        "use strict";
        let inputs = '12345678';
        let barcode = postcodeString(inputs);
        let expected = 'error!';
        expect(barcode).toEqual(expected);
    });
    it('#######9 shuould postcodeString test', ()=> {
        "use strict";
        let inputs = '1-2-345678';
        let barcode = postcodeString(inputs);
        let expected = 'error!';
        expect(barcode).toEqual(expected);
    })
    it('#######10 shuould postcodeString test', ()=> {
        "use strict";
        let inputs = '123456789';
        let barcode = postcodeString(inputs);
        let expected = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
        require('fs').writeFileSync('1.txt',expected);
        expect(barcode).toEqual(expected);
    })
    it('#######11 shuould postcodeString test', ()=> {
        "use strict";
        let inputs = '1-234';
        let barcode = postcodeString(inputs);
        let expected = 'error!';
        expect(barcode).toEqual(expected);
    })



});
describe('back-transform test', ()=> {
    "use strict";
    it('#1 should checkBarcode test', ()=> {
        let barcodes = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        let allBarcodes = loadAllBarcodes();
        let result = checkBarcode(barcodes,allBarcodes);
        let expected = true;
        expect(result).toEqual(expected);
    });
    it('#1.2hould checkBarcode test', ()=> {
        let barcodes = ':|::|:|:|::::|:::::||:::||::|::|||:::|';
        let allBarcodes = loadAllBarcodes();
        let result = checkBarcode(barcodes,allBarcodes);
        let expected = false;
        expect(result).toEqual(expected);
    });
    it('#1.3hould checkBarcode test', ()=> {
        let barcodes = '|:|::|:|:|:||::::|:::||:::::c||::|:|::||::|::|||:::|';
        let allBarcodes = loadAllBarcodes();
        let result = checkBarcode(barcodes,allBarcodes);
        let expected = false;
        expect(result).toEqual(expected);
    });


    it('#2 should getFormalBarcode test', ()=> {
        let barcodes = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        let formattedBarcode = getFormalBarcode(barcodes);
        let expected = [':', '|', ':', ':', '|', ':', '|', ':', '|', ':', '|', '|', ':', ':', ':', ':', '|', ':', '|', ':', ':', '|', '|', ':', ':', ':', ':', ':', '|', '|', ':', ':', '|', ':', '|', ':', ':', '|', '|', ':', ':', '|', ':', ':', '|', '|', '|', ':', ':', ':'];
        expect(formattedBarcode).toEqual(expected)
    });
    it('#3should chunkFormattedBarcode test', ()=> {
        let formattedBarcodes = [':', '|', ':', ':', '|', ':', '|', ':', '|', ':', '|', '|', ':', ':', ':', ':', '|', ':', '|', ':', ':', '|', '|', ':', ':', ':', ':', ':', '|', '|', ':', ':', '|', ':', '|', ':', ':', '|', '|', ':', ':', '|', ':', ':', '|', '|', '|', ':', ':', ':'];
        let chunkedBarcodes = chunkFormattedBarcode(formattedBarcodes);
        let expected = [[':', '|', ':', ':', '|'], [':', '|', ':', '|', ':'], ['|', '|', ':', ':', ':'], [':', '|', ':', '|', ':'], [':', '|', '|', ':', ':'], [':', ':', ':', '|', '|'], [':', ':', '|', ':', '|'], [':', ':', '|', '|', ':'], [':', '|', ':', ':', '|'], ['|', '|', ':', ':', ':']];

        expect(chunkedBarcodes).toEqual(expected);
    });
    it('#4shuould transformToPoscode test', ()=> {
        let chunkedBarcodes = [[':', '|', ':', ':', '|'], [':', '|', ':', '|', ':'], ['|', '|', ':', ':', ':'], [':', '|', ':', '|', ':'], [':', '|', '|', ':', ':'], [':', ':', ':', '|', '|'], [':', ':', '|', ':', '|'], [':', ':', '|', '|', ':'], [':', '|', ':', ':', '|'], ['|', '|', ':', ':', ':']];
        let allBarcodes = loadAllBarcodes();
        let poscode = transformToPoscode(chunkedBarcodes, allBarcodes);
        let expected = '450561234';
        expect(poscode).toEqual(expected);
    });
    it('#######1 shuould barcodeString test', ()=> {
        "use strict";
        let inputs = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        let barcode = barcodeString(inputs);
        let expected = '450561234';
        expect(barcode).toEqual(expected);
    });
    it('#######1.1 shuould barcodeString test', ()=> {
        "use strict";
        let inputs = '|:|::|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        let barcode = barcodeString(inputs);
        let expected = 'error!';
        expect(barcode).toEqual(expected);
    });

    it('#######1.2 shuould barcodeString test', ()=> {
        "use strict";
        let inputs = '|:|::|:|:|:||::::|:|:|::||::|::|||:::|';
        let barcode = barcodeString(inputs);
        let expected = 'error!';
        expect(barcode).toEqual(expected);
    })
    it('#######1 shuould barcodeString test', ()=> {
        "use strict";
        let inputs = '|:|::|:|:|:||::::|:|::||::||:::|';
        let barcode = barcodeString(inputs);
        let expected = '45056';
        expect(barcode).toEqual(expected);
    })


}); 