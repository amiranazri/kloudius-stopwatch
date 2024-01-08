import React, { Component } from "react";
import { StopwatchContext } from "../../contexts/StopwatchContexts";
import "./StopwatchForm.css";

class StopwatchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: "",
      duration: "",
      error: "",
      elapsedTime: 0,
    };

    this.specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  }

  static contextType = StopwatchContext;

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, error: "" });
  };

  handleSubmit = (e) => {
    const { delay, duration } = this.state;
    const { startTimer } = this.context;
    const { specialCharRegex } = this;

    if (!delay.trim() || !duration.trim()) {
      this.setState({ error: "Please enter a valid value for both fields." });
      return;
    }

    if (isNaN(delay) || isNaN(duration)) {
      this.setState({ error: "Please enter a valid number." });
      return;
    }

    if (specialCharRegex.test(delay) || specialCharRegex.test(duration)) {
      this.setState({
        error:
          "Special characters are not allowed. Please use valid characters.",
      });
      return;
    }
    startTimer(delay, duration);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { delay, duration, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="delay"
          value={delay}
          placeholder="Delay (Minutes to Start from Now)"
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="duration"
          value={duration}
          placeholder="Timer Duration"
          onChange={this.handleInputChange}
        />
        {error && <>{error}</>}
        <button type="submit">Start Counting</button>
      </form>
    );
  }
}

export default StopwatchForm;
