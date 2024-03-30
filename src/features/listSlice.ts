import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ListSlice {
    id: string;
    name: string;
    items: string[]
}

const initialState: ListSlice[] = [];

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    createList: (state, action: PayloadAction<ListSlice>) => {
      state.push(action.payload);
    },
    updateNameList: (state, action: PayloadAction<{id: string, name: string}>) => {
      const { id, name } = action.payload;
      const existingList = state.find(list => list.id === id);
      if (existingList) {
        existingList.name = name;
      }
    },
    updateList: (state, action: PayloadAction<{id: string, items: string[]}>) => {
      const {id, items} = action.payload;
      const existingList = state.find(list => list.id === id);
      if (existingList) {
        existingList.items = items;
      }
    },
    addItemToList: (state, action: PayloadAction<{ id: string; item: string }>) => {
      const { id, item } = action.payload;
      const existingList = state.find(list => list.id === id);
      if (existingList) {
        existingList.items.push(item);
      }
    },  
    updateItemInList: (state, action: PayloadAction<{id: string, oldItem: string, newItem: string}>) => {
      const {id, oldItem, newItem} = action.payload;
      const existingList = state.find(list => list.id === id);
      if (existingList){
        const itemIndex = existingList.items.findIndex(item => item === oldItem)
        console.log(itemIndex)
        if (itemIndex !== -1){ 
          existingList.items[itemIndex] = newItem
        }
      }

    },
    deleteItemFromList: (state, action: PayloadAction<{id: string, item: string}>) => {
      const {id, item} = action.payload;
      const existingList = state.find(list => list.id === id);
      if (existingList) {
        const index = existingList.items.indexOf(item);
        existingList.items.splice(index, 1)
      }
    },
    deleteList: (state, action: PayloadAction<string>) => {
      return state.filter(list => list.id !== action.payload);
    }
  }
});

export const { createList, updateNameList, addItemToList,  updateList, deleteItemFromList, deleteList, updateItemInList } = listSlice.actions;

export default listSlice.reducer;
