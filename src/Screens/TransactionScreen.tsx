import React,{ useEffect, useState, useRef } from 'react';

import { View, 
         Text,
         TouchableOpacity,
         FlatList,
         RefreshControl,
         StyleSheet } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import SegmentButton        from '../components/Transaction/SegmentButton';
import { iconTitleSelector,
         NoDataTitle,
         nextIteration,
         categoryQuerySelection
       }                    from '../components/Transaction/CleanCode';

// LOCAL
import NoDataFound          from '../components/NoDataFound';
import TransactionIcon      from '../components/Transaction/TransactionIcon';
import ActionSheet          from '../components/ActionSheet';
import flatListInterface    from '../Interfaces/Interface';
import reuseStyle           from '../Styles/reuseStyle';
import {listItemMaker}      from '../CleanCode/CleanCode';

// DATABASE QUERY
import { credit,  
         pocket, 
         source }    from '../database_code/sqlQueries';

import queryExecutor        from '../database_code/starterFunction';


const TransactionScreen = () => {

  /*****************
   * REACT'S STATE *
   *****************/

  const [ refreshing, setRefreshing ]           = useState(false)
  const [ creditData, setCreditData ]           = useState([])
  const [ showDescription, setShowDescription ] = useState(false) 

 // FIRST SEGMENT BUTTON
  const [ buttonId, setButtonId ]         = useState('2')
  const [ creditDebit, setCreditDebit ]   = useState({
                                             'icon':'arrow-top-right-bottom-left',
                                             'title' : 'All',
                                           })

  // SECOND SEGMENT BUTTON
  const [ showSourceModal, setShowSourceModal ] = useState(false)
  const [ sourceOptions, setSourceOptions ]     = useState([])
  const [ categoryState, setCategoryState ]    = useState({ 'id'  : 0, 
                                                'source_name' : 'All-Categories'})

  // DEL TRANSACTION
  const [ showDelete, setShowDelete ] = useState(false)
  const [ deleteItem, setDeleteItem ] = useState<flatListInterface[]>([])

  const [ description, setDescription ] = useState('')
  const [ creditType, setCreditType ]   = useState('')
  const [ remainBal, setRemainBal ]     = useState<flatListInterface[]>([])

  const [ pocketBal, setPocketBal ]  = useState({})

  
  const queryContainer  = useRef(['2','0'])
  const creditContainer = useRef({})


  /*********************
   * DATABASE FUNCTION *
   *********************/

  const readingCredit = ( creditDebitFilter : string,
                          categoryFilter    : number = 0 ) => {
      /*
       * READING TABLE 
       * as per filter
       * applied
       */
      let x : string[] = [creditDebitFilter, categoryFilter.toString() ]
      queryContainer.current = x

      let completeCategoryFilter = categoryQuerySelection(categoryFilter)

      queryExecutor( credit.readCreditQuery + 
                     creditDebitFilter      +
                     completeCategoryFilter + 
                     credit.addOrdering,
                     null,
                     'Credit-R',
                     databaseData=>setCreditData(databaseData)
                   )
  }

  const readingSource = () => {
    /*
  	 * READING FROM
  	 * SOURCE TABLE
  	 */

    queryExecutor( source.readSourceQuery,
                   null,
                   'Source-R',
                   databaseData=>setSourceOptions(
                            listItemMaker('All-Categories',0 ).concat(databaseData) 
                                 )
                 )
  }

  const readingPocket = () => {
    /*
     * READING Pocket
     * table
     */
    queryExecutor( pocket.readPocketQuery+' WHERE id=1',
                   null,
                   'Pocket-R',
                   databaseData=>setPocketBal({
                                   'currentBal' : databaseData[0].currentBal,
                                   'cashBal'    : databaseData[0].cashBal,
                                   'onlineBal'  : databaseData[0].onlineBal
                                 })
                 )
  }

  const insertPocket = ( credit_amount : number,
                         is_credit     : number,
                         credit_type   : string ) => {

    /*
     * UPDATING Pocket Data
     * after deleting the transaction
     */

    var cashAmt   = pocketBal.cashBal
    var onlineAmt = pocketBal.onlineBal

    if ( is_credit ){
      var totalAmt = pocketBal.currentBal - credit_amount

      { credit_type==='cash' 
          ? 
        cashAmt = pocketBal.cashBal-credit_amount  
          :
        onlineAmt = pocketBal.onlineBal-credit_amount 
      }

    }
    else{
      var totalAmt = pocketBal.currentBal + credit_amount

      { credit_type==='cash' 
          ? 
        cashAmt = pocketBal.cashBal+credit_amount  
          :
        onlineAmt = pocketBal.onlineBal+credit_amount 
      }

    }

    queryExecutor( pocket.updatePocketQuery,
                   [ totalAmt, cashAmt, onlineAmt ],
                   'Pocket-U',
                   databaseData=>console.log('Checkout Homepage')
                 )
  } 


  const deleteCredit = ( itemId:number ) => {

    queryExecutor( credit.deleteCreditQuery, 
                   [itemId ],
                   'Credit-D',
                   databaseData=>{
                     readingCredit(queryContainer.current[0], 
                                   Number(queryContainer.current[1])
                                  )
                     insertPocket( creditContainer.current.credit_amount,
                                   creditContainer.current.is_credit,
                                   creditContainer.current.credit_type
                     )
                   }
                 )
  }

  /********************
   * REFRESH FUNCTION *
   ********************/

  const onRefresh = React.useCallback( ()=> {
   /*
    * because we want the old state query value
    * for refreshing the page.
    */
   setRefreshing(true)
   readingCredit(queryContainer.current[0],Number(queryContainer.current[1]))
   setRefreshing(false)

   console.log('You refresh the page actually.')
    
  },[refreshing] )


  /*******************
   * HELPER FUNCTION *
   *******************/

  function actionDataSetter( isVisible        :boolean,
                             descriptionData  :string,
                             credit_type      :string,
                             remainBal        :number ){
    /*
     * Setting state for 
     * title,
     * description,
     * remain balance,
     */

    setShowDescription( isVisible ),
    setDescription( descriptionData )
    setCreditType( credit_type )
    setRemainBal( 
      listItemMaker(
        remainBal.toString(),
        '1',
        'Remaining Balance -',
        'Rs'
      )
    )
  }

  function onDeleteSetter( data:object ){
    /*
     * Setting State for
     * Deleting Credit
     */

    setDeleteItem(
      listItemMaker(
        data.source_name+"'s",
        data.id,
        'Delete',
        'Entry'
      )
    )
    setShowDelete( true )

    creditContainer.current = {
      'credit_amount' : data.credit_amount,
      'is_credit'     : data.is_credit,
      'credit_type'   : data.credit_type,
    }
  }

  /***************
   * USE EFFECTS *
   ***************/

  useEffect( ()=> {
    /*
     * We want all the data
     * of transaction 
     * on first time
     * opening app
     */
    readingCredit('2',0)

  },[])


  useEffect( ()=>{
    /*
     * Changing icons & title
     * as per localStorage 
     * button selected
     */

    queryContainer.current = [ buttonId, queryContainer.current[1]]

    setCreditDebit( 
      iconTitleSelector(buttonId) 
    )

    readingCredit( buttonId,categoryState.id )

  },[buttonId])

  useEffect( ()=>{
    /*
     * Changing title
     * as per localStorage 
     * button selected
     */
    
    queryContainer.current = [ queryContainer.current[0], 
                               categoryState.id ]

    readingCredit( buttonId,categoryState.id )

  },[categoryState])

  useEffect( ()=> {
    /*
     * we want pocket balance only
     * on opening the delete popup opens
     */
    { showDelete ? readingPocket() : null }
    
  },[showDelete])


  useEffect( ()=> {
    /*
     * we want source data only
     * on opening the Source ActionSheet
     */
    { showSourceModal ? readingSource() : null }
    
  },[ showSourceModal ])


  return (
    <View style={{ flex : 1}}>
      <View style={ styles.homeStyle }>

        {/* SOURCE SELECTION FOR FILTER */}
        <ActionSheet 
          sheetTitle        ='Choose a category'
          sheetDescription  ='Filter the transaction as per source selected'
          listItemColor     ='#0095ff'
          sheetData         ={sourceOptions}
          sheetVisible      ={showSourceModal}
          setSheetVisible   ={ (bool:boolean)=>setShowSourceModal(bool) }
          sheetSelectedItem ={ item=>{
            console.log('The state is - ',item)
            setCategoryState(item) }
          }
        />

        {/* SEGMENT BUTTONS */}
        <View style={ styles.segmentContainer }>
          <SegmentButton 
            segmentIcon={creditDebit.icon}
            segmentName={creditDebit.title}
            buttonId={buttonId}
            callBack={ (id:string)=>setButtonId( nextIteration(id) ) }
          />
          <SegmentButton 
            segmentIcon='account-supervisor-circle'
            segmentName={categoryState.source_name.slice(0,15)}
            buttonId={true}
            callBack={ (bool:boolean)=>setShowSourceModal(bool) }
          />
          <SegmentButton 
            segmentIcon='clock-time-eight-outline'
            segmentName='Dates'
            buttonId={2}
            callBack={ ()=>{} }
          />
        </View>

        {/* CONDITIONAL CODE */}
        { creditData.length === 0 
            ?
          <NoDataFound 
            dataTitle={ NoDataTitle(queryContainer.current[0]) }
            dataDescription='Kindly make a transaction first'
            emojiName='emoji-sad' 
            emojiSize={84}
            callBack={ ()=>readingCredit( queryContainer.current[0],
                                          Number(queryContainer.current[1]) )}
          />
            :

          <View>

            {/* SHOW DESCRIPTION MODAL */}
            <ActionSheet 
              sheetTitle       ={creditType.toUpperCase()+' Payment'}
              sheetDescription ={ description }
              listItemColor    ='#0095ff'
              sheetData        ={remainBal}
              sheetVisible     ={ showDescription }
              setSheetVisible  ={ (bool:boolean)=>setShowDescription(bool) }
              sheetSelectedItem={ item=>setShowDescription(false) }
            />

            {/* ARE YOU DELETE COMPONENT */}
            <ActionSheet 
              sheetTitle       = 'Are You Sure ?'
              sheetDescription = "You can't undo this action."
              listItemColor    = 'red'
              sheetData        = { deleteItem }
              sheetVisible     = { showDelete }
              setSheetVisible  = { (bool:boolean)=>setShowDelete(bool) }
              sheetSelectedItem= { item=>deleteCredit(item.id) }
            />

            <FlatList 
              data={creditData}
              keyExtractor={ item=>item.id.toString() }
              refreshControl={
                <RefreshControl 
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              showsVerticalScrollIndicator={false}
              renderItem={(element)=>{

                return (
                  <View style={[styles.itemContainer, reuseStyle.bgShadow ]}>

                    {/* Decide Icons */}
                    <TouchableOpacity 
                      onPress={ ()=>onDeleteSetter(element.item) }>

                      <TransactionIcon 
                        source_name={element.item.source_name}
                        is_credit = {element.item.is_credit}
                      />
                    </TouchableOpacity>

                    <View style={{ 'alignItems' : 'flex-end' }}>

                      <Text style={ styles.itemStyle }>
                        {element.item.credit_amount}Rs
                      </Text>
            
                      <TouchableOpacity onPress={ ()=>{
                                                  actionDataSetter(
                                                    true,
                                                    element.item.credit_description,
                                                    element.item.credit_type,
                                                    element.item.remain_bal,
                                                   )
                                               }}>
                        <MaterialCommunityIcons 
                          name="comment-eye-outline" 
                          size={24} 
                          color="black" 
                          style={{ paddingTop:5 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              }}
            />
          </View>
        } 
      </View>
    </View>
  )  
};

const styles = StyleSheet.create({

  homeStyle : {
    flex : 1,
    alignItems : 'stretch',
    marginHorizontal : 20,
    fontSize : 40,
  },

  itemContainer : {
    flexDirection : 'row',
    padding : 10,
    marginVertical : 10,
    borderRadius : 8,
    backgroundColor : '#ffe6b5',
    justifyContent : 'space-between',
  },

  itemStyle : {
    fontSize : 17,
    fontWeight : 'bold',
  },

  itemDescription : {
    fontSize : 13,
    fontWeight : 'bold',
    textTransform : 'capitalize',
  },

  segmentContainer : {
    flexDirection  : 'row',
    justifyContent : 'space-around',
    backgroundColor: 'white',
    marginTop : 20,
    borderRadius   : 30,
    paddingTop : 3
  }
});

export default TransactionScreen;
