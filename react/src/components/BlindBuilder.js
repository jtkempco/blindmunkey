import React, { Component, Fragment } from "react"
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import BlindBuilderWrapper from './BlindBuilderWrapper'
import configureStore from '../utils/configureStore'
import { initialHydrateFetch } from '../utils/initialHydrateFetch'

const store = configureStore()

class BlindBuider extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    store.dispatch((dispatch) => {
      initialHydrateFetch(dispatch, this.props.productCode, this.props.baseURL);
    })
  }

  render() {
    return (
      <Provider store={store}>
        <BlindBuilderWrapper {...this.props} />
      </Provider>
    )
  }
}

export default BlindBuider