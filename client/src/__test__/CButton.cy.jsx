import React from "react";
import CButton from "../components/core/CButton";

describe("<CButton />", () => {
  it("renders and can be click + showing correct content", () => {
    const onClickTest = cy.spy().as("onClickTest");
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CButton onClick={onClickTest}>Test button</CButton>);
    cy.get("button").should("contain.text", "Test button");
    cy.get("button").should("contain.text", "Test button");
    cy.get("button").click().get("@onClickTest").should("have.been.called");
  });
});
