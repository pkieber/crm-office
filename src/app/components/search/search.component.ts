import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  enteredSearchValue: string = ''; // Search-value will be assigned to this search propoerty.
  @Output() searchTextChanged: EventEmitter<string> = new EventEmitter<string>(); // Emit data of the type string.


  /** Input event happens as soon as user types into the textbox.
  * Value from "enteredSearchValue" will be emitted.
  * See parent-component "app-user".
  */
  onSearchTextChanged(){
    this.searchTextChanged.emit(this.enteredSearchValue);
  }


  /**
  * Clears search value and reloads the user list.
  */
  clearSearch() {
    this.enteredSearchValue = '';
    this.searchTextChanged.emit('');
  }
}
