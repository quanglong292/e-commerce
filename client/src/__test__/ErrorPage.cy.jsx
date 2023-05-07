import React from 'react'
import ErrorPage from '../views/ErrorPage'

describe('<ErrorPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ErrorPage />)
  })
})