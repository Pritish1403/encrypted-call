// Encryption and decryption functions
function encryptNumber(number) {
  let encrypted = '';
  for (let i = 0; i < number.length; i++) {
    encrypted += String.fromCharCode(number.charCodeAt(i) + 2);
  }
  return encrypted;
}

function decryptNumber(encrypted) {
  let decrypted = '';
  for (let i = 0; i < encrypted.length; i++) {
    decrypted += String.fromCharCode(encrypted.charCodeAt(i) - 2);
  }
  return decrypted;
}

// Function to add a contact
function addContact(name, number) {
  const encryptedNumber = encryptNumber(number);
  const contact = { name, number: encryptedNumber };
  
  let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  contacts.push(contact);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  
  displayContacts();
}

// Function to display contacts
function displayContacts() {
  const contactList = document.getElementById('contactList');
  contactList.innerHTML = '';

  let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  
  contacts.forEach((contact, index) => {
    const li = document.createElement('li');
    
    const contactInfo = document.createElement('div');
    contactInfo.className = 'contact-info';
    contactInfo.textContent = contact.name;
    
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'contact-buttons';
    
    const callBtn = document.createElement('button');
    callBtn.className = 'call-btn';
    callBtn.textContent = 'Call';
    callBtn.addEventListener('click', function () {
      const decryptedNumber = decryptNumber(contact.number);
      window.open(`tel:${decryptedNumber}`);
    });
    
    const messageBtn = document.createElement('button');
    messageBtn.className = 'message-btn';
    messageBtn.textContent = 'Message';
    messageBtn.addEventListener('click', function () {
      const decryptedNumber = decryptNumber(contact.number);
      window.open(`sms:${decryptedNumber}`);
    });

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', function () {
      removeContact(index); // Remove contact by index
    });

    buttonsDiv.appendChild(callBtn);
    buttonsDiv.appendChild(messageBtn);
    buttonsDiv.appendChild(removeBtn);
    
    li.appendChild(contactInfo);
    li.appendChild(buttonsDiv);
    
    contactList.appendChild(li);
  });
}

// Function to remove a contact
function removeContact(index) {
  let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  contacts.splice(index, 1);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  displayContacts();
}

// Add a contact event listener
document.getElementById('addContactBtn').addEventListener('click', function () {
  const nameInput = document.getElementById('contactName').value;
  const numberInput = document.getElementById('contactNumber').value;

  if (nameInput && numberInput) {
    addContact(nameInput, numberInput);
    document.getElementById('contactForm').reset();
  } else {
    alert('Please enter both name and number');
  }
});

// Display contacts on page load
displayContacts();
