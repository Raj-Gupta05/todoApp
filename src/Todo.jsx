import React, { useEffect, useState } from 'react';
import Item from './Item';


//get data from localStorage
const getLocalItems = () => {
	let list = localStorage.getItem('itemList');
	if(list){
		return JSON.parse(localStorage.getItem('itemList'))
	}else{
		return [];
	}
}

const Todo = () => {
	const [data, setData] = useState('');
	const [items, setItems] = useState(getLocalItems());
	const [isEdit, setIsEdit] = useState(false);
	const [editItemId, setEditItemId] = useState(null);

	const addItem = () => {
		if (data === '') {
		} else if (data !== '' && isEdit) {
			setItems(
				items.map((item) => {
					if (item.id === editItemId) {
						return { ...item, name: data };
					}
					return item;
				})
			);
				setIsEdit(false);
				setData("");
				setEditItemId(null);

		} else {
			const newItem = { id: new Date().getTime().toString(), name: data };
			setItems([...items, newItem]);
			setData('');
		}
	};

	const deleteItem = (id) => {
		const newList = items.filter((item, ind) => {
			return item.id !== id;
		});
		setItems(newList);
	};

	const editItem = (id) => {
		const updatedItem = items.find((item) => {
			return item.id === id;
		});
		setIsEdit(true);
		setData(updatedItem.name);
		setEditItemId(id);
	};

	//add to local storage
	useEffect(() => {
		localStorage.setItem('itemList',JSON.stringify(items))
	},[items]);

	return (
		<>
			<div className='container'>
				<div className='content'>
					
					<h1 style={{ color: 'black' }}>Todo List</h1>
					<div className='addItems'>
						<input
							type='text'
							placeholder='write item...'
							name='inputItem'
							value={data}
							onChange={(e) => setData(e.target.value)}
						/>
						{isEdit ? (
							<i
								className='fa-solid fa-pen-to-square icon'
								onClick={addItem}
							></i>
						) : (
							<i className='fa-solid fa-plus icon' onClick={addItem}></i>
						)}
					</div>

					<div className='showItems'>
						
						{items.map((item, ind) => {
							return (
								<Item
									key={item.id}
									name={item.name}
									index={item.id}
									onDelete={deleteItem}
									onEdit={editItem}
								/>
							);
						})}
					</div>
				</div>
				<button id='clearButton' onClick={() => setItems([])}>
					Clear All
				</button>
			</div>
		</>
	);
};

export default Todo;
