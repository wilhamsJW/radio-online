declare module 'react-table' {
    import * as React from 'react';
  
    // Declare the types and interfaces you need here
    export interface Column<D = {}> {
      // Define column properties here
    }
  
    export interface TableInstance<D = {}> {
      // Define table instance methods and properties here
    }
  
    export function useTable<D = {}>(options: any): TableInstance<D>;
    // Add more hooks or functions as needed
  }
  