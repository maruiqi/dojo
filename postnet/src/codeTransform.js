let _ = require('lodash');
"use strict";
let {loadAllBarcodes}= require('../src/allBarcodes');
function _getExitElementCodeBy(array, completePosCode) {
    return array.find(allBarcode=>allBarcode.postcode === completePosCode)
}
function _getExitElementPosBy(array, barcode) {
    return array.find(allBarcode=>allBarcode.barcode === barcode)
}
// function getFormalPostCode(postCodes) {
//     return _(postCodes)
//         .replace('-', '');
// }
//function buildPostCodeArray(formattedPostCodes) {
    //return formattedPostCodes.split('').map(x=>parseInt(x));
//}
function getCheckDight(postCodesArray) {
    let sum = _.chain(postCodesArray)
        .sum()
        .value();
    let dight = sum % 10;
    postCodesArray.push(dight);
    return postCodesArray;
}
function transForm(completePosCodes, allBarcodes) {
    return "|" + completePosCodes.map((completePosCode)=> {
            let x = _getExitElementCodeBy(allBarcodes, completePosCode);
            return x.barcode;
        }).join("") + "|";

}
function  Check(input) {
        let array = input.split(' ');
        let flag = false;
        let flagArray = [];
        if (input.length === 5 || input.length === 9 || input.length === 10) {
            if (input.includes('-')) {
                let temp = input.split('-');
                if (temp.length === 2) {
                    if (temp[0].length === 5) {
                        flagArray = array.filter(x=> {
                            if (x >= 0 && x <= 9) {
                                return x;
                            }
                        })
                        if (flagArray.length === input.length - 1) {
                            flag = true;
                        }
                    }
                }
            }
            else {
                flagArray = array.filter(x=> {
                    if (x <= 9 && x >= 0) {
                        return x;
                    }
                })
                if (flagArray.length = input.length) {
                    flag = true;
                }
            }
        }
        return flag;

}
function getFormalPostCode(input){
  return  _(input)
        .replace('-','');
}
function buildPostCodeArray(input) {
    let line=[];
     input.split('');
    for(let x of input){
         x=parseInt(x);
        line.push(x);
    }
    return line;
}
function postcodeString(inputs) {
    let flag = Check(inputs);
    let result;
    if (flag === true) {
        let formattedPostCodes = getFormalPostCode(inputs);
        let postCodeArray = buildPostCodeArray((formattedPostCodes));
        let completePosCodes = getCheckDight(postCodeArray);
        let allBarcodes = loadAllBarcodes();
        result = transForm(completePosCodes, allBarcodes);

    }
    else {
        result = 'error!';
        //console.log('error!');
    }
    require('fs').writeFileSync('2.txt', result);
    return result;
}
module.exports = {
    buildPostCodeArray: buildPostCodeArray,
    getFormalPostCode: getFormalPostCode,
    getCheckDight: getCheckDight,
    transForm: transForm,
    Check: Check,
    getFormalBarcode: getFormalBarcode,
    chunkFormattedBarcode: chunkFormattedBarcode,
    transformToPoscode: transformToPoscode,
    checkBarcode: checkBarcode,
    postcodeString: postcodeString,
    barcodeString: barcodeString
};
function getFormalBarcode(barcodes) {
    let formattedBarcodes = barcodes.split('');
    return _.chain(formattedBarcodes)
        .drop()
        .dropRight()
        .value();
}
function chunkFormattedBarcode(barcodes) {
    return _.chunk(barcodes, 5);
}
function transformToPoscode(chunkedBarcodes, allBarcodes) {
    let barcodes = _.chain(chunkedBarcodes)
        .map(x=>x.join(''))
        .value();
    return _.chain(barcodes)
        .map(barcode=> {
            let element = _getExitElementPosBy(allBarcodes, barcode);
            return element.postcode
        })
        .dropRight()
        .join('')
        .value();
}
function checkBarcode(barcodes, allBarcodes) {
    let flag = false;
    let array = barcodes.split('');
    //console.log(array);

    if (array[0] === '|' && array[array.length - 1] === '|') {
        let noarray = _.chain(array)
            .drop()
            .dropRight()
            .value();

        //console.log(noarray.length)

        if (noarray.length === 30 || noarray.length === 50) {
            let newArray = _.chunk(noarray, 5);
            _.chain(newArray)
                .join('')
                .value();
            //    console.log(newArray)
            let maruiqi = newArray.map(element=> {
                return element.join('');
            });
            //console.log(maruiqi)
            let finallyArray = maruiqi.filter(x=> {
                let y = _getExitElementPosBy(allBarcodes, x);
                if (y) {
                    return y.barcode;
                }
            });
            //console.log(finallyArray)
            if (finallyArray.length === maruiqi.length) {
                flag = true;

            }
        }
        // console.log(allBarcodes);
        //console.log(finallyArray)

    }

    return flag;

}
function barcodeString(inputs) {
    let result;
    let allBarcodes = loadAllBarcodes();
    let flag = checkBarcode(inputs, allBarcodes);
    if (flag === true) {
        let barcodes = getFormalBarcode(inputs);
        let chunkedBarcodes = chunkFormattedBarcode(barcodes);
        result = transformToPoscode(chunkedBarcodes, allBarcodes)

    }
    else {
        //console.log('u r wrong=_=');
        result = 'error!'
    }
    require('fs').writeFileSync('2.txt', result);
    return result;
}
