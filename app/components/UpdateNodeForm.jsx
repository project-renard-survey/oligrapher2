import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';
import { HotKeys } from 'react-hotkeys';
import merge from 'lodash/object/merge';

export default class UpdateNodeForm extends BaseComponent {

  render() {
    let { display } = this.props.data;

    const keyMap = { 
      'esc': 'esc'
    };

    const keyHandlers = {
      'esc': () => this.props.deselect()
    };

    const scales = [
      [1, "1x"],
      [1.5, "1.5x"],
      [2, "2x"],
      [3, "3x"]
    ];

    return (
      <div className="editForm updateForm form-inline">
        <HotKeys keyMap={keyMap} handlers={keyHandlers}>
          <div>
            <input 
              type="text" 
              className="form-control input-sm"
              placeholder="name" 
              ref="name" 
              value={display.name}
              onChange={() => this.apply()} />
            &nbsp;<input 
              type="text" 
              className="form-control input-sm"
              placeholder="image URL" 
              ref="image" 
              value={display.image}
              onChange={() => this.apply()} />
            &nbsp;<select 
              value={display.scale} 
              className="form-control input-sm" 
              ref="scale" 
              onChange={() => this.apply()}>
              { scales.map((scale, i) =>
                <option key={scale[1]} value={scale[0]}>{scale[1]}</option>
              ) }
            </select>
          </div>
          <div>
            <input
              id="nodeUrlInput"
              type="text"
              className="form-control input-sm"
              placeholder="link URL"
              ref="url"
              value={display.url}
              onChange={() => this.apply()} />
          </div>
        </HotKeys>
      </div>
    );
  }

  apply() {
    if (this.props.data) {
      let name = this.refs.name.value;
      let image = this.refs.image.value.trim();
      let scale = parseFloat(this.refs.scale.value);
      let url = this.refs.url.value.trim();
      this.props.updateNode(this.props.data.id, { display: { name, image, scale, url } });      
    }
  }
}