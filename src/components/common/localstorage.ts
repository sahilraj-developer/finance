export const setLocalStorageItem = (key:any, value:any) => {
    localStorage.setItem(key, value);
  };
  
  export const setLocalStorageItemStrigified = (key:any, value:any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  export const setLocalStorageItemReversed = (key:any, value:any) => {
    let reversedItem = value.split("").reverse().join("");
    localStorage.setItem(key, reversedItem);
  };
  
  export const getLocalStorageItem = (key:any) => {
    const item = localStorage.getItem(key);
    return item ? item : null;
  };
  
  export const getLocalStorageItemJsonParsed = (key:any) => {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : null;
    } catch (error) {
      return null;
    }
  };
  
  export const getLocalStorageItemReversed = (key:any) => {
    const item:any = localStorage.getItem(key);
    let reversedItem = item.split("").reverse().join("");
    return reversedItem;
  };
  
  export const removeLocalstorageItem = (key:any) => {
    localStorage.removeItem(key);
  };
  
  export const localstorageRemoveEntire = () => {
    localStorage.clear();
  
  };
  