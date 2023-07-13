import React, { useContext } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native'
import {Formik} from 'formik'
import axios from 'axios'
import { MyContext } from '../../globale/ContextState'


const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
    {children}
  </TouchableWithoutFeedback>
);



const AddArticle = ({ navigation, dismisModal }) => {
        const {
            myArticles, 
            setMyArticles,
        } = useContext(MyContext)
    
    return (
        // <HideKeyboard>
            <View>
                <Formik
                    initialValues={{
                        title: '',
                        price: 0,
                        content: '',
                        picture: ''
                    }}
                    onSubmit={async (values, actions) => {
                        try {
                            await axios.post(`http://localhost:8000/products/`, values)
                            actions.resetForm();
                            const res = await axios.get('http://127.0.0.1:8000/products/')
                            setMyArticles(res.data.results)
                            dismisModal()
                            navigation.push('HomeScreen');
                        } 
                        catch {
                            (error)=> (console.log(error))
                        }
                    }}
                >
                    {(props) => (
                        <View >
                            <View style={styles.container}>
                                <Text style={styles.title}>Add Article</Text>
                            </View>
                            <TextInput
                                placeholder='Title'
                                style={styles.input}
                                onChangeText={props.handleChange('title')}
                                value={props.values.title}                     
                            />
                            <TextInput
                                placeholder='Price'
                                style={styles.input}
                                onChangeText={props.handleChange('price')}
                                value={props.values.price}
                                keyboardType="numeric"
                            />  
                            <TextInput
                                placeholder='WEB Image URL'
                                style={styles.input}
                                onChangeText={props.handleChange('picture')}
                                value={props.values.picture}
                            />  
                            <TextInput
                                placeholder='Descriptions'
                                style={styles.input}
                                onChangeText={props.handleChange('content')}
                                value={props.values.content}
                                multiline
                                numberOfLines={4}
                                maxLength={40}
                            />  
                            <Button
                                onPress={props.handleSubmit}
                                title="Save"
                                color="#841584"
                                // accessibilityLabel="Learn more about this purple button"
                                />
                        </View>
                        )}
                </Formik>
                <Button 
                    title='Go Back'
                    onPress={()=> (navigation.goBack())}
                />
        </View>
    //   </HideKeyboard>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 12,
        
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    title: {
        fontWeight: '700',
        fontSize: 30,
    }
    
});

export default AddArticle