import React from 'react'
import CButton from '../components/core/CButton'

describe('<CButton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CButton />)
  })
})