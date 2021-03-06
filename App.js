import React, { PureComponent } from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';

import TabBarIcon from './components/TabBarIcon';
import NewsList from './screens/NewsList';
import CheckoutScreen from './screens/CheckoutScreen';
import NewsDetails from './screens/NewsDetails';
import ProductList from './screens/ProductList';
import ProductDetails from './screens/ProductDetails';
import ShoppingCart from './screens/ShoppingCart';
import { configureStore } from './redux';

const NewsStack = createStackNavigator({
  NewsList: {
    screen: NewsList,
    navigationOptions: {
      header: null,
    },
  },
  NewsDetails: NewsDetails,
});

NewsStack.navigationOptions = ({ navigation }) => {
  if (navigation.state.index != 0) return { tabBarVisible: false }

  return {};
}

const ProductStack = createStackNavigator({
  ProductList: {
    screen: ProductList,
    navigationOptions: {
      header: null,
    },
  },
  ProductDetails: ProductDetails,
});

ProductStack.navigationOptions = ({ navigation }) => {
  if (navigation.state.index != 0) return { tabBarVisible: false }

  return {};
}

const ShoppingCartStack = createStackNavigator({
  ShoppingCart: {
    screen: ShoppingCart,
    navigationOptions: {
      header: null,
    },
    ProductDetails: ProductDetails,
  },
  CheckoutScreen: {
    screen: CheckoutScreen,
    navigationOptions: {
      title: 'Izradba Narudžbe',
    }
  }
})

ShoppingCartStack.navigationOptions = ({ navigation }) => {
  if (navigation.state.index != 0) return { tabBarVisible: false }

  return {};
}

const AppNavigator = createBottomTabNavigator(
  {
    //News: NewsStack, // will be reintroduced once FB Graph API is configured
    Products: ProductStack,
    ShoppingCart: ShoppingCartStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({tintColor}) => {
        const { routeName } = navigation.state;

        return (
          <TabBarIcon
            tintColor={tintColor}
            iconName={routeName}
          />
        )
      },
    }),
    initialRouteName: 'Products',
    tabBarOptions: {
      activeTintColor: '#EFEFEF',
      inactiveTintColor: '#080706',
      activeBackgroundColor: '#080706',
      inactiveBackgroundColor: '#EFEFEF',
      showLabel: false,
      tabStyle: {
        justifyContent: 'center',
      },
      labelStyle: {
        fontSize: 22,
      }
    },
  }
);

const AppContainer = createAppContainer(AppNavigator);

const { persistor, store } = configureStore();

export default class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    )
  }
}
