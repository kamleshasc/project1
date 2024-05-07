import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import Dashboard from "../screen/Dashboard"
import Users from "../screen/Users"
import Services from "../screen/Services"
import Packages from "../screen/Packages"
import Clients from "../screen/Clients"
import Price from "../screen/Price"
import Inventory from "../screen/Inventory"
import colors from "../styles/colors"

const Drawer = createDrawerNavigator()

function DrawerNavigation(){
    return(
        <Drawer.Navigator screenOptions={{
            headerStyle:{
                backgroundColor:colors.secondaryDark
            },
            headerTitleStyle:{
                color:colors.fontLight
            },
            headerTintColor:colors.primary          
        }}>
            <Drawer.Screen name="Dashboard" component={Dashboard} />
            <Drawer.Screen name="Users" component={Users} />
            <Drawer.Screen name="Services" component={Services} />
            <Drawer.Screen name="Packages" component={Packages} />
            <Drawer.Screen name="Clients" component={Clients} />
            <Drawer.Screen name="Price" component={Price} />
            <Drawer.Screen name="Inventory" component={Inventory} />

        </Drawer.Navigator>
    )
}

export default DrawerNavigation