## Purpose
Here is a possible configuration of components to help with reuse of code

The search contacts component would likely be your entry point. It would have a list of the first 10 contacts, ordered by whatever is important. From here one would be able to add, edit, and possibly delete contacts. 

The enter contact component is what allows you to enter the values for a new contact, and be reused to show the existing values when editing a contact. Any/all values to be used would be pass into the Inputs so that this component is only responsible for validation and putting the data together.

The add contact component would show the enter contact component and have its own save/cancel button. This way you can do POST necessary to insert a new contact. 

The edit contact componenent would show the enter contact component and pass in the existing contact for it to display.
