import React, { useState, useEffect } from 'react'
import axios from 'axios'
// create function component Menu

export default function Menu(props) {
  // state is menuItems, setMenuItems is the function to update state, same applies to selectedItem, and cart
  const [menuItems, setMenuItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/restaurants`)
      .then((response) => {
        setMenuItems(response.data[0]) //updates the state of menuItems with data from the server
      })
  }, [])

  const handleSelection = (item) => {
    setSelectedItem(item) // updates the state of selectedItem with the item that was clicked
  }

  const menu = menuItems.menu?.map((section, idx) => {
    return (
      <div key={section._id}>
        <h3>{section.sectionName}</h3>
        <div>
          {section.products.map((item) => (
            <div key={item._id}>
              <button onClick={() => handleSelection(item)}>{item.name}</button>
              <button onClick={() => props.handleAddToCart(item)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    )
  })

  return (
    <div>
      <h1>Menu</h1>
      <div>
        {menu}
      </div>
      {selectedItem && <p>Selected: {selectedItem.name}</p>}
    </div>
  )
  // if selectedItem is not null, display the name of the selected item, && is a conditional operator that checks if the first value is true, if it is, it displays the second value
}