
export interface Restaurant{
    "name": string,
    "id": number,
    "coverImage": string,
    "activeTimePeriod": {
      "open": string,
      "close": string,
    },
    "menus": string[],
}
     
export interface ShortMenu{
  "name": string
 "id": string
 "thumbnailImage"?: string
 "fullPrice": number
 "discountedPercent": number
 "discountedTimePeriod"?: {
    "begin": string
    "end": string
  }
 "sold": number
 "totalInStock": number
}

export interface FullMenu{
  "name": string
  "id": string
  "thumbnailImage"?: string
  "fullPrice": number
  "discountedPercent": number
  "discountedTimePeriod"?: {
     "begin": string
     "end": string
   }
  "sold": number
  "totalInStock": number
  "largeImage"?: string
  "options": {
     "label": string
     "choices": {
       "label": string
     }[]
   }[]
}

export interface Menu {
  "name": string,
  "id": string,
  "thumbnailImage"?: string,
    "fullPrice": number,
    "discountedPercent": number,
    "discountedTimePeriod"?: {
      "begin": string,
      "end": string
    }
    "sold": number,
    "totalInStock": number,
    "largeImage"?: string,
    "options": {
      "label": string,
      "choices": {
        "label": string
      }[]
    }[]
}



