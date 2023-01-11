export interface FormElements extends HTMLFormControlsCollection {
  contentInput: HTMLInputElement;
}

export interface ShoppingListFormElement extends HTMLFormElement {
  elements: FormElements;
}
