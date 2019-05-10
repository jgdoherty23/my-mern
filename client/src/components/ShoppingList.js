import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid"; // module that generates ids
import { connect } from "react-redux";
import { getItems } from "../actions/itemActions";
import PropTypes from "prop-types";


class ShoppingList extends Component 
{
    componentDidMount()
    {
        this.props.getItems();
    }

    render()
    {
        const { items } = this.props.item;
        return (
            <Container>
                <Button
                    color="dark"
                    style={{ marginBottom: "2rem" }}
                    onClick={() =>
                    {
                        const name = prompt("Enter Item");
                        if (name) 
                        {
                            // parenthesis makes parser treat object literal as 
                            //  expression, not block statement
                            this.setState(state =>
                                ({ items: [...state.items, { id: uuid(), name: name }] })
                            );
                        }
                    }}
                >
                    Add Item
                </Button>

                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ id, name }) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={() => 
                                        {
                                            this.setState(state =>
                                                ({ items: state.items.filter(item => item.id !== id) })
                                            );
                                        }}
                                    >
                                        &times;
                                    </Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

// Form of validation
// Not required
ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired, // actions in redux are stored as prop
    item: PropTypes.object.isRequired
}

// Map redux state to component property
const mapStateToProps = (state) => ({
    item: state.item
});

export default connect(mapStateToProps, { getItems })(ShoppingList);