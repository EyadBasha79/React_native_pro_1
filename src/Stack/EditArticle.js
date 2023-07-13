import React, { useContext } from 'react'

import { View, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native'
import {Formik} from 'formik'
import axios from 'axios'
import { MyContext } from '../../globale/ContextState'


const AddArticle = (props) => {    
    const {
            myArticles, 
            setMyArticles,
    } = useContext(MyContext)
    
    const data = props.route.params.article
    const articleId = data.id
    
    return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
                <Formik
                    initialValues={{
                        title: data.title,
                        price: data.price,
                        content: data.content,
                        picture: data.picture
                    }}
                    onSubmit={async (values, actions) => {
                        try {
                            await axios.put(`http://localhost:8000/products/${articleId.toString()}/`, values)
                            actions.resetForm();
                            const res = await axios.get('http://127.0.0.1:8000/products/')
                            setMyArticles(res.data.results)
                            props.navigation.push('HomeScreen');
                            // props.navigation.navigate('HomeScreen')
                        } 
                        catch {
                            (error)=> (console.log(error))
                        }
                    }}
                >
                    {(props) => (
                        <View>
                            <View style={styles.container}>
                                <Text style={styles.title}>Edit Article</Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange('title')}
                                value={props.values.title}                     
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange('price')}
                                value={props.values.price}
                                keyboardType="numeric"
                            />  
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange('picture')}
                                value={props.values.picture}
                            />  
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange('content')}
                                value={props.values.content}
                                multiline
                                numberOfLines={4}
                                maxLength={40}
                            />  
                            <Button
                                onPress={props.handleSubmit}
                                title="Edit"
                                color="#841584"
                                // accessibilityLabel="Learn more about this purple button"
                                />
                                    </View>
                            )}
                
                    
                </Formik>
                
            
                <Button
                    title='Go Back'
                    onPress={()=> (props.navigation.goBack())}
                />
            </View>
        // </TouchableWithoutFeedback>
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