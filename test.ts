
function integrated(n1:number, func:(s:string)=>void) {
  const res = n1*2;
  func(res.toString())
}

integrated(12,(res)=>{console.log(res)});