const { NextResponse } = require("next/server");

export const getNextResponse=(mesageText,statuscode,successStatus)=>{

 return NextResponse.json({
    message: mesageText,
    sucess: successStatus,

 },{
    status:statuscode,
 })
}