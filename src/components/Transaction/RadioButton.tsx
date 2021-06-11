import React,{useState, useEffect} from 'react';

import { View, 
         StyleSheet } from 'react-native';

import RadioPerButton from './RadioPerButton';


const RadioButton = ({ radioBtnClick }) => {

  const [ colorOne, setColorOne ]     = useState(true)
  const [ colorTwo, setColorTwo ]     = useState(false)
  const [ colorThree, setColorThree ] = useState(false)

  useEffect( ()=>{
    /*
     * we want to keep
     * slider at 'All' section
     * on first time
     * opening app
     */
    setColorOne(true)
    setColorTwo(false)
    setColorThree(false)
  },[])

  return (
    <View style={ styles.radioContainer }>

      <RadioPerButton 
        buttonId='2'
        buttonText='All' 
        isColorChange={colorOne}
        buttonClick={ (id:string)=>{ setColorOne(true)
                                     setColorTwo(false)
                                     setColorThree(false)
                                     radioBtnClick(id)
                                   }}
      />


    </View>
  )
};

const styles = StyleSheet.create({
  radioContainer : {
    flexDirection : 'row',
    backgroundColor : '#ffe6b5',
    borderColor : '#ffe6b5',
    borderRadius : 13,
    justifyContent : 'space-around',
    marginTop : 20,
  },
 
});

export default RadioButton;


