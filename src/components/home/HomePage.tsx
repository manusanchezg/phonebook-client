import React from 'react'
import ContactInfo from '../contact/ContactInfo'
import ContactList from './ContactList'

function HomePage() {
  return (
    <div>
        <ContactList />
        <ContactInfo />
    </div>
  )
}

export default HomePage