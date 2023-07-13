import React, {useState, useEffect, useContext} from 'react'
import {View, Text, StyleSheet, SafeAreaView, FlatList, StatusBar, Image, TouchableOpacity, Modal } from 'react-native'
import axios from 'axios';
import AddArticle from './AddArticle';
import { MaterialIcons } from '@expo/vector-icons'
import { MyContext } from '../../globale/ContextState'




const Articles = ({ navigation }) => {
    const {
            myArticles, 
            setMyArticles,
        } = useContext(MyContext)

    const [modalOpen, setModalOpen] = useState(false)


    const dismisModal = () => {
        setModalOpen(false)
    }
    
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/products/')
                setMyArticles(res.data.results)
            } catch (error) {
                console.log(error.message)
            }
        };
        fetchArticles();
    }, [])

    // const goToDetails = () =>
       


    function articleHandler(item) {
        const {id, title, price, picture, content } = item
        // console.log(title, price, content)
         navigation.navigate("Detail", {
             screen: "Detail",
             id,
             title,
             price,
             picture,
             content
        });
    }

    
    const Item = (item) => (
      <TouchableOpacity onPress={() => articleHandler(item)} >
        <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.title}>{item.content}</Text>
            <Text style={styles.price}> " {item.price} € 🇪🇺 " </Text>
            <Image source={{ uri: item.picture }} style={styles.articleImage}  />
        </View>
      </TouchableOpacity>
  );
    

    return (
        <SafeAreaView style={styles.container}>
            <Modal visible={modalOpen} animationType='slide'>
                <View style={styles.containerModal}>
                    <MaterialIcons name='close' style={styles.btnAddArticle} size={24} onPress={() => setModalOpen(false)} />
                    <AddArticle dismisModal={dismisModal} navigation={navigation} />
                </View>

            </Modal>

            <MaterialIcons name='add' style={styles.btnAddArticle} size={24} onPress={() => setModalOpen(true)} />
            
            <FlatList
                data={myArticles}
                renderItem={({ item }) => <Item
                    title={item.title}
                    content={item.content}
                    price={item.price}
                    picture={item.picture}
                    id={item.id}
                />}
                keyExtractor={item => item.id}
            />
            
        </SafeAreaView>
  )
}

export default Articles



/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ STYLES                                                                  │
  └─────────────────────────────────────────────────────────────────────────┘
 */

const styles = StyleSheet.create({
    font: {
        fontWeight: '700',
        // fontSize: 30,
        color: '#f0ffff',
    },
      container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#aaa',
        // alignItems: 'center',
        justifyContent: 'center',
        
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
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
    containerModal: {
        // flex: 1,
    },
    btnAddArticle: {
        marginBottom: 10,
        borderEndWidth: 1,
        borderColor: '#aaa',
        padding: 10,
        borderRadius: 6,
        alignSelf: 'center'
    },
    price: {
        marginTop: 40,
        fontSize: 25,
    }
})