import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import DrawerNavigation from "./DrawerNavigation";

const Stack = createStackNavigator();

function RootNavigation(){
    return(
        <Stack.Navigator screenOptions={{
            headerShown:false
        }}>
            <Stack.Screen name="DrawerNavigation"  component={DrawerNavigation}/>
        </Stack.Navigator>
    )
}

export default RootNavigation