import React, { Component } from "react"
import Checkmark from './Checkmark'


class ColorSwatchCategoryList extends Component {
  constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick(name, value, fieldNumber) {
    this.props.triggerOptionChanged(name, value, fieldNumber);
	}

  render() {
    let props = this.props;
    let field = props.field;

    return (
        <ul class={props.baseClassName + "__category__list"}>
          {props.choices.map((choice, index) => {
              return (
                <li key={choice.value}>
                  <ColorSwatch {...choice} />
                </li>
              )
          })}
        </ul>

    )
  }
}

export default ColorSwatchCategoryList;
