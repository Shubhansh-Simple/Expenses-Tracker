/*
 * Method For Transaction Page
 * which makes the main file
 * clean and short.
 */

export function iconTitleSelector( data:string ){
  /*
   * All-Credit-Debit
   * Icon Name
   * Title
   */
  if( data==='0' ){
    return {
      'icon':'arrow-bottom-left',
      'title' : 'Credit',
    }
  }
  else if( data==='1' ){
    return {
      'icon':'arrow-top-right',
      'title' : 'Debit',
    }
  }
  else{
    return {
      'icon':'arrow-top-right-bottom-left',
      'title' : 'All',
    }
  }
}

export function nextIteration( data:string ){
  /*
   * LIST iteration from 0-to-end-to-0
   */
  let x = Number(data)
  { x===2 
      ? 
    x=x-2 
      : 
    x=x+1 }
  return x.toString()
}

export function categoryQuerySelection( data:number ){
  /*
   * Return Query for filtering
   * Transaction List as per
   * category selection
   */
  if (data===0) {
    return ''
  }
  else{
    return ' AND CREDIT.source_name_id='+data.toString()
  }
}


export function NoDataTitle( data:string ){
  /*
   * Decide Title
   * of NoDataFound 
   * component using queryContainer 
   * local storage
   */
  switch (data){
    case '0' : {
      return 'No Credit Transaction Found!'
      break;
    }
    case '1' : {
      return 'No Debit Transaction Found!'
      break;
    }
    case '2' : {
      return 'No Transaction Found!'
      break;
    }
    default : {
      console.log('Exception in component/Transaction/CleanCode/NoDataTitle')
      break;
    }
  }

}



