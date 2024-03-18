declare module "struct-fu" {
    // Helper types for defining fields
    interface Field<T extends any> {
      // Generic interface representing a field in a struct 
      valueFromBytes(buf: Buffer, off?: Offset): T;
      bytesFromValue(val: T, buf?: Buffer, off?: Offset): Buffer;
      size?: number;
      width?: number;
      name?: string;
    }
  
    interface Offset {
      bytes: number;
      bits: number;
    }
  
    //---------------------------------------------------
    // Core struct creation and manipulation functions
    //---------------------------------------------------
  
    function struct<T>(name: string, fields: Field[], count?: number): Field<T>;
    function struct<T>(fields: Field[], count?: number): Field<T>;
  
    function padTo(off: number): Field; // Special padding field
  
    function newBuffer(size: number): Buffer;
    function extend(obj: any, ...ext: any[]): any;
  
    //-------------------------
    // Bitfield related types
    //-------------------------
  
    function bitfield<T>(name: string, width: number, count?: number): Field<T>;
    function bool(name: string, count?: number): Field<boolean>;
    function ubit<T>(name: string, count?: number): Field<T>;
    function ubitLE<T>(name: string, count?: number): Field<T>;
    function sbit<T>(name: string, count?: number): Field<T>;
  
    //-------------------------
    // Bytefield related types
    //-------------------------
  
    function bytefield<T>(name: string, size: number, count?: number): Field<T>;
    function bytefield<T>(size: number, count?: number): Field<T>;
    function byte<T>(name: string, count?: number): Field<T>;
    function byte<T>(count?: number): Field<T>;
    function char<T>(name: string, count?: number): Field<T>;
    function char<T>(count?: number): Field<T>;
    function char16le<T>(name: string, count?: number): Field<T>;
    function char16le<T>(count?: number): Field<T>;
    function char16be<T>(name: string, count?: number): Field<T>;
    function char16be<T>(count?: number): Field<T>;
  
    //-------------------------
    // Standard numeric fields
    //-------------------------
  
    function float32<T>(name: string, count?: number): Field<T>;
    function float32<T>(count?: number): Field<T>;
    function float64<T>(name: string, count?: number): Field<T>;
    function float64<T>(count?: number): Field<T>;
    function float32le<T>(name: string, count?: number): Field<T>;
    function float32le<T>(count?: number): Field<T>;
    function float64le<T>(name: string, count?: number): Field<T>;
    function float64le<T>(count?: number): Field<T>;
  
    function uint8<T>(name: string, count?: number): Field<T>;
    function uint8<T>(count?: number): Field<T>;
    function uint16<T>(name: string, count?: number): Field<T>;
    function uint16<T>(count?: number): Field<T>;
    function uint32<T>(name: string, count?: number): Field<T>;
    function uint32<T>(count?: number): Field<T>;
    function uint16le<T>(name: string, count?: number): Field<T>;
    function uint16le<T>(count?: number): Field<T>;
    function uint32le<T>(name: string, count?: number): Field<T>;
    function uint32le<T>(count?: number): Field<T>;
  
    function int8<T>(name: string, count?: number): Field<T>;
    function int8<T>(count?: number): Field<T>;
    function int16<T>(name: string, count?: number): Field<T>;
    function int16<T>(count?: number): Field<T>;
    function int32<T>(name: string, count?: number): Field<T>;
    function int32<T>(count?: number): Field<T>;
    function int16le<T>(name: string, count?: number): Field<T>;
    function int16le<T>(count?: number): Field<T>;
    function int32le<T>(name: string, count?: number): Field<T>;
    function int32le<T>(count?: number): Field<T>;
  
    //-------------------------
    // Field derivation for custom types
    //-------------------------
  
    function derive<T>(orig: Field<T>, pack: (val: any) => any, unpack: (val: any) => any): Field<T>; 
  }
  