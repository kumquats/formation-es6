// @flow

import Button from './Button';

export default class RoundedRedButton extends Button {
	constructor( label:string, attributes:?{} ) {
		super(
			label,
			{
				...attributes,
				style : 'border-radius: 5px; color: white; background-color: red'
			}
		);
	}
}
