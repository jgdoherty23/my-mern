import React, { Component } from "react";
import
{
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import uuid from "uuid";


// This is technical a "Container," a React Component
//  linked to a redux state
class ItemModal extends Component
{
    // Just because we have redux state doesn't mean components
    //  shouldn't have states 
    state = {
        modal: false,
        name: ""
    }

    toggle = () =>
    {
        this.setState({
            modal: !this.state.modal
        });
    }

    // takes in event parameter
    // using "name" to be able to reuse onChange method
    onChange = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e =>
    {
        // Prevent form from submitting how it would naturally
        e.preventDefault();

        const newItem = {
            id: uuid(),
            name: this.state.name
        }

        // Add item via addItem action
        this.props.addItem(newItem);

        // Close modal
        this.toggle();
    }

    render()
    {
        return (
            <div>
                <Button
                    color="dark"
                    style={{ marginBottom: "2rem" }}
                    onClick={this.toggle}
                >Add Item</Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input
                                    type="text"
                                    name="name" // should match with state
                                    id="item"
                                    placeholder="Add shopping item"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{ marginTop: "2rem" }}
                                    block
                                >Add Item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div >
        );
    }
}

const mapStateToProps = state => ({
    item: state.item
});

export default connect(mapStateToProps, { addItem })(ItemModal);