import { StyleSheet, View, Text, Button, Image } from 'react-native'
import React, { useContext } from 'react'
import { Feather, AntDesign } from 'react-native-vector-icons'
import axios from 'axios'
import { MyContext } from '../../globale/ContextState'

const ArticleDetails = ({ navigation, route }) => {
        const {
            myArticles, 
            setMyArticles,
        } = useContext(MyContext)
    
    
    const article = route.params || "unknown";
    const goBack = () => navigation.goBack();

    const articleEdit = (article ) => {
        navigation.navigate("Edit", {article:article});
    }

    const articleDelete = async (article) => {
        try {
            axios.delete(`http://localhost:8000/products/${article.id}/`)
            const res = await axios.get('http://127.0.0.1:8000/products/')
            setMyArticles(res.data.results)
            navigation.push('HomeScreen')
        } catch (error) {
            console.log(error.message)
        }
        
    
    }

  return (
      <View style={styles.container}>
          <View style={styles.containerBtn}>
            <Feather name='edit' size={32} color="green" onPress={()=> articleEdit(article)} />
            <AntDesign name='delete' size={32} color="red" onPress={()=> articleDelete(article)} />
          </View>
            <View style={styles.item}>
              <Text style={styles.title}>{article.title}</Text>
              <Text style={styles.title}>{article.content}</Text>
              <Text style={styles.title}> {article.price}  € 🇪🇺 </Text>
              <Image source={{ uri: article.picture }} style={styles.articleImage} />
              
            </View>
            <Button onPress={goBack} title={`Go back`} />
    </View>
  )
}

export default ArticleDetails



/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ STYLES                                                                  │
  └─────────────────────────────────────────────────────────────────────────┘
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#aaa',
        // justifyContent: 'center',
        marginTop: 0,
        paddingTop: 0,
        marginTop: 0,
        
    },
    containerBtn: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingEnd: 30,
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 0,
    },

    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        // marginVertical: 8,
        marginHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },
    title: {
        fontSize: 32,
    },
    articleImage: {
        width: 100,
        height: 100, 
    },
})