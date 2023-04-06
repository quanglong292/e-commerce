import React from 'react'
import ErrorPage from './ErrorPage'

describe('<ErrorPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ErrorPage />)
  })
})