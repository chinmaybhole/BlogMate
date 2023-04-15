import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // const newMessage = {
    //   sender: "you",
    //   message: message,
    // };
    setChatHistory([...chatHistory, { sender: "you", message: message }]);

    axios
      .post("https://blogmaster-server.onrender.com/textbot", { message })
      .then((res) => {
        const newMessage = {
          sender: "bot",
          message: res.data[0].generated_text,
        };
        console.log(res.data[0].generated_text);
        setChatHistory([newMessage]);
        setMessage("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h1 className="text-center mb-3 title">Ai Generated Text</h1>
          <div className="chat-window">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`chat-bubble ${
                  message.sender === "you" ? "user" : "bot"
                }`}
              >
                {message.sender === "you"
                  ? `Your Text: `
                  : "Ai generated text: "}
                {message.message}
              </div>
            ))}
          </div>
          <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group>
              <Form.Control
                className="form1"
                type="text"
                placeholder="Type your message here..."
                value={message}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="button-container">
              <Button variant="primary" type="submit" className="button">
                Send
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Chatbot;
