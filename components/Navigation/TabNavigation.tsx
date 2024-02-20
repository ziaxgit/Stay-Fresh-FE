
const function TabNavigation() {
return (<>
<Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: {
            padding: 10,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" color={color} size={28} />
            ),
          }}
          component={HomeNavigation}
        />
        <Tab.Screen
          name="Scan"
          options={{
            tabBarLabel: "Scan",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="document-scanner" color={color} size={28} />
            ),
          }}
          component={Scan}
        />
        <Tab.Screen
          name="Profile"
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" color={color} size={28} />
            ),
          }}
          component={Profile}
        />
      </Tab.Navigator></>)}