import React from "react";
import ViewLogin from "../views/ViewLogin";

describe("<ViewLogin />", () => {
  it("renders", () => {
    cy.mount(<ViewLogin />);
    cy.get(".ant-modal-header").should("contain.text", "login");
    cy.get("button").should("contain.text", "Submit");
    cy.get("button").should("contain.text", "Clear");
  });
  it("events", () => {
    cy.mount(<ViewLogin />);
    cy.get("button").contains("Submit").click();
    cy.get("div").contains("This field is required");
    cy.get("button").contains("Clear").click();
    cy.get("div").contains("This field is required").should("not.exist");
  });
});
