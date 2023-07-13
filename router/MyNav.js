import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackeNavigator } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons'
import { MyProvider } from '../globale/ContextState'



import Home from '../src/BottomTab/Home'
import AddArticle from '../src/BottomTab/AddArticle'
import About from '../src/BottomTab/About'
import Detail from '../src/Stack/ArticleDetails'
import Edit from '../src/Stack/EditArticle'

const Tab = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()

export default function TabNavigator() {
    return (
        <MyProvider>
            <NavigationContainer>
                <Tab.Navigator
                    // screenOptions={({ route }) => ({
                    // tabBarIcon: ({ focused, color, size }) => {
                    //     let iconName;
    
                    //     if (route.name === 'Home') {
                    //         iconName = focused ? 'home' : ''
                            
                    //     } else if (route.name === 'AddArticle') {
                    //         iconName = focused ? 'plus' : '';
                    //     } else if (route.name === 'About') {
                    //         iconName = focused ? 'information-circle' : '';
                    //     }

                    //     // You can return any component that you like here!
                    //     return <Ionicons name={iconName} size={size} color={color} />;
                    // },
                    //     // tabBarActiveTintColor: 'tomato',
                    //     // tabBarInactiveTintColor: 'gray',
                    // })}
                >
                    <Tab.Screen name="Home" component={StackNavigator} options={{title: 'HOME'}} tabBarIcon={()=>(<Ionicons name={'home'} size={20} />)} />
                    <Tab.Screen name="AddArticle" component={AddArticle} options={{title: 'ADD ARTICLE'}} />
                    <Tab.Screen name="About" component={About} options={{title: 'ABOUT US'}} />
                </Tab.Navigator>
            </NavigationContainer>
        </MyProvider>
    )
}

function StackNavigator() {
    
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={Home} options={{title: 'E-Commerce App'}} />
            <Stack.Screen name="Detail" component={Detail} options={{title: 'Article Details'}} />
            <Stack.Screen name="Edit" component={Edit} options={{title: 'Edit Article'}} />
        </Stack.Navigator>
    )
}


// export default function App() {
//     return (
        
//             <TabNavigator />
        
//     )
// }