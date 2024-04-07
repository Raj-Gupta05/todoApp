import React from 'react';

const Item = ({ index, name, onDelete, onEdit }) => {
	return (
		<>
			<div className='eachItem'>
				<h2>{name}</h2>
				<span>
					<i
						className='fa-solid fa-pen-to-square icon'
						onClick={() => onEdit(index)}
					></i>
					<i
						className='fa-solid fa-trash icon'
						onClick={() => onDelete(index)}
					></i>
				</span>
			</div>
		</>
	);
};

export default Item;
